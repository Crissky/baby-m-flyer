export function Sound(src, isMusic = false, isMobile = false) {
  this.isMobile = isMobile;
  this.sound = document.createElement("audio");
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);

  if (this.isMobile === false) {
    this.sound.src = src;
    if (isMusic === true) {
      console.log("The chosen song was", src);
      this.sound.setAttribute("loop", "true");
      this.sound.volume = 0.30;
    }
  }

  this.play = function () {
    this.sound.play();
  }
  this.stop = function () {
    this.sound.load();
  }
  this.speedUp = function (addSpeedSound) {
    this.sound.playbackRate += addSpeedSound;
    console.log("Music Speed", this.sound.playbackRate);
  }
  this.resetSpeed = function () {
    this.sound.playbackRate = 1;
  }
}