import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CartMenuSection } from "@/components/cart-menu-section"
import { AboutSection } from "@/components/about-section"
import { BookingSection } from "@/components/booking-section"
import { Footer } from "@/components/footer"
import { getMenuData } from "@/lib/google"
import { menuData as fallbackData } from "@/lib/menu-data"

// Revalidate data every 60 seconds (Incremental Static Regeneration)
export const revalidate = 60

export default async function Home() {
  // Fetch data from Google Sheets API
  const sheetData = await getMenuData()

  // Use sheet data if available, otherwise fall back to local file
  const finalMenuData = sheetData || fallbackData

  return (
    <main className="min-h-screen bg-cream">
      <Header />
      <HeroSection />
      {/* Pass the fetched data down to the client component */}
      <CartMenuSection menuData={finalMenuData} />
      <AboutSection />
      <BookingSection />
      <Footer />
    </main>
  )
}