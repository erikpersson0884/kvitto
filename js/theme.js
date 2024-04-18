const themeButton = document.getElementById('themeButton');
const themeButtonImg = document.getElementById('themeButtonImg');


let currentTheme;


if (localStorage.getItem('theme')){
    currentTheme = localStorage.getItem('theme');
    document.body.classList.add(currentTheme);
    themeButtonImg.src = `./img/${currentTheme}.svg`;
}

themeButton.onclick = () => {
    toggleTheme();
}

function toggleTheme(){
    if (currentTheme === 'dark'){        
        currentTheme = 'light';
    } else {
        currentTheme = 'dark';
    }
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(currentTheme);
    localStorage.setItem('theme', currentTheme);

    themeButtonImg.src = `./img/${currentTheme}.svg`;
}