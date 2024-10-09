/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `sizes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "sizes_value_key" ON "sizes"("value");
