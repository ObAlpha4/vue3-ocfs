<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import APIRequest from "@/utils/request";

const router = useRouter();
const showToTop = ref(false);
const qw = ref("");
const loading = ref(true);
const chemData = ref();
const pageNum = ref(1);
const prevPage = ref(true);
const nextPage = ref(true);

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
    let url = `/chemistry/database/?page=${pageNum.value}`;
    prevPage.value = false;
    try {
        const response = await APIRequest(url);
        chemData.value = response.data;
        checkHeight();
    } catch (err) {
        console.error(err);
    } finally {
        loading.value = false;
    }
});

watch(pageNum, async (newpageNum, oldpageNum) => {
    let url = `/chemistry/database/?page=${pageNum.value}`;
    if (newpageNum == 1) {
        prevPage.value = false;
        nextPage.value = true;
    } else if (newpageNum == 259) {
        prevPage.value = true;
        nextPage.value = false;
    } else {
        prevPage.value = true;
        nextPage.value = true;
    }
    try {
        const response = await APIRequest({ url: url, method: "get" });
        chemData.value = response.data;
        checkHeight();
    } catch (err) {
        console.error(err);
    } finally {
        loading.value = false;
    }
});

function searchDB(event: Event) {
    event.preventDefault();
    if (qw.value.trim()) {
        router.push({ name: "ChemistrySearch", query: { qw: qw.value } });
    }
}
</script>

<template>
    <div class="flex justify-between">
        <div class="pageNav">
            <p @click="pageNum = 1">首页</p>
            <p v-if="prevPage" @click="pageNum--">上一页</p>
            <p v-if="nextPage" @click="pageNum++">下一页</p>
            <p @click="pageNum = 259">末页</p>
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
    @apply hidden w-max cursor-pointer items-center justify-start rounded-md border border-solid border-yellow-500 select-none;
}
#to-top.show {
    @apply mt-4 flex px-1.5 py-1;
}

.pageNav {
    @apply flex items-center;
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
