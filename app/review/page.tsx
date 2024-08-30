"use client";

import { useState } from "react";
import { SelectForm } from "@/components/ui/select-form-review";
import StarRating from "@/components/ui/star-rating";
import { Textarea } from "@/components/ui/textarea";
import ProfileForm from "@/components/ui/profile-form-atmosphere";
import ProfileFormApplication from "@/components/ui/profile-form-application";

export default function ReviewPage() {
  const [jobTitle, setJobTitle] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [textareaValue, setTextareaValue] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [priceApplication, setPriceApplication] = useState<number>(0);

  const handleSubmit = async () => {
    let role = 1;
    if (jobTitle === "Employee") role = 2;
    try {
      const response = await fetch("/api/databases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewer: textareaValue,
          shop_id: "your-shop-id", // 必要に応じて設定してください
          role: role, // 必要に応じて設定
          rating: rating,
          detailReviewer: {
            detailed_reviewer_1: price,
            detailed_reviewer_2: priceApplication,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("データ送信に失敗しました");
      }

      const result = await response.json();
      console.log("レビューが正常に送信されました:", result);
    } catch (error) {
      console.error("エラー:", error);
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    setTextareaValue(event.target.value);
  };

  return (
    <div>
      <h1>レビュー画面</h1>
      <div className="flex justify-center">
        <h3>役職</h3>
      </div>
      <SelectForm onJobTitleChange={setJobTitle} />
      <div className="flex justify-center">
        <h3>評価(5段階)</h3>
      </div>
      <StarRating onRatingChange={setRating} />
      <div className="flex justify-center">
        <h3>口コミ</h3>
      </div>
      <Textarea className="w-full max-w-xs h-2" onChange={handleChange} />

      <ProfileForm setPrice={setPrice} />
      <ProfileFormApplication setPriceApplication={setPriceApplication} />
      <div className="flex justify-center my-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" // 色を加えたスタイル
        >
          Submit All
        </button>
      </div>
    </div>
  );
}
