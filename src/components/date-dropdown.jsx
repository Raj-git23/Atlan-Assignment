import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "./ui/calendar";

const DateDropdown = () => {
  return (
    <Popover className="p-0">
      <PopoverTrigger>
        <p className="bg-secondary/40 px-2 py-1 rounded-lg border-2 border-foreground/20"> Select Date </p>
      </PopoverTrigger>
      <PopoverContent className={"w-full h-fit p-1"}>
        <Calendar className="text-sm w-full" classNames="text-sm w-full" />
      </PopoverContent>
    </Popover>
  );
};

export default DateDropdown;
