import { createWebHistory, createRouter } from "vue-router";
import Index from './views/index.vue'

import AppIdeasIndex from './views/app_ideas/index.vue'
import Bin2Dec from './views/app_ideas/bin2dec.vue'
import borderRadiusPreviewer from './views/app_ideas/border_radius_previewer.vue'
import Calculator from './views/app_ideas/calculator.vue'

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
    path: '/app_ideas/border_radius_previewer',
    name: 'Border-radius Previewer',
    component: borderRadiusPreviewer
  },
  {
    path: '/app_ideas/calculator',
    name: 'Calculator',
    component: Calculator
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