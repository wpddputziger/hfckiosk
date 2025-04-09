// js/player.js
let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "390",
    width: "640",
    videoId: "", // start empty
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0
    },
    events: {
      onReady: (e) => e.target.playVideo()
    }
  });
}

function loadVideo(videoId) {
  if (player && player.loadVideoById) {
    player.loadVideoById(videoId);
  }
}

function toggleFontSize() {
  document.body.classList.toggle("large-font");
}
