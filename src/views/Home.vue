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
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  computed: {
    routes: () => [
      {
        to: "/composition",
        text: "Composition API"
      },
      {
        to: "/options",
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

