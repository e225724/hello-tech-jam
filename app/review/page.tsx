"use client";

import { useState } from "react";
import { SelectForm } from "@/components/ui/select-form-review";
import { Slider } from "@/components/ui/slider";
import StarRating from "@/components/ui/star-rating";
import { Textarea } from "@/components/ui/textarea";
import ProfileForm from "@/components/ui/profileForm";

export default function ReviewPage() {
  const [jobTitle, setJobTitle] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [textareaValue, setTextareaValue] = useState<string>("");

  const handleSubmit = () => {
    console.log("Job Title:", jobTitle);
    console.log("Rating:", rating);
    console.log("Textarea Value:", textareaValue);
  };

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    setTextareaValue(event.target.value);
  };

  return (
    <div>
      <h1>レビュー画面</h1>
      <h3>役職</h3>
      <SelectForm onJobTitleChange={setJobTitle} />
      <h3>評価</h3>
      <StarRating onRatingChange={setRating} />
      <h3>テキストエリア</h3>
      <Textarea className="w-full max-w-xs h-2" onChange={handleChange} />
      <ProfileForm />

      <button onClick={handleSubmit}>Submit All</button>
    </div>
  );
}
