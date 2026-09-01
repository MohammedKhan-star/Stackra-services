"use client";

import { useState } from "react";
import { Plus, Minus, MessageCircle } from "lucide-react";

const faqs = [
{
question: "What services does STACKRA TECHNOLOGIES provide?",
answer:
"STACKRA TECHNOLOGIES provides custom software development, web application development, AI-powered solutions, business management systems, digital transformation solutions, and technology consulting.",
},
{
question: "Can you build custom software for my business?",
answer:
"Yes. We analyze your business requirements and build customized software solutions designed around your workflows, operations, customers, and business goals.",
},
{
question: "Do you develop AI-powered applications?",
answer:
"Yes. We build intelligent solutions that can use artificial intelligence for automation, data analysis, business assistance, workflow improvement, and smarter decision-making.",
},
{
question: "How much does custom software development cost?",
answer:
"The cost depends on the project requirements, features, complexity, technology, integrations, and development timeline. Contact us with your requirements for a customized project discussion.",
},
{
question: "How long does it take to develop a software project?",
answer:
"The development timeline depends on the size and complexity of the project. Smaller applications can take weeks, while larger business platforms may require several months of development.",
},
{
question: "Do you provide website development services?",
answer:
"Yes. We build modern, responsive, fast, and professional websites and web applications designed for businesses and organizations.",
},
{
question: "Will I receive support after my software is launched?",
answer:
"Yes. We can provide ongoing technical support, maintenance, updates, improvements, and assistance depending on your project's support requirements.",
},
{
question: "How can I start a project with STACKRA TECHNOLOGIES?",
answer:
"You can contact us through our website, contact form, email, or WhatsApp. Share your business requirements, and we can discuss the best technology solution for your needs.",
},
];

export default function FaqSection() {
const [openIndex, setOpenIndex] = useState(0);

const toggleFaq = (index) => {
setOpenIndex(openIndex === index ? null : index);
};

return ( <section
   id="faq"
   className="relative overflow-hidden bg-slate-950 py-24 sm:py-28"
 >
{/* Background Effects */} <div className="absolute inset-0"> <div className="absolute right-[-150px] top-20 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]" />


    <div className="absolute bottom-[-200px] left-[-100px] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[140px]" />
  </div>

  <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
    <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
      
      {/* Left Content */}
      <div className="lg:sticky lg:top-28">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
          FREQUENTLY ASKED QUESTIONS
        </div>

        <h2 className="mt-7 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Questions?
          <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
            We've Got Answers.
          </span>
        </h2>

        <p className="mt-6 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
          Everything you need to know about working with STACKRA
          TECHNOLOGIES and building your next digital solution.
        </p>

        {/* Contact Card */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <MessageCircle size={24} />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-white">
            Still have questions?
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Our team is ready to discuss your business requirements and
            help you find the right technology solution.
          </p>

          <a
            href="#contact"
            className="mt-5 inline-flex items-center font-semibold text-blue-400 transition-colors hover:text-cyan-300"
          >
            Contact Our Team →
          </a>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${
                isOpen
                  ? "border-blue-500/40 bg-blue-500/[0.06]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFaq(index)}
                className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left"
              >
                <div className="flex items-center gap-5">
                  <span
                    className={`text-sm font-bold transition-colors ${
                      isOpen ? "text-blue-400" : "text-slate-600"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-base font-semibold text-white sm:text-lg">
                    {faq.question}
                  </span>
                </div>

                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    isOpen
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-white/10 text-slate-400"
                  }`}
                >
                  {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>

              {/* Answer */}
              <div
                className={`grid transition-all duration-500 ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-white/5 px-6 pb-6 pt-5">
                    <p className="pl-9 leading-7 text-slate-400">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* Bottom CTA */}
    <div className="mt-20 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-600/10 via-slate-900 to-cyan-500/10 p-8 text-center sm:p-12">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
        Ready to Get Started?
      </p>

      <h3 className="mx-auto mt-4 max-w-3xl text-2xl font-bold text-white sm:text-4xl">
        Let's Build Something Powerful Together.
      </h3>

      <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">
        Tell us about your idea, business challenge, or software
        requirements. STACKRA TECHNOLOGIES is ready to help transform your
        vision into a digital solution.
      </p>

      <a
        href="#contact"
        className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-4 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-105"
      >
        Start Your Project
      </a>
    </div>
  </div>
</section>


);
}
