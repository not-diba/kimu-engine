import { asNexusMethod, makeSchema } from 'nexus';
import {
  GetCategories,
  GetRecipe,
  GetRecipes,
  GetRecipesInACategory,
} from './queries';
import {
  Address,
  AddressInput,
  AddressUpdateInput,
  AuthProviderEnum,
  BuildingTypeEnum,
  Category,
  Ingredient,
  IngredientDefaultUnitEnum,
  IngredientTypeEnum,
  IngredientUnitEnum,
  Payment,
  PaymentInput,
  PaymentMethodEnum,
  PaymentStatusEnum,
  Recipe,
  RecipeCategoryInput,
  RecipeIngredient,
  RecipeIngredientInput,
  User,
} from './models';
import {
  AddRecipeToCategory,
  AuthenticateUser,
  CreateCategory,
  CreateRecipe,
  DeleteRecipe,
  UpdateRecipe,
  VerifyUser,
} from './mutations';
import { GraphQLDateTime } from 'graphql-scalars';
import { CreateUser, DeleteUser, UpdateUser } from './mutations/UserMutations';
import { AuthResponse } from './models/AuthResponse';

const GQLDate = asNexusMethod(GraphQLDateTime, 'dateTime');

export const schema = makeSchema({
  types: [
    GQLDate,
    Recipe,
    GetRecipes,
    CreateRecipe,
    UpdateRecipe,
    DeleteRecipe,
    GetRecipe,
    Category,
    CreateCategory,
    GetCategories,
    RecipeCategoryInput,
    AddRecipeToCategory,
    GetRecipesInACategory,
    User,
    AuthProviderEnum,
    CreateUser,
    UpdateUser,
    DeleteUser,
    BuildingTypeEnum,
    AddressInput,
    AddressUpdateInput,
    Address,
    Payment,
    PaymentInput,
    PaymentStatusEnum,
    PaymentMethodEnum,
    IngredientTypeEnum,
    IngredientDefaultUnitEnum,
    Ingredient,
    RecipeIngredient,
    IngredientUnitEnum,
    RecipeIngredientInput,
    AuthResponse,
    AuthenticateUser,
    VerifyUser,
  ],
  outputs: {
    schema: __dirname + '/../generated/nexus/schema.graphql',
    typegen: __dirname + '/../generated/nexus/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
});
