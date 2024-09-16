"use client";
import { useSearchParams } from "next/navigation";
//import{useRouter}from "next/router";
import { useEffect, useState } from "react";
import { Shop } from "../../../types";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Maximize } from "lucide-react";
import Link from "next/link";

const ShopDetailPage = ({ params }: { params: { id: string } }) => {
  const [shop, setShop] = useState<Shop | null>(null);

  console.log(params.id);

  // useEffect(() => {
  //   if (id) {
  //     // URLのIDを使用してショップの詳細情報を取得
  //     fetch(`api/shops/${id}`)
  //       .then((res) => {
  //         if (!res.ok) {
  //           throw new Error(`Failed to fetch shop details: ${res.status} ${res.statusText}`);
  //         }
  //         return res.json();
  //       })
  //       .then((data) => {
  //         console.log("Fetched shop data:", data);  // データが取得されているか確認
  //         setShop(data);
  //       })
  //       .catch((error) => console.error("ショップの詳細情報取得に失敗しました:", error));
  //   }
  // }
  // , [id]);
  useEffect(() => {
    // 店舗データを取得する関数
    const fetchStoreData = async () => {
      const response = await fetch(`/api/shops/${params.id}`);
      const data = await response.json();
      setShop(data);
    };

    fetchStoreData();
  }, [params.id]);

  if (!shop) {
    console.log("shop id", params.id);
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mt-4">{shop.name}</h1>

      {/* <img src={shop.photo.pc.m} alt={shop.name} /> */}
      <div className="flex flex-row">
        <div className="flex flex-col items-start justify-start min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          {/*店の写真を載せようかなと max-w-lg*/}
          <Card className="h-96 w-96 bg-white shadow-lg rounded-lg mx-3">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold mt-4"></CardTitle>
            </CardHeader>
            <CardContent className="my-1 space-y-4 text-center">
              <Carousel>
                <CarouselContent>
                  <CarouselItem>
                    <Image
                      src={shop.photo.pc.m}
                      alt={shop.name}
                      width={300}
                      height={300}
                      // style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                  </CarouselItem>
                  <CarouselItem>
                    {shop.photo.pc.l}alt={shop.name}{" "}
                  </CarouselItem>
                  <CarouselItem>{}</CarouselItem>
                  <CarouselItem></CarouselItem>
                  <CarouselItem></CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>
          <div>
            <Link href={shop.urls.pc}>
              <Button type="submit" className="max-w-sm">
                予約する
              </Button>
            </Link>
            <Link
              href={`/gourmets-cc/${params.id}/review?shopName=${encodeURIComponent(shop.name)}`}
            >
              <Button
                type="button"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                レビューを書く
              </Button>
            </Link>
          </div>
        </div>

        {/*上から評価、価格、ジャンル、エリア、営業時間*/}
        <div className="flex flex-col items-start justify-start min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <Card className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg">
            <CardHeader className="text-center"></CardHeader>
            <CardContent
              className="mt-6 space-y-4 text-start"
              style={{ width: "fit-content" }}
            >
              {/* 価格 */}
              <p className="font-midium">価格：</p>
              <p className="text-lg text-gray-500">
                {shop.budget.name || "情報なし"}
              </p>
              <p className="font-midium">ジャンル：</p>
              <p className="text-lg text-gray-500">
                {shop.genre?.name || "情報なし"}
              </p>
              <p className="font-midium">住所：</p>
              <p className="text-lg text-gray-500">
                {shop.address || "情報なし"}
              </p>
              <p className="font-midium">営業時間：</p>
              <p className="text-lg text-gray-500">{shop.open || "情報なし"}</p>
              <p className="font-midium">定休日：</p>
              <p className="text-lg text-gray-500">
                {shop.close || "情報なし"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/*１カード内に個室、駐車場、一部禁煙、カード決済、対応人数、電話番号、住所、お店のURL*/}
        <div className="flex flex-col place-items-end justify-start min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <Card className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg">
            <CardHeader className="text-center"></CardHeader>
            <CardContent className="mt-6 space-y-4 text-center">
              <p className="text-xl font-medium text-gray-700">
                個室：{shop.private_room || "情報なし"}
              </p>
              <p className="text-lg text-gray-500">
                駐車場：{shop.parking || "情報なし"}
              </p>
              <p className="text-lg text-gray-500">
                喫煙席：{shop.non_smoking || "情報なし"}
              </p>
              <p className="text-lg text-gray-500">
                カード決済：{shop.card || "情報なし"}
              </p>
              <p className="text-lg text-gray-500">
                総席数：{shop.capacity || "情報なし"}
              </p>
              {/* <p className="text-lg text-gray-500">{shop.tel"電話番号情報なし"}</p>  */}
              <p className="text-lg text-gray-500">
                住所：{shop.address || "情報なし"}
              </p>
              {/* <p className="text-lg text-gray-500">{shop.urls || "情報なし"}</p> */}
            </CardContent>
          </Card>
        </div>
      </div>
      <div>
        <Button type="submit" className="max-w-sm">
          予約する
        </Button>
        <Link
          href={`/gourmets-cc/${params.id}/review?shopName=${encodeURIComponent(shop.name)}`}
        >
          <Button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            レビューを書く
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ShopDetailPage;
