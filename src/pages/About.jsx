import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Award, Users, Target, Shield, ArrowRight, Building2, HardHat, ClipboardCheck, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import AnimatedGridBackground from "@/components/AnimatedGridBackground";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title="About Pacific Engineering - 20+ Years of Excellence | PECI"
        description="Founded in 2001, Pacific Engineering & Construction Inc. delivers expert civil engineering, construction, and compliance services across California and Nevada. Meet our PE-certified team."
        keywords="about pacific engineering, civil engineering company, construction firm bay area, PE certified engineers, engineering company history, PECI team"
        url="/about"
      />
      {/* Hero */}
      <section className="relative py-32 px-6 bg-slate-900 border-b-4 border-blue-600 overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-[url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68eb69c51ce08e4c9fdca015/3778041a3_Bay_Area_Evening_Cityscape.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
        </div>

        {/* Animated grid overlay (above cover image, below content) */}
        <div className="absolute inset-0 opacity-50 pointer-events-none">
          <AnimatedGridBackground />
        </div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <AnimatedSection direction="up">
            <h1 className="text-white mb-6 text-5xl font-bold md:text-6xl tracking-tight">About Pacific Engineering</h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
              Engineering, consulting, and construction services backed by decades of experience and a commitment to getting projects done right
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 px-6 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <AnimatedSection direction="up" className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                Who We Are
              </h2>
              <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mb-8 rounded-full"></div>
            </AnimatedSection>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <AnimatedSection direction="left">
                <div className="space-y-4 text-lg text-slate-700 leading-relaxed font-light text-center lg:text-left">
                <p>
                 Founded in 2001, Pacific Engineering &amp; Construction, Inc. (PECI) has applied its surveying and
civil and environmental engineering, construction management, and infrastructure engineering
capabilities to sites across California, and Nevada, PECI provides site civil engineering design
and surveying services for municipal buildings, marinas, prisons, hospitals, schools,
condominiums, casinos and new residential land developments. PECI has developed construction
plans and specifications for site grading, paving, curb and gutter, and sidewalks, as well as water,
sewer, and storm drain utilities. PECI staff has extensive construction management and
construction administration experience. Master plans have been prepared for commercial, light
industrial and residential developments in multiple communities in Northern California. Recent
school projects that PECI has provided engineering services to include projects at the San
Francisco International Airport and schools in Marin, San Francisco, Daly City, and
Sacramento.</p>
<p>PECI continuously strives to improve quality by providing quality control and quality assurance
(QA/QC) on all deliverables and work products. Our firm has an established record of meeting
project and schedule commitments. PECI’s engineers and technicians have hands-on experience
providing contract administration, as well as quality assurance/quality control monitoring and
material testing on a variety of public and private sector projects. Our wide range of in-house
capabilities enables us to provide high-quality, cost-effective services.</p>
<p>PECI’s provides professional surveying, mapping, G.I.S., G.P.S., 3-D laser scanning, and
consulting services throughout California. Our staff has successfully completed projects of all
sizes for both the private, municipal, and public sector.</p>
<p>We are dedicated to providing our clients with quality surveying support for their projects.
Whether it is a small boundary line dispute or providing mapping services to a large utility
company, Pacific Engineering &amp; Construction, Inc. consistently delivers an economical product
in a timely manner.
                </p>
                </div>
                </AnimatedSection>

                <AnimatedSection direction="right" delay={0.2} className="relative lg:row-span-2">
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl sticky top-24">
                  <img
                    src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800"
                    alt="Pacific Engineering team"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 bg-gradient-to-br from-blue-600 to-cyan-600 p-8 rounded-xl shadow-2xl max-w-xs border-4 border-white">
                  <div className="text-white font-bold text-xl tracking-tight mb-2">Committed to Excellence</div>
                  <div className="text-blue-100 text-sm">Since 2001</div>
                </div>
                </AnimatedSection>
                </div>
                </div>

            {/* What We Do */}
            <div className="mb-20">
              <AnimatedSection direction="up" className="text-center mb-12">
                <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                  What We Do
                </h2>
                <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full"></div>
              </AnimatedSection>
              
             <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <Link to={createPageUrl("Services")} className="block group">
                <AnimatedSection direction="left" delay={0.1}>
                  <Card className="h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-slate-200 bg-white cursor-pointer rounded-md">
                    <div className="h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500" />
                    <div className="p-8 flex flex-col items-center text-center">
                      <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-md w-20 h-20 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/40 group-hover:scale-110 transition-transform">
                        <FileText className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-slate-900 text-2xl font-bold mb-4 uppercase tracking-wide">Stormwater Planning</h3>
                      <p className="text-slate-600 mb-8 leading-relaxed">Custom plans from initial assessments, tailored practical BMP designs, and full local, state, and federal regulatory compliance assurance and permitting walkthroughs.
                      </p>
                      <ul className="space-y-4 w-full flex flex-col items-center">
                        <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                          <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <span className="font-medium text-center">In-house PE/QSD/QSP site assessment</span>
                        </li>
                        <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                          <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <span className="font-medium text-center">BMP design and maintenance</span>
                        </li>
                        <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                          <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <span className="font-medium text-center">Clear documentation with action items</span>
                        </li>
                        <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                          <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <span className="font-medium text-center">Full local, state, and Federal compliance assurance</span>
                        </li>
                      </ul>
                    </div>
                  </Card>
                </AnimatedSection>
              </Link>

              <Link to={createPageUrl("Construction")} className="block group">
                <AnimatedSection direction="right" delay={0.2}>
                  <Card className="h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-slate-200 bg-white cursor-pointer rounded-md">
                    <div className="h-1.5 bg-gradient-to-r from-cyan-500 to-teal-500" />
                    <div className="p-8 flex flex-col items-center text-center">
                      <div className="bg-gradient-to-br from-cyan-300 to-cyan-600 rounded-md w-20 h-20 flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/40 group-hover:scale-110 transition-transform">
                        <Shield className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-slate-900 text-2xl font-bold mb-4 uppercase tracking-wide">Construction Service</h3>
                      <p className="text-slate-600 mb-8 leading-relaxed">We are fully licensed and ready to take on any and all work from residential additions, multi-unit residential, commercial mixed-use, up to public and governmental infrastructure.
                      </p>
                      <ul className="space-y-4 w-full flex flex-col items-center">
                        <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                          <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                          <span className="font-medium text-center">Class A License</span>
                        </li>
                        <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                          <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                          <span className="font-medium text-center">Class B License</span>
                        </li>
                        <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                          <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                          <span className="font-medium text-center">Infrastructure & Public Works</span>
                        </li>
                        <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                          <CheckCircle className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                          <span className="font-medium text-center">Residential, Commercial, and Municipal Infrastructure</span>
                        </li>
                      </ul>
                    </div>
                  </Card>
                </AnimatedSection>
              </Link>

              <Link to={createPageUrl("InspectionsTesting")} className="block group">
                <AnimatedSection direction="left" delay={0.3}>
                  <Card className="h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-slate-200 bg-white cursor-pointer rounded-md">
                    <div className="h-1.5 bg-gradient-to-r from-teal-500 to-emerald-500" />
                    <div className="p-8 flex flex-col items-center text-center">
                      <div className="bg-gradient-to-br from-teal-300 to-teal-600 rounded-md w-20 h-20 flex items-center justify-center mb-6 shadow-lg shadow-teal-500/40 group-hover:scale-110 transition-transform">
                        <ClipboardCheck className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-slate-900 text-2xl font-bold mb-4 uppercase tracking-wide">Inspections & Testing</h3>
                      <p className="text-slate-600 mb-8 leading-relaxed">Thorough inspections to ensure ongoing compliance with recommendation and implementation of areas for improvement.

                      </p>
                      <ul className="space-y-4 w-full flex flex-col items-center">
                        <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                          <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                          <span className="font-medium text-center">Structural Systems Inspections</span>
                        </li>
                        <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                          <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                          <span className="font-medium text-center">Stormwater Testing and Inspections</span>
                        </li>
                        <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                          <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                          <span className="font-medium text-center">Materials Sampling & Testing</span>
                        </li>
                        <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                          <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                          <span className="font-medium text-center">Environmental Compliance</span>
                        </li>
                      </ul>
                    </div>
                  </Card>
                </AnimatedSection>
              </Link>
              
              <Link to={createPageUrl("StructuralEngineering")} className="block group">
                <AnimatedSection direction="right" delay={0.4}>
                  <Card className="h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-slate-200 bg-white cursor-pointer rounded-md">
                    <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-green-600" />
                    <div className="p-8 flex flex-col items-center text-center">
                      <div className="bg-gradient-to-br from-emerald-300 to-emerald-600 rounded-md w-20 h-20 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/40 group-hover:scale-110 transition-transform">
                        <ClipboardCheck className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-slate-900 text-2xl font-bold mb-4 uppercase tracking-wide">Engineering Consulting</h3>
                      <p className="text-slate-600 mb-8 leading-relaxed">Professional engineering expertise across civil and structural disciplines, providing innovative solutions and implementation to meet the unique needs of your project - from large-scale infrastructure to single family residential additions.

                      </p>
                      <ul className="space-y-4 w-full flex flex-col items-center">
                        <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                          <span className="font-medium text-center">Civil Engineering Consulting</span>
                        </li>
                        <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                          <span className="font-medium text-center">Structural Consulting</span>
                        </li>
                        <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                          <span className="font-medium text-center">Site Assessment & Design</span>
                        </li>
                        <li className="flex items-center justify-center gap-3 text-slate-700 max-w-md">
                          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                          <span className="font-medium text-center">Development Management & Support</span>
                        </li>
                      </ul>
                    </div>
                  </Card>
                </AnimatedSection>
              </Link>
            </div>
            </div>

            {/* Our Approach */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection direction="left" className="order-2 lg:order-1">
                <div className="aspect-[4/3] rounded-md overflow-hidden shadow-2xl border-4 border-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800"
                    alt="Engineering and construction expertise"
                    className="w-full h-full object-cover"
                  />
                </div>
              </AnimatedSection>
              
              <AnimatedSection direction="right" className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                  How We Work
                </h2>
                <div className="space-y-4 text-lg text-slate-700 leading-relaxed font-light">
                  <p>
                  Our in-house Professional Engineering and Construction teams operate as a unified team—tight, coordinated, and accountable. This integrated structure drives faster decisions, cleaner execution, and consistent technical accuracy on every project.
                  </p>
                  <p>
                  We navigate local SF Bay Area, California, and Federal regulatory compliance standards with precision backed by long-standing relationships with architects, contractors, and construction professionals streamlining approvals and keep schedules on track.
                </p>
                  <p>
                   When site issues surface, our teams identify them early and resolve them immediately. No bottlenecks, no unclear responsibility. We address it, document it, and keep the project moving.
                   </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      

      {/* Core Values */}
      <section className="py-20 px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">
              What Drives Us
            </h2>
            <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full"></div>
          </AnimatedSection>
          
          <div className="grid grid-cols-4 gap-0">
            <AnimatedSection direction="up" delay={0.1}>
              <Card className="p-8 text-center border-r border-slate-200 shadow-md bg-white hover:shadow-xl hover:-translate-y-1 transition-all h-full rounded-none first:rounded-l-xl last:rounded-r-xl">
                <div className="bg-blue-600 w-16 h-16 rounded-md flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight uppercase">Technical Excellence</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Precision engineering, rigorous testing, and PE-certified work that stands up to scrutiny and performs as designed
                </p>
              </Card>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <Card className="p-8 text-center border-r border-slate-200 shadow-md bg-white hover:shadow-xl hover:-translate-y-1 transition-all h-full rounded-none first:rounded-l-xl last:rounded-r-xl">
                <div className="bg-cyan-600 w-16 h-16 rounded-md flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight uppercase">Results-Focused</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Delivering outcomes that matter — compliance achieved, structures built right, projects completed on schedule
                </p>
              </Card>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.3}>
              <Card className="p-8 text-center border-r border-slate-200 shadow-md bg-white hover:shadow-xl hover:-translate-y-1 transition-all h-full rounded-none first:rounded-l-xl last:rounded-r-xl">
                <div className="bg-teal-600 w-16 h-16 rounded-md flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight uppercase">Collaborative</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Working closely with your team, communicating clearly, and coordinating seamlessly across all project phases
                </p>
              </Card>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.4}>
              <Card className="p-8 text-center shadow-md bg-white hover:shadow-xl hover:-translate-y-1 transition-all h-full rounded-none first:rounded-l-xl last:rounded-r-xl">
                <div className="bg-emerald-600 w-16 h-16 rounded-md flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight uppercase">Accountable</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Taking ownership of our work, standing behind our designs, and delivering what we promise
                </p>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <AnimatedSection direction="up" className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 tracking-tight">
              By the Numbers
            </h2>
            <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full"></div>
          </AnimatedSection>
          <div className="grid md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-700">
            {[
              { val: "40+", label: "Years", sub: "Combined experience" },
              { val: "2,500+", label: "Projects", sub: "Successfully completed" },
              { val: "100%", label: "Compliance", sub: "Track record" },
              { val: "$5B+", label: "Project Value", sub: "Total construction value" }
            ].map((stat, i) => (
              <AnimatedSection direction="up" delay={i * 0.1} key={i} className="pt-8 md:pt-0">
                <div className="text-5xl font-bold text-blue-500 mb-2">{stat.val}</div>
                <div className="text-xl text-white font-bold tracking-tight">{stat.label}</div>
                <p className="text-gray-400 mt-2 text-sm">{stat.sub}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection direction="up">
            <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">
              Serving the Bay Area
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-8 font-light">
              Based in San Francisco, we provide engineering, inspection, testing, and construction services throughout the Bay Area. Our teams are familiar with local jurisdictional requirements across San Francisco, Oakland, San Jose, and surrounding counties — streamlining approvals and keeping your project moving forward.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed font-light">
              From hillside developments in Oakland to commercial projects in Silicon Valley, waterfront construction in San Francisco to infrastructure work in the East Bay — we bring local expertise and proven results to every project.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection direction="up">
            <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
              We'd Love to Hear From You
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed font-light">
              If you are a local engineering or construction professional, let's chat. Our in-house engineering and construction teams can help streamline your current or future projects and bring your ideas to life. 
            </p>
            
            <Link to={createPageUrl("Contact")}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gradient-to-r hover:from-white hover:to-blue-50 px-10 py-7 text-lg font-bold tracking-tight rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 group">
                Get in Contact
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}