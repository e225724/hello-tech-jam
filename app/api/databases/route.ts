import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

class APIError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "APIError";
  }
}

export async function GET(request: Request) {
  try {
    const reviewers = await prisma.reviewer.findMany({
      include: {
        detailReviewer: true,
      },
    });
    return NextResponse.json(reviewers);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Fetch error:", errorMessage);
    throw new APIError(500, errorMessage);
  }
}

// POST: 新しいデータを作成する
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newReviewer = await prisma.reviewer.create({
      data: {
        reviewer: data.reviewer,
        shop_id: data.shop_id,
        role: data.role,
        rating: data.rating,
        review_content: data.review_content,
        detailReviewer: {
          create: data.detailReviewer,
        },
      },
    });
    return NextResponse.json(newReviewer, { status: 201 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Create error:", errorMessage);
    throw new APIError(500, errorMessage);
  }
}
