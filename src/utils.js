export function createPageUrl(pageName) {
  // Convert page name to lowercase for routing
  const routePath = pageName.toLowerCase();
  
  // Return just the path for React Router navigation
  return `/${routePath}`;
} 