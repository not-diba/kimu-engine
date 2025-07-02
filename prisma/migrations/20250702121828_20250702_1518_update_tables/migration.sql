/*
  Warnings:

  - Made the column `userId` on table `Favourite` required. This step will fail if there are existing NULL values in that column.
  - Made the column `recipeId` on table `Favourite` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `price` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `RecipeIngredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `RecipeIngredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Favourite" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "recipeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quantity" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "RecipeIngredient" ADD COLUMN     "quantity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "unit" TEXT NOT NULL;
