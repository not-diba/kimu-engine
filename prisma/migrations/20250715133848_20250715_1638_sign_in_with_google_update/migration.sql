/*
  Warnings:

  - You are about to drop the column `providerId` on the `User` table. All the data in the column will be lost.
  - Added the required column `idToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "providerId",
ADD COLUMN     "idToken" VARCHAR(255) NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "phoneNumber" DROP NOT NULL;
