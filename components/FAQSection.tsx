"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

/* ------------------------------
   Fade-in On Scroll Component
------------------------------ */
function FadeInSection({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}

/* ------------------------------
   FAQ Data
------------------------------ */
const data = [
  { q: "How long does editing take?", a: "Final edits take 3–5 days." },
  { q: "Do you travel for shoots?", a: "Yes! We are available for domestic and international destinations." },
  { q: "What payment modes do you accept?", a: "We accept UPI, Net Banking, and Cash." },
  { q: "Do you offer customised packages?", a: "Absolutely! We tailor packages based on your needs." },
];

/* ------------------------------
   MAIN COMPONENT
------------------------------ */
export default function FAQAnimated() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="bg-gradient-to-b from-white via-[#f8f6f2] to-[#f5f1e8] py-20 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <FadeInSection>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#223344] mb-2">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-[3px] bg-[#719BAE] mx-auto rounded-full mb-12" />
        </FadeInSection>

        {/* FAQ Container */}
        <FadeInSection>
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-4">

            {data.map((item, idx) => (
              <div key={idx} className="border-b last:border-none pb-4">

                {/* Question Button */}
                <button
                  className="w-full flex justify-between items-center text-left text-xl font-semibold text-[#0a2342]"
                  onClick={() => setOpen(open === idx ? null : idx)}
                >
                  {item.q}

                  {/* Smooth rotating caret icon */}
                  <span
                    className={`transform transition-transform duration-300 ${
                      open === idx ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    open === idx ? "max-h-40 mt-3" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {item.a}
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
