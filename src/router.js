import { createWebHistory, createRouter } from "vue-router";
import Home from "./views/Home.vue";
import OptionsApi from "./views/OptionsApi.vue";
import CompositionApi from "./views/CompositionApi.vue";

const history = createWebHistory();
const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path:"/options",
    component: OptionsApi
  },
  {
    path: "/composition",
    component: CompositionApi
  },
];
const router = createRouter({ history, routes });

export default router;