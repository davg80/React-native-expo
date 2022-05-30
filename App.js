import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Planets from './components/Planets';

export default function App() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetch("https://swapi.dev/api/planets/")
      .then((response) => response.json())
      .then((data) => {
        setPlanets(data.results);
      })
      .catch(error => console.log(error))
  }, [])
  
  return (
    <View style={styles.container}>
      <Text style={styles.title} >Les planètes</Text>
      { planets.length > 0 ?
        <Planets planets={planets} /> : 
        <ActivityIndicator size="small" color="#0000ff" />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 10
  },
});






