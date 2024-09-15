from flask_cors import CORS
from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token

import firebase_admin
from firebase_admin import credentials, firestore
from google.cloud.firestore_v1.document import DocumentReference

import jwt, json, requests
from functools import wraps
from datetime import timedelta
from config import JWT_SECRET_KEY
from pywebpush import webpush, WebPushException

import logging
from logging.handlers import RotatingFileHandler

def setup_logger():
    handler = RotatingFileHandler('debug.log', maxBytes=10000, backupCount=3)
    handler.setLevel(logging.DEBUG)
    formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
    handler.setFormatter(formatter)

    app.logger.addHandler(handler)
    app.logger.setLevel(logging.DEBUG)

app = Flask(__name__)
CORS(app)
setup_logger()

app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
jwt_code = JWTManager(app)

cred = credentials.Certificate('/home/justincode/mysite/server.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

def serialize_doc(doc):
    if isinstance(doc, DocumentReference):
        return doc.id
    elif isinstance(doc, dict):
        for key, value in doc.items():
            doc[key] = serialize_doc(value)
        return doc
    elif isinstance(doc, list):
        return [serialize_doc(item) for item in doc]
    else:
        return doc

def check_role(user_data):
    user_email = user_data['sub']['email']
    user_docs = db.collection('users').where('email', '==', user_email).limit(1).get()

    if len(user_docs) == 0:
        return "none"

    user_doc = user_docs[0]
    user_role = user_doc.to_dict().get('role', 'none')

    return user_role

def decode_id_token(id_token):
    url = f"https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={id_token}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Unable to validate token", "status_code": response.status_code}

def jwt_required_custom(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        jwt_token = request.headers.get('Authorization', None)
        if not jwt_token:
            return jsonify(message="缺少授權 token"), 401
        try:
            user_data = jwt.decode(jwt_token, app.config['JWT_SECRET_KEY'], algorithms=["HS256"])
            return fn(user_data=user_data, *args, **kwargs)
        except jwt.ExpiredSignatureError:
            return jsonify(message="Token 已過期"), 401
        except jwt.InvalidTokenError:
            return jsonify(message="無效的 token"), 401
    return wrapper

@app.route('/')
def main_root():
    return "Service is ready!!!"

@app.route('/google_login', methods=['POST'])
def custom_google_login():
    id_token = request.json.get('idToken')
    try:
        decoded_token = decode_id_token(id_token)
        if decoded_token.get('email_verified') == 'true':
            user_email = decoded_token.get('email')
            user_name = decoded_token.get('name')
            user_picture = decoded_token.get('picture')

            existing_user = db.collection('users').where('email', '==', user_email).limit(1).get()
            if len(existing_user) == 0:
                new_user_data = {
                    "email": user_email,
                    "name": user_name,
                    "picture": user_picture,
                    "role": "insider"
                }
                db.collection('users').add(new_user_data)

            user_info = {"email": user_email, "name": user_name, "picture": user_picture}
            access_token = create_access_token(identity=user_info)
            return jsonify(access_token=access_token, email=user_email), 200
        else:
            return jsonify(message="Google login failed"), 401
    except Exception as e:
        print("Error during Google login:", e)
        return jsonify(message="Google login failed"), 401

VAPID_PRIVATE_KEY = 'TOKEN_PRIVATE'
VAPID_PUBLIC_KEY = 'TOKEN_PUBLIC'
VAPID_CLAIMS = {
    "sub": "mailto:justin.hsu.1019@gmail.com"
}

def send_push_notification(subscription_info, message_body):
    try:
        response = webpush(
            subscription_info=subscription_info,
            data=json.dumps(message_body),
            vapid_private_key=VAPID_PRIVATE_KEY,
            vapid_claims=VAPID_CLAIMS
        )
        app.logger.debug("webpush(response): " + str(response))
        return response
    except WebPushException as ex:
        print("Web push failed: {}", repr(ex))
        app.logger.debug("Web push failed: {}", repr(ex))
        return None

@app.route('/notify-leave', methods=['POST'])
def notify_leave():
    message = request.json.get('message', 'byebye')
    app.logger.debug("message: " + message)
    send_push_notification_to_all(message)
    return jsonify({"status": "success", "message": "通知已發送"})

def send_push_notification_to_all(message):
    subscriptions = db.collection('subscriptions').get()
    for subscription in subscriptions:
        subscription_info = subscription.to_dict()
        send_push_notification(subscription_info, {"title": "通知", "body": message})

@app.route('/subscribe', methods=['POST'])
def subscribe():
    subscription_info = request.json
    try:
        db.collection('subscriptions').add(subscription_info)
        app.logger.debug("訂閱成功")
        return jsonify({"status": "success", "message": "訂閱成功"})
    except Exception as e:
        print(e)
        app.logger.debug("訂閱失敗, 錯誤訊息: " + e)
        return jsonify({"status": "error", "message": "訂閱失敗"}), 500

@app.route('/create', methods=['POST'])
@jwt_required_custom
def create_document(user_data):
    collection_name = request.json['collection']
    user_role = check_role(user_data)

    if collection_name != "users":
        if user_role != "admin":
            return jsonify({"message": "權限不足"}), 400

    data = request.json['data']

    if collection_name == "users":
        if user_role != "admin":
            data['role'] = "insider"
        data['email'] = user_data["sub"]["email"]
        data['picture'] = user_data["sub"]["picture"]

    unique_index_field = 'name' if collection_name != 'users' else 'email' if collection_name == 'users' else None

    if unique_index_field and unique_index_field in data:
        existing_doc = db.collection(collection_name).where(unique_index_field, '==', data[unique_index_field]).limit(1).get()
        if len(existing_doc) > 0:
            return jsonify({"message": f"{unique_index_field} already exists"}), 400

    ref = db.collection(collection_name)
    ref.add(data)

    return jsonify({"message": "Document added successfully"}), 201

@app.route('/read_member/<email>', methods=['GET'])
@jwt_required_custom
def read_member(user_data, email):
    user_role = check_role(user_data)
    if user_data["sub"]["email"] != email and user_role != "admin":
        return jsonify({"message": "權限不足"}), 400

    document = db.collection('users').where('email', '==', email).stream()

    for doc in document:
        user_data = serialize_doc(doc.to_dict())
        return jsonify(user_data), 200
    return jsonify({"message": "Member not found"}), 404

@app.route('/update_member/<email>', methods=['PUT'])
@jwt_required_custom
def update_member(user_data, email):
    user_role = check_role(user_data)
    if user_data["sub"]["email"] != email and user_role != "admin":
        return jsonify({"message": "權限不足"}), 400

    data = request.json

    if user_role != "admin":
        data.pop('role', None)

    user_ref = db.collection('users').where('email', '==', email).limit(1).stream()

    user_doc = next(user_ref, None)
    if not user_doc:
        return jsonify({"message": "Member not found"}), 404

    if 'email' in data and data['email'] != email:
        existing_doc = db.collection('users').where('email', '==', data['email']).limit(1).get()
        if len(existing_doc) > 0:
            return jsonify({"message": "Email already exists"}), 400

    user_doc.reference.update(data)
    return jsonify({"message": "Member updated successfully"}), 200

@app.route('/delete_member/<member_email>', methods=['DELETE'])
@jwt_required_custom
def delete_member(user_data, member_email):
    user_role = check_role(user_data)
    if user_data["sub"]["email"] != member_email and user_role != "admin":
        return jsonify({"message": "權限不足"}), 400

    member_ref = db.collection('users').where('email', '==', member_email).limit(1).stream()
    member_doc = next(member_ref, None)
    if member_doc:
        member_doc.reference.delete()
        return jsonify({"message": "Member deleted successfully"}), 200
    else:
        return jsonify({"message": "Member not found"}), 404

if __name__ == '__main__':
    app.run(threaded=True)
