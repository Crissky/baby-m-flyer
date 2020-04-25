export function sound(src, isMusic=false) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  if(isMusic === true){
    console.log("The chosen song was", src);
    this.sound.setAttribute("loop", "true");
    this.sound.volume = 0.30;
  }
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function() {
    this.sound.play();
  }
  this.stop = function() {
    this.sound.load();
  }
  this.speedUp = function(addSpeedSound) {
    this.sound.playbackRate += addSpeedSound;
    console.log("Music Speed", this.sound.playbackRate);
  }
  this.resetSpeed = function() {
    this.sound.playbackRate = 1;
  }
}