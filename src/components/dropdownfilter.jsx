import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DropdownFilter = ({
  filterValues = [],
  filterLabel = "Select an option",
  handleChange,
  defaultValue = "all",
  value,
  className = "w-[250px]",
}) => {

  const isActive = value !== defaultValue;

  return (
    <Select onValueChange={handleChange} value={value} className="w-full !text-xs">
      <SelectTrigger
        className={`${className} w-[150px] px-1.5 py-0 h-fit transition-colors ${
          isActive
            ? "border-2 border-accent/40 text-accent font-semibold  " // active state
            : "bg-muted/20 border-muted-foreground/20 text-muted-foreground" // default
        }`}
      >
        <SelectValue placeholder={filterLabel} />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value={defaultValue}>All {filterLabel}</SelectItem>
        {filterValues.map((item) => (
          <SelectItem key={item} value={item}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DropdownFilter;
