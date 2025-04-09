let player;
let currentVideoIndex = 0;
let currentVideoList = [];

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "390",
    width: "640",
    videoId: "",
    playerVars: {
      autoplay: 0,
      controls: 0,
      modestbranding: 1,
      rel: 0
    },
    events: {
      onReady: () => console.log("📺 YouTube player ready"),
      onStateChange: onPlayerStateChange
    }
  });
}

function loadVideo(videoId, index = 0) {
  if (player && player.loadVideoById) {
    currentVideoIndex = index;
    player.loadVideoById(videoId);
  }
}

function onPlayerStateChange(event) {
  const playBtn = document.getElementById("togglePlayPause");
  if (!playBtn) return;
  if (event.data === YT.PlayerState.PLAYING) {
    playBtn.textContent = "⏸";
  } else {
    playBtn.textContent = "▶";
  }
}

window.togglePlayPause = function () {
  if (!player) return;
  const state = player.getPlayerState();
  if (state === YT.PlayerState.PLAYING) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
};

window.skipVideo = function (direction) {
  const newIndex = currentVideoIndex + direction;
  if (newIndex >= 0 && newIndex < currentVideoList.length) {
    currentVideoIndex = newIndex;
    loadVideo(currentVideoList[newIndex].videoId, newIndex);
  }
};
