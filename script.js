// Keep the footer year current.
document.getElementById('year').textContent = new Date().getFullYear();

// Light / dark toggle. With no saved choice the page follows the system setting.
(function () {
    var root = document.documentElement;
    var button = document.getElementById('theme-toggle');
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)');

    function currentTheme() {
        var chosen = root.getAttribute('data-theme');
        if (chosen === 'light' || chosen === 'dark') return chosen;
        return systemDark.matches ? 'dark' : 'light';
    }

    function updateLabel() {
        var label = currentTheme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
        button.setAttribute('aria-label', label);
        button.setAttribute('title', label);
    }

    button.addEventListener('click', function () {
        var next = currentTheme() === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) { }
        updateLabel();
    });

    if (systemDark.addEventListener) systemDark.addEventListener('change', updateLabel);
    updateLabel();
})();

// Remove any service worker left over from the old site so returning
// visitors always get the latest version of the page.
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
        registrations.forEach(function (registration) { registration.unregister(); });
    }).catch(function () { /* not available (e.g. opened as a local file) */ });
}

/* ============================================================================
   Retired: novel & blog reader, push notifications (kept for reference).
   The matching HTML is commented out in index.html.
   ============================================================================

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

// Push notifications (PythonAnywhere backend) were also removed:
// requestNotificationPermission, subscribeUserToPush, sendSubscriptionToBackEnd,
// urlBase64ToUint8Array, sendLeaveNotification. See git history to restore.

============================================================================ */