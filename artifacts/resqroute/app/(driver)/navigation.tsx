import { Feather } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CyberNavbar from '../../components/CyberNavbar';
import FuturisticMap from '../../components/FuturisticMap';
import GlowButton from '../../components/GlowButton';
import colors from '../../constants/colors';
import { useApp } from '../../context/AppContext';

const HOSPITAL_NAME = 'Neon Genesis Medical Center';
const HOSPITAL_PHONE = '+1 (555) 240-1001';

function CountdownTimer({ initial, onDone }: { initial: number; onDone: () => void }) {
  const [mins, setMins] = useState(initial);
  const [secs, setSecs] = useState(0);
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const id = setInterval(() => {
      setSecs(s => {
        if (s > 0) return s - 1;
        setMins(m => {
          if (m <= 0) { clearInterval(id); onDone(); return 0; }
          return m - 1;
        });
        return 59;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 1.05, duration: 800, useNativeDriver: true }),
      Animated.timing(pulse, { toValue: 1, duration: 800, useNativeDriver: true }),
    ])).start();
  }, []);

  return (
    <Animated.View style={[styles.timerCard, { transform: [{ scale: pulse }] }]}>
      <View style={styles.timerDot} />
      <Text style={styles.timerLabel}>REMAINING TIME</Text>
      <Text style={styles.timerValue}>{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}</Text>
    </Animated.View>
  );
}

export default function DriverNavigationScreen() {
  const insets = useSafeAreaInsets();
  const { addCompletedPatient, completedPatients } = useApp();
  const [done, setDone] = useState(false);
  const successAnim = useRef(new Animated.Value(0)).current;
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const handleStop = () => {
    addCompletedPatient({
      id: Date.now().toString(),
      hospitalName: HOSPITAL_NAME,
      distance: '3.2 km',
      completedAt: new Date().toLocaleTimeString(),
      duration: '8 mins',
    });
    setDone(true);
    Animated.spring(successAnim, { toValue: 1, useNativeDriver: true, tension: 100 }).start();
  };

  return (
    <View style={styles.root}>
      <CyberNavbar />
      <View style={[styles.body, { paddingBottom: bottomPad + 16 }]}>
        <FuturisticMap eta="8 mins" distance="3.2 km" targetName={HOSPITAL_NAME} expanded />

        <View style={styles.infoPanel}>
          <View style={styles.navIndicator}>
            <View style={[styles.navDot, { backgroundColor: done ? colors.success : colors.danger }]} />
            <Text style={[styles.navStatus, { color: done ? colors.success : colors.danger }]}>
              {done ? 'MISSION COMPLETE' : 'NAVIGATION ACTIVE'}
            </Text>
          </View>

          <Text style={styles.hospitalName}>{HOSPITAL_NAME}</Text>
          <View style={styles.infoRow}>
            <Feather name="phone" size={12} color={colors.textMuted} />
            <Text style={styles.infoTxt}>{HOSPITAL_PHONE}</Text>
            <Pressable onPress={() => Linking.openURL(`tel:${HOSPITAL_PHONE}`)} style={styles.callBtn}>
              <Text style={styles.callTxt}>CALL</Text>
            </Pressable>
          </View>

          <View style={styles.telRow}>
            <View style={styles.telCard}>
              <Text style={styles.telVal}>3.2 km</Text>
              <Text style={styles.telLbl}>DISTANCE</Text>
            </View>
            <View style={styles.telCard}>
              <Text style={styles.telVal}>8 mins</Text>
              <Text style={styles.telLbl}>ETA</Text>
            </View>
            <View style={styles.telCard}>
              <Text style={[styles.telVal, { color: colors.success }]}>{completedPatients}</Text>
              <Text style={styles.telLbl}>COMPLETED</Text>
            </View>
          </View>

          {!done && <CountdownTimer initial={8} onDone={handleStop} />}

          {done ? (
            <Animated.View style={[styles.successBanner, {
              transform: [{ scale: successAnim }],
              opacity: successAnim,
            }]}>
              <Feather name="check-circle" size={20} color={colors.success} />
              <Text style={styles.successTxt}>PATIENT DELIVERED — MISSION SUCCESS</Text>
            </Animated.View>
          ) : (
            <GlowButton label="STOP NAVIGATION" onPress={handleStop} variant="danger" style={{ width: '100%' }} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  body: { flex: 1, paddingHorizontal: 14, paddingTop: 12, gap: 12 },
  infoPanel: { backgroundColor: colors.card, borderRadius: 14, borderWidth: 1, borderColor: colors.dangerBorder, padding: 14, gap: 10 },
  navIndicator: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  navDot: { width: 8, height: 8, borderRadius: 4 },
  navStatus: { fontSize: 10, fontWeight: '700', letterSpacing: 1.5 },
  hospitalName: { fontSize: 15, fontWeight: '700', color: colors.text },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  infoTxt: { fontSize: 11, color: colors.textMuted, flex: 1 },
  callBtn: { backgroundColor: colors.danger, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  callTxt: { fontSize: 10, color: colors.background, fontWeight: '700' },
  telRow: { flexDirection: 'row', gap: 8 },
  telCard: { flex: 1, backgroundColor: colors.surface, borderRadius: 8, borderWidth: 1, borderColor: colors.border, padding: 10, alignItems: 'center', gap: 3 },
  telVal: { fontSize: 16, fontWeight: '700', color: colors.danger },
  telLbl: { fontSize: 8, color: colors.textMuted, letterSpacing: 1.2 },
  timerCard: { backgroundColor: colors.dangerDim, borderRadius: 10, borderWidth: 1, borderColor: colors.dangerBorder, padding: 12, alignItems: 'center', gap: 4 },
  timerDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.danger },
  timerLabel: { fontSize: 9, color: colors.danger, letterSpacing: 2, fontWeight: '700' },
  timerValue: { fontSize: 28, fontWeight: '700', color: colors.danger, letterSpacing: 4 },
  successBanner: { backgroundColor: colors.successDim, borderRadius: 10, borderWidth: 1, borderColor: colors.successBorder, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10 },
  successTxt: { fontSize: 11, color: colors.success, fontWeight: '700', letterSpacing: 0.5, flex: 1 },
});
