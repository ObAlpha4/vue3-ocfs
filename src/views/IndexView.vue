<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const qw = ref("");

function viewDB() {
    router.push({ name: "ChemistryDatabase" });
}

function searchDB(event: Event) {
    event.preventDefault();
    if (qw.value.trim()) {
        router.push({ name: "ChemistrySearch", query: { qw: qw.value } });
    }
}
</script>

<template>
    <section id="home">
        <div class="section-body">
            <h3>了解有机化学，保障食品安全</h3>
            <p>探索有机化学在食品安全中的重要角色，保护您的健康。</p>
            <button type="button" class="cta-button">立即学习</button>
        </div>
    </section>

    <section id="search">
        <div class="section-body">
            <h3>认识有机物</h3>
            <p>碳、氢，这两种元素构成了有机物世界的基石；氧、氮等元素则为这缤纷多彩的世界再添浓墨重彩的一笔。</p>
            <div class="grid grid-cols-1 items-center justify-center gap-3 md:grid-cols-2">
                <button type="button" class="viewDB" @click="viewDB">浏览有机物数据库</button>
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
        </div>
    </section>

    <section id="topics">
        <div class="section-body">
            <h3>科普专题</h3>
            <div class="card-group">
                <div class="card">
                    <h4>食品添加剂</h4>
                    <p>解密食品中常见的添加剂及其安全性。</p>
                </div>
                <div class="card">
                    <h4>农药残留</h4>
                    <p>了解农药残留对食品安全的影响及其检测方法。</p>
                </div>
                <div class="card">
                    <h4>毒理性分析</h4>
                    <p>分析常见有机物的毒性，</p>
                </div>
            </div>
        </div>
    </section>

    <section id="about">
        <div class="section-body">
            <h3>关于我们</h3>
            <p>我们致力于将有机化学的知识普及到每个人的生活中，帮助公众了解食品中的化学成分，保障健康安全。</p>
            <button type="button" class="cta-button">联系我们</button>
        </div>
    </section>
</template>

<style scoped>
@reference "tailwindcss";
@plugin "@tailwindcss/forms";

section {
    @apply my-12 flex justify-center;
}
section .section-body {
    @apply px-6 py-4 text-center;

    h3 {
        @apply mb-4;
    }
    p {
        @apply mb-5;
    }
}
section .cta-button {
    @apply cursor-pointer rounded-full border-2 border-solid border-purple-300 bg-transparent px-3 py-2 text-base transition-all duration-200 ease-in-out hover:bg-purple-200/50;
}

.viewDB {
    @apply w-max cursor-pointer rounded-md bg-blue-500 px-6 py-4 text-white;
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
    @apply grid grid-flow-row grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-3;
}
.card-group .card {
    @apply flex h-max flex-col justify-center overflow-x-hidden rounded-lg bg-white p-4 text-center text-black shadow-md;
}
</style>
