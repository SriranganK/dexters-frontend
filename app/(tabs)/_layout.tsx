import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          // ✅ Hide bottom tab bar on this screen
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile' }}
      />
      {/* Add more tabs here if needed */}
    </Tabs>
  );
}
