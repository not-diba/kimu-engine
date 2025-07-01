import { extendType } from 'nexus'
import type { Context } from '../context'

export const RecipeQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('recipes', {
      type: 'Recipe',
      async resolve(_, __, ctx: Context) {
        const recipes = await ctx.prisma.recipe.findMany()
        return recipes.map((r) => ({
          ...r,
          createdAt: r.createdAt.toISOString(),
          updatedAt: r.updatedAt.toISOString(),
        }))
      },
    })
  },
})