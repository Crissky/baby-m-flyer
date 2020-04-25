export class BaseScreen {
    constructor(speed, floor, backgroundList){
        this.speed = speed;
        this.floor = floor;
        this.backgroundList = backgroundList;
    }
    
    update(){
        this.activeScreen.update();
    }
  
    render(){
        this.activeScreen.render();
    }
  
    click(){
        this.activeScreen.click();
    }
  
}
