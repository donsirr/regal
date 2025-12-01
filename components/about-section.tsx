"use client"

import { motion } from "framer-motion"

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <span className="text-sage text-sm tracking-[0.2em] uppercase font-medium">Our Story</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mt-3 mb-6 text-balance">
              Crafted with Passion, <br />
              <span className="italic">Delivered with Elegance</span>
            </h2>

            <div className="space-y-4 text-charcoal-light leading-relaxed">
              <p>
                RegAL was born from a simple belief: that the best gatherings happen around beautifully crafted food.
              </p>
              <p>
                Every board we create tells a story and the joy of sharing. Our
                cart, with love, brings this experience directly to your celebrations.
              </p>
              <p>
                From intimate dinner parties to grand weddings, we curate each grazing experience to reflect the unique
                spirit of your event.
              </p>
            </div>

            {/* Founder Signature */}
            <div className="mt-8 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-sage-light/50">
                <img
                  src="/elegant-woman-portrait-founder.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-serif text-charcoal text-lg">RegAL</p>
                <p className="text-charcoal-light text-sm">Founder</p>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/artisan-preparing-elegant-charcuterie-board-luxury.jpg"
                  alt=""
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-sage/10 rounded-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-sage-light/20 rounded-2xl -z-10" />

              {/* Floating Badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-4 right-8 bg-charcoal text-cream px-6 py-3 rounded-full shadow-lg"
              >
                <span className="font-serif text-lg">Est. 2025</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
