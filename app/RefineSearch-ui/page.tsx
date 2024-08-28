import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

 
export default function Page() {
  return (
    <div className="flex min-h-screen items-start justify-center pt-100">
      <form className="flex items-center space-x-4">
        <Input type="search" placeholder="キーワード検索..." />
        <Button type="submit">検索</Button>
      </form>
    </div>
  );
}