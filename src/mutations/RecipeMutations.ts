import { intArg, mutationField, nonNull, stringArg } from "nexus";
import type { Context } from "../context";

export const CreateRecipe = mutationField('createRecipe', {
    type: 'Recipe',
    args: {
        name: nonNull(stringArg()),
        duration: nonNull(intArg()),
        instructions: nonNull(stringArg()),
        createdBy: stringArg(),
    },
    async resolve(_, args, ctx: Context) {
        const recipe = await ctx.prisma.recipe.create({
            data: {
                name: args.name,
                duration: args.duration,
                instructions: args.instructions,
                createdBy: args.createdBy ?? null,
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
        createdBy: stringArg()
    },
    async resolve(_, args, ctx: Context) {
        const data: any = {};
        if (args.name !== undefined) data.name = args.name;
        if (args.duration !== undefined) data.duration = args.duration;
        if (args.instructions !== undefined) data.instructions = args.instructions;
        if (args.createdBy !== undefined) data.createdBy = args.createdBy;

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