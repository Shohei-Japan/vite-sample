<template>
  <div>
    <p>Composition API</p>
    <form @submit.prevent="addTodo()">
      <input type="text" v-model="store.text">
    </form>
    
    <ul>
      <template
        v-for="(todo, index) in todos"
        :key="index"
      >
        <li class="composition__list_item">
          <span
            class="list_text"
            :class="{ is_done: todo.done }"
          >
            {{ todo.text }}
          </span>
          <template v-if="!todo.done">
            <button
              @click="finishTodo(index)"
            >
              finish
            </button>
          </template>
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'

interface Todo {
  text: string,
  done: boolean
}

interface Todos {
  todos: Todo[]
}

export default {
  setup() {
    const todos = reactive<Todo[]>([])
    const store = reactive({
      text: ''
    })
    const addTodo = () => {
      const data: Todo = {
        text: store.text,
        done: false
      }
      todos.push(data)
      store.text = ''
    }
    const finishTodo = (index: number) => {
      todos[index].done = true
    }

    return {
      store,
      todos,
      addTodo,
      finishTodo
    }
  } 
}
</script>

<style>
.composition__list_item {
  display: flex;
  margin-bottom: 10px;
}

.list_text {
  margin-right: 10px;
}

.is_done {
  text-decoration: line-through;
}
</style>
