import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import colors from '../../constants/colors';

function TabIcon({ name, label, focused, accent }: { name: string; label: string; focused: boolean; accent?: string }) {
  const c = accent ?? colors.danger;
  return (
    <View style={styles.tabItem}>
      <View style={[styles.tabIconWrap, focused && { backgroundColor: `${c}20` }]}>
        <Feather name={name as any} size={18} color={focused ? c : colors.textMuted} />
      </View>
      <Text style={[styles.tabLabel, { color: focused ? c : colors.textMuted }]}>{label}</Text>
      {focused && <View style={[styles.tabDot, { backgroundColor: c }]} />}
    </View>
  );
}

export default function DriverLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: colors.glass,
        borderTopColor: colors.dangerBorder,
        borderTopWidth: 1,
        height: Platform.OS === 'web' ? 84 : 70,
        paddingBottom: 0,
      },
      tabBarShowLabel: false,
    }}>
      <Tabs.Screen name="index" options={{ tabBarIcon: ({ focused }) => <TabIcon name="home" label="HOME" focused={focused} /> }} />
      <Tabs.Screen name="navigation" options={{ tabBarIcon: ({ focused }) => <TabIcon name="navigation" label="NAVIGATE" focused={focused} /> }} />
      <Tabs.Screen name="history" options={{ tabBarIcon: ({ focused }) => <TabIcon name="list" label="HISTORY" focused={focused} /> }} />
      <Tabs.Screen name="profile" options={{ tabBarIcon: ({ focused }) => <TabIcon name="user" label="PROFILE" focused={focused} /> }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabItem: { alignItems: 'center', gap: 2, paddingTop: 6 },
  tabIconWrap: { width: 36, height: 28, alignItems: 'center', justifyContent: 'center', borderRadius: 8 },
  tabLabel: { fontSize: 8, fontWeight: '700', letterSpacing: 0.8 },
  tabDot: { width: 4, height: 4, borderRadius: 2 },
});
