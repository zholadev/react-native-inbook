import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import constants from './../constants/helpers';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../context/Provider';
import { Formik } from 'formik';

const Create = ({ navigation }) => {

  const { notes, setNotes } = useNotes();


  const LogoSection = () => {
    return (
      <View style={styles.logo}>
        <Image
          source={constants.icons.logo_dark}
          resizeMode="cover"
          alt="logo"
        />
      </View>
    )
  }

  const FormSection = () => {
    return (
      <View style={styles.container_fluid}>
        <Text style={styles.heading}>Создайте цель заполнив форму</Text>

        <Formik
          initialValues={{ pages: '', title: '' }}
          onSubmit={async (values) => {
            const note = { id: Math.floor(Math.random() * 10000), title: values.title, pages: values.pages, ready: 0 }
            const updateNotes = [...notes, note]
            setNotes(updateNotes)
            await AsyncStorage.setItem('notes', JSON.stringify(updateNotes));
            navigation.navigate('Home')
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <View style={styles.form_box}>
                <Text style={styles.label}>Название книги</Text>
                <TextInput style={styles.input} onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  value={values.title} />
              </View>
              <View style={styles.form_box}>
                <Text style={styles.label}>Общая стр книги</Text>
                <TextInput style={styles.input} keyboardType="numeric" onChangeText={handleChange('pages')}
                  onBlur={handleBlur('pages')}
                  value={values.pages} />
              </View>

              <View style={styles.btn_box}>
                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                  <Text style={styles.btn_text}>Создать</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <LogoSection />
      <FormSection />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222831',
    flex: 1
  },
  logo: {
    paddingTop: 59,
    paddingBottom: 32,
    marginBottom: 30,
    paddingHorizontal: 17,
    backgroundColor: '#EEEEEE'
  },
  container_fluid: {
    paddingHorizontal: 17
  },
  heading: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 30
  },
  form_box: {
    marginTop: 15
  },
  label: {
    fontSize: 16,
    color: '#DDDDDD',
    marginBottom: 7
  },
  input: {
    borderColor: '#fff',
    borderWidth: 1,
    height: 40,
    borderRadius: 4,
    color: '#fff',
    paddingHorizontal: 10
  },
  btn_box: {
    width: '100%',
    marginTop: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: "100%",
    maxWidth: 220,
    height: 44,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#FF4C29',
    borderRadius: 10,
    zIndex: 6,
  },
  btn_text: {
    color: '#fff',
    fontWeight: '600'
  }
})

export default Create;
