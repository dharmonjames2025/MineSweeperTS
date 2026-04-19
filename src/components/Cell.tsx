import React, { memo } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Cell as CellType } from '../types';
import { COLORS, BOARD, RADII } from '../styles/theme';

interface Props {
  cell: CellType;
  onPress: () => void;
  onLongPress: () => void;
}

const Cell = memo(function Cell({ cell, onPress, onLongPress }: Props) {
  let backgroundColor = COLORS.surfaceAlt;
  let borderColor = COLORS.border;
  let label: string | null = null;
  let labelColor = COLORS.textPrimary;

  if (cell.revealed) {
    backgroundColor = COLORS.surface;
    if (cell.isBomb) {
      backgroundColor = COLORS.loseCell;
      borderColor = COLORS.loseCellBorder;
      label = '✕';
      labelColor = COLORS.mineColor;
    } else if (cell.neighborCount > 0) {
      label = String(cell.neighborCount);
      labelColor = COLORS.numberColors[cell.neighborCount];
    }
  } else if (cell.flagged) {
    label = '⚑';
    labelColor = COLORS.flagColor;
  }

  return (
    <TouchableOpacity
      style={[styles.cell, { backgroundColor, borderColor }]}
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={400}
      activeOpacity={cell.revealed ? 1 : 0.55}
    >
      {label ? <Text style={[styles.label, { color: labelColor }]}>{label}</Text> : null}
    </TouchableOpacity>
  );
});

export default Cell;

const styles = StyleSheet.create({
  cell: {
    width: BOARD.cellSize,
    height: BOARD.cellSize,
    borderRadius: RADII.sm,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { fontSize: 13, fontWeight: '600' },
});
