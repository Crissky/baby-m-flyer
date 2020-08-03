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

let hasTouchStartEvent = typeof (window.ontouchstart) != 'undefined';
let myEventListiner = hasTouchStartEvent ? 'touchstart' : 'mousedown';

var isMobile = false;
if (myEventListiner === 'touchstart') {
  isMobile = true;
}

const query = window.location.search;
const urlParams = new URLSearchParams(query);
const gameParam = urlParams.get("game");
var screen;

if (gameParam == 2) {
  screen = new Screen2(canvas, context, isMobile, debug);
} else if (gameParam == 3) {
  screen = new Screen3(canvas, context, isMobile, debug);
} else {
  screen = new Screen1(canvas, context, isMobile, debug);
}

function loop() {
  screen.update();
  screen.render();

  requestAnimationFrame(loop);
}

window.addEventListener(myEventListiner, function () {
  if (screen.click) {
    screen.click();
  }
});

var spaceKeyFireUp = false;
document.body.onkeydown = function (e) {
  if (e.keyCode == 32 && !spaceKeyFireUp) {
    if (screen.click) {
      spaceKeyFireUp = true;
      screen.click();
    }
  }
}

document.body.onkeyup = function (e) {
  if (e.keyCode == 32) {
    spaceKeyFireUp = false;
  }
}

loop();