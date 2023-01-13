import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { GameEngine } from 'react-native-game-engine'
import { Dimensions } from 'react-native'

export default function Game () {
  const { width, height } = Dimensions.get('screen')
  const Player = () => <View style={styles.player} />
  const Enemy = () => <View style={styles.enemy} />

  const player = {
    position: [width / 2, height - 50],
    renderer: Player,
    update: (player, { touches, screen }) => {
      let move = [0, 0]
      touches
        .filter(t => t.type === 'move')
        .forEach(t => {
          move[0] += t.delta.pageX
          move[1] += t.delta.pageY
        })
      player.position[0] += move[0] * 0.1
      player.position[1] += move[1] * 0.1
    }
  }

  const enemies = Array.from({ length: 10 }, (_, i) => {
    return {
      position: [50 * i, 50],
      renderer: Enemy,
      update: enemy => {
        enemy.position[0] += 1
        if (enemy.position[0] > screen.width) {
          enemy.position[0] = 0
        }
      }
    }
  })

  const collision = entities => {
    let player = entities[1]
    let enemies = entities.slice(2)
    enemies.forEach(enemy => {
      if (
        player.position[0] < enemy.position[0] + enemy.size[0] &&
        player.position[0] + player.size[0] > enemy.position[0] &&
        player.position[1] < enemy.position[1] + enemy.size[1] &&
        player.position[1] + player.size[1] > enemy.position[1]
      ) {
        // handle collision
      }
    })
  }

  const gameLogic = entities => {
    let player = entities[1]
    let enemies = entities.slice(2)
    if (enemies.length === 0) {
      // handle game win
    }
    if (player.lives === 0) {
      // handle game over
    }
  }

  return (
    <View>
      <GameEngine
        style={styles.container}
        systems={[Physics, collision, gameLogic]}
        entities={{
          1: player,
          ...enemies
        }}
      >
        {/* Your game UI goes here */}
      </GameEngine>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  player: {
    width: 50,
    height: 50,
    backgroundColor: 'blue'
  },
  enemy: {
    width: 50,
    height: 50,
    backgroundColor: 'red'
  }
})
