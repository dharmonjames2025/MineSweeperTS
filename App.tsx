import React, { useState, useCallback } from 'react';
import { SafeAreaView, ScrollView, View, Text, StatusBar, StyleSheet } from 'react-native';
import { Cell, GameState } from './src/types';
import { buildBoard, floodReveal, revealAllBombs, checkWin, toggleFlag, getBoardStats } from './src/logic/gameLogic';
import Board from './src/components/Board';
import Controls from './src/components/Controls';
import StatsBar from './src/components/StatsBar';
import GameStatus from './src/components/GameStatus';
import { COLORS, SPACING, TYPOGRAPHY } from './src/styles/theme';

export default function App() {
  const [gridSize, setGridSize] = useState<number>(9);
  const [bombCount, setBombCount] = useState<number>(10);
  const [board, setBoard] = useState<Cell[]>(() => buildBoard(9, 9, 10));
  const [gameState, setGameState] = useState<GameState>('playing');

  const startNewGame = useCallback((size: number = gridSize, bombs: number = bombCount) => {
    const capped = Math.min(bombs, size * size - 1);
    setBoard(buildBoard(size, size, capped));
    setGameState('playing');
  }, [gridSize, bombCount]);

  const handleGridChange = (val: number): void => {
    const capped = Math.min(bombCount, val * val - 1);
    setGridSize(val);
    setBombCount(capped);
    startNewGame(val, capped);
  };

  const handleBombChange = (val: number): void => {
    const capped = Math.min(val, gridSize * gridSize - 1);
    setBombCount(capped);
    startNewGame(gridSize, capped);
  };

  const handlePress = useCallback((idx: number): void => {
    if (gameState !== 'playing') return;
    const cell = board[idx];
    if (cell.revealed || cell.flagged) return;
    if (cell.isBomb) {
      setBoard(revealAllBombs(board));
      setGameState('lost');
      return;
    }
    const next = floodReveal(board, idx, gridSize, gridSize);
    setBoard(next);
    if (checkWin(next)) setGameState('won');
  }, [board, gameState, gridSize]);

  const handleLongPress = useCallback((idx: number): void => {
    if (gameState !== 'playing') return;
    setBoard(prev => toggleFlag(prev, idx));
  }, [gameState]);

  const { flags, remaining } = getBoardStats(board);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Minesweeper</Text>
        </View>
        <Controls gridSize={gridSize} bombCount={bombCount} onGridChange={handleGridChange} onBombChange={handleBombChange} onNewGame={() => startNewGame()} />
        <StatsBar bombCount={bombCount} flags={flags} remaining={remaining} />
        <GameStatus gameState={gameState} />
        <Board cells={board} gridSize={gridSize} onPress={handlePress} onLongPress={handleLongPress} />
        <Text style={styles.hint}>Long-press a cell to place or remove a flag</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { padding: SPACING.xl, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'baseline', gap: SPACING.sm, marginBottom: SPACING.xl },
  title: { fontSize: TYPOGRAPHY.titleSize, fontWeight: TYPOGRAPHY.titleWeight, color: COLORS.textPrimary, letterSpacing: -0.3 },
  subtitle: { fontSize: TYPOGRAPHY.labelSize, color: COLORS.textSecondary },
  hint: { marginTop: SPACING.md, fontSize: TYPOGRAPHY.smallSize, color: COLORS.textMuted, textAlign: 'center' },
});
