import { RedBlock } from "../scenarios/scenarios-elements/redBlock.js";

export class redBlockHandler {
    constructor(canvas) {
        this.canvas = canvas;
        this.redblockList = [];
        this.defaultPosY = -1;
        this.multiplierPosY = 1;
        this.speedY = 1;
        this.waitTimeMovePosY = 20;
        this.currentTimeMovePosY = 0;
    }

    update(speedScreen) {
        this.currentTimeMovePosY = ++this.currentTimeMovePosY % Math.ceil(this.waitTimeMovePosY/speedScreen);
        if(this.redblockList.length === 0 || this.getLastRedBlock().posX < this.canvas.width) {
            this.appendRedBlock();
        }
        if(speedScreen === 0) {
            return
        }
        this.redblockList.forEach(redblock => {
            redblock.speedY = 0;
            if(this.currentTimeMovePosY === 0) {
                redblock.speedY = redblock.memorySpeedY;
            }
            if(redblock.posY < (this.defaultPosY) && redblock.memorySpeedY < 0) {
                redblock.memorySpeedY = redblock.memorySpeedY * (-1);
            } else if(redblock.posY > -(this.defaultPosY) && redblock.memorySpeedY > 0) {
                redblock.memorySpeedY = redblock.memorySpeedY * (-1);
            }
            redblock.update(speedScreen);
        });

        if((this.redblockList[0].posX+this.redblockList[0].width) < 0){
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
        let redblock = new RedBlock(this.canvas);
        if(this.redblockList.length > 0) {
            let lastRedBlock = this.getLastRedBlock();
            redblock.posX = lastRedBlock.posX + lastRedBlock.getTrueWidth();
        }
        redblock.posY = this.defaultPosY;
        redblock.speedY = this.speedY;
        redblock.memorySpeedY = this.speedY;
        this.redblockList.push(redblock);
        //console.log("this.redblockList", this.redblockList.length);
    }

    removeFirstRedBlock() {
        this.redblockList.shift();
    }

    getLastRedBlock() {
        return this.redblockList.slice(-1)[0];
    }
}