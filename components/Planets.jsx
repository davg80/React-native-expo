import React from 'react'
import { Text, StyleSheet} from 'react-native';

export default function Planets({planets}) {
  return (
        <>
        {planets.map((planet, index) => (
            <Text style={styles.card} key={index}>{index+1} : {planet.name}</Text>
        ))}
      </>
  )
}

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginBottom: 5
    }
})
