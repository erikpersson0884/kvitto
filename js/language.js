
const languageButton = document.getElementById('languageButton');
const languageButtonImg = document.getElementById('languageButtonImg');

let currentLanguage;

if (localStorage.getItem('language')) {
    currentLanguage = localStorage.getItem('language');
} else {
    currentLanguage = 'sv';
}

setLanguage(currentLanguage);


languageButton.addEventListener('click', function() {
    toggleLanguage();
});


function toggleLanguage() {
    setLanguage(currentLanguage === 'en' ? 'sv' : 'en');
}

function setLanguage(langauge) {
    currentLanguage = langauge;
    localStorage.setItem('language', langauge);
    languageButtonImg.src = `img/${langauge}.svg`;
    document.documentElement.lang = langauge;

    const translateTexts = document.querySelectorAll('.translateText');
    translateTexts.forEach(element => {
        switch (currentLanguage) {
            case 'en':
                element.innerHTML = element.getAttribute('data-english');
                break;
            case 'sv':
                element.innerHTML = element.getAttribute('data-swedish');
                break;
        }
    });

    const translateInputs = document.querySelectorAll('.translateInput');
    translateInputs.forEach(element => {
        switch (currentLanguage) {
            case 'en':
                element.placeholder = element.getAttribute('data-english');
                break;
            case 'sv':
                element.placeholder = element.getAttribute('data-swedish');
                break;
        }
    });
}

