import { BasicBackgroundLite } from "./basic/BasicBackgroundLite.js";

export class Background1 extends BasicBackgroundLite {
    constructor(canvas, delay=30) {
        const sprites = new Image();
        sprites.src = "../sprites/sprites.png";
        super(sprites, canvas,
            388, 190,
            512, 518,
            0, (canvas.height - 518 + 190),
            delay, 0.5);
    }

    renderGradient() {
        let my_gradient = this.context.createLinearGradient(0, 0, 0, this.canvas.height);
        my_gradient.addColorStop(0, "#03001e");
        my_gradient.addColorStop(0.4, "#c471ed");
        my_gradient.addColorStop(0.7, "#12c2e9");
        my_gradient.addColorStop(1, "#fdeff9");
        this.context.fillStyle = my_gradient;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }   
}

export class Background2 extends BasicBackgroundLite {
    constructor(canvas, delay=30) {
        const sprites = new Image();
        sprites.src = "../sprites/mine-bg.png";
        super(sprites, canvas,
            0, 0,
            512, 385,
            0, 0,
            delay, (canvas.height/385));
    }

    renderGradient() {
        let my_gradient = this.context.createLinearGradient(0, 0, 0, this.canvas.height);
        my_gradient.addColorStop(0, "#333333");
        my_gradient.addColorStop(1, "#dd1818");
        this.context.fillStyle = my_gradient;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }   
}