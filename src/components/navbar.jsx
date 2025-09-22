import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Personalisation from "./Personalisation";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import { CalendarRange, User } from "lucide-react";
import { themes } from "@/assets/themes";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  const [currentTheme, setCurrentTheme] = useState("default");

  useEffect(() => {
    const savedTheme = localStorage.getItem("weekendly-theme");
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const theme = themes[currentTheme];
    if (!theme) return;
    
    const root = document.documentElement;

    Object.entries(theme).forEach(([key, value]) => {
      if (key !== 'name') {
        root.style.setProperty(`--${key}`, value);
      }
    });

    if (theme.primary) {
      const isDark = currentTheme === 'midnight' || currentTheme === 'cyber';
      root.style.setProperty("--primary-foreground", isDark ? "hsl(0 0% 98%)" : "hsl(0 0% 98%)");
      root.style.setProperty("--secondary-foreground", isDark ? "hsl(0 0% 98%)" : theme.foreground);
    }

    if (theme.accent) {
      const isDark = currentTheme === 'midnight' || currentTheme === 'cyber';
      root.style.setProperty("--accent-foreground", isDark ? "hsl(0 0% 98%)" : "hsl(0 0% 98%)");
    }

    localStorage.setItem("weekendly-theme", currentTheme);

    root.style.transition = "all 0.3s ease-in-out";
  }, [currentTheme]);

  useEffect(() => {
    const randomName = uniqueNamesGenerator({
      dictionaries: [adjectives, animals],
      separator: "-",
      length: 2,
      style: "capital",
    });
    setNickname(randomName);
  }, []);

  return (
    <>
      <main className="flex justify-between items-center px-3 sm:px-6 lg:px-20 py-4 border-b">
        <div className="flex w-full gap-1 sm:gap-4 items-center">
          {/* <picture className="h-16 w-16 overflow-hidden">
            <img
              src="/logo.png"
              alt="logo"
              className="object-cover h-full w-full mix-blend-hard-light"
            />
          </picture> */}
          <div className="bg-primary/50 p-2 rounded-xl"> <CalendarRange size={30} className="text-accent-foreground"/></div>
          <div className="flex flex-col text-primary">
            <p className="text-2xl sm:text-3xl font-bold tracking-tight">
              Weekendly
            </p>
            <p className="text-sm font-normal opacity-80 text-foreground">Plan your perfect weekend</p>
          </div>
        </div>

        <Button
          variant="secondary"
          onClick={() => setIsOpen(!isOpen)}
          className="flex sm:hidden h-10 w-auto border rounded-full mr-2"
        >
          <User className="w-6 h-6" />
        </Button>

        <div className="hidden sm:flex items-center gap-4">
          <Button
            variant="secondary"
            onClick={() => setIsOpen(!isOpen)}
            className="px-3 py-2 text-sm border bg-secondary/40 rounded-md hover:cursor-pointer transition-all duration-200 hover:scale-105"
          >
            Welcome! {nickname || "User"}
          </Button>
        </div>
      </main>

      <Personalisation
        open={isOpen}
        onOpenChange={setIsOpen}
        nickname={nickname}
        setNickname={setNickname}
        themes={themes}
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
      />
    </>
  );
};

export default Navbar;