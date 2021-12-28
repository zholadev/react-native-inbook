import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SecureScreen from './src/screens/SecureScreen'
import HomeScreen from './src/screens/HomeScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MaterialIcons } from '@expo/vector-icons'
import Create from './src/screens/Create'
import { Ionicons } from '@expo/vector-icons'
import User from './src/screens/User'
import { Feather } from '@expo/vector-icons'
import Detail from './src/screens/Detail'
import Provider from './src/context/Provider'

/* Navigate */
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

export default function App() {
  const TabStack = createBottomTabNavigator()
  const RootStack = createStackNavigator()

  function Home() {
    return (
      <TabStack.Navigator
        initialRouteName={'Home'}
        tabBarOptions={{
          showLabel: false,
          activeTintColor: '#595B83',
          inactiveTintColor: '#333456',
          activeBackgroundColor: '#16161A',
          inactiveBackgroundColor: '#222831',
        }}
      >
        <TabStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: (tabinfo) => (
              <MaterialIcons name="home" size={32} color={tabinfo.color} />
            ),

          }}
        />
        <TabStack.Screen
          name="Create"
          component={Create}
          options={{
            tabBarIcon: (tabinfo) => (
              <Ionicons name="add" size={32} color={tabinfo.color} />
            ),
          }}
        />
        <TabStack.Screen
          name="Profile"
          component={User}
          options={{
            tabBarIcon: (tabinfo) => (
              <Feather name="user" size={32} color={tabinfo.color} />
            ),
          }}
        />
      </TabStack.Navigator>
    )
  }

  const [user, setUser] = useState(false)

  useEffect(async () => {
    const is_user = await AsyncStorage.getItem('user')

    if (is_user) {
      setUser(true)
    } else {
      setUser(false)
    }
  }, [])

  return (
    <NavigationContainer>
      <Provider>
        <RootStack.Navigator headerMode={false}>
          <>
            <RootStack.Screen name="Secure" component={SecureScreen} />
            <RootStack.Screen name="Home" component={Home} />
            <RootStack.Screen name="Detail" component={Detail} />
          </>
        </RootStack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
