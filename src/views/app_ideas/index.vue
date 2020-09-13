<template>
  <h1>App Ideas</h1>
  <div v-for="(idea, key) in AppIdeas" :key="key">
    <router-link :to="idea.to">{{ idea.name }}</router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppIdeas from '../../assets/AppIdeas.json'

export default {
  setup() {
    return {
      AppIdeas
    }
  }
}
</script>