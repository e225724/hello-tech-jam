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

export function TogglePlace() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="場所を選択" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>場所</SelectLabel>
          <SelectItem value="国際通り">国際通り</SelectItem>
          <SelectItem value="新都心">新都心</SelectItem>
          <SelectItem value="おもろまち">おもろまち</SelectItem>
          <SelectItem value="久茂地">久茂地</SelectItem>
          <SelectItem value="その他">その他</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
