process.env.DEBUG = 'nexus:typegen'

import { asNexusMethod, makeSchema } from 'nexus'
import { RecipeQuery } from './queries'
import { Recipe } from './models'
import { CreateRecipe } from './mutations'
import { GraphQLDateTime } from 'graphql-scalars'

const GQLDate = asNexusMethod(GraphQLDateTime, 'dateTime')


export const schema = makeSchema({
    types: [
        GQLDate,
        Recipe,
        RecipeQuery,
        CreateRecipe
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
