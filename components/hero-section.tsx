"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/elegant-charcuterie-board-with-meats-cheeses-grape.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-noir/70 via-noir/50 to-noir/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block text-sage-light text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-medium">
            Luxury Mobile Charcuterie
          </span>
        </motion.div>

        <motion.h1
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-cream leading-tight text-balance mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Exquisite Grazing,
          <br />
          <span className="italic text-sage-light">Elevated</span>
        </motion.h1>

        <motion.p
          className="text-cream/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 text-pretty"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Where culinary artistry meets impeccable service. Bespoke charcuterie experiences crafted for life's most
          memorable moments.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button
            size="lg"
            className="bg-sage hover:bg-sage-light text-white font-medium px-10 py-6 text-lg"
            onClick={() => scrollToSection("booking")}
          >
            Reserve Your Experience
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-cream/50 text-cream hover:bg-cream/10 font-medium px-10 py-6 text-lg bg-transparent"
            onClick={() => scrollToSection("menu")}
          >
            View Selections
          </Button>
        </motion.div>
      </div>

      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.5 },
          y: { repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" },
        }}
        onClick={() => scrollToSection("menu")}
        aria-label="Scroll to menu"
      >
        <ChevronDown className="text-cream/70" size={32} />
      </motion.button>
    </section>
  )
}
