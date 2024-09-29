<template>
    <div class="">
        <div
            class="flex flex-row justify-between grow items-center border-b-2 border-gray-100 pb-10 mb-10"
        >
            <h1 class="title">Order Detail</h1>
            <div>
                <p
                    class="text-red-700 font-semibold cursor-pointer"
                    @click="cancelOrder"
                >
                    Cancel Order
                </p>
            </div>
        </div>
        <div class="min-h-[350px]">
            <div
                id="orders"
                class="ms-2"
                v-for="product in order"
                :key="product.name"
            >
                <div class="flex flex-row items-center">
                    <div class="me-5">
                        <img
                            :src="product.img"
                            alt=""
                            class="w-[50px] h-[50px]"
                        />
                    </div>
                    <div class="Description grow">
                        <div class="name font-mono my-2 text-left">
                            <p>{{ product.name }}</p>
                        </div>
                        <div class="price font-mono font-bold my-2 text-left">
                            <p>{{ product.price }}$</p>
                        </div>
                    </div>
                    <div class="count w-[100px]">
                        <div class="flex flex-row items-center">
                            <div
                                class="bg-black text-white p-2 text-center"
                                @click="reduceCount(product.name)"
                            >
                                <span class="text-1.2rem">-</span>
                            </div>
                            <div
                                class="countDisplay w-[50px] text-center mx-2 bg-gray-300 px-5"
                            >
                                <p class="h-[40px] flex flex-row items-center">
                                    {{ product.count }}
                                </p>
                            </div>
                            <div
                                class="bg-black text-white p-2 text-center"
                                @click="addCount(product.name)"
                            >
                                <span class="text-1.2rem">+</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="checkout border-t-2 border-gray-100 py-3 ps-2 flex flex-row justify-between"
        >
            <div>
                <p class="text-gray-500">Total Cost</p>
            </div>
            <div>
                <p class="text-gray-500">{{ totalCost }}$</p>
            </div>
        </div>
        <div
            class="bg-red-400 text-center py-4 text-[20px] cursor-pointer"
            @click="checkOut"
        >
            Checkout
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useMenuStore } from "../stores/MenuStore";
import { storeToRefs } from "pinia";

// Get and declare data from menu store file
const menuStore = useMenuStore();
const { menu, order, totalCost, isCheckOut } = storeToRefs(menuStore);

const cancelOrder = () => {
    order.value = [];
    menuStore.getTotalCost();
};

const addCount = (productName) => {
    console.log("addCount");
    const productInOrder = order.value.find(
        (product) => product.name === productName,
    );
    if (productInOrder) {
        productInOrder.count++;
        menuStore.getTotalCost();
    }
};

const reduceCount = (productName) => {
    console.log("reduceCount");
    const productInOrder = order.value.find(
        (product) => product.name === productName,
    );
    if (productInOrder) {
        productInOrder.count--; // Reduce the count
        if (productInOrder.count === 0) {
            const index = order.value.findIndex(
                (product) => product.name === productName,
            );
            if (index !== -1) {
                order.value.splice(index, 1); // Remove the product
            }
        }
    }
    menuStore.getTotalCost();
};

const checkOut = () => {
    isCheckOut.value = true; // Show alert when checkout is clicked
    order.value = []; // Clear the order
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>
