import { sound } from "../../utils/Sound.js";
import { BasicChar } from "../basic/basicChar.js";

const sprites = new Image();
sprites.src = '../../sprites/green_M.png';

class GreenM extends BasicChar {
    constructor(canvas, debug=false) {
        super(sprites, canvas,
            30, 0, 30, 37, 20, 70,
            0, 1,
            6, 5, 5, 5);
        this.debugMode = debug;
        this.collisionWidth = [28, 28, 26, 26, 21, 17];
        this.collisionHeight = [27, 26, 26, 27, 29, 31];
        this.speedX = 0;
        this.speedY = 1;
        this.gravity = 0.10;
        this.clickSpeedY = -4
        this.maxIncrementSpeedY = -3;
        this.limitForStartIncrementSpeedY = 7;
        this.maxFrames = 6;
        this.currentFrame = 0;
        this.waitTimeFrame = 6;
        this.currentTimeFrame = 0;
        this.superFlySound = new sound("../sounds/smw_cape_rise.wav");
        this.flySound = new sound("../sounds/SFX_Jump.wav");
        
    }

    click(ScreenSpeed) {
        if( (this.speedY > this.limitForStartIncrementSpeedY) && (this.currentFrame === this.maxFrames-1) ) {
            this.speedY = this.maxIncrementSpeedY;
            this.superFlySound.play();
        } else {
            this.speedY = 0;
            this.flySound.play();
        }

        this.speedY += this.clickSpeedY - (ScreenSpeed * 0.2)
    }

    update(ScreenSpeed) {
        this.speedY = this.speedY + this.gravity + (ScreenSpeed * 0.05);
        this.posY = this.posY + this.speedY;
        this.posX = this.posX + this.speedX;
        
        this.updateFrame(ScreenSpeed);
        if(this.speedY < 0){
            this.updateFrame(ScreenSpeed);
            this.updateFrame(ScreenSpeed);
        }
    }

    reset() {
        this.posX = 20;
        this.posY = 50;
        this.speedX = 0;
        this.speedY = 1;
        this.gravity = 0.10;
        this.currentFrame = 0;
    }

    stop() {
        this.speedY = 0;
        this.speedX = 0;
        this.gravity = 0;
    }

    render() {
        this.context.drawImage(this.sprites, 
            (this.sourceX * this.currentFrame), this.sourceY, 
            this.width, this.height, 
            this.posX , (this.posY - (this.height * (this.sizeMultiplier-1))),
            this.getTrueWidth(), this.getTrueHeight()
        );
        
        if(this.debugMode === true){
            this.debugRect();
        }
    }

    debugRect() {
        super.debugRect('#0000ff');

        this.context.save();
        
        this.context.fillStyle = '#000000';
        this.context.fillRect(0,0,110,65);
        this.context.globalAlpha = 1.0;

        this.context.font = '8px Arial';
        this.context.textAlign = 'start';
        this.context.fillStyle = '#ffffff';
        this.context.fillText( ("GreenM PosX:         " + this.posX.toFixed(2)), 5 , 10 );
        this.context.fillText( ("GreenM PosY:         " + this.posY.toFixed(2)), 5 , 25 );
        this.context.fillText( ("GreenM SpeedY:     " + this.speedY.toFixed(2)), 5 , 40 );
        this.context.fillText( ("GreenM Gravity:     " + this.gravity.toFixed(2)), 5 , 55 );
        
        this.context.restore();
    }

    updateFrame(ScreenSpeed){
        this.currentTimeFrame = ++this.currentTimeFrame % this.waitTimeFrame;
        if((this.currentTimeFrame === 0 && this.speedY > 0 && this.currentFrame < this.maxFrames-1) || (this.speedY > this.limitForStartIncrementSpeedY && this.currentFrame < this.maxFrames-1) ){
            this.currentFrame = ++this.currentFrame
        } else if (this.currentTimeFrame === 0 && this.speedY < 0 && this.currentFrame > 0) {
            this.currentFrame = --this.currentFrame
        }
    }

    getCollisionRect() {
        return [{
            x1: ( this.posX + this.collisionToleranceX1 ),
            x2: ( (this.posX + this.collisionWidth[this.currentFrame] - this.collisionToleranceX2 ) ),
            y1: ( this.posY + this.collisionToleranceY1 ),
            y2: ( (this.posY + this.collisionHeight[this.currentFrame] - this.collisionToleranceY2 ) )
        }]
    }
}

export {GreenM};