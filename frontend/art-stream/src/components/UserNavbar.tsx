import { Search } from "lucide-react";
import { Aperture } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UserNavbar() {
  return (
    <div className="border-b-1 py-4">
      <div className="flex flex-col w-full max-w-7xl mx-auto items-center p-4 justify-between">
        <div className="flex w-full gap-8 font-body text-xl items-center">
          <Aperture className="w-16 h-16" />
          <Input className="w-full h-16" placeholder="What are you looking for?" />
          <Button variant={"secondary"} className="h-16 w-32">
            <Search /> Search
          </Button>
        </div>
      </div>
    </div>
  );
}
