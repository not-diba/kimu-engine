import { enumType, inputObjectType, nonNull, objectType } from "nexus";

export const IngredientTypeEnum = enumType({
    name: 'IngredientType',
    members: [
        'Vegetable',
        'Meat',
        'Dairy',
        'Spice',
        'Liquid',
        'Grain',
        'Other',
    ],
});

export const IngredientDefaultUnitEnum = enumType({
    name: 'DefaultUnit',
    members: [
        'g',
        'ml',
        'piece',
        'slice',
        'clove',
        'pack',
        'can',
        'pinch',
    ]
})

export const IngredientUnitEnum = enumType({
    name: 'Unit',
    members: [
        'g',
        'kg',
        'ml',
        'l',
        'tbsp',
        'tsp',
        'cup',
        'piece',
        'slice',
        'clove',
        'can',
        'pack',
        'pinch',
    ]
})

export const Ingredient = objectType({
    name: 'Ingredient',
    definition(t) {
        t.nonNull.string('name')
        t.nonNull.field('type', { type: 'IngredientType' })
        t.nonNull.field('defaultUnit', { type: 'DefaultUnit' })
        t.nonNull.float('basePrice')
        t.nonNull.float('baseQuantity')
    }
})

export const RecipeIngredient = objectType({
    name: 'RecipeIngredient',
    definition(t) {
        t.nonNull.field('ingredient', { type: 'Ingredient' })
        t.nonNull.float('quantity')
        t.nonNull.field('unit', { type: 'Unit' })
    },
});

export const RecipeIngredientInput = inputObjectType({
    name: 'RecipeIngredientInput',
    definition(t) {
        t.nonNull.string('name');
        t.nonNull.field('type', { type: 'IngredientType' });
        t.nonNull.field('defaultUnit', { type: 'DefaultUnit' });
        t.nonNull.float('baseQuantity');
        t.nonNull.float('basePrice');
        t.nonNull.float('quantity');
        t.nonNull.field('unit', { type: 'Unit' });
    }
});