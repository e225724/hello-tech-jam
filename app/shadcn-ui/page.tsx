"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleMember } from "@/components/dropdown_member";
import { TogglePlace } from "@/components/dropdown_place";
import { TogglePrice } from "@/components/dropdown_price";
import { CheckboxOrder } from "@/components/CheckboxOrder";



export default function Page() {
  const [keyword, setKeyword] = useState("");

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
        <Button type="submit" onClick={handleButtonClick} className="max-w-sm">
          検索
        </Button>
      </form>

      <div className="flex items-center justify-center gap-20">
        <ToggleMember />
        <TogglePlace />
        <TogglePrice />
        <CheckboxOrder />

      </div>
    </div>
  );
}
