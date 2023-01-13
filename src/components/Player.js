import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Player () {
  return <View style={styles.player} />
}

const styles = StyleSheet.create({
  player: {
    width: 50,
    height: 50,
    backgroundColor: 'blue'
  }
})
