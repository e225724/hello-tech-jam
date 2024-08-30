"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";

// データ型を定義
type FormData = {
  price: number;
};

export default function ProfileForm({
  setPrice,
}: {
  setPrice: (price: number) => void;
}) {
  const form = useForm<FormData>({
    resolver: zodResolver(
      z.object({
        price: z
          .number()
          .min(0, { message: "Price must be at least 0." })
          .max(100, { message: "Price must be at most 100." })
          .default(0),
      }),
    ),
    defaultValues: {
      price: 0,
    },
  });

  // スライダーの値が変更されたときに価格を設定
  const handleSliderChange = (value: number) => {
    setPrice(value); // 親コンポーネントに価格を設定
  };

  return (
    <div className="max-w-2xl mx-auto my-12">
      {/* 雰囲気テキストの表示 */}
      <div className="flex justify-between mb-4">
        <span>静か</span>
        <span>雰囲気</span>
        <span>賑やか</span>
      </div>
      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="price"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>雰囲気：{value}</FormLabel>
                <FormControl>
                  <Slider
                    min={-50}
                    max={50}
                    step={1}
                    defaultValue={[value]}
                    onValueChange={(vals) => {
                      onChange(vals[0]);
                      handleSliderChange(vals[0]);
                    }}
                    value={[form.getValues("price")]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
