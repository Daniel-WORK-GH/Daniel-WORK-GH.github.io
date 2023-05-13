import { Mouse } from "../Controls/Mouse.js";
import { MouseState } from "../Controls/MouseState.js";
import { GRID_SIZE } from "../Screen.js";
import { Connection } from "./Connection.js";
import { WIRES_LIST } from "./Wires.js";
export { Wire }

class Wire{
    constructor(){
        //Logic
        this.wires = [];
        this.startwire = null;

        this.endconnection = null;
        this.startconnection = null;
        this.state = false;
        
        //Graphics
        this.points = [];
    }

    /**
     * Handle the creation proccess of a Wire.
     * @param {MouseState} mouse Current mouse state
     * @param {MouseState} prevmouse Previous mouse state
     */
    updateCreate(mouse, prevmouse){
        //Make mouse lock to grid
        let mx = Math.round(mouse.x / GRID_SIZE) * GRID_SIZE;
        let my = Math.round(mouse.y / GRID_SIZE) * GRID_SIZE;

        //Check for signle click
        if(mouse.left && !prevmouse.left){
            //Add the current point as a node
            this.points.push([mx, my]);
        }

        //If only one point exists add another one 
        //the additional point will be used as a temp point
        //that will be updated rapidly on mouse move
        if(this.points.length == 1){
            this.points.push([0, 0]);
        }

        //update the position of the temp point
        this.points[this.points.length - 1] = [mx, my];
    }

    /**
     * Set the new state of the wire and all wires
     * connected to it, notice each wire group can be
     * connected only to one source (Gate)
     * 
     * Update order: Wires -> This -> Gate
     * @param {boolean} state 
     */
    setState(state){
        //Update the state of all conencted 
        //wires to the new state
        this.wires.forEach(w => {
            w.setState(state);
        });

        //update the state of the current wire
        this.state = state;

        //update the end point gate [DEPRECATED] 
        if(this.endconnection){
            //this.endconnection.setState();
        }
    }

   
    /**
     * Get distance between line segment and point
     * @param {Array<Number>} p1 Line point 1
     * @param {Array<Number>} p2 Line point 2
     * @param {Array<Number>} p3 Point to calc distance
     * @returns Distance between line and point [p3]
     */
    #dist(p1, p2, p3){
        const [x1, y1] = p1;
        const [x2, y2] = p2;
        const [x3, y3] = p3;

        let px = x2-x1
        let py = y2-y1

        let norm = px*px + py*py

        let u =  ((x3 - x1) * px + (y3 - y1) * py) / norm

        if(u > 1){
            u = 1;
        }
        else if (u < 0){
            u = 0;
        }

        let x = x1 + u * px
        let y = y1 + u * py

        let dx = x - x3
        let dy = y - y3

        let dist = (dx*dx + dy*dy)**.5

        return dist;
    }

    /**
     * Calculate the minimun distance between the wire and the given point
     * @param {Array<number>} point 
     */
    getDistance(point){
        let dis = Number.MAX_VALUE;
        for (let i = 0; i < this.points.length - 1; i++) {
            const p1 = this.points[i];
            const p2 = this.points[i + 1];

            let d = this.#dist(p1, p2, point);

            if(d < dis) dis = d;
        }
        return dis;
    }
    
    #checkLineIntersection(p1, p2, p3, p4){
        let [a, b] = p1;
        let [c, d] = p2;
        let [p, q] = p3;
        let [r, s] = p4;

        var det, gamma, lambda;
        det = (c - a) * (s - q) - (r - p) * (d - b);
        if (det === 0) {
          return false;
        } else {
          lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
          gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
          return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
        }
    }

    /**
     * Check if a given a line intersects with the wire
     * @param {Array<Number>} p1 The first point of the line
     * @param {Array<Number>} p2 The second point of the line
     * @returns {boolean}
     */
    checkIntersection(p1, p2){
        let intersect = false;
        for (let i = 0; i < this.points.length - 1; i++) {
            const _p1 = this.points[i];
            const _p2 = this.points[i + 1];

            let d = this.#checkLineIntersection(_p1, _p2, p1, p2);

            if(d) intersect = true;
        }
        return intersect;
    }

    draw(context){
        //Check if there are points to draw.
        //Return if there aren't
        if(!this.points.length) return;

        //Save previous line width to reset it later
        //and set new line width to wanted value
        let tempwidth = context.lineWidth;
        let tempstyle = context.strokeStyle;
        context.lineWidth = 2.5;

        //Draw a line that passes through all 
        //the point in the points array
        context.beginPath();
        context.moveTo(...this.points[0]);
        for(let i = 1; i < this.points.length; i++){
            context.lineTo(...this.points[i]);
        }
        context.strokeStyle = this.state ? '#00ff00' : '#ff0000';
        context.stroke();

        //Reset the line width
        context.lineWidth = tempwidth;
        context.strokeStyle = tempstyle;
    }

    dispose(){
        if(this.endconnection){
            this.endconnection.wire = null;
        }
        if(this.startconnection){
            this.startconnection.wire = null;
        }

        this.wires.forEach(w => {
            w.dispose();
        });

        let index = WIRES_LIST.indexOf(this);
        WIRES_LIST.splice(index, 1);
    }
}