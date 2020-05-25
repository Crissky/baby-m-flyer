console.log('[Cris] Baby M. Flyer');

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const paddingX = window.innerWidth > 800 ? 100 : 4;
const paddingY = 4;

const debug = false;

// Screen Size
const height = (window.innerHeight + paddingY) > 600 ? 600 : (window.innerHeight - paddingY) < (480 + paddingY) ? 480 : (window.innerHeight - paddingY);
const width = (window.innerWidth - paddingX) < 320 ? 320 : (window.innerWidth + paddingX) > (16 / 9 * height) ? (16 / 9 * height) : (window.innerWidth - paddingY)
//const width = (window.innerWidth-paddingX) < 320 ? 320 : (window.innerWidth-paddingX);
context.canvas.width = width;
context.canvas.height = height;

console.log(`Screen size ${height}x${width}`)

// OBJECTS 
import { Screen1 } from "./classes/screens/Screen1.js";
import { Screen2 } from "./classes/screens/Screen2.js";
import { Screen3 } from "./classes/screens/Screen3.js";
import { ScreenSandbox } from "./classes/screens/ScreenSandbox.js";

const screen1 = new Screen1(canvas, context, debug);
// const screen1 = new Screen2(canvas, context, debug);
// const screen1 = new Screen3(canvas, context, debug);
// const screen1 = new ScreenSandbox(canvas, context, debug);

function loop() {
  screen1.update();
  screen1.render();

  requestAnimationFrame(loop);
}

window.addEventListener('mousedown', function () {
  if (screen1.click) {
    screen1.click();
  }
});

var spaceKeyFireUp = false;
document.body.onkeydown = function (e) {
  if (e.keyCode == 32 && !spaceKeyFireUp) {
    if (screen1.click) {
      spaceKeyFireUp = true;
      screen1.click();
    }
  }
}

document.body.onkeyup = function (e) {
  if (e.keyCode == 32) {
    spaceKeyFireUp = false;
  }
}

loop();