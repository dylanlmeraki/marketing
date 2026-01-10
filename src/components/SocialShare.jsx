import React from "react";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Mail, Link2, MessageCircle } from "lucide-react";

export default function SocialShare({ url, title, description }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || "");

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
  };

  const handleShare = (platform) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
    alert("Link copied to clipboard!");
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mb-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('facebook')}
        className="gap-2 hover:bg-blue-50 hover:border-blue-300"
      >
        <Facebook className="w-4 h-4 text-blue-600" />
        <span className="hidden sm:inline">Facebook</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('twitter')}
        className="gap-2 hover:bg-sky-50 hover:border-sky-300"
      >
        <Twitter className="w-4 h-4 text-sky-600" />
        <span className="hidden sm:inline">Twitter</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('linkedin')}
        className="gap-2 hover:bg-blue-50 hover:border-blue-700"
      >
        <Linkedin className="w-4 h-4 text-blue-700" />
        <span className="hidden sm:inline">LinkedIn</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('whatsapp')}
        className="gap-2 hover:bg-green-50 hover:border-green-500"
      >
        <MessageCircle className="w-4 h-4 text-green-600" />
        <span className="hidden sm:inline">WhatsApp</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('email')}
        className="gap-2 hover:bg-slate-50 hover:border-slate-400"
      >
        <Mail className="w-4 h-4 text-slate-600" />
        <span className="hidden sm:inline">Email</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={copyToClipboard}
        className="gap-2 hover:bg-slate-50 hover:border-slate-400"
      >
        <Link2 className="w-4 h-4 text-slate-600" />
        <span className="hidden sm:inline">Copy Link</span>
      </Button>
    </div>
  );
}