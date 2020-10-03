<template>
  <div class="calculator__wrapper">
    <div class="input__wrapper">
      <h2 class="result">
        {{ state.result }}
      </h2>
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
      console.log(state)
      Object.keys(state).map(key => {
        if (key === 'formuraArray') {
          state[key] = []
        }
        if (key === 'selectedType' || key === 'selectedOperation') {
          state[key] = null
        }
        if (key === 'selectedNumber' || key === 'result') {
          state[key] = 0  
        }
      })
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
  background-color: #616161;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.result {
  color: #cccccc;
  font-size: 40px;
  margin: 10px;
}
.input {
  font-size: 20px;
  text-align: right;
  display: inline-block;
  width: 160px;
  height: 40px;
  margin-bottom: 16px;
  padding: 4px 12px;

  border: none;
  border-radius: 12px;
  background: #cccccc;
  box-shadow: inset -5px 5px 10px #a3a3a3, 
              inset 5px -5px 10px #f5f5f5
}
.line {
  display: flex;
  justify-content: center;
}
.item {
  color: #bbbbbb;
  font-size: 20px;
  border-radius: 50%;
  background: linear-gradient(225deg, #686868, #575757);
  box-shadow: -7px 7px 14px #535353, 
             7px -7px 14px #6f6f6f;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 60px;
  margin: 20px 16px;
  transition: 300ms ease-in-out;
  cursor: pointer;

  &:hover {
    box-shadow: -16px 16px 35px #5c5c5c, 
             16px -16px 35px #666666;
  }
}
</style>
