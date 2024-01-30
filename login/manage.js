const apiUrl = 'https://justincode.pythonanywhere.com';

function getHeaders() {
    const token = localStorage.getItem('jwtToken');
    return {
        'Authorization': token,
        'Content-Type': 'application/json'
    };
}

function backhome() {
    window.location.href = 'https://justin-code.com';
}

function readUser() {
    const email = $('#email').val();
    $.ajax({
        url: `${apiUrl}/read_member/${email}`,
        method: 'GET',
        headers: getHeaders(),
        success: function (response) {
            $('#name').val(response.name);
            $('#role').val(response.role);
            $('#gender').val(response.gender);
            $('#instagram').val(response.instagram);
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
        }
    });
}

function updateUser() {
    const email = $('#email').val();
    const userData = {
        name: $('#name').val(),
        role: $('#role').val(),
        gender: $('#gender').val(),
        instagram: $('#instagram').val()
    };

    $.ajax({
        url: `${apiUrl}/update_member/${email}`,
        method: 'PUT',
        headers: getHeaders(),
        data: JSON.stringify(userData),
        success: function (response) {
            alert(response.message);
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
        }
    });
}

function deleteUser() {
    const email = $('#email').val();
    $.ajax({
        url: `${apiUrl}/delete_member/${email}`,
        method: 'DELETE',
        headers: getHeaders(),
        success: function (response) {
            alert(response.message);
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
        }
    });
}

$(document).ready(function () {
    var userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        $('#email').val(userEmail);
    }
});
