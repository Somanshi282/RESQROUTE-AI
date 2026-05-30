import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Linking, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CyberNavbar from '../../components/CyberNavbar';
import FuturisticMap from '../../components/FuturisticMap';
import { ServiceListCard } from '../../components/ServiceCard';
import colors from '../../constants/colors';
import { useApp } from '../../context/AppContext';
import { hospitals, petrolPumps, policeStations, punctureCenters, ServiceLocation } from '../../data/dummyData';

const dataMap: Record<string, ServiceLocation[]> = {
  hospital: hospitals,
  police: policeStations,
  petrol: petrolPumps,
  puncture: punctureCenters,
};

const titleMap: Record<string, string> = {
  hospital: 'HOSPITALS',
  police: 'POLICE STATIONS',
  petrol: 'PETROL PUMPS',
  puncture: 'PUNCTURE CENTERS',
};

export default function NavigationScreen() {
  const insets = useSafeAreaInsets();
  const { selectedService } = useApp();
  const type = selectedService ?? 'hospital';
  const list = dataMap[type] ?? hospitals;

  const [selected, setSelected] = useState<ServiceLocation>(list[0]);
  const [expanded, setExpanded] = useState(false);
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom;

  return (
    <View style={styles.root}>
      <CyberNavbar />
      <View style={styles.body}>
        <View style={styles.mapSection}>
          <Pressable style={styles.expandBtn} onPress={() => setExpanded(true)}>
            <Feather name="maximize-2" size={12} color={colors.primary} />
            <Text style={styles.expandTxt}>EXPAND</Text>
          </Pressable>
          <FuturisticMap eta={selected.eta} distance={selected.distance} targetName={selected.name} />
          <View style={styles.mapMeta}>
            <View style={styles.metaItem}>
              <Feather name="phone" size={11} color={colors.textMuted} />
              <Text style={styles.metaTxt}>{selected.phone}</Text>
            </View>
            <Pressable onPress={() => Linking.openURL(`tel:${selected.phone}`)} style={styles.callBtn}>
              <Feather name="phone-call" size={11} color={colors.background} />
              <Text style={styles.callTxt}>CALL</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.listSection}>
          <Text style={styles.listTitle}>{titleMap[type]}</Text>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: bottomPad + 16, gap: 0 }}>
            {list.map(item => (
              <ServiceListCard key={item.id} item={item} onNavigate={setSelected} selected={item.id === selected.id} />
            ))}
          </ScrollView>
        </View>
      </View>

      <Modal visible={expanded} animationType="fade" statusBarTranslucent>
        <View style={[styles.expandedModal, { paddingTop: Platform.OS === 'web' ? 67 : insets.top, paddingBottom: Platform.OS === 'web' ? 34 : insets.bottom }]}>
          <View style={styles.expandedHeader}>
            <Text style={styles.expandedTitle}>{selected.name}</Text>
            <Pressable onPress={() => setExpanded(false)} style={styles.closeBtn}>
              <Feather name="minimize-2" size={13} color={colors.primary} />
              <Text style={styles.closeTxt}>CLOSE</Text>
            </Pressable>
          </View>
          <FuturisticMap eta={selected.eta} distance={selected.distance} targetName={selected.name} expanded />
          <View style={styles.expandedInfo}>
            <View style={styles.infoRow}>
              <Feather name="map-pin" size={13} color={colors.primary} />
              <Text style={styles.infoTxt}>{selected.address}</Text>
            </View>
            <View style={styles.infoRow}>
              <Feather name="phone" size={13} color={colors.primary} />
              <Text style={styles.infoTxt}>{selected.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Feather name="clock" size={13} color={colors.primary} />
              <Text style={styles.infoTxt}>ETA: {selected.eta} — {selected.distance}</Text>
            </View>
          </View>
          <Pressable onPress={() => { setExpanded(false); }} style={styles.stopNavBtn}>
            <Feather name="x-circle" size={14} color={colors.danger} />
            <Text style={styles.stopNavTxt}>CLOSE NAVIGATION</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  body: { flex: 1, flexDirection: Platform.OS === 'web' ? 'row' : 'column' },
  mapSection: {
    flex: Platform.OS === 'web' ? 1 : 0,
    padding: 12,
    gap: 8,
    position: 'relative',
  },
  expandBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: colors.glass,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
  },
  expandTxt: { fontSize: 9, color: colors.primary, fontWeight: '700' },
  mapMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 5, flex: 1 },
  metaTxt: { fontSize: 11, color: colors.textMuted },
  callBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.primary, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  callTxt: { fontSize: 10, color: colors.background, fontWeight: '700' },
  listSection: {
    flex: Platform.OS === 'web' ? 0.6 : 1,
    paddingHorizontal: 12,
    paddingTop: Platform.OS === 'web' ? 12 : 0,
    minWidth: Platform.OS === 'web' ? 280 : undefined,
  },
  listTitle: { fontSize: 11, color: colors.textMuted, letterSpacing: 2, fontWeight: '700', marginBottom: 8 },
  expandedModal: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 16, gap: 12 },
  expandedHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  expandedTitle: { fontSize: 14, fontWeight: '700', color: colors.text, flex: 1 },
  closeBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.primaryDim, borderRadius: 6, paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: colors.primaryBorder },
  closeTxt: { fontSize: 10, color: colors.primary, fontWeight: '700' },
  expandedInfo: { backgroundColor: colors.card, borderRadius: 12, borderWidth: 1, borderColor: colors.primaryBorder, padding: 14, gap: 10 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  infoTxt: { fontSize: 12, color: colors.textDim },
  stopNavBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: colors.dangerDim, borderRadius: 10, paddingVertical: 13, borderWidth: 1, borderColor: colors.dangerBorder, marginTop: 'auto' },
  stopNavTxt: { fontSize: 12, color: colors.danger, fontWeight: '700', letterSpacing: 1.5 },
});
