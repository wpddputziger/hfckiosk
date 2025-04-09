// js/playlist.js
console.log("📥 playlist.js loaded");

async function fetchPlaylists() {
  try {
    const res = await fetch("playlist.json");
    const playlists = await res.json();
    const visiblePlaylists = playlists.filter(p => p.visible !== false);
    console.log("📂 Visible playlists:", visiblePlaylists);
    return visiblePlaylists;
  } catch (err) {
    console.error("❌ Error loading playlist.json", err);
    return [];
  }
}

async function fetchVideosFromPlaylist(playlistId) {
  console.log("▶️ Fetching videos from playlist:", playlistId);
  const API_KEY = YT_API_KEY; // Defined in index.html from base64

  const endpoint = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`;

  try {
    const res = await fetch(endpoint);
    const data = await res.json();

    const videos = data.items.map(item => ({
      title: item.snippet.title,
      videoId: item.snippet.resourceId.videoId
    }));

    console.log("🎞️ Loaded videos:", videos);
    return videos;
  } catch (err) {
    console.error("❌ Failed to fetch videos", err);
    return [];
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

function renderVideoList(videos) {
  const list = document.getElementById("video-list");
  list.innerHTML = "";

  videos.forEach(video => {
    const li = document.createElement("li");
    li.textContent = video.title;
    li.onclick = () => loadVideo(video.videoId);
    list.appendChild(li);
  });

  if (videos.length > 0) {
loadVideo("M7lc1UVf-VE"); // YouTube's official API demo video

  }
}

async function loadPlaylist(playlistId) {
  const videos = await fetchVideosFromPlaylist(playlistId);
  renderVideoList(videos);
}

// On page load
(async () => {
  const playlists = await fetchPlaylists();
  if (playlists.length === 0) {
    document.getElementById("video-list").innerHTML = "<li>No playlists available.</li>";
    return;
  }

  createPlaylistButtons(playlists);

  const defaultPlaylist = playlists.find(p => p.default) || playlists[0];
  if (defaultPlaylist) {
    loadPlaylist(defaultPlaylist.id);
  }
})();
