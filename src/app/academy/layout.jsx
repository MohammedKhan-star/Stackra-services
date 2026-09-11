export const metadata = {
  title: {
    default:
      "STACKRA Academy | Computer & IT Courses in Hyderabad",
    template: "%s | STACKRA Academy",
  },

  description:
    "STACKRA Academy offers practical computer and IT courses including Full Stack Web Development, Python, JavaScript, React.js, Next.js, MS Office and Advanced Excel.",

  keywords: [
    "STACKRA Academy",
    "computer courses in Hyderabad",
    "computer training in Hyderabad",
    "IT courses in Hyderabad",
    "web development course Hyderabad",
    "full stack web development course Hyderabad",
    "Python course Hyderabad",
    "JavaScript course Hyderabad",
    "React.js course Hyderabad",
    "Next.js course Hyderabad",
    "MS Office course Hyderabad",
    "Advanced Excel course Hyderabad",
    "online computer courses",
    "programming courses Hyderabad",
  ],

  alternates: {
    canonical: "https://stackratechnologies.com/academy",
  },

  openGraph: {
    type: "website",

    locale: "en_IN",

    url: "https://stackratechnologies.com/academy",

    siteName: "STACKRA Academy",

    title:
      "STACKRA Academy | Computer & IT Courses in Hyderabad",

    description:
      "Learn practical computer and IT skills with STACKRA Academy.",

    images: [
      {
        url: "/logo/logo6.png",
        width: 1200,
        height: 630,
        alt: "STACKRA Academy",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "STACKRA Academy | Computer & IT Courses in Hyderabad",

    description:
      "Learn practical computer and IT skills with STACKRA Academy.",

    images: ["/logo/logo6.png"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function AcademyLayout({ children }) {
  return <>{children}</>;
}
