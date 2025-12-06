"use client";

import { useState } from "react";
import Link from "next/link";

type NavbarProps = {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
};

export default function Navbar({ active, setActive }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: "about", label: "About Us" },
    { id: "prices", label: "Prices" },
    { id: "faq", label: "Faq" },
    { id: "portfolio", label: "Portfolio" },
  ];

  return (
    <>
      {/* TOP NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">

          {/* BRAND */}
          <h1 className="text-2xl font-bold tracking-wide text-[#223344]">
            PHOTOGRAPHY NAME
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10 text-lg">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`transition border-b-2 pb-1 ${
                  active === item.id
                    ? "border-[#719BAE] text-[#719BAE]"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* ACTION BUTTONS */}
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

          {/* Hamburger (Mobile) */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end">

          {/* SLIDE-IN MENU */}
          <div className="w-64 bg-white h-full shadow-xl p-6 animate-slideLeft">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Menu</h2>
              <button onClick={() => setMenuOpen(false)} className="text-3xl">
                ✕
              </button>
            </div>

            {/* MOBILE NAVIGATION ITEMS */}
            <div className="flex flex-col gap-4 text-lg">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActive(item.id);
                    setMenuOpen(false);
                  }}
                  className={`text-left px-2 py-2 rounded transition ${
                    active === item.id ? "bg-gray-100 font-semibold" : ""
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* MOBILE CALL TO ACTION BUTTONS */}
            <div className="mt-10 flex flex-col gap-3">
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
          </div>
        </div>
      )}

      {/* MOBILE SLIDE ANIMATION */}
      <style jsx>{`
        @keyframes slideLeft {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slideLeft {
          animation: slideLeft 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
