import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlowButton from '../components/GlowButton';
import colors from '../constants/colors';

const { width: SW, height: SH } = Dimensions.get('window');

function HexGrid() {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(Animated.timing(anim, { toValue: 1, duration: 8000, useNativeDriver: true, easing: Easing.linear })).start();
  }, []);
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {Array.from({ length: 12 }).map((_, i) => (
        <View key={i} style={{
          position: 'absolute',
          left: `${(i % 4) * 27}%`,
          top: `${Math.floor(i / 4) * 35}%`,
          width: 60, height: 60,
          borderRadius: 30,
          borderWidth: 1,
          borderColor: `rgba(0,229,255,${0.04 + (i % 3) * 0.02})`,
        }} />
      ))}
    </View>
  );
}

function ScanRing({ delay }: { delay: number }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = () => {
      anim.setValue(0);
      Animated.timing(anim, { toValue: 1, duration: 3000, delay, useNativeDriver: true, easing: Easing.out(Easing.ease) }).start(() => loop());
    };
    loop();
  }, []);
  return (
    <Animated.View style={{
      position: 'absolute',
      width: 200, height: 200,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: colors.primary,
      transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 2] }) }],
      opacity: anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.8, 0.3, 0] }),
    }} />
  );
}

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const logoAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const taglineAnim = useRef(new Animated.Value(0)).current;
  const btnAnim = useRef(new Animated.Value(0)).current;
  const glowPulse = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.stagger(220, [
      Animated.timing(logoAnim, { toValue: 1, duration: 900, useNativeDriver: true, easing: Easing.out(Easing.back(1.2)) }),
      Animated.timing(titleAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(taglineAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(btnAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();
    Animated.loop(Animated.sequence([
      Animated.timing(glowPulse, { toValue: 1, duration: 1200, useNativeDriver: true }),
      Animated.timing(glowPulse, { toValue: 0.6, duration: 1200, useNativeDriver: true }),
    ])).start();
  }, []);

  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <View style={[styles.root, { paddingTop: topPad, paddingBottom: Platform.OS === 'web' ? 34 : insets.bottom }]}>
      <HexGrid />
      {[0, 300, 800, 1500].map((d, i) => (
        <View key={i} style={styles.ringWrap}>
          <ScanRing delay={d} />
        </View>
      ))}

      <View style={styles.content}>
        <Animated.View style={[styles.logoWrap, {
          opacity: logoAnim,
          transform: [{ scale: logoAnim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] }) }],
        }]}>
          <Animated.View style={[styles.logoOuter, { opacity: glowPulse }]}>
            <View style={styles.logoInner}>
              <Feather name="map-pin" size={28} color={colors.primary} />
              <View style={styles.heartLine}>
                {[0.3, 0.8, 0.4, 1.0, 0.5, 0.8, 0.3].map((h, i) => (
                  <View key={i} style={[styles.hBar, { height: h * 18 }]} />
                ))}
              </View>
            </View>
          </Animated.View>
        </Animated.View>

        <Animated.Text style={[styles.appName, { opacity: titleAnim, transform: [{ translateY: titleAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }]}>
          ResQRoute AI
        </Animated.Text>
        <Animated.Text style={[styles.tagline, { opacity: taglineAnim, transform: [{ translateY: taglineAnim.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }] }]}>
          Smart Emergency Navigation System
        </Animated.Text>

        <View style={styles.divider} />

        <View style={styles.stats}>
          {[['99.9%', 'UPTIME'], ['<3s', 'RESPONSE'], ['24/7', 'ACTIVE']].map(([v, l]) => (
            <View key={l} style={styles.statItem}>
              <Text style={styles.statVal}>{v}</Text>
              <Text style={styles.statLabel}>{l}</Text>
            </View>
          ))}
        </View>

        <Animated.View style={{ opacity: btnAnim, transform: [{ translateY: btnAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }], width: '100%', alignItems: 'center' }}>
          <GlowButton label="GET STARTED" onPress={() => router.push('/location')} size="lg" style={{ width: '80%' }} />
        </Animated.View>

        <Text style={styles.version}>v2.4.1 — SYSTEM READY</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  ringWrap: { position: 'absolute', top: '30%', left: '50%', marginLeft: -100, marginTop: -100, zIndex: 0 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, gap: 16, zIndex: 1 },
  logoWrap: { alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  logoOuter: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: colors.primaryBorder, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primaryGlow },
  logoInner: { alignItems: 'center', gap: 4 },
  heartLine: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  hBar: { width: 3, backgroundColor: colors.danger, borderRadius: 2 },
  appName: { fontSize: 32, fontWeight: '700', color: colors.text, letterSpacing: 2, textAlign: 'center', textShadowColor: colors.primary, textShadowRadius: 12, textShadowOffset: { width: 0, height: 0 } },
  tagline: { fontSize: 13, color: colors.textMuted, letterSpacing: 1.5, textAlign: 'center', textTransform: 'uppercase' },
  divider: { width: 60, height: 1, backgroundColor: colors.primaryBorder, marginVertical: 4 },
  stats: { flexDirection: 'row', gap: 24 },
  statItem: { alignItems: 'center', gap: 2 },
  statVal: { fontSize: 18, fontWeight: '700', color: colors.primary },
  statLabel: { fontSize: 9, color: colors.textMuted, letterSpacing: 1 },
  version: { fontSize: 10, color: colors.textMuted, letterSpacing: 1.5, marginTop: 8 },
});
