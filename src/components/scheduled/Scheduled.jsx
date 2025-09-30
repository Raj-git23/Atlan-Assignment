import React, { useEffect, useState } from 'react'
import Summary from './summary'
import WeekendPanel from './WeekendPanel'
import Unscheduled from './Unscheduled'
import useActivityStore from '@/store/activityStore'
import { Coffee, Utensils } from 'lucide-react'
import UnscheduledActivity from '../unscheduled-activity'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '../ui/button'
import { Switch } from '../ui/switch'
import LongWeekendPanel from './Longweek'
import { Input } from '../ui/input'
import { getDateWithActivity, getUpcomingDay } from '../helper'
import AddPeopleDialog from '../add-people-dialog'

const Scheduled = () => {

  const [openDialog, setOpenDialog] = useState(false);
  const [activityId, setActivityId] = useState(null);
  const [peopleDialogActivity, setPeopleDialogActivity] = useState(null);

  const { scheduledActivities, selectedActivities, draggedActivity, dragOverDay, scheduleActivity, unscheduleActivity, removeActivity, addActivity, setDraggedActivity, setDragOverDay, clearDragState, getUnscheduledActivities, getScheduledActivitiesForDay, } = useActivityStore();


  const [longWeekendMode, setLongWeekendMode] = useState(false);
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });


  const [weekendDate, setWeekendDate] = useState({
    saturdayDate: getDateWithActivity("saturday", scheduledActivities) || getUpcomingDay("saturday"),
    sundayDate: getDateWithActivity("sunday", scheduledActivities) || getUpcomingDay("sunday")
  });

  const handleWeekendDateChange = (day, date) => {
    setWeekendDate((prev) => ({...prev, [`${day}Date`]: date}));
  }

  // Drag and drop handlers
  const handleDragStart = (e, activity) => {
    setDraggedActivity(activity);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    clearDragState();
  };

  const handleDragOver = (e, day, date = null) => {
    e.preventDefault();
    setDragOverDay(day, date);
  };

  const handleDragLeave = () => {
    setDragOverDay(null);
  };

  const handleDrop = (e, day, date) => {
    e.preventDefault();
    setDragOverDay(null);

    if (!draggedActivity) return;

    if (longWeekendMode) {
      scheduleActivity({
        activity: draggedActivity,
        day: "daterange",
        time: "",
        date: "",
        dateRange,
        type: "range"
      });
    } else {
      // Normal Sat/Sun
      scheduleActivity({ activity: draggedActivity, day, date, time: "00:00 AM", type: "single" });
    }

    clearDragState();
  };

  const handleUnscheduleDrop = (e) => {
    e.preventDefault();
    setDragOverDay(null);

    if (!draggedActivity) return;

    // Unschedule the activity
    unscheduleActivity(draggedActivity.id);
    clearDragState();
  };

  const handleRemoveActivity = (activityid) => {
    setActivityId(activityid);
    setOpenDialog(true);
    clearDragState();
  };

  console.log(peopleDialogActivity)
  return (
    <>
      <main className='flex flex-col items-center w-full mt-4 sm:mt-10 gap-4'>
        <div className="flex items-center justify-end gap-2 w-full">
          <Switch
            checked={longWeekendMode}
            onCheckedChange={(checked) => setLongWeekendMode(checked)}
          />
          <span className="text-sm font-medium">Plan Long Weekend</span>
        </div>

        {/* <Summary /> */}

        {getUnscheduledActivities().length > 0 && (
          <UnscheduledActivity
            getUnscheduledActivities={getUnscheduledActivities}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onUnscheduleDrop={handleUnscheduleDrop}
            onRemoveActivity={handleRemoveActivity}   
          />
        )}

        <div className='flex flex-col min-[900px]:flex-row gap-4 h-auto my-5 w-full justify-center'>
          {longWeekendMode ? (

            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700 w-26">Start Date:</label>
                  <Input
                    type="date"
                    value={dateRange.startDate}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, startDate: e.target.value })
                    }
                    className="border border-gray-300 rounded-md px-3 py-1.5 w-40 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700 w-26">End Date:</label>
                  <Input
                    type="date"
                    value={dateRange.endDate}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, endDate: e.target.value })
                    }
                    className="border border-gray-300 rounded-md px-3 py-1.5 w-40 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
              </div>

              <LongWeekendPanel
                weekendDay="Long Weekend"
                scheduledActivities={scheduledActivities}
                onDragOver={(e) => handleDragOver(e, "daterange")}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, "daterange", "")}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onRemoveActivity={handleRemoveActivity}
                dragOverDay={dragOverDay}
                isDropTarget={dragOverDay === "daterange"}
              />
            </div>
          ) : (
            <>
              <WeekendPanel
                weekendDay="Saturday"
                scheduledActivities={scheduledActivities}
                onDragOver={(e) => handleDragOver(e, "saturday", weekendDate?.saturdayDate)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, "saturday", weekendDate?.saturdayDate)}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onRemoveActivity={handleRemoveActivity}
                dragOverDay={dragOverDay}
                isDropTarget={dragOverDay === "saturday"}
                dateValue={weekendDate?.saturdayDate}
                onDateValueChange={(date) => handleWeekendDateChange("saturday", date)}
                // openAddPeople={openAddPeople}
                // setOpenAddPeople={setOpenAddPeople}
                onOpenPeopleDialog={(activity) => setPeopleDialogActivity(activity)}
              />

              <WeekendPanel
                weekendDay="Sunday"
                scheduledActivities={scheduledActivities}
                onDragOver={(e) => handleDragOver(e, "sunday", weekendDate?.sundayDate)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, "sunday", weekendDate?.sundayDate)}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onRemoveActivity={handleRemoveActivity}
                dragOverDay={dragOverDay}
                isDropTarget={dragOverDay === "sunday"}
                dateValue={weekendDate?.sundayDate}
                onDateValueChange={(date) => handleWeekendDateChange("sunday", date)}
                // openAddPeople={openAddPeople}
                // setOpenAddPeople={setOpenAddPeople}
                onOpenPeopleDialog={(activity) => setPeopleDialogActivity(activity)}
              />
            </>
          )}
        </div>
      </main>

      {openDialog && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure you want to delete this activity?</DialogTitle>
              <DialogDescription>
                The activity will be removed from your scheduled activities and cannot be undone. You can always add it back later from the activities list.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>

              <Button variant="destructive"
                onClick={() => {
                  removeActivity(activityId);
                  setOpenDialog(false);
                }}
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}


      {peopleDialogActivity && (
        <Dialog open={!!peopleDialogActivity} onOpenChange={() => setPeopleDialogActivity(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit People for this activity</DialogTitle>
              <DialogDescription>Add or remove people from this activity</DialogDescription>
            </DialogHeader>

            <AddPeopleDialog
              open
              setOpen={() => setPeopleDialogActivity(null)}
              emailList={peopleDialogActivity?.people}
              setEmailList={(updatedList) => {
                console.log(updatedList);
                scheduleActivity({
                  ...peopleDialogActivity,
                  people: updatedList,
                });
                setPeopleDialogActivity(null);
              }}
            />
          </DialogContent>
        </Dialog>
      )}

    </>
  )
}

export default Scheduled