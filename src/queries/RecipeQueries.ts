import { extendType, list, nonNull, queryField, stringArg } from 'nexus';
import type { Context } from '../context';

export const GetRecipes = queryField('recipes', {
  type: list('Recipe'),
  async resolve(_, __, ctx: Context) {
    return ctx.prisma.recipe.findMany();
  },
});

export const GetRecipe = queryField('recipe', {
  type: 'Recipe',
  args: {
    recipeId: nonNull(stringArg()),
  },
  async resolve(_, arg, ctx: Context) {
    return await ctx.prisma.recipe.findUnique({
      where: { id: arg.recipeId },
    });
  },
});
