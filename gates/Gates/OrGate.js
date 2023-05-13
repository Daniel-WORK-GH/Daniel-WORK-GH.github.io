import { Connection } from "../Connections/Connection.js";
import { Gate } from "./Gate.js";
import { GateN } from "./GateN.js";

export { OrGate }

const TESTING = false;

class OrGate extends GateN{
    static{
        this.TEXTURE = new Image();
        this.TEXTURE.src = '../Assets/Or.svg';
    }
    
    constructor(x = 0, y = 0, inputs = 2){
        super(x, y, inputs);
    }

    getState(){
        let out = false;
        this.inputs.forEach(i => {
            out ||= i.getState();
        });
        
        return out;
    }


    draw(context, drawgate = true){
        super.draw(context)
        if(drawgate){
            context.drawImage(OrGate.TEXTURE, this.x, this.y, this.WIDTH, this.HEIGHT);
        }
    }
}