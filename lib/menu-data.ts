export interface MenuItem {
  name: string
  price: string
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
      { name: "Prosciutto di Parma", price: "$18", image: "/thin-sliced-prosciutto-ham.jpg" },
      { name: "Spicy Calabrese", price: "$14", image: "/spicy-salami-sliced.jpg" },
      { name: "Coppa Stagionata", price: "$16", image: "/coppa-cured-meat-sliced.jpg" },
      { name: "Bresaola", price: "$20", image: "/bresaola-beef-sliced.jpg" },
      { name: "Mortadella", price: "$12", image: "/mortadella-sliced.jpg" },
    ],
  },
  cheeses: {
    title: "Artisan Cheeses",
    items: [
      { name: "Aged Manchego", price: "$16", image: "/aged-manchego-cheese-wedge.jpg" },
      { name: "Truffle Brie", price: "$22", image: "/creamy-brie-cheese-wheel.jpg" },
      { name: "Gorgonzola Dolce", price: "$18", image: "/blue-gorgonzola-cheese.jpg" },
      { name: "Aged Gouda", price: "$15", image: "/aged-gouda-cheese-wedge.jpg" },
      { name: "Fresh Burrata", price: "$24", image: "/fresh-burrata-cheese.jpg" },
    ],
  },
  accoutrements: {
    title: "Accoutrements",
    items: [
      { name: "Fig Preserves", price: "$8", image: "/fig-jam-preserves-jar.jpg" },
      { name: "Honeycomb", price: "$12", image: "/golden-honeycomb.jpg" },
      { name: "Marcona Almonds", price: "$10", image: "/marcona-almonds-bowl.jpg" },
      { name: "Cornichons", price: "$7", image: "/cornichons-pickles.jpg" },
      { name: "Grissini", price: "$6", image: "/italian-breadsticks-grissini.jpg" },
    ],
  },
}
