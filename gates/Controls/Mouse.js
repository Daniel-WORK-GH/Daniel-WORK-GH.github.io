import { MouseState } from "./MouseState.js";
export { Mouse }

/**
 * The event.button variable on mouse click is set
 * with the values 0,1,2. to make the code more readable
 * it will be converted to a corosponding string 
 */
const LOOKUP = {
    0 : "LEFT",
    1 : "MIDDLE",
    2 : "RIGHT", 
}

/**
 * Stores the state of three mouse buttons, 
 * 
 * true - currently pressed
 * 
 * false - not pressed
 */
const MouseButtons = {
    "LEFT" : false,
    "MIDDLE" : false,
    "RIGHT" : false
}

/**
 * Stores the current mouse X,Y location
 */
const MousePosition = {
    X : 0,
    Y : 0
}

class Mouse{
    /**
     * Create a MouseState object and return it
     * @returns {MouseState}
     */
    static getMouseState(){
        const state = new MouseState(
            MousePosition.X,
            MousePosition.Y,
            MouseButtons.LEFT,
            MouseButtons.RIGHT,
            MouseButtons.MIDDLE
        );
        
        return state;
    }

    /**
     * Updates which buttons are pressed [left, middle, right]
     * 
     * Needs to be called each button press/release
     * @param {*} e Mouse click event
     */
    static mouseClickEvent(e) {
        const button = LOOKUP[e.button];

        if (MouseButtons[button] !== undefined) {
            MouseButtons[button] = e.type == "mousedown";
        }
    }

    /**
     * Updates the current mouse position
     * 
     * Needs to be called on mouse move
     * @param {*} e Mouse move event
     */
    static mouseMoveEvent(e){
        let rect = e.target.getBoundingClientRect();
        
        MousePosition.X = e.clientX - rect.left;
        MousePosition.Y = e.clientY - rect.top;
    }
}