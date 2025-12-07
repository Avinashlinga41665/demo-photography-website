"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

/* Fade Animation */
function FadeInSection({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
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

export default function AboutSection() {
  const [about, setAbout] = useState<any | null>(null);

  useEffect(() => {
    async function loadAbout() {
      const res = await fetch("/api/about");
      const data = await res.json();
      setAbout(data);
    }
    loadAbout();
  }, []);

  if (!about)
    return <p className="text-center py-20 text-xl">Loading About Section...</p>;

const galleryImages =
  about.images?.length
    ? about.images.map((p: any) => p?.url || "/default.jpg")
    : Array(6).fill("/default.jpg"); 

  return (
    <div className="bg-gradient-to-b from-white via-[#f8f6f2] to-[#f5f1e8] py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-14">

        {/* Heading */}
        <FadeInSection>
          <div className="text-center space-y-3">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-wide">
              About Our Photography
            </h2>
            <div className="w-20 h-[3px] bg-[#719BAE] mx-auto rounded-full" />
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              We blend timeless storytelling with modern, editorial style to
              create photographs that feel honest, elegant and uniquely you.
            </p>
          </div>
        </FadeInSection>

        {/* Masonry Gallery */}
        <FadeInSection>
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {galleryImages.map((src: string, i: number) => (
              <img
                key={i}
                src={src}
                className="w-full mb-4 rounded-xl shadow-md object-cover break-inside-avoid hover:scale-[1.02] hover:shadow-lg transition-transform duration-300"
              />
            ))}
          </div>
        </FadeInSection>

        {/* Intro + Profile Card */}
        <FadeInSection>
          <div className="grid md:grid-cols-[2fr,1.3fr] gap-10 items-center mt-4">

            {/* Text Block */}
            <div className="text-left space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                Welcome to our studio — where creativity meets passion.
              </h3>

              <p className="text-lg text-gray-700 leading-relaxed">
                We specialize in capturing real emotions, timeless moments, and
                beautiful stories through our lens.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Whether it's portraits, weddings, kids, or editorial shoots,
                we aim to make every experience relaxed, fun and truly memorable.
              </p>

              <div>
                <h4 className="text-xl font-semibold mb-2">Our approach is simple:</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>We focus on natural expressions and real connections.</li>
                  <li>We highlight your personality, not just your pose.</li>
                  <li>We deliver high-quality photos that last a lifetime.</li>
                  <li>We create a calm, comfortable environment so you can feel yourself.</li>
                  <li>Every picture tells a story — and we would love to tell yours.</li>
                </ul>
              </div>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
              <img
                src={about.profilePhoto?.url || "/default.jpg"}
                className="w-32 h-32 rounded-full object-cover shadow-md mb-4"
              />

              <h4 className="text-xl font-bold text-gray-800">Your Photographer</h4>

              <p className="text-sm uppercase tracking-wide text-gray-500 mb-3">
                Founder & Lead Photographer
              </p>

              <p className="text-sm text-gray-600 mb-4">
                With {about.yearsOfExperience} years of experience in weddings,
                kids, portraits & editorial shoots — we bring a creative eye and
                a calm presence to every session.
              </p>

              <div className="text-sm text-gray-600 space-y-1">
                <p>📍 Based in India — available for destination shoots</p>
                <p>📷 Specialised in weddings, kids, portraits & lifestyle photography</p>
                <p>🤝 Focused on comfortable, client-first experiences</p>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Static Journey Section */}
        <FadeInSection>
          <div className="mt-6">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Our Journey
            </h3>

            <ol className="relative border-l border-gray-300 space-y-8 pl-5">
              <li>
                <div className="absolute -left-[9px] mt-1.5 w-4 h-4 rounded-full bg-[#719BAE]" />
                <p className="text-sm font-semibold text-gray-500">2018</p>
                <h4 className="text-lg font-semibold text-gray-800">The Beginning</h4>
                <p className="text-gray-600">Started as a small passion project shooting friends & events.</p>
              </li>

              <li>
                <div className="absolute -left-[9px] mt-1.5 w-4 h-4 rounded-full bg-[#719BAE]" />
                <p className="text-sm font-semibold text-gray-500">2020</p>
                <h4 className="text-lg font-semibold text-gray-800">Growing with Stories</h4>
                <p className="text-gray-600">Expanded into weddings, maternity, & kids sessions.</p>
              </li>

              <li>
                <div className="absolute -left-[9px] mt-1.5 w-4 h-4 rounded-full bg-[#719BAE]" />
                <p className="text-sm font-semibold text-gray-500">2023</p>
                <h4 className="text-lg font-semibold text-gray-800">A Full-Time Studio</h4>
                <p className="text-gray-600">Opened our full-time photography studio with a dedicated team.</p>
              </li>

              <li>
                <div className="absolute -left-[9px] mt-1.5 w-4 h-4 rounded-full bg-[#719BAE]" />
                <p className="text-sm font-semibold text-gray-500">Today</p>
                <h4 className="text-lg font-semibold text-gray-800">Your Story, Next</h4>
                <p className="text-gray-600">Delivering custom experiences from first call to final album.</p>
              </li>
            </ol>
          </div>
        </FadeInSection>

      </div>
    </div>
  );
}
