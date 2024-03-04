document.getElementById('site-title').addEventListener('click', function () {
    document.getElementById('resume').classList.add('hidden');
    document.getElementById('daily-novels').classList.add('hidden');

    document.querySelectorAll('main > section').forEach(section => {
        if (section.id !== 'resume' && section.id !== 'daily-novels') {
            section.classList.remove('hidden');
        }
    });
});

function loadChapterContent(chapterId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(text => {
            const chapters = text.split('justincode');
            const chapterIndex = parseInt(chapterId.replace('#chapter', ''), 10) - 1;
            document.querySelector(chapterId + '_c').innerHTML = chapters[chapterIndex];
        })
        .catch(error => {
            console.error('Error loading chapter:', error);
        });
}

loadChapterContent('#chapter1', 'novel.txt');
loadChapterContent('#chapter2', 'novel.txt');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelector('.book-cover').addEventListener('click', function (event) {
    event.preventDefault();
    this.classList.add('hidden');
    document.querySelector('.book-info').classList.add('hidden');
    var bookSection = document.querySelector('#book1');
    bookSection.classList.remove('hidden');

    var chap = document.querySelector('.chap');
    if (chap.classList.contains('hidden')) {
        chap.classList.remove('hidden');
    }
    document.querySelector('#book2').classList.add('hidden');
    document.querySelector('.book-cover2').classList.add('hidden');
    document.querySelector('.book-info2').classList.add('hidden');
});

function addBackButtonToChapterContent(chapterId) {
    const backButton = document.createElement('button');
    backButton.innerText = 'Back to Chapter Index';
    backButton.addEventListener('click', function () {
        document.getElementById(chapterId).classList.add('hidden');
        document.querySelector('.chap').classList.remove('hidden');
    });

    const chapterContent = document.getElementById(chapterId);
    chapterContent.insertBefore(backButton, chapterContent.firstChild);
}

function addBackButtonToChapterIndex() {
    const backButton = document.createElement('button');
    backButton.innerText = 'Back to Book Cover';
    backButton.addEventListener('click', function () {
        document.querySelector('.chap').classList.add('hidden');
        document.getElementById('chapter1').classList.add('hidden');
        document.getElementById('chapter2').classList.add('hidden');
        document.querySelector('.book-cover').classList.remove('hidden');
        document.querySelector('.book-info').classList.remove('hidden');
        document.querySelector('.book-cover2').classList.remove('hidden');
        document.querySelector('.book-info2').classList.remove('hidden');
    });

    const chapterIndex = document.querySelector('.chap');
    chapterIndex.insertBefore(backButton, chapterIndex.firstChild);
}

addBackButtonToChapterContent('chapter1');
addBackButtonToChapterContent('chapter2');
addBackButtonToChapterIndex();

document.querySelectorAll('#book1 ul li a').forEach(chapterLink => {
    chapterLink.addEventListener('click', function (event) {
        event.preventDefault();
        const chapterIndex = document.querySelector('.chap');
        const chapterSectionId = this.getAttribute('href');
        const chapterSection = document.querySelector(chapterSectionId);

        chapterIndex.classList.add('hidden');
        chapterSection.classList.remove('hidden');
        document.querySelector('.book-cover').classList.add('hidden');
        document.querySelector('.book-info').classList.add('hidden');
    });
});

document.querySelector('.book-cover2').addEventListener('click', function (event) {
    event.preventDefault();
    this.classList.add('hidden');
    document.querySelector('.book-info2').classList.add('hidden');
    var bookSection2 = document.querySelector('#book2');
    bookSection2.classList.remove('hidden');

    var chap2 = document.querySelector('.chap2');
    if (chap2.classList.contains('hidden')) {
        chap2.classList.remove('hidden');
    }
    document.querySelector('#book1').classList.add('hidden');
    document.querySelector('.book-cover').classList.add('hidden');
    document.querySelector('.book-info').classList.add('hidden');
});

function addBackButtonToChapterContent2(chapterid2) {
    const backButton2 = document.createElement('button');
    backButton2.innerText = 'Back to Chapter Index';
    backButton2.addEventListener('click', function () {
        document.getElementById(chapterid2).classList.add('hidden');
        document.querySelector('.chap2').classList.remove('hidden');
    });

    const chapterContent2 = document.getElementById(chapterid2);
    chapterContent2.insertBefore(backButton2, chapterContent2.firstChild);
}

function addBackButtonToChapterIndex2() {
    const backButton2 = document.createElement('button');
    backButton2.innerText = 'Back to Book Cover';
    backButton2.addEventListener('click', function () {
        document.querySelector('.chap2').classList.add('hidden');
        document.getElementById('chapter21').classList.add('hidden');
        document.getElementById('chapter22').classList.add('hidden');
        document.getElementById('chapter23').classList.add('hidden');
        document.querySelector('.book-cover').classList.remove('hidden');
        document.querySelector('.book-info').classList.remove('hidden');
        document.querySelector('.book-cover2').classList.remove('hidden');
        document.querySelector('.book-info2').classList.remove('hidden');
    });

    const chapterIndex2 = document.querySelector('.chap2');
    chapterIndex2.insertBefore(backButton2, chapterIndex2.firstChild);
}

addBackButtonToChapterContent2('chapter21');
addBackButtonToChapterContent2('chapter22');
addBackButtonToChapterContent2('chapter23');
addBackButtonToChapterIndex2();

document.querySelectorAll('#book2 ul li a').forEach(chapterLink => {
    chapterLink.addEventListener('click', function (event) {
        event.preventDefault();
        const chapterIndex2 = document.querySelector('.chap2');
        const chapterSectionId2 = this.getAttribute('href');
        const chapterSection2 = document.querySelector(chapterSectionId2);

        chapterIndex2.classList.add('hidden');
        chapterSection2.classList.remove('hidden');
        document.querySelector('.book-cover2').classList.add('hidden');
        document.querySelector('.book-info2').classList.add('hidden');
    });
});

function loadChapterContent2(chapterId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(text => {
            const chapters = text.split('justinblog');
            const chapterIndex = parseInt(chapterId.replace('#chapter', ''), 10) - 1;
            document.querySelector(chapterId + '_c2').innerHTML = chapters[chapterIndex];
        })
        .catch(error => {
            console.error('Error loading chapter:', error);
        });
}

loadChapterContent2('#chapter1', 'blog.txt');
loadChapterContent2('#chapter2', 'blog.txt');
loadChapterContent2('#chapter3', 'blog.txt');

function requestNotificationPermission() {
    // alert('1a');
    if ('Notification' in window) {
        // alert('2a');
        Notification.requestPermission().then(permission => {
            // alert('3a');
            if (permission === 'granted') {
                // alert('通知許可已獲得');
                console.log('通知許可已獲得');
                subscribeUserToPush();
                // alert('in 通知許可sec');
            } else {
                // alert('通知許可未獲得: ' + permission);
                console.log('通知許可未獲得: ' + permission);
            }
        }).catch(error => {
            // alert('錯誤發生: ' + error);
            console.log('錯誤發生: ' + error);
        });
    }
}

function subscribeUserToPush() {
    // alert('in 通知許可');
    navigator.serviceWorker.ready.then(function (registration) {
        // alert('in nav aginaa');
        const subscribeOptions = {
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array('BML9uYlsJUmBtRzgEOpXAGb0S6-wCjd67sJ6KoifY_gmeEdnHGGYIwvljaWePooheQsC3BbBi3f4izn9F50byS8')
        };

        return registration.pushManager.subscribe(subscribeOptions);
    })
        .then(function (pushSubscription) {
            // alert('in TT');
            console.log('接收到推送訂閱:', JSON.stringify(pushSubscription));
            // alert('接收到推送訂閱:', JSON.stringify(pushSubscription));
            sendSubscriptionToBackEnd(pushSubscription);
            return pushSubscription;
        });
}

function sendSubscriptionToBackEnd(subscription) {
    fetch('https://justincode.pythonanywhere.com/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription)
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error('無法訂閱推送服務，響應狀態: ' + response.status);
            }
            return response.json();
        })
        .then(function (responseData) {
            console.log('訂閱成功:', responseData);
            // alert('訂閱成功:', responseData);
        })
        .catch(function (error) {
            console.error('訂閱推送服務出錯:', error);
            // alert('訂閱推送服務出錯: ' + error.message);
        });
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

window.addEventListener('beforeunload', function (event) {
    sendLeaveNotification();
});

function sendLeaveNotification() {
    fetch('https://justincode.pythonanywhere.com/notify-leave', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'byebye' })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('發送離開通知失敗，響應狀態: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('離開通知發送成功:', data);
            // alert('離開通知發送成功:', data);
        })
        .catch(error => {
            console.error('發送離開通知出錯:', error);
            // alert('發送離開通知出錯: ' + error.message);
        });
}

function initApp() {
    requestNotificationPermission();
}

initApp();
