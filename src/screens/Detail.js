import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native'
import constants from '../constants/helpers'
import { useNotes } from '../context/Provider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import { Formik } from 'formik'
import { VictoryPie } from 'victory-native'

const Detail = ({ route, navigation }) => {
  const { id, pages, title, ready } = route.params
  const { setNotes } = useNotes()
  const [tabs, setTabs] = useState('chart')

  const other = pages - ready
  const chartReady = ready

  const notesData = [
    { x: 'Осталось', y: other },
    { x: 'Прочитанное', y: chartReady }
  ]

  const colorCharts = ['#3498DB', '#88F7E2']

  const dateNow = Date.now()

  const currentDate = moment(dateNow).format('DD-MM-YYYY')

  const deleteNote = async () => {
    const result = await AsyncStorage.getItem('notes')
    let notes = []
    if (result !== null) notes = JSON.parse(result)

    const newNotes = notes.filter((n) => n.id !== id)
    setNotes(newNotes)
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes))
    navigation.goBack()
  }

  const displayDeleteAlert = () => {
    Alert.alert(
      'Вы точно хотите удалить?',
      'Это действие навсегда удалит вашу заметку!',
      [
        {
          text: 'Отмена',
          onPress: () => console.log('no thanks'),
        },
        {
          text: 'Удалить',
          onPress: deleteNote,
        },
      ],
      {
        cancelable: true,
      }
    )
  }

  const resetNotes = async () => {
    const result = await AsyncStorage.getItem('notes')
    let notes = []
    if (result !== null) {
      notes = JSON.parse(result)
    }

    const newNotes = notes.filter((n) => {
      if (n.id === id) {
        n.ready = 0
      }
      return n
    })

    setNotes(newNotes)
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes))

    navigation.navigate('Home')
  }

  const TodaySection = () => {
    return (
      <View style={styles.title_box}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.calendar}>
          <Image
            source={constants.icons.calendar}
            resizeMode="cover"
            style={styles.img_calendar}
          />
          <View>
            <Text style={styles.date}>{currentDate} год</Text>
            <View style={styles.line}></View>
            <Text style={styles.subtitle}>
              Осталось для прочтения {pages - ready}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  const StaticSection = () => {
    return (
      <View style={styles.container_box}>
        <View style={styles.header}>
          <Text style={styles.header_title}>Статистика</Text>

          <View style={styles.tab_select}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setTabs('chart')}
              style={tabs === 'chart' ? styles.tab_btn_active : styles.tab_btn}
            >
              <Image source={constants.icons.chart} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setTabs('edit')}
              style={tabs === 'edit' ? styles.tab_btn_active : styles.tab_btn}
            >
              <Image source={constants.icons.list} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  const Info = () => {
    return (
      <View style={styles.container_card}>
        <View style={styles.center}>
          <VictoryPie
            data={notesData}
            animate={{
              duration: 2000,
            }}
            labels={({ datum }) => `${datum.x}: ${datum.y} `}
            width={350}
            height={350}
            colorScale={colorCharts}
          />
        </View>
      </View>
    )
  }
  const Edit = () => {
    return (
      <View style={styles.container_card}>
        <Formik
          initialValues={{ readys: '' }}
          onSubmit={async (values) => {
            const result = await AsyncStorage.getItem('notes')
            let notes = []
            if (result !== null) {
              notes = JSON.parse(result)
            }

            const newNotes = notes.filter((n) => {
              if (n.id === id) {
                n.ready = Number(n.ready) + Number(values.readys)
              }
              return n
            })

            setNotes(newNotes)
            await AsyncStorage.setItem('notes', JSON.stringify(newNotes))

            navigation.navigate('Home')
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              {pages - ready === 0 ? (
                <View style={styles.flex_column}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.btn_delete}
                    onPress={displayDeleteAlert}
                  >
                    <Text style={styles.btn_text_light}>Удалить</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.btn_edit}
                    onPress={resetNotes}
                  >
                    <Text style={styles.btn_text_dark}>Сбросить данные</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <View>
                    <Text style={styles.label}>Введите прочитанные страницы</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      onChangeText={handleChange('readys')}
                      onBlur={handleBlur('readys')}
                      value={values.readys}
                      placeholder='Введите прочитанное'
                    />
                  </View>
                  <View style={styles.flex_column}>
                    <TouchableOpacity
                      onPress={handleSubmit}
                      activeOpacity={0.6}
                      style={styles.btn_edit}
                    >
                      <Text style={styles.btn_text_dark}>
                        Добавить Прочитанные
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.6}
                      style={styles.btn_delete}
                      onPress={displayDeleteAlert}
                    >
                      <Text style={styles.btn_text_light}>Удалить</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </>
          )}
        </Formik>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <TodaySection />
      <StaticSection />
      {tabs === 'chart' && <Info />}
      {tabs === 'edit' && <Edit />}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container_box: {
    marginTop: 20,
    paddingHorizontal: 17,
  },
  btn_delete: {
    color: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 19,
    backgroundColor: '#FF5470',
    borderRadius: 10,
    marginBottom: 20,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
  },
  card_box: {
    marginBottom: 40,
  },
  btn_edit: {
    color: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 19,
    backgroundColor: '#A8C545',
    borderRadius: 10,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20
  },
  container: {
    backgroundColor: '#222831',
    flex: 1,
  },
  tabs_view: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 17,
  },
  label: {
    marginVertical: 10,
    fontWeight: "bold",
    fontSize: 18
  },
  btn_text_dark: {
    color: '#000',
    textAlign: 'center',
    fontSize: 17,
  },
  btn_text_light: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 17,
  },
  tab_select: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tab_btn: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  tab_btn_active: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: '#FF5470',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  calendar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  header_title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    color: '#fff',
    fontSize: 11,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  img_calendar: {
    marginRight: 11,
  },
  title_box: {
    marginTop: 59,
    marginBottom: 30,
    paddingHorizontal: 17,
  },
  box: {
    marginTop: 59,
    marginBottom: 22,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 50,
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
  box_fluid: {
    paddingHorizontal: 17,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_card: {
    width: '100%',
    height: '100%',
    marginBottom: 15,
    backgroundColor: '#DECE9C',
    borderRadius: 18,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    padding: 10,
    marginTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    width: '100%',
    marginTop: 7,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    height: 43,
    borderRadius: 7,
    marginBottom: 20,
  },
  title_card: {
    fontSize: 20,
    color: '#222831',
    fontWeight: '700',
  },
  box_mb: {
    marginBottom: 10,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#fff',
    marginVertical: 6,
  },
  subtitle: {
    fontSize: 12,
    color: '#93B5C6',
  },
  subtitle_cs: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
    fontWeight: '700',
  },
  flex: {
    width: '100%',
    display: 'flex',
    marginTop: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  btn_view: {
    width: '100%',
    maxWidth: 130,
    backgroundColor: '#00EBC7',
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 7,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  btn_reset: {
    width: '100%',
    maxWidth: 130,
    backgroundColor: '#3498DB',
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 7,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  btn_view_text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Detail
