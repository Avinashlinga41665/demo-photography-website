"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

/* ----------------------------------------------------
   Fade Animation
---------------------------------------------------- */
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

/* ----------------------------------------------------
   HOME PAGE LOADER (Photography-themed)
---------------------------------------------------- */
function HomeLoader() {
  const messages = [
    "Framing your page…",
    "Loading your best captures…",
    "Preparing beautiful memories…",
    "Sharpening your visuals…",
    "Setting the perfect scene…",
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
      {/* Rotating Icon */}
      <div
        key={iconIndex}
        className="text-6xl transition-all duration-500 transform animate-bounce"
      >
        {icons[iconIndex]}
      </div>

      {/* Changing Message */}
      <p className="text-lg text-gray-700 font-medium transition-opacity duration-500">
        {messages[msgIndex]}
      </p>
    </div>
  );
}

/* ----------------------------------------------------
   DEFAULT FALLBACK DATA
---------------------------------------------------- */
const defaultData = {
  headline: "Immortalizing Beauty\nThrough Photography",
  subText: "Explore a curated selection of portrait and lifestyle photography.",
  photos: Array(8).fill("/default.jpg"),
};

/* ----------------------------------------------------
   MAIN HOME PAGE
---------------------------------------------------- */
export default function HomePage({ setActive }: any) {
  const [home, setHome] = useState<any>(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHome() {
      try {
        const res = await fetch("/api/home", { cache: "no-store" });
        const data = await res.json();

        if (!data) {
          setLoading(false);
          return;
        }

        const photos = [
          data.collagePhoto1 || "/default.jpg",
          data.collagePhoto2 || "/default.jpg",
          data.collagePhoto3 || "/default.jpg",
          data.collagePhoto4 || "/default.jpg",
          data.collagePhoto5 || "/default.jpg",
          data.collagePhoto6 || "/default.jpg",
          data.collagePhoto7 || "/default.jpg",
          data.collagePhoto8 || "/default.jpg",
        ];

        setHome({
          headline: data.headline || defaultData.headline,
          subText: data.subText || defaultData.subText,
          photos,
        });

        setLoading(false);
      } catch (err) {
        console.log("Home API error → using defaults");
        setLoading(false);
      }
    }

    loadHome();
  }, []);

  const collage = home.photos;

  /* Show Loader While Fetching */
  if (loading) return <HomeLoader />;

  return (
    <div className="bg-gradient-to-b from-white via-[#f8f6f2] to-[#f5f1e8] pb-14">
      <div className="max-w-6xl mx-auto space-y-14">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT TEXT */}
          <FadeInSection>
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#223344] whitespace-pre-line">
                {home.headline}
              </h1>

              <p className="text-lg text-gray-700 max-w-md">{home.subText}</p>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setActive("about")}
                  className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium"
                >
                  About Me
                </button>

                <button
                  onClick={() => setActive("portfolio")}
                  className="px-6 py-3 bg-[#719BAE] text-white rounded-lg hover:bg-[#5a7f8d] transition font-medium"
                >
                  Portfolio
                </button>
              </div>
            </div>
          </FadeInSection>

          {/* RIGHT PHOTO COLLAGE */}
          <FadeInSection>
            <div className="grid grid-cols-3 gap-3 w-full max-w-lg mx-auto">

              <div className="col-span-1 row-span-2">
                <img src={collage[0]} className="w-full h-full object-cover rounded-lg border shadow-sm hover:scale-105 transition" />
              </div>

              <div className="col-span-2">
                <img src={collage[1]} className="w-full h-40 object-cover rounded-lg border shadow-sm hover:scale-105 transition" />
              </div>

              <div>
                <img src={collage[2]} className="w-full h-28 object-cover rounded-lg border shadow-sm hover:scale-105 transition" />
              </div>

              <div>
                <img src={collage[3]} className="w-full h-40 object-cover rounded-lg border shadow-sm hover:scale-105 transition" />
              </div>

              <div>
                <img src={collage[4]} className="w-full h-28 object-cover rounded-lg border shadow-sm hover:scale-105 transition" />
              </div>

              <div className="col-span-2">
                <img src={collage[5]} className="w-full h-36 object-cover rounded-lg border shadow-sm hover:scale-105 transition" />
              </div>

              <div className="row-span-2">
                <img src={collage[6]} className="w-full h-full object-cover rounded-lg border shadow-sm hover:scale-105 transition" />
              </div>

              <div>
                <img src={collage[7]} className="w-full h-28 object-cover rounded-lg border shadow-sm hover:scale-105 transition" />
              </div>

            </div>
          </FadeInSection>

        </div>
      </div>
    </div>
  );
}
