console.log("📥 playlist.js loaded");

async function fetchPlaylists() {
  const res = await fetch("playlist.json");
  const playlists = await res.json();
  return playlists.filter(p => p.visible !== false);
}

async function fetchVideosFromPlaylist(playlistId) {
  const API_KEY = YT_API_KEY;
  const endpoint = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`;
  const res = await fetch(endpoint);
  const data = await res.json();

  return data.items.map(item => ({
    title: item.snippet.title,
    videoId: item.snippet.resourceId.videoId,
    thumbnail: item.snippet.thumbnails.medium.url
  }));
}

function renderVideoList(videos) {
  const list = document.getElementById("video-list");
  list.innerHTML = "";

  videos.forEach((video, index) => {
    const li = document.createElement("li");
    li.className = "video-item";

    const thumb = document.createElement("img");
    thumb.className = "video-thumb";
    thumb.src = video.thumbnail;
    thumb.alt = video.title;

    const title = document.createElement("div");
    title.className = "video-title";
    title.textContent = video.title;

    li.appendChild(thumb);
    li.appendChild(title);
    li.onclick = () => loadVideo(video.videoId, index);
    list.appendChild(li);
  });

  currentVideoList = videos;
  if (videos.length > 0) {
    loadVideo(videos[0].videoId, 0);
  }
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

async function loadPlaylist(playlistId) {
  const videos = await fetchVideosFromPlaylist(playlistId);
  renderVideoList(videos);
}

// Init
(async () => {
  const playlists = await fetchPlaylists();
  createPlaylistButtons(playlists);

  const defaultPlaylist = playlists.find(p => p.default) || playlists[0];
  if (defaultPlaylist) {
    loadPlaylist(defaultPlaylist.id);
  }
})();
