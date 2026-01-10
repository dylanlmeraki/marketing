import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Droplets,
  HardHat,
  ClipboardCheck,
  Building2,
  Shield,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  FileText,
  CheckCircle } from
"lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import AnimatedGridBackground from "@/components/AnimatedGridBackground";

export default function ServicesOverview() {
  // ============================================================
  // 📝 EDITABLE SERVICE CARDS CONTENT
  // ============================================================
  // Edit titles, descriptions, and features below to update service cards
  // Note: Keep 'icon', 'gradient', 'bgGradient', and 'link' properties unchanged

  const services = [
  {
    id: 1,
    title: "Stormwater Planning (SWPPP)",
    description: "Comprehensive stormwater pollution prevention plans developed by certified QSDs and Professional Engineers.",
    icon: Droplets,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
    link: "Services",
    features: [
    "QSD/QSP Services",
    "Site Assessment & Analysis",
    "BMP Design & Implementation",
    "Regulatory Compliance"]

  },
  {
    id: 2,
    title: "Construction Services",
    description: "Full-scale construction expertise with Class A & B licenses for infrastructure and residential projects.",
    icon: HardHat,
    gradient: "from-cyan-500 to-teal-500",
    bgGradient: "from-cyan-50 to-teal-50",
    link: "Construction",
    features: [
    "Class A & B Licensed",
    "Public Infrastructure",
    "Commercial & Residential",
    "Project Management"]

  },
  {
    id: 3,
    title: "Inspections & Testing",
    description: "Certified testing and sampling services ensuring code compliance and project quality across all phases.",
    icon: ClipboardCheck,
    gradient: "from-teal-500 to-green-500",
    bgGradient: "from-teal-50 to-green-50",
    link: "InspectionsTesting",
    features: [
    "Stormwater Testing",
    "Materials Testing",
    "Soil & Geotechnical",
    "Lab Coordination"]

  },
  {
    id: 4,
    title: "Structural Engineering",
    description: "Licensed PE-certified structural design, analysis, and seismic retrofit services for all project types.",
    icon: Building2,
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50",
    link: "StructuralEngineering",
    features: [
    "Seismic Retrofits",
    "Foundation Design",
    "Structural Analysis",
    "Building Design"]

  },
  {
    id: 5,
    title: "Special Inspections",
    description: "PE-backed verification services for structural materials, welding, seismic systems, and building envelope.",
    icon: Shield,
    gradient: "from-emerald-500 to-indigo-500",
    bgGradient: "from-emerald-50 to-indigo-50",
    link: "SpecialInspections",
    features: [
    "Structural Materials",
    "Welding Inspection",
    "Seismic Systems",
    "Building Envelope"]

  }];

  // ============================================================

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title="Our Services - Engineering & Construction Solutions | Pacific Engineering"
        description="Complete civil and structural engineering, construction, SWPPP, inspections, and testing services. Integrated solutions for residential, commercial, and infrastructure projects."
        keywords="engineering services, construction services, SWPPP, inspections testing, structural engineering, civil engineering, integrated solutions"
        url="/services-overview"
      />
      
      {/* Hero */}
      <section className="relative py-32 px-6 bg-slate-900 overflow-hidden border-b-4 border-blue-600">
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
              Our Services
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
              Local SF Bay Area experts delivering superior vertically integrated services from in-depth environmental compliance to civil and structural engineering at any scale. No matter the project, our teams of highly skilled professionals have your back.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Civil & Structural Engineering &<br/> Construction Consulting
            </h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              Full-scale civil and structural engineering and construction plans developed and implemented by our teams of in-house Engineers, QSD/QSPs, and construction experts. Helping you ensure on-time, on budget, full compliance, and with maximum creative outlook for your project. Keep everything on track.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-32">
            <Link to={createPageUrl("Services")} className="block group h-full">
              <AnimatedSection direction="left" delay={0.1} className="h-full">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 bg-white cursor-pointer group-hover:-translate-y-2 rounded-md">
                  <div className="h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500" />
                  <div className="p-8 flex flex-col items-center text-center">
                    <div className="bg-slate-100 rounded-md w-20 h-20 flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-blue-400 group-hover:to-blue-600 group-hover:shadow-lg group-hover:shadow-blue-500/40 transition-all duration-300">
                      <FileText className="w-10 h-10 text-slate-700 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-slate-900 text-2xl font-bold mb-4 uppercase tracking-wide">Stormwater Planning</h3>
                    <p className="text-slate-600 mb-8 leading-relaxed">Custom plans from initial assessments, tailored practical BMP designs, and full local, state, and federal regulatory compliance assurance and permitting walkthroughs.
                    </p>
                    <ul className="space-y-4 w-full flex flex-col items-center">
                      <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                        <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="font-medium text-center group-hover:text-blue-600 transition-colors">In-house PE/QSD/QSP site assessment</span>
                      </li>
                      <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                        <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="font-medium text-center group-hover:text-blue-600 transition-colors">BMP design and maintenance</span>
                      </li>
                      <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                        <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="font-medium text-center group-hover:text-blue-600 transition-colors">Clear documentation with action items</span>
                      </li>
                      <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                        <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="font-medium text-center group-hover:text-blue-600 transition-colors">Full local, state, and Federal compliance assurance</span>
                      </li>
                    </ul>
                  </div>
                </Card>
              </AnimatedSection>
            </Link>

            <Link to={createPageUrl("Construction")} className="block group h-full">
              <AnimatedSection direction="right" delay={0.2} className="h-full">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 bg-white cursor-pointer group-hover:-translate-y-2 rounded-md">
                  <div className="h-1.5 bg-gradient-to-r from-cyan-500 to-teal-500" />
                  <div className="p-8 flex flex-col items-center text-center">
                    <div className="bg-slate-100 rounded-md w-20 h-20 flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-cyan-300 group-hover:to-cyan-600 group-hover:shadow-lg group-hover:shadow-cyan-500/40 transition-all duration-300">
                      <Shield className="w-10 h-10 text-slate-700 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-slate-900 text-2xl font-bold mb-4 uppercase tracking-wide">Construction Service</h3>
                    <p className="text-slate-600 mb-8 leading-relaxed">We are fully licensed and ready to take on any and all work from residential additions, multi-unit residential, commercial mixed-use, up to public and governmental infrastructure.
                    </p>
                    <ul className="space-y-4 w-full flex flex-col items-center">
                      <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                        <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                        <span className="font-medium text-center group-hover:text-cyan-600 transition-colors">Class A License</span>
                      </li>
                      <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                        <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                        <span className="font-medium text-center group-hover:text-cyan-600 transition-colors">Class B License</span>
                      </li>
                      <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                        <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                        <span className="font-medium text-center group-hover:text-cyan-600 transition-colors">Infrastructure & Public Works</span>
                      </li>
                      <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                        <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                        <span className="font-medium text-center group-hover:text-cyan-600 transition-colors">Residential, Commercial, and Municipal Infrastructure</span>
                      </li>
                    </ul>
                  </div>
                </Card>
              </AnimatedSection>
            </Link>

            <Link to={createPageUrl("InspectionsTesting")} className="block group h-full">
              <AnimatedSection direction="left" delay={0.3} className="h-full">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 bg-white cursor-pointer group-hover:-translate-y-2 rounded-md">
                  <div className="h-1.5 bg-gradient-to-r from-teal-500 to-emerald-500" />
                  <div className="p-8 flex flex-col items-center text-center">
                    <div className="bg-slate-100 rounded-md w-20 h-20 flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-teal-300 group-hover:to-teal-600 group-hover:shadow-lg group-hover:shadow-teal-500/40 transition-all duration-300">
                      <ClipboardCheck className="w-10 h-10 text-slate-700 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-slate-900 text-2xl font-bold mb-4 uppercase tracking-wide">Inspections & Testing</h3>
                    <p className="text-slate-600 mb-8 leading-relaxed">Thorough inspections to ensure ongoing compliance with recommendation and implementation of areas for improvement.

                    </p>
                    <ul className="space-y-4 w-full flex flex-col items-center">
                      <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                        <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                        <span className="font-medium text-center group-hover:text-teal-600 transition-colors">Structural Systems Inspections</span>
                      </li>
                      <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                        <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                        <span className="font-medium text-center group-hover:text-teal-600 transition-colors">Stormwater Testing and Inspections</span>
                      </li>
                      <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                        <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                        <span className="font-medium text-center group-hover:text-teal-600 transition-colors">Materials Sampling & Testing</span>
                      </li>
                      <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                        <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                        <span className="font-medium text-center group-hover:text-teal-600 transition-colors">Environmental Compliance</span>
                      </li>
                    </ul>
                  </div>
                </Card>
              </AnimatedSection>
            </Link>
            
            <Link to={createPageUrl("StructuralEngineering")} className="block group h-full">
              <AnimatedSection direction="right" delay={0.4} className="h-full">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 bg-white cursor-pointer group-hover:-translate-y-2 rounded-md">
                  <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-green-600" />
                  <div className="p-8 flex flex-col items-center text-center">
                    <div className="bg-slate-100 rounded-md w-20 h-20 flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-emerald-300 group-hover:to-emerald-600 group-hover:shadow-lg group-hover:shadow-emerald-500/40 transition-all duration-300">
                      <ClipboardCheck className="w-10 h-10 text-slate-700 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-slate-900 text-2xl font-bold mb-4 uppercase tracking-wide">Engineering Consulting</h3>
                    <p className="text-slate-600 mb-8 leading-relaxed">Professional engineering expertise across civil and structural disciplines, providing innovative solutions and implementation to meet the unique needs of your project - from large-scale infrastructure to single family residential additions.

                    </p>
                    <ul className="space-y-4 w-full flex flex-col items-center">
                      <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                        <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <span className="font-medium text-center group-hover:text-emerald-600 transition-colors">Civil Engineering Consulting</span>
                      </li>
                      <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                        <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <span className="font-medium text-center group-hover:text-emerald-600 transition-colors">Structural Consulting</span>
                      </li>
                      <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                        <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <span className="font-medium text-center group-hover:text-emerald-600 transition-colors">Site Assessment & Design</span>
                      </li>
                      <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                        <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <span className="font-medium text-center group-hover:text-emerald-600 transition-colors">Development Management & Support</span>
                      </li>
                    </ul>
                  </div>
                </Card>
              </AnimatedSection>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">
              Why Choose Pacific Engineering
            </h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection direction="up" delay={0.1}>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-md w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/40 group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 uppercase tracking-wide">Licensed & Certified</h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  Professional Engineers, QSD/QSPs, and contractors with California licenses and certifications
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-cyan-300 to-cyan-600 rounded-md w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/40 group-hover:scale-110 transition-transform">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 uppercase tracking-wide">Integrated Solutions</h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  Seamless coordination across engineering, construction, and compliance for streamlined projects
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.3}>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-teal-300 to-teal-600 rounded-md w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/40 group-hover:scale-110 transition-transform">
                  <ClipboardCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 uppercase tracking-wide">Bay Area Experts</h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  Deep knowledge of local jurisdictions, regulations, and conditions across the region
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection direction="up">
            <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed font-light">
              Let's discuss your project needs and how we can help ensure its success
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to={createPageUrl("Contact")}>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gradient-to-r hover:from-white hover:to-blue-50 px-10 py-7 text-lg font-bold tracking-tight rounded-md shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all duration-300 group">
                  Get in Touch
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              
              <Link to={createPageUrl("Consultation")}>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 font-bold tracking-tight px-10 py-7 text-lg rounded-md shadow-lg hover:shadow-xl hover:shadow-blue-500/50 active:scale-95 transition-all duration-300 group">
                  Get Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>);

}