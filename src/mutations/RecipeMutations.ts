import { arg, intArg, list, mutationField, nonNull, stringArg } from "nexus";
import type { Context } from "../context";
import { normalizeQuantity } from "../utils/unitConversion";

export const CreateRecipe = mutationField('createRecipe', {
    type: 'Recipe',
    args: {
        name: nonNull(stringArg()),
        duration: nonNull(intArg()),
        instructions: nonNull(stringArg()),
        createdBy: stringArg(),
        categories: list(nonNull(stringArg())),
        ingredients: list(nonNull(arg({ type: 'RecipeIngredientInput' })))

    },
    async resolve(_, args, ctx: Context) {
        let recipeCategories = undefined;
        if (args.categories?.length) {
            recipeCategories = {
                create: await Promise.all(
                    args.categories.map(async (name) => {
                        const existing = await ctx.prisma.category.findUnique({ where: { name } });
                        const category = existing ?? await ctx.prisma.category.create({ data: { name } });
                        return { category: { connect: { id: category.id } } };
                    })
                )
            };
        }

        const recipe = await ctx.prisma.recipe.create({
            data: {
                name: args.name,
                duration: args.duration,
                instructions: args.instructions,
                createdBy: args.createdBy ?? null,
                RecipeCategory: recipeCategories,
                ...(args.ingredients !== undefined && args.ingredients !== null && {
                    RecipeIngredient: {
                        create: await Promise.all(
                            args.ingredients.map(async (ingredient) => {
                                const createdIngredient = await ctx.prisma.ingredient.create({
                                    data: {
                                        name: ingredient.name,
                                        type: ingredient.type,
                                        defaultUnit: ingredient.defaultUnit,
                                        basePrice: ingredient.basePrice,
                                        baseQuantity: ingredient.baseQuantity,
                                    }
                                });

                                const normalizedInput = normalizeQuantity(ingredient.quantity, ingredient.unit);
                                const normalizedBase = normalizeQuantity(ingredient.baseQuantity, ingredient.defaultUnit);
                                const calculatedPrice = (normalizedInput / normalizedBase) * ingredient.basePrice;

                                return {
                                    ingredient: { connect: { id: createdIngredient.id } },
                                    quantity: ingredient.quantity,
                                    unit: ingredient.unit,
                                    price: calculatedPrice,
                                };
                            })
                        )
                    }
                }),
            },
        });
        return recipe;
    },
});

export const UpdateRecipe = mutationField('updateRecipe', {
    type: 'Recipe',
    args: {
        recipeId: nonNull(stringArg()),
        name: stringArg(),
        duration: intArg(),
        instructions: stringArg(),
        createdBy: stringArg(),
        ingredients: list(nonNull(arg({ type: 'RecipeIngredientInput' })))
    },
    async resolve(_, args, ctx: Context) {
        const data: any = {};
        if (args.name !== undefined) data.name = args.name;
        if (args.duration !== undefined) data.duration = args.duration;
        if (args.instructions !== undefined) data.instructions = args.instructions;
        if (args.createdBy !== undefined) data.createdBy = args.createdBy;

        if (args.ingredients !== undefined && args.ingredients !== null) {
            await Promise.all(
                args.ingredients.map(async (ingredient) => {
                    const createdIngredient = await ctx.prisma.ingredient.create({
                        data: {
                            name: ingredient.name,
                            type: ingredient.type,
                            defaultUnit: ingredient.defaultUnit,
                            basePrice: ingredient.basePrice,
                            baseQuantity: ingredient.baseQuantity,
                        }
                    });

                    const normalizedInput = normalizeQuantity(ingredient.quantity, ingredient.unit);
                    const normalizedBase = normalizeQuantity(ingredient.baseQuantity, ingredient.defaultUnit);
                    const calculatedPrice = (normalizedInput / normalizedBase) * ingredient.basePrice;

                    await ctx.prisma.recipeIngredient.create({
                        data: {
                            recipeId: args.recipeId,
                            ingredientId: createdIngredient.id,
                            quantity: ingredient.quantity,
                            unit: ingredient.unit,
                            price: calculatedPrice,
                        }
                    });
                })
            );
        }

        const recipe = await ctx.prisma.recipe.update({
            where: { id: args.recipeId },
            data,
        });

        return recipe;
    }
});

export const DeleteRecipe = mutationField('deleteRecipe', {
    type: 'String',
    args: {
        recipeId: nonNull(stringArg()),
    },
    async resolve(_, args, ctx: Context) {
        await ctx.prisma.recipe.delete({
            where: {
                id: args.recipeId
            }
        });

        return `Recipe with ID: ${args.recipeId} deleted successfully.`
    }
});