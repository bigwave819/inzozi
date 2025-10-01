/*
  Warnings:

  - Added the required column `imageUrl` to the `Employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Employees" ADD COLUMN     "imageUrl" TEXT NOT NULL;
