import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import PortfolioLayout from "@/components/layout/PortfolioLayout";
import HomePage from "@/pages/HomePage";
import GamingPage from "@/pages/GamingPage";
import WebCreationPage from "@/pages/WebCreationPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import NotFoundPage from "@/pages/NotFoundPage";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PortfolioLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/gaming" element={<GamingPage />} />
            <Route path="/web-creation" element={<WebCreationPage />} />
            <Route path="/projects" element={<Navigate to="/web-creation" replace />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
