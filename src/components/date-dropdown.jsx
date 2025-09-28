import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "./ui/calendar";

const DateDropdown = ({mode = "single"}) => {
  return (
    <Popover className="p-0 ml-auto">
      <PopoverTrigger className="bg-secondary/40 h-fit w-full whitespace-nowrap rounded-md px-4 text-foreground/80 py-1 border-2 border-foreground/20"> Select Date </PopoverTrigger>
      <PopoverContent className={"w-full h-fit p-1"}>
        <Calendar mode={mode} className="text-sm w-full" classNames="text-sm w-full" />
      </PopoverContent>
    </Popover>
  );
};

export default DateDropdown;
