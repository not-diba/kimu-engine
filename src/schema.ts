import { asNexusMethod, makeSchema } from 'nexus'
import { GetCategories, GetRecipe, GetRecipes, GetRecipesInACategory } from './queries'
import { Category, Recipe, RecipeCategoryInput } from './models'
import { AddRecipeToCategory, CreateCategory, CreateRecipe, DeleteRecipe, UpdateRecipe } from './mutations'
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
        CreateCategory,
        GetCategories,
        RecipeCategoryInput,
        AddRecipeToCategory,
        GetRecipesInACategory
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
