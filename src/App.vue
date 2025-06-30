<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <header>
        <nav class="navbar">
            <h3>有机化学与食品安全科普平台</h3>
            <ul class="urls-menu">
                <li>
                    <router-link :to="{ name: 'Index' }">
                        <span class="material-symbols-sharp">home</span>
                        首页
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name:'ChemistryDatabase' }">
                        <span class="material-symbols-sharp">view_kanban</span>
                        科普专题
                    </router-link>
                </li>
                <li>
                    <a href="">
                        <span class="material-symbols-sharp">account_circle</span>
                        用户中心
                    </a>
                </li>
                <li>
                    <a href="">
                        <span class="material-symbols-sharp">rss_feed</span>
                        有机化学论坛
                    </a>
                </li>
            </ul>
        </nav>
    </header>

    <div class="p-3 md:p-4 lg:p-5">
        <RouterView />
    </div>
</template>

<style scoped>
@reference "tailwindcss";

.material-symbols-sharp {
    @apply select-none;
}

header {
    @apply relative z-10 h-full;
}

.navbar {
    @apply flex w-full flex-row flex-wrap items-center justify-between px-3 py-3 md:flex-nowrap md:px-4 lg:px-5;
}

.urls-menu {
    @apply mt-2 flex flex-col gap-2 md:mt-0 md:flex-row;
}

.urls-menu li a {
    @apply flex w-full flex-nowrap items-center gap-1 overflow-hidden text-nowrap rounded-md px-3 py-2 text-lg hover:bg-blue-300/50 hover:text-blue-600;
}
</style>
