<template>
  <h1>App Ideas</h1>
  <p>{{ AppIdeas }}</p>
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