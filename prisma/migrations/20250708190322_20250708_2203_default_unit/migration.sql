/*
  Warnings:

  - Changed the type of `defaultUnit` on the `Ingredient` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DefaultUnit" AS ENUM ('g', 'ml', 'piece', 'slice', 'clove', 'pack', 'can', 'pinch');

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "defaultUnit",
ADD COLUMN     "defaultUnit" "DefaultUnit" NOT NULL;
