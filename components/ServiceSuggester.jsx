import React, { useState, useEffect } from "react";
import { apiClient } from "@/components/utils/apiClient";
import { Card } from "@/components/ui/card";
import { Sparkles, Lightbulb, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ServiceSuggester({ description, onSuggestionsReady }) {
  const [suggestions, setSuggestions] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (description && description.length > 30) {
      const timer = setTimeout(() => {
        analyzeDescription(description);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [description]);

  const analyzeDescription = async (text) => {
    if (isAnalyzing) return;
    
    setIsAnalyzing(true);
    
    try {
      const prompt = `As an expert in construction and engineering services, analyze this project description and suggest relevant services:

"${text}"

Available services:
- SWPPP Services (stormwater planning, BMP design, regulatory compliance)
- Construction Services (licensed contractors, infrastructure, residential)
- Inspections & Testing (materials testing, code compliance, quality assurance)
- Special Inspections (structural materials, welding, seismic systems)
- Structural Engineering (design, analysis, seismic retrofits)

Provide:
1. Most relevant services (1-3) with confidence scores
2. Brief reasoning for each recommendation
3. Additional considerations or potential needs

Return as JSON with this structure:
{
  "primary_service": "service name",
  "confidence": 0.95,
  "recommended_services": ["service1", "service2"],
  "reasoning": "brief explanation",
  "additional_needs": ["potential need 1", "potential need 2"]
}`;

      const response = await apiClient.integrations.Core.InvokeLLM({
        prompt: prompt,
        response_json_schema: {
          type: "object",
          properties: {
            primary_service: { type: "string" },
            confidence: { type: "number" },
            recommended_services: {
              type: "array",
              items: { type: "string" }
            },
            reasoning: { type: "string" },
            additional_needs: {
              type: "array",
              items: { type: "string" }
            }
          }
        }
      });

      setSuggestions(response);
      if (onSuggestionsReady) onSuggestionsReady(response);
    } catch (error) {
      console.error("Service suggestion error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!description || description.length < 30) return null;

  if (isAnalyzing) {
    return (
      <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 animate-pulse">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-blue-600 animate-spin" />
          <span className="text-sm text-gray-700 font-medium">Analyzing your project needs...</span>
        </div>
      </Card>
    );
  }

  if (!suggestions) return null;

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">AI Service Recommendations</h3>
          <p className="text-sm text-gray-600">Based on your project description</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Primary Recommendation */}
        <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">Primary Recommendation</h4>
            <Badge className="bg-blue-600 text-white">
              {Math.round(suggestions.confidence * 100)}% match
            </Badge>
          </div>
          <p className="text-lg font-medium text-blue-600 mb-2">{suggestions.primary_service}</p>
          <p className="text-sm text-gray-600">{suggestions.reasoning}</p>
        </div>

        {/* Additional Services */}
        {suggestions.recommended_services && suggestions.recommended_services.length > 0 && (
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <h4 className="font-semibold text-gray-900">Also Consider</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.recommended_services.map((service, idx) => (
                <Badge key={idx} variant="outline" className="border-purple-300 text-purple-700">
                  {service}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Additional Needs */}
        {suggestions.additional_needs && suggestions.additional_needs.length > 0 && (
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Potential Additional Needs</h4>
            <ul className="space-y-1">
              {suggestions.additional_needs.map((need, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{need}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-4 p-3 bg-blue-100 rounded-lg">
        <p className="text-xs text-blue-800">
          💡 These are AI-powered suggestions based on your description. Our team will provide a detailed assessment during consultation.
        </p>
      </div>
    </Card>
  );
}