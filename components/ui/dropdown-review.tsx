"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// 役職名のマッピング
const roleNames: Record<"default" | "top" | "bottom", string> = {
  default: "役職",
  top: "マネージャー",
  bottom: "社員",
};

export function DropdownMenuRadioGroupDemo() {
  const [position, setPosition] = React.useState<"top" | "bottom" | "default">(
    "default",
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {position ? roleNames[position] : "役職"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        {/* 型アサーションを使用して型を調整 */}
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={(value) =>
            setPosition(value as "default" | "top" | "bottom")
          }
        >
          <DropdownMenuRadioItem value="top">
            マネージャー
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">社員</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
