import Player from "@vimeo/player";
import throttle from "lodash.throttle";

const iframe = document.querySelector("iframe");
const player = new Player(iframe);
let currentTime = 0;
const SAVED_TIME = "videoplayer-current-time";

populateTime();

player.on("timeupdate", throttle(onPlay, 1000));

function onPlay(event) {
 currentTime = event.seconds;
 localStorage.setItem(SAVED_TIME, currentTime);
}

function populateTime() {
  const savedTime = localStorage.getItem(SAVED_TIME);
  if (savedTime !== 0) {
    player
      .setCurrentTime(savedTime)
      .then(function (seconds) {
        // seconds = the actual time that the player seeked to
      })
      .catch(function (error) {
        switch (error.name) {
          case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

          default:
            // some other error occurred
            break;
        }
      });
  }
}


