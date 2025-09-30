import { create } from "zustand";
import { persist } from "zustand/middleware";

const useActivityStore = create(
  persist(
    (set, get) => ({
      scheduledActivities: [],
      selectedActivities: [],

      draggedActivity: null,
      dragOverDay: null,
      dragOverDate: null,

      // Add or schedule activity
      scheduleActivity: ({ activity, day, time = "", date = "", dateRange = null, type = "single", description = "", people = [] }) =>
        set((state) => {
          // Remove duplicates
          const filteredSchedule = state.scheduledActivities.filter((sa) => {
            if (dateRange) {
              return !( sa.activity.id === activity.id && sa.day === "daterange" );
            }
            return !(
              sa.activity.id === activity.id &&
              sa.day === day.toLowerCase() &&
              sa.date === date
            );
          });

          return {
            scheduledActivities: [
              ...filteredSchedule,
              { activity, day: day.toLowerCase(), time, date, dateRange, type, description, people },
            ],

            selectedActivities: state.selectedActivities.some( (a) => 
              a.id === activity.id ) ? state.selectedActivities : [...state.selectedActivities, activity],
            };
        }),

      unscheduleActivity: (activityId) =>
        set((state) => ({
          scheduledActivities: state.scheduledActivities.filter(
            (sa) => sa.activity.id !== activityId
          ),
        })),

      removeActivity: (activityId) =>
        set((state) => ({
          selectedActivities: state.selectedActivities.filter((a) => a.id !== activityId),
          scheduledActivities: state.scheduledActivities.filter((sa) => sa.activity.id !== activityId),
        })),

      addActivity: (activity) =>
        set((state) => {
          if (state.selectedActivities.some((a) => a.id === activity.id))
            return state;
          return { selectedActivities: [...state.selectedActivities, activity], };
        }),

      setDraggedActivity: (activity) => set({ draggedActivity: activity }),
      setDragOverDay: (day, date) => set({ dragOverDay: day, dragOverDate: date }),
      clearDragState: () => set({ draggedActivity: null, dragOverDay: null }),

      getUnscheduledActivities: () => {
        const state = get();
        return state.selectedActivities.filter( (a) => !state.scheduledActivities.some((sa) => sa.activity.id === a.id));
      },

      getScheduledActivitiesForDay: (day) => {
        const state = get();
        return state.scheduledActivities.filter((sa) => sa.day === day.toLowerCase());
      },

      clearAllData: () =>
        set({ scheduledActivities: [], selectedActivities: [] }),

      isLoading: false,
      setIsLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: "activity-store", // key in localStorage
      partialize: (state) => ({
        scheduledActivities: state.scheduledActivities,
        selectedActivities: state.selectedActivities,
      }),
    }
  )
);

export default useActivityStore;
