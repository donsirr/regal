export interface MenuItem {
  name: string
  description?: string
  image: string
}

export interface MenuStation {
  title: string
  items: MenuItem[]
}

export const menuData: Record<string, MenuStation> = {
  meats: {
    title: "Cured Meats",
    items: [
      { name: "Prosciutto di Parma", description: "24-month aged", image: "/thin-sliced-prosciutto-ham.jpg" },
      { name: "Spicy Calabrese", description: "Calabrian chili", image: "/spicy-salami-sliced.jpg" },
      { name: "Coppa Stagionata", description: "Dry-cured pork", image: "/coppa-cured-meat-sliced.jpg" },
      { name: "Bresaola", description: "Air-dried beef", image: "/bresaola-beef-sliced.jpg" },
      { name: "Mortadella", description: "Pistachio studded", image: "/mortadella-sliced.jpg" },
    ],
  },
  cheeses: {
    title: "Artisan Cheeses",
    items: [
      { name: "Aged Manchego", description: "12-month aged", image: "/aged-manchego-cheese-wedge.jpg" },
      { name: "Truffle Brie", description: "Black truffle", image: "/creamy-brie-cheese-wheel.jpg" },
      { name: "Gorgonzola Dolce", description: "Sweet & creamy", image: "/blue-gorgonzola-cheese.jpg" },
      { name: "Aged Gouda", description: "Dutch import", image: "/aged-gouda-cheese-wedge.jpg" },
      { name: "Fresh Burrata", description: "Daily made", image: "/fresh-burrata-cheese.jpg" },
    ],
  },
  accoutrements: {
    title: "Accoutrements",
    items: [
      { name: "Fig Preserves", description: "House-made", image: "/fig-jam-preserves-jar.jpg" },
      { name: "Honeycomb", description: "Local apiary", image: "/golden-honeycomb.jpg" },
      { name: "Marcona Almonds", description: "Spanish roasted", image: "/marcona-almonds-bowl.jpg" },
      { name: "Cornichons", description: "French style", image: "/cornichons-pickles.jpg" },
      { name: "Grissini", description: "Hand-rolled", image: "/italian-breadsticks-grissini.jpg" },
    ],
  },
}

export const pricingTiers = [
  { id: "small", label: "10-25 guests", pricePerPerson: 45, minGuests: 10, maxGuests: 25 },
  { id: "medium", label: "26-50 guests", pricePerPerson: 40, minGuests: 26, maxGuests: 50 },
  { id: "large", label: "51-100 guests", pricePerPerson: 35, minGuests: 51, maxGuests: 100 },
  { id: "xlarge", label: "100+ guests", pricePerPerson: 30, minGuests: 100, maxGuests: 250 },
]
