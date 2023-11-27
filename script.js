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
        section.classList.add('hidden');
    });
}

document.querySelectorAll('nav ul li a').forEach(tab => {
    tab.addEventListener('click', function (event) {
        event.preventDefault();
        hideAllSections();
        var targetSection = document.querySelector(this.getAttribute('href'));
        targetSection.classList.remove('hidden');
    });
});

document.getElementById('site-title').addEventListener('click', function () {
    document.getElementById('resume').classList.add('hidden');

    document.querySelectorAll('main > section').forEach(section => {
        if (section.id !== 'resume') {
            section.classList.remove('hidden');
        }
    });
});
