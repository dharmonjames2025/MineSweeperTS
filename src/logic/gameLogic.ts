import { Cell, BoardStats } from '../types';

export function buildBoard(rows: number, cols: number, numBombs: number): Cell[] {
  const size = rows * cols;
  const bombCount = Math.min(numBombs, size - 1);
  const indices: number[] = Array.from({ length: size }, (_, i) => i);
  for (let i = size - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const bombSet = new Set<number>(indices.slice(0, bombCount));
  const cells: Cell[] = Array.from({ length: size }, (_, i) => ({
    isBomb: bombSet.has(i),
    neighborCount: 0,
    revealed: false,
    flagged: false,
  }));
  for (let i = 0; i < size; i++) {
    if (cells[i].isBomb) continue;
    let count = 0;
    const row = Math.floor(i / cols);
    const col = i % cols;
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = row + dr;
        const nc = col + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          if (cells[nr * cols + nc].isBomb) count++;
        }
      }
    }
    cells[i].neighborCount = count;
  }
  return cells;
}

export function floodReveal(cells: Cell[], idx: number, rows: number, cols: number): Cell[] {
  const next: Cell[] = cells.map(c => ({ ...c }));
  const stack: number[] = [idx];
  while (stack.length > 0) {
    const i = stack.pop()!;
    if (i < 0 || i >= next.length) continue;
    if (next[i].revealed || next[i].flagged) continue;
    next[i].revealed = true;
    if (next[i].neighborCount === 0 && !next[i].isBomb) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = row + dr;
          const nc = col + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            stack.push(nr * cols + nc);
          }
        }
      }
    }
  }
  return next;
}

export function revealAllBombs(cells: Cell[]): Cell[] {
  return cells.map(c => (c.isBomb ? { ...c, revealed: true } : c));
}

export function checkWin(cells: Cell[]): boolean {
  return cells.every(c => c.isBomb || c.revealed);
}

export function toggleFlag(cells: Cell[], idx: number): Cell[] {
  if (cells[idx].revealed) return cells;
  return cells.map((c, i) => i === idx ? { ...c, flagged: !c.flagged } : c);
}

export function getBoardStats(cells: Cell[]): BoardStats {
  const flags = cells.filter(c => c.flagged).length;
  const safeCells = cells.filter(c => !c.isBomb).length;
  const revealedSafe = cells.filter(c => !c.isBomb && c.revealed).length;
  return { flags, remaining: safeCells - revealedSafe };
}
