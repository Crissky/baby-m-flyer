import { isCollision } from "../../utils/Collision.js";
import { sound } from "../../utils/Sound.js";
import { Score } from "../Score.js";
import { MessageGetReady } from "../MessageGetReady.js";
import { MessageGameOver } from "../MessageGameOver.js";
import { RedBlockHandler } from "../handler/RedBlockHandler.js";
import { Background2 } from "../Backgrounds.js";
import { Lava1 } from "../scenarios/Lavas.js";

// VARIABLES
const sprites = new Image();
sprites.src = './sprites/sprites.png';

//[Music]
const musicPath = ["https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/vvkhxkzc/1-05%20Sky%20Station%20Galaxy.mp3",
"https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/adswpizf/1-09%20Starship%20Mario%2C%20Launch%21.mp3",
"https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/kbizspaq/1-11%20Yoshi%20Star%20Galaxy.mp3",
"https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/vjoxpmda/1-14%20The%20Starship%20Sails.mp3",
"https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/tipltkjj/1-15%20Spin-Dig%20Galaxy.mp3",
"https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/vwkluwrh/1-18%20Puzzle%20Plank%20Galaxy.mp3",
"https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/pzywfsmk/1-21%20Wild%20Glide%20Galaxy.mp3",
"https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/aihnzipo/1-24%20Hightail%20Falls%20Galaxy.mp3",
"https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/nqyknqbh/1-27%20Slide.mp3",
"https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/zqsthneg/1-28%20Freezy%20Flake%20Galaxy.mp3",
"https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/ptvtbshe/1-31%20Cloudy%20Court%20Galaxy.mp3",
"https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/waukgbpv/2-01%20Starshine%20Beach%20Galaxy.mp3",
"https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/vqggprpl/2-08%20Rightside%20Down%20Galaxy.mp3",
"https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/zqgefyam/2-16%20Throwback%20Galaxy.mp3",
"https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/ojvqofrs/2-29%20Super%20Mario%20Galaxy%202.mp3",
"https://vgmdownloads.com/soundtracks/super-mario-galaxy-2/tzhhamdk/2-32%20Theme%20of%20SMG2.mp3",
"https://vgmdownloads.com/soundtracks/super-mario-odyssey-ost/cptrlfzv/1-02%20Opening%20%28In%20the%20Skies%20Above%20Peach%27s%20Castle%E2%80%A6%29.mp3"];

export class Screen2 {
  constructor(canvas, context, debug=false) {
    this.music = new sound(musicPath[Math.floor(Math.random() * musicPath.length)], true);
    this.background = new Background2(canvas);
    //this.floor = new LavaHandler(canvas, 10, 20, debug);
    this.floor = new Lava1(canvas, 1, debug);
    this.score = new Score(context, sprites, canvas);
    this.redBlockHandler = new RedBlockHandler(canvas, debug);
    this.messageGetReady = new MessageGetReady(context, sprites, canvas);
    this.messageGameOver = new MessageGameOver(context, sprites, canvas);
    this.startScreen = new Start(this);
    this.gameScreen = new Game(this);
    this.gameoverScreen = new Gameover(this);
    this.activeScreen = this.startScreen;
    
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

  activateStartScreen() {
    this.activateScreen(this.startScreen);
  }
  activateGameScreen() {
    this.activateScreen(this.gameScreen);
  }

  activateGameoverScreen() {
    this.activateScreen(this.gameoverScreen);
  }

  activateScreen(newScreen) {
    this.activeScreen = newScreen;
  }
}

class Start {
  constructor(father){
    this.speed = 0;
    this.startSound = new sound("./sounds/smw2_flower_get.wav");
    this.classFather = father;
  }

  click() {
    this.startSound.play();
    this.classFather.music.play();
    this.classFather.activateGameScreen();
  }

  render() {
    this.classFather.background.render();
    this.classFather.floor.render();
    this.classFather.redBlockHandler.render();
    this.classFather.messageGetReady.render();
  }

  update() {
    this.classFather.background.update(this.speed);
    //this.classFather.floor.update(this.speed);
    this.classFather.redBlockHandler.update(this.speed);
  }
}

class Game {
  constructor(father) {
    this.speed = 2;
    this.stoped = false;
    this.reset();
    this.impactSound = new sound("./sounds/SFX_Impact.wav");
    this.topImpactSound = new sound("./sounds/SFX_Top_Impact.wav");
    this.classFather = father;
    this.speedUpTime = 0;
    this.speedUpWait = 20000;
    
  }

  click() {
    if(!this.stoped) { }
  }

  update() {
    this.speedUpTime = ++this.speedUpTime % this.speedUpWait;
    if(this.speedUpTime === 0) {
      this.speed += 0.5;
      console.log("SpeedUP", this.speed);
    }
    this.classFather.background.update(this.speed);
    this.classFather.floor.update(this.speed);
    this.classFather.redBlockHandler.update(this.speed);
    
    //this.iscollided();
    
  }

  reset() {
    this.speed = 2;
    this.stoped = false;
  }

  stopGame() {
    this.impactSound.play();
    this.classFather.music.stop();
    console.log("Speed:", this.speed);
    this.speed = 0;
    this.stoped = true;
    
    this.classFather.score.print();
    
    this.classFather.activateGameoverScreen();
  }

  render() {
    this.classFather.background.render();
    this.classFather.floor.render();
    this.classFather.redBlockHandler.render();
    this.classFather.score.render();
  }

  iscollided() {}
}


class Gameover {
  constructor(father){
    this.speed = 0;
    this.sleepTime = 30;
    this.startSound = new sound("./sounds/smw2_flower_get.wav");
    this.classFather = father;
  }

  click() {
    if(this.sleepTime > 0){
      return;
    }
    this.classFather.score.reset();
    this.classFather.gameScreen.reset()
    
    this.startSound.play();
    this.classFather.music.resetSpeed();
    this.classFather.music.play();
    this.sleepTime = 30;
    this.classFather.activateGameScreen()
  }

  render() {
    this.classFather.background.render();
    this.classFather.floor.render();
    this.classFather.redBlockHandler.render();
    this.classFather.messageGameOver.render();
    this.classFather.score.render();
    this.sleepTime -= 1;
  }

  update() {}
}

class Win {
  constructor() {
    this.winSonund;
    this.classFather = father;
    this.sleepTime = 100;
  }

  click() {

  }

  render() {

  }

  update() {

  }
}