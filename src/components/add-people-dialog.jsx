import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { X as Cross, Search, UserPlus } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { categoryColors, moodColors } from "@/assets/constants";

const AddPeopleDialog = ({ open, setOpen, emailList, setEmailList }) => {
  const Icon = open ? Cross : UserPlus;
  const [searchTerm, setSearchTerm] = useState("");
  // const [emailList, setEmailList] = useState([]);
  const [error, setError] = useState("");

  if(searchTerm.length === 0 && error){
    setError("");
  }


  const handleClick = () =>{
    if(!searchTerm || searchTerm.length === 0) {
      setError("Add an email address");
      return;
    }

    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(searchTerm)) {
      setError("Enter a valid email address");
      return;
    }

    if (searchTerm && !emailList.includes(searchTerm)) {
      const updatedList = [...emailList, searchTerm];
      setEmailList(updatedList);
      setSearchTerm("");
      setError("");
    }

    setError("");
  }



  return (
    <div className="relative w-full mt-2">
      
      <div className="flex items-center justify-between p-2 border border-muted-foreground/50 rounded-lg hover:cursor-pointer" onClick={() => setOpen(prev => !prev)}>
        {(emailList && emailList.length > 0) ? 
          <div className="flex flex-wrap gap-1">
            {emailList?.map((email, index) => {
              const colorsArray = Object.values(categoryColors);
              const colorClass = colorsArray[index % colorsArray.length];

              return (
                <Badge 
                  key={index} 
                  className={`flex items-center gap-1 text-xs rounded-xl ${colorClass}`}
                >
                  <span className="font-semibold">{email}</span>
                  <button
                    type="button"
                    className="rounded-full hover:cursor-pointer"
                    variant="linkActive"
                    onClick={(e) => {
                      e.stopPropagation();
                      const updatedList = emailList.filter((_, i) => i !== index);
                      setEmailList(updatedList);
                    }}
                  >
                    <Cross className="w-2.5 h-2.5" />
                  </button>
                </Badge>
              );
            })}
          </div>
          : <p className="text-sm font-semibold">Add People</p>}
        <Icon className="w-4 h-4 text-primary hover:scale-110 transition-all duration-200" />
      </div>

      {open && (
        <div className="z-50 relative top-1 w-full right-0 left-0">
          
            <div className="flex flex-col gap-3 bg-muted w-full border border-accent/40 p-3 rounded-lg shadow-lg">
              {/* <Label className="font-lg text-foreground px-2">Enter email</Label> */}
              <Input
                type="email"
                placeholder="Enter the email address"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-muted-foreground/50"
                leftIcon={Search}
                rightIcon={searchTerm ? Cross : null}
                onClickRightIcon={() => setSearchTerm("")}
              />

              {error && <p className="text-xs text-destructive font-semibold -mt-1.5 pl-1">{error}</p>}
              <div className="flex items-center justify-end gap-3 mt-2">
                <Button variant="outline" onClick={() => setOpen(false)}> Cancel </Button>
                <Button variant="default" onClick={handleClick} disabled={!searchTerm || searchTerm.length === 0}>Add People</Button>
              </div>
            </div>

        </div>
      )}
    </div>
  );
};

export default AddPeopleDialog;
