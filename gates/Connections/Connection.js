import { Mouse } from "../Controls/Mouse.js"
import { GRID_SIZE } from "../Screen.js";
import { CONNECTION_LIST } from "./Connections.js";

export { Connection }

/**
 * Notice : Connections are stored relative to their parent
 */
class Connection{
    static RADIUS = 3;

    constructor(x = 0, y = 0, parent = undefined){
        this.x = x;
        this.y = y;

        this.parent = parent;

        this.wire = null;

        CONNECTION_LIST.push(this);
    }

    getState(){
        return Boolean(this.wire && this.wire.state);
    }

    setState(state){
        if(!this.wire) return;
        this.wire.setState(state);
    }

    /**
     * checks if the mouse hovers over the point and a
     * wire should be connected to it on click. Should be called
     * only during the proccess of creating a new wire
     * @returns {boolean} true - if a wire was conncted,
     * false otherwise
     */
    isHoverClick(){      
        let mouse = Mouse.getMouseState();

        let x = this.x + (this.parent != undefined ? this.parent.x : 0);
        let y = this.y + (this.parent != undefined ? this.parent.y : 0);

        //Check distance between connection point
        //and current mouse location(on grid) in order to decide
        //if it should connect on left click
        let mx = Math.round(mouse.x / GRID_SIZE) * GRID_SIZE;
        let my = Math.round(mouse.y / GRID_SIZE) * GRID_SIZE;
        let distance = (mx - x) ** 2 + (my - y) ** 2;

        //Check mouse hover over connection and mouse pressed.
        //return boolean value based on results
        if(distance <= Connection.RADIUS ** 2){
            if(mouse.left){
                return true;
            }
        }
        return false;
    }

    dispose(){
        if(this.wire){
            this.wire.dispose();
        }

        let i = CONNECTION_LIST.indexOf(this);
        CONNECTION_LIST.splice(i, 1);
    }
}