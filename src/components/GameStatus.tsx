import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GameState } from '../types';
import { COLORS, SPACING, RADII, TYPOGRAPHY } from '../styles/theme';

interface Props { gameState: GameState; }

export default function GameStatus({ gameState }: Props) {
  const config: Record<GameState, { text: string; bg: string; color: string }> = {
    playing: { text: 'Tap to reveal · hold to flag', bg: COLORS.surfaceAlt, color: COLORS.textSecondary },
    won:     { text: '🎉 Board cleared! Well done.', bg: COLORS.win, color: COLORS.winText },
    lost:    { text: '💥 Mine hit! Start a new game.', bg: COLORS.lose, color: COLORS.loseText },
  };
  const { text, bg, color } = config[gameState];
  return (
    <View style={[styles.bar, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { borderRadius: RADII.md, paddingVertical: SPACING.sm, paddingHorizontal: SPACING.md, marginBottom: SPACING.lg },
  text: { fontSize: TYPOGRAPHY.labelSize, fontWeight: '500' },
});
