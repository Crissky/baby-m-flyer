import { sound } from "../utils/Sound.js";
export class Score {
    constructor(context, sprites, canvas) {
        this.posX = 10;
        this.posY = 20;
        this.score = 0;
        this.bestScore = 0;
        this.level = 0;
        this.context = context;
        this.sprites = sprites;
        this.canvas = canvas;
        this.scoreSound = new sound("../sounds/smw2_red_coin.wav");
        this.levelSound = new sound("../sounds/smw2_red_coin_20.wav");
        this.greenMSound1 = new sound("../sounds/m&lss_yahoh.wav");
        this.greenMSound2 = new sound("../sounds/m&lss_l-thunder.wav");
        this.greenMSound3 = new sound("../sounds/mlpit_luigi_gibberish_2.wav");
    }
    reset() {
        this.score = 0;
        this.level = 0;
    }
    render() {
        this.context.font = '900 18px Arial';
        this.context.textAlign = 'end';
        this.context.fillStyle = '#ffffff';
        this.context.fillText( ("Score: " + this.score), this.canvas.width - this.posX, this.posY );
        this.context.strokeText( ("Score: " + this.score), this.canvas.width - this.posX, this.posY );
        
        this.context.fillStyle = '#fde217';
        this.context.fillText( ("Best: " + this.bestScore), this.canvas.width - this.posX, (this.posY + 20) );
        this.context.strokeText( ("Best: " + this.bestScore), this.canvas.width - this.posX, (this.posY + 20) );
        
        this.context.fillStyle = '#BB8FCE';
        this.context.fillText( ("Level: " + this.level), this.canvas.width - this.posX, (this.posY + 40) );
        this.context.strokeText( ("Level: " + this.level), this.canvas.width - this.posX, (this.posY + 40) );
        
    }
    getScore() {
        let score = 0;
        if(this.score > 0) {
            score = this.score;
        }

        return score;
    }
    getBestScore() {
        return this.bestScore;
    }
    addScore(xScore) {
        xScore = Math.floor(xScore)
        if(xScore > 0) {
            this.score = this.score + xScore;
        } else {
            this.score = this.score + 1;
        }

        if(this.score > this.bestScore) {
            this.bestScore = this.score;
        }
        this.scoreSound.play();
        this.print();
    }
    addLevel(xLevel, music) {
        xLevel = Math.floor(xLevel)
        if(xLevel > 0) {
            this.level = this.level + xLevel;
        } else {
            this.level = this.level + 1;
        }
        this.levelSound.play();
        if(this.level % 10 === 0){
            this.greenMSound3.play();
            music.speedUp(0.25);
        } else if(this.level % 5 === 0){
            this.greenMSound2.play();
            music.speedUp(0.25);
        } else {
            this.greenMSound1.play();
        }
        this.print();
    }
    print() {
        console.log("Score:", this.score, "Best Score:", this.bestScore, "Level: ", this.level);
    }
}