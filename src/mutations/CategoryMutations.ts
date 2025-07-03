import { mutationField, nonNull, stringArg } from "nexus";
import type { Context } from "../context";

export const CreateCategory = mutationField('createCategory', {
    type: 'Category',
    args: {
        name: nonNull(stringArg())
    },
    async resolve(_, args, ctx: Context) {
        const category = await ctx.prisma.category.create({
            data: {
                name: args.name
            }
        });
        return category;
    }

});