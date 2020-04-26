import { sound } from "../utils/Sound.js";
class Baby {
    constructor(context, sprites, canvas, debug=false) {
        this.debugMode = debug;
        this.sourceX = 0;
        this.sourceY = 0;
        this.width = 19;
        this.height = 22;
        this.posX = 20;
        this.posY = 50;
        this.speedX = 0;
        this.speedY = 1;
        this.gravity = 0.2;
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
        this.maxFrames = 5;
        this.delayFrame = 20;
        this.currentTimeFrame = 0;
        this.defaultSourceY = 26;
        this.flySound = new sound("../sounds/SFX_Jump.wav");
        this.cape_sourceX = [0, 15, 31, 47, 63].reverse();
        this.cape_sourceY = [23, 23, 23, 23, 23].reverse();
        this.cape_width = [14, 15, 15, 15, 15].reverse();
        this.cape_height = [23, 23, 23, 23, 23].reverse();
        
    }
    click(ScreenSpeed) {
        this.speedY = -5 - (ScreenSpeed * 0.40);
        this.flySound.play();
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
        this.sourceX = 0;
        this.sourceY = 0;
        this.width = 19;
        this.height = 22;
        this.posX = 20;
        this.posY = 50;
        this.speedX = 0;
        this.speedY = 1;
        this.gravity = 0.2;
        this.collisionToleranceX1 = 6;
        this.collisionToleranceX2 = 5;
        this.collisionToleranceY1 = 4;
        this.collisionToleranceY2 = 4;
        
    }
    stop() {
        this.speedY = 0;
        this.speedX = 0;
        this.gravity = 0;
    }
    render() {
        this.updateCurrentDegree();
        this.context.save();
        this.context.translate( (this.posX + (this.width / 2) ), ( this.posY + (this.height / 2) ) );
        this.context.rotate ((Math.PI / 180) * (this.currentDegree));
        
        this.context.drawImage(
            this.sprites,
            this.cape_sourceX[this.currentFrame], this.cape_sourceY[this.currentFrame], // Sprite X, Sprite Y
            this.cape_width[this.currentFrame], this.cape_height[this.currentFrame], // Tamanho de recorte na Sprite
            (this.cape_width[this.currentFrame] / 2)*(-1) - (13), (this.cape_height[this.currentFrame] / 2)*(-1), // Posição na tela
            this.cape_width[this.currentFrame], this.cape_height[this.currentFrame] // Tamanho da imagem na tela
        );

        this.context.drawImage(
            this.sprites,
            this.sourceX, this.sourceY, // Sprite X, Sprite Y
            this.width, this.height, // Tamanho de recorte na Sprite
            (this.width / 2)*(-1), (this.height / 2)*(-1), // Posição na tela
            this.width, this.height // Tamanho da imagem na tela
        );
        
        this.context.restore();
        
        if(this.debugMode === true){
            this.debugRect();
        }
    }
    debugRect() {
        this.context.globalAlpha = 0.5;
        this.context.fillStyle = '#0000ff';
        let collisionRect = this.getCollisionRect();
        this.context.fillRect(collisionRect.x1, collisionRect.y1, (collisionRect.x2 - collisionRect.x1), (collisionRect.y2 - collisionRect.y1));
        
        this.context.fillStyle = '#000000';
        this.context.fillRect(0,0,110,65);
        this.context.globalAlpha = 1.0;

        this.context.font = '8px Arial';
        this.context.textAlign = 'start';
        this.context.fillStyle = '#ffffff';
        this.context.fillText( ("Baby PosX:         " + this.posX.toFixed(2)), 5 , 10 );
        this.context.fillText( ("Baby PosY:         " + this.posY.toFixed(2)), 5 , 25 );
        this.context.fillText( ("Baby SpeedY:     " + this.speedY.toFixed(2)), 5 , 40 );
        this.context.fillText( ("Baby Gravity:     " + this.gravity.toFixed(2)), 5 , 55 );
        
    }
    updateFrame(ScreenSpeed){
        this.currentTimeFrame = ++this.currentTimeFrame % Math.ceil(this.delayFrame / ScreenSpeed);
        if(this.currentTimeFrame === 0){
            this.currentFrame = ++this.currentFrame % this.maxFrames;
            //this.sourceY = this.currentFrame * this.defaultSourceY;
        }
    }
    updateCurrentDegree(){
        if(this.speedY < 0 && this.currentDegree > (this.maxDegree+5) * (-1)){
            this.currentDegree = this.currentDegree - this.incrementDegree;
        } else if(this.speedY > 0 && this.currentDegree < (this.maxDegree *0)){
            this.currentDegree = this.currentDegree + this.incrementDegree;
        }
    }
    getCollisionRect() {
        return [{
            x1: ( this.posX + this.collisionToleranceX1 ),
            x2: ( (this.posX + this.width) - this.collisionToleranceX2 ),
            y1: ( this.posY + this.collisionToleranceY1 ),
            y2: ( (this.posY + this.height) - this.collisionToleranceY2 )
        }]
    }
}

export {Baby};