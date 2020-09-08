<template>
  <div class="bin2dec">
    <form
      class="input_form"
      @submit.prevent="convertToDecimal()"
    >
      <input
        v-model="state.binaryNumber"
        class="input_binary_number"
        placeholder="accept 0 or 1"
        type="number"
      >
      <button
        class="button"
        :disabled="state.wrongInput"
      >
        Convert
      </button>
    </form>
    <p class="decimal_number">Decimal Number: {{ state.decimalNumber }}</p>
  </div>
</template>

<script lang="ts">
import Vue, { computed, reactive, watch } from 'vue'

export default {
  setup() {
    const state = reactive({
      binaryNumber: null,
      decimalNumber: null,
      wrongInput: false
    })

    const unit = computed(() => {
      const digits = state.binaryNumber.length
      return [...Array(digits)].reduce((arr, _, i) => {
        if (i === 0) {
          arr.push(1)
          return arr
        }
        arr.push(Math.pow(2, i))
        return arr
      }, [])
    })

    function convertToDecimal() {
      const reversedBinaryNumber = [...state.binaryNumber].reverse().map(n => +n)
      state.decimalNumber = reversedBinaryNumber.reduce((arr, cur, i) => {
        const n = unit.value[i] * cur
        arr += n
        return arr
      })
    }

    watch(state, (value) => {
      const pattern = /[^0-1]/
      if (pattern.test(value.binaryNumber)) {
        state.wrongInput = true
        return
      }
      state.wrongInput = false
    })

    return {
      state,
      convertToDecimal
    }
  }
}
</script>

<style lang="scss" scoped>
.bin2dec {
  background-color: #efdbff;
  height: 100vh;
  padding: 48px 52px 0;
}
.input_form {
  padding: 20px;
  max-width: 240px;
  margin: 0 auto 32px;
  border-radius: 16px;
  background: #efdbff;
  box-shadow:  12px 12px 19px #d9c7e8, 
              -12px -12px 19px #ffefff;
}
.input_binary_number {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  display: block;
  height: 42px;
  max-width: 200px;
  padding: 0 8px;
  margin: 0 auto 16px;

  border-radius: 8px;
  background: #efdbff;
  box-shadow: inset 5px 5px 10px #d9c7e8, 
              inset -5px -5px 10px #ffefff;
  border: none;

  &:focus {
    outline: none;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  } 
}
.button {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 8px 16px;
  border-radius: 8px;
  transition: 300ms ease-in-out;
  background: linear-gradient(145deg, #d7c5e6, #ffeaff);
  box-shadow: 7px 7px 14px #d9c7e8, 
             -7px -7px 14px #ffefff;
  border: none;

  &:hover {
    cursor: pointer;
    background: #efdbff;
    box-shadow:  5px 5px 10px #e1cef0, 
             -5px -5px 10px #fde8ff;
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background: #efdbff;
    box-shadow: 3px 3px 10px #e1cef0, 
              -3px -3px 10px #fde8ff;
  }
}
.decimal_number {
  font-size: 20px;
}
</style>