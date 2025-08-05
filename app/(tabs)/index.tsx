import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Animated,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { RefreshControl } from 'react-native-gesture-handler';

const courses = [
  {
    id: '1',
    category: 'Tech & Software',
    title: 'Designing Seamless User Experiences',
    rating: 3.5,
    progress: 20,
    time: '5 Min',
    participants: [],
    color: '#D7EFE9',
  },
  {
    id: '2',
    category: 'Data Analysis',
    title: 'Effective Analytics Software Solutions',
    rating: 3.2,
    progress: 60,
    time: '50 Min',
    participants: [],
    color: '#E6DDF6',
  },
];


export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [courseData, setCourseData] = useState<any>([]);
  const animatedProgress = useRef<any>([]).current;

  // Simulate fetching course data (e.g. from API)
  const fetchCourses = () => {
    const newCourses = [
      {
        id: '1',
        category: 'Tech & Software',
        title: 'Designing Seamless User Experiences',
        rating: 3.5,
        progress: Math.floor(Math.random() * 100), // Random for demo
        time: '5 Min',
        participants: [],
        color: '#D7EFE9',
      },
      {
        id: '2',
        category: 'Data Analysis',
        title: 'Effective Analytics Software Solutions',
        rating: 3.2,
        progress: Math.floor(Math.random() * 100), // Random for demo
        time: '50 Min',
        participants: [],
        color: '#E6DDF6',
      },
    ];

    setCourseData(newCourses);
    // Reset animation values
    animatedProgress.length = 0;
    newCourses.forEach((_, i) => {
      animatedProgress[i] = new Animated.Value(0);
    });

    // Start animations again
    newCourses.forEach((course, index) => {
      Animated.timing(animatedProgress[index], {
        toValue: course.progress,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    });
  };

  useEffect(() => {
    fetchCourses(); // initial load
  }, []);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      fetchCourses(); // re-fetch or refresh data
      setRefreshing(false);
    }, 1000);
  };


  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <View style={styles.header}>
        <Pressable onPress={() => setMenuVisible(!menuVisible)}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
            style={styles.avatar}
          />
        </Pressable>
        {menuVisible && (
          <View style={styles.dropdownMenu}>
            <Pressable onPress={() => {
              console.log("User logged out");
              router.replace('/(auth)/login');
              setMenuVisible(false);
            }}>
              <Text style={styles.menuItem}>Logout</Text>
            </Pressable>
          </View>
        )}

        <View style={{ flex: 1 }}>
          <Text style={styles.helloText}>Hello Alex</Text>
          <View style={styles.progressBarWrapper}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: '60%' }]} />
            </View>
          </View>
        </View>
        <Ionicons name="notifications-outline" size={24} color="#000" />
      </View>

      <View style={styles.topSection}>
        <Text style={styles.findTitle}>Find your favorite{'\n'}course</Text>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color="#999" />
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchText}
            placeholder="Search for courses..."
            placeholderTextColor="#aaa"
          />
        </View>

        <View style={styles.topCategoryHeader}>
          <Text style={styles.categoryTitle}>Top Category</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { title: 'UI/UX Design', bg: '#F9F4E8' },
            { title: 'Graphic Design', bg: '#E6F6F0' },
            { title: 'Digital Marketing', bg: '#F5F9E8' },
          ].map((item, idx) => (
            <View key={idx} style={[styles.categoryCard, { backgroundColor: item.bg }]}>
              <Ionicons name="color-palette-outline" size={24} color="#333" />
              <Text style={styles.categoryText}>{item.title}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <Text style={styles.sectionTitle}>Your Progress Today</Text>

      {courseData.map((course:any, index:any)  => (
        <View key={course.id} style={[styles.card, { backgroundColor: course.color }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="desktop-outline" size={20} color="#555" />
            <Text style={styles.ratingText}>{course.rating}</Text>
          </View>

          <Text style={styles.category}>{course.category}</Text>
          <Text style={styles.title}>{course.title}</Text>
          <Text style={styles.subtitle}>Progress: {course.progress}%</Text>

          {/* Footer progress bar */}
          <View style={styles.cardBottomRow}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <View style={styles.progressFooter}>
                <Animated.View
                  style={[
                    styles.progressInfo,
                    {
                      width: animatedProgress[index].interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%'],
                      }),
                      backgroundColor: '#2E7D75',
                      paddingHorizontal: 10,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.progressLabel,
                      {
                        fontSize: course.progress < 30 ? 11 : 13, // smaller font if too small
                      },
                    ]}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  >
                    Progress
                  </Text>

                  <View style={styles.progressTimeRow}>
                    <Ionicons name="time-outline" size={14} color="#fff" />
                    <Text
                      style={[
                        styles.progressTime,
                        {
                          fontSize: course.progress < 30 ? 11 : 13,
                        },
                      ]}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                    >
                      {course.time}
                    </Text>
                  </View>
                </Animated.View>

                <View style={styles.progressPattern} />
              </View>
            </View>

            <Pressable style={styles.arrowButton}>
              <Ionicons name="arrow-forward" size={20} color="#6D59D3" />
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: 100 },
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20, backgroundColor: '#F7F7F7' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  helloText: { fontSize: 18, fontWeight: '600', marginBottom: 6 },
  progressBarWrapper: { height: 6, backgroundColor: '#eee', borderRadius: 4, overflow: 'hidden', marginBottom: 12 },
  progressBarBackground: { height: 6, backgroundColor: '#eee', borderRadius: 4 },
  progressBarFill: { height: 6, backgroundColor: '#6D59D3' },
  sectionTitle: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  topSection: { marginBottom: 30 },
  findTitle: { fontSize: 24, fontWeight: '700', marginBottom: 16, color: '#000' },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12,
    borderRadius: 14, borderWidth: 1, borderColor: '#eee', marginBottom: 20,
  },
  searchText: { marginLeft: 10, color: '#aaa', fontSize: 16 },
  topCategoryHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  categoryTitle: { fontSize: 16, fontWeight: '600' },
  seeAll: { fontSize: 14, color: '#888' },
  categoryCard: {
    paddingVertical: 16, paddingHorizontal: 20, borderRadius: 18, marginRight: 12,
    alignItems: 'center', justifyContent: 'center', width: 120,
  },
  categoryText: { marginTop: 10, fontSize: 14, fontWeight: '500', textAlign: 'center' },
  card: {
    borderRadius: 20, padding: 20, marginBottom: 20, minHeight: 180,
    justifyContent: 'space-between',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  ratingText: {
    backgroundColor: '#fff', paddingHorizontal: 8, paddingVertical: 2,
    borderRadius: 8, fontSize: 14,
  },
  category: { fontSize: 13, color: '#777', marginBottom: 4 },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 6, lineHeight: 22 },
  subtitle: { fontSize: 13, color: '#666', marginBottom: 12 },
  cardBottomRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  progressFooter: {
    flexDirection: 'row', overflow: 'hidden',
    borderBottomLeftRadius: 20, borderBottomRightRadius: 20, height: 50, width: '100%',
    backgroundColor: '#eee',
  },
  progressInfo: {
    padding: 12, justifyContent: 'center',
    borderBottomLeftRadius: 20, height: '100%',
  },
  progressLabel: { color: '#fff', fontWeight: '600', fontSize: 13, marginBottom: 4 },
  progressTimeRow: { flexDirection: 'row', alignItems: 'center' },
  progressTime: { color: '#fff', fontSize: 13, marginLeft: 6 },
  progressPattern: { flex: 1, backgroundColor: 'transparent' },
  arrowButton: {
    backgroundColor: '#fff', width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#ccc',
  },
  dropdownMenu: {
    position: 'absolute', top: 70, left: 20, backgroundColor: '#fff',
    paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, shadowRadius: 4, elevation: 5, zIndex: 1000,
  },
  menuItem: { fontSize: 16, color: '#333', paddingVertical: 8 },
});
