import React from "react";
import * as LucideIcons from "lucide-react";
import { GripVertical, Calendar } from "lucide-react";
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
    weekendDay === "Long Weekend" ? sa.day === "daterange" : sa.day.toLowerCase() === weekendDay.toLowerCase()
  );

  return (
    <Card className="hover:shadow-lg transition-all duration-300 h-full flex flex-col gap-2 p-2">
      <CardHeader>
        <CardTitle className="pt-2 px-0 font-semibold text-lg">
          {weekendDay}
        </CardTitle>
      </CardHeader>
      <CardContent
        className={`flex-1 mx-4 mb-4 bg-secondary/20 transition-all duration-300 p-6 pr-8 rounded-lg border-2 border-dashed gap-2 
          ${ isDropTarget ? "border-primary bg-primary/10 scale-[1.02] shadow-lg": "border-muted hover:border-primary/50"} 
          animate-in fade-in slide-in-from-bottom-4`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {dayActivities.length === 0 ? (
          <div className="flex items-center justify-center flex-1 text-center">
            <div className="text-muted-foreground">
              <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm"> {isDropTarget ? "Drop activities here" : "Add or Drop activities here"} </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 min-[500px]:grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
            {dayActivities.map((scheduledActivity, index) => {
              const ActivityIcon = LucideIcons[scheduledActivity?.activity?.icon]; // fallback icon
              return (
                <div
                  key={scheduledActivity?.activity?.id}
                  draggable
                  onDragStart={(e) =>
                    onDragStart && onDragStart(e, scheduledActivity?.activity)
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
                    <h4 className="font-medium text-sm">
                      {scheduledActivity.activity.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {scheduledActivity.activity.duration} • {scheduledActivity.activity.price} {scheduledActivity?.time && `• ${scheduledActivity?.time}`} 
                    </p>
                  </div>

                  {onRemoveActivity && (
                    <DropdownOption
                      onRemoveActivity={() =>
                        onRemoveActivity(scheduledActivity.activity.id)
                      }
                      activityId={scheduledActivity.activity.id}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LongWeekendPanel;
