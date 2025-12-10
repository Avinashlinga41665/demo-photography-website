"use client";

import { useEffect, useRef, useState } from "react";

export default function PriceDetails({ title, packages, setActive }: any) {
  const pkg = packages.find((p: any) => p.title === title);
  const [showQR, setShowQR] = useState(false);

const upiLink =
  "upi://pay?pa=9640268968@ybl&pn=Avinash%20Photography&am=2000&cu=INR&tn=Photoshoot%20Booking%20Advance";

const handlePay = () => {
  if (typeof window === "undefined") return;

  const isAndroid = /Android/i.test(navigator.userAgent);

  if (isAndroid) {
    window.location.href = upiLink;
  } else {
    setShowQR(true);
  }
};



  if (!pkg) return <p className="text-center p-10">Package not found.</p>;

  // --- Image slideshow state ---
  const [imageIndex, setImageIndex] = useState(0);
  const imageIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const images = pkg.images ?? [];

  // Stop auto-rotation
  const stopImageRotation = () => {
    if (imageIntervalRef.current) {
      clearInterval(imageIntervalRef.current);
      imageIntervalRef.current = null;
    }
  };

  // Start auto-rotation
  const startImageRotation = () => {
    stopImageRotation();
    if (images.length > 1) {
      imageIntervalRef.current = setInterval(() => {
        setImageIndex((prev) => (prev + 1) % images.length);
      }, 3000);
    }
  };

  // Start slideshow when component loads
  useEffect(() => {
    startImageRotation();
    return () => stopImageRotation();
  }, [images.length]);

  const currentImage = images[imageIndex];

  return (
    <div className="p-6 max-w-4xl mx-auto bg-[#f5f1e8] rounded-xl shadow-md">
      
      {/* IMAGE WITH AUTO SLIDE */}
      <img
        src={currentImage}
        alt={pkg.title}
        className="w-full h-72 object-cover rounded-xl shadow-lg mb-6"
        onMouseEnter={stopImageRotation}
        onMouseLeave={startImageRotation}
      />

      {/* TITLE */}
      <h2 className="text-3xl font-bold mb-4 text-center">{pkg.title}</h2>

      {/* PACKAGE DETAILS */}
      {pkg.items.map((item: any, idx: number) => (
        <div key={idx} className="mb-6">
          <h3 className="text-xl font-bold">{item.name}: {item.price}</h3>

          <ul className="list-disc pl-6 mt-2 space-y-2">
            {item.details.map((d: string, i: number) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      ))}

      {/* BUTTONS */}
      <div className="mt-6 grid grid-cols-8 gap-4">
      <button
  onClick={handlePay}
  className="col-span-4 bg-[#719BAE] text-white px-5 py-3 rounded-lg hover:bg-[#5a7f8d]"
>
  Pay
</button>

       <button
          onClick={() => (window.location.href = "mailto:yourmail@gmail.com")}
          className="col-span-2 bg-[white] text-white px-5 py-3 rounded-lg hover:bg-[transparent] after:content-['✉️']" 
        >
        </button>
        <button
          onClick={() => (window.location.href = "tel:+919876543210")}
          className="col-span-2 bg-[white] text-white px-5 py-3 rounded-lg hover:bg-[transparent] after:content-['📞'] "
        >
        </button>
      </div>

      {/* BACK BUTTON */}
      <button
        onClick={() => setActive("prices")}
        className="mt-6 underline text-blue-600 block text-center"
      >
        ← Back to Prices
      </button>
      {showQR && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center">
      <h3 className="text-xl font-bold mb-3">Pay via UPI</h3>

      <img
        src="/upi-qr.png"
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

    </div>
  );
}
