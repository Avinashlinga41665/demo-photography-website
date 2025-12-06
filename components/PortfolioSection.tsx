"use client";

import { useState, useRef, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

/* ---------------------------------------
   FADE-IN ON SCROLL (same as About & Prices)
----------------------------------------- */
function FadeInSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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

/* ---------------------------------------
   DATA
----------------------------------------- */
type Category =
  | "Wedding"
  | "Kids"
  | "Maternity"
  | "PreWedding"
  | "Model"
  | "Events";

const placeholder = "/default.jpg";

const portfolioData: Record<Category, { images: string[]; desc: string }> = {
  Wedding: {
    images: [placeholder, placeholder, placeholder],
    desc: "Timeless, emotional, and cinematic wedding photography capturing rituals, smiles, and candid moments.",
  },

  Kids: {
    images: [placeholder, placeholder, placeholder],
    desc: "Joyful and innocent moments captured through playful and natural kids photography sessions.",
  },

  Maternity: {
    images: [placeholder, placeholder, placeholder],
    desc: "Elegant and emotional maternity portraits celebrating the beauty of motherhood.",
  },

  PreWedding: {
    images: [placeholder, placeholder, placeholder],
    desc: "Romantic and cinematic pre-wedding shoots capturing your love story with creativity.",
  },

  Model: {
    images: [placeholder, placeholder, placeholder],
    desc: "Professional studio and outdoor model portfolio shoots crafted for aspiring and professional models.",
  },

  Events: {
    images: [placeholder, placeholder, placeholder],
    desc: "Candid and emotional event photography—all your special celebrations beautifully preserved.",
  },
};

/* ---------------------------------------
   MAIN COMPONENT
----------------------------------------- */
export default function PortfolioSection() {
  const categories: Category[] = [
    "Wedding",
    "Kids",
    "Maternity",
    "PreWedding",
    "Model",
    "Events",
  ];

  const [activeCategory, setActiveCategory] =
    useState<Category>("Wedding");

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(0);

  const current = portfolioData[activeCategory];

  return (
    <div className="bg-gradient-to-b from-white via-[#f8f6f2] to-[#f5f1e8] py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-14">

        {/* ------------------ HEADING ------------------ */}
        <FadeInSection>
          <h2 className="text-4xl md:text-5xl font-bold text-[#223344] text-center">
            Portfolio
          </h2>
          <div className="w-20 h-[3px] bg-[#719BAE] mx-auto rounded-full mt-3 mb-6" />
        </FadeInSection>

        {/* ------------------ FILTERS ------------------ */}
        <FadeInSection>
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                  activeCategory === cat
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-400"
                }`}
              >
                {cat.replace("PreWedding", "Pre-Wedding")}
              </button>
            ))}
          </div>

          {/* DESCRIPTION */}
          <p className="text-center text-gray-700 mt-6 max-w-xl mx-auto">
            {current.desc}
          </p>
        </FadeInSection>

        {/* ------------------ IMAGES (MASONRY) ------------------ */}
        <FadeInSection>
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
            {current.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={activeCategory}
                onClick={() => {
                  setSelectedImg(idx);
                  setLightboxOpen(true);
                }}
                className="w-full mb-4 rounded-xl shadow-md object-cover cursor-pointer hover:scale-[1.02] transition"
              />
            ))}
          </div>
        </FadeInSection>

        {/* ------------------ LIGHTBOX ------------------ */}
        {lightboxOpen && (
          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            index={selectedImg}
            slides={current.images.map((src) => ({ src }))}
          />
        )}
      </div>
    </div>
  );
}
