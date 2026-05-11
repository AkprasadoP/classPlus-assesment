import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LogOut, Crown, Settings, ChevronRight, Bell } from 'lucide-react-native';
import { ThemeColors } from '../../constants/Colors';
import { useUserStore } from '../../store/userStore';

export default function ProfileScreen() {
  const router = useRouter();
  const { name, photoURL, isPremium, logout } = useUserStore();

  const initials = name
    .split(' ')
    .map(w => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerWrapper}>
        <Text style={styles.pageTitle}>Profile</Text>

        <View style={styles.profileCard}>
          {photoURL && !photoURL?.includes('ui-avatars') ? (
            <Image source={{ uri: photoURL }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.initialsAvatar]}>
              <Text style={styles.initialsText}>{initials}</Text>
            </View>
          )}
          <Text style={styles.name}>{name}</Text>
          {isPremium && (
            <View style={styles.proBadge}>
              <Crown size={12} color="#FFF" fill="#FFF" style={{ marginRight: 4 }} />
              <Text style={styles.proText}>Premium Member</Text>
            </View>
          )}
        </View>

        <View style={styles.menuList}>
          <MenuItem 
            icon={<Settings size={18} color={ThemeColors.textMuted} />} 
            label="Preferences" 
          />
          <MenuItem 
            icon={<Crown size={18} color={ThemeColors.accentGold} />} 
            label="Subscription" 
          />
          <MenuItem 
            icon={<Bell size={18} color={ThemeColors.textMuted} />} 
            label="Notifications" 
          />
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <LogOut size={16} color="#EF4444" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>GreetingMaker v1.0.0</Text>
      </View>
    </SafeAreaView>
  );
}

const MenuItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <TouchableOpacity style={menuStyles.menuItem}>
    {icon}
    <Text style={menuStyles.menuLabel}>{label}</Text>
    <ChevronRight size={16} color="rgba(255,255,255,0.15)" />
  </TouchableOpacity>
);

const menuStyles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: ThemeColors.border,
  },
  menuLabel: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'DMSans_400Regular',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.bg,
    paddingTop: Platform.OS === 'android' ? 40 : 0,
    alignItems: 'center',
  },
  innerWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    padding: 24,
  },
  pageTitle: {
    fontSize: 24,
    fontFamily: 'Syne_700Bold',
    color: ThemeColors.text,
    marginBottom: 24,
  },
  profileCard: {
    backgroundColor: ThemeColors.surface,
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: ThemeColors.border,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: ThemeColors.green,
    marginBottom: 14,
  },
  initialsAvatar: {
    backgroundColor: ThemeColors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: '#FFF',
    fontFamily: 'Syne_700Bold',
    fontSize: 28,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Syne_700Bold',
    color: ThemeColors.text,
    marginBottom: 8,
  },
  proBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ThemeColors.accentGold,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 50,
  },
  proText: {
    color: '#FFF',
    fontFamily: 'DMSans_500Medium',
    fontSize: 11,
    letterSpacing: 0.3,
  },
  menuList: {
    backgroundColor: ThemeColors.surface,
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: ThemeColors.border,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.2)',
    backgroundColor: 'rgba(239,68,68,0.06)',
  },
  logoutText: {
    color: '#EF4444',
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,
  },
  version: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.1)',
    marginTop: 'auto',
    marginBottom: 20,
    fontSize: 11,
    fontFamily: 'DMSans_400Regular',
  },
});
