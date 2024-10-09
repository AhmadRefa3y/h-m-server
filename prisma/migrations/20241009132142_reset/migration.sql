/*
  Warnings:

  - You are about to drop the column `color` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `products` table. All the data in the column will be lost.
  - Added the required column `title` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "color",
DROP COLUMN "gender",
DROP COLUMN "imageUrl",
DROP COLUMN "name",
DROP COLUMN "size",
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "colors" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "colors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sizes" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "sizes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "colors_id_key" ON "colors"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sizes_id_key" ON "sizes"("id");

-- AddForeignKey
ALTER TABLE "colors" ADD CONSTRAINT "colors_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sizes" ADD CONSTRAINT "sizes_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
