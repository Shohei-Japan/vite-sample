<template>
  <div class="border_radius_previewer">
    <div class="input_range__wrapper">
      <div class="border_width">
        <input
          type="range"
          v-model="boxBorderWidth.value"
          class="input_range"
          min="1"
          max="50"
          step="1"
        >
        border-width {{ boxBorderWidth.value }}
      </div>
      <div class="box_size_range">
        <div v-for="(item, key) in boxSizeValues">
          <input
            v-model="boxSizeValues[key]"
            class="input_range"
            type="range"
            min="0"
            max="200"
            step="1"
          >
          {{ key }} {{ item }}
        </div>
      </div>
      <div class="radius_range">
        <div v-for="item in radiusValues">
          <input
            v-model="item.value"
            type="range"
            class="input_range"
            min="0"
            :max="radiusLimit"
            :disabled="hasAnyZeroSize"
            step="1"
          >
          {{ item.name }} {{ item.value }}
        </div>
      </div>
    </div>
    <input class="result_text" id="result_text" :value="boxStyles" >
    <button @click="copyStyles()">Copy Styles!</button>
    <div
      class="box"
      :style="boxStyles"
    />
  </div>
</template>

<script lang="ts">
import Vue, { computed, reactive } from 'vue'

export default {
  name: 'borderRadiusPreviewer',
  setup() {
    const boxSizeValues = reactive({
      height: 0,
      width: 0
    })
    const radiusValues = reactive({
      upLeftValue: {
        name: 'Up Left',
        value: 0
      },
      upRight: {
        name: 'Up Right',
        value: 0
      },
      downRightValue: {
        name: 'Down Right',
        value: 0
      },
      downLeftValue: {
        name: 'Down Left',
        value: 0
      }
    })
    const boxBorderWidth = reactive({
      value: 1
    })
    const boxSizeStyle = computed(() => {
      return Object.keys(boxSizeValues).reduce((arr, cur) => {
        return `${arr} ${cur}: ${boxSizeValues[cur]}px;`
      }, '')
    })
    const hasAnyZeroSize = computed(() => {
      return Object.values(boxSizeValues).some(n => n < 1)
    })
    const radiusStyle = computed(() => {
      const styleValue = Object.keys(radiusValues).reduce((arr, cur) => {
        let value = 0
        if (Number(radiusValues[cur].value) > radiusLimit.value) {
          radiusValues[cur].value = radiusLimit.value
          value = radiusLimit.value
        } else {
          value = Number(radiusValues[cur].value)
        }
        return `${arr} ${value}px`
      }, '')
      return `border-radius: ${styleValue};`
    })
    const radiusLimit = computed(() => {
      const boxSizes = Object.values(boxSizeValues).map(n => +n)
      return Math.max(...boxSizes)
    })
    const boxBorderStyle = computed(() => {
      return `border-width: ${boxBorderWidth.value}px;`
    })
    const boxStyles = computed(() => {
      return `${boxBorderStyle.value}\n
        ${boxSizeStyle.value}\n
        ${radiusStyle.value}`
    })
    function copyStyles() {
      const copyText = document.getElementById('result_text') as HTMLInputElement
      copyText.select();
      document.execCommand("copy");
    }
    return {
      boxSizeValues,
      radiusValues,
      boxBorderWidth,
      hasAnyZeroSize,
      radiusLimit,
      boxStyles,
      copyStyles
    }
  }
}
</script>

<style lang="scss" scoped>
.border_radius_previewer {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.input_range__wrapper {
  text-align: left;
  margin-bottom: 0px;
}
.input_range {
  width: 300px;
}
.box {
  display: box;
  border: 1px solid black;
}
.result_text {
  white-space: pre-line;
  text-align: left;
  margin: 0;
  margin-bottom: 40px;
}
</style>
