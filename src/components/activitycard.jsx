import React from "react";
import { categoryColors, moodColors } from "@/assets/constants";
import { Clock, Plus, Calendar, X, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import ScheduleDialog from "./schedule-dialog";
import useActivityStore from "@/store/activityStore";
import { getButtonIcon, getButtonText, getButtonVariant } from "./helper";
import * as LucideIcons from "lucide-react";

const ActivityCard = ({ activity, index }) => {
  const ActivityIcon = LucideIcons[activity?.icon];
  const [openDialog, setOpenDialog] = React.useState(false);

  const { scheduledActivities, selectedActivities, addActivity, removeActivity, unscheduleActivity, getScheduledActivitiesForDay, } = useActivityStore();

  // Check if activity is in selected activities (available to be scheduled)
  const isInSelectedActivities = selectedActivities.some((a) => a.id === activity?.id);

  // Check if activity is scheduled for any day
  const scheduledActivity = scheduledActivities.find((sa) => sa.activity.id === activity?.id);
  const isScheduled = !!scheduledActivity;

  const scheduledDay = scheduledActivity?.day;
  const scheduledSlot = scheduledActivity?.time;

  const handleButtonClick = () => {
    if (isScheduled) {
      // If scheduled, open dialog to reschedule or show options
      setOpenDialog(true);
    } else if (isInSelectedActivities) {
      // If in selected but not scheduled, open dialog to schedule
      setOpenDialog(true);
    } else {
      // If not in selected activities, add it and open dialog
      addActivity(activity);
      setOpenDialog(true);
    }
  };

  const handleRemoveActivity = (e) => {
    e.stopPropagation(); // Prevent opening dialog
    removeActivity(activity.id);
  };



  return (
    <>
      <Card
        key={activity?.id}
        className={`cursor-pointer flex flex-col gap-2 pb-4 pt-0 transition-all overflow-hidden duration-300 hover:shadow-xl hover:scale-[1.02] group
                    ${isScheduled ? "ring-2 ring-primary/60 shadow-lg bg-primary/10" : ""}
                    ${isInSelectedActivities && !isScheduled ? "ring-1 ring-secondary-foreground/40 bg-muted" : ""}
                  `}
        style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
        onClick={handleButtonClick}
      >
        <CardHeader className="p-0">


          {/* Activity Image */}
          <div className="relative w-full h-52 overflow-hidden rounded-t-lg">
            {/* The actual image */}
            <img
              src={activity?.img}
              alt={activity?.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Dark overlay - sits above image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />

            {/* Info container - sits above overlay */}
            <div className="flex items-center w-full justify-between absolute bottom-4 px-5 z-20">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 
                    ${isScheduled ? "bg-primary/40" : "bg-primary/20 hover:bg-primary/30"}
                  `}
                >
                  <ActivityIcon className="w-5 h-5 text-secondary" />
                </div>

                {/* Category and Mood */}
                <div>
                  <CardTitle className="text-lg flex items-center gap-2 text-secondary font-semibold">
                    {activity?.name}
                    {isScheduled && (
                      <Badge
                        variant="outline"
                        className="text-xs bg-accent-foreground/30 text-accent-foreground border-bg-accent-foreground/60"
                      >
                        {scheduledSlot}
                      </Badge>
                    )}
                  </CardTitle>

                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      className={`${categoryColors[activity?.category]} hover:scale-105 transition-all duration-200`}
                      variant="secondary"
                    >
                      {activity?.category.charAt(0).toUpperCase() +
                        activity?.category.slice(1)}
                    </Badge>

                    <Badge
                      className={`${moodColors[activity?.mood]} hover:scale-105 transition-all duration-200`}
                      variant="secondary"
                    >
                      {activity?.mood.charAt(0).toUpperCase() +
                        activity?.mood.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>

            </div>
          </div>
          {/* End of Activity Image */}
        </CardHeader>

        <div className="flex items-center justify-between px-5">
          <p className="text-foreground font-semibold text-sm"> {activity?.description} </p>

          {/* Remove Activity Button */}
          {isInSelectedActivities && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleRemoveActivity}
              className="opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 text-red-500 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
        <CardContent className="mt-auto px-5">
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-4 text-sm text-secondary-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {activity?.duration}
              </div>
              <div className="font-medium"> {activity?.price} </div>
            </div>

            {!isScheduled && (
              <Button
                size="sm"
                variant={getButtonVariant({
                  isScheduled,
                  isInSelectedActivities,
                })}
                onClick={handleButtonClick}
                className="gap-2 hover:scale-105 transition-all duration-200 hover:cursor-pointer"
              >
                {/* {getButtonIcon({ isScheduled })} */}
                {getButtonText({ isScheduled, scheduledDay, isInSelectedActivities, })}
              </Button>
            )}
          </div>

          {isScheduled && (
            <div className="flex gap-2 items-center text-sm font-medium bg-card-foreground/10 text-secondary-foreground border border-primary/20 rounded-md py-1 px-2 mt-4">
              <Calendar size={16} />
              {scheduledDay === "daterange" ? (
                <>
                  Scheduled from {scheduledActivity?.dateRange?.startDate || "N/A"}
                  {scheduledActivity?.dateRange?.endDate ? ` to ${scheduledActivity?.dateRange?.endDate}` : ''}
                </> 
              ) : (
                <>
                  Scheduled on{" "}
                  {scheduledActivity?.date
                    ? new Date(scheduledActivity.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                    : scheduledDay.charAt(0).toUpperCase() + scheduledDay.slice(1)}{" "}
                  {scheduledSlot && `at ${scheduledSlot}`}
                </>
              )}
            </div>
          )}


        </CardContent>
      </Card>

      {openDialog && (
        <ScheduleDialog
          open={openDialog}
          setOpen={setOpenDialog}
          activity={activity}
        />
      )}
    </>
  );
};

export default ActivityCard;
