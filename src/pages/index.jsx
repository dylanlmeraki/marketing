// src/pages/index.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

import Layout from "@/pages/Layout.jsx";

import Home from "@/pages/Home.jsx";
import About from "@/pages/About.jsx";
import Contact from "@/pages/Contact.jsx";

import ServicesOverview from "@/pages/ServicesOverview.jsx";
import Services from "@/pages/Services.jsx";
import InspectionsTesting from "@/pages/InspectionsTesting.jsx";
import SpecialInspections from "@/pages/SpecialInspections.jsx";
import StructuralEngineering from "@/pages/StructuralEngineering.jsx";
import Construction from "@/pages/Construction.jsx";

import ProjectGallery from "@/pages/ProjectGallery.jsx";
import ProjectDetail from "@/pages/ProjectDetail.jsx";
import PreviousWork from "@/pages/PreviousWork.jsx";

import Blog from "@/pages/Blog.jsx";
import BlogPost from "@/pages/BlogPost.jsx";

import SWPPPChecker from "@/pages/SWPPPChecker.jsx";

export default function Pages() {
  return (
    <Router>
      <Layout currentPageName="Home">
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Main pages */}
          <Route path={createPageUrl("About")} element={<About />} />
          <Route path={createPageUrl("Contact")} element={<Contact />} />

          {/* Services */}
          <Route path={createPageUrl("ServicesOverview")} element={<ServicesOverview />} />
          <Route path={createPageUrl("Services")} element={<Services />} />
          <Route path={createPageUrl("InspectionsTesting")} element={<InspectionsTesting />} />
          <Route path={createPageUrl("SpecialInspections")} element={<SpecialInspections />} />
          <Route path={createPageUrl("StructuralEngineering")} element={<StructuralEngineering />} />
          <Route path={createPageUrl("Construction")} element={<Construction />} />

          {/* Projects */}
          <Route path={createPageUrl("ProjectGallery")} element={<ProjectGallery />} />
          <Route path={createPageUrl("ProjectDetail")} element={<ProjectDetail />} />
          <Route path={createPageUrl("PreviousWork")} element={<PreviousWork />} />

          {/* Blog */}
          <Route path={createPageUrl("Blog")} element={<Blog />} />
          <Route path={createPageUrl("BlogPost")} element={<BlogPost />} />

          {/* Consultation (SWPPPChecker -> /consultation via createPageUrl override) */}
          <Route path={createPageUrl("SWPPPChecker")} element={<SWPPPChecker />} />

          {/* Legacy aliases -> canonical */}
          <Route path="/swppp-checker" element={<Navigate to="/consultation" replace />} />
          <Route path="/SWPPPChecker" element={<Navigate to="/consultation" replace />} />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}
