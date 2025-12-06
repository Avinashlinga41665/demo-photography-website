"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import PricesSection from "@/components/PricesSection";
import PortfolioSection from "@/components/PortfolioSection";

export default function Page() {
  const [active, setActive] = useState<string>("about");

  return (
    <>
      <Navbar active={active} setActive={setActive} />

      <main className="pt-32 px-4 min-h-screen">
        {active === "prices" && <PricesSection />}
        {active === "about" && <AboutSection />}
        {active === "faq" && <FAQSection/>}
        {active === "portfolio" && <PortfolioSection/>}
      </main>
    </>
  );
}
