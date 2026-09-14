import sharp from "sharp";
const SRC = "D:/_puhelin_staging/kuvat";
const OUT = process.argv[2], names = process.argv.slice(3);
const W = 280, H = 190, COLS = 6;
const rows = Math.ceil(names.length / COLS);
const tiles = [];
for (let i = 0; i < names.length; i++) {
  try {
    const buf = await sharp(`${SRC}/${names[i]}`).rotate().resize(W, H, { fit: "cover" }).toBuffer();
    const label = Buffer.from(`<svg width="${W}" height="16"><rect width="${W}" height="16" fill="#000b"/><text x="3" y="12" font-family="monospace" font-size="11" fill="#fff">${i + 1}. ${names[i].replace(".jpg","")}</text></svg>`);
    tiles.push({ input: await sharp(buf).composite([{ input: label, top: H - 16, left: 0 }]).toBuffer(), top: Math.floor(i / COLS) * H, left: (i % COLS) * W });
  } catch (e) { console.log("skip", names[i]); }
}
await sharp({ create: { width: W * COLS, height: H * rows, channels: 3, background: "#111" } }).composite(tiles).jpeg({ quality: 72 }).toFile(OUT);
console.log("arkki", tiles.length);
