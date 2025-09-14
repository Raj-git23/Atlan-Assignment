"use client";
import React, { useEffect, useState } from "react";
import { ArrowUp, Calendar, LayoutGrid } from "lucide-react";
import { Activities } from "./activities";
import Scheduled from "./scheduled/Scheduled";
import useActivityStore from "@/store/activityStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { useTheme } from "@/lib/ThemeContext";

const Home = () => {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const { selectedActivities } = useActivityStore();
  const [showScroll, setShowScroll] = useState(false);

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

  return (
    <>
      <Tabs
        className="mt-6 sm:mt-10 px-3 sm:px-6 lg:px-20"
        defaultValue="activities"
      >
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-0 items-center sm:justify-between sm:items-center px-2">
          <div className="flex flex-col leading-normal">
            <h1 className="text-3xl text-primary font-bold text-center sm:text-left">
              {isScheduleOpen ? "Weekend Schedule" : "Discover Activities"}
            </h1>
            <p className="text-muted-foreground text-xs md:text-sm text-center sm:text-left">
              {isScheduleOpen
                ? ` ${1} activities • ${0} scheduled`
                : "Explore a variety of activities to suit your mood and preferences"}
            </p>
          </div>

          <TabsList className="bg-transparent space-x-2 border-0 p-0 text-sm md:text-base">
            <TabsTrigger
              value="activities"
              className="bg-muted p-2 border border-accent/50 text-accent data-[state=active]:bg-accent data-[state=active]:text-muted"
              onClick={() => setIsScheduleOpen(false)}
            >
              <LayoutGrid /> Browse Activities
            </TabsTrigger>

            <TabsTrigger
              value="scheduled"
              className="bg-muted p-2 border border-accent/50 text-accent data-[state=active]:bg-accent data-[state=active]:text-muted"
              onClick={() => setIsScheduleOpen(true)}
            >
              <Calendar /> Scheduled ({selectedActivities.length || 0})
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Activities Tab */}
        <TabsContent value="activities" forceMount>
          <AnimatePresence mode="wait">
            {!isScheduleOpen && (
              <motion.div
                key="activities"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Activities />
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>

        {/* Scheduled Tab */}
        <TabsContent value="scheduled" forceMount>
          <AnimatePresence mode="wait">
            {isScheduleOpen && (
              <motion.div
                key="scheduled"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Scheduled />
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>
      </Tabs>

      {showScroll && (
        <Button
          variant="outline"
          onClick={scrollToTop}
          className="mx-auto fixed bottom-12 border border-accent-foreground z-50 right-6 hover:scale-105 rounded-full transition-all duration-200 hover:cursor-pointer px-2 py-3 w-auto h-auto"
        >
          <ArrowUp size={60} />
        </Button>
      )}
    </>
  );
};

export default Home;
