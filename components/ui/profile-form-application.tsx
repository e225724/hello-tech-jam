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
  priceApplication: number;
};

export default function ProfileFormApplication({
  setPriceApplication,
}: {
  setPriceApplication: (priceApplication: number) => void;
}) {
  const form = useForm<FormData>({
    resolver: zodResolver(
      z.object({
        priceApplication: z
          .number()
          .min(0, { message: "Price must be at least 0." })
          .max(100, { message: "Price must be at most 100." })
          .default(0),
      }),
    ),
    defaultValues: {
      priceApplication: 0,
    },
  });

  // スライダーの値が変更されたときに価格を設定
  const handleSliderChange = (value: number) => {
    setPriceApplication(value);
  };

  return (
    <div className="max-w-2xl mx-auto my-12">
      <div className="flex justify-between mb-4">
        <span>普段</span>
        <span>使用用途</span>
        <span>特別</span>
      </div>

      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="priceApplication"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>使用用途：{value}</FormLabel>
                <FormControl>
                  <Slider
                    min={-50}
                    max={50}
                    step={1}
                    defaultValue={[value]}
                    onValueChange={(vals) => {
                      onChange(vals[0]);
                      handleSliderChange(vals[0]); // スライダーの値変更時に呼び出し
                    }}
                    value={[form.getValues("priceApplication")]}
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
