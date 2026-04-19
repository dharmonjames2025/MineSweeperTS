export const COLORS = {
  bg: '#F8F7F4',
  surface: '#FFFFFF',
  surfaceAlt: '#F1EFE8',
  border: 'rgba(0,0,0,0.10)',
  borderMed: 'rgba(0,0,0,0.18)',
  textPrimary: '#1A1A18',
  textSecondary: '#6B6A65',
  textMuted: '#9E9D98',
  accent: '#1A1A18',
  accentFg: '#FFFFFF',
  win: '#EAF3DE',
  winText: '#3B6D11',
  lose: '#FCEBEB',
  loseText: '#A32D2D',
  loseCell: '#FCEBEB',
  loseCellBorder: '#F09595',
  flagColor: '#E24B4A',
  mineColor: '#E24B4A',
  numberColors: [
    '', '#185FA5', '#0F6E56', '#A32D2D',
    '#26215C', '#993C1D', '#0F6E56', '#444441', '#2C2C2A',
  ] as string[],
} as const;

export const SPACING = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24 } as const;
export const RADII = { sm: 6, md: 8, lg: 10, xl: 12 } as const;
export const TYPOGRAPHY = {
  titleSize: 22,
  titleWeight: '600' as const,
  bodySize: 14,
  labelSize: 13,
  smallSize: 11,
  statNumSize: 18,
  statNumWeight: '600' as const,
} as const;
export const BOARD = { cellSize: 34, cellGap: 2 } as const;
