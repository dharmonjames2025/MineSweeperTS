import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Cell from './Cell';
import { Cell as CellType } from '../types';
import { BOARD } from '../styles/theme';

interface Props {
  cells: CellType[];
  gridSize: number;
  onPress: (idx: number) => void;
  onLongPress: (idx: number) => void;
}

export default function Board({ cells, gridSize, onPress, onLongPress }: Props) {
  const boardWidth = gridSize * BOARD.cellSize + (gridSize - 1) * BOARD.cellGap;
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{ width: boardWidth }}>
        {Array.from({ length: gridSize }, (_, row) => (
          <View key={row} style={styles.row}>
            {Array.from({ length: gridSize }, (_, col) => {
              const idx = row * gridSize + col;
              return (
                <Cell
                  key={idx}
                  cell={cells[idx]}
                  onPress={() => onPress(idx)}
                  onLongPress={() => onLongPress(idx)}
                />
              );
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: BOARD.cellGap, marginBottom: BOARD.cellGap },
});
