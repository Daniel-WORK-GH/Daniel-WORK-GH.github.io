import { GRID_SIZE } from "../Screen.js";

export { MouseState }

class MouseState{
    /**
     * Create a MouseState object.
     * 
     * It hold the current state of the mouse : position, button states
     * @param {number} x Mouse x location
     * @param {number} y Mouse y location
     * @param {boolean} l Mouse left key pressed [t/f]
     * @param {boolean} r Mouse right key pressed [t/f]
     * @param {boolean} m Mouse middle key pressed [t/f]
     */
    constructor(x, y, l, r, m){
        this.x = x;
        this.y = y;
        
        this.left = l;
        this.right = r;
        this.middle = m;
    }

    toGridPoint(){
        return [
            Math.round(this.x / GRID_SIZE) * GRID_SIZE,
            Math.round(this.y / GRID_SIZE) * GRID_SIZE
        ];
    }

    toPoint(){
        return [this.x, this.y]
    }
}
