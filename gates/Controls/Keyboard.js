import { KeyboardState } from "./KeyboardState.js";

export { Keys, Keyboard }

const TESTING = false;

const Keys = {
    'KeyA' : false,
    'KeyB' : false,
    'KeyC' : false,
    'KeyD' : false,
    'KeyE' : false,
    'KeyF' : false,
    'KeyG' : false,
    'KeyH' : false,
    'KeyI' : false,
    'KeyJ' : false,
    'KeyK' : false,
    'KeyL' : false,
    'KeyM' : false,
    'KeyN' : false,
    'KeyO' : false,
    'KeyP' : false,
    'KeyQ' : false,
    'KeyR' : false,
    'KeyS' : false,
    'KeyT' : false,
    'KeyU' : false,
    'KeyV' : false,
    'KeyW' : false,
    'KeyX' : false,
    'KeyY' : false,
    'KeyZ' : false,
    'Digit1' : false,
    'Digit2' : false,
    'Digit3' : false,
    'Digit4' : false,
    'Digit5' : false,
    'Digit6' : false,
    'Digit7' : false,
    'Digit8' : false,
    'Digit9' : false,
    'Digit0' : false,
}

const KeyLookup = {
    'KeyA' : ['a', 'A'],
    'KeyB' : ['b', 'B'],
    'KeyC' : ['c', 'C'],
    'KeyD' : ['d', 'D'],
    'KeyE' : ['e', 'E'],
    'KeyF' : ['f', 'F'],
    'KeyG' : ['g', 'G'],
    'KeyH' : ['h', 'H'],
    'KeyI' : ['i', 'I'],
    'KeyJ' : ['j', 'J'],
    'KeyK' : ['k', 'K'],
    'KeyL' : ['l', 'L'],
    'KeyM' : ['m', 'M'],
    'KeyN' : ['n', 'N'],
    'KeyO' : ['o', 'O'],
    'KeyP' : ['p', 'P'],
    'KeyQ' : ['q', 'Q'],
    'KeyR' : ['r', 'R'],
    'KeyS' : ['s', 'S'],
    'KeyT' : ['t', 'T'],
    'KeyU' : ['u', 'U'],
    'KeyV' : ['v', 'V'],
    'KeyW' : ['w', 'W'],
    'KeyX' : ['x', 'X'],
    'KeyY' : ['y', 'Y'],
    'KeyZ' : ['z', 'Z'],
    'Digit1' : ['1', '1'],
    'Digit2' : ['1', '2'],
    'Digit3' : ['1', '3'],
    'Digit4' : ['1', '4'],
    'Digit5' : ['1', '5'],
    'Digit6' : ['1', '6'],
    'Digit7' : ['1', '7'],
    'Digit8' : ['1', '8'],
    'Digit9' : ['1', '9'],
    'Digit0' : ['1', '0'],
}

class Keyboard{
    /**
     * Create a KeyboardState object and return it
     * @returns {KeyboardState}
     */
    static getKeyboardState(){
        return new KeyboardState(Keys);
    }

    /**
     * Updates which buttons are pressed on keyboard,
     * supports A-Z 0-9
     * 
     * Needs to be called each button press/release
     * @param {*} e Keyboard press event
     */
    static keyEvent(e) {
        if (Keys[e.code] !== undefined) {     
            Keys[e.code] = e.type === "keydown";
        }
    }
}