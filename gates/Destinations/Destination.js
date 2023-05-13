import { BaseObject } from "../BaseObject.js";

export { Destination }

class Destination extends BaseObject{
    constructor(x = 0, y = 0, width = 64, height = 64){
        super(x, y, width, height);
        this.inputs = [];
    }

    dispose(){
        this.inputs.forEach(i => {
            i.dispose();
        });
    }
}