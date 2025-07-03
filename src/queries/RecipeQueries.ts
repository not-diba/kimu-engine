import { extendType, nonNull, queryField, stringArg } from 'nexus'
import type { Context } from '../context'

export const GetRecipes = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('recipes', {
      type: 'Recipe',
      async resolve(_, __, ctx: Context) {
        const recipes = await ctx.prisma.recipe.findMany()
        return recipes
      },
    })
  },
})

export const GetRecipe = queryField('recipe', {
  type: 'Recipe',
  args: {
    recipeId: nonNull(stringArg()),
  },
  async resolve(_, arg, ctx: Context) {
    const recipe = await ctx.prisma.recipe.findUnique({
      where: { id: arg.recipeId }
    });

    return recipe;
  }
});