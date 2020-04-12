import { sound } from "../utils/Sound.js";
class GreenM {
    constructor(context, sprites, canvas, debug=false) {
        this.debugMode = debug;
        this.sourceX = [0, 30, 60, 90, 120, 150];
        this.sourceY = [0, 0, 0, 0, 0, 0];
        this.width = [30, 30, 30, 30, 30, 30];
        this.height = [37, 37, 37, 37, 37, 37];
        this.collisionWidth = [23, 23, 21, 21, 16, 12];
        this.collisionHeight = [23, 22, 22, 23, 25, 27];
        this.posX = 20;
        this.posY = 50;
        this.speedX = 0;
        this.speedY = 1;
        this.gravity = 0.10;
        this.minSpeedY = 7
        this.clickSpeedY = -4
        this.maxIncrementSpeedY = 3;
        this.dividerIncrementSpeedY = 2.5;
        this.limitForStartIncrementSpeedY = 7;
        this.collisionToleranceX1 = 6;
        this.collisionToleranceX2 = 5;
        this.collisionToleranceY1 = 4;
        this.collisionToleranceY2 = 4;
        this.maxDegree = 20;
        this.currentDegree = 0;
        this.incrementDegree = (15/5);
        this.context = context;
        this.sprites = sprites;
        this.canvas = canvas;
        this.currentFrame = 0;
        this.maxFrames = 6;
        this.delayFrame = 6;
        this.currentTimeFrame = 0;
        this.defaultSourceY = 26;
        this.superFlySound = new sound("../sounds/smw_cape_rise.wav");
        this.flySound = new sound("../sounds/SFX_Jump.wav");
        
    }
    click(ScreenSpeed) {
        let incrementSpeedY = ( this.speedY > this.limitForStartIncrementSpeedY ? (this.speedY / this.dividerIncrementSpeedY) : 0 );
        incrementSpeedY = (incrementSpeedY > this.maxIncrementSpeedY ? this.maxIncrementSpeedY : incrementSpeedY);
        this.speedY = this.clickSpeedY - incrementSpeedY;
        if( this.speedY < this.clickSpeedY - (this.limitForStartIncrementSpeedY / this.dividerIncrementSpeedY) ){
            this.superFlySound.play();
        } else {
            this.flySound.play();
        }
    }
    update(ScreenSpeed) {
        this.speedY = this.speedY + this.gravity + (ScreenSpeed * 0.05);
        //this.speedY = this.speedY > this.minSpeedY ? this.minSpeedY : this.speedY;
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
    mDraw() {
        this.context.drawImage(
            this.sprites,
            this.sourceX[this.currentFrame], this.sourceY[this.currentFrame], // Sprite X, Sprite Y
            this.width[this.currentFrame], this.height[this.currentFrame], // Tamanho de recorte na Sprite
            this.posX, this.posY, // Posição na tela
            this.width[this.currentFrame], this.height[this.currentFrame] // Tamanho da imagem na tela
        );
        
        if(this.debugMode === true){
            this.debugRect();
        }
    }
    debugRect() {
        this.context.globalAlpha = 0.5;
        this.context.fillStyle = '#0000ff';
        let collisionRect = this.getArea();
        this.context.fillRect(collisionRect.x1, collisionRect.y1, (collisionRect.x2 - collisionRect.x1), (collisionRect.y2 - collisionRect.y1));
        
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
        
    }
    updateFrame(ScreenSpeed){
        this.currentTimeFrame = ++this.currentTimeFrame % Math.ceil(this.delayFrame);
        if((this.currentTimeFrame === 0 && this.speedY > 0 && this.currentFrame < this.maxFrames-1) || (this.speedY > this.limitForStartIncrementSpeedY && this.currentFrame < this.maxFrames-1) ){
            this.currentFrame = ++this.currentFrame
        } else if (this.currentTimeFrame === 0 && this.speedY < 0 && this.currentFrame > 0) {
            this.currentFrame = --this.currentFrame
        }
    }
    getArea() {
        return {
            x1: ( this.posX + this.collisionToleranceX1),
            x2: ( (this.posX + this.collisionWidth[this.currentFrame]) ),
            y1: ( this.posY + this.collisionToleranceY1 ),
            y2: ( (this.posY + this.collisionHeight[this.currentFrame]))
        }
    }
}

export {GreenM};