import { BaseObject } from "../BaseObject.js";
import { Mouse } from "../Controls/Mouse.js";

export { Source }

class Source extends BaseObject{
    constructor(x = 0, y = 0, width = 64, height = 64){
        super(x, y, width, height);

        this.Collision = [
            x + 0.15 * this.WIDTH, 
            y + 0.15 * this.HEIGHT,
            this.WIDTH * 0.70,
            this.HEIGHT * 0.70
        ];

        this.state = false;
        this.outputs = [];

        //Mouse state data
        this.mouse = Mouse.getMouseState();
        this.prevmouse = this.mouse;

        this.addedconnection = []
    }

    update(){
        for (let i = 0; i < this.outputs.length; i++) {
            const e = this.outputs[i];
            if(!this.addedconnection[i] && e.wire){
                e.wire.setState(this.state);
            }else if(!e.wire) {
                this.addedconnection[i] = false;
            }
        }
    }

    dispose(){
        this.outputs.forEach(o => {
            o.dispose();
        });
    }
}