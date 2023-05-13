import { getCanvas, init } from "./Canvas.js";
import { Keyboard } from "./Controls/Keyboard.js";
import { Mouse } from "./Controls/Mouse.js";
import { Editor, MenuField } from "./Editor.js";
import { onScreenResize } from "./Screen.js";

window.addEventListener('resize', onScreenResize, true);

//Mouse Events
let canvas = getCanvas();
canvas.addEventListener('mousedown', Mouse.mouseClickEvent);
canvas.addEventListener('mouseup', Mouse.mouseClickEvent);
canvas.addEventListener('mousemove', Mouse.mouseMoveEvent);

document.body.onmousedown = function(e) {
    if(e.button == 1) {
        e.preventDefault();
        return false;
    }
}

//Keyboard Events
document.addEventListener('keydown', Keyboard.keyEvent);
document.addEventListener('keyup', Keyboard.keyEvent);  

init();