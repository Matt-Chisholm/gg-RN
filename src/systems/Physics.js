const Physics = (entities, { time, screen }) => {
  Object.values(entities).forEach(entity => {
    if (entity.update) entity.update(entity, { time, screen })
  })
  return entities
}

export default Physics
