
"use client"

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

export function ToggleMember() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="人数を入力" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>人数</SelectLabel>
          <SelectItem value="1~2">1～2</SelectItem>
          <SelectItem value="2~5">2~5</SelectItem>
          <SelectItem value="5~10">5~10</SelectItem>
          <SelectItem value="10以上">10以上</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}