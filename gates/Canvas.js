import { BaseObject } from "./BaseObject.js";
import { Connection } from "./Connections/Connection.js";
import { Wire } from "./Connections/Wire.js";
import { WireFactory } from "./Connections/WireFactory.js";
import { WIRES_LIST } from "./Connections/Wires.js";
import { Keyboard } from "./Controls/Keyboard.js";
import { Mouse } from "./Controls/Mouse.js";
import { Lamp } from "./Destinations/Lamp.js";
import { Factory } from "./Factory.js";
import { GRID_SIZE, getScreenDim } from "./Screen.js";
import { Switch } from "./Sources/Switch.js";
import { TYPES } from "./Types.js";
export { init, getCanvas }

//Graphics
var canvas = document.getElementById("mycanvas");
var context = canvas.getContext("2d");

//UI
var menu = document.getElementById("mymenu");

//Temps for creating objects
var inputs = 2;
var wire = null;
/**
 * @type {BaseObject}
 */
var tempobj = null; 

//Mouse state data
var mouse = Mouse.getMouseState();
var prevmouse = mouse;

//Keyboard state data
var keyboard = Keyboard.getKeyboardState();
var prevkeyboard = keyboard;

//Lists of all objects on screen
var objects = [

];
const wires = WIRES_LIST;

function init(){
    let screen = getScreenDim();
    setSize(screen);

    setInterval(mainLoop, 1000 / 60);

    initMenu();
}

function getCanvas(){
    return canvas;
}

function initMenu(){
    const collection = document.getElementsByClassName("btn");

    for (let i = 0; i < collection.length; i++) {
        const e = collection[i];

        e.onclick = function(){
            onMenuButtonClick(e);
        };
    }
}

function onMenuButtonClick(sender){
    if(wire) return; 

    if(tempobj){
        tempobj.dispose();
        tempobj = null;
    }

    let item = sender.innerHTML;
    tempobj = Factory.createFromMenu(item, 0, 0, inputs);

    console.log(`Created '${item}'`);
}

function setSize(screen){
    let menubounds = menu.getBoundingClientRect();

    canvas.style.left = `${menubounds.width}px`;
    canvas.width = screen[0] - menubounds.width;
    canvas.height = screen[1];

    canvas.style.position = "absolute";

    context.webkitImageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
}

function update(){
    prevmouse = mouse;
    mouse = Mouse.getMouseState();

    prevkeyboard = keyboard;
    keyboard = Keyboard.getKeyboardState();
    
    updateInputCoutn();
    updateDeletingObjects();
    handleRemoveItems();

    let screen = getScreenDim();

    if(canvas.width != screen[0] || canvas.height != screen[1]){
        setSize(screen);
    } 

    checkRemoveTemps();

    createWire();
    updateTemps();
}

function updateTemps(){
    if(!tempobj) return;

    let x = Math.round(mouse.x / GRID_SIZE) * GRID_SIZE;
    let y = Math.round(mouse.y / GRID_SIZE) * GRID_SIZE;

    tempobj.setPosition(x, y)

    //Detect click
    if(mouse.left && !prevmouse.left){
        objects.push(tempobj);
        tempobj = null;
    }
}

function checkRemoveTemps(){
    //Detect right click
    if(mouse.right && !prevmouse.right){
        if(tempobj){
            tempobj.dispose();
            tempobj = null;
        }
        if(wire){
            WireFactory.abort();
            wire = null;
        }
    }
}

function handleRemoveItems(){
    if(mouse.right){
        for (let i = 0; i < wires.length; i++) {
            const w = wires[i];
            if(w.checkIntersection(mouse.toPoint(), prevmouse.toPoint())){
                w.dispose();
            }
        }
    }
}

function drawGrid(){
    const GridSize = GRID_SIZE;

    let columns = canvas.width / GridSize;
    let rows = canvas.height / GridSize;

    context.strokeStyle = '#D3D3D3';

    for(let i = 0; i < rows; i++){
        context.beginPath();
        context.moveTo(0, i * GridSize + 0.5);
        context.lineTo(canvas.width, i * GridSize + 0.5);
        context.stroke();
    }

    for(let i = 0; i < columns; i++){
        context.beginPath();
        context.moveTo(i * GridSize + 0.5, 0);
        context.lineTo(i * GridSize + 0.5, canvas.height);
        context.stroke();
    }

    context.strokeStyle = 'black';
}

function updateInputCoutn(){
    if(keyboard.N2) inputs = 2;
    if(keyboard.N3) inputs = 3;
    if(keyboard.N4) inputs = 4;
    if(keyboard.N5) inputs = 5;
}

function updateDeletingObjects(){
    if(mouse.right){
        for (let i = 0; i < objects.length; i++) {
            const e = objects[i];
            if(e.checkIntersection(mouse)){
                e.dispose()
                objects.splice(i, 1);
                i--;
            }
        }
    }
}

function createWire(){
    if(tempobj) return;

    let tempwire = WireFactory.handleCreateWire();

    if(mouse.left && !prevmouse.left){
        if(!wire && tempwire){
            wire = tempwire
        }
    }

    if(wire && !tempwire){
        wires.push(wire);
        wire = null;
    }
}

function drawTemps(){
    if(tempobj){
        tempobj.draw(context);
    }
    if(wire){
        wire.draw(context);
    }
}

function moveObjcet(){
    if(wire) return;

    if(mouse.left && !prevmouse.left){
        for (let i = 0; i < objects.length; i++) {
            const e = objects[i];
            if(e.checkIntersection(mouse)){
                tempobj = e;
                break;
            }
        }
    }
}

function mainLoop(){
    update();

    context.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid();

    objects.forEach(o => {
        o.update();
    });

    objects.forEach(o => {
        o.draw(context);
    });

    wires.forEach(w => {
        w.draw(context);
    });

    drawTemps();
}