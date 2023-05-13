import { MouseState } from "./Controls/MouseState.js";

export {BaseObject}

class BaseObject{
    constructor(x = 0, y = 0, width = 128, height = 128){
        this.x = x;
        this.y = y;

        this.WIDTH = width;
        this.HEIGHT = height;

        this.creating = false;
    }

    setPosition(x, y, center = true){
        if(center){
            this.x = x - this.WIDTH / 2;
            this.y = y - this.HEIGHT / 2;
        }else{
            this.x = x;
            this.y = y;
        }
    }
    
    setCreating(creating){
        this.creating = creating;
    }

    /**
     * @param {MouseState} mouse 
     */
    checkIntersection(mouse){
        return mouse.x >= this.x &&
            mouse.y >= this.y &&
            mouse.x <= this.x + this.WIDTH &&
            mouse.y <= this.y + this.HEIGHT;
    }

    update(){}
    draw(context){}

    dispose(){}
}