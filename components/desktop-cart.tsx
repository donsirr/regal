"use client"

import { motion } from "framer-motion"
import { ProductCard } from "@/components/product-card"
import { MenuStation } from "@/lib/menu-data"

interface DesktopCartProps {
  data: Record<string, MenuStation>
}

export function DesktopCart({ data }: DesktopCartProps) {
  const stations = Object.entries(data)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* Cart Frame */}
      <div className="relative">
        <div className="h-4 bg-gradient-to-b from-sage-light via-sage to-forest rounded-t-lg shadow-sm border-t-4 border-x-4 border-sage/30" />

        <div
          className="bg-warm-white border-x-8 border-b-8 rounded-b-xl overflow-hidden"
          style={{
            borderColor: "oklch(0.88 0.015 75)",
            boxShadow: "inset 0 4px 20px rgba(0,0,0,0.05), 0 10px 40px rgba(0,0,0,0.1)",
          }}
        >
          {/* Decorative Lines */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-px h-full bg-sage/40" />
            <div className="absolute top-0 left-2/4 w-px h-full bg-sage/40" />
            <div className="absolute top-0 left-3/4 w-px h-full bg-sage/40" />
          </div>

          {/* Horizontal Scroll Container */}
          <div className="overflow-x-auto cart-scroll">
            <div className="flex min-w-max">
              {stations.map(([key, station], stationIndex) => (
                <div
                  key={key}
                  className={`flex-shrink-0 w-[380px] p-6 ${stationIndex !== stations.length - 1 ? "border-r-2 border-sage/20" : ""
                    }`}
                >
                  {/* Station Label - sage green accent */}
                  <div className="mb-6">
                    <div className="inline-block bg-gradient-to-r from-forest to-sage px-4 py-2 rounded-full shadow-sm">
                      <h3 className="font-serif text-lg text-white">{station.title}</h3>
                    </div>
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {station.items.map((item, itemIndex) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: stationIndex * 0.1 + itemIndex * 0.05,
                        }}
                      >
                        <ProductCard item={item} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between px-16 -mt-4">
          <div className="w-12 h-12 rounded-full bg-charcoal border-4 border-sage shadow-lg" />
          <div className="w-12 h-12 rounded-full bg-charcoal border-4 border-sage shadow-lg" />
        </div>
      </div>

      {/* Scroll Hint */}
      <p className="text-center mt-6 text-muted-foreground text-sm">← Scroll to explore all stations →</p>
    </motion.div>
  )
}