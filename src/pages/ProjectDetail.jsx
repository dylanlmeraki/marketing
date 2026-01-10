import React from "react";
import { Link, useParams } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, ArrowRight, MapPin, Calendar, Building2, Award, CheckCircle, Mail, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import AnimatedSection from "@/components/AnimatedSection";
import { useState, useRef, useEffect } from "react";
import { apiClient } from "@/components/utils/apiClient";
import SEO from "@/components/SEO";
import { getProjectBySlug } from "@/components/data/projectsData";
import useEmblaCarousel from 'embla-carousel-react';

export default function ProjectDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get("slug");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const project = getProjectBySlug(slug);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Project Not Found</h1>
          <Link to={createPageUrl("ProjectGallery")}>
            <Button>Back to Gallery</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const emailBody = `New Project Inquiry from ${formData.name}

PROJECT: ${project.title}

CONTACT INFORMATION:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Company: ${formData.company || 'Not provided'}

MESSAGE:
${formData.message}`;

      await apiClient.integrations.Core.SendEmail({
        to: "dylanllouis@gmail.com",
        subject: `Project Inquiry: ${project.title}`,
        body: emailBody
      });

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    } catch (error) {
      console.error("Error sending inquiry:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title={`${project.title} - Project Portfolio | Pacific Engineering`}
        description={project.description.substring(0, 160)}
        keywords={`${project.category}, ${project.services.join(', ')}, ${project.location}, engineering project`}
        image={project.images[0]}
        type="article"
        url={`/project-detail?slug=${project.slug}`}
      />
      
      {/* Back Navigation */}
      <section className="py-6 px-6 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <Link to={createPageUrl("ProjectGallery")}>
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Gallery
            </Button>
          </Link>
        </div>
      </section>

      {/* Image Carousel */}
      <section className="bg-slate-900 relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {project.images.map((img, idx) => (
              <div key={idx} className="flex-[0_0_100%] min-w-0">
                <div className="relative h-96 md:h-[600px]">
                  <img
                    src={img}
                    alt={`${project.title} - Image ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {project.images.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 z-10"
            >
              <ChevronLeft className="w-6 h-6 text-slate-900" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 z-10"
            >
              <ChevronRight className="w-6 h-6 text-slate-900" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {project.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === selectedIndex ? 'bg-white w-8' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Project Details with Static Sidebar */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatedSection direction="up">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="bg-slate-900 text-white px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider">
                    {project.date}
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                  {project.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-slate-500 mb-8 pb-8 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="text-lg font-medium">{project.location}</span>
                  </div>
                  {project.budget && (
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-green-600" />
                      <span className="text-lg font-medium">Budget: {project.budget}</span>
                    </div>
                  )}
                </div>
                
                <div id="overview" className="mb-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-wide">Project Overview</h2>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                <div id="scope" className="mb-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-wide">Scope of Work</h2>
                  <div className="bg-slate-50 border-l-4 border-blue-600 p-6 rounded-r-md">
                    <p className="text-slate-700 leading-relaxed">
                      {project.scope}
                    </p>
                  </div>
                </div>

                <div id="client" className="mb-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-wide">Client Information</h2>
                  <Card className="p-6 border border-slate-200 bg-white rounded-md shadow-sm">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Client</div>
                          <div className="text-slate-900 font-medium">{project.client}</div>
                        </div>
                      </div>
                      {project.contact && (
                        <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                          <Mail className="w-5 h-5 text-slate-400" />
                          <div>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</div>
                            <div className="text-slate-900 font-medium">{project.contact}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              </AnimatedSection>
            </div>
            
            {/* Static Sidebar */}
            <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
              <AnimatedSection direction="right" delay={0.2}>
                {/* Quick Navigation */}
                <Card className="p-6 border border-slate-200 bg-slate-50 rounded-md shadow-md">
                  <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Quick Navigation</h3>
                  <div className="space-y-2">
                    <a
                      href="#overview"
                      className="block px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors text-sm font-medium text-slate-700"
                    >
                      Project Overview
                    </a>
                    <a
                      href="#scope"
                      className="block px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors text-sm font-medium text-slate-700"
                    >
                      Scope of Work
                    </a>
                    <a
                      href="#services"
                      className="block px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors text-sm font-medium text-slate-700"
                    >
                      Services Provided
                    </a>
                    <a
                      href="#client"
                      className="block px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors text-sm font-medium text-slate-700"
                    >
                      Client Info
                    </a>
                  </div>
                </Card>
                
                {/* Services */}
                <Card id="services" className="p-6 border border-slate-200 bg-white rounded-md shadow-md scroll-mt-24">
                  <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Services Provided</h3>
                  <div className="space-y-2">
                    {project.services.map((service, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 bg-slate-50 px-3 py-2 rounded-md border-l-2 border-blue-600"
                      >
                        <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span className="text-sm font-medium text-slate-700">{service}</span>
                      </div>
                    ))}
                  </div>
                </Card>
                
                {/* Agencies */}
                {project.agencies && project.agencies.length > 0 && (
                  <Card className="p-6 border border-slate-200 bg-white rounded-md shadow-md">
                    <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Agency Participation</h3>
                    <div className="space-y-3">
                      {project.agencies.map((agency, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                          <span className="font-medium">{agency}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
                
                {/* Contact Form */}
                <Card className="p-6 border-2 border-blue-600 bg-blue-50 rounded-md shadow-lg">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 uppercase tracking-wide">Interested in a Similar Project?</h3>
                  
                  {submitted ? (
                    <div className="text-center py-6">
                      <div className="w-16 h-16 bg-green-100 rounded-md flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <p className="text-slate-700 font-medium mb-2">Thank you for your inquiry!</p>
                      <p className="text-sm text-slate-600">We'll get back to you within 24 hours.</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSubmitted(false)}
                        className="mt-4"
                      >
                        Send Another Inquiry
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-slate-700 font-bold text-xs uppercase tracking-wider">Name *</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="mt-1 border-slate-300 bg-white"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="text-slate-700 font-bold text-xs uppercase tracking-wider">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="mt-1 border-slate-300 bg-white"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone" className="text-slate-700 font-bold text-xs uppercase tracking-wider">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="mt-1 border-slate-300 bg-white"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="company" className="text-slate-700 font-bold text-xs uppercase tracking-wider">Company</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="mt-1 border-slate-300 bg-white"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="message" className="text-slate-700 font-bold text-xs uppercase tracking-wider">Message *</Label>
                        <Textarea
                          id="message"
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="mt-1 border-slate-300 bg-white min-h-[120px]"
                          placeholder="Tell us about your project..."
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold tracking-tight rounded-md h-12"
                      >
                        {isSubmitting ? "Sending..." : "Send Inquiry"}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </form>
                  )}
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection direction="up">
            <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed font-light">
              Let's discuss how we can bring the same level of excellence to your construction project.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Contact")}>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 px-10 py-7 text-lg font-bold tracking-tight rounded-md">
                  Get in Touch
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to={createPageUrl("ProjectGallery")}>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-10 py-7 text-lg font-bold tracking-tight rounded-md">
                  View More Projects
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}