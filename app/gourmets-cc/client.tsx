"use client";
import Link from "next/link";

import React, { useState } from "react";
import { Shop } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";

async function fetchShops(keyword?: string): Promise<Shop[]> {
  const query = new URLSearchParams();
  if (keyword) query.set("keyword", keyword);

  try {
    const res = await fetch(`/api/shops?${query.toString()}`);
    if (!res.ok) {
      console.error(`Failed to fetch shops: ${res.status} ${res.statusText}`);
      return [];
    }
    return await res.json();
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Fetch error:", errorMessage);
    return [];
  }
}

const GourmetsClient = ({ initialShops }: { initialShops: Shop[] }) => {
  const [keyword, setKeyword] = useState("");
  const [shops, setShops] = useState<Shop[]>(initialShops);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = await fetchShops(keyword);
    setShops(data);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-36 px-8 md:px-12 lg:px-16">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <form
        onSubmit={handleSearch}
        className="flex items-center space-x-4 mb-8"
      >
        <Input
          type="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="検索..."
          className="max-w-sm w-full"
        />
        <Button type="submit">検索</Button>
      </form>
      <div className="grid grid-cols-4 gap-6 w-full">
        {shops.length > 0 ? (
          shops.map((shop) => (
            <Link key={shop.id} href={`gourmets-cc/${shop.id}`}>
              <Card className="w-full h-80 overflow-y-auto">
                <CardHeader className="flex flex-col items-center space-y-4 p-6">
                  <CardTitle>{shop.name}</CardTitle>
                </CardHeader>
                <p className="mt-1">{shop.address || "住所情報なし"}</p>
                <p className="mt-1">{shop.budget.average || "金額情報なし"}</p>
                <Avatar
                  className="mx-auto"
                  style={{ width: "120px", height: "120px" }}
                >
                  <AvatarImage src={shop.photo.pc.m} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Card>
            </Link>
          ))
        ) : (
          <p>店舗が見つかりません</p>
        )}
      </div>
    </div>
  );
};

export default GourmetsClient;
