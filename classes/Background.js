export class Background {
    constructor (context, sprites, canvas) {
        this.sourceX = 388;
        this.sourceY = 190;
        this.width = 512;
        this.height = 518;
        this.posX = 0;
        this.posY = (canvas.height - 518 - 70);
        this.time = 0;
        this.delay = 50;
        this.context = context;
        this.sprites = sprites;
        this.canvas = canvas;
    }
    update(ScreenSpeed) {
        this.time = this.time + 1;
        if(this.time > (this.delay / ScreenSpeed)) {
            this.posX = this.posX - 1;
            this.time = 0;
        }
    }
    resetPosX() {
        if(this.posX < (-this.width)) {
            this.posX = this.posX + this.width;
            console.log("Background - resetPosX() - PosX:", this.posX);
        }
    }
    mDraw() {
        let my_gradient = this.context.createLinearGradient(0, 0, 0, this.canvas.height);
        my_gradient.addColorStop(0, "#03001e");
        my_gradient.addColorStop(0.4, "#c471ed");
        my_gradient.addColorStop(0.7, "#12c2e9");
        my_gradient.addColorStop(1, "#fdeff9");
        this.context.fillStyle = my_gradient;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.resetPosX();
        
        let maxLoop = Math.ceil( (this.canvas.width / (this.width/2))) + 1;
        for (let index = 0; index < maxLoop; index++) {
            this.context.drawImage(
                this.sprites,
                this.sourceX, this.sourceY, // Sprite X, Sprite Y
                this.width, this.height, // Tamanho de recorte na Sprite
                (this.posX + ((this.width/2) * index)), (this.posY + 260), // Posição na tela
                this.width/2, this.height/2 // Tamanho da imagem na tela
            );
            
        }
    }
    getArea() {
        return {
            x1: 0,
            x2: this.canvas.width,
            y1: 0,
            y2: this.canvas.height
        }
    }
}