//use with https://github.com/tosuapp/tosu/releases/

const WebSocket = require("ws");
const RPC = require("discord-rpc");

const CLIENT_ID = "1465924588180345039";
const WS_V2 = "ws://127.0.0.1:24050/websocket/v2";
const PUSH_EVERY_MS = 5000;

let v2 = null;

const safe = (n) => (Number.isFinite(+n) ? +n : 0);

function getBm() {
  return v2?.beatmap || v2?.menu?.bm || null;
}
function getMeta() {
  const bm = getBm();
  return bm?.metadata || bm || null;
}
function getBeatmapId() {
  const bm = getBm();
  const meta = getMeta();
  return bm?.id || bm?.beatmapId || meta?.id || meta?.beatmapId || null;
}
function getSetId() {
  const bm = getBm();
  const meta = getMeta();
  return bm?.set || bm?.setId || meta?.set || meta?.setId || null;
}

function beatmapUrl() {
  const id = getBeatmapId();
  if (id) return `https://osu.ppy.sh/b/${id}`;
  const set = getSetId();
  if (set) return `https://osu.ppy.sh/beatmapsets/${set}`;
  return "https://osu.ppy.sh";
}

function mods(m) {
  const name = String(m?.name || "").trim();
  if (!name || name.toUpperCase() === "NOMOD") return "NM";
  return name;
}

function title() {
  const meta = getMeta();
  if (!meta) return "No beatmap";

  const artist = meta.artist || meta.artistRomanized || "Unknown Artist";
  const t = meta.title || meta.titleRomanized || "Unknown Title";
  const diff = meta.difficulty || meta.version || meta.diff || "Unknown";

  return `${artist} - ${t} [${diff}]`;
}

function stars() {
  const bm = getBm();
  const s = bm?.stats?.stars?.live ?? bm?.stats?.stars ?? bm?.stars ?? 0;
  return safe(s).toFixed(2);
}

function accPercent() {
  const a = safe(v2?.play?.accuracy);
  return (a <= 1 ? a * 100 : a).toFixed(2);
}

function combo() {
  const cur = safe(v2?.play?.combo?.current);
  const max = safe(v2?.play?.combo?.max);
  return `${cur}x/${max}x`;
}

function ppText() {
  const cur = Math.round(safe(v2?.play?.pp?.current));
  const fc = Math.round(safe(v2?.play?.pp?.fc));
  return fc > 0 ? `${cur}pp (FC ${fc})` : `${cur}pp`;
}

function coverUrl() {
  const set = getSetId();
  return set ? `https://assets.ppy.sh/beatmaps/${set}/covers/list.jpg` : null;
}

function hitsText() {
  const h = v2?.play?.hits || {};
  const h300 = safe(h["300"]);
  const h100 = safe(h["100"]);
  const h50 = safe(h["50"]);
  const miss = safe(h["0"]);

  return `🟦${h300} 🟩${h100} 🟪${h50} ❌${miss}`;
}

function statsLine() {
  return `★ ${stars()} | ${accPercent()}% | ${ppText()} | ${combo()} | ${mods(v2?.play?.mods)}`;
}

function buildPresence() {
  const presence = {
    details: title().slice(0, 128),

    state: hitsText().slice(0, 128),

    largeImageText: statsLine().slice(0, 128),

    buttons: [{ label: "Open beatmap", url: beatmapUrl() }],
    instance: false,
  };

  const cover = coverUrl();
  if (cover) presence.largeImageKey = cover;

  return presence;
}

async function main() {
  RPC.register(CLIENT_ID);
  const rpc = new RPC.Client({ transport: "ipc" });

  rpc.on("ready", () => {
    console.log(`[rpc] logged in as ${rpc.user?.username || "unknown"}`);

    setInterval(async () => {
      if (!v2) return;

      try {
        await rpc.setActivity(buildPresence());
      } catch (e) {
        console.log("[rpc] setActivity error:", e?.message || e);
      }
    }, PUSH_EVERY_MS);
  });

  await rpc.login({ clientId: CLIENT_ID });

  const ws = new WebSocket(WS_V2);
  ws.on("open", () => console.log("[ws] connected v2"));
  ws.on("message", (d) => {
    try {
      v2 = JSON.parse(d.toString("utf8"));
    } catch {}
  });

  console.log("osu! Discord RPC running");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
