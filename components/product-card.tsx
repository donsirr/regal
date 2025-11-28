"use client"

import { motion } from "framer-motion"

interface ProductCardProps {
  item: {
    name: string
    price: string
    image: string
  }
  compact?: boolean
}

export function ProductCard({ item, compact = false }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`flex flex-col items-center text-center bg-cream rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer ${compact ? "p-3" : "p-4"
        }`}
    >
      {/* Circular Image Avatar */}
      <div className={`relative ${compact ? "w-14 h-14 mb-2" : "w-16 h-16 mb-3"}`}>
        <div className="w-full h-full rounded-full overflow-hidden border-2 border-sage/30 shadow-sm">
          <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
        </div>
        <div
          className={`absolute -bottom-1 -right-1 bg-forest text-cream font-semibold rounded-full shadow-lg border border-sage/30 ${compact ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-1"
            }`}
        >
          {item.price}
        </div>
      </div>

      {/* Name */}
      <span className={`text-charcoal font-medium leading-tight ${compact ? "text-xs" : "text-sm"}`}>{item.name}</span>
    </motion.div>
  )
}
