export interface Cell {
  isBomb: boolean;
  neighborCount: number;
  revealed: boolean;
  flagged: boolean;
}

export interface BoardStats {
  flags: number;
  remaining: number;
}

export type GameState = 'playing' | 'won' | 'lost';
