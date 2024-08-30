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
//import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  range: z.string({
    required_error: "人数を選択してください",
  }),
})

export function ToggleMember() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  
  const [selectedArray, setSelectedArray] = useState<string[]>([])

  function onSubmit(data: z.infer<typeof FormSchema>) {
    let arrayToSave: string[] = []

    switch(data.range) {
      case "0-10":
        arrayToSave = ["0", "10"]
        break
      case "11-30":
        arrayToSave = ["11", "30"]
        break
      case "31-50":
        arrayToSave = ["31", "50"]
        break
      case "51-70":
        arrayToSave = ["51", "70"]
        break
      case "71-100":
        arrayToSave = ["71", "100"]
        break
      case "100-150":
        arrayToSave = ["100", "150"]
        break
      case "151+":
        arrayToSave = ["151", ""]
        break
    }

    // useStateで保存
    setSelectedArray(arrayToSave)
    
    // コンソールに出力
    console.log(arrayToSave)
{/*}
    toast({
      title: "You selected the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(arrayToSave, null, 2)}</code>
        </pre>
      ),
    })*/}
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="range"
          render={({ field }) => (
            <FormItem>
              <FormLabel>人数</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
