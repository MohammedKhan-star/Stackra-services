
export default function manifest() {
  return {
    name: "STACKRA TECHNOLOGIES",
    short_name: "STACKRA",

    description:
      "STACKRA TECHNOLOGIES - Software, Artificial Intelligence and Digital Solutions.",

    start_url: "/",

    display: "standalone",

    background_color: "#020617",

    theme_color: "#2563eb",

    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
