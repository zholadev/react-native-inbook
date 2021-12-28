import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView
} from 'react-native'
import constants from './../constants/helpers';
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../context/Provider';

const HomeScreen = ({ navigation }) => {

  const { notes, setNotes, findNotes } = useNotes();
  const [is_user, setIsUser] = useState()

  useEffect(async () => {
    try {
      const value = await AsyncStorage.getItem('user')
      setIsUser(value)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const Card = ({ title, pages, ready, id, date }) => {
    return (
      <View style={styles.container_card}>
        <View style={styles.box_mb}>
          <Text style={styles.title_card}>{title}</Text>
          <View style={styles.line}></View>
        </View>
        <View>
          <Text style={styles.subtitle}>Общее количество страниц: {pages}</Text>
          <Text style={styles.subtitle}>Прочитанные: {ready}</Text>
          <Text style={styles.subtitle}>Осталось: {pages - ready}</Text>
        </View>

        <View>
          {
            pages - ready === 0 ? <Text style={styles.end}>Вы прочитали эту книгу!</Text> : null
          }
        </View>
        <View>
          {
            pages - ready !== 0 ? <Text style={styles.start}>Вы читаете эту книгу!</Text> : null
          }
        </View>

        <View style={styles.flex}>


          <TouchableOpacity style={styles.btn_view} onPress={() => {
            navigation.navigate('Detail', {
              id: id,
              title: title,
              pages: pages,
              ready: ready,
              date: date
            });
          }}>
            <Text style={styles.btn_view_text}>Подробнее...</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const renderItem = ({ item }) => {

    return (
      <View style={styles.box_fluid}>
        <Card title={item.title} id={item.id} pages={item.pages} date={item.date} ready={item.ready} />
      </View>
    )
  }

  const TitleSection = () => {
    return (
      <View style={styles.box}>
        <View style={styles.logo}>
          <Image
            source={constants.icons.logo_primary}
            resizeMode="cover"
            alt="logo"
          />
          <Text style={styles.logo_text}>Оқы</Text>
        </View>
        <View style={styles.welcome}>
          <Text style={styles.title}>{`Ваш план`}</Text>
          <Text style={styles.name}>{`${is_user}`}</Text>
          <View style={styles.divide}></View>
        </View>
      </View>
    )
  }

  const ListSection = () => {
    return (
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        key={item => item.id}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <TitleSection />
      <ListSection />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222831',
    flex: 1
  },
  box: {
    marginTop: 59,
    marginBottom: 22,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 7,
    paddingHorizontal: 17,
  },
  end: {
    color: '#3498DB'
  },
  start: {
    color: '#E74C3C'
  },
  name: {
    fontSize: 16,
    fontWeight: '300',
    color: '#A2A1A6',
    marginBottom: 7,
    paddingHorizontal: 17,
  },
  divide: {
    backgroundColor: '#FF5470',
    width: '100%',
    maxWidth: 256,
    height: 2,
    marginBottom: 34,
  },
  logo: {
    paddingHorizontal: 17,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30
  },
  logo_text: {
    color: '#fff',
    fontSize: 24,
    marginLeft: 7,
    fontWeight: '300'
  },
  welcome: {
    width: '100%'
  },
  img: {
    width: 50,
    height: 50
  },
  box_fluid: {
    paddingHorizontal: 17,
    display: 'flex',
    justifyContent: "center",
    alignItems: "center"
  },
  container_card: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: "#DECE9C",
    borderRadius: 18,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    padding: 10

  },
  title_card: {
    fontSize: 20,
    color: '#222831',
    fontWeight: '700'
  },
  box_mb: {
    marginBottom: 10
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#000'
  },
  subtitle: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 7
  },
  flex: {
    width: "100%",
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: "flex-end"
  },
  btn_view: {
    width: '100%',
    maxWidth: 130,
    backgroundColor: "#00EBC7",
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 7,
    display: 'flex',
    justifyContent: 'center',
    alignItems: "center"
  },
  btn_view_text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: 'bold'
  }
})

export default HomeScreen;
