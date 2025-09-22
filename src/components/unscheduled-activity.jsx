import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { GripVertical, X, Plus } from "lucide-react";
import { Button } from './ui/button';
import DropdownOption from './scheduled/dropdown-option';
import * as LucideIcons from "lucide-react";

const UnscheduledActivity = ({ 
  getUnscheduledActivities, 
  onDragStart, 
  onDragEnd, 
  onUnscheduleDrop,
  onRemoveActivity = () => {}
}) => {
  const unscheduledActivities = getUnscheduledActivities();
  
  return (
    <Card className="hover:shadow-lg transition-all duration-300 w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Unscheduled Activities ({unscheduledActivities.length})
        </CardTitle>
        <CardDescription>Drag activities to schedule them for the weekend</CardDescription>
      </CardHeader>
      
      <CardContent
        className="space-y-3 min-h-[120px] p-4"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onUnscheduleDrop}
      >
        {unscheduledActivities.length === 0 ? (
          <div className="text-center text-muted-foreground py-8 animate-in fade-in scale-in-95 duration-500">
            <Plus className="w-8 h-8 mx-auto mb-2 opacity-50 animate-pulse" />
            <p className="text-sm">All activities are scheduled!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 min-[500px]:grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
            {unscheduledActivities.map((activity, index) => {
              const ActivityIcon = LucideIcons[activity.icon];
              return (
                <div
                  key={activity.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, activity)}
                  onDragEnd={onDragEnd}
                  className="flex items-center gap-2 md:gap-3 p-2 sm:p-3 bg-secondary/30 border rounded-lg cursor-move hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group animate-in fade-in slide-in-from-left-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <GripVertical className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-all duration-200">
                    <ActivityIcon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{activity.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {activity.duration} • {activity.price}
                    </p>
                  </div>

                  <DropdownOption onRemoveActivity={() => {onRemoveActivity(activity?.id)}} activityId={activity?.id}/>
                    
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UnscheduledActivity;