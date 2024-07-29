"use client";
import React from "react";
import { HeroParallax } from "./ui/hero-parallax";

function HeroParallaxDemo() {
  return <HeroParallax products={products.map(product => ({ ...product, link: "/courses" }))} />;}
export const products = [
  {
    title: "Moonbeam",
    // link: "https://gomoonbeam.com",
    thumbnail:
      "https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Cursor",
    // link: "https://cursor.so",
    thumbnail:
      "https://images.pexels.com/photos/33597/guitar-classical-guitar-acoustic-guitar-electric-guitar.jpg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Rogue",
    // link: "https://userogue.com",
    thumbnail:
      "https://images.pexels.com/photos/248510/pexels-photo-248510.jpeg?auto=compress&cs=tinysrgb&w=600",
  },

  {
    title: "Editorially",
    // link: "https://editorially.org",
    thumbnail:
      "https://images.pexels.com/photos/167491/pexels-photo-167491.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Editrix AI",
    // link: "https://editrix.ai",
    thumbnail:
      "https://images.pexels.com/photos/45243/saxophone-music-gold-gloss-45243.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Pixel Perfect",
    // link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://images.pexels.com/photos/196652/pexels-photo-196652.jpeg?auto=compress&cs=tinysrgb&w=600",
  },

  {
    title: "Algochurn",
    // link: "https://algochurn.com",
    thumbnail:
      "https://images.pexels.com/photos/34221/violin-musical-instrument-music-sound.jpg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Aceternity UI",
    // link: "https://ui.aceternity.com",
    thumbnail:
      "https://images.pexels.com/photos/2147029/pexels-photo-2147029.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Tailwind Master Kit",
    // link: "https://tailwindmasterkit.com",
    thumbnail:
      "https://images.pexels.com/photos/3971985/pexels-photo-3971985.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "SmartBridge",
    // link: "https://smartbridgetech.com",
    thumbnail:
      "https://images.pexels.com/photos/210854/pexels-photo-210854.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Renderwork Studio",
    // link: "https://renderwork.studio",
    thumbnail:
      "https://images.pexels.com/photos/2272854/pexels-photo-2272854.jpeg?auto=compress&cs=tinysrgb&w=600",
  },

  {
    title: "Creme Digital",
    // link: "https://cremedigital.com",
    thumbnail:
      "https://images.pexels.com/photos/1619779/pexels-photo-1619779.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Golden Bells Academy",
    // link: "https://goldenbellsacademy.com",
    thumbnail:
      "https://images.pexels.com/photos/462510/pexels-photo-462510.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Invoker Labs",
    // link: "https://invoker.lol",
    thumbnail:
      "https://images.pexels.com/photos/2118046/pexels-photo-2118046.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "E Free Invoice",
    // link: "https://efreeinvoice.com",
    thumbnail:
      "https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default HeroParallaxDemo;
