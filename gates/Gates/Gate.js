import { BaseObject } from "../BaseObject.js";
import { Connection } from "../Connections/Connection.js";
import { Wire } from "../Connections/Wire.js";

export {Gate}

class Gate extends BaseObject{
    constructor(x = 0, y = 0, width = 128, height = 128){
        super(x, y, width, height);

        //Logic
        this.inputs = [];
        this.output = null;
    }

    /**
     * Get the output state of the gate
     */
    getState(){ return false; }

    update(){
        let out = this.getState();

        //Update the output to the new value
        //If no output wire conenction - return
        if(!this.output) return;
        this.output.setState(out);
    }

    dispose(){
        this.inputs.forEach(i => {
            i.dispose();
        });
        this.output.dispose();
    }
}