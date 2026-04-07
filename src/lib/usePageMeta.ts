import { useEffect } from "react";

interface PageMeta {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  twitterCard?: "summary" | "summary_large_image";
}

/**
 * Sets the document <title>, <meta name="description">, Open Graph, and Twitter Card tags for SEO.
 * Call once per page component.
 */
export function usePageMeta({
  title,
  description,
  canonical,
  ogImage = "https://countmein.site/og-image.png",
  ogType = "website",
  twitterCard = "summary_large_image",
}: PageMeta) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Set or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // Canonical URL
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement("link");
        linkCanonical.setAttribute("rel", "canonical");
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute("href", canonical);
    }

    // Open Graph tags
    const setMetaProperty = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    setMetaProperty("og:title", title);
    setMetaProperty("og:description", description);
    setMetaProperty("og:type", ogType);
    setMetaProperty("og:image", ogImage);
    setMetaProperty("og:url", canonical || window.location.href);

    // Twitter Card tags
    const setMetaName = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    setMetaName("twitter:card", twitterCard);
    setMetaName("twitter:title", title);
    setMetaName("twitter:description", description);
    setMetaName("twitter:image", ogImage);

    return () => {
      // Reset on unmount (optional, next page will override)
    };
  }, [title, description, canonical, ogImage, ogType, twitterCard]);
}

/**
 * Injects JSON-LD structured data into the page <head>.
 * Cleans up on unmount.
 */
export function useJsonLd(data: Record<string, unknown>) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);
}
