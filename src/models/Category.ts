import { inputObjectType, objectType } from 'nexus';

export const Category = objectType({
  name: 'Category',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
  },
});

export const RecipeCategoryInput = inputObjectType({
  name: 'RecipeCategoryInput',
  definition(t) {
    t.nonNull.list.nonNull.string('recipeIds');
    t.nonNull.list.nonNull.string('categoryIds');
  },
});
