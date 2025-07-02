<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import APIRequest from "@/utils/request";

const router = useRouter();
const showToTop = ref(false);
const qw = ref("");
const loading = ref(false);
const chemData = ref();
const pageNum = ref(1);
const totalPage = ref(1);
const prevPage = ref(true);
const nextPage = ref(true);

function checkHeight() {
    showToTop.value = document.documentElement.scrollHeight > window.innerHeight;
}
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

async function fetchResults(pgn: number) {
    if (pgn == 1 || pgn == null) {
        prevPage.value = false;
        nextPage.value = true;
    } else if (pgn == totalPage.value) {
        prevPage.value = true;
        nextPage.value = false;
    } else {
        prevPage.value = true;
        nextPage.value = true;
    }

    try {
        const response = await APIRequest.get("/chemistry/database/", {
            params: { page: pgn },
        });
        chemData.value = response.data.results;
        totalPage.value = response.data.totalPages;
    } catch (err) {
        console.error(err);
    } finally {
        loading.value = false;
    }
}
onMounted(fetchResults);
watch(pageNum, (pgn) => fetchResults(pgn));

function searchDB(event: Event) {
    event.preventDefault();
    if (qw.value.trim()) {
        router.push({ name: "ChemistrySearch", query: { qw: qw.value } });
    }
}
</script>

<template>
    <div class="section-body flex justify-between">
        <div class="pageNav">
            <p @click="pageNum = 1">首页</p>
            <p v-if="prevPage" @click="pageNum--">上一页</p>
            <p>当前&nbsp;{{ pageNum }}&nbsp;页，共&nbsp;{{ totalPage }}&nbsp;页</p>
            <p v-if="nextPage" @click="pageNum++">下一页</p>
            <p @click="pageNum = totalPage">末页</p>
        </div>
        <div class="tip-form">
            <form method="get" @submit="searchDB">
                <div class="input-group">
                    <input type="text" v-model="qw" required />
                    <button type="submit">搜索</button>
                </div>
            </form>
            <p class="tip">可以搜索&nbsp;PubChem&nbsp;CID，中文名，英文名，InChI，分子式，CAS&nbsp;号...</p>
        </div>
    </div>

    <section class="mt-12">
        <div v-if="loading">加载中...</div>
        <div v-else class="card-group">
            <div v-for="item in chemData" class="card">
                <div id="left">
                    <!-- <img :src="item.image_url" alt="chem-img" /> -->
                    <p>图片占位符</p>
                </div>
                <div id="right">
                    <h4>{{ item.name_cn }}</h4>
                    <h4>{{ item.name_en }}</h4>
                    <p>{{ item.formula }}</p>
                    <router-link :to="{ name: 'ChemistryDetail', params: { cid: item.pubchem_cid } }">详细信息</router-link>
                </div>
            </div>
        </div>
    </section>

    <p id="to-top" :class="{ show: showToTop }" @click="scrollToTop"><span class="material-symbols-sharp">arrow_upward</span>回到顶部</p>
</template>

<style scoped>
@reference "tailwindcss";
@plugin "@tailwindcss/forms";

.pageNav {
    @apply flex items-center select-none;
}
.pageNav p {
    @apply cursor-pointer border-y border-l border-solid border-emerald-500 px-3 py-2 first:rounded-l-md last:rounded-r-md last:border-r;
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

.card-group {
    @apply mx-8 grid grid-flow-row grid-cols-1 items-center gap-5 md:grid-cols-2 lg:mx-16;
}
.card-group .card {
    @apply flex h-full w-full flex-col gap-4 overflow-x-hidden rounded-md bg-white px-6 py-4 text-black shadow-md md:flex-row;
}
.card-group .card #left {
    @apply flex justify-center md:items-center md:justify-normal;
}
.card-group .card #left img {
    @apply size-32 max-w-32;
}
.card-group .card #right {
    @apply flex w-full flex-col justify-center text-center break-words *:px-3 *:py-1 md:w-[calc(100%-9rem)];
}

.chem-img {
    @apply size-32 max-w-32;
}

#to-top {
    @apply mt-4 hidden w-max cursor-pointer items-center justify-start rounded-md border border-solid border-yellow-500 px-1.5 py-1 select-none;
}
#to-top.show {
    @apply flex;
}
</style>
