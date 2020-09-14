<template>
  <div class="calculator__wrapper">
    <div class="input__wrapper">
      <h2>
        {{ state.result }}
      </h2>
      <p>
        {{ formuraString }}
      </p>
      <input
        v-model="state.selectedNumber"
        class="input"
        type="text"
      >
    </div>
    <div
      v-for="line in calculatorLabels"
      class="line"
    >
      <template v-for="item in line">
        <span
          class="item"
          @click="clickItem(item)"
        >
          {{ item.label }}
        </span>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { computed, reactive } from 'vue'

const OPERATION_LABELS = {
  DIVISION: {
    label: '÷',
    symbol: '/'
  },
  MULTIPLICATION: {
    label: '×',
    symbol: '*'
  },
  SUBTRACTION: {
    label: '-',
    symbol: '-'
  },
  ADDITION: {
    label: '+',
    symbol: '+'
  },
  ADD_DECIMAL: {
    label: '.'
  },
  EQUAL: {
    label: '=',
  },
  ALL_CLEAR: {
    label: 'A/C'
  }
} as const

const ITEM_TYPES = {
  NUMBER: 'number',
  DECIMAL: 'decimal',
  METHOD: 'method',
  EQUAL: 'equal',
  ALL_CLEAR: 'all_clear'
} as const

export default {
  setup() {
    const state = reactive({
      selectedNumber: 0,
      formuraArray: [],
      selectedType: null,
      selectedOperation: null,
      result: 0
    })
    const calculatorLabels = [
      [{ label: '7', type: ITEM_TYPES.NUMBER }, { label: '8', type: ITEM_TYPES.NUMBER }, { label: '9', type: ITEM_TYPES.NUMBER }, { label: OPERATION_LABELS.DIVISION.label, operation: OPERATION_LABELS.DIVISION, type: ITEM_TYPES.METHOD }],
      [{ label: '4', type: ITEM_TYPES.NUMBER }, { label: '5', type: ITEM_TYPES.NUMBER }, { label: '6', type: ITEM_TYPES.NUMBER }, { label: OPERATION_LABELS.MULTIPLICATION.label, operation: OPERATION_LABELS.MULTIPLICATION, type: ITEM_TYPES.METHOD }],
      [{ label: '1', type: ITEM_TYPES.NUMBER }, { label: '2', type: ITEM_TYPES.NUMBER }, { label: '3', type: ITEM_TYPES.NUMBER }, { label: OPERATION_LABELS.SUBTRACTION.label ,operation: OPERATION_LABELS.SUBTRACTION, type: ITEM_TYPES.METHOD }],
      [{ label: '0', type: ITEM_TYPES.NUMBER }, { label: OPERATION_LABELS.ALL_CLEAR.label, operation: OPERATION_LABELS.ALL_CLEAR, type: ITEM_TYPES.ALL_CLEAR }, { label: OPERATION_LABELS.EQUAL.label, operation: OPERATION_LABELS.EQUAL, type: ITEM_TYPES.EQUAL }, { label: OPERATION_LABELS.ADDITION.label,operation: OPERATION_LABELS.ADDITION, type: ITEM_TYPES.METHOD }]
    ]
    function resetState() {
      state.selectedNumber = 0
      state.formuraArray = []
      state.selectedType = null
      state.selectedOperation = null
    }
    function canSwitchInputType(type: String) :boolean {
      return state.selectedType && state.selectedType !== type
    }
    function clickItem({ type, label, operation }) :void {
      switch (type) {
        case ITEM_TYPES.NUMBER:
          clickNumber(label)
          break
        case ITEM_TYPES.METHOD:
          clickMethod(operation)
          break
        case ITEM_TYPES.EQUAL:
          getResult()
          break
        case ITEM_TYPES.ALL_CLEAR:
          resetState()
          break
      }
    }
    function clickNumber(number: number) :void {
      if (canSwitchInputType(ITEM_TYPES.NUMBER)) {
        state.formuraArray.push(state.selectedOperation)
      }
      state.selectedOperation = null
      state.selectedType = ITEM_TYPES.NUMBER
      state.selectedNumber = Number(String(state.selectedNumber) + number)
    }
    function clickMethod(operation) :void {
      if (operation.label === OPERATION_LABELS.EQUAL.label) {
        getResult()
        return
      }
      if (state.selectedNumber === 0) {
        return
      }
      if (!canSwitchInputType(ITEM_TYPES.METHOD)) {
        state.selectedType = ITEM_TYPES.METHOD
        state.selectedOperation = operation
        return
      }
      state.formuraArray.push(state.selectedNumber)
      state.selectedType = ITEM_TYPES.METHOD
      state.selectedOperation = operation
      state.selectedNumber = 0
    }
    const isLastOfFormuraArrayNumber = computed(() :boolean => {
      return Number.isInteger(state.formuraArray[state.formuraArray.length - 1])
    })
    const formuraString = computed(() :String => {
      const selectedOperationLabel = state?.selectedOperation?.label || ''
      return state.formuraArray.reduce((arr, cur) => {
        if (Number.isInteger(cur)) {
          arr = arr + String(cur)
        } else {
          arr = arr + cur.label
        }
        return arr
      }, '') + selectedOperationLabel
    })
    function formuraLogic() {
      const res = state.formuraArray.reduce((arr, cur) => {
        if (Number.isInteger(cur)) {
          arr = arr + String(cur)
        } else {
          arr = arr + cur.symbol
        }
        return arr
      }, '')
      return res
    }
    function addDecimal() {
      console.log('addDecimal')
    }
    function getResult() {
      if (state.selectedNumber) {
        state.formuraArray.push(state.selectedNumber)
      }
      if (state.formuraArray.length < 1) {
        return
      }
      state.result = eval(formuraLogic())
      resetState()
    }
    return {
      state,
      calculatorLabels,
      clickItem,
      formuraString,
      getResult
    }
  }
}
</script>

<style lang="scss" scoped>
.calculator__wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.input {
  text-align: right;
  display: inline-block;
  width: 160px;
  height: 32px;
  margin-bottom: 16px;
}
.line {
  display: flex;
  justify-content: center;
}
.item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  cursor: pointer;
}
</style>
