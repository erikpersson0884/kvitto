
const languageButton = document.getElementById('languageButton');
const languageButtonImg = document.getElementById('languageButtonImg');

let currentLanguage;

if (localStorage.getItem('language')) {
    currentLanguage = localStorage.getItem('language');
} else {
    currentLanguage = 'swe';
}

setLanguage(currentLanguage);


languageButton.addEventListener('click', function() {
    toggleLanguage();
});


function toggleLanguage() {
    setLanguage(currentLanguage === 'eng' ? 'swe' : 'eng');
}

function setLanguage(langauge) {
    currentLanguage = langauge;
    localStorage.setItem('language', langauge);
    languageButtonImg.src = `img/${langauge}.svg`;

    const translateTexts = document.querySelectorAll('.translateText');
    translateTexts.forEach(element => {
        switch (currentLanguage) {
            case 'eng':
                element.innerHTML = element.getAttribute('data-english');
                break;
            case 'swe':
                element.innerHTML = element.getAttribute('data-swedish');
                break;
        }
    });

    const translateInputs = document.querySelectorAll('.translateInput');
    translateInputs.forEach(element => {
        switch (currentLanguage) {
            case 'eng':
                element.placeholder = element.getAttribute('data-english');
                break;
            case 'swe':
                element.placeholder = element.getAttribute('data-swedish');
                break;
        }
    });
}

