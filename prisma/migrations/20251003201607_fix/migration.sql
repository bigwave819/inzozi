-- DropForeignKey
ALTER TABLE "public"."Employees" DROP CONSTRAINT "Employees_projectId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Employees" ADD CONSTRAINT "Employees_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
