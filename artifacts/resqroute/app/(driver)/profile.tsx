import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CyberNavbar from '../../components/CyberNavbar';
import GlowButton from '../../components/GlowButton';
import colors from '../../constants/colors';
import { useApp } from '../../context/AppContext';

export default function DriverProfileScreen() {
  const insets = useSafeAreaInsets();
  const { driverName, ambulanceNumber, setDriverLoggedIn, setRole, completedPatients } = useApp();
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const handleLogout = () => {
    setDriverLoggedIn(false);
    setRole('user');
    router.replace('/');
  };

  return (
    <View style={styles.root}>
      <CyberNavbar />
      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: bottomPad + 16 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Feather name="user" size={34} color={colors.danger} />
            </View>
            <View style={styles.avatarRing} />
            <View style={styles.badgeIcon}>
              <Feather name="truck" size={10} color={colors.background} />
            </View>
          </View>
          <Text style={styles.driverName}>{driverName.toUpperCase()}</Text>
          <Text style={styles.ambNum}>{ambulanceNumber}</Text>
          <Text style={styles.hospital}>Neon Genesis Medical Center</Text>
          <View style={styles.ratingRow}>
            {[1,2,3,4,5].map(i => (
              <Feather key={i} name="star" size={14} color={i <= 5 ? colors.warning : colors.border} />
            ))}
            <Text style={styles.ratingTxt}>4.9</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          {[
            { val: String(completedPatients + 3), label: 'TOTAL PATIENTS', color: colors.success },
            { val: '98%', label: 'SUCCESS RATE', color: colors.primary },
            { val: '3 YRS', label: 'EXPERIENCE', color: colors.warning },
          ].map(s => (
            <View key={s.label} style={styles.statCard}>
              <Text style={[styles.statVal, { color: s.color }]}>{s.val}</Text>
              <Text style={styles.statLbl}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>DRIVER DETAILS</Text>
          {[
            { icon: 'user', label: 'Name', val: driverName },
            { icon: 'truck', label: 'Ambulance', val: ambulanceNumber },
            { icon: 'heart', label: 'Hospital', val: 'Neon Genesis Medical Center' },
            { icon: 'phone', label: 'Contact', val: '+1 (555) 240-9999' },
            { icon: 'award', label: 'License', val: 'EMT-CERT-2021-4821' },
          ].map(item => (
            <View key={item.label} style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Feather name={item.icon as any} size={13} color={colors.danger} />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>{item.label}</Text>
                <Text style={styles.infoVal}>{item.val}</Text>
              </View>
            </View>
          ))}
        </View>

        <GlowButton label="LOGOUT" onPress={handleLogout} variant="danger" style={{ marginTop: 8 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: 16, paddingTop: 16 },
  profileCard: { backgroundColor: colors.card, borderRadius: 16, borderWidth: 1, borderColor: colors.dangerBorder, padding: 24, alignItems: 'center', gap: 6, marginBottom: 14 },
  avatarWrap: { width: 86, height: 86, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  avatar: { width: 78, height: 78, borderRadius: 39, backgroundColor: colors.dangerDim, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.dangerBorder },
  avatarRing: { position: 'absolute', width: 88, height: 88, borderRadius: 44, borderWidth: 1, borderColor: colors.dangerBorder, borderStyle: 'dashed' as const },
  badgeIcon: { position: 'absolute', bottom: 4, right: 4, width: 20, height: 20, borderRadius: 10, backgroundColor: colors.danger, alignItems: 'center', justifyContent: 'center' },
  driverName: { fontSize: 20, fontWeight: '700', color: colors.text, letterSpacing: 1.5 },
  ambNum: { fontSize: 12, color: colors.danger, fontWeight: '600', letterSpacing: 2 },
  hospital: { fontSize: 11, color: colors.textMuted, textAlign: 'center' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 4 },
  ratingTxt: { fontSize: 13, color: colors.warning, fontWeight: '700', marginLeft: 4 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  statCard: { flex: 1, backgroundColor: colors.card, borderRadius: 10, borderWidth: 1, borderColor: colors.border, padding: 12, alignItems: 'center', gap: 4 },
  statVal: { fontSize: 18, fontWeight: '700' },
  statLbl: { fontSize: 8, color: colors.textMuted, letterSpacing: 1.2, textAlign: 'center' },
  infoCard: { backgroundColor: colors.card, borderRadius: 12, borderWidth: 1, borderColor: colors.border, overflow: 'hidden', marginBottom: 8 },
  infoTitle: { fontSize: 9, color: colors.textMuted, letterSpacing: 2, fontWeight: '700', paddingHorizontal: 14, paddingTop: 12, paddingBottom: 4 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, paddingVertical: 11, borderTopWidth: 1, borderTopColor: colors.divider },
  infoIcon: { width: 30, height: 30, borderRadius: 15, backgroundColor: colors.dangerDim, alignItems: 'center', justifyContent: 'center' },
  infoText: { flex: 1 },
  infoLabel: { fontSize: 9, color: colors.textMuted, letterSpacing: 1 },
  infoVal: { fontSize: 13, color: colors.text, marginTop: 1 },
});
