import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Pen, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import useActivityStore from "@/store/activityStore";
import ScheduleDialog from "../schedule-dialog";

const DropdownOption = ({onRemoveActivity, activityId}) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const { scheduledActivities, selectedActivities } = useActivityStore();
  const scheduledActivity = scheduledActivities.find(item => item?.activity?.id === activityId);
  const selectedActivity = selectedActivities.find((item) => item?.id === activityId);


  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="rounded-full p-2 hover:cursor-pointer hover:border hover:border-muted-foreground/50"
          >
            <EllipsisVertical className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem 
            className="flex items-center gap-3 w-full hover:bg-accent hover:cursor-pointer text-accent-foreground font-semibold"
            onClick={() => setOpenDialog(true)}
          >
            <Pen className="h-4 w-4" color="black" strokeWidth={2.5} />
            <span className="text-foreground">Change Schedule</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-3 w-full hover:bg-accent hover:cursor-pointer text-destructive font-semibold"
            onClick={onRemoveActivity}
          >
            <Trash2 className="h-4 w-4" color="red" strokeWidth={2.5} />
            <span>Remove Activity</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {openDialog && (
        <ScheduleDialog
          open={openDialog}
          setOpen={setOpenDialog}
          activity={scheduledActivity?.activity || selectedActivity}
          day={[scheduledActivity?.day]}
          date={scheduledActivity?.date}
          time={scheduledActivity?.time}
          description={scheduledActivity?.description}
          people={scheduledActivity?.people || []}
        />
      )}
    </>
  );
};

export default DropdownOption;
