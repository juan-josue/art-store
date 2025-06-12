import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function Grid() {
  return (
    <div className="grid grid-cols-5 gap-4 w-2/3">
      {Array.from({ length: 20 }).map((_, index) => (
        <Card key={index} className="relative">
          <CardContent className="flex w-full aspect-square items-center justify-center p-4">
            <Image
              src={`/img/artwork-3.jpg`}
              fill={true}
              alt="Picture of a artwork"
              className="rounded-lg"
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
