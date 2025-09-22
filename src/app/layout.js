"use client";
import "./globals.css";
import Navbar from "../components/navbar";
import Home from "../components/home";
import useActivityStore from "@/store/activityStore";
import { useEffect } from "react";
import "./globals.css";

export default function RootLayout({ children }) {

  // const { hydrate } = useActivityStore();

  // useEffect(() => {
  //   hydrate();
  // }, [hydrate]);


  return (
    <html lang="en">
      <body className="h-screen">

        {/* {children} */}
        <Navbar />
        <Home />
      </body>
    </html>
  );
}
