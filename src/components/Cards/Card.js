import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const Card = ({ title, general_page, reading_page, id, navigation }) => {

  return (
    <View style={styles.container_card}>
      <View style={styles.box_mb}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.line}></View>
      </View>
      <View>
        <Text style={styles.subtitle}>Общее количество страниц: {general_page}</Text>
        <Text style={styles.subtitle}>Прочитанные: {reading_page}</Text>
        <Text style={styles.subtitle}>Осталось: {general_page - reading_page}</Text>
      </View>

      <View style={styles.flex}>
        <TouchableOpacity style={styles.btn_view} onPress={detailPage}>
          <Text style={styles.btn_view_text}>Подробнее</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container_card: {
    width: '100%',
    height: '100%',
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
  title: {
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

export default Card;
