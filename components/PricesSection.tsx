"use client";

import { useEffect, useState, useRef, ReactNode } from "react";

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

type PackageItem = {
  name: string;
  price: string;
  details: string[];
};

type PackageType = {
  id: number;
  title: string;
  price: string;
  images: string[];
  items: PackageItem[];
};


export default function PricesSection() {
  const [packages, setPackages] = useState<any[]>([]);
  const [merged, setMerged] = useState<PackageType[]>([]);
  const [flipped, setFlipped] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [sheetData, setSheetData] = useState<PackageType | null>(null);

  const [dragY, setDragY] = useState(0);
  const startYRef = useRef(0);
    const [showQR, setShowQR] = useState(false);

const generateUpiLink = (amount: string) =>
  `upi://pay?pa=9640268968@ybl&pn=Avinash%20Photography&am=${amount}&cu=INR&tn=Photoshoot%20Booking%20Advance`;

const handlePay = (price: string) => {
  if (typeof window === "undefined") return;

  const upiLink = generateUpiLink(price);
  const isAndroid = /Android/i.test(navigator.userAgent);

  if (isAndroid) {
    window.location.href = upiLink;
  } else {
    setShowQR(true);
  }
};



  /* Load prices from API */
  useEffect(() => {
    async function loadData() {
      const res = await fetch("/api/prices");
      const data = await res.json();
      setPackages(data);
    }
    loadData();
  }, []);

  /* Map API → merged UI data */
  useEffect(() => {
    if (!packages.length) return;

    const mapped = packages.map((p: any) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      images: [
  p.photo1?.url || "/default.jpg",
  p.photo2?.url || "/default.jpg",
  p.photo3?.url || "/default.jpg"
],
      items: [
        {
          name: "PACKAGE I",
          price: `₹${p.price}`,
          details: [
            `${p.editphotonumber} edited photos`, // <-- dynamic
            "45-minute session",
            "Professional lighting & exposure",
            "Teeth whitening included",
          ],
        },
      ],
    }));

    setMerged(mapped);
  }, [packages]);

  useEffect(() => {
    if (sheetData) {
      setDragY(0);
      startYRef.current = 0;
    }
  }, [sheetData]);

  if (!merged.length)
    return <p className="text-center p-10 text-xl">Loading...</p>;

  const pkg = merged[activeIndex];

  return (
    <>
      {/* MAIN SECTION */}
      <div className="bg-gradient-to-b from-white via-[#f8f6f2] to-[#f5f1e8] px-4 min-h-screen relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <FadeInSection>
            <h2 className="text-4xl md:text-5xl font-bold text-[#223344]">
              Our Packages
            </h2>
            <div className="w-20 h-[3px] bg-[#719BAE] mx-auto rounded-full" />
          </FadeInSection>

          {/* DESKTOP TABS */}
          <FadeInSection>
            <div className="hidden md:flex justify-center gap-6 mt-6">
              {merged.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveIndex(idx);
                    setFlipped(false);
                  }}
                  className={`px-6 py-2 rounded-full text-lg font-semibold transition-all ${
                    activeIndex === idx
                      ? "bg-[#719BAE] text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {p.title}
                </button>
              ))}
            </div>
          </FadeInSection>

          {/* MOBILE GRID */}
          <FadeInSection>
            <div className="md:hidden grid grid-cols-2 gap-4 mt-6">
              {merged.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setSheetData(p)}
                  className="group relative w-full aspect-square rounded-xl overflow-hidden shadow-md active:scale-95 transition-transform duration-300"
                >
                  <img
                    src={p.images[0]}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-3 text-white font-semibold text-sm">
                    {p.title}
                  </div>
                </button>
              ))}
            </div>
          </FadeInSection>

          {/* DESKTOP FLIP CARD */}
          <FadeInSection>
            <div className="hidden md:flex justify-center w-full mt-6">
              <div
                className={`relative w-full max-w-3xl min-h-[420px] transition-transform duration-700 [transform-style:preserve-3d] ${
                  flipped ? "[transform:rotateY(180deg)]" : ""
                }`}
              >
                {/* FRONT */}
                <div className="absolute inset-0 bg-white p-8 rounded-2xl shadow-xl [backface-visibility:hidden]">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {pkg.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        className="h-40 w-full object-cover rounded-lg shadow"
                      />
                    ))}
                  </div>

                  <h3 className="text-3xl font-bold text-[#0a2342]">
                    {pkg.title}
                  </h3>
                  <p className="text-xl font-semibold text-[#79A1B0] mt-2">
                    ₹{pkg.price}
                  </p>

                  <button
                    onClick={() => setFlipped(true)}
                    className="absolute top-4 right-4 bg-white shadow-md p-2 rounded-full"
                  >
                    🔄
                  </button>
                </div>

                {/* BACK */}
                <div className="absolute inset-0 bg-white p-8 rounded-2xl shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <button
                    onClick={() => setFlipped(false)}
                    className="absolute top-4 right-4 bg-white shadow-md p-2 rounded-full"
                  >
                    ✕
                  </button>

                  <h3 className="text-3xl font-bold mb-4">{pkg.title} Details</h3>

                  <div className="overflow-y-auto max-h-72 text-left px-4">
                    {pkg.items.map((item, i) => (
                      <div key={i} className="mb-6">
                        <h4 className="text-xl font-bold mb-2">
                          {item.name}: {item.price}
                        </h4>

                        <ul className="list-disc pl-6 text-gray-700">
                          {item.details.map((d, idx) => (
                            <li key={idx}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* DESKTOP BUTTONS */}
                  <div className="mt-6 flex justify-center gap-4">
  <button
  onClick={() => handlePay(pkg.price)}
  className="bg-white text-black px-6 py-2 rounded-lg shadow"
>
  Pay
</button>

                    <button 
                    onClick={() => (window.location.href = "mailto:yourmail@gmail.com")}
                    className="bg-[white] text-black px-6 py-2 rounded-lg shadow">
                      ✉️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>

      {/* MOBILE BOTTOM SHEET */}
      {sheetData && (
        <div
          className="fixed left-0 w-full bg-white rounded-t-3xl shadow-2xl z-50 transition-transform duration-300"
          style={{
            transform: `translateY(${dragY}px)`,
            bottom: 0,
            minHeight: "65vh",
            touchAction: "none",
          }}
          onTouchStart={(e) => {
            startYRef.current = e.touches[0].clientY;
          }}
          onTouchMove={(e) => {
            const move = e.touches[0].clientY - startYRef.current;
            if (move > 0) setDragY(move);
          }}
          onTouchEnd={() => {
            if (dragY > 120) {
              setDragY(600);
              setTimeout(() => setSheetData(null), 200);
            } else {
              setDragY(0);
            }
          }}
        >
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-4" />

          <h3 className="text-xl font-bold text-center">{sheetData.title}</h3>

          <img
            src={sheetData.images[1] ?? sheetData.images[0]}
            className="w-full h-48 object-cover rounded-xl mt-4 px-4"
          />

          <div className="p-5 overflow-y-auto max-h-[50vh]">
            {sheetData.items.map((item, i) => (
              <div key={i} className="mb-4">
                <h4 className="text-lg font-semibold mb-2">
                  {item.name} — {item.price}
                </h4>

                <ul className="list-disc pl-5 text-gray-600">
                  {item.details.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* MOBILE BUTTONS */}
          <div className="px-5 pb-6 flex flex-col gap-3 mt-4">
            <button
  onClick={() => handlePay(pkg.price)}
  className="bg-white text-black py-3 rounded-lg shadow-lg"
>
  Pay
</button>

            <button 
            onClick={() => (window.location.href = "mailto:yourmail@gmail.com")}
            className="bg-[white] text-black py-3 rounded-lg shadow-lg">
              ✉️
            </button>
            <button 
            onClick={() => (window.location.href = "tel:+919876543210")}
            className="bg-[white] text-black py-3 rounded-lg shadow-lg">
              📞
            </button>
          </div>
          

        </div>
      )}
      {showQR && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]">
    <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center">
      <h3 className="text-xl font-bold mb-3">Pay via UPI</h3>

      <img
        src="/default.jpg"
        alt="UPI QR Code"
        className="mx-auto w-56 h-56 object-contain mb-4"
      />

      <p className="text-sm text-gray-600 mb-4">
        Scan using Google Pay / PhonePe
      </p>

      <button
        onClick={() => setShowQR(false)}
        className="w-full bg-[#719BAE] text-white py-2 rounded-lg hover:bg-[#5a7f8d]"
      >
        Close
      </button>
    </div>
  </div>
)}

    </>
    
  );
}
