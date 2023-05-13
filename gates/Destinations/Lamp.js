import { Connection } from "../Connections/Connection.js";
import { Gate } from "../Gates/Gate.js";
import { Destination } from "./Destination.js";
export { Lamp }

class Lamp extends Destination{
    static{
        this.TEXTURE_OFF = new Image();
        this.TEXTURE_OFF.src = '../Assets/OffLamp.svg';

        this.TEXTURE_ON = new Image();
        this.TEXTURE_ON.src = '../Assets/OnLamp.svg';
    }

    constructor(x = 0, y = 0){
        super(x, y);

        this.inputs = [
            new Connection(0, 0.5 * this.HEIGHT, this),
        ];
    }

    update(){

    }

    draw(context){
        let state = this.inputs[0].getState();

        context.drawImage(
            state ? Lamp.TEXTURE_ON : Lamp.TEXTURE_OFF, this.x, this.y, this.WIDTH, this.HEIGHT
        );
    }
}