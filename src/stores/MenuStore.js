import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", () => {
  const menu = ref([
    {
      name: "Beaten Coffee",
      imgfile: "/src/menuImg/beatenCoffee.jpeg",
      price: 32,
      category: "coffee",
    },
    {
      name: "Black Coffee",
      imgfile: "/src/menuImg/blackCoffee.jpeg",
      price: 35,
      category: "coffee",
    },
    {
      name: "Caffeine Coffee",
      imgfile: "/src/menuImg/caffeine.webp",
      price: 25,
      category: "coffee",
    },
    {
      name: "Latte",
      imgfile: "/src/menuImg/latte.jpg",
      price: 40,
      category: "coffee",
    },
    {
      name: "Mocha",
      imgfile: "/src/menuImg/mocha.jpg",
      price: 43,
      category: "coffee",
    },
    {
      name: "Apple",
      imgfile: "/src/menuImg/apple.jpg",
      price: 15,
      category: "juice",
    },
    {
      name: "Orange",
      imgfile: "/src/menuImg/orange.jpg",
      price: 23,
      category: "juice",
    },
    {
      name: "Pineapple",
      imgfile: "/src/menuImg/pineapple.jpeg",
      price: 32,
      category: "juice",
    },
    {
      name: "Strawberry",
      imgfile: "/src/menuImg/strawberry.jpg",
      price: 43,
      category: "juice",
    },
    {
      name: "Chocolate Milk",
      imgfile: "/src/menuImg/chocoMilk.jpeg",
      price: 52,
      category: "milk",
    },
    {
      name: "Goat Milk",
      imgfile: "/src/menuImg/goatMilk.avif",
      price: 43,
      category: "milk",
    },
    {
      name: "Soy Milk",
      imgfile: "/src/menuImg/soyMilk.jpeg",
      price: 43,
      category: "milk",
    },
    {
      name: "Masala Chai",
      imgfile: "/src/menuImg/masalaChai.webp",
      price: 43,
      category: "tea",
    },
    {
      name: "Green Tea",
      imgfile: "/src/menuImg/greenTea.jpeg",
      price: 43,
      category: "tea",
    },
  ]);

  const order = ref([]);

  const totalCost = ref(0);
  const isCheckOut = ref(false);

  const getTotalCost = () => {
    totalCost.value = 0; // Reset totalCost to 0 before calculation
    order.value.forEach((product) => {
      // Use forEach (correct spelling)
      totalCost.value += product.price; // Calculate total cost based on price and count
    });
  };

  return { menu, order, totalCost, getTotalCost, isCheckOut };
});
