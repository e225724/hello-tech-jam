import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function TogglePrice() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="予算額を選択" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>予算</SelectLabel>
          <SelectItem value="~2000">~2000</SelectItem>
          <SelectItem value="2000~4000">2000~4000</SelectItem>
          <SelectItem value="4000~5000">4000~5000</SelectItem>
          <SelectItem value="5000~">5000~</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
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