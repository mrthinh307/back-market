/*
  Warnings:

  - The primary key for the `product_variant_attributes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `product_variant_attributes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."product_variant_attributes" DROP CONSTRAINT "product_variant_attributes_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "product_variant_attributes_pkey" PRIMARY KEY ("id");
