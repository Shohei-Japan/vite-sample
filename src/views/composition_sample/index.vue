<template>
  <h2>Comparison between CompositionAPI and OptionsAPI</h2>
  <div>
    <template v-for="(route, key) in routes" :key="key">
      <p>
        <router-link
          :to="route.to"
          :class="{ active: isActive(route.to) }"
        >
          {{ route.text }}
        </router-link>
      </p>
    </template>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  computed: {
    routes: () => [
      {
        to: "/composition_sample/composition",
        text: "Composition API"
      },
      {
        to: "/composition_sample/options",
        text: "Options API"
      }
    ]
  },
  methods: {
    isActive(path) {
      return path === this.$route.path
    }
  }
}
</script>

