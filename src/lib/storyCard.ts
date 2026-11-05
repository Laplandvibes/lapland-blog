// Story card: the writer's photo as a 1080 × 1920 image for Instagram and
// Facebook stories, with the temperature, place and date printed on it.
// Drawn in the browser from the already uploaded photo, so nothing extra is
// stored. The darkening is a gradient under the text only (network rule
// 2026-09-26: no overlay over the whole photo).

export interface StoryCardInput {
  photoUrl: string;
  /** Already formatted, e.g. "−2 °C". Omitted = no temperature line. */
  temp?: string;
  place?: string;
  /** Already formatted in the reader's language. */
  date?: string;
  /** e.g. "lapland.blog/by/vesa" */
  link: string;
  /** Source line for the temperature, e.g. "Lämpötila: Ilmatieteen laitos". */
  tempSource?: string;
}

const W = 1080;
const H = 1920;

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Supabase storage sends CORS headers; needed to export the canvas
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('photo'));
    img.src = url;
  });
}

function fitText(ctx: CanvasRenderingContext2D, text: string, font: (px: number) => string, maxPx: number, maxWidth: number): number {
  let px = maxPx;
  ctx.font = font(px);
  while (px > 24 && ctx.measureText(text).width > maxWidth) {
    px -= 4;
    ctx.font = font(px);
  }
  return px;
}

export async function drawStoryCard(input: StoryCardInput): Promise<Blob> {
  await Promise.all([
    document.fonts.load('800 200px Manrope'),
    document.fonts.load('700 64px Manrope'),
    document.fonts.load('500 40px Inter'),
    document.fonts.load('400 60px "Bebas Neue"'),
  ]).catch(() => undefined);

  const img = await loadImage(input.photoUrl);
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvas');

  // Photo, cover-cropped around the centre.
  const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
  const dw = img.naturalWidth * scale;
  const dh = img.naturalHeight * scale;
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, W, H);
  ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);

  // Wordmark on its own dark plate: a white "LAPLAND" vanished into a grey
  // sky on the first test card (2026-11-05), so the plate is not optional.
  ctx.textBaseline = 'alphabetic';
  ctx.font = '400 64px "Bebas Neue", "Arial Narrow", sans-serif';
  const hashW = ctx.measureText('#').width;
  const lapW = ctx.measureText('LAPLAND').width;
  const blogW = ctx.measureText('.BLOG').width;
  const plateW = hashW + lapW + blogW + 56;
  ctx.fillStyle = 'rgba(15,23,42,0.78)';
  ctx.beginPath();
  ctx.roundRect(44, 70, plateW, 92, 46);
  ctx.fill();
  ctx.fillStyle = '#EC4899';
  ctx.fillText('#', 72, 140);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('LAPLAND', 72 + hashW, 140);
  ctx.fillStyle = '#EC4899';
  ctx.fillText('.BLOG', 72 + hashW + lapW, 140);

  // Gradient under the text block at the bottom.
  const bottom = ctx.createLinearGradient(0, H - 860, 0, H);
  bottom.addColorStop(0, 'rgba(15,23,42,0)');
  bottom.addColorStop(0.45, 'rgba(15,23,42,0.62)');
  bottom.addColorStop(1, 'rgba(15,23,42,0.92)');
  ctx.fillStyle = bottom;
  ctx.fillRect(0, H - 860, W, 860);

  const left = 72;
  const maxW = W - left * 2;
  let y = H - 150;

  ctx.fillStyle = '#F9A8D4';
  ctx.font = '600 38px Inter, sans-serif';
  ctx.fillText(input.link, left, y);
  y -= 70;

  if (input.date) {
    ctx.fillStyle = '#E2E8F0';
    ctx.font = '500 42px Inter, sans-serif';
    ctx.fillText(input.date, left, y);
    y -= 72;
  }
  if (input.place) {
    ctx.fillStyle = '#FFFFFF';
    const px = fitText(ctx, input.place, (p) => `700 ${p}px Manrope, sans-serif`, 76, maxW);
    ctx.fillText(input.place, left, y);
    y -= px + 24;
  }
  if (input.temp) {
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 230px Manrope, sans-serif';
    ctx.fillText(input.temp, left - 8, y);
  }
  if (input.temp && input.tempSource) {
    ctx.fillStyle = 'rgba(226,232,240,0.85)';
    ctx.font = '500 26px Inter, sans-serif';
    ctx.fillText(input.tempSource, left, H - 80);
  }

  return new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('encode'))), 'image/jpeg', 0.9),
  );
}
