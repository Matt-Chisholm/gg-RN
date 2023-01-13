import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Enemy () {
  return <View style={styles.enemy} />
}

const styles = StyleSheet.create({
  enemy: {
    width: 50,
    height: 50,
    backgroundColor: 'red'
  }
})
