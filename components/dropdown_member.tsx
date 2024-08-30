"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
  range: z.string({
    required_error: "人数を選択してください",
  }),
});

export function ToggleMember({
  onMemberSelect,
}: {
  onMemberSelect: (selectedArray: string[]) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [selectedArray, setSelectedArray] = useState<string[]>([]);

  function onRangeChange(value: string) {
    let arrayToSave: string[] = [];

    switch (value) {
      case "0-10":
        arrayToSave = ["0", "10"];
        break;
      case "11-30":
        arrayToSave = ["11", "30"];
        break;
      case "31-50":
        arrayToSave = ["31", "50"];
        break;
      case "51-70":
        arrayToSave = ["51", "70"];
        break;
      case "71-100":
        arrayToSave = ["71", "100"];
        break;
      case "100-150":
        arrayToSave = ["100", "150"];
        break;
      case "151+":
        arrayToSave = ["151", ""];
        break;
    }

    // useStateで保存
    setSelectedArray(arrayToSave);

    // コールバック関数を呼び出して親コンポーネントにデータを渡す
    onMemberSelect(arrayToSave);

    // コンソールに出力
    console.log(arrayToSave);
  }

  return (
    <Form {...form}>
      <form className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="range"
          render={({ field }) => (
            <FormItem>
              <FormLabel>人数</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  onRangeChange(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="人数を選択してください" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0-10">～10</SelectItem>
                  <SelectItem value="11-30">11～30</SelectItem>
                  <SelectItem value="31-50">31～50</SelectItem>
                  <SelectItem value="51-70">51～70</SelectItem>
                  <SelectItem value="71-100">71～100</SelectItem>
                  <SelectItem value="101-150">101～150</SelectItem>
                  <SelectItem value="151+">151～</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}