import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { HardHat, Truck, Wrench, Users, ArrowRight, CheckCircle, Building2, Layers, PenTool, Ruler, Target, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import AnimatedGridBackground from "@/components/AnimatedGridBackground";
import { ShinyButton } from "@/components/shiny-button";

export default function Construction() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title="Construction Services - Class A & B Licensed | Pacific Engineering"
        description="Full-scale construction services: Class A infrastructure and Class B building construction. PE-certified team for residential, commercial, and public works projects in the Bay Area."
        keywords="construction services bay area, class a contractor, class b contractor, infrastructure construction, building construction, residential construction, commercial construction"
        url="/construction"
      />
      {/* Hero */}
      <section className="relative py-32 px-6 bg-slate-900 border-b-4 border-blue-600 overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=1600')] bg-cover bg-center" />
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
              Construction Services
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
              We are fully licensed and ready to take on any and all work including residential additions, multi-unit residential, commercial mixed-use, public works, and large-scale infrastructure.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-6 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <AnimatedSection direction="left">
              <div className="relative">
                <div className="aspect-[4/3] rounded-md overflow-hidden shadow-2xl border-4 border-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800"
                    alt="Construction site"
                    className="w-full h-full object-cover" />
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                  Foundationally Deep Expertise
                </h2>
                <div className="space-y-4 text-lg text-slate-600 leading-relaxed font-light">
                  <p>
                    With over 40 years of combined experience in civil engineering and construction, our Professional Engineers don't just design systems — we build them. This integrated approach means practical solutions that translate seamlessly from plans to field execution, minimizing conflicts and keeping projects on schedule.
                  </p>
                  <p>
                    Our Class A and Class B licensed contractors, backed by PE-certified engineers, deliver full-scale construction services from site development and utility installation to structural work and building envelope systems. Whether serving as general contractor or specialized subcontractor, we bring the same precision, technical expertise, and commitment to quality that defines our engineering practice.
                  </p>
                  <p>
                    From residential additions to commercial mixed-use developments and public infrastructure projects throughout the Bay Area, we ensure on-time delivery, full compliance, and maximum project efficiency — handling the technical complexity so you can focus on your vision.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              What We Build
            </h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
                  Our in-house team of Engineering and Construction experts are here to help you develop and implement all of your project ideas - keeping you on-time, within-budget, and in full compliance allowing for your maximum creative output.
            </p>
          </AnimatedSection>
            
            <div className="space-y-12">
              {/* Class A - General Engineering */}
              <AnimatedSection direction="up" delay={0.1}>
                <Card className="overflow-hidden border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-md bg-white">
                  <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-500" />
                  <div className="p-8">
                    <div className="flex flex-col items-center text-center mb-10">
                      <div className="bg-gradient-to-br from-blue-400 to-blue-700 rounded-md w-16 h-16 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/40">
                        <HardHat className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Class A (General Engineering) Contracting</h3>
                        <p className="text-slate-600 text-lg max-w-3xl mx-auto font-light">Public utility and infrastructure construction services delivering engineered solutions for complex public and private projects.</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        { title: "Public Infrastructure", desc: "Build roadways, highways, and transportation structures - coordinating traffic control planning with full local and state agency compliance." },
                        { title: "Grading & Excavation", desc: "Precision large-scale grading and excavation, cut/fill balancing, and site preparation using in-house earthwork modeling." },
                        { title: "Public Utilities Installation", desc: "Installation of water, sanitary sewer, storm drain, and recycled water systems; providing full-scale implementation." },
                        { title: "Stormwater Drainage Systems", desc: "Design and construct catch basins, bioswales, and flood-control improvements, ensuring compliance and long-term performance." },
                        { title: "Specialized Structural Engineering", desc: "Pump stations, treatment facilities, retaining structures, and other specialized infrastructure engineering combined with QA/QC." },
                        { title: "Project Delivery", desc: "Manage permitting, submittals, inspections, and coordination with regulatory bodies - executing deliverables within budget and timeline." }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-slate-50 p-6 rounded-md border border-slate-100 hover:border-blue-300 transition-colors text-center group">
                          <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-wide group-hover:text-blue-600 transition-colors">{item.title}</h4>
                          <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </AnimatedSection>

              {/* Class B - General Building */}
              <AnimatedSection direction="up" delay={0.2}>
                <Card className="overflow-hidden border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-md bg-white">
                  <div className="h-2 bg-gradient-to-r from-cyan-500 to-teal-500" />
                  <div className="p-8">
                    <div className="flex flex-col items-center text-center mb-10">
                      <div className="bg-gradient-to-br from-cyan-400 to-cyan-700 rounded-md w-16 h-16 flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/40">
                        <Building2 className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Class B (General Building) Contracting</h3>
                        <p className="text-slate-600 text-lg max-w-3xl mx-auto font-light">Comprehensive construction and renovation services integrating our network of highly skilled tradespeople to deliver you the best.</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        { title: "New Building Construction", desc: "Ground-up building from foundations through to finishes, managing all major building systems and subcontractor coordination." },
                        { title: "Structural Work & Building Envelope", desc: "Installation of framing, shear walls, roofing, windows, and waterproofing to create a durable and compliant envelope." },
                        { title: "Interior Buildout & Renovation", desc: "Mixed-use commercial and residential interior renovations from coordinated MEP updates and sequencing to project completion." },
                        { title: "Residential Remodels & Additions", desc: "Full-home remodels including kitchen, bath, and additions; preserving and upgrading structures at any scale." },
                        { title: "Trade Integration & Management", desc: "Coordinate our MEP and safety tradespeople to ensure proper sequencing, compliance, and inspection readiness." },
                        { title: "Permitting Coordination & Management", desc: "We manage permitting, plan reviews, inspections, and project timeline efficiency - meeting all client specifications." }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-slate-50 p-6 rounded-md border border-slate-100 hover:border-cyan-300 transition-colors text-center group">
                          <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-wide group-hover:text-cyan-600 transition-colors">{item.title}</h4>
                          <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </AnimatedSection>

              {/* Specialty Contracting */}
              <AnimatedSection direction="up" delay={0.3}>
                <Card className="overflow-hidden border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-md bg-white">
                  <div className="h-2 bg-gradient-to-r from-teal-500 to-green-500" />
                  <div className="p-8">
                    <div className="flex flex-col items-center text-center mb-10">
                      <div className="bg-gradient-to-br from-teal-400 to-teal-700 rounded-md w-16 h-16 flex items-center justify-center mb-6 shadow-lg shadow-teal-500/40">
                        <Wrench className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Specialty Contracting & Consulting</h3>
                        <p className="text-slate-600 text-lg max-w-3xl mx-auto font-light">Broad-reaching trade expertise culminating in precision workmanship, practical solutions, and reliable specialized construction guidance.</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { title: "Specialized Trade Execution", desc: "Our skilled network of electrical, plumbing, HVAC, and machinist specialty contractors understand the nuances of true quality workmanship." },
                        { title: "Technical Field Assessment", desc: "Our teams evaluate systemic issues or failures onsite - providing experience-backed recommendations for repairs or improvements." },
                        { title: "On-Call Installation", desc: "Install and retrofit mechanical equipment, fire protection systems, and low-voltage networks with an emphasis on production speed and precision." },
                        { title: "Code & Permitting Support", desc: "On-call trade-specific code compliance consulting, documentation prep, and swift, efficient movement through inspections and approvals." }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-slate-50 p-6 rounded-md border border-slate-100 hover:border-teal-300 transition-colors text-center group">
                          <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-wide group-hover:text-teal-600 transition-colors">{item.title}</h4>
                          <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </AnimatedSection>

              {/* Vertically Integrated */}
              <AnimatedSection direction="up" delay={0.4}>
                <Card className="overflow-hidden border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-md bg-white">
                  <div className="h-2 bg-gradient-to-r from-green-500 to-blue-500" />
                  <div className="p-8">
                    <div className="flex flex-col items-center text-center mb-10">
                      <div className="bg-gradient-to-br from-green-400 to-green-700 rounded-md w-16 h-16 flex items-center justify-center mb-6 shadow-lg shadow-green-500/40">
                        <Layers className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Vertically Integrated Consulting</h3>
                        <p className="text-slate-600 text-lg max-w-3xl mx-auto font-light">Ground and virtual support by our highly-skilled in-house teams of Licensed and Certified engineering and construction professionals.</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { title: "Scalable Project Support", desc: "We have you covered during all phases and potential changes - providing full-service preventative measures against project delays." },
                        { title: "Integrated Technical Design", desc: "We deliver coordinated civil and structural engineering under one roof, minimizing redesign, reducing conflicts, and ensuring seamlessly scalable solutions." },
                        { title: "Expert Management", desc: "Our many years of in-field expertise will streamline your project logistics, phasing, value engineering, and permitting so you get full clarity at every step." },
                        { title: "Lifecycle Oversight", desc: "Nuanced guidance on bidding, contractor selection, inspections, RFIs, project updates, and close-outs, acting as your technical advocate." }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-slate-50 p-6 rounded-md border border-slate-100 hover:border-green-300 transition-colors text-center group">
                          <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-wide group-hover:text-green-600 transition-colors">{item.title}</h4>
                          <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            </div>
            </div>
            </section>

            {/* Case Studies Section */}
            <section className="py-20 px-6 bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto">
            <AnimatedSection direction="up" className="text-center mb-16">
            <h3 className="text-slate-900 mb-4 text-4xl font-bold tracking-tight">Projects Brought to Life</h3>
            <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
            </AnimatedSection>
            <div className="p-8 grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-0 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 text-center mb-3">Residential Development</h3>
                <p className="text-gray-700 leading-relaxed text-center">
                  Single-family subdivisions, multi-family housing, custom homes, and residential site work
                </p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-cyan-50 to-teal-50 border-0 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 text-center mb-3">Commercial Projects</h3>
                <p className="text-gray-700 leading-relaxed text-center">
                  Retail centers, office buildings, industrial facilities, and mixed-use developments
                </p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-teal-50 to-green-50 border-0 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 text-center mb-3">Public Infrastructure</h3>
                <p className="text-gray-700 leading-relaxed text-center">
                  Transportation improvements, utility upgrades, municipal facilities, and public works projects
                </p>
              </Card>
            </div>

            <div className="space-y-12">
              {/* Eddy & Francisco - Commercial Mixed-Use */}
              <Card className="overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-300">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-80 lg:h-auto overflow-hidden">
                    <img
                      src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68eb69c51ce08e4c9fdca015/43f25ff7c_Eddy_Francisco_1.JPG"
                      alt="Eddy & Francisco Commercial Project"
                      className="w-full h-full object-cover" />
                    
                    <div className="absolute top-4 left-4">
                      <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                        Commercial Mixed-Use
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8 lg:p-12">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      Eddy & Francisco Commercial Development
                    </h3>
                    
                    <div className="mb-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Building2 className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Project Overview</h4>
                          <p className="text-gray-700">
                            Mixed-use commercial and residential building featuring ground-floor retail with multi-family housing above. Located in San Francisco's Fisherman's Wharf district, the project required integrated SWPPP services, construction management, and regulatory compliance coordination.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 mb-4">
                        <div className="bg-cyan-100 p-2 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-cyan-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Services Provided</h4>
                          <p className="text-gray-700">
                            Full SWPPP development and QSP implementation, structural engineering consultation, special inspections for seismic systems, materials testing, and construction phase coordination with city departments and utilities.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Result</h4>
                          <p className="text-gray-700">
                            Delivered on-time with full compliance across all jurisdictional requirements. Zero stormwater violations, all inspections passed on first submission, and seamless coordination across engineering and construction phases.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">Mixed-Use</div>
                        <div className="text-sm text-gray-600">development type</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">SWPPP</div>
                        <div className="text-sm text-gray-600">full compliance</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">100%</div>
                        <div className="text-sm text-gray-600">on schedule</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* San Rafael Storm Drain - Infrastructure */}
              <Card className="overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-300">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-80 lg:h-auto overflow-hidden lg:order-1">
                    <img
                      src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68eb69c51ce08e4c9fdca015/93cbbecc5_San_Rafael_Storm_Drain_1.JPG"
                      alt="San Rafael Storm Drain Project"
                      className="w-full h-full object-cover" />
                    
                    <div className="absolute top-4 left-4">
                      <div className="bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold">
                        Public Infrastructure
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8 lg:p-12 lg:order-2">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      San Rafael Storm Drain Improvement
                    </h3>
                    
                    <div className="mb-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Building2 className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Project Overview</h4>
                          <p className="text-gray-700">
                            Major storm drainage infrastructure upgrade involving utility relocation, excavation, and installation of new drainage systems. The project served critical flood control needs for the City of San Rafael while maintaining active roadway traffic.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 mb-4">
                        <div className="bg-cyan-100 p-2 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-cyan-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Services Provided</h4>
                          <p className="text-gray-700">
                            Civil engineering design, construction management, traffic control planning, SWPPP development and QSP oversight, materials testing, and full coordination with city utilities and public works departments.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Result</h4>
                          <p className="text-gray-700">
                            Completed ahead of schedule with zero utility strikes. Full stormwater compliance maintained throughout construction. Traffic flow managed without major disruptions. System performed flawlessly during subsequent storm events.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-teal-600">Infrastructure</div>
                        <div className="text-sm text-gray-600">project type</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-teal-600">Zero</div>
                        <div className="text-sm text-gray-600">utility strikes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-teal-600">Early</div>
                        <div className="text-sm text-gray-600">completion</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Telegraph Hill - Residential */}
              <Card className="overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-300">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-80 lg:h-auto overflow-hidden">
                    <img
                      src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68eb69c51ce08e4c9fdca015/a6e3e14a0_Telegraph_Hill_2.jpg"
                      alt="Telegraph Hill Residential Project"
                      className="w-full h-full object-cover" />
                    
                    <div className="absolute top-4 left-4">
                      <div className="bg-cyan-600 text-white px-4 py-2 rounded-lg font-semibold">
                        Hillside Residential
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8 lg:p-12">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      Telegraph Hill Residential Development
                    </h3>
                    
                    <div className="mb-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Building2 className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Project Overview</h4>
                          <p className="text-gray-700">
                            Challenging hillside residential construction on Telegraph Hill requiring specialized foundation engineering, seismic design, and erosion control. Steep terrain and proximity to historic structures demanded precision execution.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 mb-4">
                        <div className="bg-cyan-100 p-2 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-cyan-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Services Provided</h4>
                          <p className="text-gray-700">
                            Structural engineering for hillside foundations, seismic analysis and design, SWPPP development with slope-specific BMPs, geotechnical coordination, special inspections, and construction phase engineering support.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Result</h4>
                          <p className="text-gray-700">
                            Successfully navigated complex hillside constraints with innovative engineering solutions. Full compliance with San Francisco's stringent hillside development regulations. Zero erosion incidents and all structural inspections passed on first attempt.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-600">Hillside</div>
                        <div className="text-sm text-gray-600">specialty</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-600">Seismic</div>
                        <div className="text-sm text-gray-600">certified</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-600">Zero</div>
                        <div className="text-sm text-gray-600">erosion events</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

      <section className="py-20 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">
              What Makes Us Different
            </h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection direction="up" delay={0.1}>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-blue-400 to-blue-700 rounded-md w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/40 group-hover:scale-110 transition-transform">
                  <HardHat className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 uppercase tracking-wide">Engineering Background</h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  Our crews are backed by professional engineers who understand the technical requirements behind the work
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-cyan-400 to-cyan-700 rounded-md w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/40 group-hover:scale-110 transition-transform">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 uppercase tracking-wide">Own Equipment & Crews</h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  We maintain our own equipment fleet and employ experienced crews — no last-minute scrambling for resources
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.3}>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-teal-400 to-teal-700 rounded-md w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/40 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 uppercase tracking-wide">On-Time Performance</h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  We plan our work, show up when we say we will, and keep your project moving forward without unnecessary delays
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection direction="up">
            <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
              Let's Get Building
            </h2>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed font-light">
              Whether you're a Class A contractor with a neverending workload or a homeowner just trying to maximize your property value — we can help. Let's discuss how we can maximize your schedule and minimize your budget spend.
            </p>
            
            <Link to={createPageUrl("SWPPPChecker")}>
              <ShinyButton
                className="group inline-flex items-center justify-center gap-2 whitespace-nowrap text-white font-bold tracking-tight text-lg px-10 py-7 rounded-md shadow-lg hover:shadow-blue-500/50 hover:-translate-y-1 active:scale-95 transition-all duration-300"
                style={{
                  "--shiny-cta-bg": "#0ea5e9",
                  "--shiny-cta-bg-subtle": "rgba(14, 165, 233, 0.2)",
                  "--shiny-cta-highlight": "#2563eb",
                  "--shiny-cta-highlight-subtle": "#38bdf8",
                  "--shiny-cta-shadow": "rgba(59, 130, 246, 0.4)",
                  "--shiny-cta-glow": "rgba(59, 130, 246, 0.55)",
                }}
              >
                Free Construction Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </ShinyButton>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
