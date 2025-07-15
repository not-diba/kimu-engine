import { list, nonNull, queryField, stringArg } from 'nexus';
import type { Context } from '../context';

export const GetCategories = queryField('categories', {
  type: list('Category'),
  async resolve(_, __, ctx: Context) {
    return await ctx.prisma.category.findMany();
  },
});

export const GetRecipesInACategory = queryField('getRecipesInACategory', {
  type: list('Recipe'),
  args: {
    categoryId: nonNull(stringArg()),
  },
  async resolve(_, { categoryId }, ctx: Context) {
    return await ctx.prisma.recipe.findMany({
      where: {
        RecipeCategory: {
          some: {
            categoryId,
          },
        },
      },
      include: {
        RecipeCategory: {
          include: {
            category: true,
          },
        },
      },
    });
  },
});
