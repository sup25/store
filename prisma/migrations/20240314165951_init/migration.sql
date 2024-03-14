-- CreateTable
CREATE TABLE "user information" (
    "Full Name" VARCHAR(20) NOT NULL,
    "Email" VARCHAR(20) NOT NULL,
    "Password" VARCHAR(20) NOT NULL,
    "Id" UUID NOT NULL,

    CONSTRAINT "user information_pkey" PRIMARY KEY ("Id")
);
