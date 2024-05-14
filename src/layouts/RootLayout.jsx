import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function RootLayout() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: "10px" }}>
        <Outlet />
      </div>
    </div>
  );
}
