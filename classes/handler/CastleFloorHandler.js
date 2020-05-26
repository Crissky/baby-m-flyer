import { randomIntFromInterval } from "../../utils/Random.js";
import { CastleFloor1, CastleFloor2, CastleFloor3 } from "../scenarios/CastleFloors.js";
import { Torch } from "../scenarios/Torch.js";

export class CastleFloorHandler {
    constructor(canvas, debug = false) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.debugMode = debug;
        this.castleFloorList = [];
        this.torchList = [];
        this.posY = (canvas.height * 0.6);
    }

    update(speedScreen) {
        if (this.castleFloorList.length === 0 || this.getLastCastleFloor().posX < this.canvas.width) {
            this.appendCastleFloor();
        }
        if (speedScreen === 0) {
            return
        }

        this.torchList.forEach(torch => {
            torch.update(speedScreen);
        });
        this.castleFloorList.forEach(castleFloor => {
            castleFloor.update(speedScreen);
        });

        if ((this.castleFloorList[0].getEndPosX()) < 0) {
            this.removeFirstCastleFloor();
        }
        if (this.torchList.length > 0 && this.torchList[0].getEndPosX() < 0) {
            this.removeFirstTorch();
        }
    }

    render() {
        this.fillBlack();
        this.torchList.forEach(torch => {
            torch.render();
        });
        this.castleFloorList.forEach(castleFloor => {
            castleFloor.render();
        });
    }
    
    reset() {
        this.castleFloorList = [];
        this.torchList = [];
    }

    fillBlack() {
        this.context.save();
        this.context.fillStyle = '#000000';
        this.context.fillRect(0, this.posY, this.canvas.width, this.canvas.height);
        this.context.restore();
    }

    appendCastleFloor() {
        let castleFloor = this.createRandomCastleFloor();
        if (this.castleFloorList.length > 0) {
            let lastCastleFloor = this.getLastCastleFloor();
            castleFloor.posX = lastCastleFloor.getEndPosX();
        }
        castleFloor.posY = this.posY;
        this.castleFloorList.push(castleFloor);
        this.appendTorch();
    }

    appendTorch() {
        let choice = randomIntFromInterval(1, 20);
        switch (choice) {
            case 1:
                let torch = new Torch(this.canvas);
                torch.posX = this.getLastCastleFloor().posX;
                torch.setEndPosY(this.posY);
                this.torchList.push(torch);
                break;
            default:
                break;
        }
    }

    createRandomCastleFloor() {
        let choice = randomIntFromInterval(1, 3);
        let castleFloor = new CastleFloor1(this.canvas, this.debugMode);
        switch (choice) {
            case 1:
                castleFloor = new CastleFloor2(this.canvas, this.debugMode);
                break;
            case 2:
                castleFloor = new CastleFloor3(this.canvas, this.debugMode);
                break;
            default:
                break;
        }

        return castleFloor;
    }

    removeFirstCastleFloor() {
        this.castleFloorList.shift();
    }

    getLastCastleFloor() {
        return this.castleFloorList.slice(-1)[0];
    }

    removeFirstTorch() {
        this.torchList.shift();
    }

    getCollisionRect() {
        return [{
            x1: 0,
            x2: this.canvas.width,
            y1: this.posY,
            y2: this.canvas.height
        }]
    }
}