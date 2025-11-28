"use client"

import { motion } from "framer-motion"
import { Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-charcoal text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-serif text-2xl mb-4">
              Reg<span className="text-sage">A</span>l
            </h3>
            <p className="text-cream/70 leading-relaxed text-sm">
              Luxury mobile charcuterie bringing curated grazing experiences to your most cherished moments.
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-serif text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:regaleventbar@gmail.com"
                  className="flex items-center gap-3 text-cream/70 text-sm hover:text-cream transition-colors"
                >
                  <Mail size={16} />
                  <span>regaleventbar@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+15552345678"
                  className="flex items-center gap-3 text-cream/70 text-sm hover:text-cream transition-colors"
                >
                  <Phone size={16} />
                  <span>(555) 234-5678</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-cream/70 text-sm">
                <MapPin size={16} />
                <span>Location</span>
              </li>
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-serif text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("menu")}
                  className="text-cream/70 hover:text-cream transition-colors text-sm"
                >
                  Our Selections
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-cream/70 hover:text-cream transition-colors text-sm"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("booking")}
                  className="text-cream/70 hover:text-cream transition-colors text-sm"
                >
                  Book Now
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-serif text-lg mb-4">Follow Along</h4>
            <p className="text-cream/70 text-sm mb-4">
              Join us on social for grazing inspiration and behind-the-scenes.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-sage/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-sage/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream/50 text-sm">© 2025 RegAl. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
