import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ThemeColors } from '../constants/Colors';

interface CategoryPillProps {
  label: string;
  emoji: string;
  isActive: boolean;
  onPress: () => void;
}

export const CategoryPill: React.FC<CategoryPillProps> = ({ label, emoji, isActive, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.container,
        isActive ? styles.activeContainer : styles.inactiveContainer,
      ]}
    >
      <Text style={styles.emoji}>{emoji}</Text>
      <Text
        style={[
          styles.label,
          isActive ? styles.activeLabel : styles.inactiveLabel,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 50,
    marginRight: 10,
    borderWidth: 1,
  },
  activeContainer: {
    backgroundColor: ThemeColors.accent,
    borderColor: ThemeColors.accent,
  },
  inactiveContainer: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(255,255,255,0.12)',
  },
  emoji: {
    marginRight: 6,
    fontSize: 13,
  },
  label: {
    fontSize: 13,
    fontFamily: 'DMSans_500Medium',
    letterSpacing: 0.2,
  },
  activeLabel: {
    color: '#FFF',
  },
  inactiveLabel: {
    color: ThemeColors.textMuted,
  },
});
