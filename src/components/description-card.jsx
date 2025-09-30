import React, { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "./ui/button";
import { CirclePlus, NotebookPen, SquarePen } from "lucide-react";
import ScheduleDialog from "./schedule-dialog";

const DescriptionCard = ({ activity }) => {
  const [openEditor, setOpenEditor] = useState(false);
  const descriptionText = activity?.description || "";

  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>
          <button type="button" className="hover:cursor-pointer hover:bg-accent/5 hover:border hover:border-accent/50 p-2 rounded-full">
            <NotebookPen className="w-4 h-4 text-primary/80" />
          </button>
        </HoverCardTrigger>
        <HoverCardContent className="text-sm w-xs">
          {descriptionText.length === 0 || descriptionText.length < 1 ? (
            <div className="flex flex-col gap-2 items-center justify-center w-full h-24">
              <CirclePlus
                className="w-16 h-16 hover:cursor-pointer hover:scale-105 text-primary/80"
                strokeWidth={1.4}
                onClick={() => setOpenEditor(true)}
              />
              <p className="text-muted-foreground">Add some description</p>
            </div>
          ) : (
            <div className="">
              <div className="flex items-center justify-between text-foreground mb-2">
                <p className="font-semibold text-base"> Description </p>
                <SquarePen
                  className="w-4 h-4 hover:cursor-pointer"
                  onClick={() => setOpenEditor(true)}
                />
              </div>
              <p className="">{descriptionText}</p>
            </div>
          )}
        </HoverCardContent>
      </HoverCard>

      {openEditor && (
        <ScheduleDialog
          open={openEditor}
          setOpen={setOpenEditor}
          activity={activity?.activity}
          day={[activity?.day]}
          date={activity?.date}
          time={activity?.time}
          description={activity?.description}
        />
      )}
    </>
  );
};

export default DescriptionCard;
