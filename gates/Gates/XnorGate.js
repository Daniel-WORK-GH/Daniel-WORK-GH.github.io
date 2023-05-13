import { XorGate } from "./XorGate.js";

export { XnorGate }

class XnorGate extends XorGate{
    static{
        this.TEXTURE = new Image();
        this.TEXTURE.src = 'https://daniel-work-gh.github.io/gates/Assets/Xnor.svg';
    }
    
    constructor(x = 0, y = 0, inputs = 4){
        super(x, y, inputs);
    }

    getState(){
        return !super.getState();
    }

    draw(context){
        super.draw(context, false);
        context.drawImage(XnorGate.TEXTURE, this.x, this.y, this.WIDTH, this.HEIGHT);
    }
}