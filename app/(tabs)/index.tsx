import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Flame, Crown } from 'lucide-react-native';
import { ThemeColors } from '../../constants/Colors';
import { CATEGORIES, Template } from '../../constants/mockData';
import { fetchTemplates } from '../../services/templateService';
import { GreetingCard } from '../../components/GreetingCard';
import { CategoryPill } from '../../components/CategoryPill';
import { PremiumModal } from '../../components/PremiumModal';
import { useUserStore } from '../../store/userStore';

export default function HomeScreen() {
  const router = useRouter();
  const { name, isPremium, setProfile } = useUserStore();
  const [activeCategory, setActiveCategory] = useState('all');
  const [modalVisible, setModalVisible] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const loadData = async () => {
      const data = await fetchTemplates();
      setTemplates(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredTemplates = useMemo(() => {
    if (activeCategory === 'all') return templates;
    return templates.filter(t => t.categoryId === activeCategory);
  }, [activeCategory, templates]);

  const handlePress = (template: any) => {
    if (template.isPremium && !isPremium) {
      setModalVisible(true);
    } else {
      router.push(`/card/${template.id}`);
    }
  };

  const handleSubscribe = () => {
     setProfile({ isPremium: true });
     setModalVisible(false);
     alert('Premium Activated! (Demo)');
  };

  const renderHeader = () => (
    <View style={styles.headerWrapper}>
       <View style={styles.sectionHeader}>
          <Flame color={ThemeColors.accent} fill={ThemeColors.accent} size={18} style={{ marginRight: 6 }} />
          <Text style={styles.sectionTitle}>Trending for Today</Text>
       </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerWrapper}>
        {/* Top bar */}
        <View style={styles.topBar}>
           <View>
             <Text style={styles.greeting}>
               Namaste, <Text style={{ color: ThemeColors.accent }}>{name.split(' ')[0]}</Text>
             </Text>
             <Text style={styles.subtext}>Spread joy today ✨</Text>
           </View>
           <View>
              {isPremium ? (
                 <View style={styles.proBadge}>
                   <Crown size={12} color="#FFF" fill="#FFF" style={{ marginRight: 4 }} />
                   <Text style={styles.proText}>PRO</Text>
                 </View>
              ) : (
                 <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.upgradeBtn}>
                    <Crown size={12} color={ThemeColors.accent} style={{ marginRight: 4 }} />
                    <Text style={styles.upgradeText}>Upgrade</Text>
                 </TouchableOpacity>
              )}
           </View>
        </View>

        {/* Categories */}
        <View style={styles.filterContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pillScroll}
          >
            {CATEGORIES.map(cat => (
              <CategoryPill
                key={cat.id}
                label={cat.label}
                emoji={cat.emoji}
                isActive={activeCategory === cat.id}
                onPress={() => setActiveCategory(cat.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Grid */}
        {loading ? (
          <ActivityIndicator size="large" color={ThemeColors.accent} style={{ marginTop: 40 }} />
        ) : (
          <FlatList
            data={filteredTemplates}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.gridContent}
            ListHeaderComponent={renderHeader}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <GreetingCard
                template={item}
                onPress={() => handlePress(item)}
              />
            )}
          />
        )}
      </View>

      <PremiumModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubscribe={handleSubscribe}
      />
    </SafeAreaView>
  );
}

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
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  greeting: {
    fontSize: 22,
    fontFamily: 'Syne_700Bold',
    color: ThemeColors.text,
  },
  subtext: {
    fontSize: 13,
    color: ThemeColors.textMuted,
    fontFamily: 'DMSans_400Regular',
    marginTop: 2,
  },
  proBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ThemeColors.accentGold,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
  },
  proText: {
    color: '#FFF',
    fontFamily: 'Syne_700Bold',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  upgradeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,107,53,0.1)',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(255,107,53,0.25)',
  },
  upgradeText: {
    color: ThemeColors.accent,
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
  },
  filterContainer: {
    marginBottom: 12,
  },
  pillScroll: {
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  gridContent: {
    paddingHorizontal: 12,
    paddingBottom: 40,
  },
  headerWrapper: {
    paddingHorizontal: 8,
    marginBottom: 16,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Syne_700Bold',
    color: ThemeColors.text,
    letterSpacing: 0.2,
  }
});
