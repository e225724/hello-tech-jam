"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const FormSchema = z.object({
  email: z
    .string({
      required_error: "予算額を選択してください",
    })
    .email(),
})

export function TogglePrice() {
  const [value, setValue] = useState([]);
  const handleClick = (range) => {
    let newValue;
    switch (range) {
      case '2000':
        newValue = ["B009", "B011", "B010", "B009"];
        break;
      case '3000-4000':
        newValue = ["B003"];
        break;
      case '4000-5000':
        newValue = ["B008"];
        break;
      case '5000':
        newValue = ["B004","B005","B006","B012","B013","B014",];
        break;
      default:
        newValue = [];
    }
    setValue(newValue);
  };
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
   {/*} toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })*/}
    
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="予算額"
          render={({ field }) => (
            <FormItem>
              <FormLabel>予算額</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="予算額を選択する" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    <SelectItem onClick={() => handleClick('2000')}>～2000</SelectItem>
                    <SelectItem onClick={() => handleClick('3000')}>2001～4000</SelectItem>
                    <SelectItem onClick={() => handleClick('4000')}>4001～5000</SelectItem>
                    <SelectItem onClick={() => handleClick('5000')}>5001～</SelectItem>
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




{/*
"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TogglePrice() {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <span className="sr-only">Toggle Price</span>
          <p>価格</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          ～2000
        </DropdownMenuItem>
        <DropdownMenuItem >
          2000～3000
        </DropdownMenuItem>
        <DropdownMenuItem >
          3000～4000
        </DropdownMenuItem>
        <DropdownMenuItem >
          4000～
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
*/}