"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const FormSchema = z.object({
  range: z.string({
    required_error: "場所を選択してください",
  }),
})

export function TogglePlace({
  onPlaceSelect,
}: {
  onPlaceSelect: (selectedArray2: string[]) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  
  const [selectedArray, setSelectedArray] = useState<string[]>([])

  function onRangeChange(value: string) {
    let arrayToSave: string[] = []

    switch(value) {
      case "国際通り":
        arrayToSave = ["X114"]
        break
      case "新都心":
        arrayToSave = ["Z717"]
        break
      case "久茂地":
        arrayToSave = ["XX00"]
        break
      case "那覇松山・若狭":
        arrayToSave = ["X716"]
        break
      case "その他の那覇地域":
        arrayToSave = ["X718", "X719", "X720", "XX01", "XX02", "XX03", "XX04", "XX05", "XX06", "XX07", "XX0j", "XX0R"]
        break
    }

    // useStateで保存
    setSelectedArray(arrayToSave);

    onPlaceSelect(arrayToSave);
    
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
              <FormLabel>場所</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  onRangeChange(value);
                }} 
                defaultValue={field.value}
                >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="場所を選択してください" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="国際通り">国際通り</SelectItem>
                  <SelectItem value="新都心">新都心</SelectItem>
                  <SelectItem value="久茂地">久茂地</SelectItem>
                  <SelectItem value="那覇松山・若狭">那覇松山・若狭</SelectItem>
                  <SelectItem value="その他の那覇地域">その他の那覇地域</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
