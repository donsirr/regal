"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Users,
  Sparkles,
  Heart,
  Building2,
  Check,
  ArrowRight,
  Clock,
  MapPin,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const eventTypes = [
  { id: "wedding", label: "Wedding", icon: Heart },
  { id: "corporate", label: "Corporate", icon: Building2 },
  { id: "private", label: "Private Party", icon: Sparkles },
  { id: "other", label: "Other", icon: Users },
]

const guestRanges = [
  { id: "small", label: "10-25 guests" },
  { id: "medium", label: "26-50 guests" },
  { id: "large", label: "51-100 guests" },
  { id: "xlarge", label: "100+ guests" },
]

const timeSlots = [
  { id: "morning", label: "Morning (9am-12pm)" },
  { id: "afternoon", label: "Afternoon (12pm-5pm)" },
  { id: "evening", label: "Evening (5pm-10pm)" },
]

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function BookingSection() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [guestCount, setGuestCount] = useState<string | null>(null)
  const [timeSlot, setTimeSlot] = useState<string | null>(null)
  const [venue, setVenue] = useState("")
  const [notes, setNotes] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const days: (number | null)[] = []
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const days = getDaysInMonth(currentMonth)
  const monthName = currentMonth.toLocaleString("default", { month: "long", year: "numeric" })

  const bookedDates = [5, 12, 18, 25]

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
    setSelectedDate(null)
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
    setSelectedDate(null)
  }

  const isCurrentMonth = () => {
    const now = new Date()
    return currentMonth.getMonth() === now.getMonth() && currentMonth.getFullYear() === now.getFullYear()
  }

  const isPastDay = (day: number) => {
    const now = new Date()
    if (currentMonth.getFullYear() < now.getFullYear()) return true
    if (currentMonth.getFullYear() > now.getFullYear()) return false
    if (currentMonth.getMonth() < now.getMonth()) return true
    if (currentMonth.getMonth() > now.getMonth()) return false
    return day < now.getDate()
  }

  const handleContinue = () => {
    if (selectedDate && selectedEvent) {
      setShowDetails(true)
    }
  }

  const handleSubmit = () => {
    if (selectedDate && selectedEvent && name && email) {
      setIsSubmitted(true)
    }
  }

  const handleReset = () => {
    setSelectedDate(null)
    setSelectedEvent(null)
    setIsSubmitted(false)
    setShowDetails(false)
    setGuestCount(null)
    setTimeSlot(null)
    setVenue("")
    setNotes("")
    setName("")
    setEmail("")
    setPhone("")
    setCurrentMonth(new Date())
  }

  const handleBack = () => {
    setShowDetails(false)
  }

  return (
    <section id="booking" className="py-20 md:py-32 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sage text-sm tracking-[0.2em] uppercase font-medium">Reserve Your Experience</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mt-3 mb-4">Book RegAl</h2>
          <p className="text-charcoal-light max-w-2xl mx-auto text-pretty">
            Select your event date and type to begin crafting your perfect grazing experience.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-xl mx-auto"
            >
              <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12 border border-border text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="text-sage" size={40} />
                </motion.div>
                <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-4">Request Received!</h3>
                <p className="text-charcoal-light mb-2">Thank you for your interest in RegAl.</p>
                <p className="text-charcoal-light mb-8">
                  We've noted your request for{" "}
                  <span className="font-medium text-charcoal">
                    {monthName.split(" ")[0]} {selectedDate}
                  </span>{" "}
                  for a{" "}
                  <span className="font-medium text-charcoal">
                    {eventTypes.find((e) => e.id === selectedEvent)?.label}
                  </span>{" "}
                  event. We'll be in touch within 24 hours to discuss your perfect grazing experience.
                </p>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleReset}
                  className="border-charcoal text-charcoal hover:bg-charcoal/5 bg-transparent"
                >
                  Book Another Date
                </Button>
              </div>
            </motion.div>
          ) : showDetails ? (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-card rounded-2xl shadow-lg p-6 md:p-10 border border-border">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-charcoal-light hover:text-charcoal transition-colors"
                  >
                    <ChevronLeft size={20} />
                    <span>Back</span>
                  </button>
                  <div className="text-right">
                    <p className="text-sm text-charcoal-light">Selected</p>
                    <p className="font-serif text-charcoal">
                      {monthName.split(" ")[0]} {selectedDate} • {eventTypes.find((e) => e.id === selectedEvent)?.label}
                    </p>
                  </div>
                </div>

                <h3 className="font-serif text-2xl text-charcoal mb-8">Event Details</h3>

                {/* Guest Count - Updated all colors to sage */}
                <div className="mb-8">
                  <label className="flex items-center gap-2 text-charcoal font-medium mb-4">
                    <Users size={18} className="text-sage" />
                    Expected Guests
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {guestRanges.map((range) => (
                      <button
                        key={range.id}
                        onClick={() => setGuestCount(range.id)}
                        className={`p-3 rounded-lg border-2 transition-all text-sm ${guestCount === range.id
                            ? "border-sage bg-sage/5 text-charcoal"
                            : "border-border hover:border-sage-light text-charcoal-light"
                          }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slot */}
                <div className="mb-8">
                  <label className="flex items-center gap-2 text-charcoal font-medium mb-4">
                    <Clock size={18} className="text-sage" />
                    Preferred Time
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => setTimeSlot(slot.id)}
                        className={`p-3 rounded-lg border-2 transition-all text-sm ${timeSlot === slot.id
                            ? "border-sage bg-sage/5 text-charcoal"
                            : "border-border hover:border-sage-light text-charcoal-light"
                          }`}
                      >
                        {slot.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Venue */}
                <div className="mb-8">
                  <label className="flex items-center gap-2 text-charcoal font-medium mb-4">
                    <MapPin size={18} className="text-sage" />
                    Venue Location
                  </label>
                  <Input
                    placeholder="Enter venue name or address"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    className="bg-background border-border focus:border-sage"
                  />
                </div>

                {/* Special Requests */}
                <div className="mb-8">
                  <label className="flex items-center gap-2 text-charcoal font-medium mb-4">
                    <MessageSquare size={18} className="text-sage" />
                    Special Requests or Dietary Notes
                  </label>
                  <Textarea
                    placeholder="Any allergies, dietary restrictions, or special requests?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="bg-background border-border focus:border-sage min-h-[100px]"
                  />
                </div>

                {/* Contact Information */}
                <div className="mb-8 pt-6 border-t border-border">
                  <h4 className="font-serif text-xl text-charcoal mb-6">Contact Information</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-charcoal-light mb-2 block">Full Name *</label>
                      <Input
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-background border-border focus:border-sage"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-charcoal-light mb-2 block">Email *</label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-background border-border focus:border-sage"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm text-charcoal-light mb-2 block">Phone Number</label>
                      <Input
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-background border-border focus:border-sage"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit - Updated button to forest green */}
                <Button
                  size="lg"
                  disabled={!name || !email}
                  onClick={handleSubmit}
                  className="w-full bg-forest hover:bg-sage-dark text-cream font-medium py-6 disabled:opacity-50"
                >
                  Submit Request
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid lg:grid-cols-2 gap-8 lg:gap-12"
            >
              {/* Date Picker */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 border border-border">
                  <div className="flex items-center justify-between mb-6">
                    <button
                      className="p-2 hover:bg-muted rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      onClick={goToPreviousMonth}
                      disabled={isCurrentMonth()}
                      aria-label="Previous month"
                    >
                      <ChevronLeft className="text-charcoal" size={20} />
                    </button>
                    <div className="flex items-center gap-2">
                      <Calendar className="text-sage" size={20} />
                      <span className="font-serif text-lg text-charcoal">{monthName}</span>
                    </div>
                    <button
                      className="p-2 hover:bg-muted rounded-full transition-colors"
                      onClick={goToNextMonth}
                      aria-label="Next month"
                    >
                      <ChevronRight className="text-charcoal" size={20} />
                    </button>
                  </div>

                  {/* Days Header */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {daysOfWeek.map((day) => (
                      <div key={day} className="text-center text-charcoal-light text-sm py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid - Updated selected ring to sage */}
                  <div className="grid grid-cols-7 gap-1">
                    {days.map((day, index) => {
                      const isBooked = day && bookedDates.includes(day)
                      const isSelected = day === selectedDate
                      const isPast = day ? isPastDay(day) : false
                      const isAvailable = day && !isBooked && !isPast && !isSelected

                      return (
                        <button
                          key={index}
                          disabled={!day || isBooked || isPast}
                          onClick={() => day && setSelectedDate(day)}
                          className={`
                            aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all relative
                            ${!day ? "invisible" : ""}
                            ${isSelected ? "bg-charcoal text-cream shadow-md ring-2 ring-sage" : ""}
                            ${isPast && !isBooked ? "text-charcoal/30 cursor-not-allowed" : ""}
                          `}
                        >
                          {isBooked && (
                            <>
                              <span className="text-red-400 line-through">{day}</span>
                              <span className="absolute inset-0 flex items-center justify-center">
                                <span className="w-full h-[2px] bg-red-400/60 rotate-[-15deg]" />
                              </span>
                            </>
                          )}
                          {isPast && !isBooked && day}
                          {isAvailable && (
                            <>
                              <span className="text-charcoal">{day}</span>
                              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            </>
                          )}
                          {isSelected && day}
                        </button>
                      )
                    })}
                  </div>

                  {/* Legend - Updated selected indicator to sage ring */}
                  <div className="flex items-center gap-6 mt-6 pt-6 border-t border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="text-sm text-charcoal-light">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <span className="text-sm text-charcoal-light">Booked</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-charcoal ring-2 ring-sage" />
                      <span className="text-sm text-charcoal-light">Selected</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Event Type Selector */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 border border-border h-full flex flex-col">
                  <h3 className="font-serif text-xl text-charcoal mb-6">What's the occasion?</h3>

                  <div className="grid grid-cols-2 gap-4 flex-1">
                    {eventTypes.map((event) => {
                      const Icon = event.icon
                      const isSelected = selectedEvent === event.id

                      return (
                        <motion.button
                          key={event.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedEvent(event.id)}
                          className={`
                            p-6 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-3
                            ${isSelected
                              ? "border-sage bg-sage/5 shadow-md"
                              : "border-border hover:border-sage-light hover:bg-muted/50"
                            }
                          `}
                        >
                          <Icon className={isSelected ? "text-sage" : "text-charcoal-light"} size={28} />
                          <span className={`font-medium ${isSelected ? "text-charcoal" : "text-charcoal-light"}`}>
                            {event.label}
                          </span>
                        </motion.button>
                      )
                    })}
                  </div>

                  {/* CTA - Updated button to forest green */}
                  <div className="mt-8 pt-6 border-t border-border">
                    <Button
                      size="lg"
                      disabled={!selectedDate || !selectedEvent}
                      onClick={handleContinue}
                      className="w-full bg-forest hover:bg-sage-dark text-cream font-medium py-6 disabled:opacity-50"
                    >
                      Continue
                      <ArrowRight size={18} className="ml-2" />
                    </Button>
                    {selectedDate && selectedEvent && (
                      <p className="text-center text-charcoal-light text-sm mt-4">
                        {monthName.split(" ")[0]} {selectedDate} •{" "}
                        {eventTypes.find((e) => e.id === selectedEvent)?.label}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
