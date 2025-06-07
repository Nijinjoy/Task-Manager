import { View, Text, StyleSheet, Image, SectionList, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import HeaderComponent from '../../components/HeaderComponent';

const sections = [
  {
    title: "Account",
    data: [
      { 
        id: '1', 
        title: "View Completed Tasks", 
        icon: "checkmark-done-outline",
        onPress: () => console.log("View Completed Tasks")
      },
      { 
        id: '2', 
        title: "Settings", 
        icon: "settings-outline",
        onPress: () => console.log("Settings")
      }
    ]
  },
  {
    title: "Profile",
    data: [
      { 
        id: '3', 
        title: "Update Profile Information", 
        icon: "person-outline",
        onPress: () => console.log("Personal Info")
      },
      { 
        id: '4', 
        title: "Change Profile Picture", 
        icon: "lock-closed-outline",
        onPress: () => console.log("Security")
      },
      { 
        id: '5', 
        title: "Notification Preferences", 
        icon: "notifications-outline",
        onPress: () => console.log("Notifications")
      },
    ]
  }
];

const ProfileScreen = () => {
  const navigation = useNavigation();

  const user = {
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    avatar: { uri: 'https://www.gstatic.com/webp/gallery/1.jpg' }
  };

  return (
    <View style={styles.container}>
      <HeaderComponent
      title="My Dashboard"
      leftIcon={<Icon name="menu" size={24} color="#000" />}
      rightIcon={<Icon name="log-out-outline" size={24} color="#000" />}
      onLeftPress={() => navigation.openDrawer()}
      onRightPress={() => console.log('Logout')}
    />
      <View style={styles.profileHeader}>
      <Image 
  source={{ uri: 'https://www.gstatic.com/webp/gallery/1.jpg' }} 
  style={styles.avatar}
/>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.listItem} 
            onPress={item.onPress}
          >
            <Ionicons name={item.icon} size={24} color="#4361ee" />
            <Text style={styles.itemText}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // ✅ full white background
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#333',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  itemText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginLeft: 56,
  },
  sectionSeparator: {
    height: 16,
  },
});

export default ProfileScreen;
