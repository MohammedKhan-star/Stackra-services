"use client";

import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
     <section id="contact" className="py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">Let&apos;s Build Something Great Together</h2>
          <p className="text-xl text-gray-600 mb-12">Fill out the form below and our team will get back to you within 24 hours with a custom proposal.</p>

          <div className="w-full max-w-3xl mx-auto">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfAID8OYwPFID3gqmt3FzbTZBklpFgw-bXMdMmiAnCT56RVow/viewform?embedded=true"
              className="w-full h-[820px] md:h-[780px] border-0 rounded-3xl shadow-xl"
              title="Project Inquiry Form"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
            >
              Loading…
            </iframe>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Having trouble with the form?{" "}
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfAID8OYwPFID3gqmt3FzbTZBklpFgw-bXMdMmiAnCT56RVow/viewform" target="_blank" className="text-indigo-600 hover:underline">
              Open in new tab
            </a>
          </p>
           
        </div>
      </section>
  );
}