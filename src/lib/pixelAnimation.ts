/**
 * Shared pixel animation utilities used by PixelTransition and PixelAvatar.
 */

/** Returns a Fisher-Yates shuffled array of indices [0, total). */
export function shuffleIndices(total: number): number[] {
  const indices = Array.from({ length: total }, (_, i) => i);
  for (let i = total - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

/** Returns the fill color matching the current theme. */
export function getThemeColor(): string {
  return document.documentElement.classList.contains("dark") ? "#000" : "#fff";
}

/** Draws `count` pixel tiles from the shuffled index list onto a canvas context. */
export function drawPixelTiles(
  ctx: CanvasRenderingContext2D,
  indices: number[],
  count: number,
  cols: number,
  gridSize: number,
  color: string
) {
  ctx.fillStyle = color;
  for (let i = 0; i < count; i++) {
    const idx = indices[i];
    ctx.fillRect((idx % cols) * gridSize, Math.floor(idx / cols) * gridSize, gridSize, gridSize);
  }
}
