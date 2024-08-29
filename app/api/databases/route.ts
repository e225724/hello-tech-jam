import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function fetchDataBase(shopId: string): Promise<any> {
  console.log(`Fetching data for shopId: ${shopId}`); // デバッグログ

  const reviewersWithDetails = await prisma.reviewer.findMany({
    where: {
      shop_id: shopId,
    },
    /*
    include: {
      detailReviewer: {
        select: {
          detailed_reviewer_1: true, // 修正: カラム名を正しく指定
          detailed_reviewer_2: true, // 修正: カラム名を正しく指定
        },
      },
    },
    */
  });

  console.log();
  console.log(`Retrieved data: ${JSON.stringify(reviewersWithDetails)}`); // デバッグログ
  console.log();

  // Map data from the array to return
  const result = reviewersWithDetails.map((reviewer) => ({
    reviewer: reviewer.reviewer,
    rating: reviewer.rating,
    role: reviewer.role,
    /*
    detailed_review_1: reviewer.detailReviewer?.detailed_reviewer_1, // 修正
    detailed_review_2: reviewer.detailReviewer?.detailed_reviewer_2, // 修正
    */
  }));

  return result;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const shopId = searchParams.get("shopId");

    if (!shopId) {
      return NextResponse.json(
        { error: "Missing shopId parameter" },
        { status: 400 },
      );
    }

    // Call the fetchDataBase function to get the reviewers data
    const reviewersData = await fetchDataBase(shopId);
    console.log();
    console.log("returnできたか？");
    console.log();
    return NextResponse.json(reviewersData);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);
    const {
      shop_id,
      reviewer,
      role,
      rating,
      detailReviewer, // detailReviewer オブジェクトをそのまま取得
    } = body;
    // 入力値のバリデーション
    if (
      !shop_id ||
      !reviewer ||
      typeof role !== "number" ||
      typeof rating !== "number"
    ) {
      return NextResponse.json(
        { error: "Missing or invalid data fields" },
        { status: 400 },
      );
    }
    // 新しい Reviewer エントリを作成し、生成された detail_reviewer_id を使用
    const newReviewer = await prisma.reviewer.create({
      data: {
        shop_id,
        reviewer,
        role,
        rating,
        detail_reviewer_id: detailReviewer,
        detailReviewer: {
          create: detailReviewer,
        },
      },
    });
    return NextResponse.json(
      { message: "Data inserted successfully", newReviewer },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error inserting data:", error);
    return NextResponse.json(
      { error: "Failed to insert data" },
      { status: 500 },
    );
  }
}
