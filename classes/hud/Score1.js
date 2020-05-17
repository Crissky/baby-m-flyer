import { Sound } from "../../utils/Sound.js";
import { Score } from "./Score.js";

export class Score1 extends Score {
    constructor(canvas) {
        super(canvas);
        this.scoreSound = new Sound("./sounds/smw2_red_coin.wav");
        this.levelSound = new Sound("./sounds/smw2_red_coin_20.wav");
        this.greenMSound1 = new Sound("./sounds/m&lss_yahoh.wav");
        this.greenMSound2 = new Sound("./sounds/m&lss_l-thunder.wav");
        this.greenMSound3 = new Sound("./sounds/mlpit_luigi_gibberish_2.wav");
    }
    addScore(xScore) {
        super.addScore(xScore);
        this.scoreSound.play();
        this.print();
    }
    addLevel(xLevel, music) {
        super.addLevel(xLevel);

        if (this.level % 10 === 0) {
            this.greenMSound3.play();
            music.speedUp(0.25);
        } else if (this.level % 5 === 0) {
            this.greenMSound2.play();
            music.speedUp(0.25);
        } else {
            this.greenMSound1.play();
        }
    }
}