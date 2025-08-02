import { objectType } from 'nexus';
import type { Context } from '../context';

export const Recipe = objectType({
  name: 'Recipe',
  definition(t) {
    t.nonNull.string('id');
    t.string('name');
    t.nonNull.int('duration');
    t.nonNull.string('instructions');
    t.string('createdBy');
    t.nonNull.dateTime('createdAt');
    t.nonNull.dateTime('updatedAt');
    t.list.field('categories', {
      type: 'Category',
      async resolve(recipe, _, ctx: Context) {
        const recipeCategories = await ctx.prisma.recipeCategory.findMany({
          where: { recipeId: recipe.id },
          include: { category: true },
        });

        return recipeCategories.map((rc) => rc.category);
      },
    });
    t.list.field('ingredients', {
      type: 'RecipeIngredient',
      async resolve(recipe, _, ctx: Context) {
        return ctx.prisma.recipeIngredient.findMany({
          where: { recipeId: recipe.id },
          include: { ingredient: true },
        });
      },
    });
    t.nonNull.float('totalPrice', {
      async resolve(recipe, _, ctx: Context) {
        const ingredients = await ctx.prisma.recipeIngredient.findMany({
          where: { recipeId: recipe.id },
        });

        const total = ingredients.reduce((sum, item) => sum + item.price, 0);

        return Math.round(total * 100) / 100;
      },
    });
  },
});
