import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CyberNavbar from '../../components/CyberNavbar';
import { NearbyServiceCard } from '../../components/ServiceCard';
import colors from '../../constants/colors';
import { useApp } from '../../context/AppContext';
import { hospitals, nearbyCount, petrolPumps, policeStations, punctureCenters, ServiceLocation } from '../../data/dummyData';

const TABS = ['HOSPITALS', 'POLICE', 'PETROL', 'PUNCTURE'] as const;
type Tab = (typeof TABS)[number];

const dataMap: Record<Tab, ServiceLocation[]> = {
  HOSPITALS: hospitals,
  POLICE: policeStations,
  PETROL: petrolPumps,
  PUNCTURE: punctureCenters,
};

const countMap: Record<Tab, number> = {
  HOSPITALS: nearbyCount.hospitals,
  POLICE: nearbyCount.police,
  PETROL: nearbyCount.petrol,
  PUNCTURE: nearbyCount.puncture,
};

const typeMap: Record<Tab, 'hospital' | 'police' | 'petrol' | 'puncture'> = {
  HOSPITALS: 'hospital',
  POLICE: 'police',
  PETROL: 'petrol',
  PUNCTURE: 'puncture',
};

export default function NearbyScreen() {
  const insets = useSafeAreaInsets();
  const { setSelectedService } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('HOSPITALS');
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const handleNavigate = (item: ServiceLocation) => {
    setSelectedService(typeMap[activeTab]);
    router.push('/(user)/navigation');
  };

  return (
    <View style={styles.root}>
      <CyberNavbar />
      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: bottomPad + 16 }]} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>NEARBY SERVICES</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.countRow} contentContainerStyle={styles.countContent}>
          {TABS.map(tab => (
            <View key={tab} style={styles.countCard}>
              <View style={styles.countDot} />
              <Text style={styles.countNum}>{countMap[tab]}</Text>
              <Text style={styles.countLabel}>{tab}</Text>
              <Text style={[styles.countStatus, { color: colors.success }]}>ACTIVE</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.tabRow}>
          {TABS.map(tab => (
            <View
              key={tab}
              style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
              onTouchEnd={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabTxt, activeTab === tab && styles.tabTxtActive]}>{tab}</Text>
            </View>
          ))}
        </View>

        <View style={styles.listWrap}>
          {dataMap[activeTab].map(item => (
            <NearbyServiceCard key={item.id} item={item} onNavigate={handleNavigate} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: 16, paddingTop: 16 },
  pageTitle: { fontSize: 18, fontWeight: '700', color: colors.text, letterSpacing: 3, marginBottom: 14 },
  countRow: { marginBottom: 16, marginHorizontal: -4 },
  countContent: { paddingHorizontal: 4, gap: 8, flexDirection: 'row' },
  countCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    padding: 12,
    alignItems: 'center',
    gap: 3,
    minWidth: 80,
  },
  countDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.success },
  countNum: { fontSize: 22, fontWeight: '700', color: colors.primary },
  countLabel: { fontSize: 8, color: colors.textMuted, letterSpacing: 0.8, fontWeight: '700' },
  countStatus: { fontSize: 8, fontWeight: '700', letterSpacing: 0.8 },
  tabRow: { flexDirection: 'row', gap: 6, marginBottom: 14, flexWrap: 'wrap' },
  tabBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  tabBtnActive: { backgroundColor: colors.primaryDim, borderColor: colors.primaryBorder },
  tabTxt: { fontSize: 10, color: colors.textMuted, fontWeight: '700', letterSpacing: 0.8 },
  tabTxtActive: { color: colors.primary },
  listWrap: { gap: 0 },
});
