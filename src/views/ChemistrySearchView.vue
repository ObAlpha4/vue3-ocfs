<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import APIRequest from "@/utils/request";

const route = useRoute();
const router = useRouter();
const showToTop = ref(false);
const qw = ref("");
const loading = ref(false);
const chemData = ref();

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

async function fetchResults() {
    const qw = route.query.qw;
    if (!qw) return;
    loading.value = true;
    let url = `/chemistry/search/?query=${route.query.qw}`;
    try {
        const response = await APIRequest({ url: url, method: "get", params: { query: qw } });
        chemData.value = response.data;
    } catch (err) {
        console.error(err);
    } finally {
        loading.value = false;
    }
    checkHeight();
}
onMounted(fetchResults);
watch(() => route.query.qw, fetchResults);

function searchDB(event: Event) {
    event.preventDefault();
    if (qw.value.trim()) {
        router.push({ name: "ChemistrySearch", query: { qw: qw.value } });
    }
}
</script>

<template>
    <div class="tip-form">
        <form method="get" @submit="searchDB">
            <div class="input-group">
                <input type="text" v-model="qw" required />
                <button type="submit">搜索</button>
            </div>
        </form>
        <p class="tip">可以搜索&nbsp;PubChem&nbsp;CID，中文名，英文名，InChI，分子式，CAS&nbsp;号...</p>
    </div>

    <div v-if="loading">加载中...</div>
    <div v-else class="card-list mt-6">
        <div v-for="item in chemData" class="card">
            <div id="left">
                <img :src="item.image_url" alt="chem-img" />
            </div>
            <div id="right">
                <h4>{{ item.name_cn }}</h4>
                <h4>{{ item.name_en }}</h4>
                <p>{{ item.formula }}</p>
                <router-link :to="{ name: 'ChemistryDetail', params: { cid: item.pubchem_cid } }">详细信息</router-link>
            </div>
        </div>
    </div>

    <p id="to-top" :class="{ show: showToTop }" @click="scrollToTop"><span class="material-symbols-sharp">arrow_upward</span>回到顶部</p>
</template>

<style scoped>
@reference "tailwindcss";
@plugin "@tailwindcss/forms";

#to-top {
    @apply mt-4 hidden w-max cursor-pointer items-center justify-start rounded-md border border-solid border-yellow-500 px-1.5 py-1 select-none;
}
#to-top.show {
    @apply flex;
}

.tip-form {
    @apply flex flex-col items-center gap-2;
}
.tip-form .tip {
    @apply m-0 break-normal;
}

.input-group {
    @apply flex flex-nowrap;
}
.input-group input {
    @apply form-input rounded-s-md border-amber-500;
}
.input-group button {
    @apply rounded-e-md border-y border-r border-solid border-amber-500 px-3 py-2;
}

.card a {
    @apply text-blue-500 no-underline hover:underline;
}

.card-list {
    @apply flex flex-col items-center gap-6 lg:mx-24;
}
.card-list .card {
    @apply flex w-full flex-col gap-4 overflow-x-hidden rounded-md bg-white px-6 py-4 text-black shadow-md md:flex-row;
}
.card-list .card #left {
    @apply flex justify-center md:items-center md:justify-normal;
}
.card-list .card #left img {
    @apply size-32 max-w-32;
}
.card-list .card #right {
    @apply flex w-full flex-col justify-center text-center break-words *:px-3 *:py-1 md:w-[calc(100%-9rem)];
}

.chem-img {
    @apply size-32 max-w-32;
}
</style>
