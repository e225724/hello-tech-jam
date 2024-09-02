"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
//import { toast } from "@/components/ui/use-toast"

const items = [
  {
    id: "private_room=1",
    label: "個室あり",
  },
  {
    id: "parking=1",
    label: "駐車場あり",
  },
  {
    id: "non_smoking=1",
    label: "禁煙席あり",
  },
] as const;

const FormSchema = z.object({
  items: z.array(z.string()),
});

export function CheckboxOrder({
  onCheckboxOrder,
}: {
  onCheckboxOrder: (selectedArray2: string[]) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  const [selectedArray3, setSelectedArray3] = useState<string[]>([]);

  function onRangeChange(value: string) {
    let arrayToSave: string[] = [];
  }

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">その他絞り込み条件</FormLabel>
                <FormDescription>
                  必要なものにチェックを入れてください
                </FormDescription>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              const updatedValue = checked
                                ? [...field.value, item.id]
                                : field.value?.filter(
                                    (value) => value !== item.id,
                                  );

                              field.onChange(updatedValue);

                              // onRangeChangeを呼び出す
                              onRangeChange(item.id);
                            }}
                            defaultValue={field.value}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
