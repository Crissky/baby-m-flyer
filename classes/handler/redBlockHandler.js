import { RedBlock } from "../scenarios/RedBlock.js";

export class RedBlockHandler {
    constructor(canvas, debug = false) {
        this.debugMode = debug;
        this.canvas = canvas;
        this.redblockList = [];
        this.defaultPosY = -5;
        this.speedY = 1;
        this.waitTimeMovePosY = 20;
        this.currentTimeMovePosY = 0;
    }

    update(speedScreen) {
        this.currentTimeMovePosY = ++this.currentTimeMovePosY % Math.ceil(this.waitTimeMovePosY / speedScreen);
        if (this.redblockList.length === 0 || this.getLastRedBlock().posX < this.canvas.width) {
            this.appendRedBlock();
        }
        if (speedScreen === 0) {
            return
        }
        this.redblockList.forEach(redblock => {
            redblock.speedY = 0;
            if (this.currentTimeMovePosY === 0) {
                redblock.speedY = redblock.memorySpeedY;
            }
            if (redblock.posY < (this.defaultPosY) && redblock.memorySpeedY < 0) {
                redblock.memorySpeedY = redblock.memorySpeedY * (-1);
            } else if (redblock.posY > -(this.defaultPosY) && redblock.memorySpeedY > 0) {
                redblock.memorySpeedY = redblock.memorySpeedY * (-1);
            }
            redblock.update(speedScreen);
        });

        if ((this.redblockList[0].posX + this.redblockList[0].getTrueWidth()) < 0) {
            this.removeFirstRedBlock();
        }
    }

    render() {
        this.redblockList.forEach(redBlock => {
            redBlock.render();
        });
    }

    reset() {
        this.redblockList = [];
    }

    appendRedBlock() {
        let redblock = new RedBlock(this.canvas, this.debugMode);
        if (this.redblockList.length > 0) {
            let lastRedBlock = this.getLastRedBlock();
            redblock.posX = lastRedBlock.posX + lastRedBlock.getTrueWidth();
        }
        redblock.posY = this.defaultPosY;
        redblock.speedY = this.speedY;
        redblock.memorySpeedY = this.speedY;
        this.redblockList.push(redblock);
    }

    removeFirstRedBlock() {
        this.redblockList.shift();
    }

    getLastRedBlock() {
        return this.redblockList.slice(-1)[0];
    }

    getCollisionRect() {
        return [{
            x1: 0,
            x2: this.canvas.width,
            y1: 0,
            y2: this.redblockList[0].getTrueHeight()
        }]
    }
}