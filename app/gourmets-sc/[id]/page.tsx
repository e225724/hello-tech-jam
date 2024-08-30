import { useRouter } from "next/router";
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

const ShopDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [shop, setShop] = useState<Shop | null>(null);

  useEffect(() => {
    if (id) {
      // URLのIDを使用してショップの詳細情報を取得
      fetch(`/api/shops/${id}`)
        .then((res) => res.json())
        .then((data) => setShop(data))
        .catch((error) => console.error("ショップの詳細情報取得に失敗しました:", error));
    }
  }, [id]);

  if (!shop) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{shop.name}</h1>
      <Carousel>
        <CarouselContent>
          <CarouselItem><img src={shop.photo.pc.m} alt={shop.name} /></CarouselItem>
          <CarouselItem>...</CarouselItem>
          <CarouselItem>...</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <img src={shop.photo.pc.m} alt={shop.name} />
      <p>{shop.address}</p>
      <p>{shop.genre?.name}</p>
      <p>{shop.catch}</p>
      <p>{shop.open}</p>
    </div>
  );
};

export default ShopDetailPage;
