<template>
    <div>
        <h1 class="title">Menu</h1>
        <div class="category mt-10">
            <ul class="list-none flex flex-row w-full cursor-pointer">
                <li
                    class="p-2 border border-gray-400 bg-gray-50 grow text-center"
                    :class="{ 'bg-blue-200': activeCategory === 'all' }"
                    @click="filter('all')"
                >
                    All Menu
                </li>
                <li
                    class="p-2 border border-gray-400 bg-gray-50 grow text-center"
                    :class="{ 'bg-blue-200': activeCategory === 'coffee' }"
                    @click="filter('coffee')"
                >
                    Coffee
                </li>
                <li
                    class="p-2 border border-gray-400 bg-gray-50 grow text-center"
                    :class="{ 'bg-blue-200': activeCategory === 'tea' }"
                    @click="filter('tea')"
                >
                    Tea
                </li>
                <li
                    class="p-2 border border-gray-400 bg-gray-50 grow text-center"
                    :class="{ 'bg-blue-200': activeCategory === 'milk' }"
                    @click="filter('milk')"
                >
                    Milk
                </li>
                <li
                    class="p-2 border border-gray-400 bg-gray-50 grow text-center"
                    :class="{ 'bg-blue-200': activeCategory === 'juice' }"
                    @click="filter('juice')"
                >
                    Juice
                </li>
            </ul>
        </div>
        <div class="menu mt-10">
            <div class="grid grid-cols-4 gap-4">
                <div
                    v-for="product in products"
                    :key="product.name"
                    class="shadow-lg rounded-lg overflow-hidden"
                    :class="{
                        'border-4 border-red-400 relative': isAdd(product.name),
                    }"
                    @click="
                        addToCart(product.name, product.price, product.imgfile)
                    "
                >
                    <div
                        v-if="isAdd(product.name)"
                        class="counter rounded-full bg-red-400 absolute top-2 right-2 w-[25px]"
                    >
                        <p class="text-center text-white">
                            {{ getCount(product.name) }}
                        </p>
                    </div>
                    <div class="img-container">
                        <img
                            :src="product.imgfile"
                            :alt="product.name"
                            class="w-[200px] h-[150px] object-cover"
                        />
                    </div>
                    <div class="name font-mono my-2 text-center">
                        <p>{{ product.name }}</p>
                    </div>
                    <div class="price font-mono font-bold my-2 text-center">
                        <p>{{ product.price }}$</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useMenuStore } from "../stores/MenuStore";
import { storeToRefs } from "pinia";

// Get and declare data from menu store file
const menuStore = useMenuStore();
const { menu, order, totalCost } = storeToRefs(menuStore);

const products = ref(menu.value);
const activeCategory = ref("all");

// Filter by category
const filter = (categoryName) => {
    activeCategory.value = categoryName;

    if (categoryName === "all") {
        products.value = menu.value;
    } else {
        const filteredProducts = menu.value.filter((product) => {
            return product.category === categoryName;
        });
        products.value = filteredProducts;
    }
};

const isAdd = (productName) => {
    return order.value.some((product) => product.name === productName);
};

const getCount = (productName) => {
    const productInOrder = order.value.find(
        (product) => product.name === productName,
    );
    return productInOrder ? productInOrder.count : 0;
};

// Function to add product to the cart
const addToCart = (orderName, orderPrice, orderImg) => {
    const productInOrder = order.value.find(
        (product) => product.name === orderName,
    );

    if (productInOrder) {
        productInOrder.count++;
        productInOrder.price *= productInOrder.count;
    } else {
        order.value.push({
            name: orderName,
            price: orderPrice,
            img: orderImg,
            count: 1,
        });
    }
    menuStore.getTotalCost();
};
</script>

<style scoped>
/* Add your scoped styles here */
.bg-blue-200 {
    background-color: #bfdbfe; /* Light blue color for active state */
}
</style>
