console.log('[Cris] Flappy Bird');

// VARIABLES
const sprites = new Image();
sprites.src = './sprites/sprites.png';
const baby_sprites = new Image();
baby_sprites.src = './sprites/baby.png';
const green_m_sprites = new Image();
green_m_sprites.src = './sprites/green_M.png';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const paddingX = window.innerWidth > 800 ? 100 : 4;
const paddingY = 4;

const debug = false;

// Screen Size
const height = (window.innerHeight+paddingY) > 600 ? 600 : (window.innerHeight-paddingY) < (480+paddingY) ? 480 : (window.innerHeight-paddingY);
const width = (window.innerWidth-paddingX) < 320 ? 320 : (window.innerWidth+paddingX) > (16/9*height) ? (16/9*height) : (window.innerWidth-paddingY)
//const width = (window.innerWidth-paddingX) < 320 ? 320 : (window.innerWidth-paddingX);
context.canvas.width =  width;
context.canvas.height = height

let screenEnabled = {};

// FUNCTIONS
import { isCollision } from "./utils/Collision.js";
import { sound } from "./utils/Sound.js";

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
const music = new sound(musicPath[Math.floor(Math.random() * musicPath.length)], true);
  
// OBJECTS 
// [Score]
import { Score } from "./classes/Score.js";
const score = new Score(context, sprites, canvas);

// [MessageGetReady]
import { MessageGetReady } from "./classes/MessageGetReady.js";
const messageGetReady = new MessageGetReady(context, sprites, canvas);

// [MessageGameOver]
import { MessageGameOver } from "./classes/MessageGameOver.js";
const messageGameOver = new MessageGameOver(context, sprites, canvas);

// [Background]
import { Background } from "./classes/Background.js";
const background = new Background(context, sprites, canvas);

// [Floor]
import { Floor } from "./classes/Floor.js";
const floor = new Floor(context, sprites, canvas, debug);

// [Pipes]
import { DoublePipe } from "./classes/DoublePipe.js";
const pipes = new DoublePipe(context, sprites, canvas, floor, debug);

// [Baby]
import {Baby} from "./classes/Baby.js";
import {GreenM} from "./classes/GreenM.js";
//const baby = new Baby(context, baby_sprites, canvas, debug);
const baby = new GreenM(context, green_m_sprites, canvas, debug);


// [Screens]
const Screens = {
  START: {
    speed: 0,
    startSound: new sound("../sounds/smw2_flower_get.wav"),
    click() {
      this.startSound.play();
      music.play();
      changeToScreen(Screens.GAME)
    },
    mDraw() {
      background.mDraw();
      floor.mDraw();
      baby.mDraw();
      messageGetReady.mDraw();
    },
    update() {}
  }
};

Screens.GAME = {
  speed: 2,
  stoped: false,
  impactSound: new sound("../sounds/SFX_Impact.wav"),
  topImpactSound: new sound("../sounds/SFX_Top_Impact.wav"),
  click() {
    if(!this.stoped) {
      baby.click(this.speed);
    }
  },
  update() {
    background.update(this.speed);
    pipes.update(this.speed);
    floor.update(this.speed);
    baby.update(this.speed);
    this.iscollided();
    if((pipes.pipeUPList[0].posX + pipes.pipeUPList[0].width) < 0) {
      pipes.removeFirstPipe();
      score.addScore(1);
      if(score.getScore() % 5 === 0){
        this.speed += 0.5;
        score.addLevel(1);
      }
    }
    
  },
  reset() {
    this.speed = 2;
    this.stoped = false;
  },
  stopGame() {
    this.impactSound.play();
    music.stop();
    console.log("Speed:", this.speed);
    screenEnabled.speed = 0;
    baby.stop();
    this.stoped = true;
    
    score.print();
    
    console.log("PipeUP posX", pipes.pipeUPList[0].posX, "PipeDOWN posX", pipes.pipeDOWNList[0].posX);
    console.log("PipeUP posY", pipes.pipeUPList[0].posY, "pipeDOWN posY", pipes.pipeDOWNList[0].posY);
    changeToScreen(Screens.GAMEOVER);
  },
  mDraw() {
    background.mDraw();
    baby.mDraw();
    pipes.mDraw();
    floor.mDraw();
    score.mDraw();
  },
  iscollided() {
    if(baby.posY < 0) {
      baby.posY = 0;
      if( baby.speedY < 0) {
        baby.speedY = 0;
      }
      this.topImpactSound.play();
      console.log("Colisão - Bateu no Top");
    }
    
    if ( isCollision(baby, floor) ) {
      baby.posY = (floor.posY - baby.collisionHeight[baby.currentFrame]);
      this.stopGame();
      console.log("Colisão - Bateu no Chão");
    } else if ( isCollision(baby, pipes.pipeUPList[0]) ) {
        this.stopGame();
        console.log("Colisão - Bateu no Cano de Cima");
    } else if( isCollision(baby, pipes.pipeDOWNList[0]) ) {
        this.stopGame();
        console.log("Colisão - Bateu no Cano de Baixo");
    }
  }
}

Screens.GAMEOVER = {
  speed: 0,
  sleepTime: 30,
  startSound: new sound("../sounds/smw2_flower_get.wav"),
  click() {
    if(this.sleepTime > 0){
      return;
    }
    baby.reset();
    pipes.reset();
    score.reset();
    Screens.GAME.reset();
    
    this.startSound.play();
    music.play();
    this.sleepTime = 30;
    changeToScreen(Screens.GAME)
  },
  mDraw() {
    background.mDraw();
    baby.mDraw();
    pipes.mDraw();
    floor.mDraw();
    messageGameOver.mDraw();
    score.mDraw();
    this.sleepTime -= 1;
  },
  update() {}
}

function changeToScreen(newScreen) {
  screenEnabled = newScreen;
}

function loop() {
  screenEnabled.update();
  screenEnabled.mDraw();

  requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
  if(screenEnabled.click) {
    screenEnabled.click();
  }
});

document.body.onkeypress = function(e){
  if(e.keyCode == 32){
    if(screenEnabled.click) {
      screenEnabled.click();
    }
  }
}

changeToScreen(Screens.START);
loop();