import { MetadataRoute } from "next";

export default function sitemap() {
  const baseUrl = "https://stackratechnologies.com";

  const courses = [
    "full-stack-web-development",
    "javascript-mastery",
    "react-js-development",
    "next-js-development",
    "ai-machine-learning",
    "mongodb-database-development",
    "node-js-backend-development",
    "cyber-security-fundamentals",
    "advanced-microsoft-excel",
    "ms-office",
    "typing-mastery",
    "python-programming",
  ];

  const staticPages = [
    "",
    "/academy",
    "/academy/courses",
    "/academy/login",
    "/academy/register",
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: path === "/academy" ? 1 : 0.8,
    })),

    ...courses.map((slug) => ({
      url: `${baseUrl}/academy/enroll/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    })),
  ];
}
