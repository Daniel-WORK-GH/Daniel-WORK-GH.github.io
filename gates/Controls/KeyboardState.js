import { Keys } from "./Keyboard.js";
export { KeyboardState }

class KeyboardState{
    /**
     * Create a KeyboardState object.
     * 
     * @param {Keys} keys 
     */
    constructor(keys){
        this.A = keys.KeyA;
        this.B = keys.KeyB;
        this.C = keys.KeyC;
        this.D = keys.KeyD;
        this.E = keys.KeyE;
        this.F = keys.KeyF;
        this.G = keys.KeyG;
        this.H = keys.KeyH;
        this.I = keys.KeyI;
        this.J = keys.KeyJ;
        this.K = keys.KeyK;
        this.L = keys.KeyL;
        this.M = keys.KeyM;
        this.N = keys.KeyN;
        this.O = keys.KeyO;
        this.P = keys.KeyP;
        this.Q = keys.KeyQ;
        this.R = keys.KeyR;
        this.S = keys.KeyS;
        this.T = keys.KeyT;
        this.U = keys.KeyU;
        this.V = keys.KeyV;
        this.W = keys.KeyW;
        this.X = keys.KeyX;
        this.Y = keys.KeyY;
        this.Z = keys.KeyZ;

        this.N0 = keys.Digit0;
        this.N1 = keys.Digit1;
        this.N2 = keys.Digit2;
        this.N3 = keys.Digit3;
        this.N4 = keys.Digit4;
        this.N5 = keys.Digit5;
        this.N6 = keys.Digit6;
        this.N7 = keys.Digit7;
        this.N8 = keys.Digit8;
        this.N8 = keys.Digit9;
    }
}