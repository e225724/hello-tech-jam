"use client";

import React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleMember } from "@/components/dropdown_member";
import { TogglePlace } from "@/components/dropdown_place";
import { TogglePrice } from "@/components/dropdown_price";
import { CheckboxOrder } from "@/components/CheckboxOrder";
import { Calendar } from "@/components/ui/calendar";
import { SelectForm } from "@/components/SelectForm";

import { useToast } from "@/components/ui/use-toast";

export default function Page() {
  const [keyword, setKeyword] = useState("");
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setKeyword(value);
    console.log(keyword);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("button click", keyword);
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
        <ToggleMember />
        <TogglePlace />
        <TogglePrice />
        <SelectForm />

      </div>
      <div className="flex items-center justify-center gap-20">
       <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        />
        <CheckboxOrder />

      </div>
      <div className="flex items-center justify-center gap-20">
        <button>絞り込み検索</button>
      </div>
    </div>
  );
}
