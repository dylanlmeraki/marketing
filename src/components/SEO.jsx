import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { apiClient } from "@/components/utils/apiClient";

export default function SEO({ 
  title, 
  description, 
  keywords,
  image,
  url,
  type = "website",
  contentForAI = null,
  useAI = false
}) {
  const [seoData, setSeoData] = useState({
    title: title || "Pacific Engineering & Construction Inc.",
    description: description || "Professional civil engineering, construction management, and SWPPP services in the San Francisco Bay Area.",
    keywords: keywords || "civil engineering, construction, SWPPP, Bay Area"
  });

  const siteName = "Pacific Engineering & Construction Inc.";
  const baseUrl = window.location.origin;
  const fullUrl = url ? `${baseUrl}${url}` : window.location.href;
  const ogImage = image || "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68eb69c51ce08e4c9fdca015/fbd78afc1_Asset2-100.jpg";

  useEffect(() => {
    const generateAISEO = async () => {
      if (!useAI || !contentForAI) return;

      try {
        const aiResponse = await apiClient.integrations.Core.InvokeLLM({
          prompt: `Analyze the following content and generate SEO metadata:

Content: ${contentForAI}

Generate:
1. A compelling SEO title (50-60 characters)
2. A meta description (150-160 characters)
3. 5-8 relevant keywords (comma-separated)

Focus on construction, engineering, SWPPP, compliance, and Bay Area services.

Return as JSON with keys: title, description, keywords`,
          response_json_schema: {
            type: "object",
            properties: {
              title: { type: "string" },
              description: { type: "string" },
              keywords: { type: "string" }
            }
          }
        });

        if (aiResponse) {
          setSeoData({
            title: aiResponse.title || seoData.title,
            description: aiResponse.description || seoData.description,
            keywords: aiResponse.keywords || seoData.keywords
          });
        }
      } catch (error) {
        console.error("Failed to generate AI SEO:", error);
      }
    };

    generateAISEO();
  }, [contentForAI, useAI]);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Pacific Engineering & Construction Inc." />
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
}