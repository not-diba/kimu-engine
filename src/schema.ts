process.env.DEBUG = 'nexus:typegen'

import { makeSchema } from 'nexus'
import { Recipe } from './models/Recipe'
import { RecipeQuery } from './queries/RecipeQuery'


export const schema = makeSchema({
    types: [
        Recipe,
        RecipeQuery
    ],
    outputs: {
        schema: __dirname + '/../generated/nexus/schema.graphql',
        typegen: __dirname + '/../generated/nexus/nexus.ts',
    },
    contextType: {
        module: require.resolve('./context'),
        export: 'Context',
    },
    sourceTypes: {
        modules: [
            {
                module: '@prisma/client',
                alias: 'prisma',
            },
        ],
    },
})
