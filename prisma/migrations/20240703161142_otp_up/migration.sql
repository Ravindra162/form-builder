/*
  Warnings:

  - Added the required column `type` to the `Otp` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "otpType" AS ENUM ('REGISTER', 'FORM');

-- AlterTable
ALTER TABLE "Otp" ADD COLUMN     "type" "otpType" NOT NULL;
