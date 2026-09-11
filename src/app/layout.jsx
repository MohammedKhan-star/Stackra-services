import Script from "next/script";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://stackratechnologies.com"),

  title: {
    default:
      "STACKRA TECHNOLOGIES | Software Development & AI Company in India",
    template: "%s | STACKRA TECHNOLOGIES",
  },

  description:
    "STACKRA TECHNOLOGIES is a software and AI development company in India providing web development, SaaS platforms, artificial intelligence solutions, custom software, and digital products.",

  keywords: [
    "STACKRA TECHNOLOGIES",
    "Stackra Technologies Hyderabad",
    "software company in Hyderabad",
    "software development company Hyderabad",
    "AI company Hyderabad",
    "AI development company Hyderabad",
    "web development company Hyderabad",
    "custom software development Hyderabad",
    "SaaS development company India",
    "software development company India",
    "AI solutions India",
    "web development India",
    "Next.js development",
    "React development",
    "full stack development",
    "custom software development",
    "artificial intelligence solutions",
  ],

  authors: [
    {
      name: "Mohammed Khan",
      url: "https://stackratechnologies.com",
    },
  ],

  creator: "Mohammed Khan",
  publisher: "STACKRA TECHNOLOGIES",

  applicationName: "STACKRA TECHNOLOGIES",

  category: "technology",

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

    locale: "en_IN",

    url: "https://stackratechnologies.com",

    siteName: "STACKRA TECHNOLOGIES",

    title:
      "STACKRA TECHNOLOGIES | Software Development & AI Company in India",

    description:
      "Software development, AI solutions, SaaS platforms, web development, and custom digital products by STACKRA TECHNOLOGIES.",

    images: [
      {
        url: "/logo/logo6.png",
        width: 1200,
        height: 630,
        alt: "STACKRA TECHNOLOGIES - Software Development & AI Company",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "STACKRA TECHNOLOGIES | Software Development & AI Company",

    description:
      "Software development, AI solutions, SaaS platforms, and custom digital products.",

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

        "@id": "https://stackratechnologies.com/#organization",

        name: "STACKRA TECHNOLOGIES",

        url: "https://stackratechnologies.com",

        logo: {
          "@type": "ImageObject",
          url: "https://stackratechnologies.com/logo/logo6.png",
        },

        founder: {
          "@type": "Person",
          name: "Mohammed Khan",
        },

        description:
          "STACKRA TECHNOLOGIES is a software and AI development company providing web development, SaaS, artificial intelligence solutions, and custom software.",

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

          email: "stackratechnologies@gmail.com",

          availableLanguage: [
            "English",
            "Hindi",
          ],
        },

        areaServed: {
          "@type": "Country",
          name: "India",
        },

        knowsAbout: [
          "Software Development",
          "Web Development",
          "Artificial Intelligence",
          "SaaS Development",
          "React.js",
          "Next.js",
          "Full Stack Development",
          "Custom Software Development",
        ],
      },

      {
        "@type": "WebSite",

        "@id": "https://stackratechnologies.com/#website",

        name: "STACKRA TECHNOLOGIES",

        url: "https://stackratechnologies.com",

        description:
          "Official website of STACKRA TECHNOLOGIES.",

        publisher: {
          "@id": "https://stackratechnologies.com/#organization",
        },

        inLanguage: "en-IN",
      },
    ],
  };

  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="bg-slate-50 text-slate-900 antialiased"
      >
        {/* =====================================================
            STACKRA TECHNOLOGIES - Organization Schema
        ====================================================== */}

        <Script
          id="stackra-organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* =====================================================
            RAZORPAY CHECKOUT
        ====================================================== */}

        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />

        {/* =====================================================
            APPLICATION
        ====================================================== */}

        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
