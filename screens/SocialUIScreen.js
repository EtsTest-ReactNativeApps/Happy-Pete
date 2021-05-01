import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import { Feather as Icon, FontAwesome as FAIcon } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Fonts
import { useFonts } from 'expo-font';
// import NSLight from '../../assets/fonts/NunitoSans/NunitoSansLight.ttf';
// import NSRegular from '../../assets/fonts/NunitoSans/NunitoSansRegular.ttf';
// import NSBold from '../../assets/fonts/NunitoSans/NunitoSansBold.ttf';
// import NSExtraBold from '../../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf';
import Axios from 'axios';

function SocialUI() {
  // const [loaded] = useFonts({
  //   NSLight,
  //   NSRegular,
  //   NSBold,
  //   NSExtraBold,
  // });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    Axios.get('https://randomuser.me/api/?results=10').then(({ data }) =>
      setUsers(data.results)
    );
  }, []);



  function Post({ user, index }) {
    return (
      <View>
        <View style={styles.post}>
          {/* Post Header */}
          <View style={styles.postHeader}>
            <Image
              style={{ width: 50, height: 50, borderRadius: 100 }}
              source={{ uri: user?.picture.medium }}
            />
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
              <Text style={{  fontSize: 18 }}>
                {user?.name.first} {user?.name.last}
              </Text>
              <Text style={{ }}>
                {user?.login.username} | {user?.location.city},{' '}
                {user?.location.country}
              </Text>
            </View>
            <TouchableOpacity style={{ paddingHorizontal: 6 }}>
              <Icon name='more-horizontal' size={24} />
            </TouchableOpacity>
          </View>
          {/* Post Content */}
          <View style={{ paddingHorizontal: 6 }}>
            {/* Post Content Text */}
            <Text style={{ }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Exercitationem.
            </Text>
            {/* Post Content Image */}
            <Image
              style={styles.postContentImage}
              source={{
                // uri: images[index]?.download_url,
                uri: `https://picsum.photos/500/500?random=${index + 1}`,
              }}
            />
          </View>
          {/* Interactions Bar */}
          <View style={styles.interactionBar}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FAIcon name='thumbs-up' size={18} color='#eb3b5a' />
              <Text style={styles.interactionText}>104 Likes</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.interactionText}>23 comments</Text>
              <Text style={styles.interactionText}>5 shares</Text>
            </View>
          </View>
          {/* Interacts Button */}
          <View
            style={{ flexDirection: 'row', marginTop: 10, marginBottom: 4 }}
          >
            <TouchableOpacity style={styles.interactionButton}>
              <Icon name='thumbs-up' size={24} />
              <Text style={{ marginLeft: 6,  }}>
                Like
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.interactionButton}>
              <Icon name='message-square' size={24} />
              <Text style={{ marginLeft: 6, }}>
                Comment
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.interactionButton}>
              <Icon name='share-2' size={24} />
              <Text style={{ marginLeft: 6, }}>
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Header */}
        <View style={{ paddingHorizontal: 10 }}>
          <View
            style={{
              height: 40,
              backgroundColor: '#f1f3f6',
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 8,
              //   borderColor: '#c1c1c1',
              // borderWidth: 0.3,
            }}
          >
            <TextInput
              style={{
                flex: 1,
                height: 40,
                paddingHorizontal: 10,
              }}
              placeholder='Search'
            />
            <TouchableOpacity style={{ paddingRight: 10 }}>
              <Icon name='search' size={22} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Stories View */}
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontSize: 30,
              paddingHorizontal: 10,
            }}
          >
            Stories
          </Text>
          <View style={{ marginTop: 10, paddingLeft: 10 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                style={{
                  //   borderRightColor: '#d1d8e0',
                  //   borderRightWidth: 2,
                  paddingRight: 6,
                }}
              >
                <Image
                  source={{
                    uri: 'https://randomuser.me/api/portraits/men/86.jpg',
                  }}
                  style={{ width: 60, height: 60, borderRadius: 100 }}
                />
                <Icon
                  name='plus-circle'
                  color='#000'
                  size={20}
                  style={{ position: 'absolute', right: 5, bottom: -2 }}
                />
              </TouchableOpacity>
              {users.map((user, index) => (
                <TouchableOpacity
                  style={{
                    marginLeft: index === 0 ? 10 : 0,
                    marginRight: 10,
                  }}
                >
                  <Image
                    source={{ uri: user?.picture?.medium }}
                    style={{ width: 60, height: 60, borderRadius: 100 }}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
        {/* Posts */}
        <View style={{ paddingHorizontal: 10 }}>
          {users.map((user, index) => (
            <Post user={user} index={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function Explore() {
  return (
    <View style={{ ...styles.container }}>
      <Text
        style={{
          color: '#000',
          paddingHorizontal: 10,
          fontSize: 30,
        }}
      >
        Explore
      </Text>
    </View>
  );
}

function Chats() {
  return (
    <View style={{ ...styles.container }}>
      <Text
        style={{
          color: '#000',
          paddingHorizontal: 10,
          fontSize: 30,
        }}
      >
        Chats
      </Text>
    </View>
  );
}

function Notifications() {
  return (
    <View style={{ ...styles.container }}>
      <Text
        style={{
          color: '#000',
          paddingHorizontal: 10,
          fontSize: 30,
        }}
      >
        Notifications
      </Text>
    </View>
  );
}

function Settings() {
  return (
    <View style={{ ...styles.container }}>
      <Text
        style={{
          color: '#000',
          paddingHorizontal: 10,
          fontSize: 30,
        }}
      >
        Settings
      </Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
export default function SocialUI2() {
  StatusBar.setBarStyle('dark-content');
  return (
      <NavigationContainer>

      <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#eb3b5a',
      }}
    >

      <Tab.Screen
        name='Explore'
        component={Explore}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='search' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Chats'
        component={Chats}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='message-circle' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Notifications'
        component={Notifications}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='bell' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Settings'
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='settings' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
    paddingTop: 40,
  },
  post: {
    borderWidth: 1.2,
    borderColor: '#dfe4ea',
    borderRadius: 4,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  postHeader: { padding: 6, flexDirection: 'row', alignItems: 'center' },
  postContentImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginTop: 10,
  },
  interactionBar: {
    backgroundColor: '#fafafa',
    height: 40,
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  interactionText: {
    color: '#000',
    marginLeft: 4,
  },
  interactionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
});
