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
