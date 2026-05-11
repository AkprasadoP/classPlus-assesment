import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, UserCircle } from 'lucide-react-native';
import { ThemeColors } from '../../constants/Colors';
import { useUserStore } from '../../store/userStore';
import { mockAuth } from '../../services/firebase';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useUserStore();

  const handleMockLogin = async () => {
     try {
       const res = await mockAuth.signInAnonymously();
       login(res.user.uid);
       router.replace('/(auth)/profile-setup');
     } catch(err) {
       console.log(err);
     }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Ambient glow */}
        <View style={styles.glowCircle} />

        <View style={styles.logoContainer}>
           <View style={styles.logoCircle}>
              <Text style={styles.logoIcon}>🎨</Text>
           </View>
           <Text style={styles.title}>GreetingMaker</Text>
           <Text style={styles.subtitle}>Create stunning personalized wishes</Text>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={[styles.button, styles.googleBtn]} onPress={handleMockLogin}>
            <View style={styles.googleIconCircle}>
              <Text style={styles.googleG}>G</Text>
            </View>
            <Text style={styles.btnTextLight}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.emailBtn]} onPress={handleMockLogin}>
            <Mail size={18} color="#FFF" style={{ marginRight: 10 }} />
            <Text style={styles.btnTextLight}>Continue with Email</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.guestBtn} onPress={handleMockLogin}>
            <UserCircle size={16} color={ThemeColors.accent} style={{ marginRight: 6 }} />
            <Text style={styles.guestText}>Browse as Guest</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.terms}>By continuing you agree to our Terms & Privacy Policy</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.bg,
  },
  content: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 420,
    alignSelf: 'center',
    width: '100%',
  },
  glowCircle: {
    position: 'absolute',
    top: '15%',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255,107,53,0.06)',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: ThemeColors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: ThemeColors.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  logoIcon: {
    fontSize: 42,
  },
  title: {
    fontSize: 34,
    fontFamily: 'Syne_700Bold',
    color: ThemeColors.text,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: ThemeColors.textMuted,
    textAlign: 'center',
    fontFamily: 'DMSans_400Regular',
  },
  buttonGroup: {
    width: '100%',
    gap: 14,
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleBtn: {
    backgroundColor: ThemeColors.surface,
    borderWidth: 1,
    borderColor: ThemeColors.border,
  },
  googleIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#DB4437',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  googleG: {
    color: '#FFF',
    fontFamily: 'DMSans_700Bold',
    fontSize: 14,
  },
  emailBtn: {
    backgroundColor: ThemeColors.accent,
    shadowColor: ThemeColors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  btnTextLight: {
    fontSize: 15,
    fontFamily: 'DMSans_700Bold',
    color: '#FFF',
  },
  guestBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    padding: 8,
  },
  guestText: {
    color: ThemeColors.accent,
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,
  },
  terms: {
    position: 'absolute',
    bottom: 30,
    color: 'rgba(255,255,255,0.15)',
    fontSize: 11,
    fontFamily: 'DMSans_400Regular',
    textAlign: 'center',
  },
});
