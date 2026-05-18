// JavaScript for Popup
document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('project-popup');
    const closeBtn = document.querySelector('.close-btn');

    document.querySelectorAll('.project-card .button').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const card = this.closest('.project-card');
            const imageSrc = card.getAttribute('data-image');
            const name = card.getAttribute('data-name');
            const type = card.getAttribute('data-type');
            const description = card.getAttribute('data-description');
            const screenshotLink = card.getAttribute('data-screenshot');
            const projectLink = card.getAttribute('data-link');
            
            document.getElementById('popup-image').src = imageSrc;
            document.getElementById('popup-name').innerText = name;
            document.getElementById('popup-type').innerText = type;
            document.getElementById('popup-description').innerText = description;
            document.getElementById('popup-screenshot').href = screenshotLink;
            document.getElementById('popup-link').href = projectLink;
            
            popup.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    window.addEventListener('click', function (e) {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const projectName = card.getAttribute('data-name');
        card.querySelector('.project-name').textContent = projectName;
    });
});
