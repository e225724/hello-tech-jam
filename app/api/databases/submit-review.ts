import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

class APIError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "APIError";
  }
}
const prisma = new PrismaClient();

export default async function handler(req: Request, res: Response) {
  if (req.method === "POST") {
    const { jobTitle, rating, textareaValue, price, priceApplication } =
      req.body;

    try {
      // データベースに新しいレビューを作成
      const newReview = await prisma.reviewer.create({
        data: {
          shop_id: "example-shop-id", // 必要に応じてこの値を設定
          reviewer: jobTitle,
          role: 0, // 必要に応じて適切な値に設定
          rating: rating,
          review_content: textareaValue,
          detailReviewer: {
            create: {
              detailed_reviewer_1: price,
              detailed_reviewer_2: priceApplication,
            },
          },
        },
      });

      res.status(200).json(newReview);
    } catch (e) {
      res
        .status(500)
        .json({ error: "データベースにアクセス中にエラーが発生しました" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
