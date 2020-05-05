console.log('[Cris] Baby M. Flyer');

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const paddingX = window.innerWidth > 800 ? 100 : 4;
const paddingY = 4;

const debug = true;

// Screen Size
const height = (window.innerHeight+paddingY) > 600 ? 600 : (window.innerHeight-paddingY) < (480+paddingY) ? 480 : (window.innerHeight-paddingY);
const width = (window.innerWidth-paddingX) < 320 ? 320 : (window.innerWidth+paddingX) > (16/9*height) ? (16/9*height) : (window.innerWidth-paddingY)
//const width = (window.innerWidth-paddingX) < 320 ? 320 : (window.innerWidth-paddingX);
context.canvas.width =  width;
context.canvas.height = height

console.log(`Screen size ${height}x${width}`)

// OBJECTS 
import { Screen1 } from "./classes/screens/Screen1.js";
import { Screen2 } from "./classes/screens/Screen2.js";

// const screen1 = new Screen1(canvas, context, debug);
const screen1 = new Screen2(canvas, context, debug);

function loop() {
  screen1.update();
  screen1.render();

  requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
  if(screen1.click) {
    screen1.click();
  }
});

document.body.onkeypress = function(e){
  if(e.keyCode == 32){
    if(screen1.click) {
      screen1.click();
    }
  }
}

loop();