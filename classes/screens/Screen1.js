import { isCollision } from "../../utils/Collision.js";
import { sound } from "../../utils/Sound.js";

import { Background } from "../Background.js";
import { Floor } from "../Floor.js";
import { GreenM } from "../GreenM.js";
import { DoublePipe } from "../DoublePipe.js";
import { Score } from "../Score.js";
import { MessageGetReady } from "../MessageGetReady.js";
import { MessageGameOver } from "../MessageGameOver.js";

// VARIABLES
const sprites = new Image();
sprites.src = '../../sprites/sprites.png';
const green_m_sprites = new Image();
green_m_sprites.src = '../../sprites/green_M.png';

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

export class Screen1 {
  constructor(canvas, context, debug=false) {
    this.startScreen = new Start(this);
    this.gameScreen = new Game(this);
    this.gameoverScreen = new Gameover(this);
    this.activeScreen = this.startScreen;
    this.music = new sound(musicPath[Math.floor(Math.random() * musicPath.length)], true);
    this.background = new Background(context, sprites, canvas);
    this.floor = new Floor(context, sprites, canvas, debug);
    this.char = new GreenM(context, green_m_sprites, canvas, debug);
    this.pipes = new DoublePipe(context, sprites, canvas, this.floor, debug);
    this.score = new Score(context, sprites, canvas);
    this.messageGetReady = new MessageGetReady(context, sprites, canvas);
    this.messageGameOver = new MessageGameOver(context, sprites, canvas);
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
    this.startSound = new sound("../sounds/smw2_flower_get.wav");
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
    this.classFather.char.render();
    this.classFather.messageGetReady.render();
  }

  update() {}
}

class Game {
  constructor(father){
    this.speed = 2;
    this.stoped = false;
    this.impactSound = new sound("../sounds/SFX_Impact.wav");
    this.topImpactSound = new sound("../sounds/SFX_Top_Impact.wav");
    this.classFather = father;
  }

  click() {
    if(!this.stoped) {
      this.classFather.char.click(this.speed);
    }
  }

  update() {
    this.classFather.background.update(this.speed);
    this.classFather.pipes.update(this.speed);
    this.classFather.floor.update(this.speed);
    this.classFather.char.update(this.speed);
    this.iscollided();

    if((this.classFather.pipes.pipeUPList[0].posX + this.classFather.pipes.pipeUPList[0].width) < 0) {
      this.classFather.pipes.removeFirstPipe();
      this.classFather.score.addScore(1);
      if(this.classFather.score.getScore() % 5 === 0) {
        this.speed += 0.5;
        this.classFather.score.addLevel(1, this.classFather.music);
      }
    }
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
    this.classFather.char.stop();
    this.stoped = true;
    
    this.classFather.score.print();
    
    console.log("PipeUP posX", this.classFather.pipes.pipeUPList[0].posX, "PipeDOWN posX", this.classFather.pipes.pipeDOWNList[0].posX);
    console.log("PipeUP posY", this.classFather.pipes.pipeUPList[0].posY, "pipeDOWN posY", this.classFather.pipes.pipeDOWNList[0].posY);
    this.classFather.activateGameoverScreen();
  }

  render() {
    this.classFather.background.render();
    this.classFather.char.render();
    this.classFather.pipes.render();
    this.classFather.floor.render();
    this.classFather.score.render();
  }

  iscollided() {
    if(this.classFather.char.posY < 0) {
      this.classFather.char.posY = 0;
      if( this.classFather.char.speedY < 0) {
        this.classFather.char.speedY = 0;
      }
      this.topImpactSound.play();
      console.log("Collision - Collided with the top");
    }
    
    if ( isCollision(this.classFather.char, this.classFather.floor) ) {
      this.classFather.char.posY = (this.classFather.floor.posY - this.classFather.char.collisionHeight[this.classFather.char.currentFrame]);
      this.stopGame();
      console.log("Collision - Collided with the ground");
    } else if ( isCollision(this.classFather.char, this.classFather.pipes.pipeUPList[0]) ) {
        this.stopGame();
        console.log("Collision - Collided with the upper pipe");
    } else if( isCollision(this.classFather.char, this.classFather.pipes.pipeDOWNList[0]) ) {
        this.stopGame();
        console.log("Collision - Collided with the bottom pipe");
    }
  }
}


class Gameover {
  constructor(father){
    this.speed = 0;
    this.sleepTime = 30;
    this.startSound = new sound("../sounds/smw2_flower_get.wav");
    this.classFather = father;
  }

  click() {
    if(this.sleepTime > 0){
      return;
    }
    this.classFather.char.reset();
    this.classFather.pipes.reset();
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
    this.classFather.char.render();
    this.classFather.pipes.render();
    this.classFather.floor.render();
    this.classFather.messageGameOver.render();
    this.classFather.score.render();
    this.sleepTime -= 1;
  }

  update() {}
}