import { Connection } from "../Connections/Connection.js";
import { GateN } from "./GateN.js";

export { AndGate }

class AndGate extends GateN{
    static{
        this.TEXTURE = new Image();
        this.TEXTURE.src = 'https://daniel-work-gh.github.io/gates/Assets/And.svg';
    }
    
    constructor(x = 0, y = 0, inputs = 2){
        super(x, y, inputs);
    }

    getState(){
        let out = true;
        this.inputs.forEach(i => {
            out &&= i.getState();
        });

        return out;
    }

    draw(context){
        super.draw(context);
        context.drawImage(AndGate.TEXTURE, this.x, this.y, this.WIDTH, this.HEIGHT);
    }
}