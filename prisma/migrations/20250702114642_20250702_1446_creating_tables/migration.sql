-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('Google', 'Apple', 'TikTok', 'Meta');

-- CreateEnum
CREATE TYPE "BuildingType" AS ENUM ('Apartment', 'House', 'Office', 'Hotel', 'Other');

-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('OrderPlaced', 'InTransit', 'Delivered', 'Cancelled', 'Failed');

-- AlterEnum
ALTER TYPE "PaymentStatus" ADD VALUE 'Error';

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "phoneNumber" VARCHAR(255) NOT NULL,
    "profileImage" TEXT NOT NULL,
    "authProvider" "AuthProvider" NOT NULL,
    "providerId" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "defaultUnit" VARCHAR(255) NOT NULL,
    "basePrice" DOUBLE PRECISION NOT NULL,
    "baseQuantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "city" VARCHAR(255) NOT NULL,
    "buildingType" "BuildingType" NOT NULL,
    "buildingName" VARCHAR(255),
    "unitNumber" VARCHAR(255),
    "additionalInfo" TEXT,
    "userId" UUID NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "deliveryStatus" "DeliveryStatus" NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,
    "paymentId" UUID NOT NULL,
    "addressId" UUID,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favourite" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID,
    "recipeId" UUID,

    CONSTRAINT "Favourite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_paymentId_key" ON "Order"("paymentId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favourite" ADD CONSTRAINT "Favourite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favourite" ADD CONSTRAINT "Favourite_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
