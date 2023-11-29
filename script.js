document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function hideAllSections() {
    document.querySelectorAll('main > section').forEach(section => {
        if (section.id !== 'daily-novels') {
            section.classList.add('hidden');
        }
    });
}

document.querySelectorAll('nav ul li a').forEach(tab => {
    tab.addEventListener('click', function (event) {
        event.preventDefault();

        document.querySelectorAll('main > section').forEach(section => {
            section.classList.add('hidden');
        });

        var targetSection = document.querySelector(this.getAttribute('href'));
        targetSection.classList.remove('hidden');

        var dailyNovelsSection = document.getElementById('daily-novels');
        if (this.getAttribute('href') === '#daily-novels') {
            dailyNovelsSection.classList.remove('hidden');
        } else {
            dailyNovelsSection.classList.add('hidden');
        }
    });
});

document.getElementById('site-title').addEventListener('click', function () {
    document.getElementById('resume').classList.add('hidden');
    document.getElementById('daily-novels').classList.add('hidden');

    document.querySelectorAll('main > section').forEach(section => {
        if (section.id !== 'resume') {
            section.classList.remove('hidden');
        }
        if (section.id !== 'daily-novels') {
            section.classList.remove('hidden');
        }
    });
});

document.querySelector('.book-cover').addEventListener('click', function (event) {
    event.preventDefault();
    this.style.display = 'none';
    var bookSection = document.querySelector(this.getAttribute('href'));
    bookSection.style.display = 'block';
});

document.querySelectorAll('#book1 ul li a').forEach(chapterLink => {
    chapterLink.addEventListener('click', function (event) {
        event.preventDefault();

        var chapterIndex = document.querySelector('#book1 .chap');
        chapterIndex.style.display = 'none';

        var chapterSectionId = this.getAttribute('href');
        var chapterSection = document.querySelector(chapterSectionId);
        chapterSection.classList.remove('hidden');
    });
});

function hideAllSubSections(parentSection) {
    parentSection.querySelectorAll('section').forEach(subSection => {
        subSection.classList.add('hidden');
    });
}

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

function addBackButton(parentElementId, targetElementId) {
    const parentElement = document.querySelector(parentElementId);
    if (parentElement) {
        const backButton = document.createElement('button');
        backButton.innerText = 'Back';
        backButton.addEventListener('click', function() {
            document.querySelector(targetElementId).style.display = 'block';
            parentElement.classList.add('hidden');
        });

        parentElement.insertBefore(backButton, parentElement.firstChild);
    }
}

addBackButton('#book1 .chap', '.book-cover');
addBackButton('#chapter1', '#book1 .chap');
