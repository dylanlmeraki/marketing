import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, AlertCircle, Info, Plus, X, ArrowRight, Loader2, Upload, FileText, Calendar as CalendarIcon } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import SmartFormInput from "../components/SmartFormInput";
import ServiceSuggester from "../components/ServiceSuggester";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import SEO from "@/components/SEO";

export default function Consultation() {
  const [addresses, setAddresses] = useState([
    { addressLine: "", zipCode: "", state: "CA", county: "", approximateSize: "" }
  ]);
  const [moreThanFive, setMoreThanFive] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [formData, setFormData] = useState({ 
    serviceInterest: "",
    name: "",
    email: "",
    phone: "",
    company: ""
  });
  const [preferredContactDate, setPreferredContactDate] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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

  const californiaCounties = [
    "Alameda", "Alpine", "Amador", "Butte", "Calaveras", "Colusa", "Contra Costa",
    "Del Norte", "El Dorado", "Fresno", "Glenn", "Humboldt", "Imperial", "Inyo",
    "Kern", "Kings", "Lake", "Lassen", "Los Angeles", "Madera", "Marin", "Mariposa",
    "Mendocino", "Merced", "Modoc", "Mono", "Monterey", "Napa", "Nevada", "Orange",
    "Placer", "Plumas", "Riverside", "Sacramento", "San Benito", "San Bernardino",
    "San Diego", "San Francisco", "San Joaquin", "San Luis Obispo", "San Mateo",
    "Santa Barbara", "Santa Clara", "Santa Cruz", "Shasta", "Sierra", "Siskiyou",
    "Solano", "Sonoma", "Stanislaus", "Sutter", "Tehama", "Trinity", "Tulare",
    "Tuolumne", "Ventura", "Yolo", "Yuba"
  ];

  const addAddress = () => {
    if (addresses.length < 5) {
      setAddresses([...addresses, { addressLine: "", zipCode: "", state: "CA", county: "", approximateSize: "" }]);
    }
  };

  const removeAddress = (index) => {
    const newAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(newAddresses);
  };

  const updateAddress = (index, field, value) => {
    const newAddresses = [...addresses];
    newAddresses[index][field] = value;
    setAddresses(newAddresses);
  };

  const wordCount = additionalDetails.trim().split(/\s+/).filter((word) => word.length > 0).length;

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name || !formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!formData.email || !formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    
    const hasValidAddress = addresses.some(addr => addr.addressLine && addr.county);
    if (!hasValidAddress) {
      errors.addresses = "Please provide at least one location with address and county";
    }
    
    if (!formData.serviceInterest) {
      errors.serviceInterest = "Please select a service interest";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    for (const file of files) {
      try {
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        setUploadedFiles(prev => [...prev, { name: file.name, url: file_url }]);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);

    try {
      const locationsText = addresses.map((addr, i) => {
        return `Project Location ${i + 1}:
  Address: ${addr.addressLine || 'Not provided'}
  Zip Code: ${addr.zipCode || 'Not provided'}
  State: ${addr.state || 'CA'}
  County: ${addr.county || 'Not provided'}
  Approximate Size: ${addr.approximateSize || 'Not provided'}`;
      }).join('\n\n');

      const filesSection = uploadedFiles.length > 0 
        ? `\n\nAttached Documents:\n${uploadedFiles.map(f => `- ${f.name}: ${f.url}`).join('\n')}`
        : '';

      const emailBody = `New Project Consultation Request from ${formData.name}

CONTACT INFORMATION:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Company: ${formData.company || 'Not provided'}

SERVICE INTEREST:
${formData.serviceInterest ? serviceOptions.find(opt => opt.value === formData.serviceInterest)?.label : 'Not provided'}

PREFERRED CONTACT DATE:
${preferredContactDate ? format(preferredContactDate, 'PPP') : 'Not specified'}

PROJECT LOCATIONS:
${locationsText}

More than 5 locations: ${moreThanFive || 'N/A'}

ADDITIONAL DETAILS:
${additionalDetails || 'No additional details provided'}${filesSection}`;

      // Build user confirmation email
      const userConfirmationEmail = `
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
    .button { display: inline-block; padding: 14px 28px; background: #0B67A6; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Consultation Request Received</h1>
    </div>
    <div class="content">
      <p><strong>Hello ${formData.name},</strong></p>
      <p>Thank you for reaching out to Pacific Engineering & Construction. We've received your consultation request for <strong>${serviceOptions.find(opt => opt.value === formData.serviceInterest)?.label}</strong>.</p>
      
      <div class="field">
        <div class="field-label">What Happens Next?</div>
        <p>Our team will review your project details and contact you within <strong>24-48 hours</strong> during business days to discuss your needs and next steps.</p>
      </div>

      ${preferredContactDate ? `
      <div class="field">
        <div class="field-label">Your Preferred Contact Date</div>
        <p>${format(preferredContactDate, 'PPP')}</p>
      </div>
      ` : ''}

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://pacificengineeringsf.com/ClientAuth" class="button">Access Your Client Portal</a>
      </div>

      <p>If you have urgent questions, call us at <strong>(415)-419-6079</strong>.</p>
      <p style="margin-top: 20px;">Best regards,<br><strong>Pacific Engineering Team</strong></p>
    </div>
  </div>
</body>
</html>`;

      // Call backend function (Future: replace with Node.js backend)
      await fetch('/functions/sendSWPPPFormEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, emailBody, userConfirmationEmail })
      });

      setSubmittedData({
        locations: addresses.filter(a => a.addressLine || a.county),
        service: serviceOptions.find(opt => opt.value === formData.serviceInterest)?.label,
        contactDate: preferredContactDate,
        filesCount: uploadedFiles.length,
      });

      setSubmitted(true);
      setAddresses([{ addressLine: "", zipCode: "", state: "CA", county: "", approximateSize: "" }]);
      setMoreThanFive("");
      setFormData({ 
        serviceInterest: "",
        name: "",
        email: "",
        phone: "",
        company: ""
      });
      setPreferredContactDate(null);
      setUploadedFiles([]);
      setAdditionalDetails("");
      setValidationErrors({});
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to submit form. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title="Free Project Consultation - SWPPP & Engineering Services | PECI"
        description="Request a free consultation for your construction, SWPPP, engineering, or inspection project. Expert analysis and tailored solutions from our PE-certified team."
        keywords="free consultation, SWPPP consultation, engineering consultation, project quote, construction consultation, project analysis"
        url="/consultation"
      />
      
      {/* Hero */}
      <section className="relative py-32 px-6 bg-slate-900 border-b-4 border-blue-600 overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1600')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
        </div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <AnimatedSection direction="up">
            <h1 className="text-white mb-6 text-5xl font-bold md:text-6xl tracking-tight">
              Free Project Consultation
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
              Tell us about your project and our team of Professional Engineers and construction experts will reach out to discuss your needs and provide tailored solutions.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          {/* Location Entry Form */}
          <AnimatedSection direction="up" delay={0.1}>
            <Card className="p-8 border border-slate-200 shadow-xl mb-8 bg-white rounded-md overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-500 -mx-8 -mt-8 mb-8" />
              <h2 className="text-slate-900 mb-8 text-3xl font-bold text-center tracking-tight">Project Details</h2>
              
              <div className="space-y-6">
                {/* Contact Information */}
                <Card className="p-6 bg-blue-50 border border-blue-200 rounded-md">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-wide">Your Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-slate-700 font-bold mb-2 block uppercase text-xs tracking-wider">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          setValidationErrors(prev => ({ ...prev, name: undefined }));
                        }}
                        placeholder="John Doe"
                        className={`h-12 rounded-md ${validationErrors.name ? 'border-red-500' : ''}`}
                        required
                      />
                      {validationErrors.name && (
                        <p className="text-red-600 text-xs mt-1 font-medium">{validationErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-slate-700 font-bold mb-2 block uppercase text-xs tracking-wider">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          setValidationErrors(prev => ({ ...prev, email: undefined }));
                        }}
                        placeholder="john@example.com"
                        className={`h-12 rounded-md ${validationErrors.email ? 'border-red-500' : ''}`}
                        required
                      />
                      {validationErrors.email && (
                        <p className="text-red-600 text-xs mt-1 font-medium">{validationErrors.email}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-slate-700 font-bold mb-2 block uppercase text-xs tracking-wider">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(415) 123-4567"
                        className="h-12 rounded-md"
                      />
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
                        className="h-12 rounded-md"
                      />
                    </div>
                  </div>
                </Card>

                {/* Service Selection */}
                <Card className="p-6 bg-cyan-50 border border-cyan-200 rounded-md">
                  <Label htmlFor="service-interest" className="text-slate-700 font-bold mb-3 block uppercase text-xs tracking-wider">
                    Service Interest *
                  </Label>
                  <Select
                    value={formData.serviceInterest}
                    onValueChange={(value) => {
                      setFormData({ ...formData, serviceInterest: value });
                      setValidationErrors(prev => ({ ...prev, serviceInterest: undefined }));
                    }}
                    required
                  >
                    <SelectTrigger id="service-interest" className={`h-12 bg-white rounded-md ${validationErrors.serviceInterest ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Select service you're interested in" />
                    </SelectTrigger>
                    <SelectContent className="rounded-md">
                      {serviceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {validationErrors.serviceInterest && (
                    <p className="text-red-600 text-xs mt-2 font-medium">{validationErrors.serviceInterest}</p>
                  )}
                </Card>

                {/* Address Entries */}
                {addresses.map((address, index) => (
                  <Card key={index} className="p-6 bg-white border border-slate-200 rounded-md shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide">
                        Project Location {index + 1}
                      </h3>
                      {index > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAddress(index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Remove
                        </Button>
                      )}
                    </div>

                    <div className="grid gap-4">
                      <div>
                        <Label htmlFor={`address-${index}`} className="text-slate-700 font-bold mb-2 block uppercase text-xs tracking-wider">
                          Address Line
                        </Label>
                        <SmartFormInput
                          id={`address-${index}`}
                          type="address"
                          value={address.addressLine}
                          onChange={(e) => updateAddress(index, 'addressLine', e.target.value)}
                          placeholder="123 Main Street"
                          className="h-12 rounded-md"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`zipcode-${index}`} className="text-slate-700 font-bold mb-2 block uppercase text-xs tracking-wider">
                            Zip Code
                          </Label>
                          <Input
                            id={`zipcode-${index}`}
                            value={address.zipCode}
                            onChange={(e) => updateAddress(index, 'zipCode', e.target.value)}
                            placeholder="94107"
                            maxLength={5}
                            className="h-12 rounded-md"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`state-${index}`} className="text-slate-700 font-bold mb-2 block uppercase text-xs tracking-wider">
                            State
                          </Label>
                          <Input
                            id={`state-${index}`}
                            value={address.state}
                            onChange={(e) => updateAddress(index, 'state', e.target.value)}
                            placeholder="CA"
                            className="h-12 rounded-md"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor={`county-${index}`} className="text-slate-700 font-bold mb-2 block uppercase text-xs tracking-wider">
                          County
                        </Label>
                        <Select
                          value={address.county}
                          onValueChange={(value) => updateAddress(index, 'county', value)}
                        >
                          <SelectTrigger id={`county-${index}`} className="h-12 bg-white rounded-md">
                            <SelectValue placeholder="Select a county..." />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px] rounded-md">
                            {californiaCounties.map((county) => (
                              <SelectItem key={county} value={county}>
                                {county}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor={`size-${index}`} className="text-slate-700 font-bold mb-2 block uppercase text-xs tracking-wider">
                          Approximate Size
                        </Label>
                        <Select
                          value={address.approximateSize}
                          onValueChange={(value) => updateAddress(index, 'approximateSize', value)}
                        >
                          <SelectTrigger id={`size-${index}`} className="h-12 bg-white rounded-md">
                            <SelectValue placeholder="Select size..." />
                          </SelectTrigger>
                          <SelectContent className="rounded-md">
                            <SelectItem value="1 acre or less">1 acre or less</SelectItem>
                            <SelectItem value="1-5 acres">1-5 acres</SelectItem>
                            <SelectItem value="5+ acres">5+ acres</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </Card>
                ))}

                {/* Add Location Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={addAddress}
                    disabled={addresses.length >= 5}
                    className={`rounded-md font-bold tracking-tight shadow-lg ${
                      addresses.length >= 5
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                    }`}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Another Location
                  </Button>
                </div>

                {/* More Than 5 Locations */}
                {addresses.length === 5 && (
                  <Card className="p-6 bg-amber-50 border border-amber-200 rounded-md shadow-lg">
                    <Label htmlFor="more-than-five" className="font-bold text-slate-900 mb-3 block text-lg uppercase tracking-wide">
                      More than 5 locations?
                    </Label>
                    <Select value={moreThanFive} onValueChange={setMoreThanFive}>
                      <SelectTrigger id="more-than-five" className="h-12 bg-white rounded-md">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent className="rounded-md">
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="yes">Yes</SelectItem>
                      </SelectContent>
                    </Select>

                    {moreThanFive === "yes" && (
                      <div className="mt-4 p-4 bg-white rounded-md border-2 border-amber-300">
                        <p className="text-slate-700 leading-relaxed">
                          We're delighted to help with any size project. Please provide details in the <strong>"Additional Details"</strong> field below.
                        </p>
                      </div>
                    )}
                  </Card>
                )}

                {/* Validation Error for Addresses */}
                {validationErrors.addresses && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <p className="text-red-700 text-sm font-medium">{validationErrors.addresses}</p>
                  </div>
                )}

                {/* Additional Details */}
                <Card className={`p-6 transition-all duration-300 rounded-md shadow-lg ${
                  moreThanFive === "yes"
                    ? 'bg-amber-50 border-amber-300 border-2'
                    : 'bg-white border-slate-200'
                }`}>
                  <Label htmlFor="additional-details" className="font-bold text-slate-900 mb-3 block text-lg uppercase tracking-wide">
                    Additional Project Details
                  </Label>
                  <Textarea
                    id="additional-details"
                    value={additionalDetails}
                    onChange={(e) => {
                      const words = e.target.value.trim().split(/\s+/).filter((word) => word.length > 0);
                      if (words.length <= 500) {
                        setAdditionalDetails(e.target.value);
                      }
                    }}
                    placeholder="Tell us about your project timeline, special requirements, specific challenges, or any questions you have..."
                    className="min-h-[200px] resize-none rounded-md"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-slate-500 font-medium">
                      {wordCount} / 500 words
                    </p>
                    {wordCount >= 500 && (
                      <p className="text-sm text-amber-600 font-medium">
                        Word limit reached
                      </p>
                    )}
                  </div>
                </Card>

                {/* AI Service Suggestions */}
                {additionalDetails && (
                  <ServiceSuggester 
                    description={additionalDetails}
                    onSuggestionsReady={setAiSuggestions}
                  />
                )}

                {/* File Upload */}
                <Card className="p-6 bg-white border border-slate-200 rounded-md shadow-lg">
                  <Label className="text-slate-700 font-bold mb-3 block uppercase text-xs tracking-wider">
                    Attach Project Documents (Optional)
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
                      <div className="w-12 h-12 bg-blue-600 rounded-md flex items-center justify-center shadow-sm">
                        <Upload className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-sm text-slate-600">
                        <span className="text-blue-600 font-bold hover:text-blue-800 uppercase tracking-wide text-xs">Click to upload</span> or drag and drop
                      </div>
                      <p className="text-xs text-slate-500 font-medium">
                        PDF, DOC, JPG, PNG, DWG up to 10MB each
                      </p>
                    </label>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-blue-50 p-3 rounded-md border border-blue-100"
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
                </Card>

                {/* Preferred Contact Date */}
                <Card className="p-6 bg-white border border-slate-200 rounded-md shadow-lg">
                  <Label className="text-slate-700 font-bold mb-3 block uppercase text-xs tracking-wider">
                    Preferred Contact Date (Optional)
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full h-12 justify-start text-left font-normal rounded-md border-slate-300"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {preferredContactDate ? format(preferredContactDate, 'PPP') : 'Select a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 rounded-md">
                      <Calendar
                        mode="single"
                        selected={preferredContactDate}
                        onSelect={setPreferredContactDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-sm text-slate-500 mt-2 font-medium">
                    Let us know when you'd like to be contacted
                  </p>
                </Card>

                {/* Submit Button */}
                {submitted ? (
                  <Card className="p-8 bg-green-50 border border-green-200 rounded-md shadow-xl">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-green-100 rounded-md flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-wide">
                        Submission Received!
                      </h3>
                      
                      {/* Submission Summary */}
                      <div className="bg-white rounded-md p-6 mb-6 text-left border border-green-200">
                        <h4 className="font-bold text-slate-900 mb-3 uppercase tracking-wide">Your Submission Summary:</h4>
                        <div className="space-y-2 text-sm text-slate-700">
                          {submittedData?.locations?.length > 0 && (
                            <p><strong>Locations:</strong> {submittedData.locations.length} project location(s)</p>
                          )}
                          {submittedData?.service && (
                            <p><strong>Service:</strong> {submittedData.service}</p>
                          )}
                          {submittedData?.contactDate && (
                            <p><strong>Preferred Contact:</strong> {format(submittedData.contactDate, 'PPP')}</p>
                          )}
                          {submittedData?.filesCount > 0 && (
                            <p><strong>Documents Attached:</strong> {submittedData.filesCount} file(s)</p>
                          )}
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                        <p className="text-blue-900 font-bold mb-1">⏱️ Estimated Response Time</p>
                        <p className="text-blue-700 text-sm">
                          Our team typically responds within <strong>24-48 hours</strong> during business days. For urgent matters, call (415)-419-6079.
                        </p>
                      </div>

                      <p className="text-slate-600 mb-6">
                        Thank you for your inquiry. A member of our team will review your submission and reach out to discuss your project needs.
                      </p>
                      <Button 
                        onClick={() => { setSubmitted(false); setSubmittedData(null); }} 
                        variant="outline"
                        className="border-slate-300 text-slate-700 hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 rounded-md uppercase tracking-wide font-bold"
                      >
                        Submit Another Inquiry
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <div className="flex justify-center pt-6">
                    <Button 
                      size="lg" 
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-7 text-lg font-bold tracking-tight rounded-md shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-1 active:scale-95 transition-all duration-300 group"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Submit Consultation Request
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </AnimatedSection>

          {/* Info Cards */}
          <AnimatedSection direction="up" delay={0.2}>
            <Card className="p-8 mb-8 bg-blue-50 border border-blue-200 rounded-md shadow-lg">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600 rounded-md flex items-center justify-center shadow-md">
                      <Info className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-wide">About Service Requirements</h3>
                    {isInfoExpanded && (
                      <p className="text-slate-700 leading-relaxed mt-4">
                        Different services have different requirements. Our team will assess your specific project needs and recommend the appropriate engineering and construction services. Fill out the form as completely as possible so our licensed professionals can best assist you.
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setIsInfoExpanded(!isInfoExpanded)}
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  {isInfoExpanded ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </button>
              </div>
            </Card>
          </AnimatedSection>

          {/* General Information */}
          <AnimatedSection direction="up" delay={0.3}>
            <Card className="p-8 bg-white border border-slate-200 rounded-md shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center uppercase tracking-wide">Regulatory Requirements</h3>
              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p>
                  <strong className="text-slate-900">Federal Requirements:</strong> Under the Clean Water Act's National Pollutant Discharge Elimination System (NPDES) program, a SWPPP is required for construction activities that disturb one acre or more of land surface, or are part of a larger common plan of development.
                </p>
                <p>
                  <strong className="text-slate-900">California Requirements:</strong> The California State Water Resources Control Board requires coverage under the Construction General Permit for qualifying projects throughout the state, including the San Francisco Bay Area.
                </p>
                <p>
                  <strong className="text-slate-900">Local Requirements:</strong> Many California municipalities have additional local requirements that may apply to smaller projects or have specific provisions. Our locally trained professionals will guide you through all applicable regulations.
                </p>
              </div>
            </Card>
          </AnimatedSection>

          {/* CTA Card */}
          <AnimatedSection direction="up" delay={0.4}>
            <Card className="p-8 bg-slate-900 border-0 text-white rounded-md mt-8 shadow-xl">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-3 uppercase tracking-wide">We've Got You Covered</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Our dedicated teams with decades of combined expertise in environmental and structural engineering will help you navigate compliance efficiently.
                </p>
                <a href="tel:+14154196079">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-md font-bold tracking-tight h-14 px-10 shadow-lg hover:shadow-xl hover:shadow-blue-500/50 active:scale-95 transition-all duration-300 group">
                    Call for Immediate Assistance: (415)-419-6079
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </a>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}