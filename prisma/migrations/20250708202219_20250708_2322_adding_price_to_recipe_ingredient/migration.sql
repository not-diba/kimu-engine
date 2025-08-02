/*
  Warnings:

  - Added the required column `price` to the `RecipeIngredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecipeIngredient" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
