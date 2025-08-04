// API routes are not supported in static export
// This file is disabled for Netlify deployment
// Authentication will be handled client-side

export function GET() {
  return new Response('API routes not available in static export', { status: 501 });
}
