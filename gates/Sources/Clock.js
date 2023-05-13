import { Connection } from "../Connections/Connection.js";
import { Mouse } from "../Controls/Mouse.js";
import { Editor, MenuField } from "../Editor.js";
import { Source } from "./Source.js";

export { Clock }

class Clock extends Source{
    static{
        this.TEXTURE_OFF = new Image();
        this.TEXTURE_OFF.src = 'https://daniel-work-gh.github.io/gates/Assets/OffSource.svg';

        this.TEXTURE_ON = new Image();
        this.TEXTURE_ON.src = 'https://daniel-work-gh.github.io/gates/Assets/OnSource.svg';

        this.START_TIME = new Date();
    }

    constructor(x = 0, y = 0){      
        super(x, y);

        this.outputs = [
            new Connection(this.WIDTH / 2, 0, this),
            new Connection(0, this.HEIGHT / 2, this),
            new Connection(this.WIDTH, this.HEIGHT / 2, this),
            new Connection(this.WIDTH / 2, this.HEIGHT, this),
        ]
        this.ticking = false;
        this.cycletime = 500;
        this.reversed = false;
        
        this.prevtime = new Date();
        this.setCurrentTime();

        this.addedconnection = [
            false, false, false, false,
        ]
    }
    
    openMenu(){ 
        Editor.openMenu([
                new MenuField("Cycle time", "text", this.cycletime),
                new MenuField("Reverse", "checkbox", "", this.reversed ? "checked" : ""),
            ], this, this.saveDataFromMenu
        )
    }

    saveDataFromMenu(sender, fields){
        fields.forEach(e => {
            if(e.key == "Cycle time"){
                sender.cycletime = Number(e.value);
            }else if(e.key == "Reverse"){
                if(e.value != sender.reversed){
                    sender.state = !sender.state;
                }
                sender.reversed = e.value;
            }
        });
    }

    setCurrentTime(){
        let time = new Date() - Clock.START_TIME;
        let cycles = Math.floor(time / this.cycletime);
        if(this.ticking){
            if((cycles % 2 == 0 && this.state == true) || 
                (cycles % 2 == 1 && this.state == false)){
                this.reversed = true;
            }else{
                this.reversed = false;
            }
        }

        this.prevtime.setTime(
            Math.floor((new Date() - Clock.START_TIME) / this.cycletime) * this.cycletime + Clock.START_TIME.getTime()
        )
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
                    this.ticking = !this.ticking
                }
        }

        if(this.mouse.middle && !this.prevmouse.middle){
            if(x >= this.Collision[0] &&
                y >= this.Collision[1] &&
                x <= this.Collision[0] + this.Collision[2] &&
                y <= this.Collision[1] + this.Collision[3]){
                    this.openMenu();
                }
        }

        if(this.ticking){
            let time = new Date();
            if(time - this.prevtime > this.cycletime){
                this.state = !this.state;

                this.outputs.forEach(o => {
                    o.setState(this.state);
                });  

                this.setCurrentTime();
            }
        }else{
            this.setCurrentTime();
        }
    }

    draw(context){
        context.drawImage(
            this.state ? Clock.TEXTURE_ON : Clock.TEXTURE_OFF, this.x, this.y, this.WIDTH, this.HEIGHT
        );
    }
}