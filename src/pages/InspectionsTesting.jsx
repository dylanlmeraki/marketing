import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Beaker, CheckCircle, Droplets, FlaskConical, ArrowRight, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShinyButton } from "@/components/shiny-button";
import { Card } from "@/components/ui/card";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import AnimatedGridBackground from "@/components/AnimatedGridBackground";

export default function InspectionsTesting() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title="Inspections & Testing Services - Materials & Environmental | PECI"
        description="Comprehensive construction inspections and materials testing: stormwater testing, concrete testing, structural inspections, environmental compliance. Fast turnaround times."
        keywords="construction inspections, materials testing, stormwater testing, concrete testing, structural inspections, environmental testing, quality control testing"
        url="/inspections-testing"
      />
      {/* Hero */}
      <section className="relative py-32 px-6 bg-slate-900 border-b-4 border-blue-600 overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1600')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
        </div>

        {/* Animated grid overlay (above cover image, below content) */}
        <div className="absolute inset-0 opacity-50 pointer-events-none">
          <AnimatedGridBackground />
        </div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <AnimatedSection direction="up">
            <h1 className="text-white mb-6 text-5xl font-bold tracking-tight md:text-6xl">
              Testing & Inspection Services
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto text-center mb-10 font-light">
              Comprehensive field and lab testing verifying compliance at every necessary step to keep your project moving forward efficiently.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-6 bg-white border-b border-slate-200">
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
                <div className="w-16 h-16 bg-blue-600 rounded-md flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 uppercase tracking-wide">Fast Turnaround</h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  We prioritize quick lab processing and same-day field results when possible. We aim to minimize and ideally negate any downtime caused by testing and sampling delays.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <div className="text-center group">
                <div className="w-16 h-16 bg-cyan-600 rounded-md flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 uppercase tracking-wide">Certified & Accredited</h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  Our technicians hold current certifications from ACI, ICC, and other recognized bodies. Our partner labs are NELAC and EPA-certified.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.3}>
              <div className="text-center group">
                <div className="w-16 h-16 bg-teal-600 rounded-md flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 uppercase tracking-wide">Clear Reporting</h3>
                <p className="text-slate-600 leading-relaxed font-light">
                  You get streamlined reports that inspectors and engineers actuate on quickly — no waiting around, just the organized data keeping your projects' timelines at our front of mind.
                </p>
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
              Testing Services
            </h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
              We provide comprehensive and extensive testing keeping all facets of your project compliant and on track including stormwater, concrete, structural materials, foundational integrity, full environmental pollution panels and much more.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection direction="left" delay={0.1}>
              <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-slate-200 bg-white rounded-md h-full">
                <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-500" />
                <div className="p-8 flex flex-col items-center">
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 mx-auto my-6 rounded-md w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/40">
                    <Droplets className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-slate-900 mx-auto my-4 text-2xl font-bold text-center tracking-tight">Stormwater Testing & Inspections</h3>
                  <p className="text-slate-600 mb-8 text-center leading-relaxed">
                    NPDES permit compliance testing, pH monitoring, turbidity analysis, and pollutant screening ensuring you're meeting standards.
                  </p>
                  <ul className="space-y-4 w-full flex flex-col items-center">
                    {[
                      { text: "Pre-storm, During, and post-storm sampling", color: "blue" },
                      { text: "Visual observations monitored during, pre, and post QPE.", color: "blue" },
                      { text: "NAL exceedance response planning", color: "blue" },
                      { text: "Comprehensive lab analysis coordination", color: "blue" }
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-700 max-w-md w-full group">
                        <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="font-medium group-hover:text-blue-600 transition-colors">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-slate-200 bg-white rounded-md h-full">
                <div className="h-2 bg-gradient-to-r from-cyan-500 to-teal-500" />
                <div className="p-8 flex flex-col items-center">
                  <div className="bg-gradient-to-br from-cyan-300 to-cyan-600 mx-auto my-6 rounded-md w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/40">
                    <FlaskConical className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-slate-900 mx-auto my-4 text-2xl font-bold text-center tracking-tight">Materials Sampling & Testing</h3>
                  <p className="text-slate-600 mb-8 text-center leading-relaxed">
                    Comprehensive field and laboratory testing to ensure compliance with local, state, and federal requirements and engineering specifications.
                  </p>
                  <ul className="space-y-4 w-full flex flex-col items-center">
                    {[
                      "Concrete field strength testing",
                      "Hazardous Materials Sampling and Testing",
                      "Reinforced steel, bolts, tiedowns, wood-framed structure, and anchorage system testing",
                      "Welding and structural connection strength testing"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-700 max-w-md w-full group">
                        <CheckCircle className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                        <span className="font-medium group-hover:text-cyan-600 transition-colors">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.3}>
              <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-slate-200 bg-white rounded-md h-full">
                <div className="h-2 bg-gradient-to-r from-teal-500 to-green-500" />
                <div className="p-8 flex flex-col items-center">
                  <div className="bg-gradient-to-br from-teal-300 to-teal-600 mx-auto my-6 rounded-md w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-teal-500/40">
                    <Beaker className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-slate-900 mx-auto my-4 text-2xl font-bold text-center tracking-tight">Structural Systems Inspections</h3>
                  <p className="text-slate-600 mb-8 text-center leading-relaxed">
                    Field and laboratory testing of concrete, asphalt, aggregates, and other construction materials to ensure quality and code compliance
                  </p>
                  <ul className="space-y-4 w-full flex flex-col items-center">
                    {[
                      "Concrete cylinder testing (compression)",
                      "Slump, air content, and temperature resistance checks",
                      "Asphalt core sampling and density testing",
                      "Aggregate gradation and quality validation"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-700 max-w-md w-full group">
                        <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                        <span className="font-medium group-hover:text-teal-600 transition-colors">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.4}>
              <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-slate-200 bg-white rounded-md h-full">
                <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500" />
                <div className="p-8 flex flex-col items-center">
                  <div className="bg-gradient-to-br from-emerald-300 to-emerald-600 mx-auto my-6 rounded-md w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/40">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-slate-900 mx-auto my-4 text-2xl font-bold text-center tracking-tight">Environmental Compliance</h3>
                  <p className="text-slate-600 mb-8 text-center leading-relaxed">
                    Specialized testing to support environmental permits, remediation projects, and hazardous material management
                  </p>
                  <ul className="space-y-4 w-full flex flex-col items-center">
                    {[
                      "Phase 1 and Phase 2 Groundwater and well monitoring",
                      "Hazardous material screening",
                      "Soil contamination assessments",
                      "Air and water quality testing"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-700 max-w-md w-full group">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="font-medium group-hover:text-green-600 transition-colors">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </AnimatedSection>
          </div>
          
          <AnimatedSection direction="up" delay={0.5} className="flex justify-center mt-16">
            <Link to={createPageUrl("Contact")}>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-7 text-lg font-bold tracking-tight rounded-md shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1 active:scale-95 transition-all duration-300 group">
                Get Testing Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Testing That Matters */}
      <section className="py-20 px-6 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight"> 
              Testing That Matters
            </h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-8"></div>
            <div className="space-y-6 text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              <p>
                Managing necessary, mitigating, and anticipatory testing and sampling scheduling and compliance can be a headache especially when you've already got enough people to manage and a company to grow. However, proper testing ensures compliance and avoidance of costly mistakes down the line.
              </p>
              <p>
                Whether you're monitoring stormwater plans, verifying ongoing structural integrity, or checking the many other environmental and engineering conditions - we streamline the process. Our team handles everything from sample collection to lab coordination, so you can retain integrity while staying outcome-focused.
              </p>
              <p>
                Our teams are well versed in what to look for and how to keep your project on schedule and compliant with foresight backed by decades of extensive experience.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection direction="up">
            <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
              Stay On Time & In Compliance
            </h2>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed font-light">
              We have you covered - from stormwater compliance, engineered structural materials verification, or environmental analysis and assessments.
            </p>
            <Link to={createPageUrl("Consultation")}>
              <ShinyButton
                className="group inline-flex items-center justify-center gap-2 whitespace-nowrap text-blue-900 font-bold tracking-tight text-lg px-10 py-7 rounded-md shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1 active:scale-95 transition-all duration-300 bg-white"
                style={{
                  "--shiny-cta-bg": "#ffffff",
                  "--shiny-cta-bg-subtle": "rgba(191, 219, 254, 0.5)",
                  "--shiny-cta-fg": "#0f172a",
                  "--shiny-cta-highlight": "#2563eb",
                  "--shiny-cta-highlight-subtle": "#93c5fd",
                  "--shiny-cta-shadow": "rgba(59, 130, 246, 0.35)",
                  "--shiny-cta-glow": "rgba(59, 130, 246, 0.45)",
                }}
              >
                Begin Inspections Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </ShinyButton>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
