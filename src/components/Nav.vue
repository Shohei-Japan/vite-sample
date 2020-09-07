<template>
  <nav>
    <router-link to="/">Vite Recipe Book</router-link>
    <div>
      <template v-for="(route, key) in routes" :key="key">
        <span>
          <router-link
            :to="route.to"
            :class="{ active: isActive(route.to) }"
          >
            {{ route.text }}{{ routes.length - 1 > key ? ' | ' : '' }}
          </router-link>
        </span>
      </template>
    </div>
  </nav>
</template>

<script>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    const routes = [
      { to: "/composition", text: "composition" },
      { to: "/options", text: "options" }
    ];
    const router = useRouter();
    const activeRoute = computed(() => router.currentRoute.value.path);
    const isActive = path => path === activeRoute.value
    return {
      isActive,
      routes
    };
  }
};
</script>

<style lang="scss" scoped>
.active {
  color: green;
}
</style>
