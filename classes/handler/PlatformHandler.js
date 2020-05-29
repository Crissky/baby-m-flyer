import { Spike } from "../enemies/Spike.js";
import { StartPlatform, EndPlatform, MidPlatform } from "../scenarios/Platform.js";

export class PlatformHandler {
    constructor(canvas, debug = false) {
        this.canvas = canvas;
        this.debugMode = debug;
        this.platformAddPosY = -10;
        this.spikeList = [];
        this.platformList = [];
        this.scale = 2;
    }

    update(speedScreen) {
        if (this.spikeList.length > 0 && this.spikeList[0].getEndPosX() < 0) {
            this.removeFirstSpike();
        }
        if (this.platformList.length > 0 && this.platformList[0].getEndPosX() < 0) {
            this.removeFirstPlatform();
        }

        this.spikeList.forEach(spike => {
            spike.update(speedScreen);
        });

        this.platformList.forEach(platform => {
            platform.update(speedScreen);
        });
    }

    render() {
        this.spikeList.forEach(spike => {
            spike.render();
        });

        this.platformList.forEach(platform => {
            platform.render();
        });
    }

    appendPlatform(speedScreen, floorPosY, sizePlatform = 1) {
        let startPlatform = new StartPlatform(this.canvas, this.debugMode);
        startPlatform.sizeMultiplier = this.scale;
        startPlatform.posX = this.canvas.width;

        let startSpike = new Spike(this.canvas, this.debugMode);
        startSpike.sizeMultiplier = this.scale;
        startSpike.posX = startPlatform.getEndPosX();
        startSpike.setEndPosY(floorPosY);

        startPlatform.posY = floorPosY + this.platformAddPosY - startPlatform.getTrueHeight() - startSpike.getTrueHeight();

        this.platformList.push(startPlatform);
        this.spikeList.push(startSpike);

        for (let index = 0; index < (sizePlatform + speedScreen); index++) {
            let midPlatform = new MidPlatform(this.canvas, this.debugMode);
            midPlatform.sizeMultiplier = this.scale;
            midPlatform.posX = this.getLastPlatform().getEndPosX();
            midPlatform.posY = this.getLastPlatform().posY;

            let spike = new Spike(this.canvas, this.debugMode);
            spike.sizeMultiplier = this.scale;
            spike.posX = this.getLastSpike().getEndPosX();
            spike.posY = this.getLastSpike().posY;

            this.platformList.push(midPlatform);
            this.spikeList.push(spike);
        }

        this.spikeList.pop();

        let endPlatform = new EndPlatform(this.canvas, this.debugMode);
        endPlatform.sizeMultiplier = this.scale;
        endPlatform.posX = this.getLastPlatform().getEndPosX();
        endPlatform.posY = this.getLastPlatform().posY;
        this.platformList.push(endPlatform);
    }

    reset() {
        this.spikeList = [];
        this.platformList = [];
    }

    removeFirstSpike() {
        this.spikeList.shift();
    }

    getLastSpike() {
        return this.spikeList.slice(-1)[0];
    }

    removeFirstPlatform() {
        this.platformList.shift();
    }

    getLastPlatform() {
        return this.platformList.slice(-1)[0];
    }

    isEmpty() {
        return (this.platformList.length < 1 && this.spikeList.length < 1);
    }

    getCollisionRect() {
        return [{
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 0
        }]
    }
}