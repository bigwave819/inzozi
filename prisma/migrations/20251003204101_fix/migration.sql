/*
  Warnings:

  - You are about to drop the column `projectId` on the `Employees` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Employees" DROP CONSTRAINT "Employees_projectId_fkey";

-- AlterTable
ALTER TABLE "public"."Employees" DROP COLUMN "projectId";

-- CreateTable
CREATE TABLE "public"."_EmployeesToProject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EmployeesToProject_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_EmployeesToProject_B_index" ON "public"."_EmployeesToProject"("B");

-- AddForeignKey
ALTER TABLE "public"."_EmployeesToProject" ADD CONSTRAINT "_EmployeesToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_EmployeesToProject" ADD CONSTRAINT "_EmployeesToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
