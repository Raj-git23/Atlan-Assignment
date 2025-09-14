import React from "react";
import * as LucideIcons from "lucide-react";
import { GripVertical } from "lucide-react";
import DropdownOption from "./dropdown-option"; // your remove dropdown component
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const LongWeekendPanel = ({
  weekendDay,
  scheduledActivities,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragStart,
  onDragEnd,
  onRemoveActivity,
  dragOverDay,
  isDropTarget,
}) => {
  // Filter activities
  const dayActivities = scheduledActivities.filter((sa) =>
    weekendDay === "Long Weekend" ? sa.day === "daterange" : sa.day?.toLowerCase() === weekendDay.toLowerCase()
  );

  return (
    <Card
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`flex-1 min-h-[300px] flex flex-col gap-2 overflow-y-auto border-2 p-2 ${isDropTarget ? "border-blue-500" : "border-gray-200"}`}
    >
      <CardHeader>
        <CardTitle className="pt-2 px-0 font-semibold text-lg">{weekendDay}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 px-2">
        {dayActivities.length > 0 ? (
          dayActivities.map((scheduledActivity, index) => {
            const ActivityIcon = LucideIcons[scheduledActivity.activity.icon] || LucideIcons.Coffee; // fallback icon
            return (
              <div
                key={scheduledActivity.activity.id}
                draggable
                onDragStart={(e) => onDragStart && onDragStart(e, scheduledActivity.activity)}
                onDragEnd={onDragEnd}
                className="flex items-center gap-3 p-3 bg-background border rounded-lg cursor-move transition-all duration-300 flex-shrink-0 hover:shadow-md hover:rotate-0.5 hover:translate-x-0.5 hover:translate-y-0.5"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <GripVertical className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />

                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-all duration-200">
                  <ActivityIcon className="w-4 h-4 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm">{scheduledActivity.activity.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {scheduledActivity.activity.duration} • {scheduledActivity.activity.price}
                  </p>
                </div>

                {onRemoveActivity && (
                  <DropdownOption
                    onRemoveActivity={() => onRemoveActivity(scheduledActivity.activity.id)}
                    activityId={scheduledActivity.activity.id}
                  />
                )}
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-400">No activities</p>
        )}
      </CardContent>
    </Card>
  );
};

export default LongWeekendPanel;
