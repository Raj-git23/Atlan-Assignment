import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { themes } from "@/assets/themes";
import { AirVent, Palette, Sparkles, User } from "lucide-react";
import { Input } from "./ui/input";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import { weekendVibes } from "@/assets/constants";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const Personalisation = ({ open, onOpenChange, nickname, setNickname, themes, currentTheme, onThemeChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="py-2">
      <DialogContent className="h-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className={"flex items-center gap-2"}>
            <Sparkles className="w-5 h-5 animate-pulse" />
            Personalisation
          </DialogTitle>
          <DialogDescription className="leading-3 text-left">
            Customize your Weekendly experience
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <p className="-mb-2 font-semibold text-sm text-accent-foreground/80">
            Change your user name
          </p>
          <div className="flex flex-1 gap-2 items-center w-full">
            <User className="w-6 h-6" />
            <Input
              placeholder="Your Name"
              value={nickname}
              onChange={(e) => setNickname(e?.target?.value)}
            />
          </div>

          {/* <div className="felx items-center">
                <AirVent className="w-6 h-6" />
                
            </div> */}

          <div className="w-full flex flex-col gap-2">
            <span className="font-semibold text-sm text-accent-foreground/80">
              Choose your theme:
            </span>
            {/* <div className="grid grid-cols-2 gap-2">
              {Object.values(themes)?.map((theme, index) => (
                <div
                  className="flex items-center gap-2 p-2 rounded-lg border border-muted-foreground/40"
                  key={index}
                >
                  <span className="rounded-full" style={{backgroundColor : theme.primary}}></span>
                  <span
                    style={{
                      backgroundColor: theme.primary,
                      width: 22,
                      height: 22,
                      borderRadius: 50,
                      border: "1px solid #ccc",
                    }}
                    title={theme.name}
                  />
                  <p className="text-primary font-semibold">{theme?.name}</p>
                </div>
              ))}
            </div> */}
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500 delay-200">
              <h3 className="font-semibold flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Theme
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(themes).map(([key, theme], index) => (
                  <Button
                    key={key}
                    variant={currentTheme === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => onThemeChange(key)}
                    className="justify-start gap-2 hover:scale-105 transition-all duration-200"
                    style={{ animationDelay: `${index * 75}ms` }}
                  >
                    <div
                      className="w-4 h-4 rounded-full border shadow-sm"
                      style={{ backgroundColor: theme.primary }}
                    />
                    {theme.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-2">
            <span className="font-semibold text-sm text-accent-foreground/80">
              Choose your theme:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {weekendVibes?.map((vibe, index) => (
                <Badge
                  variant="outline"
                  className="text-sm md:text-xs"
                  key={index}
                >
                  {/* <span className="rounded-full" style={{backgroundColor : theme.primary}}></span> */}
                  {/* <span
                                style={{ backgroundColor: theme.primary, width: 22, height: 22, borderRadius: 50, border: '1px solid #ccc' }}
                                title={theme.name}
                            /> */}
                  {vibe.charAt(0).toUpperCase() + vibe.slice(1)}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Personalisation;
