import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar'

const User = ({ navigation }) => {

  const [is_user, setIsUser] = useState()

  useEffect(async () => {
    try {
      const value = await AsyncStorage.getItem('user')

      setIsUser(value)
    } catch (error) {
      console.log(error)
    }
  }, [])


  /*   */
  const logout = async () => {
    try {
      Alert.alert(
        "Вы точно хотите выйти с сессий",
        "Это действие навсегда удалит ваши данные!",
        [
          {
            text: "Отмена",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "Выйти", onPress: async () => {
              await AsyncStorage.clear()
              navigation.navigate('Secure')
            }
          }
        ]
      );

    } catch (error) {
      console.log(error)
    }
  }



  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.box}>
        <View style={styles.center}>
          <View style={styles.banner}>
            <EvilIcons name="user" size={140} color="#16161A" />
            <Text style={styles.name}>{is_user}</Text>
          </View>
        </View>
      </View>
      <View style={styles.center}>
        <View style={styles.btn}>
          <TouchableOpacity onPress={() => { logout() }} style={styles.btn_primary} activeOpacity={0.7}>
            <Text style={styles.btn_text}>Покинуть сессию</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222831',
    flex: 1
  },
  box: {
    marginBottom: 22,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    width: '100%',
    paddingTop: 59,
    paddingBottom: 30,
    backgroundColor: '#eaeded',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    position: 'relative',
    zIndex: 3,
  },
  btn_primary: {
    width: 207,
    height: 44,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#FF4C29',
    borderRadius: 10,
    zIndex: 6
  },
  btn_text: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '300',
  },
  name: {
    fontSize: 20
  }
})

export default User;
