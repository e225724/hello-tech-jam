import { NextResponse } from "next/server";
// import { shops } from "./data";

class APIError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "APIError";
  }
}

async function fetchHotpepperData(url: string): Promise<any> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new APIError(
      response.status,
      `API request failed: ${response.statusText}`,
    );
  }
  const data = await response.json();
  if (!data.results?.shop) {
    throw new APIError(404, "No shops found");
  }
  return data.results.shop;
}

function handleError(error: unknown): NextResponse {
  console.error("Error:", error);
  if (error instanceof APIError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status },
    );
  }
  return NextResponse.json(
    { error: "An unexpected error occurred" },
    { status: 500 },
  );
}


export async function GET(
    { params }: { params?: { id: string } },
  ) {
    console.log(params);
    try {
      const key = process.env.HOTPEPPER_API_KEY;
      if (!key) {
        throw new APIError(500, "API key is not set");
      }
      if (!params?.id) {
        throw new APIError(400, "Shop ID is not provided");
      }
      const query = new URLSearchParams({
        key,
        format: "json",
        id: params.id,
      });
      const url = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?${query.toString()}`;
      const shops = await fetchHotpepperData(url);
  
      if (shops.length === 0) {
        throw new APIError(404, "Shop not found");
      }
  
      const shop = shops[0];
  
      return NextResponse.json(shop);
    } catch (error) {
      return handleError(error);
    }
  }
