import { Feather } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';
import { ServiceLocation } from '../data/dummyData';

interface ListCardProps {
  item: ServiceLocation;
  onNavigate: (item: ServiceLocation) => void;
  selected?: boolean;
}

export function ServiceListCard({ item, onNavigate, selected }: ListCardProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const press = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.97, duration: 80, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 200 }),
    ]).start();
    onNavigate(item);
  };

  const isOpen = item.status === 'open';
  const borderColor = selected ? colors.primary : colors.border;

  return (
    <Pressable onPress={press}>
      <Animated.View style={[styles.card, { borderColor, transform: [{ scale }], backgroundColor: selected ? colors.primaryGlow : colors.card }]}>
        <View style={styles.cardHeader}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <View style={[styles.statusBadge, { backgroundColor: isOpen ? colors.successDim : colors.dangerDim, borderColor: isOpen ? colors.successBorder : colors.dangerBorder }]}>
            <View style={[styles.statusDot, { backgroundColor: isOpen ? colors.success : colors.danger }]} />
            <Text style={[styles.statusText, { color: isOpen ? colors.success : colors.danger }]}>{isOpen ? 'OPEN' : 'CLOSED'}</Text>
          </View>
        </View>
        <View style={styles.cardRow}>
          <Feather name="phone" size={11} color={colors.textMuted} />
          <Text style={styles.subText}>{item.phone}</Text>
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.metaChip}>
            <Feather name="map-pin" size={10} color={colors.primary} />
            <Text style={styles.metaText}>{item.distance}</Text>
          </View>
          <View style={styles.metaChip}>
            <Feather name="clock" size={10} color={colors.primary} />
            <Text style={styles.metaText}>{item.eta}</Text>
          </View>
          {selected && (
            <View style={[styles.metaChip, { backgroundColor: colors.primaryDim, borderColor: colors.primaryBorder }]}>
              <Feather name="navigation" size={10} color={colors.primary} />
              <Text style={[styles.metaText, { color: colors.primary }]}>ACTIVE</Text>
            </View>
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
}

interface NearbyCardProps extends ListCardProps {
  onCall?: () => void;
}

export function NearbyServiceCard({ item, onNavigate, onCall }: NearbyCardProps) {
  const isOpen = item.status === 'open';
  return (
    <View style={styles.nearbyCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: isOpen ? colors.successDim : colors.dangerDim, borderColor: isOpen ? colors.successBorder : colors.dangerBorder }]}>
          <View style={[styles.statusDot, { backgroundColor: isOpen ? colors.success : colors.danger }]} />
          <Text style={[styles.statusText, { color: isOpen ? colors.success : colors.danger }]}>{isOpen ? 'OPEN' : 'CLOSED'}</Text>
        </View>
      </View>
      <View style={styles.cardRow}>
        <Feather name="phone" size={11} color={colors.textMuted} />
        <Text style={styles.subText}>{item.phone}</Text>
      </View>
      <View style={styles.cardRow}>
        <Feather name="map-pin" size={11} color={colors.textMuted} />
        <Text style={styles.subText}>{item.address}</Text>
      </View>
      <View style={styles.nearbyFooter}>
        <View style={styles.metaChip}>
          <Text style={styles.metaText}>{item.distance}</Text>
        </View>
        <View style={styles.metaChip}>
          <Text style={styles.metaText}>{item.eta}</Text>
        </View>
        <Pressable onPress={() => onNavigate(item)} style={styles.navBtn}>
          <Feather name="navigation" size={11} color={colors.background} />
          <Text style={styles.navBtnText}>NAVIGATE</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    gap: 6,
  },
  nearbyCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: colors.card,
    gap: 6,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  name: { fontSize: 12, color: colors.text, fontWeight: '600', flex: 1 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 7, paddingVertical: 2, borderRadius: 20, borderWidth: 1 },
  statusDot: { width: 5, height: 5, borderRadius: 3 },
  statusText: { fontSize: 9, fontWeight: '700', letterSpacing: 0.5 },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  subText: { fontSize: 11, color: colors.textMuted, flex: 1 },
  cardFooter: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginTop: 2 },
  nearbyFooter: { flexDirection: 'row', gap: 6, alignItems: 'center', marginTop: 4 },
  metaChip: { flexDirection: 'row', gap: 3, alignItems: 'center', backgroundColor: colors.surface, paddingHorizontal: 7, paddingVertical: 3, borderRadius: 6, borderWidth: 1, borderColor: colors.divider },
  metaText: { fontSize: 10, color: colors.textDim, fontWeight: '600' },
  navBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.primary, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6, marginLeft: 'auto' },
  navBtnText: { fontSize: 9, color: colors.background, fontWeight: '700', letterSpacing: 0.8 },
});
