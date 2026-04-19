import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADII, TYPOGRAPHY } from '../styles/theme';

interface ChipProps { label: string; value: number; }

function Chip({ label, value }: ChipProps) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipLabel}>{label}</Text>
      <Text style={styles.chipValue}>{value}</Text>
    </View>
  );
}

interface Props { bombCount: number; flags: number; remaining: number; }

export default function StatsBar({ bombCount, flags, remaining }: Props) {
  return (
    <View style={styles.row}>
      <Chip label="Bombs" value={bombCount} />
      <Chip label="Flags" value={flags} />
      <Chip label="Left" value={remaining} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: SPACING.md, marginBottom: SPACING.md },
  chip: { flex: 1, backgroundColor: COLORS.surfaceAlt, borderRadius: RADII.lg, paddingVertical: SPACING.sm, alignItems: 'center', borderWidth: 0.5, borderColor: COLORS.border },
  chipLabel: { fontSize: TYPOGRAPHY.smallSize, color: COLORS.textSecondary, marginBottom: 2 },
  chipValue: { fontSize: TYPOGRAPHY.statNumSize, fontWeight: TYPOGRAPHY.statNumWeight, color: COLORS.textPrimary },
});
