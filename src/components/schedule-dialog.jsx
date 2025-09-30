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
import {UserPlus, Search, X as Cross} from "lucide-react";
import { Calendar, CalendarDayButton } from "./ui/calendar";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import DateDropdown from "./date-dropdown";
import AddPeopleDialog from "./add-people-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";


const ScheduleDialog = ({ open, setOpen, activity, day = [], date = "", time = "", description = "", people = [] }) => {
  
  const ActivityIcon = LucideIcons[activity?.icon];
  const [error, setError] = useState("");
  const [descriptionText, setDescriptionText] = useState(description || "");
  const [openAddPeople, setOpenAddPeople] = useState(false);
  const [emailList, setEmailList] = useState(people || []);

  // Normal weekend flow
  const [selectedDays, setSelectedDays] = useState(Array.isArray(day) ? day : []);
  const [selectedSlots, setSelectedSlots] = useState({
    saturdayDate: day.includes("saturday") ? date || "" : "",
    saturdayTime: day.includes("saturday") ? time || "00:00 AM" : "00:00 AM",
    sundayDate: day.includes("sunday") ? date || "" : "",
    sundayTime: day.includes("sunday") ? time || "00:00 AM" : "00:00 AM"
  });

  // New toggle & date range flow
  const [useDateRange, setUseDateRange] = useState(false);
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  const { scheduleActivity, addActivity, getScheduledActivitiesForDay } = useActivityStore();

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


  // To save the activity
  const handleSubmit = () => {

    if (useDateRange) {         // If its a long weekend
      if (!dateRange.startDate || !dateRange.endDate) {
        setError("Please select both start and end dates");
        return;
      }

      addActivity(activity);
      scheduleActivity({
        activity,
        day: "daterange",
        time: "",
        date: "",
        dateRange, // pass startDate & endDate
        type: useDateRange ? "range" : "single",    // Identify long or single weekend
        description: descriptionText,
        people: emailList,
      });

    } else {        // for weekends only
      if (selectedDays.length === 0) {
        setError("Please select at least one day");
        return;
      }

      for (let d of selectedDays) {
        if (!selectedSlots[`${d}Date`]) {
          setError(`Please select a date for ${d}`);
          return;
        }
        if (!selectedSlots[`${d}Time`] || selectedSlots[`${d}Time`] === "00:00 AM") {
          setError(`Please select a time slot for ${d}`);
          return;
        }

        // const dayActivities = getScheduledActivitiesForDay(d);
        // const isAlreadyScheduled = dayActivities.some((sa) => sa.activity?.id === activity?.id);
        
        // if (isAlreadyScheduled) {
        //   setError(`Activity is already scheduled for ${d}`);
        //   return;
        // }
      }

      addActivity(activity);

      selectedDays.forEach((d) => {
        scheduleActivity({
          activity,
          day: d,
          time: selectedSlots[`${d}Time`],
          date: selectedSlots[`${d}Date`],
          type: useDateRange ? "range" : "single",    // Identify long or single weekend
          description: descriptionText,
          people: emailList,
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
    setDescriptionText("");
    setError("");
  };
  
  const saturdayCount = getScheduledActivitiesForDay("saturday").length;
  const sundayCount = getScheduledActivitiesForDay("sunday").length;

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[450px] h-auto max-h-[90vh] p-4 sm:p-6 overflow-y-auto">
          <DialogHeader className="flex flex-row items-center gap-3 text-lg font-semibold">
            <DialogTitle className="w-auto h-auto p-2 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-all duration-200 hover:scale-110">
              <ActivityIcon className="w-6 sm:w-7 h-6 sm:h-7 text-primary" />
            </DialogTitle>

            <div className="flex flex-col leading-tight text-left">
              <div className="flex items-center gap-4">
                <p className="font-bold text-lg sm:text-xl text-primary">{activity?.name}</p>
                
                <div className="flex items-center justify-center gap-3">
                  <Badge className={`bg-secondary/90 text-secondary-foreground/80`}>{activity?.price}</Badge>
                  <Badge className={`${categoryColors[activity?.category]}`}>{activity?.duration}</Badge>
                  <Badge className={`${moodColors[activity?.mood]}`}>{activity?.mood.charAt(0).toUpperCase() + activity?.mood.slice(1)}</Badge>       
                </div>
              </div>

              <p className="text-[13px] sm:text-sm text-muted-foreground/80"> {activity?.description} </p>
            </div>
          </DialogHeader>

          {/* Error box */}
          {error && (<div className="text-sm text-red-500 bg-red-50 border border-red-200 p-4 rounded-md mt-2">{error}</div>)}

          <AddPeopleDialog open={openAddPeople} setOpen={setOpenAddPeople} emailList={emailList} setEmailList={setEmailList} />


          <Tabs defaultValue="single" value={useDateRange ? "range" : "single"} onValueChange={(value) => setUseDateRange(value === "range")} className="flex items-center gap-2 justify-center w-full mx-auto">
            <TabsList className="bg-secondary/40 h-auto w-full text-center">
              <TabsTrigger value="single" className="w-full h-auto py-2 data-[state=active]:font-semibold text-sm">Select Days</TabsTrigger>
              <TabsTrigger value="range" className="w-full h-auto py-2 data-[state=active]:font-semibold text-sm">Long Weekend</TabsTrigger>
            </TabsList>

          
            <TabsContent value="single" className="w-full">
              <div className="space-y-4 my-2">

                {/* Weekend Selection Flow */}
                <div className="space-y-3">
                  
                  <div className="grid grid-cols-2 gap-2">
                    {/* Saturday */}
                    <div
                      onClick={() => handleDayToggle("saturday")}
                      className={`relative p-4 h-16 flex items-center justify-center rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-[1.02] 
                        ${selectedDays.includes("saturday") ? "bg-primary/5 border-primary/30 shadow-md" : "bg-muted/10 border hover:bg-muted/30" }`}
                    >
                      <div className="flex flex-col text-center gap-0.5">
                        <span className="font-semibold text-sm">Saturday</span>
                        <span className="text-xs text-secondary-foreground/80"> {saturdayCount} {saturdayCount === 1 ? "activity" : "activities"} </span>
                      </div>
                    </div>

                    {/* Sunday */}
                    <div
                      onClick={() => handleDayToggle("sunday")}
                      className={`relative p-4 h-16 flex items-center justify-center rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-[1.02] 
                        ${selectedDays.includes("sunday") ? "bg-primary/5 border-primary/30 shadow-md" : "bg-muted/10 border hover:bg-muted/30" }`}
                    >
                      <div className="flex flex-col text-center gap-0.5">
                        <span className="font-semibold text-sm">Sunday</span>
                        <span className="text-xs text-secondary-foreground/80"> {sundayCount} {sundayCount === 1 ? "activity" : "activities"} </span>
                      </div>
                    </div>
                  </div>
                
                </div>

                {/* Slot dropdowns */}
                {selectedDays.length > 0 && (
                  <div className="flex flex-col gap-2 p-3 bg-secondary/20 border border-accent/30 rounded-lg">
                    <p className="text-xs font-medium">Select Date & Slot(s)</p>
                    <div className="flex flex-col gap-3">
                      
                      {selectedDays.includes("saturday") && (
                        <div className="flex gap-3 items-center">
                          <SatSunDropdown
                            sat={true}
                            sun={false}
                            value={selectedSlots.saturdayDate}
                            onChange={(date) => handleDateChange("saturday", date)}
                            className="w-full flex-1 bg-muted"
                          />
                          <DropdownFilter
                            filterLabel="Slots"
                            filterValues={timeSlots}
                            defaultValue="00:00 AM"
                            value={selectedSlots.saturdayTime}
                            handleChange={(slot) => handleTimeChange("saturday", slot)}
                            className="w-full border border-muted-foreground"
                          />
                        </div>
                      )}

                      {selectedDays.includes("sunday") && (
                        <div className="flex gap-3 items-center">
                          <SatSunDropdown
                            sat={false}
                            sun={true}
                            value={selectedSlots.sundayDate}
                            onChange={(date) => handleDateChange("sunday", date)}
                            className="w-full flex-1 bg-muted"
                          />
                          <DropdownFilter
                            filterLabel="Slots"
                            filterValues={timeSlots}
                            defaultValue="00:00 AM"
                            value={selectedSlots.sundayTime}
                            handleChange={(slot) => handleTimeChange("sunday", slot)}
                            className="w-full border border-muted-foreground"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
              
            <TabsContent value="range" className="w-full mt-2 overflow-x-hidden">
                {/* Date Range Flow */}
                <div className="p-2 flex gap-2 justify-between bg-secondary/20 border border-accent/30 rounded-lg space-y-3 w-full">
                  {/* <p className="font-semibold">Select Start & End Dates</p> */}
                    <DateDropdown 
                      date={dateRange.startDate} 
                      setDate={(date) => setDateRange((prev) => ({...prev, startDate: date}))} 
                      caption="Start Date"
                      className="w-full"
                    />
                    
                    <DateDropdown 
                      date={dateRange.endDate} 
                      setDate={(date) => setDateRange((prev) => ({...prev, endDate: date}))} 
                      caption="End Date"
                      className="w-full"
                    />
                </div>
            </TabsContent>
          </Tabs>


          <div className="grid w-full gap-3">
            <Label htmlFor="message" className={"text-sm pl-1 text-foreground"}>Description (Optional)</Label>
            <Textarea 
              placeholder="Add any special notes, preferences, or details about this activity.." 
              id="message" 
              className="placeholder:text-muted-foreground/70 text-gray-800 h-28"
              value={descriptionText}
              onChange={(e) => setDescriptionText(e.target.value)}
            />
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
                  (selectedDays.length === 0 || selectedDays.some((d) => !selectedSlots[`${d}Date`] || !selectedSlots[`${d}Time`] || selectedSlots[`${d}Time`] === "00:00 AM"))) 
                    || (useDateRange && (!dateRange.startDate || !dateRange.endDate))}
              className="min-w-[120px]"
            >
              Schedule Activity
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* {openAddPeople && (<AddPeopleDialog open={openAddPeople} setOpen={setOpenAddPeople} />)} */}
    </>
  );
};

export default ScheduleDialog;
