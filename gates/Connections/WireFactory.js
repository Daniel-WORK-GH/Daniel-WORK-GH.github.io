import { Mouse } from "../Controls/Mouse.js";
import { Connection } from "./Connection.js";
import { CONNECTION_LIST } from "./Connections.js";
import { Wire } from "./Wire.js";
import { WIRES_LIST } from "./Wires.js";
export { WireFactory }

class WireFactory{
    static{
        //Mouse state data
        this.mouse = Mouse.getMouseState();
        this.prevmouse = this.mouse;

        //Temp wire object
        this.wire = null;
    }

    /**
     * Handles the proccess of creating a wire (logic wise)
     * @returns {Wire} The current creating wire, null if none
     */
    static handleCreateWire(){
        /**
         * Check if a connection point was clicked
         * @returns {Connection} the clicked connection point, false if none
         */
        function getIntersectedConnection(){
            let ret = false;
            CONNECTION_LIST.forEach(conn => {
                let foundconnection = conn.isHoverClick();
                //console.log(foundconnection)
                if(foundconnection){
                    ret = conn;
                }
            });
            return ret;
        }

        /**
         * Check if a wire was clicked
         * @returns {Wire} the clicked wire, false if none
         */
        function getIntersectedWire(){
            let ret = false;
            WIRES_LIST.forEach(wire => {
                let dist = wire.getDistance(WireFactory.mouse.toGridPoint());
                if(dist == 0){
                    ret = wire;
                }
            });
            return ret;
        }

        //Get the current + Update the privious mouse state
        //to get the current mouse position and check if a 
        //left click was made
        this.prevmouse = this.mouse;
        this.mouse = Mouse.getMouseState();

        //Check if a left click was made, start or
        //finish the creation proccess if true
        if(this.mouse.left && !this.prevmouse.left){
            //If there isn't a wire being created, create one.
            //Otherwise check if a click was made on a connection 
            //point, end the creation if true
            if(!this.wire){
                let conn = getIntersectedConnection();
                let wire = getIntersectedWire();
                if(conn && conn.wire == null){
                    this.wire = new Wire();
                    conn.wire = this.wire;
                    this.wire.startconnection = conn;
                    
                    //console.log('created wire');
                }else if(wire){
                    this.wire = new Wire();
                    wire.wires.push(this.wire);
                    this.wire.startwire = wire;
                }
            }else{
                let conn = getIntersectedConnection();
                if(conn && conn.wire == null){
                    this.wire.endconnection = conn;
                    let temp = this.wire;
                    this.wire = null;
                    
                    temp.setState(false);
                    conn.wire = temp;
                    if(temp.startconnection){
                        temp.setState(temp.startconnection.getState);
                    }

                    //console.log(temp)
                    return temp;
                }
            }
        }
        
        //If a wire is being created update it, a node will be
        //added if a single left click was detected, in addition
        //it will update the next wire point location
        if(this.wire){
            this.wire.updateCreate(this.mouse, this.prevmouse);
        }

        return this.wire;
    }

    /**
     * Stop the running proccess (Wire creation)
     * Clear all necessary data
     */
    static abort(){
        if(this.wire.startconnection){
            this.wire.startconnection.wire = null;
        }
        this.wire = null;
    }
}