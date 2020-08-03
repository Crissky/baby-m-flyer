import { Score } from "./Score.js";

export class Score3 extends Score {
    constructor(canvas) {
        super(canvas, "BEST-SCORE-FASE-3");
    }

    addLevel(xLevel, music) {
        super.addLevel(xLevel);

        if (this.level % 10 === 0 && this.level <= 20) {
            music.speedUp(0.25);
        }
    }
}