"use client";

import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { SelectForm } from "@/components/ui/select-form-review";
import StarRating from "@/components/ui/star-rating";
import { Textarea } from "@/components/ui/textarea";
import ProfileForm from "@/components/ui/profile-form-atmosphere";
import ProfileFormApplication from "@/components/ui/profile-form-application";
import Link from "next/link";

export default function ReviewPage() {
  const params = useParams();
  const shopId = params.id;
  const searchParams = useSearchParams();
  const shopName = searchParams.get("shopName");

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
          shop_id: shopId,
          role: role,
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
      {/* Flexboxを使用して、タイトルと戻るボタンを水平に並べる */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold">{shopName}</h1>
        <Link href={`/gourmets-cc/${shopId}`}>
          <button className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400">
            戻る
          </button>
        </Link>
      </div>
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
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          レビューする
        </button>
      </div>
    </div>
  );
}
