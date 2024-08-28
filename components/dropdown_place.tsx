"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TogglePlace() {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <span className="sr-only">Toggle Place</span>
          <p>場所</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          国際通り
        </DropdownMenuItem>
        <DropdownMenuItem >
          久茂地
        </DropdownMenuItem>
        <DropdownMenuItem >
          新都心
        </DropdownMenuItem>
        <DropdownMenuItem >
          おもろまち
        </DropdownMenuItem>
        <DropdownMenuItem >
          その他
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
