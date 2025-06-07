import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SectionList,
  StatusBar,
  Platform,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

const DrawerScreen = (props: any) => {
  const sections = [
    {
      title: 'Account',
      data: [
        { label: 'Profile', icon: 'person-outline' },
        { label: 'Notifications', icon: 'notifications-outline' },
      ],
    },
    {
      title: 'Settings',
      data: [
        { label: 'Theme', icon: 'color-palette-outline' },
        { label: 'Privacy', icon: 'lock-closed-outline' },
        { label: 'Security', icon: 'shield-checkmark-outline' },
      ],
    },
    {
      title: 'Support',
      data: [
        { label: 'FAQ', icon: 'help-circle-outline' },
        { label: 'Contact Us', icon: 'mail-outline' },
      ],
    },
  ];

  const handleItemPress = (item: any) => {
    console.log(`${item.label} pressed`);
    props.navigation.closeDrawer();
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#6c5ce7" barStyle="light-content" translucent />
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: 'https://www.gstatic.com/webp/gallery/1.jpg' }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>Nijin Joy</Text>
          <Text style={styles.email}>reactnative@dev.com</Text>
        </View>
      </View>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerScroll}
      >
        <View style={styles.sectionListContainer}>
          <SectionList
            sections={sections}
            keyExtractor={(item, index) => item.label + index}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleItemPress(item)}
                style={styles.sectionItem}
              >
                <Icon name={item.icon} size={20} color="#6c5ce7" />
                <Text style={styles.itemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
          />
        </View>
      </DrawerContentScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            console.log('Logout pressed');
            props.navigation.closeDrawer();
          }}
          style={styles.footerItem}
        >
          <Icon name="log-out-outline" size={22} color="#6c5ce7" />
          <Text style={styles.footerText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrawerScreen;

const STATUSBAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44;

const styles = StyleSheet.create({
  headerContainer: {
    height: 180,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: STATUSBAR_HEIGHT + 10,
    paddingHorizontal: 16,
    backgroundColor: '#6c5ce7',
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
  },
  userInfo: {
    marginLeft: 16,
  },
  username: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    color: '#e0e0e0',
    fontSize: 14,
    marginTop: 4,
  },
  drawerScroll: {
    backgroundColor: '#fff',
  },
  sectionListContainer: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6c5ce7',
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#6c5ce7',
  },
});
