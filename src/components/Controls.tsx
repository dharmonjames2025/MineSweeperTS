import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADII, TYPOGRAPHY } from '../styles/theme';

interface StepperProps {
  label: string;
  value: number;
  min: number;
  max: number;
  display?: string;
  onChange: (val: number) => void;
}

function Stepper({ label, value, min, max, display, onChange }: StepperProps) {
  return (
    <View style={styles.stepperRow}>
      <Text style={styles.stepperLabel}>{label}</Text>
      <TouchableOpacity style={styles.stepBtn} onPress={() => value > min && onChange(value - 1)} activeOpacity={0.7}>
        <Text style={styles.stepBtnTxt}>−</Text>
      </TouchableOpacity>
      <Text style={styles.stepValue}>{display ?? value}</Text>
      <TouchableOpacity style={styles.stepBtn} onPress={() => value < max && onChange(value + 1)} activeOpacity={0.7}>
        <Text style={styles.stepBtnTxt}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

interface Props {
  gridSize: number;
  bombCount: number;
  onGridChange: (val: number) => void;
  onBombChange: (val: number) => void;
  onNewGame: () => void;
}

export default function Controls({ gridSize, bombCount, onGridChange, onBombChange, onNewGame }: Props) {
  const maxBombs = Math.min(40, gridSize * gridSize - 1);
  return (
    <View>
      <View style={styles.card}>
        <Stepper label="Grid" value={gridSize} min={5} max={16} display={`${gridSize}×${gridSize}`} onChange={onGridChange} />
        <View style={styles.divider} />
        <Stepper label="Bombs" value={bombCount} min={3} max={maxBombs} onChange={onBombChange} />
      </View>
      <TouchableOpacity style={styles.newGameBtn} onPress={onNewGame} activeOpacity={0.8}>
        <Text style={styles.newGameTxt}>↺  New Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.surfaceAlt, borderRadius: RADII.xl, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, marginBottom: SPACING.md, borderWidth: 0.5, borderColor: COLORS.border },
  divider: { height: 0.5, backgroundColor: COLORS.border, marginVertical: 2 },
  stepperRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, paddingVertical: SPACING.sm },
  stepperLabel: { fontSize: TYPOGRAPHY.labelSize, color: COLORS.textSecondary, width: 44 },
  stepBtn: { width: 30, height: 30, borderRadius: RADII.md, backgroundColor: COLORS.surface, borderWidth: 0.5, borderColor: COLORS.borderMed, alignItems: 'center', justifyContent: 'center' },
  stepBtnTxt: { fontSize: 16, color: COLORS.textPrimary, lineHeight: 20 },
  stepValue: { fontSize: TYPOGRAPHY.bodySize, fontWeight: '500', color: COLORS.textPrimary, minWidth: 36, textAlign: 'center' },
  newGameBtn: { backgroundColor: COLORS.accent, borderRadius: RADII.lg, paddingVertical: SPACING.md, alignItems: 'center', marginBottom: SPACING.lg },
  newGameTxt: { color: COLORS.accentFg, fontSize: TYPOGRAPHY.bodySize, fontWeight: '600', letterSpacing: 0.2 },
});
