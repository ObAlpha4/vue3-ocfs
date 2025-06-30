<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { getDataFromUrl } from "./api";

const showToTop = ref(false);
const route = useRoute();
const loading = ref(true);
const chemData = ref(null);

function checkHeight() {
    if (document.documentElement.scrollHeight > window.innerHeight) {
        showToTop.value = true;
    }
}
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

onMounted(async () => {
    let url = `/chemistry/detail/${route.params.cid}/`;
    try {
        const response = await getDataFromUrl(url);
        chemData.value = response.data;
    } catch (err) {
        console.error(err);
    } finally {
        loading.value = false;
    }
    checkHeight();
});
</script>

<template>
    <div class="chem-detail">
        <div id="left">
            <div class="flex justify-center">
                <img src="" alt="chem-img" class="chem-img large" />
            </div>
            <div>{{ chemData }}</div>
        </div>
    </div>

    <p id="to-top" :class="{ show: showToTop }" @click="scrollToTop()"><span class="material-symbols-sharp">arrow_upward</span>回到顶部</p>
</template>

<style scoped>
@reference "tailwindcss";

#to-top {
    @apply mt-4 hidden w-max cursor-pointer select-none items-center justify-start rounded-md border border-solid border-yellow-500 px-1.5 py-1;
}
#to-top.show {
    @apply flex;
}

.chem-img.large {
    @apply size-64 max-w-64;
}

.chem-detail {
    @apply flex flex-col gap-4 md:flex-row;
}
.chem-detail #left {
    @apply flex w-full flex-col gap-3 break-words text-center md:w-96;
}
.chem-detail #right {
    @apply w-full divide-y *:px-3 *:py-1 md:w-[calc(100%-25rem)];
}
</style>
