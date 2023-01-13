import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { GameEngine } from 'react-native-game-engine'
import { Dimensions } from 'react-native'
import Player from './Player'
import Enemy from './Enemy'
import Physics from '../systems/Physics'

export default function Game () {
  const { width, height } = Dimensions.get('screen')

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
      size: [50, 50],
      renderer: Enemy,
      update: (enemy, { screen }) => {
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
        // Handle collision
        player.lives -= 1
        if (player.lives <= 0) {
          // Handle game over
        }
        enemy.visible = false
        entities = { ...entities, ...enemies.filter(e => e.visible) }
      }
    })
    return entities
  }

  const gameLogic = entities => {
    let player = entities[1]
    let enemies = entities.slice(2)
    let score = entities.score

    if (enemies.length === 0) {
      // Handle game win
    }
    score += enemies.length
    return { ...entities, score }
  }

  return (
    <View>
      ;
      <GameEngine
        style={styles.container}
        systems={[Physics, collision, gameLogic]}
        entities={{
          1: player,
          ...enemies
        }}
      >
        {Object.values(entities).map(entity => {
          return <entity.renderer key={Math.random()} {...entity} />
        })}
      </GameEngine>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
