import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Lock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUserStore } from '../store/userStore';
import { Template } from '../constants/mockData';
import { ThemeColors } from '../constants/Colors';

const { width } = Dimensions.get('window');
const MAX_GRID_WIDTH = 500;
const effectiveWidth = Math.min(width, MAX_GRID_WIDTH);
const CARD_WIDTH = (effectiveWidth - 48) / 2;

interface GreetingCardProps {
  template: Template;
  onPress: () => void;
}

export const GreetingCard: React.FC<GreetingCardProps> = ({ template, onPress }) => {
  const { name, photoURL } = useUserStore();

  // Generate initials for fallback avatar
  const initials = name
    .split(' ')
    .map(w => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <TouchableOpacity 
      activeOpacity={0.85} 
      onPress={onPress} 
      style={styles.container}
    >
      {/* Main Image Background Wrapper */}
      <View style={styles.imageWrapper}>
        <Image 
          source={{ uri: template.imageURL }} 
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        
        {/* Gradient quote overlay at bottom */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.quoteContainer}
        >
           <Text numberOfLines={2} style={styles.quoteText}>{template.quoteText}</Text>
        </LinearGradient>

        {/* Premium badge pill instead of full overlay */}
        {template.isPremium && (
          <View style={styles.lockOverlay}>
            <View style={styles.lockBadge}>
              <Lock color="#FFF" size={12} />
              <Text style={styles.lockText}>Premium</Text>
            </View>
          </View>
        )}
      </View>

      {/* Dark Header Bar with glassmorphism feel */}
      <View style={styles.headerBar}>
         <Text numberOfLines={1} style={styles.nameText}>{name}</Text>
      </View>

      {/* Circular Avatar with green glow ring */}
      <View style={styles.avatarContainer}>
        {photoURL && !photoURL?.includes('ui-avatars') ? (
          <Image source={{ uri: photoURL }} style={styles.avatarImage} />
        ) : (
          <View style={styles.initialsCircle}>
            <Text style={styles.initialsText}>{initials}</Text>
          </View>
        )}
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_WIDTH / 0.75, // Explicit height for Web layout consistency
    marginBottom: 24,
    marginHorizontal: 8,
    overflow: 'visible', 
    position: 'relative',
    marginTop: 10,
  },
  imageWrapper: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: ThemeColors.card,
    overflow: 'hidden',
    // Subtle card glow
    shadowColor: ThemeColors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  backgroundImage: {
    ...Platform.select({
      web: { width: '100%', height: '100%', position: 'absolute' } as any,
      default: { width: '100%', height: '100%' }
    }),
  },
  quoteContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    paddingTop: 32,
  },
  quoteText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: 'DMSans_400Regular',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  // Premium badge pill
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,14,23,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245,158,11,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.4)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
    gap: 5,
  },
  lockText: {
    color: '#FCD34D',
    fontSize: 11,
    fontFamily: 'Syne_700Bold',
    letterSpacing: 0.5,
  },
  // Glassmorphism header bar
  headerBar: {
    position: 'absolute',
    top: 0,
    left: 45,
    right: 0,
    height: 32,
    backgroundColor: ThemeColors.headerOverlay,
    borderTopRightRadius: 16,
    justifyContent: 'center',
    paddingLeft: 12,
    paddingRight: 8,
    zIndex: 5,
    ...(Platform.OS === 'web' ? { backdropFilter: 'blur(6px)' } as any : {}),
  },
  nameText: {
    color: '#FFF',
    fontFamily: 'Syne_700Bold',
    fontSize: 11,
    letterSpacing: 0.3,
  },
  // Green-glow avatar ring
  avatarContainer: {
    position: 'absolute',
    top: -10,
    left: -10,
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2.5,
    borderColor: ThemeColors.green,
    backgroundColor: ThemeColors.card,
    zIndex: 10,
    overflow: 'hidden',
    // Green glow
    shadowColor: ThemeColors.green,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  // Gradient initials fallback
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
    fontSize: 16,
  },
});
