import { BasicObject } from "../basicObject.js";

export class BasicBackground extends BasicObject{
    constructor(sprites, sourceX, sourceY, width, height, posX, posY, canvas, context){
        super(sprites, sourceX, sourceY, width, height, posX, posY, canvas, context);
        this.maxLoop = Math.ceil((canvas.width / width)) + 1;
    }
    
    renderImage(){ 
        for (let index = 0; index < this.maxLoop; index++) {             
            this.context.drawImage(this.sprites,
                this.sourceX, this.sourceY, // Sprite X, Sprite Y
                this.width, this.height, // Tamanho de recorte na Sprite 
                (this.posX + (this.width * index)), this.posY, // Posição na tela                 
                this.width, this.height // Tamanho da imagem na tela
            ); 
        }   
    }

}