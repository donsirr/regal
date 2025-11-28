"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { MenuStation } from "@/lib/menu-data"

interface MobileDrawersProps {
  data: Record<string, MenuStation>
}

export function MobileDrawers({ data }: MobileDrawersProps) {
  // Default to opening the first station if available
  const initialKey = Object.keys(data)[0] || null
  const [openDrawer, setOpenDrawer] = useState<string | null>(initialKey)
  const stations = Object.entries(data)

  const toggleDrawer = (key: string) => {
    setOpenDrawer(openDrawer === key ? null : key)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative max-w-md mx-auto"
    >
      <div
        className="rounded-xl overflow-hidden shadow-xl"
        style={{
          background: "linear-gradient(180deg, oklch(0.99 0.005 75) 0%, oklch(0.96 0.01 75) 100%)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.1), inset 0 2px 10px rgba(255,255,255,0.8)",
        }}
      >
        <div className="h-3 bg-gradient-to-r from-forest via-sage to-sage-light" />

        {/* Drawers */}
        <div className="p-3 space-y-2">
          {stations.map(([key, station], index) => (
            <div
              key={key}
              className="rounded-lg overflow-hidden border border-sage/20"
              style={{
                background: "linear-gradient(180deg, oklch(0.99 0.005 75) 0%, oklch(0.97 0.008 75) 100%)",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <button
                onClick={() => toggleDrawer(key)}
                className="w-full p-4 flex items-center justify-between transition-colors hover:bg-sage/5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-2 rounded-full bg-gradient-to-r from-forest to-sage shadow-inner" />
                  <span className="font-serif text-charcoal text-lg">{station.title}</span>
                </div>
                <motion.div animate={{ rotate: openDrawer === key ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="text-sage" size={20} />
                </motion.div>
              </button>

              {/* Drawer Content */}
              <AnimatePresence>
                {openDrawer === key && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="bg-cream-dark/50 p-4 mx-2 mb-3 rounded-lg shadow-inner border border-sage/10">
                      <div className="grid grid-cols-2 gap-3">
                        {station.items.map((item, itemIndex) => (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: itemIndex * 0.05,
                            }}
                          >
                            <ProductCard item={item} compact />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="flex justify-between px-6 pb-2">
          <div className="w-6 h-3 rounded-b-full bg-sage" />
          <div className="w-6 h-3 rounded-b-full bg-sage" />
        </div>
      </div>

      {/* Hint Text */}
      <p className="text-center mt-4 text-muted-foreground text-sm">Tap each drawer to explore</p>
    </motion.div>
  )
}