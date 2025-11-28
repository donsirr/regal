"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight, Check, Sparkles, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { pricingTiers } from "@/lib/menu-data"

const eventTypes = [
  { id: "wedding", label: "Wedding", icon: "💍" },
  { id: "corporate", label: "Corporate", icon: "🤝" },
  { id: "birthday", label: "Birthday", icon: "🎂" },
  { id: "private", label: "Private Party", icon: "🥂" },
]

const timeSlots = [
  { id: "morning", label: "Morning", time: "9AM - 12PM" },
  { id: "afternoon", label: "Afternoon", time: "12PM - 5PM" },
  { id: "evening", label: "Evening", time: "5PM - 10PM" },
]

export function BookingSection() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [eventType, setEventType] = useState<string | null>(null)
  const [guestCount, setGuestCount] = useState<string | null>(null)
  const [timeSlot, setTimeSlot] = useState<string | null>(null)
  const [venue, setVenue] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")
  const [contactName, setContactName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookedDates, setBookedDates] = useState<string[]>([])
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false)

  const selectedTier = pricingTiers.find((tier) => tier.id === guestCount)
  const estimatedMin = selectedTier ? selectedTier.minGuests * selectedTier.pricePerPerson : 0
  const estimatedMax = selectedTier ? selectedTier.maxGuests * selectedTier.pricePerPerson : 0

  useEffect(() => {
    async function fetchAvailability() {
      setIsLoadingAvailability(true)
      try {
        const res = await fetch('/api/booking')
        if (res.ok) {
          const data = await res.json()
          // Expect array of "YYYY-MM-DD"
          setBookedDates(data.bookedDates || [])
        }
      } catch (e) {
        console.error("Failed to fetch calendar availability", e)
      } finally {
        setIsLoadingAvailability(false)
      }
    }
    fetchAvailability()
  }, [currentMonth])

  // Helper to get YYYY-MM-DD string from a year/month/day
  // This avoids timezone issues completely by string concatenation
  const getDateString = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()

    const days: (number | null)[] = []
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const isDateBooked = (day: number) => {
    const dateString = getDateString(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return bookedDates.includes(dateString)
  }

  const isDatePast = (day: number) => {
    const today = new Date()
    // Compare strictly by date string to avoid time issues
    const checkString = getDateString(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const todayString = getDateString(today.getFullYear(), today.getMonth(), today.getDate())
    return checkString < todayString
  }

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    )
  }

  const handleDateClick = (day: number) => {
    if (!isDateBooked(day) && !isDatePast(day)) {
      setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))
    }
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const prevMonth = () => {
    const today = new Date()
    const prevMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    // Simple check: don't go back before current month
    if (prevMonthDate.getFullYear() > today.getFullYear() ||
      (prevMonthDate.getFullYear() === today.getFullYear() && prevMonthDate.getMonth() >= today.getMonth())) {
      setCurrentMonth(prevMonthDate)
    }
  }

  const handleSubmit = async () => {
    if (!selectedDate || !eventType || !guestCount || !timeSlot || !contactName || !contactEmail) return

    setIsSubmitting(true)

    // Construct date string manually for submission
    const submissionDate = getDateString(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: submissionDate, // Send "YYYY-MM-DD"
          eventType,
          guestCount,
          timeSlot,
          venue,
          contactName,
          contactEmail,
          contactPhone,
          specialRequests
        })
      })

      if (res.ok) {
        setIsSubmitted(true)
        // Refresh availability
        const refreshRes = await fetch('/api/booking')
        if (refreshRes.ok) {
          const data = await refreshRes.json()
          setBookedDates(data.bookedDates || [])
        }
      } else {
        const errorData = await res.json()
        alert(errorData.error || "There was an error processing your booking. Please try again.")
      }
    } catch (e) {
      alert("Network error. Please check your connection.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setSelectedDate(null)
    setEventType(null)
    setGuestCount(null)
    setTimeSlot(null)
    setVenue("")
    setSpecialRequests("")
    setContactName("")
    setContactEmail("")
    setContactPhone("")
    setIsSubmitted(false)
  }

  const days = getDaysInMonth(currentMonth)
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ]

  const canGoBack = () => {
    const today = new Date()
    const firstDayCurrent = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    const firstDayToday = new Date(today.getFullYear(), today.getMonth(), 1)
    return firstDayCurrent > firstDayToday
  }

  if (isSubmitted) {
    return (
      <section id="booking" className="py-24 bg-[#faf8f5]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center bg-white rounded-2xl p-12 shadow-lg"
          >
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-[#2d5a47]" />
            </div>
            <h3 className="font-serif text-3xl text-[#1a1a1a] mb-4">Reservation Requested</h3>
            <p className="text-[#666666] mb-2">
              Thank you for choosing <span className="font-semibold">RegAl</span>
            </p>
            <p className="text-[#666666] mb-6">
              We&apos;ll confirm your booking for{" "}
              <span className="font-semibold text-[#1a1a1a]">
                {selectedDate?.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </span>{" "}
              within 24 hours.
            </p>
            {selectedTier && (
              <p className="text-[#5a7a6a] font-medium mb-6">
                Estimated Total: ${estimatedMin.toLocaleString()} - ${estimatedMax.toLocaleString()}
              </p>
            )}
            <button
              onClick={resetForm}
              className="px-8 py-3 bg-[#2d5a47] text-white rounded-lg hover:bg-[#1e4a37] transition-colors"
            >
              Book Another Event
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="booking" className="py-24 bg-[#faf8f5]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#5a7a6a] font-medium tracking-widest uppercase text-sm">Reserve Your Experience</span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] mt-4 mb-6">Book the Cart</h2>
          <p className="text-[#666666] max-w-2xl mx-auto">
            Select your date and let us craft an unforgettable grazing experience for your guests.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calendar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevMonth}
                  disabled={!canGoBack()}
                  className={`p-2 rounded-lg transition-colors ${canGoBack() ? "hover:bg-[#f5f3f0] text-[#1a1a1a]" : "text-[#cccccc] cursor-not-allowed"
                    }`}
                >
                  <ChevronLeft size={20} />
                </button>
                <h3 className="font-serif text-xl text-[#1a1a1a]">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <button
                  onClick={nextMonth}
                  className="p-2 rounded-lg hover:bg-[#f5f3f0] text-[#1a1a1a] transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-[#999999] py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 relative">
                {isLoadingAvailability && (
                  <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-[#5a7a6a]" />
                  </div>
                )}
                {days.map((day, index) => (
                  <div key={index} className="aspect-square p-0.5">
                    {day !== null && (
                      <button
                        onClick={() => handleDateClick(day)}
                        disabled={isDateBooked(day) || isDatePast(day)}
                        className={`w-full h-full rounded-lg text-sm font-medium transition-all flex items-center justify-center relative ${isDateSelected(day)
                          ? "bg-[#2d5a47] text-white shadow-md"
                          : isDateBooked(day)
                            ? "bg-red-50 text-red-300 cursor-not-allowed line-through"
                            : isDatePast(day)
                              ? "text-[#cccccc] cursor-not-allowed"
                              : "text-[#1a1a1a] hover:bg-[#2d5a47]/10 border border-transparent hover:border-[#2d5a47]/30"
                          }`}
                      >
                        {day}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-[#e8e4de]">
                <div className="flex items-center gap-2 text-xs text-[#666666]">
                  <div className="w-4 h-4 rounded bg-[#2d5a47]"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#666666]">
                  <div className="w-4 h-4 rounded bg-red-50 border border-red-200"></div>
                  <span>Booked</span>
                </div>
              </div>
            </motion.div>

            {/* Booking Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <AnimatePresence mode="wait">
                {!selectedDate ? (
                  <motion.div
                    key="select-date"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center py-12"
                  >
                    <Calendar className="w-16 h-16 text-[#5a7a6a]/30 mb-4" />
                    <h4 className="font-serif text-xl text-[#1a1a1a] mb-2">Select a Date</h4>
                    <p className="text-[#666666] text-sm">Choose your preferred date from the calendar to continue</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="booking-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {/* Selected Date Display */}
                    <div className="bg-[#f5f3f0] rounded-xl p-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#2d5a47] rounded-lg flex items-center justify-center text-white font-serif text-xl">
                          {selectedDate.getDate()}
                        </div>
                        <div>
                          <p className="font-medium text-[#1a1a1a]">
                            {selectedDate.toLocaleDateString("en-US", { weekday: "long" })}
                          </p>
                          <p className="text-sm text-[#666666]">
                            {selectedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Event Type */}
                    <div className="mb-6">
                      <label className="flex items-center gap-2 text-[#1a1a1a] font-medium mb-3 text-sm">
                        <Sparkles size={16} className="text-[#5a7a6a]" />
                        Event Type
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {eventTypes.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => setEventType(type.id)}
                            className={`p-3 rounded-lg border-2 transition-all text-sm ${eventType === type.id
                              ? "border-[#2d5a47] bg-emerald-50 text-[#1a1a1a]"
                              : "border-[#e8e4de] hover:border-[#5a7a6a] text-[#666666]"
                              }`}
                          >
                            <span className="mr-2">{type.icon}</span>
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="flex items-center gap-2 text-[#1a1a1a] font-medium mb-3 text-sm">
                        <Users size={16} className="text-[#5a7a6a]" />
                        Guest Count & Pricing
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {pricingTiers.map((tier) => (
                          <button
                            key={tier.id}
                            onClick={() => setGuestCount(tier.id)}
                            className={`p-3 rounded-lg border-2 transition-all text-left ${guestCount === tier.id
                              ? "border-[#2d5a47] bg-emerald-50"
                              : "border-[#e8e4de] hover:border-[#5a7a6a]"
                              }`}
                          >
                            <span
                              className={`block text-sm font-medium ${guestCount === tier.id ? "text-[#1a1a1a]" : "text-[#666666]"}`}
                            >
                              {tier.label}
                            </span>
                            <span
                              className={`block text-xs mt-0.5 ${guestCount === tier.id ? "text-[#2d5a47]" : "text-[#999999]"}`}
                            >
                              ${tier.pricePerPerson}/person
                            </span>
                          </button>
                        ))}
                      </div>
                      {/* Estimated Total */}
                      {selectedTier && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-3 p-3 bg-[#2d5a47]/5 rounded-lg border border-[#2d5a47]/20"
                        >
                          <p className="text-sm text-[#1a1a1a]">
                            <span className="text-[#666666]">Estimated Total:</span>{" "}
                            <span className="font-semibold">
                              ${estimatedMin.toLocaleString()} - ${estimatedMax.toLocaleString()}
                            </span>
                          </p>
                        </motion.div>
                      )}
                    </div>

                    {/* Time Slot */}
                    <div className="mb-6">
                      <label className="flex items-center gap-2 text-[#1a1a1a] font-medium mb-3 text-sm">
                        <Clock size={16} className="text-[#5a7a6a]" />
                        Preferred Time
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.id}
                            onClick={() => setTimeSlot(slot.id)}
                            className={`p-3 rounded-lg border-2 transition-all text-center ${timeSlot === slot.id
                              ? "border-[#2d5a47] bg-emerald-50 text-[#1a1a1a]"
                              : "border-[#e8e4de] hover:border-[#5a7a6a] text-[#666666]"
                              }`}
                          >
                            <span className="block text-sm font-medium">{slot.label}</span>
                            <span className="block text-xs text-[#999999] mt-0.5">{slot.time}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Venue */}
                    <div className="mb-6">
                      <label className="flex items-center gap-2 text-[#1a1a1a] font-medium mb-3 text-sm">
                        <MapPin size={16} className="text-[#5a7a6a]" />
                        Venue Location
                      </label>
                      <Input
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        placeholder="Enter venue address"
                        className="border-[#e8e4de] focus:border-[#5a7a6a] focus:ring-[#5a7a6a]/20"
                      />
                    </div>

                    {/* Contact Info */}
                    <div className="mb-6">
                      <label className="text-[#1a1a1a] font-medium mb-3 text-sm block">Contact Information</label>
                      <div className="space-y-3">
                        <Input
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Your name"
                          className="border-[#e8e4de] focus:border-[#5a7a6a] focus:ring-[#5a7a6a]/20"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            type="email"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            placeholder="Email"
                            className="border-[#e8e4de] focus:border-[#5a7a6a] focus:ring-[#5a7a6a]/20"
                          />
                          <Input
                            type="tel"
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                            placeholder="Phone"
                            className="border-[#e8e4de] focus:border-[#5a7a6a] focus:ring-[#5a7a6a]/20"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div className="mb-6">
                      <label className="text-[#1a1a1a] font-medium mb-3 text-sm block">
                        Special Requests / Dietary Notes
                      </label>
                      <Textarea
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Allergies, dietary restrictions, special requests..."
                        rows={3}
                        className="border-[#e8e4de] focus:border-[#5a7a6a] focus:ring-[#5a7a6a]/20 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting || !eventType || !guestCount || !timeSlot || !contactName || !contactEmail}
                      className={`w-full py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${eventType && guestCount && timeSlot && contactName && contactEmail && !isSubmitting
                        ? "bg-[#2d5a47] text-white hover:bg-[#1e4a37] shadow-lg hover:shadow-xl"
                        : "bg-[#e8e4de] text-[#999999] cursor-not-allowed"
                        }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin w-5 h-5" />
                          Processing...
                        </>
                      ) : (
                        "Request Reservation"
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}