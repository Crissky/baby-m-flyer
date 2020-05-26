import { BasicProjectileStartAimPlayer } from "../basic/BasicProjectileStartAimPlayer.js";
import { Sound } from "../../utils/Sound.js";

export class LargeEggGreen extends BasicProjectileStartAimPlayer {
    constructor(canvas, targetPlayer, debug = false) {
        const sprites = new Image();
        sprites.src = "./sprites/large-eggs.png";
        super(sprites, canvas, targetPlayer,
            28, 0,
            28, 32,
            800, 300,
            0, 0,
            6, 6, 6, 6,
            1, 2,
            30, 90, debug);
        this.shootSound = new Sound("./sounds/eggBounce1.wav");
    }

    shootInTargetPlayer(speed = 1) {
        super.shootInTargetPlayer(speed * 1.5);
        this.shootSound.play();
    }
}

export class LargeEggBlue extends BasicProjectileStartAimPlayer {
    constructor(canvas, targetPlayer, debug) {
        const sprites = new Image();
        sprites.src = "./sprites/large-eggs.png";
        super(sprites, canvas, targetPlayer,
            28, 32,
            28, 32,
            800, 300,
            0, 0,
            6, 6, 6, 6,
            1, 2,
            25, 90, debug);
        this.shootSound = new Sound("./sounds/eggBounce1.wav");
    }

    shootInTargetPlayer(speed = 1) {
        super.shootInTargetPlayer(speed * 2);
        this.shootSound.play();
    }
}

export class LargeEggYellow extends BasicProjectileStartAimPlayer {
    constructor(canvas, targetPlayer, debug) {
        const sprites = new Image();
        sprites.src = "./sprites/large-eggs.png";
        super(sprites, canvas, targetPlayer,
            28, 96,
            28, 32,
            800, 300,
            0, 0,
            6, 6, 6, 6,
            1, 2,
            20, 90, debug);
        this.shootSound = new Sound("./sounds/eggBounce2.wav");
    }

    shootInTargetPlayer(speed = 1) {
        super.shootInTargetPlayer(speed * 3);
        this.shootSound.play();
    }
}

export class LargeEggRed extends BasicProjectileStartAimPlayer {
    constructor(canvas, targetPlayer, debug) {
        const sprites = new Image();
        sprites.src = "./sprites/large-eggs.png";
        super(sprites, canvas, targetPlayer,
            28, 64,
            28, 32,
            800, 300,
            0, 0,
            6, 6, 6, 6,
            1, 2,
            15, 90, debug);
        this.shootSound = new Sound("./sounds/eggBounce2.wav");
    }

    shootInTargetPlayer(speed = 1) {
        super.shootInTargetPlayer(speed * 5);
        this.shootSound.play();
    }
}

export class LargeEggPurple extends BasicProjectileStartAimPlayer {
    constructor(canvas, targetPlayer, debug) {
        const sprites = new Image();
        sprites.src = "./sprites/large-eggs.png";
        super(sprites, canvas, targetPlayer,
            28, 128,
            28, 32,
            800, 300,
            0, 0,
            6, 6, 6, 6,
            1, 2,
            10, 90, debug);
        this.shootSound = new Sound("./sounds/eggBounce3.wav");
    }

    shootInTargetPlayer(speed = 1) {
        super.shootInTargetPlayer(speed * 8);
        this.shootSound.play();
    }
}