import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CyberNavbar from '../../components/CyberNavbar';
import colors from '../../constants/colors';
import { useApp } from '../../context/AppContext';

const SERVICES = [
  { id: 'hospital', label: 'HOSPITAL', icon: 'heart', accent: colors.danger },
  { id: 'police', label: 'POLICE', icon: 'shield', accent: colors.primary },
  { id: 'petrol', label: 'PETROL\nPUMP', icon: 'zap', accent: '#FFD600' },
  { id: 'puncture', label: 'PUNCTURE\nCENTER', icon: 'tool', accent: '#00E676' },
] as const;

function ServiceCard({ service, onPress }: { service: (typeof SERVICES)[number]; onPress: () => void }) {
  const scale = useRef(new Animated.Value(1)).current;
  const glow = useRef(new Animated.Value(0)).current;

  const onIn = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 0.95, useNativeDriver: true, tension: 200 }),
      Animated.timing(glow, { toValue: 1, duration: 150, useNativeDriver: false }),
    ]).start();
  };
  const onOut = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 200 }),
      Animated.timing(glow, { toValue: 0, duration: 200, useNativeDriver: false }),
    ]).start();
    onPress();
  };

  return (
    <Pressable onPressIn={onIn} onPressOut={onOut} style={{ flex: 1, maxWidth: '48%' }}>
      <Animated.View style={[
        styles.serviceCard,
        {
          borderColor: glow.interpolate({ inputRange: [0, 1], outputRange: [colors.border, service.accent] }),
          backgroundColor: glow.interpolate({ inputRange: [0, 1], outputRange: [colors.card, `${service.accent}12`] }),
          transform: [{ scale }],
        },
      ]}>
        <View style={[styles.serviceIconWrap, { backgroundColor: `${service.accent}15`, borderColor: `${service.accent}40` }]}>
          <Feather name={service.icon as any} size={24} color={service.accent} />
        </View>
        <Text style={[styles.serviceLabel, { color: service.accent }]}>{service.label}</Text>
        <View style={[styles.findBtn, { backgroundColor: `${service.accent}18`, borderColor: `${service.accent}50` }]}>
          <Text style={[styles.findBtnText, { color: service.accent }]}>FIND</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

export default function UserHomeScreen() {
  const insets = useSafeAreaInsets();
  const { setSelectedService } = useApp();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  const handleService = (id: 'hospital' | 'police' | 'petrol' | 'puncture') => {
    setSelectedService(id);
    router.push('/(user)/navigation');
  };

  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom;

  return (
    <View style={styles.root}>
      <CyberNavbar />
      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: bottomPad + 16 }]} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.profileCard}>
            <View style={styles.avatarWrap}>
              <View style={styles.avatarInner}>
                <Feather name="user" size={28} color={colors.primary} />
              </View>
              <View style={styles.avatarRing} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.profileName}>CIVILIAN OPERATOR</Text>
              <Text style={styles.profileId}>RESQ-48291</Text>
              <View style={styles.statusRow}>
                <View style={styles.statusDot} />
                <Text style={styles.statusTxt}>SYSTEM ACTIVE</Text>
              </View>
            </View>
            <View style={styles.signalWrap}>
              {[0.4, 0.6, 0.8, 1].map((h, i) => (
                <View key={i} style={[styles.signalBar, { height: 6 + h * 10, opacity: h }]} />
              ))}
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <View style={styles.sectionLine} />
            <Text style={styles.sectionTitle}>EMERGENCY SERVICES</Text>
            <View style={styles.sectionLine} />
          </View>

          <View style={styles.servicesGrid}>
            {SERVICES.map(s => (
              <ServiceCard key={s.id} service={s} onPress={() => handleService(s.id as any)} />
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <View style={styles.sectionLine} />
            <Text style={styles.sectionTitle}>SYSTEM STATUS</Text>
            <View style={styles.sectionLine} />
          </View>

          <View style={styles.statusGrid}>
            {[
              { label: 'GPS SIGNAL', val: '98%', color: colors.success },
              { label: 'NETWORK', val: '5G', color: colors.primary },
              { label: 'SERVICES', val: '14 ACTIVE', color: colors.success },
              { label: 'RESPONSE', val: '<3s', color: colors.primary },
            ].map(s => (
              <View key={s.label} style={styles.statusCard}>
                <Text style={[styles.statusVal, { color: s.color }]}>{s.val}</Text>
                <Text style={styles.statusLbl}>{s.label}</Text>
              </View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: 16, paddingTop: 16, gap: 0 },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    padding: 16,
    marginBottom: 20,
  },
  avatarWrap: { width: 56, height: 56, alignItems: 'center', justifyContent: 'center' },
  avatarInner: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.primaryDim, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.primaryBorder },
  avatarRing: { position: 'absolute', width: 58, height: 58, borderRadius: 29, borderWidth: 1, borderColor: colors.primaryBorder, borderStyle: 'dashed' as const },
  profileName: { fontSize: 14, fontWeight: '700', color: colors.text, letterSpacing: 1 },
  profileId: { fontSize: 11, color: colors.primary, fontWeight: '600', letterSpacing: 1.5, marginTop: 2 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 },
  statusDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.success },
  statusTxt: { fontSize: 9, color: colors.success, letterSpacing: 1 },
  signalWrap: { flexDirection: 'row', alignItems: 'flex-end', gap: 2 },
  signalBar: { width: 4, borderRadius: 2, backgroundColor: colors.primary },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12, marginTop: 4 },
  sectionLine: { flex: 1, height: 1, backgroundColor: colors.divider },
  sectionTitle: { fontSize: 10, color: colors.textMuted, letterSpacing: 2, fontWeight: '700' },
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  serviceCard: {
    borderWidth: 1.5,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    gap: 10,
    minHeight: 130,
    justifyContent: 'space-between',
  },
  serviceIconWrap: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5 },
  serviceLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 1.5, textAlign: 'center', lineHeight: 15 },
  findBtn: { borderRadius: 6, paddingHorizontal: 16, paddingVertical: 5, borderWidth: 1 },
  findBtnText: { fontSize: 10, fontWeight: '700', letterSpacing: 1.5 },
  statusGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  statusCard: { flex: 1, minWidth: '45%', backgroundColor: colors.card, borderRadius: 10, borderWidth: 1, borderColor: colors.border, padding: 12, alignItems: 'center', gap: 4 },
  statusVal: { fontSize: 16, fontWeight: '700' },
  statusLbl: { fontSize: 9, color: colors.textMuted, letterSpacing: 1.2 },
});
