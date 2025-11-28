"use client"

import { motion } from "framer-motion"

interface ProductCardProps {
  item: {
    name: string
    description?: string
    image: string
  }
  compact?: boolean
}

export function ProductCard({ item, compact = false }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`flex flex-col items-center text-center bg-[#faf8f5] rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer ${compact ? "p-3" : "p-4"
        }`}
    >
      {/* Circular Image Avatar */}
      <div className={`relative ${compact ? "w-14 h-14 mb-2" : "w-20 h-20 mb-3"}`}>
        <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#5a7a6a]/30 shadow-sm">
          <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Name */}
      <span className={`text-[#1a1a1a] font-medium leading-tight ${compact ? "text-xs" : "text-sm"}`}>{item.name}</span>

      {/* Description */}
      {item.description && (
        <span className={`text-[#666666] leading-tight mt-1 ${compact ? "text-[10px]" : "text-xs"}`}>
          {item.description}
        </span>
      )}
    </motion.div>
  )
}
