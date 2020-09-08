import { createWebHistory, createRouter } from "vue-router";
import Index from './views/index.vue'

import AppIdeasIndex from './views/app_ideas/index.vue'
import Bin2Dec from './views/app_ideas/bin2dec.vue'

import CompositionSampleIndex from "./views/composition_sample/index.vue";
import OptionsApi from "./views/composition_sample/OptionsApi.vue";
import CompositionApi from "./views/composition_sample/CompositionApi.vue";
import NotFound from "./views/error/404.vue"

const history = createWebHistory();
const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/app_ideas',
    name: 'appIdeas',
    component: AppIdeasIndex
  },
  {
    path: '/app_ideas/bin2dec',
    name: 'bin2Dec',
    component: Bin2Dec
  },
  {
    path: "/composition_sample",
    component: CompositionSampleIndex,
    children: [
      {
        path:"options",
        component: OptionsApi
      },
      {
        path: "composition",
        component: CompositionApi
      }
    ]
  },
  {
    path: '/*',
    name: 'notFound',
    component: NotFound
  }
];
const router = createRouter({ history, routes });

export default router;