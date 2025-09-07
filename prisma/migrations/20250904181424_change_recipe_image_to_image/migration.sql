/*
  Warnings:

  - You are about to drop the column `recipeImage` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "recipeImage",
ADD COLUMN     "image" TEXT;
