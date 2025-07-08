/*
  Warnings:

  - Changed the type of `unit` on the `RecipeIngredient` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('g', 'kg', 'ml', 'l', 'tbsp', 'tsp', 'cup', 'piece', 'slice', 'clove', 'can', 'pack', 'pinch');

-- AlterTable
ALTER TABLE "RecipeIngredient" DROP COLUMN "unit",
ADD COLUMN     "unit" "Unit" NOT NULL;
