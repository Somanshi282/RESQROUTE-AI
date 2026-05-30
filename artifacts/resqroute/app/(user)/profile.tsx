import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CyberNavbar from '../../components/CyberNavbar';
import GlowButton from '../../components/GlowButton';
import colors from '../../constants/colors';

const recentSearches = ['Neon Genesis Medical Center', 'CyberNet Police Station Alpha', 'NeonFuel Station Prime'];
const savedPlaces = [
  { name: 'Home', icon: 'home', address: '12 Cyber Lane, Zone A' },
  { name: 'Work', icon: 'briefcase', address: '88 Grid Street, Zone B' },
];

export default function UserProfileScreen() {
  const insets = useSafeAreaInsets();
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom;

  return (
    <View style={styles.root}>
      <CyberNavbar />
      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: bottomPad + 16 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Feather name="user" size={32} color={colors.primary} />
            </View>
            <View style={styles.avatarRing} />
            <View style={styles.onlineDot} />
          </View>
          <Text style={styles.userName}>CIVILIAN OPERATOR</Text>
          <Text style={styles.userId}>RESQ-48291</Text>
          <View style={styles.profileBadges}>
            {['VERIFIED', 'ACTIVE', 'ZONE A'].map(b => (
              <View key={b} style={styles.badge}>
                <Text style={styles.badgeTxt}>{b}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RECENT SEARCHES</Text>
          {recentSearches.map(s => (
            <View key={s} style={styles.listItem}>
              <View style={styles.listIcon}>
                <Feather name="clock" size={13} color={colors.primary} />
              </View>
              <Text style={styles.listTxt} numberOfLines={1}>{s}</Text>
              <Feather name="chevron-right" size={14} color={colors.textMuted} />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SAVED PLACES</Text>
          {savedPlaces.map(p => (
            <View key={p.name} style={styles.listItem}>
              <View style={styles.listIcon}>
                <Feather name={p.icon as any} size={13} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.listTxt}>{p.name}</Text>
                <Text style={styles.listSub}>{p.address}</Text>
              </View>
              <Feather name="chevron-right" size={14} color={colors.textMuted} />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SETTINGS</Text>
          {['Notifications', 'Privacy', 'Emergency Contacts', 'About'].map(item => (
            <View key={item} style={styles.listItem}>
              <View style={styles.listIcon}>
                <Feather name="settings" size={13} color={colors.textMuted} />
              </View>
              <Text style={styles.listTxt}>{item}</Text>
              <Feather name="chevron-right" size={14} color={colors.textMuted} />
            </View>
          ))}
        </View>

        <GlowButton label="LOGOUT" onPress={() => router.replace('/')} variant="danger" style={{ marginTop: 8 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: 16, paddingTop: 16, gap: 0 },
  profileCard: { backgroundColor: colors.card, borderRadius: 16, borderWidth: 1, borderColor: colors.primaryBorder, padding: 24, alignItems: 'center', gap: 8, marginBottom: 16 },
  avatarWrap: { width: 80, height: 80, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.primaryDim, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.primaryBorder },
  avatarRing: { position: 'absolute', width: 82, height: 82, borderRadius: 41, borderWidth: 1, borderColor: colors.border, borderStyle: 'dashed' as const },
  onlineDot: { position: 'absolute', bottom: 4, right: 4, width: 12, height: 12, borderRadius: 6, backgroundColor: colors.success, borderWidth: 2, borderColor: colors.background },
  userName: { fontSize: 18, fontWeight: '700', color: colors.text, letterSpacing: 2 },
  userId: { fontSize: 12, color: colors.primary, fontWeight: '600', letterSpacing: 2 },
  profileBadges: { flexDirection: 'row', gap: 6, marginTop: 4 },
  badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20, backgroundColor: colors.primaryDim, borderWidth: 1, borderColor: colors.primaryBorder },
  badgeTxt: { fontSize: 9, color: colors.primary, fontWeight: '700', letterSpacing: 0.8 },
  section: { backgroundColor: colors.card, borderRadius: 12, borderWidth: 1, borderColor: colors.border, marginBottom: 12, overflow: 'hidden' },
  sectionTitle: { fontSize: 9, color: colors.textMuted, letterSpacing: 2, fontWeight: '700', paddingHorizontal: 14, paddingTop: 12, paddingBottom: 4 },
  listItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, paddingVertical: 11, borderTopWidth: 1, borderTopColor: colors.divider },
  listIcon: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  listTxt: { fontSize: 13, color: colors.text, flex: 1 },
  listSub: { fontSize: 10, color: colors.textMuted, marginTop: 1 },
});
