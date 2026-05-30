import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Modal, Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlowButton from '../components/GlowButton';
import colors from '../constants/colors';

function GPSIcon() {
  const spin = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(Animated.timing(spin, { toValue: 1, duration: 3000, useNativeDriver: true, easing: Easing.linear })).start();
    const pLoop = () => {
      pulse.setValue(0);
      Animated.timing(pulse, { toValue: 1, duration: 1600, useNativeDriver: true, easing: Easing.out(Easing.ease) }).start(() => pLoop());
    };
    pLoop();
  }, []);
  return (
    <View style={styles.gpsWrap}>
      <Animated.View style={[styles.gpsRing, {
        transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 2.2] }) }],
        opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.7, 0] }),
      }]} />
      <Animated.View style={[styles.gpsRing2, { transform: [{ rotate: spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }] }]} />
      <View style={styles.gpsCore}>
        <Feather name="crosshair" size={28} color={colors.primary} />
      </View>
    </View>
  );
}

export default function LocationScreen() {
  const insets = useSafeAreaInsets();
  const popAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(popAnim, { toValue: 1, useNativeDriver: true, tension: 120, friction: 8 }).start();
  }, []);

  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <View style={[styles.root, { paddingTop: topPad, paddingBottom: Platform.OS === 'web' ? 34 : insets.bottom }]}>
      <View style={styles.backdrop} />
      <Animated.View style={[styles.card, {
        transform: [{ scale: popAnim }, { translateY: popAnim.interpolate({ inputRange: [0, 1], outputRange: [60, 0] }) }],
        opacity: popAnim,
      }]}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>LOCATION ACCESS</Text>
          <View style={styles.titleLine} />
        </View>

        <GPSIcon />

        <Text style={styles.desc}>
          ResQRoute AI needs your location to find nearby emergency services and provide real-time navigation.
        </Text>

        <View style={styles.featureList}>
          {['Real-time GPS tracking', 'Nearest emergency services', 'Live route calculation'].map(f => (
            <View key={f} style={styles.featureRow}>
              <Feather name="check-circle" size={13} color={colors.success} />
              <Text style={styles.featureText}>{f}</Text>
            </View>
          ))}
        </View>

        <GlowButton label="ALLOW ACCESS" onPress={() => router.replace('/role-select')} size="lg" style={{ width: '100%' }} />
        <GlowButton label="EXIT" onPress={() => router.back()} variant="outline" size="sm" style={{ width: '100%' }} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(4,12,20,0.85)' },
  card: {
    width: '100%', maxWidth: 360,
    backgroundColor: colors.glass,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    padding: 24,
    gap: 16,
    alignItems: 'center',
  },
  cardHeader: { alignItems: 'center', gap: 6, width: '100%' },
  cardTitle: { fontSize: 18, fontWeight: '700', color: colors.text, letterSpacing: 3 },
  titleLine: { width: 40, height: 2, backgroundColor: colors.primary, borderRadius: 1 },
  gpsWrap: { width: 80, height: 80, alignItems: 'center', justifyContent: 'center', marginVertical: 8 },
  gpsRing: { position: 'absolute', width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: colors.primary },
  gpsRing2: { position: 'absolute', width: 70, height: 70, borderRadius: 35, borderWidth: 1, borderColor: colors.primaryBorder, borderStyle: 'dashed' as const },
  gpsCore: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.primaryGlow, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.primaryBorder },
  desc: { fontSize: 13, color: colors.textDim, textAlign: 'center', lineHeight: 20 },
  featureList: { gap: 8, width: '100%' },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  featureText: { fontSize: 12, color: colors.textDim },
});
