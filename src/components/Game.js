import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { GameEngine } from 'react-native-game-engine'

export default function Game() {
    const Physics = (entities, { time }) => {
  let player = entities[1];
  player.position[0] += time.delta * player.speed;
  return entities;
};

const Ball = () => <View style={styles.ball} />;
const Box = ({ size }) => <View style={[styles.box, { width: size[0], height: size[1] }]} />;
  return (
    <View>
              <GameEngine
            style={styles.container}
            systems={[Physics]}
            entities={{
                1: { position: [0, 0], renderer: Ball },
                2: { position: [200, 200], size: [50, 50], renderer: Box }
            }}>
             {/* Your game UI goes here */}
        </GameEngine>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ball: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "purple",
    },
    box: {
        backgroundColor: "orange",
    },
});