// js/playlist.js

async function fetchPlaylists() {
  const res = await fetch("playlist.json");
  const playlists = await res.json();
  return playlists.filter(p => p.visible !== false);
}

async function fetchVideosFromPlaylist(playlistId) {
  const API_KEY = atob("QUl6YVN5QlhPblBiOE1LeEJFMXBUNlNZdmRRZFhfODczNTBOazln");
  const endpoint = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`;
  const res = await fetch(endpoint);
  const data = await res.json();

  return data.items.map(item => ({
    title: item.snippet.title,
    videoId: item.snippet.resourceId.videoId
  }));
}

function createPlaylistButtons(playlists) {
  const container = document.getElementById("playlist-selector");
  container.innerHTML = "";
  playlists.forEach(playlist => {
    const btn = document.createElement("button");
    btn.textContent = playlist.title;
    btn.onclick = () => loadPlaylist(playlist.id);
    container.appendChild(btn);
  });
}

function renderVideoList(videos) {
  const list = document.getElementById("video-list");
  list.innerHTML = "";

  videos.forEach(video => {
    const li = document.createElement("li");
    li.textContent = video.title;
    li.onclick = () => loadVideo(video.videoId);
    list.appendChild(li);
  });

  // Auto-play first video
  if (videos.length > 0) {
    loadVideo(videos[0].videoId);
  }
}

async function loadPlaylist(playlistId) {
  const videos = await fetchVideosFromPlaylist(playlistId);
  renderVideoList(videos);
}

// Initialize
(async () => {
  const playlists = await fetchPlaylists();
  createPlaylistButtons(playlists);

  const defaultPlaylist = playlists.find(p => p.default) || playlists[0];
  if (defaultPlaylist) {
    loadPlaylist(defaultPlaylist.id);
  }
})();
