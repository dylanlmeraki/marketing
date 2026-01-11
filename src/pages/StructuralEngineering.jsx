import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Building2, Ruler, PenTool, Layers, ArrowRight, CheckCircle, Target, TrendingUp } from "lucide-react";
import { ShinyButton } from "@/components/shiny-button";
import { Card } from "@/components/ui/card";
import AnimatedSection from "../components/AnimatedSection";
import SEO from "@/components/SEO";
import AnimatedGridBackground from "@/components/AnimatedGridBackground";

export default function StructuralEngineering() {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Civil & Structural Engineering Consulting - PE Certified | PECI"
        description="Professional civil and structural engineering services: site design, grading, foundations, seismic engineering, land development. Licensed PE team serving the Bay Area."
        keywords="structural engineering, civil engineering, site design, foundation engineering, seismic engineering, land development, PE certified engineers"
        url="/structural-engineering"
      />
      
      {/* Hero */}
      <section className="relative py-32 px-6 bg-slate-900 border-b-4 border-blue-600 overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600')] bg-cover bg-center" />
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
              Engineering Consulting
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
              Professional engineering expertise across civil and structural disciplines, providing innovative solutions and implementation to meet the unique needs of your project - from large-scale infrastructure to single family residential additions.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-6 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                  Client-Centric Engineering Consulting & Development
                </h2>
                <div className="space-y-4 text-lg text-slate-600 leading-relaxed font-light">
                  <p>Through decades of deep, broad-reaching expertise, we've curated invaluable team members who are rooted in disciplined analysis and precision technical application, the most effective and practical solutions engineered to specification. Structural and Civil Engineering designs that satisfy all internal specifications and external regulations - keeping you on budget, on time, and with absolutely minimized stress.</p>
                  <p>Our in-house team of Professional Engineers (PEs) bring several decades of technical field experience in mixed-use commercial, municipal infrastructure and utilities, and even private residential projects of all scopes. We provide detailed design and development consultations tailored to your unique needs.</p>
                  <p>Our teams of in-house engineers, architects, contractors, specialized tradespeople, project managers, and more integrate seamlessly, bringing rigorous QA/QC and documentation, and proactive deployment coordination—minimizing delays, redesigns, and close guidance through permitting, bidding, and project-phasing.</p>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection direction="right" delay={0.2}>
              <div className="relative">
                <div className="aspect-[4/3] rounded-md overflow-hidden shadow-2xl border-4 border-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=800"
                    alt="Structural engineering"
                    className="w-full h-full object-cover" />
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
              Our Engineering Services
            </h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Pacific Engineering & Construction Inc. provides end-to-end engineering consulting services across public, private, and industrial sectors. Our team integrates design, analysis, field verification, and construction-phase support to deliver solutions that meet regulatory standards, reduce project risk, and accelerate execution.
            </p>
          </AnimatedSection>

          <div className="space-y-20">
          <AnimatedSection direction="up" delay={0.1}>
              {/* Structural Engineering Consulting */}
              <Card className="overflow-hidden border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-md bg-white">
                <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-500" />
                <div className="p-8">
                  <div className="flex flex-col items-center text-center mb-10">
                    <div className="bg-gradient-to-br from-blue-400 to-blue-700 rounded-md w-16 h-16 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/40">
                      <Building2 className="w-8 h-8 text-white" />  
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Structural Engineering & Consulting</h3>
                      <p className="text-slate-600 text-lg max-w-3xl mx-auto font-light">Critical verification of structural integrity across all building materials.</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-slate-50 p-6 rounded-md border border-slate-100 hover:border-blue-300 transition-colors text-center group">
                      <h5 className="font-bold text-slate-900 mb-2 uppercase tracking-wide group-hover:text-blue-600 transition-colors">Structural Design & Analysis</h5>
                      <p className="text-sm text-slate-600 leading-relaxed">Develop feasible, code-compliant structural systems for new and existing residential and commercial structures.</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-md border border-slate-100 hover:border-blue-300 transition-colors text-center group">
                      <h5 className="font-bold text-slate-900 mb-2 uppercase tracking-wide group-hover:text-blue-600 transition-colors">Inspections & Testing</h5>
                      <p className="text-sm text-slate-600 leading-relaxed">Conduct field evaluations for existing structural systems: identifying any deficiencies, and providing corrective action recommendations and implementations as needed.</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-md border border-slate-100 hover:border-blue-300 transition-colors text-center group">
                      <h5 className="font-bold text-slate-900 mb-2 uppercase tracking-wide group-hover:text-blue-600 transition-colors">Seismic Engineering</h5>
                      <p className="text-sm text-slate-600 leading-relaxed">Seismic load-withstanding structural designs on new and existing structures.</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-md border border-slate-100 hover:border-blue-300 transition-colors text-center group">
                      <h5 className="font-bold text-slate-900 mb-2 uppercase tracking-wide group-hover:text-blue-600 transition-colors">Structural Steel Systems</h5>
                      <p className="text-sm text-slate-600 leading-relaxed">Design and verification of welds, bolts, and connection integrity per AISC.</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-md border border-slate-100 hover:border-blue-300 transition-colors text-center group">
                      <h5 className="font-bold text-slate-900 mb-2 uppercase tracking-wide group-hover:text-blue-600 transition-colors">Forensic Structural Assessments</h5>
                      <p className="text-sm text-slate-600 leading-relaxed">Inspection of deteriorated or failed systems - determining root cause in order to provide repair recommendations and upgrades.</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-md border border-slate-100 hover:border-blue-300 transition-colors text-center group">
                      <h5 className="font-bold text-slate-900 mb-2 uppercase tracking-wide group-hover:text-blue-600 transition-colors">Wood-Framed Systems</h5>
                      <p className="text-sm text-slate-600 leading-relaxed">Design and verification of wood-framed elements including shear walls, collectors and other load-transferring systems.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>

          <AnimatedSection direction="up" delay={0.2}>
             {/* Civil Engineering Consulting */}
              <Card className="overflow-hidden border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-md bg-white">
                <div className="h-2 bg-gradient-to-r from-cyan-500 to-teal-500" />
                <div className="p-8">
                  <div className="flex flex-col items-center text-center mb-10">
                    <div className="bg-gradient-to-br from-cyan-400 to-cyan-700 rounded-md w-16 h-16 flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/40">
                      <Layers className="w-8 h-8 text-white"/>                      
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Civil Engineering & Consulting</h3>
                      <p className="text-slate-600 text-lg max-w-3xl mx-auto font-light">Critical verification of structural integrity across all building materials.</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-slate-50 p-6 rounded-md border border-slate-100 hover:border-cyan-300 transition-colors text-center group">
                      <h5 className="font-bold text-slate-900 mb-2 uppercase tracking-wide group-hover:text-cyan-600 transition-colors">Land Development</h5>
                      <p className="text-sm text-slate-600 leading-relaxed">Grading, drainage, and utility layouts optimizing site usage; coordinating zoning and permitting requirements with applicable regulatory bodies.</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-md border border-slate-100 hover:border-cyan-300 transition-colors text-center group">
                      <h5 className="font-bold text-slate-900 mb-2 uppercase tracking-wide group-hover:text-cyan-600 transition-colors">Stormwater Planning & Management</h5>
                      <p className="text-sm text-slate-600 leading-relaxed">Design and development of stormwater drainage systems to catch, contain, and release stormwater - minimizing flooding impacts.</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-md border border-slate-100 hover:border-cyan-300 transition-colors text-center group">
                      <h5 className="font-bold text-slate-900 mb-2 uppercase tracking-wide group-hover:text-cyan-600 transition-colors">Erosion Control & Environmental Compliance</h5>
                      <p className="text-sm text-slate-600 leading-relaxed">Provide SWPPP development and implementation, BMP design, water pollution control plans and environmental mitigation strategies ensuring on-time completiona and compliance.</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-md border border-slate-100 hover:border-cyan-300 transition-colors text-center group">
                      <h5 className="font-bold text-slate-900 mb-2 uppercase tracking-wide group-hover:text-cyan-600 transition-colors">Accessability & Feasibility Studie</h5>
                      <p className="text-sm text-slate-600 leading-relaxed">Design and implementation of ADA accessible entries and pathways per regulatory guidelines as well as site analysis and data-driven research to determine project feasibility.</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-md border border-slate-100 hover:border-cyan-300 transition-colors text-center group">
                      <h5 className="font-bold text-slate-900 mb-2 uppercase tracking-wide group-hover:text-cyan-600 transition-colors">Land Surveying</h5>
                      <p className="text-sm text-slate-600 leading-relaxed">Boundary surveys, topographic surveys, subdivion mapping and planning, lot line adjustments, easements, construction staking, monument confirmation and preservation, city/county map review and verification.</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-md border border-slate-100 hover:border-cyan-300 transition-colors text-center group">
                      <h5 className="font-bold text-slate-900 mb-2 uppercase tracking-wide group-hover:text-cyan-600 transition-colors">Construction Support & Project Management</h5>
                      <p className="text-sm text-slate-600 leading-relaxed">Cost estimation, RFIs, submittals, field inspections, plan review, critical path and construction schedule monitoring..</p>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>
     
      {/* Why Choose Us */}
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
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 uppercase tracking-wide">Licensed in California</h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  Our Professional Engineers (PEs) are licensed by the California Board for Professional Engineers and carry full professional liability coverage
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-cyan-400 to-cyan-700 rounded-md w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/40 group-hover:scale-110 transition-transform">
                  <PenTool className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 uppercase tracking-wide">Designed for Efficiency</h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  We prioritize value engineering and feasibility - integrating this mindset vertically by maximizing efficiency and practicality.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.3}>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-teal-400 to-teal-700 rounded-md w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/40 group-hover:scale-110 transition-transform">
                  <Layers className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 uppercase tracking-wide">Complete Compliance Guidance</h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  Thorough technical understanding of local, state, federal regulatory compliance standards for end-to-end permitting.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* Case Studies Section - Commented Out */}
      {/* <AnimatedSection>
       <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Engineering Case Studies
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Complex engineering challenges solved through innovative design and practical field experience
              </p>
            </div>

            <div className="space-y-12"> */}
              {/* Case Study 1 */}
              {/* <Card className="overflow-hidden border-0 shadow-2xl hover:shadow-3xl">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-80 lg:h-auto overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"
                      alt="Seismic retrofit project"
                      className="w-full h-full object-cover" />
                    
                    <div className="absolute top-4 left-4">
                      <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">
                        Seismic Retrofit
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8 lg:p-12">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      Historic Building Soft-Story Retrofit
                    </h3>
                    
                    <div className="mb-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="bg-red-100 p-2 rounded-lg">
                          <Target className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Challenge</h4>
                          <p className="text-gray-700">
                            1920s three-story unreinforced masonry building in San Francisco's Richmond District. Ground floor commercial with residential above. City-mandated soft-story retrofit required seismic upgrade while maintaining historical character and keeping tenants in place during construction.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 mb-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Solution</h4>
                          <p className="text-gray-700">
                            Designed interior steel moment frame system that avoided façade modifications. Utilized existing basement for new foundation elements. Specified shallow embedment anchors requiring minimal concrete removal. Phased construction allowed business to remain operational with only weekend access required. Coordinated closely with city planning to satisfy historical preservation requirements.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Outcome</h4>
                          <p className="text-gray-700">
                            Building achieved full seismic compliance under SF Building Code. Zero disruption to commercial tenant operations during 9-week construction. Historical review board approved design with commendation for sensitive approach. Total project cost 22% below initial estimates through value-engineering. Building now insurable and compliant with mandatory retrofit deadline.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">9 weeks</div>
                        <div className="text-sm text-gray-600">construction time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">22%</div>
                        <div className="text-sm text-gray-600">under budget</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">Zero</div>
                        <div className="text-sm text-gray-600">tenant disruption</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card> */}

              {/* Case Study 2 */}
              {/* <Card className="overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-300">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-80 lg:h-auto overflow-hidden lg:order-2">
                    <img
                      src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800"
                      alt="Foundation design project"
                      className="w-full h-full object-cover" />
                    
                    <div className="absolute top-4 left-4">
                      <div className="bg-cyan-600 text-white px-4 py-2 rounded-lg font-bold">
                        Foundation Design
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8 lg:p-12 lg:order-1">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      Bay Fill Site Deep Foundation System
                    </h3>
                    
                    <div className="mb-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="bg-red-100 p-2 rounded-lg">
                          <Target className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Challenge</h4>
                          <p className="text-gray-700">
                            New 4-story office building on Bay fill site in Alameda with 40 feet of soft clay over dense sand. Preliminary geotechnical report recommended driven piles at $280K. High groundwater and liquefaction potential complicated foundation design. Tight budget required cost-effective solution.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 mb-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Solution</h4>
                          <p className="text-gray-700">
                            Performed value-engineering analysis of foundation alternatives. Designed augered cast-in-place (ACIP) pile system with 18-inch diameter piles instead of driven piles. Specified real-time monitoring during installation to verify concrete volume and pile integrity. Coordinated with geotechnical engineer for load testing program. Design reduced pile count from 84 to 62 through optimized spacing and grade beam configuration.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Outcome</h4>
                          <p className="text-gray-700">
                            Foundation cost reduced to $165K — 41% savings versus driven pile system. Load testing showed ACIP piles exceeded design capacity by 18%. Installation completed in 12 days versus estimated 21 days for driven piles. Eliminated noise and vibration concerns of pile driving in urban area. Building completed on schedule and passed final inspection without foundation-related issues.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-600">$115K</div>
                        <div className="text-sm text-gray-600">cost savings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-600">62 piles</div>
                        <div className="text-sm text-gray-600">optimized count</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-600">12 days</div>
                        <div className="text-sm text-gray-600">installation</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Case Study 3 */}
             {/* <Card className="overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-300">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-80 lg:h-auto overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=800"
                      alt="Structural damage assessment"
                      className="w-full h-full object-cover" />
                    
                    <div className="absolute top-4 left-4">
                      <div className="bg-teal-600 text-white px-4 py-2 rounded-lg font-bold">
                        Structural Evaluation
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8 lg:p-12">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      Fire-Damaged Warehouse Structural Assessment
                    </h3>
                    
                    <div className="mb-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="bg-red-100 p-2 rounded-lg">
                          <Target className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Challenge</h4>
                          <p className="text-gray-700">
                            60,000 SF industrial warehouse suffered significant fire damage to steel roof trusses and metal decking. Insurance company needed rapid structural assessment to determine repair versus replacement decision. Building was revenue-generating and client needed fastest possible re-occupancy timeline.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 mb-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Solution</h4>
                          <p className="text-gray-700">
                            Mobilized PE team within 24 hours for emergency structural assessment. Used laser scanning to document deflections and deformation. Conducted material testing on heat-affected steel members. Performed structural analysis to determine remaining capacity of damaged trusses. Designed targeted repair strategy replacing only critically damaged members (18 of 45 trusses) while reinforcing others. Coordinated closely with fire marshal and building department for expedited permit approval.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Outcome</h4>
                          <p className="text-gray-700">
                            Detailed engineering analysis proved 60% of structure salvageable — avoiding complete tear-down. Repair strategy saved $320K versus full replacement. PE-sealed emergency assessment satisfied insurance engineering review. Building department approved permit applications within 4 days based on comprehensive documentation. Client resumed operations 8 weeks after fire versus 6+ months for full rebuild.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-teal-600">$320K</div>
                        <div className="text-sm text-gray-600">cost savings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-teal-600">60%</div>
                        <div className="text-sm text-gray-600">structure saved</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-teal-600">8 weeks</div>
                        <div className="text-sm text-gray-600">to re-occupancy</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </AnimatedSection> */}

      {/* CTA */}
      <section className="py-24 px-6 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection direction="up">
            <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
              Get Engineering Assistance
            </h2>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed font-light">
              Whether you're a Superintendent dealing with Public Works overload, or a safety professional trying to keep your company's head above compliance waters, we've got your back. Let's discuss your project.
            </p>
            
            <Link to={createPageUrl("SWPPPChecker")}>
              <ShinyButton
                className="group inline-flex items-center justify-center gap-2 whitespace-nowrap text-white font-bold tracking-tight text-lg px-10 py-7 rounded-md shadow-lg hover:shadow-blue-500/60 hover:-translate-y-1 active:scale-95 transition-all duration-300"
                style={{
                  "--shiny-cta-bg": "#0ea5e9",
                  "--shiny-cta-bg-subtle": "rgba(14, 165, 233, 0.2)",
                  "--shiny-cta-highlight": "#2563eb",
                  "--shiny-cta-highlight-subtle": "#38bdf8",
                  "--shiny-cta-shadow": "rgba(59, 130, 246, 0.4)",
                  "--shiny-cta-glow": "rgba(56, 189, 248, 0.55)",
                }}
              >
                Start Free Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </ShinyButton>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>);

}
