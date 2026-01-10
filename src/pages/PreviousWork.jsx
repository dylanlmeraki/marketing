import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Building2, CheckCircle, MapPin, Award, Filter, X, ArrowRight, Search, Layers, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AnimatedSection from "@/components/AnimatedSection";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AnimatedGridBackground from "@/components/AnimatedGridBackground";

export default function PreviousWork() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filters, setFilters] = useState({
    category: "all",
    service: "all",
    agency: "all",
    search: ""
  });

  const projects = [
    {
      id: 1,
      title: "Port of San Francisco - Portwide Demolition & Roof Inspection",
      client: "Port of San Francisco",
      contact: "Mr. Uday Prasad",
      budget: "$15,250",
      description: "PECI was the lead engineering firm for development of the Port of San Francisco construction cost estimate for the removal and disposal of dilapidated piers and wharfs along the San Francisco waterfront. Piers and wharfs inspected and costs for demolition/removal included piers ½, 2, 24, 30, 31, 32, 54, 60, 64, 70 (wharf 6, 7, & 8), 84, & 88. The cost estimate was subsequently provided to the U.S. Army Corps of Engineers as part of documentation required for funding. The construction cost estimate was developed by thoroughly inspecting the piers and wharfs from both the landside and water site. PECI also provided roof inspections and structural engineering consulting for the placement of solar panels on Port of San Francisco Property.",
      category: "Infrastructure",
      services: ["Structural Engineering", "Cost Estimation", "Inspection"],
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      agencies: ["Port of San Francisco", "U.S. Army Corps of Engineers", "California Regional Water Quality Control Board"]
    },
    {
      id: 2,
      title: "Caltrans - Design/Build Stormwater System Reconstruction",
      client: "California Transportation Department (Caltrans)",
      contact: "Quang Tran, PE - Resident Engineer",
      budget: "$425,000",
      description: "PECI has been awarded various contracts by Caltrans for work along Northern California Highways. PECI completed the design and reconstruction of a stormwater drainage basin along the toe of the embankment at Highway 80 adjacent to American Canyon Blvd. This work included developing adequate field surveys and designs to properly collect, contain and direct all stormwater away from Highway 80 and the surrounding drainage basin to existing culverts passing under Highway 80. PECI also completed construction of a new emergency guardrail along Highway 780 and upgrades to ADA access, signal lighting and striping in Palo Alto. PECI provided all necessary field construction crews and equipment to self-perform the work.",
      category: "Infrastructure",
      services: ["SWPPP", "Civil Engineering", "Construction"],
      image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800",
      agencies: ["Caltrans"]
    },
    {
      id: 3,
      title: "San Francisco Unified School District - Prop A and B Bond Program",
      client: "San Francisco Unified School District",
      contact: "Mr. DeWitt Mark",
      budget: "$315,000",
      description: "Since 2007 PECI has been providing civil, environmental and surveying services to the San Francisco Unified School District as part of the District Prop A and Prop B, 2006 and 2011 Bond Programs. During this project PECI has completed over 25 detailed topographic and underground surveys, civil grading plans for ADA access and for new and rehabilitation building construction for 15 San Francisco elementary, middle, and high schools, and developed comprehensive designs for stormwater treatment and disposal.",
      category: "Education",
      services: ["Civil Engineering", "Surveying", "Stormwater Treatment"],
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800",
      agencies: ["San Francisco Unified School District", "California Regional Quality Control Board", "Department of the State Architect", "San Francisco Fire Department", "San Francisco DPW"]
    },
    {
      id: 4,
      title: "SFPUC - Microwave Replacement Phase II & Water Treatment",
      client: "San Francisco Public Utilities Commission",
      contact: "Mr. Mark Rundle",
      budget: "$929,000",
      description: "PECI has provided construction and construction management services including demolition, asbestos abatement, hazardous materials abatement, excavation and tree removal for the SFPUC upgrade of the Crystal Springs/San Andreas Pipeline located in San Mateo and Harry Tracy Water Treatment Plant located in San Bruno. PECI prepared the required Hazardous Materials Management Plan, Health and Safety Plan, Demolition work plans, Debris and Disposal plan and worker safety plans. PECI has also provided construction services including excavation, paving, utility installation, concrete placement and roadway grading for the SFPUC's installation of microwave towers.",
      category: "Infrastructure",
      services: ["Construction Management", "Hazardous Materials Abatement", "Excavation"],
      image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800",
      agencies: ["San Francisco Public Utilities Commission", "US Forest Service", "Yosemite National Park"]
    },
    {
      id: 5,
      title: "SFO - Design Build Terminal 3/Boarding Area E and Data Center",
      client: "San Francisco International Airport",
      contact: "Mr. Mark P. Costanzo",
      budget: "$1,600,000",
      schedule: "January 2012 - Current",
      description: "PECI was selected as part of the design build team for design and construction of the new Terminal 3/Boarding Area E and Data Center recently completed at the San Francisco International Airport. PECI was responsible for all civil related aspects of the project including but not limited to preparation of the stormwater pollution prevention plan, erosion control plan, grading plan, utility plan, specifications, details, topographic and underground surveying and construction administration related to the civil design.",
      category: "Airport",
      services: ["SWPPP", "Civil Engineering", "Surveying", "Construction Administration"],
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800",
      agencies: ["San Francisco International Airport"]
    },
    {
      id: 6,
      title: "San Francisco Office of Chief Medical Examiner Building",
      client: "San Francisco Department of Public Works",
      contact: "Magdalena Ryor",
      budget: "$350,000",
      description: "PECI was selected as part of the construction team to build the new San Francisco Office of the Chief Medical Examiner Building. PECI's tasks included providing all survey construction staking, utility potholing investigation and surveying, and excavation for new footings, pile caps and grade beams.",
      category: "Municipal",
      services: ["Construction Staking", "Utility Investigation", "Excavation"],
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800",
      agencies: ["San Francisco Department of Public Works"]
    },
    {
      id: 7,
      title: "Hetch Hetchy Water and Power/Safety Improvement Program",
      client: "San Francisco Public Utilities Commission",
      description: "Rim Fire and Project Coordinator for HHWP/HSIP. Provided comprehensive project coordination and safety improvement consulting.",
      category: "Infrastructure",
      services: ["Project Coordination", "Safety Consulting"],
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800",
      agencies: ["San Francisco Public Utilities Commission"]
    },
    {
      id: 8,
      title: "SFPUC Project DB 124: San Joaquin Valley Communication System",
      client: "San Francisco Public Utilities Commission",
      description: "Responsible Design Engineer for communication system upgrades in the San Joaquin Valley.",
      category: "Infrastructure",
      services: ["Design Engineering", "Communication Systems"],
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
      agencies: ["San Francisco Public Utilities Commission"]
    },
    {
      id: 9,
      title: "Temporary Boarding Area B & Security Checkpoint",
      client: "City & County of San Francisco Airport Commission",
      description: "Project Management Support Services with Hill International, Inc. for critical airport security infrastructure.",
      category: "Airport",
      services: ["Project Management", "Security Infrastructure"],
      image: "https://images.unsplash.com/photo-1542296332-2e44a99cfef9?w=800",
      agencies: ["City & County of San Francisco Airport Commission"]
    },
    {
      id: 10,
      title: "Duct Bank Utility Replacement Project",
      client: "San Francisco International Airport",
      description: "Engineering Consulting and Construction Services with Hunt Construction Group for major utility replacement.",
      category: "Airport",
      services: ["Engineering Consulting", "Construction Services", "Utility Replacement"],
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800",
      agencies: ["San Francisco International Airport"]
    },
    {
      id: 11,
      title: "SFO Tower ATCT & Integrated Facilities",
      client: "San Francisco International Airport",
      description: "Environmental Consulting and Construction Services with Hensel Phelps Construction Company for the iconic SFO control tower.",
      category: "Airport",
      services: ["Environmental Consulting", "Construction Services"],
      image: "https://images.unsplash.com/photo-1570737593286-6282806e5787?w=800",
      agencies: ["San Francisco International Airport"]
    }
  ];

  const categories = ["all", ...new Set(projects.map(p => p.category))];
  const allServices = ["all", ...new Set(projects.flatMap(p => p.services || []))].sort();
  const allAgencies = ["all", ...new Set(projects.flatMap(p => p.agencies || []))].sort();

  const filteredProjects = projects.filter(project => {
    const matchesCategory = filters.category === "all" || project.category === filters.category;
    const matchesService = filters.service === "all" || (project.services && project.services.includes(filters.service));
    const matchesAgency = filters.agency === "all" || (project.agencies && project.agencies.includes(filters.agency));
    const matchesSearch = project.title.toLowerCase().includes(filters.search.toLowerCase()) || 
                          project.client.toLowerCase().includes(filters.search.toLowerCase());
    return matchesCategory && matchesService && matchesAgency && matchesSearch;
  });

  const capabilities = [
    "Civil Engineering Design",
    "Environmental Engineering",
    "Construction Management",
    "Surveying & Mapping",
    "Infrastructure Engineering",
    "Site Grading & Paving",
    "Utilities (Water, Sewer, Storm Drain)",
    "General Engineering 'A' Construction"
  ];

  const projectTypes = [
    "Airports", "Municipal Buildings", "Marinas", "Prisons", "Hospitals",
    "Schools", "Condominiums", "Casinos", "Residential Land Developments"
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative py-32 px-6 bg-slate-900 border-b-4 border-blue-600 overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
        </div>

        {/* Animated grid overlay (above cover image, below content) */}
        <div className="absolute inset-0 opacity-50 pointer-events-none">
          <AnimatedGridBackground />
        </div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <AnimatedSection direction="up">
            <div className="inline-flex items-center gap-2 bg-blue-900/80 px-4 py-2 rounded-full border border-blue-500 mb-6 backdrop-blur-sm shadow-xl">
              <Award className="w-4 h-4 text-blue-400" />
              <span className="text-blue-100 text-sm font-bold tracking-wider">Excellence Since 2001</span>
            </div>
            <h1 className="text-white mb-6 text-5xl font-bold md:text-7xl tracking-tight">Previous Work</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-8"></div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
              Over two decades of excellence in civil engineering, construction management, and infrastructure development across California and Nevada.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Company Profile - Lively Cards */}
      <section className="py-20 px-6 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection direction="up" delay={0.1}>
            <div className="mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center tracking-tight">Company Profile</h2>
              <Card className="p-10 border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50 border-t-4 border-blue-600 rounded-lg transform hover:scale-[1.01] transition-transform duration-500">
                <p className="text-lg text-slate-700 leading-relaxed font-light">
                  Founded in 2001, Pacific Engineering & Construction, Inc. (PECI) has applied its civil, environmental, construction management, surveying, and infrastructure engineering capabilities to sites across California and Nevada. PECI provides complete site civil and environmental engineering design and surveying services for airports, municipal buildings, marinas, prisons, hospitals, schools, condominiums, casinos and new residential land developments.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {projectTypes.map((type, i) => (
                    <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 tracking-wide shadow-sm">
                      {type}
                    </span>
                  ))}
                </div>
              </Card>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection direction="left" delay={0.2}>
              <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 shadow-lg hover:shadow-xl transition-shadow h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                    <Layers className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-wide">Core Capabilities</h3>
                </div>
                <div className="space-y-3">
                  {capabilities.map((capability, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-100 hover:border-blue-300 hover:translate-x-1 transition-all duration-300 group cursor-default shadow-sm">
                      <CheckCircle className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                      <span className="text-slate-700 font-semibold text-sm group-hover:text-blue-700">{capability}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.3}>
              <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 shadow-2xl h-full text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-wide">Geographic Reach</h3>
                </div>
                <p className="text-blue-100 leading-relaxed text-lg font-light mb-8 relative z-10">
                  Our expertise spans across multiple states, with extensive experience in both <strong className="text-white">California</strong> and <strong className="text-white">Nevada</strong> markets.
                </p>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors">
                    <h4 className="font-bold text-lg mb-1">California</h4>
                    <p className="text-sm text-blue-200">Bay Area, Northern CA, Central Valley</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors">
                    <h4 className="font-bold text-lg mb-1">Nevada</h4>
                    <p className="text-sm text-blue-200">Reno, Las Vegas, Regional Infrastructure</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-4 justify-between items-center">
          
          <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-500 uppercase">Filters:</span>
            </div>

            {/* Category Filter */}
            <Select value={filters.category} onValueChange={(val) => setFilters(prev => ({...prev, category: val}))}>
              <SelectTrigger className="w-[160px] h-9 text-xs rounded-md bg-slate-50 border-slate-200">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.filter(c => c !== "all").map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Service Filter */}
            <Select value={filters.service} onValueChange={(val) => setFilters(prev => ({...prev, service: val}))}>
              <SelectTrigger className="w-[160px] h-9 text-xs rounded-md bg-slate-50 border-slate-200">
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                {allServices.filter(s => s !== "all").map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Agency Filter */}
            <Select value={filters.agency} onValueChange={(val) => setFilters(prev => ({...prev, agency: val}))}>
              <SelectTrigger className="w-[160px] h-9 text-xs rounded-md bg-slate-50 border-slate-200">
                <SelectValue placeholder="Agency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agencies</SelectItem>
                {allAgencies.filter(a => a !== "all").map(a => (
                  <SelectItem key={a} value={a}>{a}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {(filters.category !== "all" || filters.service !== "all" || filters.agency !== "all" || filters.search) && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setFilters({ category: "all", service: "all", agency: "all", search: "" })}
                className="h-9 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md"
              >
                Reset
                <X className="ml-1 w-3 h-3" />
              </Button>
            )}
          </div>
          
          <div className="relative w-full xl:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search projects..." 
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="pl-9 h-10 rounded-full bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <AnimatedSection key={project.id} direction="up" delay={index * 0.05}>
                <Card 
                  className="group h-full flex flex-col overflow-hidden border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white rounded-lg hover:-translate-y-2"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex gap-2 mb-2 flex-wrap">
                        <span className="inline-block px-2 py-1 bg-blue-600 text-white text-[10px] font-bold tracking-wider rounded-md shadow-sm">
                          {project.category}
                        </span>
                        {project.services && project.services.slice(0, 1).map((s, i) => (
                          <span key={i} className="inline-block px-2 py-1 bg-cyan-600 text-white text-[10px] font-bold tracking-wider rounded-md shadow-sm">
                            {s}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 drop-shadow-md">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-bold tracking-wide mb-4">
                      <Building2 className="w-3 h-3 text-blue-500" />
                      <span className="truncate">{project.client}</span>
                    </div>
                    
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                      {project.description}
                    </p>
                    
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500 mt-auto">
                      <div className="flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                      {project.budget && (
                        <span className="bg-slate-100 px-2 py-1 rounded-md text-slate-600">
                          {project.budget}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-20 opacity-50">
              <p className="text-xl font-medium text-slate-600">No projects found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4 rounded-md"
                onClick={() => setFilters({ category: "all", service: "all", agency: "all", search: "" })}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-300 flex flex-col md:flex-row overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full md:w-2/5 h-64 md:h-auto relative">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
              <div className="absolute bottom-4 left-4 md:hidden text-white">
                <span className="px-2 py-1 bg-blue-600 text-xs font-bold rounded-md mb-2 inline-block">
                  {selectedProject.category}
                </span>
              </div>
            </div>

            <div className="w-full md:w-3/5 p-8 overflow-y-auto">
              <div className="hidden md:block mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-md tracking-wide border border-blue-200">
                  {selectedProject.category}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 tracking-tight leading-tight">
                {selectedProject.title}
              </h2>
              
              <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-slate-500 font-medium mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-500" />
                  <span>{selectedProject.client}</span>
                </div>
                {selectedProject.budget && (
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-green-500" />
                    <span>Budget: {selectedProject.budget}</span>
                  </div>
                )}
                {selectedProject.contact && (
                  <div className="flex items-center gap-2">
                    <HardHat className="w-4 h-4 text-orange-500" />
                    <span>Contact: {selectedProject.contact}</span>
                  </div>
                )}
              </div>

              <div className="prose prose-slate prose-sm max-w-none text-slate-600 leading-relaxed mb-8">
                <p>{selectedProject.description}</p>
              </div>

              {selectedProject.services && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Services Provided</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.services.map((service, i) => (
                      <span key={i} className="px-2 py-1 bg-cyan-50 text-cyan-700 text-xs font-semibold rounded-md border border-cyan-100">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedProject.agencies && (
                <div className="bg-slate-50 p-5 rounded-lg border border-slate-100 mb-8">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Agency Participation</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.agencies.map((agency, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-sm">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-xs font-semibold text-slate-700">{agency}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Link to={createPageUrl("Contact")}>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold tracking-wider h-12 shadow-lg rounded-md">
                  Inquire About Similar Projects
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-24 px-6 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection direction="up">
            <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
              Let's Build Your Next Project Together
            </h2>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed font-light">
              With over 20 years of experience and a proven track record of successful projects, we're ready to bring your vision to life
            </p>
            
            <Link to={createPageUrl("Contact")}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 px-10 py-7 text-lg font-bold tracking-wider rounded-md shadow-xl hover:-translate-y-1 transition-all">
                Start Your Project
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}