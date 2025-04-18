import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./Components/Index";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex justify-center w-full h-screen">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
