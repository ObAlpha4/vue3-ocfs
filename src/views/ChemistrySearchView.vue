<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import APIRequest from "@/utils/request";

const route = useRoute();
const router = useRouter();
const qw = ref("");
const loading = ref(false);
const chemData = ref();

async function fetchResults() {
    if (!route.query.qw) return;

    try {
        const response = await APIRequest.post(
            "/chemistry/search/",
            { qw: route.query.qw },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            },
        );
        chemData.value = response.data;
    } catch (err) {
        console.error(err);
    } finally {
        loading.value = false;
    }
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
</template>

<style scoped>
@reference "tailwindcss";
@plugin "@tailwindcss/forms";

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
</style>
