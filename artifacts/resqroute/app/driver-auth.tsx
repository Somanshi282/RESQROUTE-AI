import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlowButton from '../components/GlowButton';
import colors from '../constants/colors';
import { useApp } from '../context/AppContext';

function CyberInput({ label, value, onChangeText, placeholder, secureTextEntry }: { label: string; value: string; onChangeText: (t: string) => void; placeholder?: string; secureTextEntry?: boolean }) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.inputWrap}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={[styles.inputBox, focused && styles.inputBoxFocused]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={secureTextEntry}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>
    </View>
  );
}

export default function DriverAuthScreen() {
  const insets = useSafeAreaInsets();
  const { setDriverLoggedIn, setDriverName, setAmbulanceNumber } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [ambulance, setAmbulance] = useState('');
  const [phone, setPhone] = useState('');
  const [hospital, setHospital] = useState('');
  const [password, setPassword] = useState('');
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const handleAuth = () => {
    if (mode === 'register') {
      setDriverName(name || 'Alex Rivera');
      setAmbulanceNumber(ambulance || 'AMB-4821');
    }
    setDriverLoggedIn(true);
    router.replace('/(driver)');
  };

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={[styles.scroll, { paddingTop: topPad + 16, paddingBottom: bottomPad + 16 }]} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.logoWrap}>
          <View style={styles.logoDot} />
          <View>
            <Text style={styles.logoName}>ResQRoute AI</Text>
            <Text style={styles.logoSub}>DRIVER SYSTEM</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.tabRow}>
            {(['login', 'register'] as const).map(m => (
              <Pressable key={m} onPress={() => setMode(m)} style={[styles.tab, mode === m && styles.tabActive]}>
                <Text style={[styles.tabTxt, mode === m && styles.tabTxtActive]}>{m === 'login' ? 'LOGIN' : 'REGISTER'}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.formWrap}>
            {mode === 'register' ? (
              <>
                <CyberInput label="DRIVER NAME" value={name} onChangeText={setName} placeholder="Full Name" />
                <CyberInput label="AMBULANCE NUMBER" value={ambulance} onChangeText={setAmbulance} placeholder="AMB-XXXX" />
                <CyberInput label="PHONE NUMBER" value={phone} onChangeText={setPhone} placeholder="+1 (555) 000-0000" />
                <CyberInput label="HOSPITAL NAME" value={hospital} onChangeText={setHospital} placeholder="Hospital Name" />
                <CyberInput label="PASSWORD" value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry />
              </>
            ) : (
              <>
                <CyberInput label="AMBULANCE NUMBER" value={ambulance} onChangeText={setAmbulance} placeholder="AMB-XXXX" />
                <CyberInput label="PASSWORD" value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry />
              </>
            )}
          </View>

          <GlowButton label={mode === 'login' ? 'LOGIN TO SYSTEM' : 'REGISTER'} onPress={handleAuth} variant="danger" style={{ width: '100%' }} />

          <Pressable onPress={() => router.replace('/')}>
            <Text style={styles.backTxt}>← BACK TO WELCOME</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: 20, alignItems: 'center' },
  logoWrap: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 28, alignSelf: 'flex-start' },
  logoDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.danger, shadowColor: colors.danger, shadowOpacity: 0.8, shadowRadius: 8, shadowOffset: { width: 0, height: 0 } },
  logoName: { fontSize: 18, fontWeight: '700', color: colors.text },
  logoSub: { fontSize: 9, color: colors.danger, letterSpacing: 2, fontWeight: '700' },
  card: { width: '100%', maxWidth: 420, backgroundColor: colors.card, borderRadius: 16, borderWidth: 1, borderColor: colors.dangerBorder, padding: 20, gap: 16 },
  tabRow: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: 8, padding: 3, gap: 3 },
  tab: { flex: 1, paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
  tabActive: { backgroundColor: colors.dangerDim, borderWidth: 1, borderColor: colors.dangerBorder },
  tabTxt: { fontSize: 11, color: colors.textMuted, fontWeight: '700', letterSpacing: 1 },
  tabTxtActive: { color: colors.danger },
  formWrap: { gap: 12 },
  inputWrap: { gap: 4 },
  inputLabel: { fontSize: 9, color: colors.textMuted, letterSpacing: 1.5, fontWeight: '700' },
  inputBox: { borderWidth: 1, borderColor: colors.border, borderRadius: 8, backgroundColor: colors.surface, paddingHorizontal: 12 },
  inputBoxFocused: { borderColor: colors.dangerBorder },
  input: { color: colors.text, fontSize: 14, paddingVertical: 10 },
  backTxt: { textAlign: 'center', fontSize: 11, color: colors.textMuted, letterSpacing: 1 },
});
