// SEO Head component disabled for static export
// App Router uses Metadata API instead of Head component
// This will be re-implemented using the generateMetadata function

export default function SEOHead() {
  // Component is disabled for static export
  return null;
}

// Export for type compatibility
export interface SEOHeadProps {
  config: any;
}
