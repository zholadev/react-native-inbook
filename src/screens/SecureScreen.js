import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import constants from './../constants/helpers'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'

const SecureScreen = ({ navigation }) => {
  const [user, setUser] = useState(false)
  const [user_name, setNameUser] = useState()

  useEffect(async () => {
    const is_user = await AsyncStorage.getItem('user')

    if (is_user) {
      setUser(true)
      setNameUser(is_user)
    } else {
      setUser(false)
    }
  }, [])


  const LogoSection = () => {
    return (
      <View style={styles.logo}>
        <Image
          source={constants.icons.logo_primary}
          resizeMode="cover"
          alt="logo"
        />
        <Text style={styles.logo_text}>Оқы</Text>
      </View>
    )
  }

  const FormSection = () => {
    return (
      <View style={styles.form}>
        {user ? (
          <>
            <Text style={styles.title}>Добро пожаловать!</Text>
            <Text style={styles.sub_title}>
              Это приложение который поможет тебе:
            </Text>
            <Text style={styles.text}>
              - Анализировать прочитанное тобой книги;
            </Text>
            <Text style={styles.text}>

              - Помочь прочитать книги за выбранное тобой время;
            </Text>
            <Text style={styles.text}>
              - Читать разные жанры книг на разныч языках и многое другое;
            </Text>
          </>

        ) : (
          <>
            <Text style={styles.title}>Добро пожаловать!</Text>
            <Text style={styles.sub_title}>
              Это приложение который поможет тебе:
            </Text>
            <Text style={styles.text}>
              - Анализировать прочитанное тобой книги;
            </Text>
            <Text style={styles.text}>

              - Помочь прочитать книги за выбранное тобой время;
            </Text>
            <Text style={styles.text}>
              - Читать разные жанры книг на разныч языках и многое другое;
            </Text>
          </>
        )}
        <View style={styles.divide}></View>

        {user ? (
          <Text style={styles.title}>{user_name}</Text>
        ) : (
          <View>
            <Text style={styles.sub_title}>
              Как тебя зовут?
            </Text>
            <Formik
              initialValues={{ name: '' }}
              onSubmit={async (value) => {
                try {
                  await AsyncStorage.setItem('user', value.name)
                  navigation.navigate('Home')
                  setUser('')
                } catch (error) {
                  alert('Произошла ошибка! Повторите попытку позже!')
                }
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <>
                  <View style={styles.center}>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                    />
                  </View>
                  <View style={styles.btn}>
                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={styles.btn_primary}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.btn_text}>Начать!</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
          </View>
        )}
      </View>
    )
  }

  const Footer = () => {
    return (
      <View style={styles.footer}>
        {user ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home')
            }}
            style={styles.btn_primary}
            activeOpacity={0.7}
          >
            <Text style={styles.btn_text}>Продолжить</Text>
          </TouchableOpacity>
        ) : (
          (
            <View style={styles.btn}>

            </View>
          )
        )}
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <LogoSection />
      <FormSection />
      <Footer />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222831',
    flex: 1,
  },
  logo: {
    marginTop: 59,
    marginBottom: 72,
    paddingHorizontal: 17,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo_text: {
    color: '#fff',
    fontSize: 24,
    marginLeft: 7,
    fontWeight: '300'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 7,
    paddingHorizontal: 17,
  },
  sub_title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 17,
    paddingHorizontal: 17,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 17,
    paddingHorizontal: 17,
  },
  divide: {
    backgroundColor: '#FF5470',
    width: '100%',
    maxWidth: 256,
    height: 4,
    marginBottom: 34,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: 17,
    width: '100%',
    maxWidth: 370,
    height: 43,
    backgroundColor: '#fff',
    borderWidth: 1,
    marginBottom: 100
  },
  form: {
    marginBottom: '20%',
  },
  footer: {
    paddingHorizontal: 0,
  },
  btn: {
    position: 'relative',
    zIndex: 3,
  },
  btn_primary: {
    width: 207,
    height: 44,
    left: 17,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#FF4C29',
    borderRadius: 10,
    zIndex: 6,
  },
  btn_text: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
})

export default SecureScreen
