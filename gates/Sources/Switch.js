import { Connection } from "../Connections/Connection.js";
import { Mouse } from "../Controls/Mouse.js";
import { Source } from "./Source.js";

export { Switch }

class Switch extends Source{
    static{
        this.TEXTURE_OFF = new Image();
        this.TEXTURE_OFF.src = 'https://daniel-work-gh.github.io/gates/Assets/OffSource.svg';

        this.TEXTURE_ON = new Image();
        this.TEXTURE_ON.src = 'https://daniel-work-gh.github.io/gates/Assets/OnSource.svg';
    }

    constructor(x = 0, y = 0){      
        super(x, y);

        this.outputs = [
            new Connection(this.WIDTH / 2, 0, this),
            new Connection(0, this.HEIGHT / 2, this),
            new Connection(this.WIDTH, this.HEIGHT / 2, this),
            new Connection(this.WIDTH / 2, this.HEIGHT, this),
        ]
        
        this.addedconnection = [
            false, false, false, false,
        ]
    }

    setPosition(x = 0, y = 0, center = true){
        super.setPosition(x, y, center);

        this.Collision = [
            this.x + 0.15 * this.WIDTH, 
            this.y + 0.15 * this.HEIGHT,
            this.WIDTH * 0.70,
            this.HEIGHT * 0.70
        ];
    }

    update(){
        super.update();
        
        this.prevmouse = this.mouse;
        this.mouse = Mouse.getMouseState();
        let x = this.mouse.x;
        let y = this.mouse.y;

        if(this.mouse.left && !this.prevmouse.left){
            if(x >= this.Collision[0] &&
                y >= this.Collision[1] &&
                x <= this.Collision[0] + this.Collision[2] &&
                y <= this.Collision[1] + this.Collision[3]){
                    this.state = !this.state;

                    this.outputs.forEach(o => {
                        o.setState(this.state);
                    });  
                }
        }
    }

    draw(context){
        context.drawImage(
            this.state ? Switch.TEXTURE_ON : Switch.TEXTURE_OFF, this.x, this.y, this.WIDTH, this.HEIGHT
        );
    }
}