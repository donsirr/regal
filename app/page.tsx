import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CartMenuSection } from "@/components/cart-menu-section"
import { AboutSection } from "@/components/about-section"
import { BookingSection } from "@/components/booking-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Header />
      <HeroSection />
      <CartMenuSection />
      <AboutSection />
      <BookingSection />
      <Footer />
    </main>
  )
}
