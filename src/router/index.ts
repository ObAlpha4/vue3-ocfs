import { createRouter, createWebHistory } from "vue-router";
import IndexView from "@/views/IndexView.vue";
import ChemistryDatabaseView from "../views/ChemistryDatabaseView.vue";
import ChemistrySearchView from "@/views/ChemistrySearchView.vue";
import ChemistryDetailView from "@/views/ChemistryDetailView.vue";

const router = createRouter({
    history: createWebHistory("/vue3-ocfs/"),
    routes: [
        { path: "/", name: "Index", component: IndexView },
        {
            path: "/chemistry",
            children: [
                { path: "database", name: "ChemistryDatabase", component: ChemistryDatabaseView },
                { path: "search", name: "ChemistrySearch", component: ChemistrySearchView },
                { path: "detail/:cid/", name: "ChemistryDetail", component: ChemistryDetailView },
            ],
        },
    ],
});

export default router;
