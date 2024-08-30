import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
    <div className="flex justify-center">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-40" // 幅を40pxに設定
      >
        <Select
          onValueChange={(value) => {
            form.setValue("jobTitle", value);
            onJobTitleChange(value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="役職を選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Manager">マネージャー</SelectItem>
            <SelectItem value="Employee">社員</SelectItem>
          </SelectContent>
        </Select>
      </form>
    </div>
  );
}
