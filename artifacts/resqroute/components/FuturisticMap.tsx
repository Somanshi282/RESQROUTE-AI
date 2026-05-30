import { Feather } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, Platform, StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';

const { width: SW } = Dimensions.get('window');

interface Props {
  eta: string;
  distance: string;
  targetName: string;
  expanded?: boolean;
}

const GRID_COLS = 10;
const GRID_ROWS = 14;

function GridLine({ horizontal, index, total }: { horizontal: boolean; index: number; total: number }) {
  const opacity = 0.06 + (index % 3 === 0 ? 0.04 : 0);
  if (horizontal) {
    return (
      <View style={{
        position: 'absolute',
        top: `${(index / total) * 100}%`,
        left: 0, right: 0,
        height: 1,
        backgroundColor: colors.primary,
        opacity,
      }} />
    );
  }
  return (
    <View style={{
      position: 'absolute',
      left: `${(index / total) * 100}%`,
      top: 0, bottom: 0,
      width: 1,
      backgroundColor: colors.primary,
      opacity,
    }} />
  );
}

function PulseMarker({ color, label }: { color: string; label: string }) {
  const pulse = useRef(new Animated.Value(0)).current;
  const pulse2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      pulse.setValue(0);
      pulse2.setValue(0);
      Animated.parallel([
        Animated.timing(pulse, { toValue: 1, duration: 1800, useNativeDriver: true, easing: Easing.out(Easing.ease) }),
        Animated.timing(pulse2, { toValue: 1, duration: 1800, delay: 400, useNativeDriver: true, easing: Easing.out(Easing.ease) }),
      ]).start(() => animate());
    };
    animate();
  }, []);

  const ring = (anim: Animated.Value) => ({
    transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [1, 2.8] }) }],
    opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 0] }),
  });

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
        <Animated.View style={[styles.pulse, { borderColor: color }, ring(pulse)]} />
        <Animated.View style={[styles.pulse, { borderColor: color }, ring(pulse2)]} />
        <View style={[styles.markerCore, { backgroundColor: color }]}>
          <View style={[styles.markerInner, { backgroundColor: colors.background }]} />
        </View>
      </View>
      <Text style={[styles.markerLabel, { color }]}>{label}</Text>
    </View>
  );
}

function RouteLines({ progress }: { progress: Animated.Value }) {
  const segments = [
    { x1: 28, y1: 82, x2: 38, y2: 65 },
    { x1: 38, y1: 65, x2: 52, y2: 58 },
    { x1: 52, y1: 58, x2: 65, y2: 42 },
    { x1: 65, y1: 42, x2: 72, y2: 22 },
  ];

  return (
    <View style={StyleSheet.absoluteFill}>
      {segments.map((seg, i) => {
        const dx = seg.x2 - seg.x1;
        const dy = seg.y2 - seg.y1;
        const len = Math.sqrt(dx * dx + dy * dy);
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        return (
          <Animated.View
            key={i}
            style={{
              position: 'absolute',
              left: `${seg.x1}%`,
              top: `${seg.y1}%`,
              width: `${len}%`,
              height: 3,
              backgroundColor: colors.primary,
              transformOrigin: '0% 50%',
              transform: [{ rotate: `${angle}deg` }],
              opacity: progress.interpolate({ inputRange: [0, i / segments.length, Math.min(1, (i + 1) / segments.length)], outputRange: [0, 0, 1], extrapolate: 'clamp' }),
              shadowColor: colors.primary,
              shadowOpacity: 0.9,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 0 },
              elevation: 4,
            }}
          />
        );
      })}
    </View>
  );
}

export default function FuturisticMap({ eta, distance, targetName, expanded }: Props) {
  const progress = useRef(new Animated.Value(0)).current;
  const scanLine = useRef(new Animated.Value(0)).current;
  const blink = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    progress.setValue(0);
    Animated.timing(progress, { toValue: 1, duration: 1400, useNativeDriver: false, easing: Easing.out(Easing.cubic) }).start();
  }, [eta, distance]);

  useEffect(() => {
    const scan = () => {
      scanLine.setValue(0);
      Animated.timing(scanLine, { toValue: 1, duration: 3000, useNativeDriver: true, easing: Easing.linear }).start(() => scan());
    };
    scan();
    const blinkAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(blink, { toValue: 0.3, duration: 600, useNativeDriver: true }),
        Animated.timing(blink, { toValue: 1, duration: 600, useNativeDriver: true }),
      ])
    );
    blinkAnim.start();
    return () => blinkAnim.stop();
  }, []);

  const mapH = expanded ? 420 : 280;

  return (
    <View style={[styles.container, { height: mapH }]}>
      {Array.from({ length: GRID_ROWS }).map((_, i) => (
        <GridLine key={`h${i}`} horizontal index={i} total={GRID_ROWS} />
      ))}
      {Array.from({ length: GRID_COLS }).map((_, i) => (
        <GridLine key={`v${i}`} horizontal={false} index={i} total={GRID_COLS} />
      ))}

      <Animated.View style={[styles.scanLine, {
        transform: [{ translateY: scanLine.interpolate({ inputRange: [0, 1], outputRange: [0, mapH] }) }]
      }]} />

      <RouteLines progress={progress} />

      <View style={[styles.markerWrap, { bottom: '14%', left: '23%' }]}>
        <PulseMarker color={colors.primary} label="YOU" />
      </View>
      <View style={[styles.markerWrap, { top: '14%', right: '22%' }]}>
        <PulseMarker color={colors.danger} label="DEST" />
      </View>

      <View style={styles.etaPanel}>
        <View style={styles.telRow}>
          <Feather name="clock" size={12} color={colors.primary} />
          <Text style={styles.telLabel}> ETA </Text>
          <Text style={styles.telValue}>{eta}</Text>
        </View>
        <View style={styles.telDivider} />
        <View style={styles.telRow}>
          <Feather name="navigation" size={12} color={colors.primary} />
          <Text style={styles.telLabel}> DIST </Text>
          <Text style={styles.telValue}>{distance}</Text>
        </View>
      </View>

      <View style={styles.targetPanel}>
        <Animated.View style={[styles.targetDot, { opacity: blink }]} />
        <Text style={styles.targetText} numberOfLines={1}>{targetName.toUpperCase()}</Text>
      </View>

      <View style={styles.cornerTL} /><View style={styles.cornerTR} />
      <View style={styles.cornerBL} /><View style={styles.cornerBR} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.background,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    position: 'relative',
  },
  scanLine: {
    position: 'absolute',
    left: 0, right: 0,
    height: 1,
    backgroundColor: colors.primary,
    opacity: 0.25,
  },
  markerWrap: { position: 'absolute', alignItems: 'center' },
  pulse: { position: 'absolute', width: 20, height: 20, borderRadius: 10, borderWidth: 1.5 },
  markerCore: { width: 14, height: 14, borderRadius: 7, alignItems: 'center', justifyContent: 'center' },
  markerInner: { width: 5, height: 5, borderRadius: 3 },
  markerLabel: { fontSize: 8, fontWeight: '700' as const, marginTop: 2, letterSpacing: 1 },
  etaPanel: {
    position: 'absolute',
    top: 10, left: 10,
    backgroundColor: colors.glass,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  telRow: { flexDirection: 'row', alignItems: 'center' },
  telLabel: { fontSize: 9, color: colors.textMuted, letterSpacing: 1 },
  telValue: { fontSize: 11, color: colors.primary, fontWeight: '700' as const },
  telDivider: { width: 1, height: 14, backgroundColor: colors.border, marginHorizontal: 6 },
  targetPanel: {
    position: 'absolute',
    bottom: 10, right: 10,
    backgroundColor: colors.glass,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.dangerBorder,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    maxWidth: 160,
  },
  targetDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.danger },
  targetText: { fontSize: 9, color: colors.danger, fontWeight: '700' as const, letterSpacing: 0.5, flex: 1 },
  cornerTL: { position: 'absolute', top: 0, left: 0, width: 12, height: 12, borderTopWidth: 2, borderLeftWidth: 2, borderColor: colors.primary },
  cornerTR: { position: 'absolute', top: 0, right: 0, width: 12, height: 12, borderTopWidth: 2, borderRightWidth: 2, borderColor: colors.primary },
  cornerBL: { position: 'absolute', bottom: 0, left: 0, width: 12, height: 12, borderBottomWidth: 2, borderLeftWidth: 2, borderColor: colors.primary },
  cornerBR: { position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderBottomWidth: 2, borderRightWidth: 2, borderColor: colors.primary },
});
