import React, { useState } from "react";
import { apiClient } from "@/components/utils/apiClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Send, CheckCircle, Upload, FileText, X } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SmartFormInput from "../components/SmartFormInput";
import ServiceSuggester from "../components/ServiceSuggester";
import SEO from "@/components/SEO";
import AnimatedGridBackground from "@/components/AnimatedGridBackground";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceInterest: "",
    projectType: "",
    message: ""
  });

  // Pre-fill service from URL if present
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("service");
    if (serviceParam) {
      // Find the closest matching option
      const match = serviceOptions.find(opt => 
        opt.label.toLowerCase().includes(serviceParam.toLowerCase()) || 
        opt.value.toLowerCase() === serviceParam.toLowerCase()
      );
      
      if (match) {
        setFormData(prev => ({ ...prev, serviceInterest: match.value }));
      } else {
        // Fallback to "other" if no match, or just set it if the select allows custom values (it doesn't usually)
        // Try to find a partial match or default to 'other'
        setFormData(prev => ({ ...prev, serviceInterest: "other", message: `Inquired about: ${serviceParam}\n\n` + prev.message }));
      }
    }
  }, []);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [aiSuggestions, setAiSuggestions] = useState(null);

  const serviceOptions = [
    { value: "swppp-qsd", label: "SWPPP Development (QSD Services)" },
    { value: "swppp-qsp", label: "SWPPP Implementation (QSP Services)" },
    { value: "construction-class-a", label: "Construction - Class A (Infrastructure)" },
    { value: "construction-class-b", label: "Construction - Class B (Building)" },
    { value: "inspections-stormwater", label: "Stormwater Testing & Inspections" },
    { value: "inspections-materials", label: "Materials Testing & Sampling" },
    { value: "special-inspections", label: "Special Inspections (PE-Certified)" },
    { value: "structural-engineering", label: "Structural Engineering Consulting" },
    { value: "civil-engineering", label: "Civil Engineering Consulting" },
    { value: "multiple", label: "Multiple Services" },
    { value: "other", label: "Other / Not Sure" }
  ];

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    for (const file of files) {
      try {
        const { file_url } = await apiClient.integrations.Core.UploadFile({ file });
        setUploadedFiles(prev => [...prev, { name: file.name, url: file_url }]);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Real-time field validation
  const validateField = (name, value) => {
    const errors = {};
    
    switch(name) {
      case 'name':
        if (!value.trim()) errors.name = 'Name is required';
        else if (value.length < 2) errors.name = 'Name must be at least 2 characters';
        break;
      case 'email':
        if (!value.trim()) errors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors.email = 'Invalid email format';
        break;
      case 'phone':
        if (value && !/^[\d\s\-\(\)]+$/.test(value)) errors.phone = 'Invalid phone number';
        break;
      case 'serviceInterest':
        if (!value) errors.serviceInterest = 'Please select a service';
        break;
      case 'message':
        if (!value.trim()) errors.message = 'Message is required';
        else if (value.length < 10) errors.message = 'Message must be at least 10 characters';
        break;
    }
    
    return errors;
  };

  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear validation error when user starts typing
    if (touchedFields[field]) {
      const fieldErrors = validateField(field, value);
      setValidationErrors(prev => ({ ...prev, ...fieldErrors, [field]: fieldErrors[field] }));
    }
  };

  const handleFieldBlur = (field) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
    const fieldErrors = validateField(field, formData[field]);
    setValidationErrors(prev => ({ ...prev, ...fieldErrors }));
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach(field => {
      const fieldErrors = validateField(field, formData[field]);
      Object.assign(errors, fieldErrors);
    });
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }
    
    setIsSubmitting(true);

    try {
      const filesSection = uploadedFiles.length > 0 
        ? `\n\nAttached Files:\n${uploadedFiles.map(f => `- ${f.name}: ${f.url}`).join('\n')}`
        : '';

      const emailBody = `New Contact Form Submission from ${formData.name}

CONTACT INFORMATION:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Company: ${formData.company || 'Not provided'}

PROJECT DETAILS:
Service Interest: ${formData.serviceInterest}
Project Type: ${formData.projectType || 'Not provided'}

MESSAGE:
${formData.message}${filesSection}`;

      // Format HTML email
      const htmlEmail = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #0B67A6 0%, #0EA5A4 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
    .field { background: white; margin: 15px 0; padding: 15px; border-radius: 8px; border-left: 4px solid #0B67A6; }
    .field-label { font-weight: bold; color: #0B67A6; margin-bottom: 5px; }
    .field-value { color: #333; }
    .files { background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 15px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📧 New Contact Form Submission</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="field-label">Name</div>
        <div class="field-value">${formData.name}</div>
      </div>
      <div class="field">
        <div class="field-label">Email</div>
        <div class="field-value"><a href="mailto:${formData.email}">${formData.email}</a></div>
      </div>
      <div class="field">
        <div class="field-label">Phone</div>
        <div class="field-value">${formData.phone || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Company</div>
        <div class="field-value">${formData.company || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Service Interest</div>
        <div class="field-value">${formData.serviceInterest}</div>
      </div>
      <div class="field">
        <div class="field-label">Project Type</div>
        <div class="field-value">${formData.projectType || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="field-label">Message</div>
        <div class="field-value">${formData.message}</div>
      </div>
      ${uploadedFiles.length > 0 ? `
      <div class="files">
        <strong>📎 Attached Files:</strong><br>
        ${uploadedFiles.map(f => `<a href="${f.url}">${f.name}</a>`).join('<br>')}
      </div>
      ` : ''}
    </div>
  </div>
</body>
</html>`;

      // Build user confirmation email
      const userConfirmationEmail = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #0B67A6 0%, #0EA5A4 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
    .header h1 { margin: 0; font-size: 32px; }
    .content { background: #ffffff; padding: 40px; border: 1px solid #e5e7eb; }
    .button { display: inline-block; padding: 14px 28px; background: #0B67A6; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
    .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ We've Received Your Message!</h1>
    </div>
    <div class="content">
      <p style="font-size: 18px; color: #0B67A6;"><strong>Hello ${formData.name},</strong></p>
      <p>Thank you for contacting Pacific Engineering & Construction. We've successfully received your inquiry regarding <strong>${formData.serviceInterest}</strong>.</p>
      <p>Our team will review your message and respond within <strong>24 hours</strong> during business days.</p>
      
      <div style="background: #f0f9ff; padding: 20px; border-left: 4px solid #0B67A6; margin: 20px 0;">
        <p style="margin: 0;"><strong>📋 Your Submission Summary:</strong></p>
        <ul style="margin-top: 10px;">
          <li><strong>Service:</strong> ${formData.serviceInterest}</li>
          ${formData.projectType ? `<li><strong>Project Type:</strong> ${formData.projectType}</li>` : ''}
          ${formData.phone ? `<li><strong>Contact Phone:</strong> ${formData.phone}</li>` : ''}
        </ul>
      </div>

      <p>In the meantime, you can access your <strong>Client Portal</strong> to:</p>
      <ul>
        <li>Track your inquiry status</li>
        <li>Upload additional documents</li>
        <li>View project proposals</li>
        <li>Communicate directly with our team</li>
      </ul>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://pacificengineeringsf.com/ClientAuth" class="button">Access Your Client Portal</a>
      </div>

      <p style="margin-top: 30px;">If you have any urgent questions, please call us at <strong>(415)-689-4428</strong>.</p>
      
      <p style="margin-top: 20px;">Best regards,<br><strong>Pacific Engineering Team</strong></p>
    </div>
    <div class="footer">
      <p>Pacific Engineering & Construction Inc.<br>470 3rd St., San Francisco, CA 94107<br>(415)-689-4428 | amwaldman@sbcglobal.net</p>
    </div>
  </div>
</body>
</html>`;

        await apiClient.functions.sendContactFormEmail({ formData, uploadedFiles, htmlEmail, userConfirmationEmail });

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        serviceInterest: "",
        projectType: "",
        message: ""
      });
      setUploadedFiles([]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title="Contact Pacific Engineering - Get Your Free Consultation"
        description="Contact Pacific Engineering for civil engineering, SWPPP, construction, and inspection services. Located in San Francisco. Call (415)-689-4428 or request a free consultation today."
        keywords="contact pacific engineering, engineering consultation, SWPPP quote, construction services inquiry, San Francisco engineers, free consultation"
        url="/contact"
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
            <h1 className="text-white mb-6 text-5xl font-bold md:text-6xl tracking-tight">Get in Touch</h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
              Ready to discuss your project needs? Our team of Professional Engineers and construction experts is here to help.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AnimatedSection direction="up" delay={0.1}>
              <Card className="p-8 border border-slate-200 shadow-xl bg-white rounded-md overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-500 -mx-8 -mt-8 mb-8" />
                <h2 className="text-slate-900 mb-8 text-3xl font-bold text-center tracking-tight">Send Us a Message</h2>
                
                {submitted ?
                <div className="text-center py-12">
                    <div className="w-20 h-20 bg-blue-100 rounded-md flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 uppercase tracking-wide">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-slate-600 mb-6">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                    <Button onClick={() => setSubmitted(false)} variant="outline" className="border-slate-300 text-slate-700 hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 rounded-md uppercase tracking-wide font-bold">
                      Send Another Message
                    </Button>
                  </div> :

                  <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name" className="text-slate-700 font-bold mb-2 block uppercase text-xs tracking-wider">
                            Full Name *
                          </Label>
                          <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => handleFieldChange('name', e.target.value)}
                          onBlur={() => handleFieldBlur('name')}
                          placeholder="John Smith"
                          className={`h-12 rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500 ${validationErrors.name && touchedFields.name ? 'border-red-500' : ''}`} />
                          {validationErrors.name && touchedFields.name && (
                            <p className="text-red-600 text-xs mt-1 font-medium">{validationErrors.name}</p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="email" className="text-slate-700 font-bold mb-2 block uppercase text-xs tracking-wider">
                            Email Address *
                          </Label>
                          <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleFieldChange('email', e.target.value)}
                          onBlur={() => handleFieldBlur('email')}
                          placeholder="john@company.com"
                          className={`h-12 rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500 ${validationErrors.email && touchedFields.email ? 'border-red-500' : ''}`} />
                          {validationErrors.email && touchedFields.email && (
                            <p className="text-red-600 text-xs mt-1 font-medium">{validationErrors.email}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="phone" className="text-slate-700 font-bold mb-2 block uppercase text-xs tracking-wider">
                            Phone Number
                          </Label>
                          <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleFieldChange('phone', e.target.value)}
                          onBlur={() => handleFieldBlur('phone')}
                          placeholder="(555) 123-4567"
                          className={`h-12 rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500 ${validationErrors.phone && touchedFields.phone ? 'border-red-500' : ''}`} />
                          {validationErrors.phone && touchedFields.phone && (
                            <p className="text-red-600 text-xs mt-1 font-medium">{validationErrors.phone}</p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="company" className="text-slate-700 font-bold mb-2 block uppercase text-xs tracking-wider">
                            Company Name
                          </Label>
                          <SmartFormInput
                          id="company"
                          type="company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="ABC Construction"
                          className="h-12 rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500" />

                        </div>
                      </div>

                      <div>
                        <Label htmlFor="serviceInterest" className="text-slate-700 font-bold mb-2 block uppercase text-xs tracking-wider">
                          Service Interest *
                        </Label>
                        <Select
                          value={formData.serviceInterest}
                          onValueChange={(value) => {
                            handleFieldChange('serviceInterest', value);
                            setTouchedFields(prev => ({ ...prev, serviceInterest: true }));
                          }}
                          required
                        >
                          <SelectTrigger className={`h-12 bg-white rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500 ${validationErrors.serviceInterest && touchedFields.serviceInterest ? 'border-red-500' : ''}`}>
                            <SelectValue placeholder="Select service you're interested in" />
                          </SelectTrigger>
                          <SelectContent className="rounded-md border-slate-200">
                            {serviceOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {validationErrors.serviceInterest && touchedFields.serviceInterest && (
                          <p className="text-red-600 text-xs mt-1 font-medium">{validationErrors.serviceInterest}</p>
                        )}
                      </div>

                      {/* Conditional field: show project type based on service */}
                      {formData.serviceInterest && formData.serviceInterest !== 'other' && (
                        <div>
                          <Label htmlFor="projectType" className="text-slate-700 font-bold mb-2 block uppercase text-xs tracking-wider">
                            Project Type
                          </Label>
                          <Select
                            value={formData.projectType}
                            onValueChange={(value) => handleFieldChange('projectType', value)}
                          >
                            <SelectTrigger className="h-12 bg-white rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                            <SelectContent className="rounded-md border-slate-200">
                              <SelectItem value="commercial">Commercial</SelectItem>
                              <SelectItem value="residential">Residential</SelectItem>
                              <SelectItem value="infrastructure">Infrastructure</SelectItem>
                              <SelectItem value="industrial">Industrial</SelectItem>
                              <SelectItem value="municipal">Municipal</SelectItem>
                              <SelectItem value="mixed-use">Mixed-Use</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div>
                        <Label htmlFor="message" className="text-slate-700 font-bold mb-2 block uppercase text-xs tracking-wider">
                          Message *
                        </Label>
                        <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => handleFieldChange('message', e.target.value)}
                        onBlur={() => handleFieldBlur('message')}
                        placeholder="Tell us about your project and how we can help..."
                        className={`min-h-[150px] rounded-md border-slate-300 focus:border-blue-500 focus:ring-blue-500 ${validationErrors.message && touchedFields.message ? 'border-red-500' : ''}`} />
                        {validationErrors.message && touchedFields.message && (
                          <p className="text-red-600 text-xs mt-1 font-medium">{validationErrors.message}</p>
                        )}
                        <p className="text-slate-500 text-xs mt-1 font-medium text-right">{formData.message.length} characters</p>
                      </div>

                      {/* AI Service Suggestions */}
                      {formData.message && (
                        <ServiceSuggester 
                          description={formData.message}
                          onSuggestionsReady={setAiSuggestions}
                        />
                      )}

                      {/* File Upload Section */}
                      <div>
                        <Label className="text-slate-700 font-bold mb-2 block uppercase text-xs tracking-wider">
                          Project Documents (Optional)
                        </Label>
                        <div className="border-2 border-dashed border-slate-300 rounded-md p-6 text-center hover:border-blue-500 transition-colors bg-slate-50">
                          <input
                            type="file"
                            id="file-upload"
                            multiple
                            onChange={handleFileUpload}
                            className="hidden"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.dwg"
                          />
                          <label
                            htmlFor="file-upload"
                            className="cursor-pointer flex flex-col items-center gap-2"
                          >
                            <div className="w-12 h-12 bg-white border border-slate-200 rounded-md flex items-center justify-center shadow-sm">
                              <Upload className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="text-sm text-slate-600">
                              <span className="text-blue-600 font-bold hover:text-blue-800 uppercase tracking-wide text-xs">Click to upload</span> or drag and drop
                            </div>
                            <p className="text-xs text-slate-500 font-medium">
                              PDF, DOC, JPG, PNG, DWG up to 10MB each
                            </p>
                          </label>
                        </div>

                        {/* Uploaded Files List */}
                        {uploadedFiles.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {uploadedFiles.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between bg-white p-3 rounded-md border border-slate-200 shadow-sm"
                              >
                                <div className="flex items-center gap-3">
                                  <FileText className="w-5 h-5 text-blue-600" />
                                  <span className="text-sm text-slate-700 font-medium truncate max-w-[200px]">
                                    {file.name}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFile(index)}
                                  className="text-slate-400 hover:text-red-600 transition-colors"
                                >
                                  <X className="w-5 h-5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white h-14 rounded-md font-bold tracking-tight shadow-md hover:shadow-xl hover:shadow-blue-500/50 active:scale-95 transition-all duration-300 group">

                        {isSubmitting ?
                      <>Sending...</> :

                      <>
                            <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                            Send Message
                          </>
                      }
                      </Button>
                    </form>
                  }
                </Card>
              </AnimatedSection>

              {/* Contact Information */}
              <div className="space-y-8">
                <AnimatedSection direction="up" delay={0.2}>
                  <div>
                    <h2 className="text-slate-900 mb-6 text-3xl font-bold text-center tracking-tight">Contact Information</h2>
                    <p className="text-slate-700 mb-8 text-lg text-center leading-relaxed">Questions about our engineering or construction services? Need immediate assistance? Our team is ready to help with your project needs.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <Card className="p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow bg-white rounded-md group">
                      <div className="flex items-start gap-4">
                        <div className="mt-1 flex-shrink-0">
                          <div className="w-12 h-12 bg-blue-600 rounded-md flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                            <Phone className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 mb-1 uppercase tracking-wide">Phone</h3>
                          <a href="tel:+14156894428" className="text-blue-600 hover:text-blue-800 text-lg font-bold">
                            (415)-689-4428
                          </a>
                          <p className="text-slate-500 text-sm mt-1 font-medium">Mon-Fri, 8am-5pm PST</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow bg-white rounded-md group">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="bg-slate-800 mt-1 rounded-md w-12 h-12 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                            <Mail className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 mb-1 uppercase tracking-wide">Email</h3>
                          <a href="mailto:amwaldman@sbcglobal.net" className="text-blue-600 hover:text-blue-800 text-lg font-bold break-all">
                            amwaldman@sbcglobal.net
                          </a>
                          <p className="text-slate-500 text-sm mt-1 font-medium">We respond within 24 hours</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow bg-white rounded-md group">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="bg-slate-700 mt-1 rounded-md w-12 h-12 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                            <MapPin className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 mb-1 uppercase tracking-wide">Office Location</h3>
                          <p className="text-slate-700 font-medium">
                            470 3rd St.<br />
                            San Francisco, CA 94107
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <Card className="p-8 bg-slate-900 border-l-4 border-blue-600 text-white rounded-md mt-8 shadow-xl">
                    <h3 className="mb-4 text-2xl font-bold text-center uppercase tracking-wide">24/7 Emergency Response</h3>
                    <p className="text-gray-300 mb-6 text-center leading-relaxed">For urgent compliance issues, structural emergencies, or storm-related events, we offer 24/7 emergency response services.
                    </p>
                    <a href="tel:+14156894428">
                      <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white w-full rounded-md font-bold tracking-tight h-14 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 active:scale-95 transition-all duration-300 group">
                        <Phone className="w-5 h-5 mr-2" />
                        Emergency Hotline: (415)-689-4428
                      </Button>
                    </a>
                  </Card>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>
      
    </div>
  );
}