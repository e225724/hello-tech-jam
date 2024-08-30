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
    required_error: "予算額を選択してください.",
  }),
})

export function ToggleGenre() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  
  const [selectedArray, setSelectedArray] = useState<string[]>([])

  function onSubmit(data: z.infer<typeof FormSchema>) {
    let arrayToSave: string[] = []

    switch(data.range) {
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
              <FormLabel>金額</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
