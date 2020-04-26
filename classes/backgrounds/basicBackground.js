import { BasicObject } from "../basicObject.js";

export class BasicBackground {
    constructor(canvas, elementClass, sizeMultiplier=1, speedMultiplier=1, updateWaitTime=0) {
        this.canvas = canvas;
        this.elementClass = elementClass;
        this.elementList = [new elementClass(canvas, sizeMultiplier)];
        this.sizeMultiplier = sizeMultiplier;
        this.speedMultiplier = speedMultiplier;
        this.updateWaitTime = updateWaitTime;
        this.currentUpdateTime = 0;
    }
    
    renderImage(){ 
        this.elementList.forEach(element => {
            element.renderImage();
        });
    }

    update(speedScreen) {
        this.currentUpdateTime++;
        if(this.currentUpdateTime >= this.updateWaitTime){
            this.currentUpdateTime = 0;
            this.elementList.forEach(element => {
                element.posX -= Math.ceil(speedScreen * this.speedMultiplier);
            });
        }
    }

    createElement(){
        return new this.elementClass(this.canvas, this.sizeMultiplier);
    }
    
    getMaxWidth(){
        let maxWidth = 0
        this.elementList.forEach(element => {
            maxWidth += element.getTrueWidth();
        });
        
        return maxWidth;
    }
    
    getMaxHeight(){
        let maxHeight = 0
        this.elementList.forEach(element => {
            maxHeight += element.getMaxHeight();
        });
        
        return maxHeight;
    }

    getMaxNumHorizontalElements() {
        let element = this.createElement();
        return ( Math.ceil( this.canvas.width / element.getTrueWidth() ) + 1)
    }
    
    getMaxNumVerticalElements() {
        let element = this.createElement();
        return ( Math.ceil( this.canvas.height / element.getTrueHeight() ) + 1)
    }
    
}