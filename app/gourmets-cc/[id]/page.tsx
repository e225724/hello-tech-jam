"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Shop } from "../../../types";
import React from "react";

const ShopDetailPage = () => {
  const serchparams = useSearchParams();
  const  id  = Number(serchparams.get("id"));
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
      <img src={shop.photo.pc.m} alt={shop.name} />
      <p>{shop.address}</p>
      <p>{shop.genre?.name}</p>
      <p>{shop.catch}</p>
      <p>{shop.open}</p>
    </div>
  );
};

export default ShopDetailPage;
