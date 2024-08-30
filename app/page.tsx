"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleMember } from "@/components/dropdown_member";
import { TogglePlace } from "@/components/dropdown_place";
import { TogglePrice } from "@/components/dropdown_price";
import { CheckboxOrder } from "@/components/CheckboxOrder";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";

export default function Page() {
  const [keyword, setKeyword] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [memberRange, setMemberRange] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [placeRange, setPlaceRange] = useState<string[]>([]);
  const [checkboxOrder, setCheckboxOrder] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setKeyword(value);
    console.log(keyword);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(
      "button click",
      keyword,
      memberRange,
      priceRange,
      placeRange,
      CheckboxOrder,
    );
  };

  const handleMemberSelect = (selectedArray: string[]) => {
    console.log("selectedArray", selectedArray);
    setMemberRange(selectedArray);
  };

  const handlePriceSelect = (selectedArray1: string[]) => {
    console.log("selectedArray1", selectedArray1);
    setPriceRange(selectedArray1);
  };

  const handlePlaceSelect = (selectedArray2: string[]) => {
    console.log("selectedArray2", selectedArray2);
    setPlaceRange(selectedArray2);
  };

  const handleCheckboxOrder = (selectedArray3: string[]) => {
    console.log("selectedArray3", selectedArray3);
    setCheckboxOrder(selectedArray3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (keyword) searchParams.append("keyword", keyword);
    if (location) searchParams.append("location", location);
    router.push(`/gourmets-cc?${searchParams.toString()}`);
  };

  return (
    <div className="flex flex-col items-center justify-center pt-36 pb-13">
      <form className="flex items-center space-x-4 mb-4">
        <Input
          type="search"
          placeholder="検索..."
          onChange={handleInputChange}
          className="max-w-sm w-full"
        />
      </form>

      <div className="flex items-center justify-center gap-20">
        <ToggleMember onMemberSelect={handleMemberSelect} />
        <TogglePlace onPlaceSelect={handlePlaceSelect} />
        <TogglePrice onPriceSelect={handlePriceSelect} />
      </div>
      <div className="flex items-center justify-center gap-20">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        <CheckboxOrder onCheckboxOrder={handleCheckboxOrder} />
      </div>
      <div className="flex items-center justify-center gap-20">
        <Button type="submit" onClick={handleSubmit} className="max-w-sm">
          絞り込み検索
        </Button>
      </div>
    </div>
  );
}
