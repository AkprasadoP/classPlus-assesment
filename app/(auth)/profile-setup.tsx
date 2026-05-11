import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, SafeAreaView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Camera, Check, ArrowRight } from 'lucide-react-native';
import { ThemeColors } from '../../constants/Colors';
import { useUserStore } from '../../store/userStore';

export default function ProfileSetupScreen() {
  const router = useRouter();
  const { name, photoURL, setProfile } = useUserStore();
  const [userName, setUserName] = useState(name || '');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleContinue = async () => {
    if (!userName.trim()) {
      alert('Please enter your name');
      return;
    }
    
    setLoading(true);
    try {
      setProfile({
         name: userName.trim(),
         photoURL: selectedImage || photoURL,
      });
      
      setTimeout(() => {
         setLoading(false);
         router.replace('/(tabs)/');
      }, 500);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.stepLabel}>STEP 2 OF 2</Text>
          <Text style={styles.title}>Setup Profile</Text>
          <Text style={styles.subtitle}>Your name and photo will appear on every card</Text>

          <View style={styles.avatarWrapper}>
            <TouchableOpacity onPress={pickImage} style={styles.avatarTouch}>
              <Image 
                source={{ uri: selectedImage || photoURL }} 
                style={styles.avatar} 
              />
              <View style={styles.camBadge}>
                 <Camera size={14} color="#FFF" />
              </View>
            </TouchableOpacity>
            <Text style={styles.hintText}>Tap to change photo</Text>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Your Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. John Doe"
              placeholderTextColor="rgba(255,255,255,0.2)"
              value={userName}
              onChangeText={setUserName}
              autoFocus
            />
          </View>

          <View style={{ flex: 1 }} />

          <TouchableOpacity 
            style={[styles.primaryBtn, loading && { opacity: 0.7 }]} 
            onPress={handleContinue}
            disabled={loading}
          >
            {loading ? (
               <ActivityIndicator color="#FFF" />
            ) : (
               <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                 <Text style={styles.btnText}>Continue</Text>
                 <ArrowRight color="#FFF" size={18} />
               </View>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: ThemeColors.bg,
  },
  container: {
    flex: 1,
    padding: 24,
    maxWidth: 420,
    alignSelf: 'center',
    width: '100%',
  },
  stepLabel: {
    fontSize: 11,
    fontFamily: 'DMSans_500Medium',
    color: ThemeColors.accent,
    letterSpacing: 1.5,
    marginTop: 20,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Syne_700Bold',
    color: ThemeColors.text,
  },
  subtitle: {
    fontSize: 14,
    color: ThemeColors.textMuted,
    marginTop: 4,
    marginBottom: 40,
    fontFamily: 'DMSans_400Regular',
  },
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarTouch: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: ThemeColors.surface,
    borderWidth: 3,
    borderColor: ThemeColors.green,
  },
  camBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: ThemeColors.accent,
    padding: 8,
    borderRadius: 20,
    shadowColor: ThemeColors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  hintText: {
    marginTop: 12,
    color: ThemeColors.textMuted,
    fontSize: 13,
    fontFamily: 'DMSans_400Regular',
  },
  inputSection: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontFamily: 'DMSans_500Medium',
    color: 'rgba(255,255,255,0.6)',
    marginLeft: 4,
    letterSpacing: 0.3,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: ThemeColors.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'DMSans_400Regular',
    backgroundColor: ThemeColors.surface,
    color: ThemeColors.text,
  },
  primaryBtn: {
    backgroundColor: ThemeColors.accent,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: ThemeColors.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  btnText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Syne_700Bold',
  },
});
