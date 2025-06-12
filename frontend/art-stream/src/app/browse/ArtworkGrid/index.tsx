import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

export default function ArtworkGrid() {
  return (
    <div className="flex gap-8 w-full max-w-7xl justify-between">
      {/* Artwork Grid filtering controls */}
      <div className="w-sm border-neutral-700 border-2 rounded-lg">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="p-2">
            <AccordionTrigger>
              <h5 className="font-title text-xl">Tags</h5>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <hr className="border-neutral-700 border-1 w-full" />

          <AccordionItem value="item-2" className="p-2">
            <AccordionTrigger>
              <h5 className="font-title text-xl">Price</h5>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <hr className="border-neutral-700 border-1 w-full" />

          <AccordionItem value="item-3" className="p-2">
            <AccordionTrigger>
              <h5 className="font-title text-xl">Rating</h5>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <hr className="border-neutral-700 border-1 w-full" />
        </Accordion>
      </div>

      {/* Artwork Grid */}
      <div className="grid grid-cols-5 gap-4 w-full">
        {Array.from({ length: 20 }).map((_, index) => (
          <Card key={index} className="relative">
            <CardContent className="flex w-full aspect-square items-center justify-center p-4">
              <Image
                src={`/img/artwork-${Math.floor(Math.random() * 5) + 1}.jpg`}
                fill={true}
                alt="Picture of a artwork"
                className="rounded-lg"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
