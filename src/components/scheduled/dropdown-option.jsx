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
  const activity = scheduledActivities.find(item => item?.activity?.id === activityId) || selectedActivities.find((item) => item?.activity?.id === activityId);


  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="linkActive"
            className="opacity-100 group-hover:opacity-100 hover:cursor-pointer transition-all duration-200 hover:scale-105"
          >
            <EllipsisVertical className="w-4 h-4" />
          </Button>
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
          activity={activity?.activity}
          day={activity?.day}
          time={activity?.time}
        />
      )}
    </>
  );
};

export default DropdownOption;
