import { Connection } from "../Connections/Connection.js";
import { Gate } from "./Gate.js";

export { GateN }

const TESTING = false;

class GateN extends Gate{
    constructor(x = 0, y = 0, inputs = 2){
        super(x, y);

        if(inputs < 1 || inputs > 5) throw new Error("Too many connections");

        if(inputs == 1){
            this.inputs = [
                new Connection(0, 4/8 * this.HEIGHT, this),
            ];
        }

        if(inputs >= 2){
            this.inputs = [
                new Connection(0, 2/8 * this.HEIGHT, this),
                new Connection(0, 6/8 * this.HEIGHT, this)
            ];
        }
        if(inputs == 3 || inputs == 5){
            this.inputs.push(new Connection(0, 4/8 * this.HEIGHT, this));
        }
        if(inputs >= 4){
            this.inputs.push(new Connection(0, 3/8 * this.HEIGHT, this));
            this.inputs.push(new Connection(0, 5/8 * this.HEIGHT, this));
        }

        this.output = new Connection(this.WIDTH, 0.5 * this.HEIGHT, this)
    }

    draw(context){
        let tmp = context.lineWidth;

        context.lineWidth = 4;
        for (let i = 0; i < this.inputs.length; i++) {
            const e = this.inputs[i];

            context.beginPath();
            context.moveTo(this.x, this.y + e.y);
            context.lineTo(this.x + this.WIDTH / 2, this.y + e.y);
            context.stroke();
        }
        context.lineWidth = tmp;
    }
}