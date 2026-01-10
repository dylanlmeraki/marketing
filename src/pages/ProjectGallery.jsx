import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight, MapPin, Calendar, Building2, X, Search, Filter, Award, CheckCircle, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import { projects, getUniqueCategories, getUniqueServices, getUniqueCounties } from "@/components/data/projectsData";
import AnimatedGridBackground from "@/components/AnimatedGridBackground";

export default function ProjectGallery() {
  const [filters, setFilters] = useState({
    category: "all",
    service: "all",
    location: "all"
  });

  // Generate filter options dynamically from consolidated project data
  const categories = [
    { value: "all", label: "All Categories" },
    ...getUniqueCategories().map(cat => ({ value: cat, label: cat }))
  ];

  const serviceTypes = [
    { value: "all", label: "All Services" },
    ...getUniqueServices().map(service => ({ value: service, label: service }))
  ];

  const locations = [
    { value: "all", label: "All Locations" },
    ...getUniqueCounties().map(county => ({ value: county, label: county }))
  ];

  const filteredProjects = projects.filter(p => {
    const categoryMatch = filters.category === "all" || p.category === filters.category;
    const locationMatch = filters.location === "all" || p.county === filters.location;
    const serviceMatch = filters.service === "all" || p.services.some(s => s === filters.service);
    return categoryMatch && locationMatch && serviceMatch;
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title="Project Gallery - Pacific Engineering Portfolio | 100+ Completed Projects"
        description="Explore Pacific Engineering's portfolio of civil engineering, SWPPP, and construction projects across California. Airports, infrastructure, schools, and commercial developments."
        keywords="engineering portfolio, construction projects bay area, SWPPP projects, civil engineering work, infrastructure projects, completed engineering projects"
        url="/project-gallery"
      />
      {/* Hero */}
      <section className="relative py-32 px-6 bg-slate-900 border-b-4 border-blue-600 overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
        </div>

        {/* Animated grid overlay (above cover image, below content) */}
        <div className="absolute inset-0 opacity-50 pointer-events-none">
          <AnimatedGridBackground />
        </div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <AnimatedSection direction="up">
            <h1 className="text-white mb-6 text-5xl font-bold md:text-6xl tracking-tight">
              Project Gallery
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
              Explore our portfolio of successful projects across the Bay Area. From residential developments to major infrastructure, see how we deliver compliance and excellence.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Company Profile */}
      <section className="py-16 px-6 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection direction="up" delay={0.1}>
            <Card className="p-10 border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50 border-t-4 border-blue-600 rounded-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-md flex items-center justify-center shadow-md">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Excellence Since 2001</h2>
              </div>
              <p className="text-lg text-slate-700 leading-relaxed font-light mb-6">
                Founded in 2001, Pacific Engineering & Construction, Inc. (PECI) has applied its civil, environmental, construction management, surveying, and infrastructure engineering capabilities to sites across California and Nevada. We provide complete site civil and environmental engineering design and surveying services for airports, municipal buildings, marinas, prisons, hospitals, schools, condominiums, casinos and new residential land developments.
              </p>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { icon: CheckCircle, label: "Civil Engineering Design" },
                  { icon: CheckCircle, label: "Construction Management" },
                  { icon: CheckCircle, label: "Surveying & Mapping" },
                  { icon: CheckCircle, label: "Infrastructure Engineering" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white p-3 rounded-md border border-slate-100 shadow-sm">
                    <item.icon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-xs font-bold text-slate-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Advanced Filter Bar */}
      <section className="py-8 px-6 bg-white border-b border-slate-200 sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up">
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
              <div className="flex flex-wrap gap-4 w-full md:w-auto">
                <div className="w-full md:w-auto">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => handleFilterChange("category", cat.value)}
                        className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                          filters.category === cat.value
                            ? "bg-slate-900 text-white shadow-lg scale-105"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 w-full lg:w-auto items-center">
                <div className="w-full md:w-48">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Service Type</label>
                  <select 
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-md text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    value={filters.service}
                    onChange={(e) => handleFilterChange("service", e.target.value)}
                  >
                    {serviceTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div className="w-full md:w-48">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Location</label>
                  <select 
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-md text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                  >
                    {locations.map(loc => (
                      <option key={loc.value} value={loc.value}>{loc.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Active Filters Summary */}
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
              <Filter className="w-4 h-4" />
              <span className="font-bold">{filteredProjects.length}</span> projects found
              {(filters.category !== "all" || filters.service !== "all" || filters.location !== "all") && (
                <button 
                  onClick={() => setFilters({ category: "all", service: "all", location: "all" })}
                  className="text-blue-600 hover:text-blue-800 font-bold ml-4 text-xs uppercase tracking-wider flex items-center gap-1"
                >
                  <X className="w-3 h-3" /> Clear All Filters
                </button>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <AnimatedSection key={project.id} direction="up" delay={index * 0.05}>
                <Link to={createPageUrl("ProjectDetail") + `?slug=${project.slug}`}>
                  <Card
                    className="group overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer rounded-md bg-white h-full hover:-translate-y-1"
                  >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-colors duration-300"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-white uppercase tracking-wider">
                        {project.date}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors tracking-tight line-clamp-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-500 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium uppercase tracking-wide">{project.county}, CA</span>
                    </div>
                    <p className="text-slate-600 mb-6 line-clamp-3 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.services.slice(0, 2).map((service, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-100 text-slate-700 border border-slate-200 text-xs px-3 py-1 rounded-md font-bold uppercase tracking-wider"
                        >
                          {service}
                        </span>
                      ))}
                      {project.services.length > 2 && (
                        <span className="bg-blue-50 text-blue-600 border border-blue-100 text-xs px-3 py-1 rounded-md font-bold uppercase tracking-wider">
                          +{project.services.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
                </Link>
              </AnimatedSection>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl font-bold text-slate-400 mb-4">No projects found matching your criteria</p>
              <Button 
                variant="outline" 
                onClick={() => setFilters({ category: "all", service: "all", location: "all", search: "" })}
                className="rounded-md"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Removed Project Detail Modal - Now using dedicated page */}
      {false && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-white rounded-md max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-300 border border-slate-200">
            {/* Image Gallery */}
            {selectedProject.images && selectedProject.images.length > 1 ? (
              <div className="grid grid-cols-2 gap-1 bg-slate-100 border-b border-slate-200">
                {selectedProject.images.map((img, idx) => (
                  <div key={idx} className="relative h-72 group overflow-hidden">
                    <img
                      src={img}
                      alt={`${selectedProject.title} - Image ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative h-96 border-b border-slate-200">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 bg-slate-900 text-white rounded-md p-2 hover:bg-blue-600 transition-colors shadow-lg z-10"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-slate-900 text-white px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider">
                  {selectedProject.date}
                </span>
                <span className="bg-blue-100 text-blue-800 px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider">
                  {selectedProject.category}
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                {selectedProject.title}
              </h2>
              
              <div className="flex items-center gap-2 text-slate-500 mb-8 pb-8 border-b border-slate-100">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-lg font-medium uppercase tracking-wide">{selectedProject.location}</span>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 mb-10">
                <div className="md:col-span-2">
                  <h3 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-wide">Project Description</h3>
                  <p className="text-slate-600 text-lg leading-relaxed mb-8">
                    {selectedProject.description}
                  </p>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-wide">Scope of Work</h3>
                  <p className="text-slate-600 leading-relaxed border-l-4 border-blue-500 pl-4 py-1 bg-slate-50">
                    {selectedProject.scope}
                  </p>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider text-gray-400">Services Provided</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.services.map((service, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-100 text-slate-800 px-3 py-2 rounded-md text-sm font-bold border-l-2 border-blue-500"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {selectedProject.agencies && selectedProject.agencies.length > 0 && (
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider text-gray-400">Agencies</h3>
                      <div className="space-y-2">
                        {selectedProject.agencies.map((agency, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                            <Building2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="font-medium">{agency}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <Link to={createPageUrl("Contact")}>
                <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold tracking-tight rounded-md h-14 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1 active:scale-95 transition-all duration-300 group">
                  Start a Project Like This
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-20 px-6 bg-slate-900 border-t-4 border-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection direction="up">
            <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed font-light">
              Let's discuss how we can bring the same level of excellence and compliance to your construction project.
            </p>
            
            <Link to={createPageUrl("Contact")}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 px-10 py-7 text-lg font-bold tracking-tight rounded-md shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-300 group">
                Get in Touch
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}