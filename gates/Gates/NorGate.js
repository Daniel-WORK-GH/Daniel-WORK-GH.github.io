import { OrGate } from "./OrGate.js";

export {NorGate}

class NorGate extends OrGate{
    static{
        this.TEXTURE = new Image();
        this.TEXTURE.src = '../Assets/Nor.svg';
    }
    
    constructor(x = 0, y = 0, inputs = 2){
        super(x, y, inputs);
    }

    getState(){
        return !super.getState();
    }

    draw(context){
        super.draw(context, false);

        context.drawImage(NorGate.TEXTURE, this.x, this.y, this.WIDTH, this.HEIGHT);
    }
}