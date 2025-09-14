import { create } from "zustand";

// localStorage helper functions
const STORAGE_KEY = "activity-store";

const loadFromStorage = () => {
  if (typeof window === "undefined") {
    return {
      scheduledActivities: [],
      selectedActivities: [],
    };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        scheduledActivities: parsed.scheduledActivities || [],
        selectedActivities: parsed.selectedActivities || [],
      };
    }
  } catch (error) {
    console.error("Failed to load from localStorage:", error);
  }
  return {
    scheduledActivities: [],
    selectedActivities: [],
  };
};

const saveToStorage = (state) => {
  if (typeof window === "undefined") return;

  try {
    const dataToSave = {
      scheduledActivities: state.scheduledActivities,
      selectedActivities: state.selectedActivities,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
};

const useActivityStore = create((set, get) => ({
  scheduledActivities: [],
  selectedActivities: [],
  isHydrated: false,

  draggedActivity: null,
  dragOverDay: null,

  hydrate: () => {
    const storedData = loadFromStorage();
    set({
      scheduledActivities: storedData.scheduledActivities,
      selectedActivities: storedData.selectedActivities,
      isHydrated: true,
    });
  },

  // ✅ Updated scheduleActivity
  scheduleActivity: ({ activity, day, time = "", date = "", dateRange = null }) =>
    set((state) => {
      // Remove duplicates
      const filteredSchedule = state.scheduledActivities.filter((sa) => {
        if (dateRange) {
          // For dateRange, only filter by activity id + "dateRange" key
          return !(sa.activity.id === activity.id && sa.day === "dateRange");
        }
        return !(
          sa.activity.id === activity.id &&
          sa.day === day.toLowerCase() &&
          sa.date === date
        );
      });

      const newScheduledActivity = {
        activity,
        day: day.toLowerCase(),
        time,
        date,
        dateRange, // null for normal flow
      };

      const newState = {
        scheduledActivities: [...filteredSchedule, newScheduledActivity],
        selectedActivities: state.selectedActivities.some((a) => a.id === activity.id)
          ? state.selectedActivities
          : [...state.selectedActivities, activity],
      };

      if (state.isHydrated) {
        saveToStorage({ ...state, ...newState });
      }
      return newState;
    }),

  unscheduleActivity: (activityId) =>
    set((state) => {
      const newState = {
        scheduledActivities: state.scheduledActivities.filter(
          (sa) => sa.activity.id !== activityId
        ),
      };

      if (state.isHydrated) saveToStorage({ ...state, ...newState });
      return newState;
    }),

  removeActivity: (activityId) =>
    set((state) => {
      const newState = {
        selectedActivities: state.selectedActivities.filter((a) => a.id !== activityId),
        scheduledActivities: state.scheduledActivities.filter(
          (sa) => sa.activity.id !== activityId
        ),
      };

      if (state.isHydrated) saveToStorage({ ...state, ...newState });
      return newState;
    }),

  addActivity: (activity) =>
    set((state) => {
      if (state.selectedActivities.some((a) => a.id === activity.id)) return state;

      const newState = {
        selectedActivities: [...state.selectedActivities, activity],
      };

      if (state.isHydrated) saveToStorage({ ...state, ...newState });
      return newState;
    }),

  setDraggedActivity: (activity) => set({ draggedActivity: activity }),
  setDragOverDay: (day) => set({ dragOverDay: day }),
  clearDragState: () => set({ draggedActivity: null, dragOverDay: null }),

  getUnscheduledActivities: () => {
    const state = get();
    return state.selectedActivities.filter(
      (a) => !state.scheduledActivities.some((sa) => sa.activity.id === a.id)
    );
  },

  getScheduledActivitiesForDay: (day) => {
    const state = get();
    return state.scheduledActivities.filter((sa) => sa.day === day.toLowerCase());
  },

  clearAllData: () =>
    set((state) => {
      const newState = {
        scheduledActivities: [],
        selectedActivities: [],
        draggedActivity: null,
        dragOverDay: null,
      };

      if (state.isHydrated && typeof window !== "undefined") {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
          console.error("Failed to clear localStorage:", error);
        }
      }

      return newState;
    }),

  saveToStorage: () => {
    const state = get();
    if (state.isHydrated) saveToStorage(state);
  },

  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default useActivityStore;
