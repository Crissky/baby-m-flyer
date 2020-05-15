import { BasicAnimated } from "../../basic/BasicAnimated.js";
import { randomNegativeOrPositiveIntFromInterval, randomIntFromInterval } from "../../../utils/Random.js";

export class Spark extends BasicAnimated {
    constructor(canvas, player, debug = false) {
        const sprites = new Image();
        sprites.src = "./sprites/spark.png";
        super(sprites, canvas,
            10, 0,
            10, 9,
            0, 0,
            (randomNegativeOrPositiveIntFromInterval(1, 10) * 0.1), -(randomIntFromInterval(1, 4)),
            0, 0, 0, 0,
            1, 6, 5, debug);
            this.player = player;
            this.gravity = (randomIntFromInterval(1, 3) * 0.1);
    }

    update(speedScreen = 0) {
        this.speedY += this.gravity;
        this.posX += this.speedX;
        this.posY += this.speedY;
        this.updateFrame(speedScreen);
    }
}