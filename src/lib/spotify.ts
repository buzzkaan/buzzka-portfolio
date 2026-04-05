const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID ?? "";
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET ?? "";
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN ?? "";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

// ---------- Types ----------

export interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

// ---------- Access Token ----------

async function getAccessToken(): Promise<string | null> {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) return null;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
  });

  if (!res.ok) return null;
  const json = await res.json();
  return json.access_token ?? null;
}

// ---------- Now Playing / Recently Played ----------

export async function getNowPlaying(): Promise<SpotifyTrack | null> {
  const token = await getAccessToken();
  if (!token) return null;

  const headers = { Authorization: `Bearer ${token}` };

  // Try currently playing first
  const nowRes = await fetch(NOW_PLAYING_URL, { headers });

  if (nowRes.status === 200) {
    const data = await nowRes.json();
    if (data.item) {
      return {
        isPlaying: data.is_playing,
        title: data.item.name,
        artist: data.item.artists.map((a: { name: string }) => a.name).join(", "),
        album: data.item.album.name,
        albumImageUrl: data.item.album.images[0]?.url ?? "",
        songUrl: data.item.external_urls.spotify,
      };
    }
  }

  // Fallback to recently played
  const recentRes = await fetch(RECENTLY_PLAYED_URL, { headers });

  if (recentRes.status === 200) {
    const data = await recentRes.json();
    const track = data.items?.[0]?.track;
    if (track) {
      return {
        isPlaying: false,
        title: track.name,
        artist: track.artists.map((a: { name: string }) => a.name).join(", "),
        album: track.album.name,
        albumImageUrl: track.album.images[0]?.url ?? "",
        songUrl: track.external_urls.spotify,
      };
    }
  }

  return null;
}
