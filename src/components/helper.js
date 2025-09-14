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
