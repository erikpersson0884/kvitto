const themeButton = document.getElementById('themeButton');
const themeButtonImg = document.getElementById('themeButtonImg');


let currentTheme = localStorage.getItem('currentTheme') || 'dark';
setToCurrentTheme();

themeButton.onclick = () => {
    if (currentTheme === 'dark'){        
        currentTheme = 'light';
    } else {
        currentTheme = 'dark';
    }

    setToCurrentTheme();
}

function setToCurrentTheme(){

    document.body.classList.remove('dark', 'light');
    document.body.classList.add(currentTheme);

    themeButtonImg.src = `./img/${currentTheme === 'dark' ? 'light' : 'dark'}.svg`;

    localStorage.setItem('currentTheme', currentTheme);

}