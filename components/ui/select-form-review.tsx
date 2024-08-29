// components/ui/select-form-review.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
  jobTitle: z.string().nonempty("役職を選択してください."),
});

interface SelectFormProps {
  onJobTitleChange: (value: string) => void;
}

export function SelectForm({ onJobTitleChange }: SelectFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    onJobTitleChange(data.jobTitle);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-40 ml-4 space-y-6"
    >
      <Select onValueChange={(value) => form.setValue("jobTitle", value)}>
        <SelectTrigger>
          <SelectValue placeholder="役職を選択" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Manager">マネージャー</SelectItem>
          <SelectItem value="Employee">社員</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit">Submit</Button>
    </form>
  );
}
