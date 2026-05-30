import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CyberNavbar from '../../components/CyberNavbar';
import colors from '../../constants/colors';
import { useApp } from '../../context/AppContext';

const DEMO_HISTORY = [
  { id: 'd1', hospitalName: 'Apex Cybernetic Hospital', distance: '4.1 km', completedAt: '09:14 AM', duration: '10 mins' },
  { id: 'd2', hospitalName: 'City Care Medical Center', distance: '5.7 km', completedAt: '11:32 AM', duration: '14 mins' },
  { id: 'd3', hospitalName: 'Neon Genesis Medical Center', distance: '2.3 km', completedAt: '02:08 PM', duration: '5 mins' },
];

export default function DriverHistoryScreen() {
  const insets = useSafeAreaInsets();
  const { history, completedPatients } = useApp();
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom;
  const allHistory = [...history, ...DEMO_HISTORY];

  return (
    <View style={styles.root}>
      <CyberNavbar />
      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: bottomPad + 16 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>MISSION HISTORY</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countTxt}>{allHistory.length} TOTAL</Text>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={[styles.summaryVal, { color: colors.success }]}>{allHistory.length}</Text>
            <Text style={styles.summaryLbl}>COMPLETED</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={[styles.summaryVal, { color: colors.primary }]}>
              {allHistory.reduce((acc, h) => acc + parseFloat(h.distance), 0).toFixed(1)} km
            </Text>
            <Text style={styles.summaryLbl}>TOTAL DIST</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={[styles.summaryVal, { color: colors.warning }]}>4.9</Text>
            <Text style={styles.summaryLbl}>RATING</Text>
          </View>
        </View>

        {allHistory.map((entry, idx) => (
          <View key={entry.id} style={styles.historyCard}>
            <View style={styles.cardLeft}>
              <View style={styles.cardNum}>
                <Text style={styles.cardNumTxt}>{String(allHistory.length - idx).padStart(2, '0')}</Text>
              </View>
              <View style={styles.cardLine} />
            </View>
            <View style={styles.cardBody}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardHospital} numberOfLines={1}>{entry.hospitalName}</Text>
                <View style={styles.successBadge}>
                  <Feather name="check" size={9} color={colors.success} />
                  <Text style={styles.successTxt}>DONE</Text>
                </View>
              </View>
              <View style={styles.cardMeta}>
                <View style={styles.metaItem}>
                  <Feather name="navigation" size={10} color={colors.textMuted} />
                  <Text style={styles.metaTxt}>{entry.distance}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Feather name="clock" size={10} color={colors.textMuted} />
                  <Text style={styles.metaTxt}>{entry.duration}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Feather name="check-circle" size={10} color={colors.textMuted} />
                  <Text style={styles.metaTxt}>{entry.completedAt}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}

        {allHistory.length === 0 && (
          <View style={styles.empty}>
            <Feather name="list" size={32} color={colors.textMuted} />
            <Text style={styles.emptyTxt}>No missions completed yet</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: 16, paddingTop: 16 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  title: { fontSize: 18, fontWeight: '700', color: colors.text, letterSpacing: 2, flex: 1 },
  countBadge: { backgroundColor: colors.primaryDim, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3, borderWidth: 1, borderColor: colors.primaryBorder },
  countTxt: { fontSize: 9, color: colors.primary, fontWeight: '700', letterSpacing: 0.8 },
  summaryRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  summaryCard: { flex: 1, backgroundColor: colors.card, borderRadius: 10, borderWidth: 1, borderColor: colors.border, padding: 12, alignItems: 'center', gap: 4 },
  summaryVal: { fontSize: 20, fontWeight: '700' },
  summaryLbl: { fontSize: 8, color: colors.textMuted, letterSpacing: 1.2 },
  historyCard: { flexDirection: 'row', marginBottom: 10 },
  cardLeft: { alignItems: 'center', marginRight: 12, width: 32 },
  cardNum: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.successDim, borderWidth: 1, borderColor: colors.successBorder, alignItems: 'center', justifyContent: 'center' },
  cardNumTxt: { fontSize: 10, color: colors.success, fontWeight: '700' },
  cardLine: { flex: 1, width: 1, backgroundColor: colors.divider, marginTop: 4 },
  cardBody: { flex: 1, backgroundColor: colors.card, borderRadius: 12, borderWidth: 1, borderColor: colors.border, padding: 12, gap: 8 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cardHospital: { fontSize: 13, fontWeight: '600', color: colors.text, flex: 1 },
  successBadge: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: colors.successDim, borderRadius: 20, paddingHorizontal: 7, paddingVertical: 2, borderWidth: 1, borderColor: colors.successBorder },
  successTxt: { fontSize: 8, color: colors.success, fontWeight: '700' },
  cardMeta: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaTxt: { fontSize: 10, color: colors.textMuted },
  empty: { alignItems: 'center', gap: 12, marginTop: 60 },
  emptyTxt: { fontSize: 14, color: colors.textMuted },
});
