import { AndGate } from "./AndGate.js";

export {NandGate}

class NandGate extends AndGate{
    static{
        this.TEXTURE = new Image();
        this.TEXTURE.src = '../Assets/Nand.svg';
    }
    
    constructor(x = 0, y = 0, inputs = 2){
        super(x, y, inputs);
    }

    getState(){
        return !super.getState();
    }

    draw(context, drawgate = true){
        super.draw(context, false);
        if(drawgate){
            context.drawImage(NandGate.TEXTURE, this.x, this.y, this.WIDTH, this.HEIGHT);
        }
    }
}