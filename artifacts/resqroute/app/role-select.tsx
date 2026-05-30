import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useRef } from 'react';
import { Animated, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../constants/colors';
import { useApp } from '../context/AppContext';

function RoleCard({ icon, title, subtitle, onPress, accent }: { icon: string; title: string; subtitle: string; onPress: () => void; accent: string }) {
  const scale = useRef(new Animated.Value(1)).current;
  const glow = useRef(new Animated.Value(0)).current;

  const onPressIn = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, tension: 200 }),
      Animated.timing(glow, { toValue: 1, duration: 150, useNativeDriver: false }),
    ]).start();
  };
  const onPressOut = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 200 }),
      Animated.timing(glow, { toValue: 0, duration: 200, useNativeDriver: false }),
    ]).start();
    onPress();
  };

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={[
        styles.roleCard,
        {
          borderColor: glow.interpolate({ inputRange: [0, 1], outputRange: [colors.border, accent] }),
          backgroundColor: glow.interpolate({ inputRange: [0, 1], outputRange: [colors.card, `${accent}18`] }),
          transform: [{ scale }],
        },
      ]}>
        <View style={[styles.iconCircle, { backgroundColor: `${accent}18`, borderColor: `${accent}55` }]}>
          <Feather name={icon as any} size={36} color={accent} />
        </View>
        <Text style={[styles.roleTitle, { color: accent }]}>{title}</Text>
        <Text style={styles.roleSub}>{subtitle}</Text>
        <View style={[styles.roleBtn, { backgroundColor: `${accent}18`, borderColor: `${accent}55` }]}>
          <Text style={[styles.roleBtnText, { color: accent }]}>SELECT →</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

export default function RoleSelectScreen() {
  const insets = useSafeAreaInsets();
  const { setRole, driverLoggedIn } = useApp();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const handleUser = () => {
    setRole('user');
    router.replace('/(user)');
  };

  const handleDriver = () => {
    setRole('driver');
    if (driverLoggedIn) router.replace('/(driver)');
    else router.replace('/driver-auth');
  };

  return (
    <View style={[styles.root, { paddingTop: topPad + 24, paddingBottom: Platform.OS === 'web' ? 34 : insets.bottom + 24 }]}>
      <View style={styles.header}>
        <Text style={styles.heading}>SELECT ROLE</Text>
        <Text style={styles.sub}>Choose your emergency mode</Text>
        <View style={styles.headLine} />
      </View>

      <View style={styles.cardsWrap}>
        <RoleCard icon="user" title="USER" subtitle="Find emergency services near you with real-time navigation" onPress={handleUser} accent={colors.primary} />
        <RoleCard icon="truck" title="AMBULANCE DRIVER" subtitle="Access driver dashboard, manage active routes and history" onPress={handleDriver} accent={colors.danger} />
      </View>

      <Text style={styles.footer}>RESQROUTE AI — EMERGENCY SYSTEM v2.4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 20 },
  header: { alignItems: 'center', gap: 6, marginBottom: 32 },
  heading: { fontSize: 26, fontWeight: '700', color: colors.text, letterSpacing: 4 },
  sub: { fontSize: 12, color: colors.textMuted, letterSpacing: 1.5, textTransform: 'uppercase' },
  headLine: { width: 50, height: 2, backgroundColor: colors.primary, borderRadius: 1, marginTop: 4 },
  cardsWrap: { flex: 1, gap: 16, justifyContent: 'center' },
  roleCard: {
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', borderWidth: 2 },
  roleTitle: { fontSize: 22, fontWeight: '700', letterSpacing: 3 },
  roleSub: { fontSize: 12, color: colors.textMuted, textAlign: 'center', lineHeight: 18 },
  roleBtn: { borderRadius: 8, paddingHorizontal: 20, paddingVertical: 8, borderWidth: 1 },
  roleBtnText: { fontSize: 12, fontWeight: '700', letterSpacing: 1.5 },
  footer: { textAlign: 'center', fontSize: 9, color: colors.textMuted, letterSpacing: 1.2, marginTop: 16 },
});
