/*
  Warnings:

  - Added the required column `value` to the `sizes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sizes" ADD COLUMN     "value" TEXT NOT NULL;
