import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useRef } from 'react';
import { Animated, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../constants/colors';
import { useApp } from '../context/AppContext';

export default function CyberNavbar() {
  const { role, setRole, driverLoggedIn } = useApp();
  const insets = useSafeAreaInsets();
  const switchScale = useRef(new Animated.Value(1)).current;

  const handleSwitch = () => {
    Animated.sequence([
      Animated.timing(switchScale, { toValue: 0.9, duration: 80, useNativeDriver: true }),
      Animated.spring(switchScale, { toValue: 1, useNativeDriver: true, tension: 200 }),
    ]).start();

    if (role === 'user') {
      setRole('driver');
      if (driverLoggedIn) {
        router.replace('/(driver)');
      } else {
        router.replace('/driver-auth');
      }
    } else {
      setRole('user');
      router.replace('/(user)');
    }
  };

  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <View style={[styles.container, { paddingTop: topPad + 8 }]}>
      <View style={styles.inner}>
        <View style={styles.logoWrap}>
          <View style={styles.logoDot} />
          <View>
            <Text style={styles.logoName}>ResQRoute</Text>
            <Text style={styles.logoSub}>AI</Text>
          </View>
        </View>

        <View style={styles.roleChip}>
          <View style={styles.roleDot} />
          <Text style={styles.roleText}>{role === 'user' ? 'USER MODE' : 'DRIVER MODE'}</Text>
        </View>

        <Pressable onPress={handleSwitch}>
          <Animated.View style={[styles.switchBtn, { transform: [{ scale: switchScale }] }]}>
            <Feather name="refresh-cw" size={11} color={colors.primary} />
            <Text style={styles.switchText}>SWITCH</Text>
          </Animated.View>
        </Pressable>
      </View>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.glass,
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryBorder,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
    gap: 10,
  },
  logoWrap: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  logoDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, shadowColor: colors.primary, shadowOpacity: 0.9, shadowRadius: 6, shadowOffset: { width: 0, height: 0 } },
  logoName: { fontSize: 14, fontWeight: '700', color: colors.text, letterSpacing: 0.5 },
  logoSub: { fontSize: 8, color: colors.primary, fontWeight: '700', letterSpacing: 2, lineHeight: 10 },
  roleChip: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: colors.primaryDim, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: colors.primaryBorder },
  roleDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.success },
  roleText: { fontSize: 9, color: colors.primary, fontWeight: '700', letterSpacing: 0.8 },
  switchBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.surface, borderRadius: 6, paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: colors.border },
  switchText: { fontSize: 9, color: colors.primary, fontWeight: '700', letterSpacing: 0.8 },
  line: { height: 0 },
});
