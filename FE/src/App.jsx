import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./Components/Index";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Register from "./Components/Register";
import OtpVerification from "./Components/OtpVerification";
import ProtectedRoute from "./Components/ProtectedRoute";

import { GlobalProvider } from "./context/GlobalContext";

export default function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <div className="flex justify-center w-full h-screen">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/optVerification" element={<OtpVerification />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </GlobalProvider>
  );
}
