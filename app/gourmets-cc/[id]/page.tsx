"use client";
import { useSearchParams } from "next/navigation";
//import{useRouter}from "next/router";
import { useEffect, useState } from "react";
import { Shop } from "../../../types";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ShopDetailPage = ({ params }: { params: { id: string } }) => {
  //const router = useRouter();
  
  //const id = 
  
  
  const [shop, setShop] = useState<Shop | null>(null);
  
  

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
      const response = await fetch(`/api/shops?${params.id}`);
      const data = await response.json();
      setShop(data);
    };

    fetchStoreData();
  }, [params.id]);

  if (!shop) {
    console.log("shop id",params.id);
    return <div>Loading...</div>;
  }
  console.log(shop);
  console.log(params.id);
  

  return (
    <div>
      <h1>{shop[0].name}</h1>
      
      <Carousel>
        <CarouselContent>
          {/* <CarouselItem><img src={shop.photo.pc.m} alt={shop.name} /></CarouselItem> */}
          <CarouselItem>
            <Avatar className="w-12 h-12">
                      {/* <AvatarImage src={shop.photo} /> */}
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
            </CarouselItem>
          <CarouselItem>...</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {/* <img src={shop.photo.pc.m} alt={shop.name} /> */}
      <div className="flex-col devide-y devide-white">
        <div className="flex-row">
        <p>住所 {shop[0].access}</p>
          
        </div>
        <div className="flex-row">
          <p></p>
          <p>{shop[0].genre?.name}</p>
        </div>
        <div className="flex-row">
          <p>{shop[0].catch}</p>
        </div>
        <div className="flex-row">
          <p>営業時間</p>
          <p>{shop[0].open}</p>
        </div> 
      </div>
      
    </div>
  );
};

export default ShopDetailPage;

