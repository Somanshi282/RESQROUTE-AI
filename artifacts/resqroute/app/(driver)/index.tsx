import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CyberNavbar from '../../components/CyberNavbar';
import FuturisticMap from '../../components/FuturisticMap';
import colors from '../../constants/colors';
import { useApp } from '../../context/AppContext';

const ACTIVE_EMERGENCY = {
  patient: 'Patient #A-2947',
  pickup: 'Grid Station Alpha, Zone B',
  hospital: 'Neon Genesis Medical Center',
  eta: '8 mins',
  distance: '3.2 km',
  priority: 'CRITICAL',
};

export default function DriverHomeScreen() {
  const insets = useSafeAreaInsets();
  const { driverName, ambulanceNumber, isAvailable, setIsAvailable, completedPatients } = useApp();
  const pulse = useRef(new Animated.Value(1)).current;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom;

  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 1.04, duration: 900, useNativeDriver: true }),
      Animated.timing(pulse, { toValue: 1, duration: 900, useNativeDriver: true }),
    ])).start();
  }, []);

  return (
    <View style={styles.root}>
      <CyberNavbar />
      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: bottomPad + 16 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Feather name="user" size={26} color={colors.danger} />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.driverName}>{driverName.toUpperCase()}</Text>
            <Text style={styles.ambNum}>{ambulanceNumber}</Text>
            <Text style={styles.hospitalName}>Neon Genesis Medical Center</Text>
          </View>
          <View style={styles.availToggle}>
            <Text style={[styles.availLabel, { color: isAvailable ? colors.success : colors.textMuted }]}>
              {isAvailable ? 'ON DUTY' : 'OFF DUTY'}
            </Text>
            <Switch
              value={isAvailable}
              onValueChange={setIsAvailable}
              trackColor={{ false: colors.surface, true: colors.successDim }}
              thumbColor={isAvailable ? colors.success : colors.textMuted}
            />
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={[styles.statVal, { color: colors.primary }]}>{completedPatients}</Text>
            <Text style={styles.statLbl}>COMPLETED</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statVal, { color: colors.success }]}>1</Text>
            <Text style={styles.statLbl}>ACTIVE</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statVal, { color: colors.warning }]}>4.9</Text>
            <Text style={styles.statLbl}>RATING</Text>
          </View>
        </View>

        <Animated.View style={[styles.emergencyCard, { transform: [{ scale: pulse }] }]}>
          <View style={styles.emergencyHeader}>
            <View style={styles.critBadge}>
              <View style={styles.critDot} />
              <Text style={styles.critText}>{ACTIVE_EMERGENCY.priority}</Text>
            </View>
            <Text style={styles.emergencyLabel}>ACTIVE EMERGENCY</Text>
          </View>
          <Text style={styles.patientName}>{ACTIVE_EMERGENCY.patient}</Text>
          <View style={styles.emergencyRow}>
            <Feather name="map-pin" size={12} color={colors.danger} />
            <Text style={styles.emergencyDetail}>{ACTIVE_EMERGENCY.pickup}</Text>
          </View>
          <View style={styles.emergencyRow}>
            <Feather name="heart" size={12} color={colors.danger} />
            <Text style={styles.emergencyDetail}>{ACTIVE_EMERGENCY.hospital}</Text>
          </View>
          <View style={styles.emergencyMeta}>
            <View style={styles.metaChip}>
              <Feather name="clock" size={10} color={colors.danger} />
              <Text style={styles.metaTxt}>{ACTIVE_EMERGENCY.eta}</Text>
            </View>
            <View style={styles.metaChip}>
              <Feather name="navigation" size={10} color={colors.danger} />
              <Text style={styles.metaTxt}>{ACTIVE_EMERGENCY.distance}</Text>
            </View>
          </View>
        </Animated.View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>LIVE MAP</Text>
          <Pressable onPress={() => router.push('/(driver)/navigation')} style={styles.viewFullBtn}>
            <Text style={styles.viewFullTxt}>OPEN FULL →</Text>
          </Pressable>
        </View>
        <Pressable onPress={() => router.push('/(driver)/navigation')}>
          <FuturisticMap eta={ACTIVE_EMERGENCY.eta} distance={ACTIVE_EMERGENCY.distance} targetName={ACTIVE_EMERGENCY.hospital} />
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: 16, paddingTop: 16, gap: 0 },
  profileCard: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: colors.card, borderRadius: 14, borderWidth: 1, borderColor: colors.dangerBorder, padding: 16, marginBottom: 14 },
  avatarWrap: { width: 52, height: 52, alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.dangerDim, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.dangerBorder },
  driverName: { fontSize: 14, fontWeight: '700', color: colors.text },
  ambNum: { fontSize: 11, color: colors.danger, fontWeight: '600', letterSpacing: 1.5, marginTop: 1 },
  hospitalName: { fontSize: 10, color: colors.textMuted, marginTop: 2 },
  availToggle: { alignItems: 'center', gap: 4 },
  availLabel: { fontSize: 8, fontWeight: '700', letterSpacing: 0.8 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  statCard: { flex: 1, backgroundColor: colors.card, borderRadius: 10, borderWidth: 1, borderColor: colors.border, padding: 12, alignItems: 'center', gap: 4 },
  statVal: { fontSize: 24, fontWeight: '700' },
  statLbl: { fontSize: 8, color: colors.textMuted, letterSpacing: 1.2 },
  emergencyCard: { backgroundColor: colors.dangerDim, borderRadius: 14, borderWidth: 1.5, borderColor: colors.dangerBorder, padding: 16, marginBottom: 14, gap: 8 },
  emergencyHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  critBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: colors.danger, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  critDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.background },
  critText: { fontSize: 9, color: colors.background, fontWeight: '700', letterSpacing: 1 },
  emergencyLabel: { fontSize: 11, color: colors.danger, fontWeight: '700', letterSpacing: 1.5 },
  patientName: { fontSize: 16, fontWeight: '700', color: colors.text },
  emergencyRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  emergencyDetail: { fontSize: 12, color: colors.textDim, flex: 1 },
  emergencyMeta: { flexDirection: 'row', gap: 8, marginTop: 4 },
  metaChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.card, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: colors.dangerBorder },
  metaTxt: { fontSize: 11, color: colors.danger, fontWeight: '600' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, marginTop: 4 },
  sectionTitle: { fontSize: 10, color: colors.textMuted, letterSpacing: 2, fontWeight: '700' },
  viewFullBtn: { backgroundColor: colors.dangerDim, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: colors.dangerBorder },
  viewFullTxt: { fontSize: 9, color: colors.danger, fontWeight: '700' },
});
