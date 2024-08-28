"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ToggleMember() {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <span className="sr-only">Toggle Member</span>
          <p>人数</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          1～2
        </DropdownMenuItem>
        <DropdownMenuItem >
          2～5
        </DropdownMenuItem>
        <DropdownMenuItem >
          5～10
        </DropdownMenuItem>
        <DropdownMenuItem >
          10人以上
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
