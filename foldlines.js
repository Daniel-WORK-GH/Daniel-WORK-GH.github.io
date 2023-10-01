/**
 * God bless stack overflow 
 * https://stackoverflow.com/questions/14560302/html-line-drawing-without-canvas-just-js
 */
function linedraw(x1, y1, x2, y2, id, _class)
{
    if (x2 < x1) {
        var tmp;
        tmp = x2 ; x2 = x1 ; x1 = tmp;
        tmp = y2 ; y2 = y1 ; y1 = tmp;
    }

    var lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    var m = (y2 - y1) / (x2 - x1);

    var degree = Math.atan(m) * 180 / Math.PI;

    let div = document.createElement('div');

    div.style = `transform-origin: top left;
        transform: rotate(${degree}deg); width: ${lineLength}px; height: 1px;
        position: absolute; top: ${y1}px; left: ${x1}px;`;

    div.classList.add('line');
    div.classList.add(_class);
    div.id = id;


    document.body.appendChild(div);
}

var linesarr = [];

function drawFoldLines() {
    let temp = document.documentElement.scrollTop;
    document.documentElement.scrollTop = 0;

    let tabs = document.getElementsByClassName('tab')

    let lines = document.getElementsByClassName('line');
    for(let i = 0; lines.length > 0; i++)
    {
        document.body.removeChild(lines.item(0));
    }

    lines = document.getElementsByClassName('line');

    for(let i = 0; linesarr.length > 0; i++)
    {
        linesarr.pop();
    }

    for(let i = 0; i < tabs.length; i++){
        const t = tabs[i];
        var rect = t.getBoundingClientRect();

        if(rect.y == 0 && rect.bottom == 0) continue;

        linedraw(rect.x, rect.y, rect.x, rect.y + rect.height, "line" + lines.length, 'notselectedline');

        linesarr.push({id:"line" + linesarr.length, x:rect.x, y:rect.y, bottom:rect.y + rect.height})
    } 

    document.documentElement.scrollTop = temp;
}

function onClick(event) {
    var rect = document.body.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
   // y += document.documentElement.scrollTop;

    let lines = document.getElementsByClassName('selectedline');

    for(let i = 0; i < lines.length; i++){
        lines[i].classList.add('notselectedline');
        lines[i].classList.remove('selectedline');
    }

    let selected = undefined;
    let minheight = Number.MAX_VALUE;
    
    for(let i = 0; i < linesarr.length; i++){
        const l = linesarr[i];

        let mouse = l.y <= y && y <= l.bottom;

        if(mouse && l.bottom - l.y < minheight)
        {
            minheight = l.bottom - l.y;
            selected = l;
        }
    }

    if(!selected) return;

    document.getElementById(selected.id).classList.add('selectedline');
    document.getElementById(selected.id).classList.remove('notselectedline');
}

drawFoldLines();

document.addEventListener("click", onClick);

