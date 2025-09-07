-- DropForeignKey
ALTER TABLE "public"."RecipeCategory" DROP CONSTRAINT "RecipeCategory_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_recipeId_fkey";

-- AddForeignKey
ALTER TABLE "public"."RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "public"."Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RecipeCategory" ADD CONSTRAINT "RecipeCategory_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "public"."Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
