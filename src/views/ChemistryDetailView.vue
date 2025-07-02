<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import APIRequest from "@/utils/request";

const route = useRoute();
const loading = ref(true);
const chemData = ref();

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

onMounted(async () => {
    let url = `/chemistry/detail/${route.params.cid}/`;
    try {
        const response = await APIRequest({ url: url, method: "get" });
        chemData.value = response.data;
    } catch (err) {
        console.error(err);
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <div v-if="loading">加载中...</div>
    <div v-else class="chem-detail">
        <div id="left">
            <div class="flex justify-center">
                <!-- <img :src="chemData.image_url" alt="chem-img" class="chem-img large" /> -->
                <p>图片占位符</p>
            </div>
            <h3>{{ chemData.name_cn }}</h3>
            <h3>{{ chemData.name_en }}</h3>
            <div></div>
        </div>
        <ul id="right">
            <li v-for="(val, key) in chemData" :key="key">
                <h5 class="text-left">{{ key }}</h5>
                <p class="text-right break-all">{{ val }}</p>
            </li>
        </ul>
    </div>

    <p id="to-top" @click="scrollToTop"><span class="material-symbols-sharp">arrow_upward</span>回到顶部</p>
</template>

<style scoped>
@reference "tailwindcss";

.chem-img.large {
    @apply size-64 max-w-64;
}

.chem-detail {
    @apply flex flex-col gap-4 md:flex-row;
}
.chem-detail #left {
    @apply flex w-full flex-col gap-3 text-center break-words md:w-96;
}
.chem-detail #right {
    @apply w-full divide-y *:px-3 *:py-1 md:w-[calc(100%-25rem)];
}

#to-top {
    @apply mt-4 flex w-max cursor-pointer items-center justify-start rounded-md border border-solid border-yellow-500 px-1.5 py-1 select-none;
}
</style>
