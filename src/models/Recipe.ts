import { objectType } from 'nexus'

export const Recipe = objectType({
  name: 'Recipe',
  definition(t) {
    t.nonNull.string('id')
    t.string('name')
    t.nonNull.int('duration')
    t.nonNull.string('instructions')
    t.string('createdBy')
    t.nonNull.dateTime('createdAt')
    t.nonNull.dateTime('updatedAt')
  },
})