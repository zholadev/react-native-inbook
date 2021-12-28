import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

const Context = createContext();
const Provider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const findNotes = async () => {
    const result = await AsyncStorage.getItem('notes');
    if (result !== null) setNotes(JSON.parse(result));
  };

  useEffect(() => {
    findNotes();
  }, []);

  return (
    <Context.Provider value={{ notes, setNotes, findNotes }}>
      {children}
    </Context.Provider>
  );
}

export const useNotes = () => useContext(Context);

const styles = StyleSheet.create({})

export default Provider;
