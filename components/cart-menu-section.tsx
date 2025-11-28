"use client"

import { motion } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"
import { DesktopCart } from "@/components/desktop-cart"
import { MobileDrawers } from "@/components/mobile-drawers"

export function CartMenuSection() {
  const isMobile = useIsMobile()

  return (
    <section id="menu" className="py-20 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sage text-sm tracking-[0.2em] uppercase font-medium">Our Selections</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mt-3 mb-4">The Cart</h2>
          <p className="text-charcoal-light max-w-2xl mx-auto text-pretty">
            Each station on our cart features hand-selected, premium ingredients sourced from local artisans and trusted
            purveyors.
          </p>
        </motion.div>

        {/* Cart Display - Responsive */}
        {isMobile ? <MobileDrawers /> : <DesktopCart />}
      </div>
    </section>
  )
}
