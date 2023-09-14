"use client";
import About from "@/components/About";
import Featured from "@/components/Featured";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    function cleanupfunction() {
      localStorage.getItem("token") && localStorage.removeItem("token");
    }
    cleanupfunction();
  }, []);
  return (
    <>
      <Header />
      <Hero />
      <Featured />
      <About />
      <Footer />
    </>
  );
}
