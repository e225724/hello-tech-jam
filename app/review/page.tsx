"use client";

import { SelectForm } from "@/components/ui/select-form-review";
import { Slider } from "@/components/ui/slider";
import StarRating from "@/components/ui/star-rating";
import { Textarea } from "@/components/ui/textarea";
import ProfileForm from "@/components/ui/profileForm";

export default function ReviewPage() {
  return (
    <div>
      <h1>レビュー画面</h1>
      <h3>役職</h3>
      <SelectForm />
      <h3>棒グラフ</h3>
      <Slider defaultValue={[33]} max={100} step={1} />
      <h3>評価</h3>
      <StarRating />
      <h3>テキストエリア</h3>
      <Textarea className="w-full max-w-xs h-2" />
      <h3>棒グラフ</h3>
      <ProfileForm />
      <ProfileForm />
    </div>
  );
}
