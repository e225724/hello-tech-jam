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
    required_error: "予算額を選択してください.",
  }),
})

export function TogglePrice({
  onPriceSelect,
}: {
  onPriceSelect: (selectedArray1: string[]) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  
  const [selectedArray1, setSelectedArray1] = useState<string[]>([])

  function onRangeChange(value: string) {
    let arrayToSave: string[] = []

    switch(value) {
      case "0-2000":
        arrayToSave = ["B009", "B011", "B010", "B009"]
        break
      case "2001-4000":
        arrayToSave = ["B003"]
        break
      case "4001-5000":
        arrayToSave = ["B008"]
        break
      case "5001+":
        arrayToSave = ["B004", "B005", "B006", "B012", "B013", "B014"]
        break
    }

    // useStateで保存
    setSelectedArray1(arrayToSave);

    onPriceSelect(arrayToSave);
    
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
              <FormLabel>金額</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  onRangeChange(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="予算を選択してください" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0-2000">～2000</SelectItem>
                  <SelectItem value="2001-4000">2001～4000</SelectItem>
                  <SelectItem value="4001-5000">4001～5000</SelectItem>
                  <SelectItem value="5001+">5001～</SelectItem>
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
