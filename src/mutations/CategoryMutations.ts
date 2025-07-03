import { arg, list, mutationField, nonNull, stringArg } from "nexus";
import type { Context } from "../context";

export const CreateCategory = mutationField('createCategory', {
    type: 'Category',
    args: {
        name: nonNull(stringArg())
    },
    async resolve(_, args, ctx: Context) {
        return await ctx.prisma.category.create({
            data: {
                name: args.name
            }
        });
    }
});

export const AddRecipeToCategory = mutationField('addRecipeToCategory', {
    type: list('Recipe'),
    args: {
        input: nonNull(arg({ type: 'RecipeCategoryInput' })),
    },
    async resolve(_, { input }, ctx: Context) {
        const { recipeIds, categoryIds } = input;

        const updatedRecipes = await Promise.all(
            recipeIds.map(recipeId =>
                ctx.prisma.recipe.update({
                    where: { id: recipeId },
                    data: {
                        RecipeCategory: {
                            create: categoryIds.map(categoryId => ({
                                category: { connect: { id: categoryId } }
                            }))
                        }
                    }
                })
            )
        );

        return updatedRecipes;
    }
});