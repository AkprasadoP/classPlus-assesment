import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator, Platform, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Share2, Download, ArrowLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeColors } from '../../constants/Colors';
import { useUserStore } from '../../store/userStore';
import { MOCK_TEMPLATES } from '../../constants/mockData';
import { captureAndShare } from '../../services/captureService';

export default function CardDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const cardRef = useRef<any>(null);
  const [isSharing, setIsSharing] = useState(false);
  const { height } = Dimensions.get('window');
  
  const { name, photoURL } = useUserStore();
  
  const template = MOCK_TEMPLATES.find(t => t.id === id);

  const initials = name
    .split(' ')
    .map(w => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  if (!template) {
    return (
      <View style={styles.error}>
         <Text style={{ color: ThemeColors.text }}>Template not found</Text>
         <TouchableOpacity onPress={() => router.back()}>
           <Text style={{ color: ThemeColors.accent }}>Go Back</Text>
         </TouchableOpacity>
      </View>
    );
  }

  const handleSharePress = async () => {
    if (isSharing) return;
    setIsSharing(true);
    try {
      await captureAndShare(cardRef);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft color={ThemeColors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preview & Share</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.previewBox}>
          
          <View 
             ref={cardRef}
             collapsable={false}
             style={[styles.compositeView, { height: height * 0.7, width: (height * 0.7) * 0.75 }]}
          >
             <Image 
               source={{ uri: template.imageURL }}
               style={styles.bgImage}
               resizeMode="cover"
             />

             <View style={styles.headerBar}>
                <Text numberOfLines={1} style={styles.nameText}>{name}</Text>
             </View>
             
             <View style={styles.avatarBorder}>
                {photoURL && !photoURL?.includes('ui-avatars') ? (
                  <Image source={{ uri: photoURL }} style={styles.avatar} />
                ) : (
                  <View style={styles.initialsCircle}>
                    <Text style={styles.initialsText}>{initials}</Text>
                  </View>
                )}
             </View>
             
             <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.quoteBanner}
             >
                <Text numberOfLines={2} style={styles.quoteText}>{template.quoteText}</Text>
             </LinearGradient>
          </View>
        </View>
      </ScrollView>

      <View style={styles.actionArea}>
         <TouchableOpacity 
           style={[styles.primaryBtn, isSharing && { opacity: 0.7 }]}
           onPress={handleSharePress}
             disabled={isSharing}
           >
             {isSharing ? (
               <ActivityIndicator color="#FFF" />
             ) : (
               <>
                 {Platform.OS === 'web' 
                   ? <Download size={20} color="#FFF" style={{marginRight: 10}}/> 
                   : <Share2 size={20} color="#FFF" style={{marginRight: 10}}/>
                 }
                 <Text style={styles.btnText}>
                   {Platform.OS === 'web' ? 'Download Image' : 'Share & Spread'}
                 </Text>
               </>
             )}
           </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: ThemeColors.border,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Syne_700Bold',
    color: ThemeColors.text,
  },
  scroll: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  previewBox: {
    width: '100%',
    alignItems: 'center',
  },
  compositeView: {
    backgroundColor: ThemeColors.card,
    borderRadius: 20,
    overflow: 'visible',
    shadowColor: ThemeColors.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative',
  },
  bgImage: {
    ...Platform.select({
      web: { width: '100%', height: '100%', position: 'absolute' } as any,
      default: { width: '100%', height: '100%' }
    }),
    borderRadius: 20,
  },
  headerBar: {
    position: 'absolute',
    top: 0,
    left: 60,
    right: 0,
    height: 44,
    backgroundColor: ThemeColors.headerOverlay,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    paddingLeft: 16,
    zIndex: 5,
    ...(Platform.OS === 'web' ? { backdropFilter: 'blur(6px)' } as any : {}),
  },
  nameText: {
    color: '#FFF',
    fontSize: 15,
    fontFamily: 'Syne_700Bold',
    letterSpacing: 0.3,
  },
  avatarBorder: {
    position: 'absolute',
    top: -15,
    left: -15,
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: ThemeColors.green,
    backgroundColor: ThemeColors.card,
    zIndex: 10,
    overflow: 'hidden',
    shadowColor: ThemeColors.green,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  initialsCircle: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ThemeColors.accent,
  },
  initialsText: {
    color: '#FFF',
    fontFamily: 'Syne_700Bold',
    fontSize: 22,
  },
  quoteBanner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 16,
    paddingTop: 32,
  },
  quoteText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'DMSans_500Medium',
    textAlign: 'center',
  },
  actionArea: {
    width: '100%',
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    backgroundColor: ThemeColors.surface,
    borderTopWidth: 1,
    borderTopColor: ThemeColors.border,
  },
  primaryBtn: {
    flexDirection: 'row',
    width: '100%',
    height: 56,
    backgroundColor: ThemeColors.accent,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Syne_700Bold',
    letterSpacing: 0.3,
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ThemeColors.bg,
    gap: 12,
  },
});
