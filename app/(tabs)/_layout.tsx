import React from 'react';
import { Tabs } from 'expo-router';
import { User, Sparkles } from 'lucide-react-native';
import { ThemeColors } from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: ThemeColors.accent,
        tabBarInactiveTintColor: 'rgba(255,255,255,0.3)',
        headerShown: false,
        tabBarStyle: {
           backgroundColor: ThemeColors.bg,
           paddingTop: 8,
           height: 60,
           borderTopWidth: 1,
           borderTopColor: 'rgba(255,255,255,0.06)',
           elevation: 0,
        },
        tabBarLabelStyle: {
           marginBottom: 8,
           fontFamily: 'DMSans_500Medium',
           fontSize: 11,
           letterSpacing: 0.3,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, size }) => <Sparkles color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
