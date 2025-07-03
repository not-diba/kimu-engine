process.env.DEBUG = 'nexus:typegen'

import { asNexusMethod, makeSchema } from 'nexus'
import { GetRecipe, GetRecipes } from './queries'
import { Category, Recipe } from './models'
import { CreateCategory, CreateRecipe, DeleteRecipe, UpdateRecipe } from './mutations'
import { GraphQLDateTime } from 'graphql-scalars'

const GQLDate = asNexusMethod(GraphQLDateTime, 'dateTime')


export const schema = makeSchema({
    types: [
        GQLDate,
        Recipe,
        GetRecipes,
        CreateRecipe,
        UpdateRecipe,
        DeleteRecipe,
        GetRecipe,
        Category,
        CreateCategory
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
