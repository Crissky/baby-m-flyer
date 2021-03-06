import { BasicBackgroundLite } from "../basic/BasicBackgroundLite.js";
import { sumHexColor } from "../../utils/Color.js";

export class Background1 extends BasicBackgroundLite {
    constructor(canvas, delay = 30) {
        const sprites = new Image();
        sprites.src = "./sprites/sprites.png";
        super(sprites, canvas,
            388, 190,
            512, 518,
            0, (canvas.height - 518 + 190),
            delay, 0.5);

        this.defaultGradient1 = "#03001e";
        this.defaultGradient2 = "#c471ed";
        this.defaultGradient3 = "#12c2e9";
        this.defaultGradient4 = "#fdeff9";
        this.gradient1 = this.defaultGradient1;
        this.gradient2 = this.defaultGradient2;
        this.gradient3 = this.defaultGradient3;
        this.gradient4 = this.defaultGradient4;
        this.alpha = 0;
    }

    render() {
        super.render();
        this.fillBlack();
    }

    fillBlack() {
        this.context.save();
        this.context.fillStyle = '#000000';
        this.context.globalAlpha = this.alpha;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.restore();
    }

    reset() {
        this.gradient1 = this.defaultGradient1;
        this.gradient2 = this.defaultGradient2;
        this.gradient3 = this.defaultGradient3;
        this.gradient4 = this.defaultGradient4;
        this.alpha = 0;
    }

    renderGradient() {
        let my_gradient = this.context.createLinearGradient(0, 0, 0, this.canvas.height);
        my_gradient.addColorStop(0, this.gradient1);
        my_gradient.addColorStop(0.4, this.gradient2);
        my_gradient.addColorStop(0.7, this.gradient3);
        my_gradient.addColorStop(1, this.gradient4);
        this.context.fillStyle = my_gradient;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    darkenGradient(value) {
        this.gradient1 = sumHexColor(this.gradient1, value);
        this.gradient2 = sumHexColor(this.gradient2, value);
        this.gradient3 = sumHexColor(this.gradient3, value);
        this.gradient4 = sumHexColor(this.gradient4, value);
        this.alpha += 0.016;
    }
}

export class Background2 extends BasicBackgroundLite {
    constructor(canvas, delay = 30) {
        const sprites = new Image();
        sprites.src = "./sprites/mine-bg.png";
        super(sprites, canvas,
            0, 0,
            512, 385,
            0, 0,
            delay, (canvas.height / 385));
    }

    renderGradient() {
        let my_gradient = this.context.createLinearGradient(0, 0, 0, this.canvas.height);
        my_gradient.addColorStop(0, "#333333");
        my_gradient.addColorStop(1, "#dd1818");
        this.context.fillStyle = my_gradient;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export class Background3 extends BasicBackgroundLite {
    constructor(canvas, delay = 30) {
        const sprites = new Image();
        sprites.src = "./sprites/castle-ruins-bg.png";
        super(sprites, canvas,
            0, 0,
            512, 420,
            0, 0,
            delay, (canvas.height / 420));
    }

    renderGradient() {
        let my_gradient = this.context.createLinearGradient(0, 0, 0, this.canvas.height);
        my_gradient.addColorStop(0.6, "#000000");
        my_gradient.addColorStop(1, "#c471ed");
        this.context.fillStyle = my_gradient;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export class Background4 extends BasicBackgroundLite {
    constructor(canvas, delay = 30) {
        const sprites = new Image();
        sprites.src = "./sprites/castle-background.png";
        super(sprites, canvas,
            0, 0,
            512, 432,
            0, 0,
            delay, (canvas.height / 400));
    }

    render() {
        super.render();
        this.fillBlack();
    }

    fillBlack() {
        this.context.save();
        this.context.fillStyle = '#000000';
        this.context.globalAlpha = 0.6;
        this.context.fillRect(0, this.posY, this.canvas.width, this.canvas.height);
        this.context.restore();
    }

    renderGradient() {
        let my_gradient = this.context.createLinearGradient(0, 0, 0, this.canvas.height);
        my_gradient.addColorStop(0.3, "#f64f59");
        my_gradient.addColorStop(0.6, "#c471ed");
        my_gradient.addColorStop(1, "#12c2e9");
        this.context.fillStyle = my_gradient;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}