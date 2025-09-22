"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Search, Filter, X as Cross, FilterIcon, ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import DropdownFilter from "./dropdownfilter";
import { activities, categoryColors, moodColors } from "@/assets/constants";
import ActivityCard from "./activitycard";
import useActivityStore from "@/store/activityStore";
import { Badge } from "./ui/badge";



export const Activities = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMood, setSelectedMood] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("all");
  const [totalCount, setTotalCount] = useState(18);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const { selectedActivities, scheduledActivities } = useActivityStore();

  const categories = [...new Set(activities.map((a) => a.category))];
  const moods = [...new Set(activities.map((a) => a.mood))];

  const filteredActivities = activities.filter((activity) => {
    const matchSearch = activity.name.toLowerCase().includes(searchTerm.toLowerCase()) || activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === "all" || activity.category === selectedCategory;
    const matchMood = selectedMood === "all" || activity.mood === selectedMood;

    let matchActivity = true;
    if (selectedActivity === "scheduled") {
      matchActivity = scheduledActivities.some((sa) => sa.activity?.id === activity?.id);
    } else if (selectedActivity === "unscheduled") {
      const isInSelected = selectedActivities.some((sa) => sa.id === activity.id);
      const isScheduled = scheduledActivities.some((sa) => sa.activity?.id === activity?.id);
      matchActivity = isInSelected && !isScheduled;
    }

    return matchSearch && matchCategory && matchMood && matchActivity;
  });


  const handleActivityChange = (value) => setSelectedActivity(value);
  const handleCategoryChange = (value) => setSelectedCategory(value);
  const handleMoodChange = (value) => setSelectedMood(value);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedMood("all");
    setSelectedActivity("all");
  };

  
  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);
  

  // load more visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (bottom && totalCount < filteredActivities.length) {
        setShowLoadMore(true);
      } else {
        setShowLoadMore(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalCount, filteredActivities.length]);



  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get counts for better UX
  const scheduledCount = scheduledActivities.length;
  const unscheduledCount = selectedActivities.filter((sel) => !scheduledActivities.some((sa) => sa.activity?.id === sel.id)).length;
  const totalSelectedCount = selectedActivities.length;
  


  return (
    <>
      <main className="mt-6 sm:mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 w-full">
          
          <div className="flex items-center gap-2 w-full">
            <Input
              name="search"
              placeholder="Search your favourite activity"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              type="text"
              leftIcon={Search}
              rightIcon={searchTerm ? Cross : null}
              onClickRightIcon={() => setSearchTerm("")}
              className="w-full"
            />

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilter(!showFilter)}
              className={`h-auto py-2 flex md:hidden`}
            >
              <FilterIcon className="h-full" />
            </Button>
          </div>

          {(showFilter || isDesktop) && (
            <div className="flex flex-wrap flex-1 md:flex-nowrap sm:flex-row w-full items-center gap-2">
              <DropdownFilter
                filterLabel="Categories"
                filterValues={categories}
                handleChange={handleCategoryChange}
                defaultValue="all"
                value={selectedCategory}
                className="w-fit sm:w-auto text-sm"
              />

              <DropdownFilter
                filterLabel="Moods"
                filterValues={moods}
                handleChange={handleMoodChange}
                defaultValue="all"
                value={selectedMood}
                className="w-fit sm:w-auto text-sm"
              />

              <DropdownFilter
                filterLabel="Activities"
                filterValues={["scheduled", "unscheduled"]}
                handleChange={handleActivityChange}
                defaultValue="all"
                value={selectedActivity}
                className="w-fit sm:w-auto text-sm"
              />

              {(searchTerm ||
                selectedCategory !== "all" ||
                selectedMood !== "all" ||
                selectedActivity !== "all") && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={clearFilters}
                  className="hidden min-[450px]:flex ml-auto md:ml-10"
                >
                  Clear
                </Button>
              )}
          </div>)}

        </div>

        {/* Show filter status */}
        <div className="my-4 flex items-center gap-2 md:gap-10 text-sm text-foreground">
          <span className="font-medium text-pretty text-xs min-[400px]:text-sm md:text-base">Showing {totalCount} of {activities.length} activities</span>
          
          <div className="space-x-1 space-y-1 md:space-x-2 font-normal">
            {selectedActivity === "scheduled" && ( <Badge className={`bg-blue-400 text-white text-xs`}> Scheduled</Badge> )}
            {selectedActivity === "unscheduled" && ( <Badge className={`bg-blue-400 text-white text-xs`}> Unscheduled</Badge> )}
            {selectedCategory !== "all" && ( <Badge className={`${categoryColors[selectedCategory]} text-xs`}> <span className="font-semibold"> {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} </span></Badge> )}
            {selectedMood !== "all" && ( <Badge className={`${moodColors[selectedMood]} text-xs`}> <span className="font-semibold"> {selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)} </span></Badge> )}
          </div>

          {(searchTerm ||
            selectedCategory !== "all" ||
            selectedMood !== "all" ||
            selectedActivity !== "all") && (
            <Button
              variant="destructive"
              size="sm"
              onClick={clearFilters}
              className="flex min-[450px]:hidden ml-auto md:ml-10 text-xs py-1 px-2 h-auto"
            >
              Clear
            </Button>
          )}
        </div>

        <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.length > 0 ? (
            filteredActivities.slice(0, totalCount).map((activity, index) => (
              <ActivityCard key={activity.id} activity={activity} index={index} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-muted-foreground">
                <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No activities found</p>
                <p className="text-sm">
                  Try adjusting your filters or search term
                </p>
              </div>
            </div>
          )}
        </div>

        {showLoadMore && totalCount < filteredActivities.length && (
          <Button variant="outline" size="lg" onClick={() => setTotalCount(Math.min(totalCount + 12, filteredActivities.length))} className="mx-auto block mb-8 hover:scale-105 transition-all duration-200 hover:cursor-pointer">
            Load More
          </Button>
        )}

      </main>

      {showScroll && (
        <Button
          variant="outline"
          onClick={scrollToTop}
          className="mx-auto fixed bottom-12 z-50 right-6 hover:scale-105 rounded-full transition-all duration-200 hover:cursor-pointer px-2 py-3 w-auto h-auto"
        >
          <ArrowUp size={60} />
        </Button>
      )}

    </>
  );
};
