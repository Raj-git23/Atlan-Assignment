"use client";

import { useEffect, useState } from "react";
import moment from "moment";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SatSunDropdown({
  name = "day",
  value,
  sat = true,
  sun = false,
  className = "w-[250px]",
  disabled = false,
  disabledIndices = [], // NEW: pass array of indices to disable
  onChange = () => {},
}) {
  const [dates, setDates] = useState([]);
  const [val, setVal] = useState(value ?? undefined);
  
  useEffect(() => {
    const generateDates = () => {
      const days = [];
      let current = moment();

      while (days.length < 6) {
        const day = current.day();

        if ((sat && day === 6) || (sun && day === 0)) {
          days.push({
            label: current.format(" MMM D, dddd"),
            value: current.format("YYYY-MM-DD"),
          });
        }

        current = current.add(1, "day");
      }
      return days;
    };

    setDates(generateDates());
  }, [sat, sun]);

  useEffect(() => {
    setVal(value ?? undefined);
  }, [value]);

  return (
    <Select
      value={val}
      onValueChange={(newVal) => {
        setVal(newVal);
        onChange(newVal);
      }}
      disabled={disabled} // disables the whole select if true
    >
      <SelectTrigger
        id={name}
        name={name}
        className={cn(
          "h-10 px-3 py-1 text-sm shadow-xs transition-colors rounded-md border border-input focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
      >
        <SelectValue
          placeholder={
            sat && sun
              ? "Select Day"
              : sat
              ? "Select Saturday"
              : "Select Sunday"
          }
        />
      </SelectTrigger>

      <SelectContent>
        <SelectItem>
          {sat && sun
            ? "Select Day"
            : sat
            ? "Select Saturday"
            : "Select Sunday"}
        </SelectItem>
        {dates.map((date, idx) => (
          <SelectItem
            key={idx}
            value={date.value}
            disabled={disabledIndices.includes(idx)}
          >
            {date.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
