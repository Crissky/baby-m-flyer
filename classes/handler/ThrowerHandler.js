import { Thrower } from "../enemies/Thrower.js";
import { RockBlock } from "../scenarios/RockBlock.js";
import { LargeEggGreen, LargeEggPurple, LargeEggYellow, LargeEggRed, LargeEggBlue } from "../enemies/Eggs.js";
import { randomIntFromInterval } from "../../utils/Random.js";

export class ThrowerHandler {
    constructor(canvas, targetPlayer, floor, debug = false) {
        this.canvas = canvas;
        this.debugMode = debug;
        this.targetPlayer = targetPlayer;
        this.floor = floor;
        this.throwerList = [];
        this.rockBlockList = [];
        this.largeEggList = [];
    }

    update(speedScreen) {
        if (this.rockBlockList.length < 1) {
            this.appendThrower();
        }

        this.largeEggList.forEach(largeEgg => {
            largeEgg.update(speedScreen);
        });

        this.rockBlockList.forEach(rockBlock => {
            rockBlock.update(speedScreen);
        });

        this.throwerList.forEach(thrower => {
            thrower.update(speedScreen);
            if (!thrower.fireUp && thrower.posX < randomIntFromInterval((this.canvas.width * 0.6), (this.canvas.width * 0.8))) {
                thrower.startFire();
            }
        });

        this.removeFirstThrower();
        this.removeEggOutScreen();
    }

    render() {
        this.largeEggList.forEach(largeEgg => {
            largeEgg.render();
        });

        this.rockBlockList.forEach(rockBlock => {
            rockBlock.render();
        });

        this.throwerList.forEach(thrower => {
            thrower.render();
        });
    }

    reset() {
        this.throwerList = [];
        this.rockBlockList = [];
        this.largeEggList = [];
    }

    appendThrower() {
        let largeEgg = this.getLargeEgg();
        let rockBlock = new RockBlock(this.canvas, this.debugMode);
        let thrower = new Thrower(this.canvas, largeEgg, this.debugMode);

        rockBlock.posX = this.canvas.width;
        this.setRockBlockPosY(rockBlock);
        this.setThrowerPos(thrower, rockBlock);

        this.largeEggList.push(largeEgg);
        this.rockBlockList.push(rockBlock);
        this.throwerList.push(thrower);
    }

    removeFirstThrower() {
        if (this.rockBlockList[0].getEndPosX() < 0) {
            this.rockBlockList.shift();
            this.throwerList.shift();
        }
    }

    removeEggOutScreen() {
        this.largeEggList = this.largeEggList.filter(function (value, index, arr) {
            let result = true;
            if (value.getEndPosX() < 0 || value.getEndPosY() < 0 || value.posY > value.canvas.height) {
                result = false;
            }

            return result;
        });
    }

    setRockBlockPosY(rockBlock) {
        let minPosY = Math.floor(this.floor.posY - rockBlock.getTrueHeight() + 10);
        let maxPosY = Math.ceil(this.floor.posY - 10);

        rockBlock.posY = randomIntFromInterval(minPosY, maxPosY);
    }

    setThrowerPos(thrower, rockBlock) {
        thrower.posX = rockBlock.getCenterPosX() - (thrower.getTrueWidth() / 2) - 5;
        thrower.posY = rockBlock.posY - thrower.getTrueHeight() + 4;
    }

    getLargeEgg() {
        let choice = randomIntFromInterval(1, 32);
        console.log("getLargeEgg() choice", choice);
        var largeEgg = new LargeEggGreen(this.canvas, this.targetPlayer, this.debugMode);
        switch (true) {
            case (choice === 1):
                largeEgg = new LargeEggPurple(this.canvas, this.targetPlayer, this.debugMode);
                break;
            case (choice < 4):
                largeEgg = new LargeEggYellow(this.canvas, this.targetPlayer, this.debugMode);
                break;
            case (choice < 8):
                largeEgg = new LargeEggRed(this.canvas, this.targetPlayer, this.debugMode);
                break;
            case (choice < 16):
                largeEgg = new LargeEggBlue(this.canvas, this.targetPlayer, this.debugMode);
                break;
            default:
                break;
        }

        return largeEgg;
    }
}