<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
</script>

<template>
    <Disclosure as="header" v-slot="{ open }">
        <div class="navbar">
            <div class="lt-div">
                <DisclosureButton class="lt-btn">
                    <span>toggle</span>
                </DisclosureButton>
            </div>
            <div class="ct-div">
                <ul class="urls-menu">
                    <li>
                        <router-link :to="{ name: 'Index' }">首页</router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'ChemistryDatabase' }">科普专题</router-link>
                    </li>
                    <li>
                        <a href="">用户中心</a>
                    </li>
                    <li>
                        <a href="">有机化学论坛</a>
                    </li>
                </ul>
            </div>

            <div class="rt-div">
                <Menu as="div">
                    <MenuButton as="div" class="nav-user">
                        <h4>游客</h4>
                        <!-- <img src="" alt="avatar" /> -->
                        <p>图片占位符</p>
                    </MenuButton>
                    <transition
                        enter-active-class="transition ease-out duration-200"
                        enter-from-class="transform opacity-0 scale-95"
                        enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95">
                        <MenuItems as="ul" class="dropdown-menu">
                            <MenuItem as="li">
                                <a href="">登录</a>
                            </MenuItem>
                            <MenuItem as="li">
                                <a href="">注册</a>
                            </MenuItem>
                        </MenuItems>
                    </transition>
                </Menu>
            </div>
        </div>

        <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="translate-y-1 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="translate-y-1 opacity-0">
            <DisclosurePanel class="md:hidden">
                <ul class="urls-menu-2">
                    <li>
                        <router-link :to="{ name: 'Index' }">首页</router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'ChemistryDatabase' }">科普专题</router-link>
                    </li>
                    <li>
                        <a href="">用户中心</a>
                    </li>
                    <li>
                        <a href="">有机化学论坛</a>
                    </li>
                </ul>
            </DisclosurePanel>
        </transition>
    </Disclosure>

    <div class="p-3 md:p-4 lg:p-5">
        <RouterView />
    </div>
</template>

<style scoped>
@reference "tailwindcss";

header {
    @apply relative z-10 bg-neutral-100 text-black shadow-sm;
}

.navbar {
    @apply flex h-16 w-full items-center justify-between px-3 py-3 md:px-4 lg:px-5;
}
.navbar .lt-div {
    @apply flex items-center md:hidden;
}
.navbar .ct-div {
    @apply flex flex-1 items-center justify-center md:items-stretch md:justify-start;
}
.navbar .rt-div {
    @apply flex items-center;
}

.lt-div .lt-btn {
    @apply inline-flex cursor-pointer items-center justify-center rounded-md border-2 border-solid border-gray-400 p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-500;
}

.urls-menu {
    @apply hidden flex-row gap-2 md:flex;
}
.urls-menu li a {
    @apply inline-flex w-full flex-nowrap items-center overflow-hidden rounded-md border-transparent px-3 py-2 text-lg text-nowrap hover:border-gray-300 hover:bg-blue-300/50 hover:text-blue-600;
}

.nav-user {
    @apply flex items-center gap-3 select-none;
}
.nav-user h4 {
    @apply w-full text-nowrap;
}
.nav-user img {
    @apply size-10 rounded-full border border-solid border-black/75;
}

.dropdown-menu {
    @apply absolute right-0 z-10 my-2 w-36 origin-top-right rounded-md bg-white py-2 shadow-md ring-1 ring-black/5 focus:outline-hidden;
}
.dropdown-menu li a {
    @apply inline-flex w-full flex-nowrap items-center overflow-hidden px-3 py-2 text-nowrap hover:bg-blue-300/50 hover:text-blue-600;
}

.urls-menu-2 {
    @apply flex flex-col gap-2;
}
.urls-menu-2 li a {
    @apply inline-flex w-full flex-nowrap items-center overflow-hidden rounded-md border-transparent px-3 py-2 text-nowrap hover:border-gray-300 hover:bg-blue-300/50 hover:text-blue-600;
}
</style>
