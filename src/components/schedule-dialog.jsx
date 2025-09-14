"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch"; // 👈 import toggle
import useActivityStore from "@/store/activityStore";
import { categoryColors, moodColors, timeSlots } from "@/assets/constants";
import DropdownFilter from "./dropdownfilter";
import SatSunDropdown from "./plannedSatSunDropdown";
import { Input } from "@/components/ui/input"; 
import * as LucideIcons from "lucide-react";

const ScheduleDialog = ({ open, setOpen, activity, day = [], time = "" }) => {
  const ActivityIcon = LucideIcons[activity?.icon];

  // Normal weekend flow
  const [selectedDays, setSelectedDays] = useState(Array.isArray(day) ? day : []);
  const [selectedSlots, setSelectedSlots] = useState({
    saturdayDate: "",
    saturdayTime: "00:00 AM",
    sundayDate: "",
    sundayTime: "00:00 AM"
  });

  // New toggle & date range flow
  const [useDateRange, setUseDateRange] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: ""
  });

  const [error, setError] = useState("");

  const {
    scheduleActivity,
    addActivity,
    getScheduledActivitiesForDay
  } = useActivityStore();

  // Existing handlers
  const handleDayToggle = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
    setError("");
  };

  const handleDateChange = (day, date) => {
    setSelectedSlots((prev) => ({ ...prev, [`${day}Date`]: date }));
    setError("");
  };

  const handleTimeChange = (day, time) => {
    setSelectedSlots((prev) => ({ ...prev, [`${day}Time`]: time }));
    setError("");
  };

  const handleSubmit = () => {
    if (useDateRange) {
      if (!dateRange.startDate || !dateRange.endDate) {
        setError("Please select both start and end dates");
        return;
      }

      addActivity(activity);
      scheduleActivity({
        activity,
        day: "dateRange",
        time: "",
        date: "",
        dateRange, // ✅ pass startDate & endDate
      });
    } else {
      if (selectedDays.length === 0) {
        setError("Please select at least one day");
        return;
      }

      for (let d of selectedDays) {
        if (!selectedSlots[`${d}Date`]) {
          setError(`Please select a date for ${d}`);
          return;
        }
        if (
          !selectedSlots[`${d}Time`] ||
          selectedSlots[`${d}Time`] === "00:00 AM"
        ) {
          setError(`Please select a time slot for ${d}`);
          return;
        }

        const dayActivities = getScheduledActivitiesForDay(d);
        const isAlreadyScheduled = dayActivities.some(
          (sa) => sa.activity.id === activity.id
        );
        if (isAlreadyScheduled) {
          setError(`Activity is already scheduled for ${d}`);
          return;
        }
      }

      addActivity(activity);

      selectedDays.forEach((d) => {
        scheduleActivity({
          activity,
          day: d,
          time: selectedSlots[`${d}Time`],
          date: selectedSlots[`${d}Date`],
        });
      });
    }

    // Reset after save
    setOpen(false);
    setSelectedDays([]);
    setSelectedSlots({
      saturdayDate: "",
      saturdayTime: "00:00 AM",
      sundayDate: "",
      sundayTime: "00:00 AM",
    });
    setDateRange({ startDate: "", endDate: "" });
    setError("");
  };


  const handleCancel = () => {
    setOpen(false);
    setSelectedDays([]);
    setSelectedSlots({
      saturdayDate: "",
      saturdayTime: "00:00 AM",
      sundayDate: "",
      sundayTime: "00:00 AM"
    });
    setDateRange({ startDate: "", endDate: "" });
    setError("");
  };

  const saturdayCount = getScheduledActivitiesForDay("saturday").length;
  const sundayCount = getScheduledActivitiesForDay("sunday").length;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full">
        <DialogHeader className="flex flex-row items-center gap-3 text-lg font-semibold">
          <DialogTitle className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-all duration-200 hover:scale-110">
            <ActivityIcon className="w-5 h-5 text-primary" />
          </DialogTitle>

          <DialogDescription className="flex flex-col leading-tight text-left">
            <span className="font-semibold text-xl text-primary">
              {activity?.name}
            </span>
            <span className="text-sm text-muted-foreground/80">
              {activity?.description}
            </span>
          </DialogDescription>
        </DialogHeader>

        {/* Error box */}
        {error && (
          <div className="text-sm text-red-500 bg-red-50 border border-red-200 p-4 rounded-md mt-2">
            {error}
          </div>
        )}

        {/* Toggle between Weekend vs Date Range */}
        <div className="flex items-center justify-between bg-secondary/20 p-3 rounded-lg mt-4">
          <span className="font-medium">Plan a Long Weekend</span>

          <Switch checked={useDateRange} onCheckedChange={setUseDateRange} />
        </div>

        <div className="space-y-4 my-4">
          {!useDateRange ? (
            <>
              {/* Weekend Selection Flow */}
              <div className="space-y-3">
                <p className="font-semibold text-gray-800">
                  Choose day(s) for this activity:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {/* Saturday */}
                  <div
                    onClick={() => handleDayToggle("saturday")}
                    className={`relative p-4 h-32 flex items-center justify-center rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-[1.02] ${selectedDays.includes("saturday")
                        ? "bg-primary/10 border-primary shadow-md"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                      }`}
                  >
                    <div className="flex flex-col text-center">
                      <span className="font-semibold text-lg">Saturday</span>
                      <span className="text-sm text-gray-500">
                        {saturdayCount}{" "}
                        {saturdayCount === 1 ? "activity" : "activities"} planned
                      </span>
                    </div>
                  </div>

                  {/* Sunday */}
                  <div
                    onClick={() => handleDayToggle("sunday")}
                    className={`relative p-4 h-32 flex items-center justify-center rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-[1.02] ${selectedDays.includes("sunday")
                        ? "bg-primary/10 border-primary shadow-md"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                      }`}
                  >
                    <div className="flex flex-col text-center">
                      <span className="font-semibold text-lg">Sunday</span>
                      <span className="text-sm text-gray-500">
                        {sundayCount}{" "}
                        {sundayCount === 1 ? "activity" : "activities"} planned
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slot dropdowns */}
              {selectedDays.length > 0 && (
                <div className="flex flex-col gap-3 p-4 bg-secondary/20 rounded-lg">
                  <p className="font-medium">Select Date & Slot(s)</p>
                  <div className="flex flex-col gap-3">
                    {selectedDays.includes("saturday") && (
                      <div className="flex  gap-3 items-center">
                        <SatSunDropdown
                          sat={true}
                          sun={false}
                          value={selectedSlots.saturdayDate}
                          onChange={(date) =>
                            handleDateChange("saturday", date)
                          }
                          className="w-auto flex-1"
                        />
                        <DropdownFilter
                          filterLabel="Slots"
                          filterValues={timeSlots}
                          defaultValue="00:00 AM"
                          value={selectedSlots.saturdayTime}
                          handleChange={(slot) =>
                            handleTimeChange("saturday", slot)
                          }
                          className="!w-fit !sm:w-[200px] border border-muted-foreground"
                        />
                      </div>
                    )}

                    {selectedDays.includes("sunday") && (
                      <div className="flex gap-3 items-center">
                        <SatSunDropdown
                          sat={false}
                          sun={true}
                          value={selectedSlots.sundayDate}
                          onChange={(date) =>
                            handleDateChange("sunday", date)
                          }
                          className="w-auto flex-1"
                        />
                        <DropdownFilter
                          filterLabel="Slots"
                          filterValues={timeSlots}
                          defaultValue="00:00 AM"
                          value={selectedSlots.sundayTime}
                          handleChange={(slot) =>
                            handleTimeChange("sunday", slot)
                          }
                          className="!w-fit !sm:w-12 border border-muted-foreground"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Date Range Flow */}
              <div className="p-4 bg-secondary/20 rounded-lg space-y-3">
                {/* <p className="font-semibold">Select Start & End Dates</p> */}
                <div className="flex gap-4 justify-around px-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium pl-2">Start Date</label>
                    <Input
                      type="date"
                      value={dateRange.startDate}
                      onChange={(e) =>
                        setDateRange((prev) => ({
                          ...prev,
                          startDate: e.target.value
                        }))
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium pl-2">End Date</label>
                    <Input
                      type="date"
                      value={dateRange.endDate}
                      onChange={(e) =>
                        setDateRange((prev) => ({
                          ...prev,
                          endDate: e.target.value
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Activity Details (same as before) */}
          <div className="p-4 bg-secondary/20 rounded-lg space-y-2">
            <div className="flex items-center justify-around gap-4 text-sm text-gray-600">
              <span className="text-center space-y-1.5">
                <p
                  className={`px-4 py-3 ${moodColors[activity?.duration]} w-fit bg-blue-200 font-semibold text-base rounded-xl`}
                >
                  {activity?.duration}
                </p>
                <p className="text-sm font-medium text-muted-foreground">
                  Duration
                </p>
              </span>
              <span className="text-center space-y-1.5">
                <p
                  className={`px-4 py-3 ${categoryColors[activity?.category]} w-fit bg-green-200 font-semibold text-base rounded-xl`}
                >
                  {activity?.price}
                </p>
                <p className="text-sm font-medium text-muted-foreground">
                  Price
                </p>
              </span>
              <span className="text-center space-y-1.5">
                <p
                  className={`px-4 py-3 ${moodColors[activity?.mood]} w-fit bg-purple-200 font-semibold text-base rounded-xl`}
                >
                  {activity?.mood.charAt(0).toUpperCase() +
                    activity?.mood.slice(1)}
                </p>
                <p className="text-sm font-medium text-muted-foreground">
                  Mood
                </p>
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 mt-6">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              (!useDateRange &&
                (selectedDays.length === 0 ||
                  selectedDays.some(
                    (d) =>
                      !selectedSlots[`${d}Date`] ||
                      !selectedSlots[`${d}Time`] ||
                      selectedSlots[`${d}Time`] === "00:00 AM"
                  ))) ||
              (useDateRange && (!dateRange.startDate || !dateRange.endDate))
            }
            className="min-w-[120px]"
          >
            Schedule Activity
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleDialog;
