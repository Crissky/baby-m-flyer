import { Sound } from "../../utils/Sound.js";

export class Score {
    constructor(canvas, localStorageKeyBestScore="BEST-DEFAULT") {
        this.localStorageKeyBestScore = localStorageKeyBestScore;
        this.posX = 10;
        this.posY = 30;
        this.score = 0;
        this.bestScore = this.getLocalStorageBestScore();
        this.level = 0;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.levelSound = new Sound("./sounds/smw2_red_coin_20.wav");
    }

    reset() {
        this.score = 0;
        this.level = 0;
    }

    render() {
        this.context.font = '18px "Press Start 2P"';
        this.context.textAlign = 'end';
        this.context.fillStyle = '#ffffff';
        this.context.lineWidth = 4;
        this.context.strokeText(("SCORE:" + this.score), this.canvas.width - this.posX, this.posY);
        this.context.fillText(("SCORE:" + this.score), this.canvas.width - this.posX, this.posY);

        this.context.fillStyle = '#fde217';
        this.context.strokeText(("BEST:" + this.bestScore), this.canvas.width - this.posX, (this.posY + 25));
        this.context.fillText(("BEST:" + this.bestScore), this.canvas.width - this.posX, (this.posY + 25));

        this.context.fillStyle = '#BB8FCE';
        this.context.strokeText(("LEVEL:" + this.level), this.canvas.width - this.posX, (this.posY + 50));
        this.context.fillText(("LEVEL:" + this.level), this.canvas.width - this.posX, (this.posY + 50));
    }

    getScore() {
        let score = 0;
        if (this.score > 0) {
            score = this.score;
        }

        return score;
    }

    getBestScore() {
        return this.bestScore;
    }

    getLocalStorageBestScore() {
        let bestScore = localStorage.getItem(this.localStorageKeyBestScore);
        if (bestScore === null) {
            bestScore = 0;
        }

        return bestScore;
    }

    setLocalStorageBestScore(bestScore) {
        localStorage.setItem(this.localStorageKeyBestScore, bestScore);
    }

    getLevel() {
        let level = 0;
        if (this.level > 0) {
            level = this.level;
        }

        return level;
    }

    addScore(xScore) {
        xScore = Math.floor(xScore)
        if (xScore > 0) {
            this.score = this.score + xScore;
        } else {
            this.score = this.score + 1;
        }

        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            this.setLocalStorageBestScore(this.bestScore);
        }
    }

    addLevel(xLevel) {
        xLevel = Math.floor(xLevel)
        if (xLevel > 0) {
            this.level = this.level + xLevel;
        } else {
            this.level = this.level + 1;
        }
        this.levelSound.play();
        this.print();
    }

    print() {
        console.log("Score:", this.score, "Best Score:", this.bestScore, "Level: ", this.level);
    }
}