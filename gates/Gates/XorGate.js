import { Connection } from "../Connections/Connection.js";
import { Gate } from "./Gate.js";
import { GateN } from "./GateN.js";

export { XorGate }

const TESTING = false;

class XorGate extends GateN{
    static{
        this.TEXTURE = new Image();
        this.TEXTURE.src = '../Assets/Xor.svg';
    }
    
    constructor(x = 0, y = 0, inputs = 4){
        super(x, y, inputs);
    }

    getState(){
        let out = false;
        this.inputs.forEach(i => {
            let s = i.getState();
            out = (out || s) && !(out && s);
        });
        
        return out;
    }

    draw(context, drawgate = true){
        super.draw(context);
        if(drawgate){
            context.drawImage(XorGate.TEXTURE, this.x, this.y, this.WIDTH, this.HEIGHT);
        }
    }
}