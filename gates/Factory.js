import { Switch } from "./Sources/Switch.js";
import { TYPES } from "./Types.js";
import { AndGate } from "./Gates/AndGate.js";
import { Lamp } from "./Destinations/Lamp.js";
import { OrGate } from "./Gates/OrGate.js";
import { NotGate } from "./Gates/NotGate.js";
import { XorGate } from "./Gates/XorGate.js";
import { BaseObject } from "./BaseObject.js";
import { NorGate } from "./Gates/NorGate.js";
import { NandGate } from "./Gates/NandGate.js";
import { XnorGate } from "./Gates/XnorGate.js";
import { Clock } from "./Sources/Clock.js";

export {Factory}

const LOOKUP = {
    "And Gate" : TYPES.AND,
    "Or Gate" : TYPES.OR,
    "Xor Gate" : TYPES.XOR,
    "Not Gate" : TYPES.NOT,
    "Nand Gate" : TYPES.NAND,
    "Nor Gate" : TYPES.NOR,
    "Xnor Gate" : TYPES.XNOR,

    "Logic Source" : TYPES.SWITCH,
    "Clock" : TYPES.CLOCK,

    "Lamp" : TYPES.LAMP,
}

class Factory{
    static createFromMenu(menuitem, x = 0, y = 0, inputs = 2){
        if(LOOKUP[menuitem] != undefined){
            let item = LOOKUP[menuitem];
            return this.create(item, x, y, inputs);
            
        }else{
            throw new Error("Menu item not implemented.")
        }
    }

    /**
     * @param {TYPES} type 
     * @returns {BaseObject}
     */
    static create(type, x = 0, y = 0, inputs = 2){
        switch (type) {
            case TYPES.AND: return new AndGate(x, y, inputs);
            case TYPES.OR: return new OrGate(x, y, inputs);
            case TYPES.XOR: return new XorGate(x, y, inputs);
            case TYPES.NOT: return new NotGate(x, y);
            case TYPES.NOR: return new NorGate(x, y, inputs);
            case TYPES.NAND: return new NandGate(x, y, inputs);
            case TYPES.XNOR: return new XnorGate(x, y, inputs);

            case TYPES.SWITCH: return new Switch(x, y);

            case TYPES.LAMP: return new Lamp(x, y);
            case TYPES.CLOCK: return new Clock(x, y);
            default: throw new Error("Object Type not implemented. ")
        }
    }
}