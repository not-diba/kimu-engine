/*
  Warnings:

  - Changed the type of `type` on the `Ingredient` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "IngredientType" AS ENUM ('Vegetable', 'Meat', 'Dairy', 'Spice', 'Liquid', 'Grain', 'Other');

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "type",
ADD COLUMN     "type" "IngredientType" NOT NULL;
