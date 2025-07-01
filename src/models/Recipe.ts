import { objectType } from 'nexus'

export const Recipe = objectType({
  name: 'Recipe',
  definition(t) {
    t.nonNull.string('id')
    t.string('name')
    t.nonNull.int('duration')
    t.string('createdBy')
    t.nonNull.field('createdAt', { type: 'String' })
    t.nonNull.field('updatedAt', { type: 'String' })
  },
})