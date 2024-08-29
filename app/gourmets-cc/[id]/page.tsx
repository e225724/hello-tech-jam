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
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const ShopDetailPage = ({ params }: { params: { id: string } }) => {
  //const router = useRouter();
  
  //const id = 
  
  
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
    console.log("shop id",params.id);
    return <div>Loading...</div>;
  }
  


  return (
    <div>
      <h1>{shop.name}</h1>
      
      
      {/* <img src={shop.photo.pc.m} alt={shop.name} /> */}
      <div className="flex-col devide-y devide-white">
        <div className="flex-row">
        <p>住所 {shop.access}</p>
          
        </div>
        <div className="flex-row">
          <p></p>
          <p>{shop.genre?.name}</p>
        </div>
        <div className="flex-row">
          <p>{shop.catch}</p>
        </div>
        <div className="flex-row">
          <p>営業時間</p>
          <p>{shop.open}</p>
        </div> 
      </div>
    <div className="flex flex-row">
      
      <Card className=" max-w-3xl p-6 bg-white shadow-lg rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mt-4">{shop.name}</CardTitle>
        </CardHeader>
        <CardContent className="mt-6 space-y-4 text-center">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                
                 1 {/* <Avatar className="w-max h-max mx-auto">
                    <AvatarImage src={shop.photo.pc.s} alt={shop.name} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar> */}
                  
                
          </CarouselItem>
          <CarouselItem>2</CarouselItem>
          <CarouselItem>3</CarouselItem>
          <CarouselItem>4</CarouselItem>
          <CarouselItem>5</CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          </Carousel>
        </CardContent>
      </Card>
      <div className="flex flex-col items-wide justify-start min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg">
        <CardHeader className="text-center">
          
        </CardHeader>
        <CardContent className="mt-6 space-y-4 text-center">
          <p className="text-xl font-medium text-gray-700">{shop.address}</p>
          <p className="text-lg text-gray-500">{shop.genre?.name || "ジャンル情報なし"}</p>
          <p className="text-lg text-gray-500">{shop.catch || "キャッチ情報なし"}</p>
          <p className="text-lg text-gray-500">{shop.open || "営業時間情報なし"}</p>
        </CardContent>
      </Card>
      </div>
      
    </div>
    <div>
      <Button type="submit" className="max-w-sm">
        検索
      </Button>
    </div>
    </div>
    
  );
};

export default ShopDetailPage;

