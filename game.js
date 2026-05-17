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

//VISITOR COUNTER
// https://countapi.mileshilliard.com/#intro
const countThisGame = document.getElementById('countPlayThisGame');
const countAllGames = document.getElementById('countPlayAllGames');
const basePath = 'https://countapi.mileshilliard.com/api/v1/hit/crissky-baby-m-flyer-live-';
let thisGamePath;
let allGamesPath = basePath + 'all-games';

function updateVisitCount(path, target) {
  fetch(path)
  .then(res => res.json())
  .then(res => {
    target.innerHTML = res.value ? res.value : 0;
  });
}

// OBJECTS 
import { Screen1 } from "./classes/screens/Screen1.js";
import { Screen2 } from "./classes/screens/Screen2.js";
import { Screen3 } from "./classes/screens/Screen3.js";
// import { ScreenSandbox } from "./classes/screens/ScreenSandbox.js";

let hasTouchStartEvent = typeof (window.ontouchstart) != 'undefined';
let myEventListiner = hasTouchStartEvent ? 'touchstart' : 'mousedown';

var isMobile = false;
if (myEventListiner === 'touchstart') {
  isMobile = true;
}

const title = document.getElementById("gameTitle");
const query = window.location.search;
const urlParams = new URLSearchParams(query);
const gameParam = urlParams.get("game");
var screen;

if (gameParam == 2) {
  thisGamePath = basePath + 'magnet-lava';
  screen = new Screen2(canvas, context, isMobile, debug);
  title.textContent = 'Magnet Lava';
  title.style.color = '#F5B027';
  title.style.textShadow = `
    2px 2px 0 #27D3F5,
   -2px 2px 0 #4927F5,
    2px -2px 0 #4927F5,
   -2px -2px 0 #27D3F5
  `;
} else if (gameParam == 3) {
  thisGamePath = basePath + 'castle-run';
  screen = new Screen3(canvas, context, isMobile, debug);
  title.textContent = 'Castle Run';
  title.style.color = '#F54927';
  title.style.textShadow = `
    2px 2px 0 #276CF5,
   -2px 2px 0 #27F5B0,
    2px -2px 0 #27F5B0,
   -2px -2px 0 #276CF5
  `;
} else {
  thisGamePath = basePath + 'between-pipes';
  screen = new Screen1(canvas, context, isMobile, debug);
  title.textContent = 'Between Pipes';
  title.style.color = '#D3F527';
  title.style.textShadow = `
    2px 2px 0 #276CF5,
   -2px 2px 0 #B027F5,
    2px -2px 0 #B027F5,
   -2px -2px 0 #276CF5
  `;
}

updateVisitCount(allGamesPath, countAllGames);
updateVisitCount(thisGamePath, countThisGame);

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