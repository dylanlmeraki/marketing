import React from "react";
import { Helmet } from "react-helmet";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "@/components/AnimatedSection";
import SocialShare from "@/components/SocialShare";
import ReactMarkdown from "react-markdown";

export default function BlogPost() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get("slug");

  const { data: post, isLoading } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: async () => {
      const posts = await base44.entities.BlogPost.filter({ slug, published: true });
      return posts[0] || null;
    },
    enabled: !!slug,
  });

  if (!slug) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Post not found</h1>
          <Link to={createPageUrl("Blog")}>
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-slate-600">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Post not found</h1>
          <Link to={createPageUrl("Blog")}>
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const publishedDate = post.published_date ? new Date(post.published_date).toISOString() : new Date().toISOString();
  const currentUrl = window.location.href;
  const siteUrl = window.location.origin;

  // JSON-LD Schema for Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.seo_optimized_title || post.title,
    "description": post.meta_description || post.excerpt,
    "image": post.featured_image || `${siteUrl}/default-blog-image.jpg`,
    "author": {
      "@type": "Organization",
      "name": post.author || "Pacific Engineering Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Pacific Engineering & Construction Inc.",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "datePublished": publishedDate,
    "dateModified": post.updated_date || publishedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    },
    "keywords": post.keywords?.join(", ") || post.tags?.join(", ") || ""
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>{post.seo_optimized_title || post.title} | Pacific Engineering Blog</title>
        <meta name="description" content={post.meta_description || post.excerpt} />
        <meta name="keywords" content={post.keywords?.join(", ") || post.tags?.join(", ") || ""} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={post.seo_optimized_title || post.title} />
        <meta property="og:description" content={post.meta_description || post.excerpt} />
        <meta property="og:image" content={post.featured_image || `${siteUrl}/default-blog-image.jpg`} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={currentUrl} />
        <meta property="twitter:title" content={post.seo_optimized_title || post.title} />
        <meta property="twitter:description" content={post.meta_description || post.excerpt} />
        <meta property="twitter:image" content={post.featured_image || `${siteUrl}/default-blog-image.jpg`} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={currentUrl} />
        
        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      {/* Back to Blog */}
      <section className="py-6 px-6 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <Link to={createPageUrl("Blog")}>
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </section>

      {/* Hero / Featured Image */}
      {post.featured_image && (
        <section className="relative h-96 bg-slate-900">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        </section>
      )}

      {/* Article Content */}
      <article className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection direction="up">
            {/* Category Badge */}
            <Badge className="mb-6 bg-blue-600 text-white hover:bg-blue-700 text-sm">
              {post.category}
            </Badge>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-slate-600 mb-8 pb-8 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">{post.author || "Pacific Engineering Team"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  {post.published_date ? new Date(post.published_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'Recently'}
                </span>
              </div>
              {post.read_time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{post.read_time}</span>
                </div>
              )}
            </div>

            {/* Social Share */}
            <SocialShare 
              url={currentUrl}
              title={post.title}
              description={post.excerpt}
            />

            {/* Excerpt */}
            {post.excerpt && (
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-12 rounded-r-md">
                <p className="text-lg text-slate-700 leading-relaxed italic">
                  {post.excerpt}
                </p>
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg prose-slate max-w-none mb-12">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-slate-900 mt-12 mb-6" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-5" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4" {...props} />,
                  p: ({ node, ...props }) => <p className="text-lg text-slate-700 leading-relaxed mb-6" {...props} />,
                  ul: ({ node, ...props }) => <ul className="space-y-3 mb-6 ml-6" {...props} />,
                  ol: ({ node, ...props }) => <ol className="space-y-3 mb-6 ml-6" {...props} />,
                  li: ({ node, ...props }) => <li className="text-lg text-slate-700 leading-relaxed" {...props} />,
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-blue-600 bg-slate-50 pl-6 py-4 my-8 italic text-slate-700" {...props} />
                  ),
                  code: ({ node, inline, ...props }) => inline 
                    ? <code className="bg-slate-100 text-slate-800 px-2 py-1 rounded text-sm font-mono" {...props} />
                    : <code className="block bg-slate-900 text-slate-100 p-6 rounded-md overflow-x-auto font-mono text-sm my-6" {...props} />,
                  a: ({ node, ...props }) => <a className="text-blue-600 hover:text-blue-800 underline font-medium" {...props} />,
                  img: ({ node, ...props }) => (
                    <img className="rounded-md shadow-lg my-8 w-full" {...props} />
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 pt-8 border-t border-slate-200">
                <Tag className="w-4 h-4 text-slate-600" />
                {post.tags.map((tag, idx) => (
                  <Badge key={idx} variant="outline" className="text-slate-600 border-slate-300">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Share Again at Bottom */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <p className="text-sm text-slate-600 mb-4 font-medium">Share this article:</p>
              <SocialShare 
                url={currentUrl}
                title={post.title}
                description={post.excerpt}
              />
            </div>
          </AnimatedSection>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection direction="up">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Expert Guidance?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Let's discuss how we can help with your project
            </p>
            <Link to={createPageUrl("Contact")}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                Get in Touch
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}