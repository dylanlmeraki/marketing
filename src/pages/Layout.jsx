
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingButtons from "@/components/FloatingButtons";
import { apiClient } from "@/components/utils/apiClient";
import ErrorBoundary from "@/components/ErrorBoundary";
import { logError } from "@/components/utils/errorHandler";
import { warn } from "@/components/utils/logger";
import BackToTop from "@/components/BackToTop";

export default function Layout({ children, currentPageName }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await apiClient.entities.User.me();
        setUser(currentUser);
      } catch (error) {
        logError(error, { context: 'Layout - fetchUser' });
        warn('Failed to fetch user in Layout', { error: error?.message });
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const servicesItems = [
    { name: "Stormwater Planning", path: createPageUrl("Services") },
    { name: "Inspections & Testing", path: createPageUrl("InspectionsTesting") },
    { name: "Special Inspections", path: createPageUrl("SpecialInspections") },
    { name: "Engineering Consulting", path: createPageUrl("StructuralEngineering") },
    { name: "Construction Services", path: createPageUrl("Construction") }
  ];

  const aboutItems = [
    { name: "About Us", path: createPageUrl("About") },
    { name: "Previous Work", path: createPageUrl("PreviousWork") },
    { name: "Project Gallery", path: createPageUrl("ProjectGallery") },
    { name: "Blog", path: createPageUrl("Blog") }
  ];

  return (
    <ErrorBoundary>
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900 border-b-4 border-blue-600 shadow-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-md opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68eb69c51ce08e4c9fdca015/fbd78afc1_Asset2-100.jpg"
                  alt="Pacific Engineering Logo"
                  className="rounded-md h-14 w-14 object-contain relative z-10"
                />
              </div>
              <div>
                <div className="font-bold text-white text-xl tracking-tight">Pacific Engineering & Construction Inc.</div>
                <div className="text-xs font-medium text-blue-200 tracking-wide">Consulting Engineers & Contractors</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 h-full">
              <Link
                to={createPageUrl("Home")}
                className="font-bold text-sm uppercase tracking-wide text-white transition-all flex items-center h-full px-4 hover:bg-white/10 hover:text-blue-200 border-b-2 border-transparent hover:border-blue-400"
              >
                Home
              </Link>
              
              {/* Services Dropdown */}
              <div
                className="relative group h-full flex items-center"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <button className="font-bold text-sm uppercase tracking-wide text-white transition-all flex items-center gap-1 h-full px-4 hover:bg-white/10 hover:text-blue-200 border-b-2 border-transparent hover:border-blue-400">
                  Services
                  <ChevronDown className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {servicesDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-0">
                    <div className="w-64 bg-slate-900 shadow-2xl border-t-4 border-blue-600 py-0 overflow-hidden rounded-b-sm">
                      <Link
                        to={createPageUrl("ServicesOverview")}
                        className="block px-6 py-4 text-white hover:bg-white/10 font-bold text-sm uppercase tracking-wide text-center border-b border-white/10"
                      >
                        Our Services
                      </Link>
                      {servicesItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="block px-6 py-3 text-gray-300 hover:bg-blue-600 hover:text-white transition-all text-sm font-medium text-center"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* About Dropdown */}
              <div
                className="relative group h-full flex items-center"
                onMouseEnter={() => setAboutDropdownOpen(true)}
                onMouseLeave={() => setAboutDropdownOpen(false)}
              >
                <button className="font-bold text-sm uppercase tracking-wide text-white transition-all flex items-center gap-1 h-full px-4 hover:bg-white/10 hover:text-blue-200 border-b-2 border-transparent hover:border-blue-400">
                  About
                  <ChevronDown className={`w-4 h-4 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {aboutDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-0">
                    <div className="w-56 bg-slate-900 shadow-2xl border-t-4 border-blue-600 py-0 overflow-hidden rounded-b-sm">
                      {aboutItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="block px-6 py-3 text-gray-300 hover:bg-blue-600 hover:text-white transition-all font-medium text-sm text-center"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                to={createPageUrl("Contact")}
                className="font-bold text-sm uppercase tracking-wide text-white transition-all flex items-center h-full px-4 hover:bg-white/10 hover:text-blue-200 border-b-2 border-transparent hover:border-blue-400"
              >
                Contact
              </Link>

              <div className="flex items-center gap-3 ml-4 h-full">
                <Link to={createPageUrl("SWPPPChecker")}>
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 font-bold tracking-tight text-xs h-9 rounded-md shadow-lg shadow-blue-900/20 hover:shadow-blue-500/50 active:scale-95 transition-all duration-300">
                    Free Consultation
                  </Button>
                </Link>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-white hover:bg-cyan-500/30 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <nav className="px-6 py-4 space-y-3">
              <Link
                to={createPageUrl("Home")}
                className={`block py-2 font-medium transition-colors ${
                  location.pathname === createPageUrl("Home") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              <div className="space-y-2">
                <Link
                  to={createPageUrl("ServicesOverview")}
                  className="block py-2 font-semibold text-gray-900 hover:text-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <div className="pl-4 space-y-2">
                  {servicesItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block py-1.5 text-gray-700 hover:text-blue-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="block py-2 font-semibold text-gray-900">
                  About
                </div>
                <div className="pl-4 space-y-2">
                  {aboutItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block py-1.5 text-gray-700 hover:text-blue-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to={createPageUrl("Contact")}
                className="block py-2 font-medium text-gray-700 hover:text-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>

              <Link to={createPageUrl("SWPPPChecker")} onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 mt-2">
                  Free Consultation
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Floating Action Buttons */}
      <FloatingButtons user={user} />

      {/* Back to Top Button */}
      <BackToTop />

      {/* Footer */}
      <footer className="bg-slate-900 border-t-4 border-blue-600 text-white relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white p-1 rounded-md">
                  <img
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68eb69c51ce08e4c9fdca015/fbd78afc1_Asset2-100.jpg"
                    alt="Pacific Engineering Logo"
                    className="h-10 w-10 object-contain"
                  />
                </div>
                <div>
                  <div className="font-bold text-xl uppercase tracking-tight">Pacific Engineering</div>
                  <div className="text-xs text-blue-400 tracking-wide">Consulting Engineers & Contractors</div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-8 max-w-lg border-l-2 border-blue-600 pl-4">
                Pacific Engineering & Construction Inc. provides full-scale civil and structural engineering, construction consulting, and plan implementation in a vertically integrated business model working on projects of all sizes from residential remodels to public utility and infrastructure projects. Through decades of deep in-field knowledge and network fostering and growth - Pacific Engineering & Construction truly has earned its polished and professional reputation.
                </p>
              <div className="flex gap-4">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/a-mark-waldman-814b119/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-md flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 transition-all cursor-pointer group"
                >
                  <span className="text-sm font-bold text-gray-400 group-hover:text-white">in</span>
                </a>
                <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-md flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 transition-all cursor-pointer group">
                  <span className="text-sm font-bold text-gray-400 group-hover:text-white">f</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-6 uppercase tracking-wider text-blue-500 border-b border-gray-800 pb-2 inline-block">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link to={createPageUrl("Home")} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl("ServicesOverview")} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl("Consultation")} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                    Start a Consultation
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl("ProjectGallery")} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                    Project Gallery
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl("Blog")} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl("About")} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                    About
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl("Contact")} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-bold text-lg mb-6 uppercase tracking-wider text-blue-500 border-b border-gray-800 pb-2 inline-block">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-300 group">
                  <div className="w-8 h-8 rounded-md bg-blue-900/30 flex items-center justify-center border border-blue-900/50 group-hover:border-blue-500 transition-colors">
                    <Phone className="w-4 h-4 text-blue-400" />
                  </div>
                  <a href="tel:+14156894428" className="hover:text-white transition-colors">
                    (415)-689-4428
                  </a>
                </li>
                <li className="flex items-center gap-3 text-gray-300 group">
                  <div className="w-8 h-8 rounded-md bg-blue-900/30 flex items-center justify-center border border-blue-900/50 group-hover:border-blue-500 transition-colors">
                    <Mail className="w-4 h-4 text-blue-400" />
                  </div>
                  <a href="mailto:amwaldman@sbcglobal.net" className="hover:text-white transition-colors break-all">
                    amwaldman@sbcglobal.net
                  </a>
                </li>
                <li className="flex items-start gap-3 text-gray-300 group">
                  <div className="w-8 h-8 rounded-md bg-blue-900/30 flex items-center justify-center border border-blue-900/50 group-hover:border-blue-500 transition-colors flex-shrink-0 mt-1">
                    <MapPin className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="mt-1">470 3rd St.<br />San Francisco, CA 94107</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
              <p>© 2024 Pacific Engineering. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
      </ErrorBoundary>
  );
}
