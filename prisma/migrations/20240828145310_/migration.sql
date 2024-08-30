-- CreateTable
CREATE TABLE "reviewers" (
    "id" SERIAL NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "reviewer" TEXT NOT NULL,
    "role" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "detail_reviewer_id" INTEGER,

    CONSTRAINT "reviewers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detail_reviewers" (
    "id" SERIAL NOT NULL,
    "reviwer_id" INTEGER NOT NULL,
    "detailed_reviewer_1" INTEGER NOT NULL,
    "detailed_reviewer_2" INTEGER NOT NULL,

    CONSTRAINT "detail_reviewers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reviewers_shop_id_key" ON "reviewers"("shop_id");

-- CreateIndex
CREATE UNIQUE INDEX "detail_reviewers_reviwer_id_key" ON "detail_reviewers"("reviwer_id");

-- AddForeignKey
ALTER TABLE "detail_reviewers" ADD CONSTRAINT "detail_reviewers_reviwer_id_fkey" FOREIGN KEY ("reviwer_id") REFERENCES "reviewers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
