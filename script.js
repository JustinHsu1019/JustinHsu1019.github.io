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
    var bookSection = document.querySelector('#book1');
    bookSection.classList.remove('hidden');

    var chap = document.querySelector('.chap');
    if (chap.classList.contains('hidden')) {
        chap.classList.remove('hidden');
    }
});

function addBackButtonToChapterContent() {
    const backButton = document.createElement('button');
    backButton.innerText = 'Back to Chapter Index';
    backButton.addEventListener('click', function() {
        document.getElementById('chapter1').classList.add('hidden');
        document.querySelector('.chap').classList.remove('hidden');
        document.querySelector('.book-cover').classList.add('hidden');
    });

    const chapterContent = document.getElementById('chapter1');
    chapterContent.insertBefore(backButton, chapterContent.firstChild);
}

function addBackButtonToChapterIndex() {
    const backButton = document.createElement('button');
    backButton.innerText = 'Back to Book Cover';
    backButton.addEventListener('click', function() {
        document.querySelector('.chap').classList.add('hidden');
        document.querySelector('.book-cover').classList.remove('hidden');
        document.getElementById('chapter1').classList.add('hidden');
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
    });
});
