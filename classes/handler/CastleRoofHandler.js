import { CastleRoof1 } from "../scenarios/CastleRoofs.js";

export class CastleRoofHandler {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.castleRoofList = [];
        this.posY = -2;
    }

    update(speedScreen) {
        if (this.castleRoofList.length === 0 || this.getLastCastleRoof().posX < this.canvas.width) {
            this.appendCastleFloor();
        }
        if (speedScreen === 0) {
            return
        }

        this.castleRoofList.forEach(castleFloor => {
            castleFloor.update(speedScreen);
        });

        if ((this.castleRoofList[0].getEndPosX()) < 0) {
            this.removeFirstCastleRoof();
        }
    }

    render() {
        this.castleRoofList.forEach(castleFloor => {
            castleFloor.render();
        });
    }

    reset() {
        this.castleRoofList = [];
    }

    appendCastleFloor() {
        let castleRoof = new CastleRoof1(this.canvas);
        if (this.castleRoofList.length > 0) {
            let lastCastleRoof = this.getLastCastleRoof();
            castleRoof.posX = lastCastleRoof.getEndPosX();
        }
        castleRoof.posY = this.posY;
        this.castleRoofList.push(castleRoof);
    }

    removeFirstCastleRoof() {
        this.castleRoofList.shift();
    }

    getLastCastleRoof() {
        return this.castleRoofList.slice(-1)[0];
    }

    getCollisionRect() {
        return [{
            x1: 0,
            x2: this.canvas.width,
            y1: this.posY,
            y2: 30
        }]
    }
}