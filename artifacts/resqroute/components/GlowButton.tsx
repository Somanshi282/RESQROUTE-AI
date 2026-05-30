import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import colors from '../constants/colors';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'danger' | 'success' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  disabled?: boolean;
}

const variantStyles = {
  primary: { bg: colors.primaryDim, border: colors.primaryBorder, text: colors.primary },
  danger: { bg: colors.dangerDim, border: colors.dangerBorder, text: colors.danger },
  success: { bg: colors.successDim, border: colors.successBorder, text: colors.success },
  outline: { bg: 'transparent', border: colors.border, text: colors.textDim },
  ghost: { bg: 'transparent', border: 'transparent', text: colors.textMuted },
};

const sizeStyles = {
  sm: { paddingHorizontal: 12, paddingVertical: 6, fontSize: 11, borderRadius: 6 },
  md: { paddingHorizontal: 18, paddingVertical: 10, fontSize: 12, borderRadius: 8 },
  lg: { paddingHorizontal: 28, paddingVertical: 15, fontSize: 14, borderRadius: 10 },
};

export default function GlowButton({ label, onPress, variant = 'primary', size = 'md', style, disabled }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const v = variantStyles[variant];
  const s = sizeStyles[size];

  const onPressIn = () => Animated.spring(scale, { toValue: 0.94, useNativeDriver: true, tension: 200 }).start();
  const onPressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 200 }).start();

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut} disabled={disabled}>
      <Animated.View style={[
        styles.btn,
        {
          backgroundColor: v.bg,
          borderColor: v.border,
          paddingHorizontal: s.paddingHorizontal,
          paddingVertical: s.paddingVertical,
          borderRadius: s.borderRadius,
          transform: [{ scale }],
          opacity: disabled ? 0.4 : 1,
        },
        style,
      ]}>
        <Text style={[styles.label, { color: v.text, fontSize: s.fontSize }]}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
});
