import Script from "next/script";
import "./globals.css";

import Navbar from "./components/layout/Navbar";

export const metadata = {
  metadataBase: new URL("https://stackratechnologies.com"),

  title: {
    default:
      "STACKRA TECHNOLOGIES | Software Development & AI Company in India",
    template: "%s | STACKRA TECHNOLOGIES",
  },

  description:
    "STACKRA TECHNOLOGIES builds modern websites, SaaS platforms, AI solutions, and custom software for businesses and organizations.",

  keywords: [
    "STACKRA TECHNOLOGIES",
    "Software Development Company",
    "AI Development Company",
    "Web Development Company",
    "Custom Software Development",
    "Artificial Intelligence Solutions",
    "SaaS Development",
    "Next.js Development",
    "React Development",
    "Full Stack Development",
    "Software Company in India",
    "AI Company in India",
    "Software Development Hyderabad",
    "AI Development Hyderabad",
  ],

  authors: [
    {
      name: "Mohammed Khan",
      url: "https://stackratechnologies.com",
    },
  ],

  creator: "Mohammed Khan",
  publisher: "STACKRA TECHNOLOGIES",

  category: "technology",

  applicationName: "STACKRA TECHNOLOGIES",

  alternates: {
    canonical: "https://stackratechnologies.com",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",

    url: "https://stackratechnologies.com",

    title:
      "STACKRA TECHNOLOGIES | Software & AI Development Company",

    description:
      "Modern software development, AI solutions, SaaS platforms, and scalable digital products.",

    siteName: "STACKRA TECHNOLOGIES",

    images: [
      {
        url: "/logo/logo6.png",
        width: 1200,
        height: 630,
        alt: "STACKRA TECHNOLOGIES - Software & AI Company",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "STACKRA TECHNOLOGIES",

    description:
      "Software Development, AI Solutions and Digital Products.",

    images: ["/logo/logo6.png"],

    creator: "@stackra_technologies",
  },

  icons: {
    icon: "/favicon.ico",

    shortcut: "/favicon-16x16.png",

    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  width: "device-width",

  initialScale: 1,

  maximumScale: 5,

  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#4f46e5",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#6366f1",
    },
  ],
};

export default function RootLayout({ children }) {
  const organizationSchema = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "Organization",

        name: "STACKRA TECHNOLOGIES",

        url: "https://stackratechnologies.com",

        logo: "https://stackratechnologies.com/logo/logo6.png",

        founder: {
          "@type": "Person",
          name: "Mohammed Khan",
        },

        sameAs: [
          "https://www.instagram.com/stackra_technologies",
          "https://www.linkedin.com/company/stackra-technologies",
          "https://github.com/MohammedKhan-star",
          "https://www.facebook.com/stackratechnologies",
          "https://twitter.com/stackra_technologies",
          "https://www.youtube.com/@stackratechnologies",
        ],

        contactPoint: {
          "@type": "ContactPoint",

          contactType: "customer support",

          availableLanguage: ["English", "Hindi"],

          email: "stackratechnologies@gmail.com",
        },

        areaServed: "IN",

        serviceType:
          "Software Development, Artificial Intelligence Solutions, Web Development",
      },

      {
        "@type": "WebSite",

        name: "STACKRA TECHNOLOGIES",

        url: "https://stackratechnologies.com",
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="bg-slate-50 text-slate-900 antialiased"
      >
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

   

        <main className="min-h-screen pt-0">
          {children}
        </main>
      </body>
    </html>
  );
}
