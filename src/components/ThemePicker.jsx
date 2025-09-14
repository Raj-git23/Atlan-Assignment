"use client";
import React, { useState } from "react";
import { ChevronDown, Palette, Check } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const ThemePicker = () => {
  const { theme, themeName, setThemeName, themeNames, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const getThemePreview = (name) => themes[name];

  return (
    <div className="relative">
      {/* Theme Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{
          backgroundColor: `hsl(${theme.card})`,
          borderColor: `hsl(${theme.border})`,
          color: `hsl(${theme.foreground})`,
          boxShadow: isOpen ? `0 0 0 2px hsl(${theme.primary})` : 'none'
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Palette size={16} />
        <span className="text-sm font-medium">{theme.name}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>

      {/* Theme Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-0 mt-2 w-64 rounded-lg border-2 shadow-xl z-50 overflow-hidden"
              style={{
                backgroundColor: `hsl(${theme.card})`,
                borderColor: `hsl(${theme.border})`,
              }}
            >
              <div className="p-3">
                <h3 
                  className="text-sm font-semibold mb-3"
                  style={{ color: `hsl(${theme.foreground})` }}
                >
                  Choose Theme
                </h3>
                
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {themeNames.map((name) => {
                    const themePreview = getThemePreview(name);
                    const isSelected = name === themeName;
                    
                    return (
                      <motion.button
                        key={name}
                        onClick={() => {
                          setThemeName(name);
                          setIsOpen(false);
                        }}
                        className="w-full p-3 rounded-md transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2"
                        style={{
                          backgroundColor: isSelected 
                            ? `hsl(${theme.muted})` 
                            : 'transparent',
                          border: `1px solid ${isSelected 
                            ? `hsl(${theme.primary})` 
                            : `hsl(${theme.border})`}`,
                          color: `hsl(${theme.foreground})`
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {/* Theme Color Preview */}
                            <div className="flex gap-1">
                              <div 
                                className="w-3 h-3 rounded-full border"
                                style={{ 
                                  backgroundColor: `hsl(${themePreview.primary})`,
                                  borderColor: `hsl(${theme.border})`
                                }}
                              />
                              <div 
                                className="w-3 h-3 rounded-full border"
                                style={{ 
                                  backgroundColor: `hsl(${themePreview.secondary})`,
                                  borderColor: `hsl(${theme.border})`
                                }}
                              />
                              <div 
                                className="w-3 h-3 rounded-full border"
                                style={{ 
                                  backgroundColor: `hsl(${themePreview.accent})`,
                                  borderColor: `hsl(${theme.border})`
                                }}
                              />
                            </div>
                            
                            <span className="text-sm font-medium">
                              {themePreview.name}
                            </span>
                          </div>
                          
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              style={{ color: `hsl(${theme.primary})` }}
                            >
                              <Check size={16} />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemePicker;