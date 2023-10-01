const menu = document.getElementById('mySidenav');

const filetypes = [
    'txt',
    'js',
    'php',
    'html',
]

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function updateCurrentMenu(tabid) {
    let sections = menu.getElementsByTagName('a');
    
    for(let i = 1; menu.children.length > 1; i++)
    {
        menu.removeChild(sections[1]);
    }

    sections = document.getElementById(tabid).
        getElementsByClassName('anchor');

    for(let i = 0; i < sections.length; i++){
        let a = document.createElement('a');
        a.href = '#' + sections[i].id;
        a.innerHTML = sections[i].innerHTML + '.' + filetypes[getRandomInt(4)];

        menu.appendChild(a);
    }
}