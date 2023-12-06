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
            document.querySelector(chapterId).innerHTML = text;
        })
        .catch(error => {
            console.error('Error loading chapter:', error);
        });
}

loadChapterContent('#chapter1_c', 'novel.txt');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll('nav ul li a').forEach(tab => {
    tab.addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelectorAll('main > section').forEach(section => {
            section.classList.add('hidden');
        });

        var targetSection = document.querySelector(this.getAttribute('href'));
        targetSection.classList.remove('hidden');
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

document.querySelector('.book-info').addEventListener('click', function (event) {
    event.preventDefault();
    this.classList.add('hidden');
    document.querySelector('.book-cover').classList.add('hidden');
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

function addBackButtonToChapterContent() {
    const backButton = document.createElement('button');
    backButton.innerText = 'Back to Chapter Index';
    backButton.addEventListener('click', function () {
        document.getElementById('chapter1').classList.add('hidden');
        document.querySelector('.chap').classList.remove('hidden');
    });

    const chapterContent = document.getElementById('chapter1');
    chapterContent.insertBefore(backButton, chapterContent.firstChild);
}

function addBackButtonToChapterIndex() {
    const backButton = document.createElement('button');
    backButton.innerText = 'Back to Book Cover';
    backButton.addEventListener('click', function () {
        document.querySelector('.chap').classList.add('hidden');
        document.getElementById('chapter1').classList.add('hidden');
        document.querySelector('.book-cover').classList.remove('hidden');
        document.querySelector('.book-info').classList.remove('hidden');
        document.querySelector('.book-cover2').classList.remove('hidden');
        document.querySelector('.book-info2').classList.remove('hidden');
    });

    const chapterIndex = document.querySelector('.chap');
    chapterIndex.insertBefore(backButton, chapterIndex.firstChild);
}

addBackButtonToChapterContent();
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

document.querySelector('.book-info2').addEventListener('click', function (event) {
    event.preventDefault();
    this.classList.add('hidden');
    document.querySelector('.book-cover2').classList.add('hidden');
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

function addBackButtonToChapterContent2() {
    const backButton2 = document.createElement('button');
    backButton2.innerText = 'Back to Chapter Index';
    backButton2.addEventListener('click', function () {
        document.getElementById('chapter12').classList.add('hidden');
        document.querySelector('.chap2').classList.remove('hidden');
    });

    const chapterContent2 = document.getElementById('chapter12');
    chapterContent2.insertBefore(backButton2, chapterContent2.firstChild);
}

function addBackButtonToChapterIndex2() {
    const backButton2 = document.createElement('button');
    backButton2.innerText = 'Back to Book Cover';
    backButton2.addEventListener('click', function () {
        document.querySelector('.chap2').classList.add('hidden');
        document.getElementById('chapter12').classList.add('hidden');
        document.querySelector('.book-cover').classList.remove('hidden');
        document.querySelector('.book-info').classList.remove('hidden');
        document.querySelector('.book-cover2').classList.remove('hidden');
        document.querySelector('.book-info2').classList.remove('hidden');
    });

    const chapterIndex2 = document.querySelector('.chap2');
    chapterIndex2.insertBefore(backButton2, chapterIndex2.firstChild);
}

addBackButtonToChapterContent2();
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
            document.querySelector(chapterId).innerHTML = text;
        })
        .catch(error => {
            console.error('Error loading chapter:', error);
        });
}

loadChapterContent2('#chapter1_c2', 'blog.txt');