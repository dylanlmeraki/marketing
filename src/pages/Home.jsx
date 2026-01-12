import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { CheckCircle, FileText, ClipboardCheck, Shield, ArrowRight, Phone, Mail } from "lucide-react";
import { ShinyButton } from "@/components/shiny-button";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FlowButton } from "@/components/ui/FlowButton";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import AnimatedGridBackground from "@/components/AnimatedGridBackground";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Pacific Engineering & Construction Inc. - Civil Engineering & SWPPP Services"
        description="Professional civil engineering, construction management, stormwater compliance (SWPPP), and special inspections in the San Francisco Bay Area. PE-certified team with 20+ years experience."
        keywords="civil engineering bay area, construction management, SWPPP services, QSD QSP, structural engineering, special inspections, stormwater compliance, San Francisco contractors"
        url="/"
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-[url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68eb69c51ce08e4c9fdca015/3778041a3_Bay_Area_Evening_Cityscape.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
        </div>

        {/* Animated grid overlay (above cover image, below content) */}
        <AnimatedGridBackground 
          baseOpacity={0.6}
          triggerInterval={300}
          animationDuration={2500}
          zIndex={2}
          className="mix-blend-screen"
        />
        <AnimatedGridBackground 
          gridSize={80}
          animationDuration={4200}
          triggerInterval={650}
          offsetX={12}
          offsetY={8}
          baseOpacity={0.4}
          zIndex={3}
          movingOffset
          className="mix-blend-screen"
        />

        <div className="text-center relative z-10 max-w-5xl px-4 w-full">
          <AnimatedSection direction="up" duration={0.8} className="bg-slate-900/80 mx-auto opacity-100 rounded-md backdrop-blur-sm max-w-6xl shadow-2xl border-t-4 border-blue-600">
            <div className="px-6 pt-8 md:py-16 md:px-110">
              <h1 className="text-white mb-6 text-4xl font-bold tracking-tight leading-tight md:text-6xl lg:text-7xl">
                Pacific Engineering <br/>
                <span className="text-blue-500">& Construction Inc.</span>
              </h1>

              <div className="w-48 h-1 bg-gradient-to-r from-blue-500 to-peach-300 mx-auto mt-4 mb-8"></div>

              <div className="mb-12">
                <p className="text-gray-300 mb-4 mx-auto text-xl leading-relaxed md:text-2xl max-w-4xl font-light">
                  Consulting Engineers & Contractors
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-10 justify-center items-center mb-16">
                <Link to={createPageUrl("ServicesOverview")}>
					<FlowButton className="mt-1" text="Our Services" />
                </Link>
                <Link to={createPageUrl("Consultation")}>
                  <ShinyButton
                    className="group inline-flex items-center justify-center gap-2 whitespace-nowrap text-white font-bold tracking-tight text-lg px-8 sm:px-12 py-7 rounded-md shadow-lg hover:shadow-blue-700/60 hover:-translate-y-1 active:scale-95 transition-all duration-300"
                    style={{
                      "--shiny-cta-bg": "#0ea5e9",
                      "--shiny-cta-bg-subtle": "rgba(14, 165, 233, 0.2)",
                      "--shiny-cta-highlight": "#2563eb",
                      "--shiny-cta-highlight-subtle": "#38bdf8",
                      "--shiny-cta-shadow": "rgba(59, 130, 246, 0.4)",
                      "--shiny-cta-glow": "rgba(56, 189, 248, 0.55)",
                    }}
					>
					<span test="Free Consultation" <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
				  </span>  
			</Link>
        </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-700 pt-10">
                <div className="text-center">
                  <div className="text-white text-4xl font-bold mb-1">40+</div>
                  <div className="text-blue-400 text-sm uppercase tracking-widest font-bold">Years Experience</div>
                </div>
                <div className="text-center md:border-l md:border-r border-gray-700">
                  <div className="text-white text-3xl font-bold mb-1">Full-Service</div>
                  <div className="text-blue-400 text-sm uppercase tracking-widest font-bold">Vertically Integrated</div>
                </div>
                <div className="text-center">
                  <div className="text-white text-3xl font-bold mb-1">Full-Scale</div>
                  <div className="text-blue-400 text-sm uppercase tracking-widest font-bold">Res, Comm & Infrastructure</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 px-6 bg-slate-50 border-t-4 border-gradient-to-r from-blue-400 to-cyan-500">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Consulting Engineers & Contractors
            </h2>
            <div className="w-56 h-1 bg-blue-600 mx-auto mt- 2 mb-6"></div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">Full-scale civil and structural engineering and construction plans developed and implemented by our teams of in-house Engineers, QSD/QSPs, and construction experts.

            Helping you ensure on-time, on budget, full compliance, and with maximum creative outlook for your project.

            Keep everything on track.</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Link to={createPageUrl("Services")} className="block group h-full">
              <AnimatedSection direction="left" delay={0.1} className="h-full">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 bg-white cursor-pointer group-hover:-translate-y-2 rounded-md">
                  <div className="h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500" />
                  <div className="p-8 flex flex-col items-center text-center">
                    <div className="bg-slate-100 rounded-md w-20 h-20 flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-blue-400 group-hover:to-blue-600 group-hover:shadow-lg group-hover:shadow-blue-500/40 transition-all duration-300">
                      <FileText className="w-10 h-10 text-slate-700 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-slate-900 text-2xl font-bold mb-4 uppercase tracking-wide group-hover:text-blue-600 transition-colors">Stormwater Planning</h3>
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
                    <h3 className="text-slate-900 text-2xl font-bold mb-4 uppercase tracking-wide group-hover:text-cyan-600 transition-colors">Construction Service</h3>
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
                    <h3 className="text-slate-900 text-2xl font-bold mb-4 uppercase tracking-wide group-hover:text-teal-600 transition-colors">Inspections & Testing</h3>
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
                    <h3 className="text-slate-900 text-2xl font-bold mb-4 uppercase tracking-wide group-hover:text-emerald-600 transition-colors">Engineering Consulting</h3>
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

          <AnimatedSection direction="up" delay={0.5} className="text-center mt-16">
            <Link to={createPageUrl("Services")}>
              <Button size="lg" className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-blue-600 text-white px-10 py-6 text-sm font-bold tracking-tight rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 duration-300 group">
               View All Services
               <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

{/* Why Choose Us */}
      <section className="py-20 px-6 bg-slate-100 relative overflow-hidden">
        {/* Subtle construction texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <h2 className="text-slate-900 mb-6 text-4xl font-bold text-center tracking-tight md:text-5xl">Why Pacific Engineering?
              </h2>
              <div className="bg-blue-600 mx-auto my-8 px-32 w-16 h-1"></div>
              
              <p className="text-slate-600 mb-10 text-xl text-center leading-relaxed">With over 40 years of experience in private, commercial, and institutional full-scale civil engineering and construction contractiong, we deliver comprehensive solutions and deliverables keeping projects on track with the utmost professional efficiency.

              </p>
            <div className="flex-items-center group-justify-center">  
              <div className="space mb-12">
              
                <div className="mx-auto py-2 group flex gap-5 items-center">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-700 rounded-md flex items-center justify-center shadow-lg shadow-blue-500/40 group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="">
                    <h3 className="text-slate-900 mb-1 text-xl font-bold text-left uppercase tracking-wide">EXPERT KNOWLEDGE</h3>
                    <p className="text-slate-600 text-left">Complete understanding of federal, state, and local stormwater regulations</p>
                  </div>
                </div>

                <div className="mx-auto py-2 group flex gap-5 items-center">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-800 rounded-md flex items-center justify-center shadow-lg shadow-blue-600/40 group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="">
                    <h3 className="text-slate-900 mb-1 text-xl font-bold text-left uppercase tracking-wide">PROVEN TRACK RECORD</h3>
                    <p className="text-slate-600 text-center">100% client satisfaction across 2,5K+ projects</p>
                  </div>
                </div>

                <div className="mx-auto py-2 group flex gap-5 items-center">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-900 rounded-md flex items-center justify-center shadow-lg shadow-blue-800/40 group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="">
                    <h3 className="text-slate-900 mb-1 text-xl font-bold text-left uppercase tracking-wide">RESPONSIVE SERVICE</h3>
                    <p className="text-slate-600 text-left">Quick turnaround times and dedicated project support</p>
                  </div>
                </div>
              </div>
            </div>  

              <div className="text-center">
                <Link to={createPageUrl("About")}>
                  <Button size="lg" className="bg-slate-900 hover:bg-gradient-to-br from-blue-400 to-blue-900 text-white px-10 py-6 text-sm font-bold tracking-tight rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 duration-300 group">
                    About Us
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2} className="relative">
              <div className="aspect-[4/3] rounded-md overflow-hidden shadow-2xl border-4 border-white">
                <img src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800" alt="San Francisco construction projects"
                className="w-full h-full object-cover" />
              </div>
              <div className="p-10 bg-gradient-to-br mt-1 mx-auto px-10 py-10 rounded-xl absolute -bottom-8 -left-8 from-blue-600 via-blue-700 to-cyan-600 shadow-2xl border-4 border-white transform-all hover:scale-105">
                <div className="text-white mb-2 text-5xl font-bold text-center tracking-tight">2.5K+</div>
                <div className="text-blue-50 font-bold uppercase tracking-widest text-sm">Successful Projects</div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-slate-900 relative overflow-hidden border-t-4 border-blue-600">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68eb69c51ce08e4c9fdca015/8799e5f43_Bay_Bridge_undersitde_sunrise.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-blue-900/50 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <AnimatedSection direction="up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">How Can We Help?
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-10"></div>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto font-light">Let's discuss your Projects' unique needs and develop a comprehensive solution to keep your ideas on schedule, under budget, allowing you to maximize your capabilities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to={createPageUrl("ServicesOverview")}>
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-10 py-7 text-lg font-bold tracking-tight rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 duration-300 group">
                <Mail className="mr-2 w-5 h-5" />
                Services
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              </Link>
              <Link to={createPageUrl("Contact")}>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-7 text-lg font-bold tracking-tight rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 active:scale-95 duration-300 group">
                <Phone className="mr-2 w-5 h-5" />
                Get In Touch
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>);

}
