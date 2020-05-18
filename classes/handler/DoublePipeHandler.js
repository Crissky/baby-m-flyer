import { PipeUP } from "../enemies/PipeUP.js";
import { PipeDOWN } from "../enemies/PipeDOWN.js";
import { ShyguyRed, ShyguyGreen, ShyguyBlue, ShyguyBrown, ShyguyPurple, ShyguyLink } from "../enemies/Shyguys.js";
import { randomIntFromInterval } from "../../utils/Random.js";

export class DoublePipeHandler {
    constructor(context, sprites, canvas, floor, player, pipeMaxSpawn = 50, debug = false) {
        this.debugMode = debug;
        this.headSize = 25;
        this.distanceBetweenX = 500;
        this.distanceBetweenY = 100;
        this.numPipeSpeedUp = 10;
        this.context = context;
        this.sprites = sprites;
        this.canvas = canvas;
        this.pipeTotalSpawned = 0;
        this.pipeMaxSpawn = pipeMaxSpawn;
        this.pipeUPList = new Array();
        this.pipeDOWNList = new Array();
        this.floor = floor;
        this.player = player;

        this.shyguy;
        this.shyguyWaitTime = 100;
        this.shyguyCurrentTime = 0;
        this.shyguyDirectionY = 0;
        this.shyguyFacingX = -1;
    }
    // PIPES FUNCTIONS
    getMinPosY() { // upper pipe min position
        return this.headSize;
    }
    getMaxPosY() { // upper pipe max position
        return (this.canvas.height - this.floor.height - this.headSize - this.distanceBetweenY);
    }
    getRandomPosY(pipeUP) { //
        let min = this.getMinPosY();
        let max = this.getMaxPosY();
        min = Math.ceil(min);
        max = Math.floor(max);
        let result = randomIntFromInterval(min, max);
        result = result - pipeUP.height;

        return result;
    }

    appendPipes() {
        if (this.pipeTotalSpawned >= this.pipeMaxSpawn) {
            return
        }
        this.pipeTotalSpawned++
        var pipeUP = new PipeUP(this.canvas, this.debugMode);
        var pipeDOWN = new PipeDOWN(this.canvas, this.debugMode);
        pipeUP.posX = this.canvas.width;
        pipeDOWN.posX = this.canvas.width;
        pipeUP.posY = this.getRandomPosY(pipeUP);
        pipeDOWN.posY = (pipeUP.posY + pipeUP.height + this.distanceBetweenY);
        this.pipeUPList.push(pipeUP);
        this.pipeDOWNList.push(pipeDOWN);

        if (!this.shyguy) {
            this.changeShyguy();
            if (this.shyguy) {
                this.shyguy.pipe = pipeDOWN;
                this.shyguyMovePosX();
                this.shyguy.posY = this.getShyguyMinPosY();
            }
        }
    }

    removeFirstPipe() {
        this.pipeUPList.shift();
        this.pipeDOWNList.shift();
        if (this.shyguy && this.shyguy.posX < -this.shyguy.width) {
            this.shyguy = null;
        }
    }

    movePosX(speedScreen) {
        for (let index = 0; index < this.pipeUPList.length; index++) {
            this.pipeUPList[index].posX -= speedScreen;
            this.pipeDOWNList[index].posX = this.pipeUPList[index].posX;
        }
    }

    movePosY(speedScreen) {
        speedScreen = Math.floor(speedScreen / 4.5);
        for (let index = 0; index < this.pipeUPList.length; index++) {
            if ((this.pipeUPList[index].posY + this.pipeUPList[index].height) <= this.getMinPosY()) {
                this.pipeUPList[index].directionY = -1;
            } else if ((this.pipeUPList[index].posY + this.pipeUPList[index].height) >= this.getMaxPosY()) {
                this.pipeUPList[index].directionY = 1;
            }
            this.pipeUPList[index].posY -= (speedScreen * this.pipeUPList[index].directionY);
            this.pipeDOWNList[index].posY = (this.pipeUPList[index].posY + this.pipeUPList[index].height + this.distanceBetweenY);
        }
    }
    // SHYGUY FUNCTIONS
    getShyguyMaxPosY() {
        return (this.shyguy.pipe.posY - this.shyguy.height + 5);
    }
    getShyguyMinPosY() {
        return (this.shyguy.pipe.posY + 10);
    }
    changeShyguy() {
        // choose the shyguy
        let choice = randomIntFromInterval(1, 18);
        switch (choice) {
            case 1:
                this.shyguy = new ShyguyRed(this.canvas, this.debugMode);
                break;
            case 2:
                this.shyguy = new ShyguyGreen(this.canvas, this.debugMode);
                break;
            case 3:
                this.shyguy = new ShyguyBlue(this.canvas, this.debugMode);
                break;
            case 4:
                this.shyguy = new ShyguyBrown(this.canvas, this.debugMode);
                break;
            case 5:
                this.shyguy = new ShyguyPurple(this.canvas, this.debugMode);
                break;
            case 6:
                this.shyguy = new ShyguyLink(this.canvas, this.debugMode);
                break;
            default:
                this.shyguy = null;
                break;
        }
    }

    shyguyMovePosX() {
        this.shyguy.posX = this.shyguy.pipe.posX + (this.shyguy.pipe.width / 2) - (this.shyguy.width / 2);//+ Math.floor(this.shyguy.width/2);
    }
    shyguyMovePosY(speedScreen) {
        // Keep or move up, shyguy
        if (this.shyguyDirectionY === 0) {
            this.shyguy.posY = this.getShyguyMaxPosY();
        } else if (this.shyguy.posY <= this.getShyguyMaxPosY()) {
            this.shyguyDirectionY = 0;
        } else if (this.shyguy.posX < this.canvas.width - 100) {
            this.shyguyDirectionY = -1;
        }
        // move down, shyguy
        if (this.shyguy.posX < this.player.posX + 150) {
            this.shyguyDirectionY = 1;
        }

        this.shyguy.posY += speedScreen * this.shyguyDirectionY;
    }
    changeShyguyFacingX() { // change shyguy face direction
        this.shyguyCurrentTime++
        if (this.shyguyCurrentTime >= this.shyguyWaitTime) {
            this.shyguyCurrentTime = 0;
            this.shyguyWaitTime = randomIntFromInterval(30, 100);
            this.shyguyFacingX = -this.shyguyFacingX
        }
    }
    // GENERAL FUNCTIONS
    update(speedScreen) {
        if (this.pipeUPList.length < 1) {
            this.appendPipes();
        }
        if (this.pipeUPList.length > 0 && this.pipeUPList.slice(-1)[0].posX < (this.canvas.width - this.distanceBetweenX)) {
            this.appendPipes();
        }
        // if (this.pipeUPList.length > 0 && (this.pipeUPList[0].posX + this.pipeUPList[0].width) < 0) {
        //     this.removeFirstPipe();
        // }
        this.movePosX(speedScreen);
        this.movePosY(speedScreen);

        if (this.shyguy) {
            this.shyguyMovePosY(speedScreen);
            this.shyguyMovePosX();
            this.changeShyguyFacingX();
        }
    }

    render() {
        if (this.shyguy) {
            this.shyguy.render(this.shyguyFacingX);
        }
        for (let index = 0; index < this.pipeUPList.length; index++) {
            this.pipeUPList[index].render();
            this.pipeDOWNList[index].render();
        }
    }

    reset() {
        this.pipeUPList = new Array();
        this.pipeDOWNList = new Array();
        this.shyguy = null;
        this.pipeTotalSpawned = 0;
    }
}