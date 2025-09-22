const { Calendar, Plus } = require("lucide-react");

export const getButtonText = ({ isScheduled, scheduledDay, isInSelectedActivities }) => {
  if (isScheduled) {
    return `${scheduledDay?.charAt(0).toUpperCase() + scheduledDay?.slice(1)}`;
  } else if (isInSelectedActivities) {
    return "Schedule";
  } else {
    return "Add";
  }
};

export const getButtonIcon = ({ isScheduled }) => {
  if (isScheduled) {
    return <Calendar className="w-4 h-4" />;
  } else {
    return <Plus className="w-4 h-4" />;
  }
};

export const getButtonVariant = ({ isScheduled, isInSelectedActivities }) => {
  if (isScheduled) {
    return "outline";
  } else if (isInSelectedActivities) {
    return "outlineGray";
  } else {
    return "default";
  }
};


export function getUpcomingDay(targetDay) {
  const today = new Date();
  const target = targetDay.toLowerCase() === "saturday" ? 6 : 0; // 0=Sunday, 6=Saturday
  const current = today.getDay();

  // Calculate days until the target (wraps around the week)
  const diff = (target - current + 7) % 7;
  const daysToAdd = diff === 0 ? 0 : diff;

  const result = new Date(today);
  result.setDate(today.getDate() + daysToAdd);

  // Format YYYY-MM-DD
  const year = result.getFullYear();
  const month = String(result.getMonth() + 1).padStart(2, "0");
  const day = String(result.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

