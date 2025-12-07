"use client";

import { useState, useEffect, useRef } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

/* Fade Animation */
function FadeInSection({ children }: { children: React.ReactNode }) {
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
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}

export default function PortfolioSection() {
  const [categories, setCategories] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(0);

  // ---- Load Data ----
  useEffect(() => {
    async function loadPortfolio() {
      const res = await fetch("/api/portfolio");
      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        // SET DEFAULT PORTFOLIO CATEGORY
        setCategories([
          {
            id: "default",
            title: "Wedding",
            description:
              "Beautiful wedding moments captured with elegance and emotion.",
            images: [
              { url: "/default.jpg" },
              { url: "/default.jpg" },
              { url: "/default.jpg" },
            ],
          },
          {
            id: "default2",
            title: "Kids",
            description:
              "Fun and joyful kids photography that captures innocence.",
            images: [
              { url: "/default.jpg" },
              { url: "/default.jpg" },
              { url: "/default.jpg" },
            ],
          },
        ]);
      } else {
        // CLEAN DATA WITH DEFAULT FALLBACKS
        const final = data.map((item: any) => ({
          id: item.id,
          title: item.title || "Untitled Category",
          description:
            item.description || "No description added for this category yet.",
          images:
            item.images?.length > 0
              ? item.images.map((i: any) => ({
                  url: i?.url || "/default.jpg",
                }))
              : [
                  { url: "/default.jpg" },
                  { url: "/default.jpg" },
                  { url: "/default.jpg" },
                ],
        }));

        setCategories(final);
      }
    }

    loadPortfolio();
  }, []);

  if (categories.length === 0) {
    return <p className="text-center p-10">Loading portfolio...</p>;
  }

  const current = categories[activeIndex];

  return (
    <div className="bg-gradient-to-b from-white via-[#f8f6f2] to-[#f5f1e8] py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-14">
        
        {/* Heading */}
        <FadeInSection>
          <h2 className="text-4xl md:text-5xl font-bold text-[#223344] text-center">
            Portfolio
          </h2>
          <div className="w-20 h-[3px] bg-[#719BAE] mx-auto rounded-full mt-3 mb-6" />
        </FadeInSection>

        {/* Filters */}
        <FadeInSection>
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => setActiveIndex(idx)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                  activeIndex === idx
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-400"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          <p className="text-center text-gray-700 mt-6 max-w-xl mx-auto">
            {current.description}
          </p>
        </FadeInSection>

        {/* Masonry Images */}
        <FadeInSection>
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
            {current.images.map((img: any, idx: number) => (
              <img
                key={idx}
                src={img.url}
                alt={current.title}
                onClick={() => {
                  setSelectedImg(idx);
                  setLightboxOpen(true);
                }}
                className="w-full mb-4 rounded-xl shadow-md object-cover cursor-pointer hover:scale-[1.02] transition"
              />
            ))}
          </div>
        </FadeInSection>

        {/* Lightbox */}
        {lightboxOpen && (
          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            index={selectedImg}
            slides={current.images.map((img: any) => ({ src: img.url }))}
          />
        )}
      </div>
    </div>
  );
}
