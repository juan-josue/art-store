import { Search } from "lucide-react";
import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function GuestNavbar() {
  return (
    <div className="border-b-1 py-4">
      <div className="flex flex-col w-full max-w-7xl mx-auto items-center p-4 justify-between">
        <div className="flex w-full gap-8 font-body text-xl">
          <h1 className="font-shrikhand font-foreground text-4xl font-extrabold text-nowrap">
            ART STREAM
          </h1>
          <Input className="w-full" placeholder="What are you looking for?" />
          <Button variant={"secondary"}>
            <Search /> Search
          </Button>
          <Button>
            <LogIn /> Login
          </Button>
        </div>
      </div>
    </div>
  );
}
