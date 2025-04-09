function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "390",
    width: "640",
    videoId: "",
    playerVars: {
      autoplay: 0, // ⛔ Autoplay off by default
      controls: 0,
      modestbranding: 1,
      rel: 0
    },
    events: {
      onReady: (e) => console.log("📺 YouTube player ready")
    }
  });
}
