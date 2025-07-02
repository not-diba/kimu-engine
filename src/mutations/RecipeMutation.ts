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