const colors = {
  background: '#040C14',
  surface: '#071220',
  card: '#0A1A2E',
  cardDeep: '#061018',

  primary: '#00E5FF',
  primaryDim: 'rgba(0, 229, 255, 0.12)',
  primaryBorder: 'rgba(0, 229, 255, 0.35)',
  primaryGlow: 'rgba(0, 229, 255, 0.08)',

  danger: '#FF1744',
  dangerDim: 'rgba(255, 23, 68, 0.12)',
  dangerBorder: 'rgba(255, 23, 68, 0.35)',

  success: '#00E676',
  successDim: 'rgba(0, 230, 118, 0.12)',
  successBorder: 'rgba(0, 230, 118, 0.35)',

  warning: '#FFD600',

  text: '#E0F7FA',
  textMuted: '#4A7FA0',
  textDim: '#8BB8CC',

  border: 'rgba(0, 229, 255, 0.18)',
  borderBright: 'rgba(0, 229, 255, 0.45)',
  divider: 'rgba(0, 229, 255, 0.08)',

  overlay: 'rgba(4, 12, 20, 0.92)',
  glass: 'rgba(10, 26, 46, 0.85)',

  // Legacy compat
  tint: '#00E5FF',
  foreground: '#E0F7FA',
  cardForeground: '#E0F7FA',
  mutedForeground: '#4A7FA0',
  destructive: '#FF1744',
  destructiveForeground: '#E0F7FA',
  muted: '#0A1A2E',
  accent: '#00E5FF',
  accentForeground: '#040C14',
  secondary: '#0A1A2E',
  secondaryForeground: '#E0F7FA',
  primaryForeground: '#040C14',
  input: 'rgba(0, 229, 255, 0.15)',
};

export default { light: colors, dark: colors, radius: 12, ...colors };
