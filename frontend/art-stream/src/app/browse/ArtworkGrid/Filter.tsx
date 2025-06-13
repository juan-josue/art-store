import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

import { Star } from "lucide-react";

export default function Filter() {
  return (
    <div className="absolute top-0 left-0 w-sm  border-neutral-800 border-1 rounded-lg">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="p-2">
          <AccordionTrigger>
            <h5 className="font-title text-xl">Tags</h5>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 justify-center">
              <Toggle size={"lg"} variant={"outline"}>
                Tag
              </Toggle>
              <Toggle size={"lg"} variant={"outline"}>
                Tag
              </Toggle>
              <Toggle size={"lg"} variant={"outline"}>
                Tag
              </Toggle>
              <Toggle size={"lg"} variant={"outline"}>
                Tag
              </Toggle>
              <Toggle size={"lg"} variant={"outline"}>
                Tag
              </Toggle>
            </div>
          </AccordionContent>
        </AccordionItem>
        <Separator />

        <AccordionItem value="item-2" className="p-2">
          <AccordionTrigger>
            <h5 className="font-title text-xl">Price</h5>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-2">
              <Input />
              <h5 className="font-body text-xl">to</h5>
              <Input />
            </div>
          </AccordionContent>
        </AccordionItem>
        <Separator />

        <AccordionItem value="item-3" className="p-2">
          <AccordionTrigger>
            <h5 className="font-title text-xl">Rating</h5>
          </AccordionTrigger>
          <AccordionContent>
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Star />
                <Star className="text-neutral-700" />
                <Star className="text-neutral-700" />
                <Star className="text-neutral-700" />
                <Star className="text-neutral-700" />
                <h5 className="font-body text-md">and up</h5>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Star />
                <Star />
                <Star className="text-neutral-700" />
                <Star className="text-neutral-700" />
                <Star className="text-neutral-700" />
                <h5 className="font-body text-md">and up</h5>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-three" id="option-three" />
                <Star />
                <Star />
                <Star />
                <Star className="text-neutral-700" />
                <Star className="text-neutral-700" />
                <h5 className="font-body text-md">and up</h5>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-four" id="option-four" />
                <Star />
                <Star />
                <Star />
                <Star />
                <Star className="text-neutral-700" />
                <h5 className="font-body text-md">and up</h5>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-five" id="option-five" />
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
