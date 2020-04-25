import { BasicBackground } from '../bg/basicBackground.js'
import { Floor1 } from "../bg/bg-elements/floors.js";
import { Sky1 } from "../bg/bg-elements/skies.js";

const scenario = new Image();
scenario.src = '../sprites/scenario.png';

export class Scenario1 {
    constructor(canvas, context) {
        this.elements = [new Sky1(canvas), new Floor1(canvas, 1)];
        this.canvas = canvas;
        this.context = context;
    }
    getScenarioElement(model) {
        return new BasicBackground(model.sprite,
            model.sourceX, model.sourceY,
            model.width, model.height, 
            model.posX, model.posY, 
            this.canvas, this.context);
    }
    putScenarioElement(model){
        if(model.list.length < 2) {
            var newElement = this.getScenarioElement(model);
            model.list.push(newElement);
            if(model.list.length > 1){
                model.list[1].posX = model.maxWidth + model.list[0].posX;
            }
        }
    }
    removeScenarioElement(model){
        if(model.list[0].posX <= -(model.maxWidth)) {
            model.list.shift();
            this.putScenarioElement(model);
        }
    }
    renderImage(){
        for(let index1 = 0; index1 < this.elements.length; index1++) {
            for (let index2 = 0; index2 < this.elements[index1].list.length; index2++) {
                this.elements[index1].list[index2].renderImage();
                console.log(this.elements[index1].list[index2]);
            }
        }
    }

    update(speedScreen){
        for (let index = 0; index < this.elements.length; index++) {
            this.putScenarioElement(this.elements[index]);
            this.removeScenarioElement(this.elements[index]);
            this.elements[index].update(speedScreen);
        }
    }

}