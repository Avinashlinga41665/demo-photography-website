"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

/* ----------------------------------------------------
   Fade Animation Component
---------------------------------------------------- */
function FadeInSection({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}

/* ----------------------------------------------------
   MULTI-ICON FAQ PHOTOGRAPHY LOADER
---------------------------------------------------- */
function FAQLoader() {
  const messages = [
    "Preparing your questions…",
    "Finding the perfect answers…",
    "Framing helpful information…",
    "Organizing your FAQs…",
    "Loading commonly asked queries…",
  ];

  const icons = ["📸", "🎞️", "📷", "🎥"];
  const [msgIndex, setMsgIndex] = useState(0);
  const [iconIndex, setIconIndex] = useState(0);

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 1500);

    const iconTimer = setInterval(() => {
      setIconIndex((prev) => (prev + 1) % icons.length);
    }, 900);

    return () => {
      clearInterval(msgTimer);
      clearInterval(iconTimer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-32 space-y-6">

      {/* Animated Icon */}
      <div
        key={iconIndex}
        className="text-6xl transition-all duration-500 transform animate-bounce"
      >
        {icons[iconIndex]}
      </div>

      {/* Changing messages */}
      <p className="text-lg text-gray-700 font-medium transition-opacity duration-500">
        {messages[msgIndex]}
      </p>
    </div>
  );
}


/* ----------------------------------------------------
   MAIN FAQ COMPONENT
---------------------------------------------------- */
export default function FAQSection() {
  const [faqList, setFaqList] = useState<any[]>([]);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    async function loadFAQ() {
      const res = await fetch("/api/faq");
      const data = await res.json();

      // If no FAQs in Hygraph → fallback defaults
      if (!Array.isArray(data) || data.length === 0) {
        setFaqList([
          {
            id: "default1",
            question: "How long does editing take?",
            answer: "Final edits are usually delivered within 3–5 days.",
          },
          {
            id: "default2",
            question: "Do you travel for shoots?",
            answer: "Yes! We are available for domestic and international shoots.",
          },
          {
            id: "default3",
            question: "What payment methods do you accept?",
            answer: "We accept UPI, Net Banking, and Cash.",
          },
        ]);
      } else {
        setFaqList(data);
      }
    }

    loadFAQ();
  }, []);

  return (
    <div className="bg-gradient-to-b from-white via-[#f8f6f2] to-[#f5f1e8] pb-14">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <FadeInSection>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#223344] mb-2">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-[3px] bg-[#719BAE] mx-auto rounded-full mb-12" />
        </FadeInSection>

        {/* FAQ List */}
        <FadeInSection>
          <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
           {faqList.length === 0 && <FAQLoader />}


            {faqList.map((item, idx) => (
              <div key={item.id} className="border-b last:border-none">

                {/* QUESTION */}
                <button
                  className="w-full flex justify-between items-center text-left text-xl font-semibold text-[#0a2342]"
                  onClick={() => setOpen(open === idx ? null : idx)}
                >
                  {item.question}

                  <span
                    className={`transition-transform ${
                      open === idx ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {/* ANSWER */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    open === idx ? "max-h-40 mt-3" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeInSection>

      </div>
    </div>
  );
}
