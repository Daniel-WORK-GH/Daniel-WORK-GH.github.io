import { Connection } from "../Connections/Connection.js";
import { Gate } from "./Gate.js";
import { GateN } from "./GateN.js";

export { NotGate }

const TESTING = false;

class NotGate extends GateN{
    static{
        this.TEXTURE = new Image();
        this.TEXTURE.src = 'https://daniel-work-gh.github.io/gates/Assets/Not.svg';
    }
    
    constructor(x = 0, y = 0){
        super(x, y, 1);
    }

    getState(){
        let i1 = this.inputs[0].getState();
        let out = !i1;

        return out;
    }


    draw(context){
        context.drawImage(NotGate.TEXTURE, this.x, this.y, this.WIDTH, this.HEIGHT);
    }
}