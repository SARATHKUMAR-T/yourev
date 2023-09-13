"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className={`bg-yellow-500 py-8 relative `}>
      <div className={` mx-auto flex flex-col gap-8`}>
        <div className="px-12 flex items-center justify-between flex-wrap gap-5">
          <h4 className="font-normal uppercase md:text[64px] text-[44px] text-black">
            Zemo
          </h4>
          <Button className="w-28" asChild variant="destructive">
            <Link href="/signup">TRY ZEMO</Link>
          </Button>
        </div>
        <div className="flex items-center justify-end px-4 gap-3">
          <p>Follow us on </p>
          <div className="flex gap-4">
            <Instagram />
            <Twitter />
            <Facebook />
          </div>
        </div>

        <div className="flex px-12  flex-col">
          <div className="mb-[50px] h-[2px] bg-white opacity-10" />
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h4 className=" text-[24px] text-black">zemo</h4>
            <p className="font-normal text-[14px] text-black opacity-50">
              Copyright 2022-2023 zemo.All rights reserved.
            </p>
            <div className="">
              <a
                className="text-black opacity-50"
                href="https://saraensemble.netlify.app/"
                target="_blank"
                rel="noreferrer"
              >
                Designed and developed by{" "}
                <span className="text-cyan-900 underline hover:scale-105 duration-300 transition-all ">
                  Sarath.dev
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
