import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Crown, X, CheckCircle, Zap } from 'lucide-react-native';
import { ThemeColors } from '../constants/Colors';

interface PremiumModalProps {
  visible: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({ visible, onClose, onSubscribe }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <Pressable style={styles.overlay} onPress={onClose} />
        <View style={styles.content}>
          
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <X color="rgba(255,255,255,0.3)" size={24} />
          </TouchableOpacity>

          {/* Glow icon */}
          <View style={styles.iconContainer}>
            <Crown color={ThemeColors.accentGold} size={44} fill={ThemeColors.accentGold} />
          </View>

          <Text style={styles.title}>Unlock Premium</Text>
          <Text style={styles.subtitle}>Get unlimited access to 500+ exclusive greeting templates with no watermarks.</Text>

          <View style={styles.benefits}>
             <BenefitItem text="500+ High-Resolution Templates" />
             <BenefitItem text="Exclusive Festival Collections" />
             <BenefitItem text="Ad-free, high quality sharing" />
          </View>

          <View style={styles.plans}>
            <View style={styles.planBox}>
              <Text style={styles.planLabel}>Monthly</Text>
              <Text style={styles.planPrice}>₹49</Text>
              <Text style={styles.planPeriod}>/month</Text>
            </View>
            <View style={[styles.planBox, styles.activePlan]}>
              <View style={styles.badge}><Text style={styles.badgeText}>BEST VALUE</Text></View>
              <Text style={styles.planLabel}>Yearly</Text>
              <Text style={styles.planPrice}>₹299</Text>
              <Text style={styles.planPeriod}>/year</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.subButton} onPress={onSubscribe}>
            <Zap size={18} color="#FFF" fill="#FFF" style={{ marginRight: 8 }} />
            <Text style={styles.subButtonText}>Start 7-Day Free Trial</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
             <Text style={styles.cancelText}>Maybe Later</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

const BenefitItem = ({ text }: { text: string }) => (
  <View style={styles.benefitRow}>
    <CheckCircle size={16} color={ThemeColors.green} style={{ marginRight: 10 }} />
    <Text style={styles.benefitText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    backgroundColor: ThemeColors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 28,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: ThemeColors.border,
  },
  closeBtn: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 10,
  },
  iconContainer: {
    backgroundColor: 'rgba(245,158,11,0.1)',
    padding: 20,
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.2)',
  },
  title: {
    fontSize: 26,
    fontFamily: 'Syne_700Bold',
    color: ThemeColors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: ThemeColors.textMuted,
    textAlign: 'center',
    marginBottom: 28,
    paddingHorizontal: 10,
    fontFamily: 'DMSans_400Regular',
    lineHeight: 20,
  },
  benefits: {
    width: '100%',
    marginBottom: 28,
    paddingHorizontal: 4,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'DMSans_400Regular',
  },
  plans: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
    gap: 12,
  },
  planBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: ThemeColors.border,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    backgroundColor: ThemeColors.card,
  },
  activePlan: {
    borderColor: ThemeColors.accent,
    backgroundColor: 'rgba(255,107,53,0.08)',
    borderWidth: 2,
  },
  badge: {
    position: 'absolute',
    top: -10,
    backgroundColor: ThemeColors.accent,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 50,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 9,
    fontFamily: 'Syne_700Bold',
    letterSpacing: 0.5,
  },
  planLabel: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    color: ThemeColors.textMuted,
    marginBottom: 4,
  },
  planPrice: {
    fontSize: 28,
    color: ThemeColors.text,
    fontFamily: 'Syne_700Bold',
  },
  planPeriod: {
    fontSize: 12,
    color: ThemeColors.textMuted,
    fontFamily: 'DMSans_400Regular',
  },
  subButton: {
    flexDirection: 'row',
    backgroundColor: ThemeColors.accent,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: ThemeColors.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  subButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Syne_700Bold',
  },
  cancelBtn: {
    marginTop: 18,
    marginBottom: 8,
  },
  cancelText: {
    color: ThemeColors.textMuted,
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,
  },
});
