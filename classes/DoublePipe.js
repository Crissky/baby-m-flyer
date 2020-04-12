import { PipeUP } from "./PipeUP.js";
import { PipeDOWN } from "./PipeDOWN.js";

export class DoublePipe {
    constructor(context, sprites, canvas, floor, debug) {
        this.debugMode = debug;
        this.headSize = 25;
        this.distanceBetweenX = 500;
        this.distanceBetweenY = 100;
        this.numPipeSpeedUp = 10;
        this.context = context;
        this.sprites = sprites;
        this.canvas = canvas;
        this.pipeUPList = new Array();
        this.pipeDOWNList = new Array();
        this.floor = floor;
    }
    getMinPosY() { // Menor Posição do Cano Superior
        return this.headSize;
    }
    getMaxPosY() { // Maior Posição do Cano Superior
        return (this.canvas.height - this.floor.height - this.headSize - this.distanceBetweenY);
    }
    getRandomPosY(pipeUP) {
        let min = this.getMinPosY();
        let max = this.getMaxPosY();
        min = Math.ceil(min);
        max = Math.floor(max);
        let result = Math.floor(Math.random() * (max - min)) + min;
        result = result - pipeUP.height;
      
        return result;
    }
    spawn() {
        this.appendPipes();
    }
    appendPipes(){
        let pipeUP = new PipeUP(this.context, this.sprites, this.canvas, this.debugMode);
        let pipeDOWN = new PipeDOWN(this.context, this.sprites, this.canvas, this.debugMode);
        pipeUP.posX = this.canvas.width;
        pipeDOWN.posX = this.canvas.width;
        pipeUP.posY = this.getRandomPosY(pipeUP);
        pipeDOWN.posY = pipeUP.posY + pipeUP.height + this.distanceBetweenY;

        this.pipeUPList.push(pipeUP);
        this.pipeDOWNList.push(pipeDOWN);        
    }
    removeFirstPipe(){
        this.pipeUPList.shift();
        this.pipeDOWNList.shift();
    }
    movePosX(ScreenSpeed){
        for (let index = 0; index < this.pipeUPList.length; index++) {
            this.pipeUPList[index].posX =  this.pipeUPList[index].posX - ScreenSpeed;
            this.pipeDOWNList[index].posX =  this.pipeUPList[index].posX;
        }
    }
    movePosY(ScreenSpeed){
        ScreenSpeed = Math.floor(ScreenSpeed / 4);
        for (let index = 0; index < this.pipeUPList.length; index++) {
            if((this.pipeUPList[index].posY + this.pipeUPList[index].height) <= this.getMinPosY()){
                this.pipeUPList[index].directionY = -1;
            } else if ((this.pipeUPList[index].posY + this.pipeUPList[index].height) >= this.getMaxPosY()){
                this.pipeUPList[index].directionY = 1;
            }
            this.pipeUPList[index].posY =  this.pipeUPList[index].posY - (ScreenSpeed * this.pipeUPList[index].directionY);
            this.pipeDOWNList[index].posY =  this.pipeUPList[index].posY + this.pipeUPList[index].height + this.distanceBetweenY;
        }
    }
    update(ScreenSpeed) {
        if(this.pipeUPList.length < 1) {
            this.spawn();
        }
        if(this.pipeUPList.slice(-1)[0].posX < (this.canvas.width - this.distanceBetweenX) ){
            this.spawn();
        }
        if((this.pipeUPList[0].posX + this.pipeUPList[0].width) < 0) {
            this.removeFirstPipe();
        }
        this.movePosX(ScreenSpeed);
        this.movePosY(ScreenSpeed);
    }
    reset() {
        this.pipeUPList = new Array();
        this.pipeDOWNList = new Array();
    }
    mDraw() {
        for (let index = 0; index < this.pipeUPList.length; index++) {
            this.pipeUPList[index].mDraw();
            this.pipeDOWNList[index].mDraw();
        }
    }
}