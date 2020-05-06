import { BasicProjectileStartAimPlayer } from "../basic/BasicProjectileStartAimPlayer.js";

export class LargeEgg1 extends BasicProjectileStartAimPlayer {
    constructor(canvas, playerTarget, debug) {
        const sprites = new Image();
        sprites.src = "./sprites/large-eggs.png";
        super(sprites, canvas, playerTarget,
            28, 0,
            28, 32,
            800, 300,
            0, 0,
            4, 4, 4, 4,
            1, 2,
            20, debug);        
    }
}