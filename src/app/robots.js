export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/academy/login",
        "/academy/register",
        "/dashboard/",
      ],
    },

    sitemap: "https://stackratechnologies.com/sitemap.xml",
  };
}
