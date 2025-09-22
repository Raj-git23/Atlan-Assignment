import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Calendar, EllipsisVertical, GripVertical, X } from "lucide-react";
import { Badge } from "../ui/badge";
import DropdownOption from "./dropdown-option";
import * as LucideIcons from "lucide-react";
import SatSunDropdown from "../plannedSatSunDropdown";
import { getUpcomingDay } from "../helper";

const WeekendPanel = ({
  weekendDay,
  scheduledActivities = [],
  onDragOver,
  onDragLeave,
  onDrop,
  onDragStart,
  onDragEnd,
  onRemoveActivity,
  dragOverDay,
  isDropTarget,
  dateValue,
  onDateValueChange
}) => {
  // const [day, setDay] = useState('')


  // Get activities for this specific day
  const dayActivities = scheduledActivities.filter(
    (scheduledActivity) => scheduledActivity?.date && scheduledActivity?.date === dateValue
  );


  const handleDragOver = (e) => {
    e.preventDefault();
    if (onDragOver) {
      onDragOver(e, weekendDay.toLowerCase());
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (onDrop) {
      onDrop(e, weekendDay.toLowerCase(), dateValue);
    }
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      if (onDragLeave) {
        onDragLeave();
      }
    }
  };

  return (
    <main className="w-full h-96">
      <Card className="hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <CardHeader className="">
          <CardTitle className="flex items-center gap-2 mb-1">
            <div className="flex justify-between w-full">

              <div className="flex items-center gap-4 w-auto">
                <span className="flex items-center ms-1 gap-2 "> <Calendar className="w-5 h-5" /> {weekendDay} </span>
                {isDropTarget && (<Badge variant="default" className="text-xs bg-primary/20 ml-auto text-primary border-primary/20"> Drop Here </Badge>)}
              </div>


              <SatSunDropdown
                sat={weekendDay == "Saturday" ? true : false}
                sun={weekendDay == "Sunday" ? true : false}
                value={dateValue}
                onChange={onDateValueChange}
                className="border-0 text-secondary-foreground/80 space-x-2 flex"
              />
            </div>

          </CardTitle>

          <CardDescription className="w-full flex">
            Plan your activities for {weekendDay}
            {dayActivities.length > 0 && (<Badge variant="secondary" className="ml-auto"> {dayActivities.length} scheduled </Badge>)}
          </CardDescription>

        </CardHeader>

        <CardContent
          className={`flex-1 mx-4 mb-4 bg-secondary/20 transition-all duration-300 p-6 pr-8 rounded-lg border-2 border-dashed flex flex-col 
            ${isDropTarget ? "border-primary bg-primary/10 scale-[1.02] shadow-lg" : "border-muted hover:border-primary/50"} 
            animate-in fade-in slide-in-from-bottom-4`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {dayActivities.length === 0 ? (
            <div className="flex items-center justify-center flex-1 text-center">
              <div className="text-muted-foreground">
                <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">
                  {isDropTarget ? "Drop activities here" : "Add or Drop activities here"}
                </p>
              </div>
            </div>
          ) : (

            <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-3">
              {dayActivities.map((scheduledActivity, index) => {
                const ActivityIcon = LucideIcons[scheduledActivity.activity.icon];
                return (
                  <div
                    key={scheduledActivity.activity.id}
                    draggable
                    onDragStart={(e) =>
                      onDragStart && onDragStart(e, scheduledActivity.activity)
                    }
                    onDragEnd={onDragEnd}
                    className="flex items-center gap-3 p-3 bg-background border rounded-lg cursor-move transition-all duration-300 flex-shrink-0 hover:shadow-md hover:rotate-0.5 hover:translate-x-0.5 hover:translate-y-0.5"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <GripVertical className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />

                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-all duration-200">
                      <ActivityIcon className="w-4 h-4 text-primary" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm"> {scheduledActivity?.activity?.name} </h4>

                      <p className="text-xs text-muted-foreground">
                        {scheduledActivity?.activity?.duration} • {scheduledActivity?.activity?.price} {scheduledActivity?.time && `• ${scheduledActivity?.time}`}
                      </p>
                    </div>
                    {onRemoveActivity && (
                      <DropdownOption onRemoveActivity={() => { onRemoveActivity(scheduledActivity?.activity?.id) }} activityId={scheduledActivity?.activity?.id} />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default WeekendPanel;
