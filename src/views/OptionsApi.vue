<template>
  <div>
    <p>Options API</p>
    <form @submit.prevent="addTodo()">
      <input type="text" v-model="text">
    </form>
    
    <ul>
      <template
        v-for="(todo, index) in todos"
        :key="index"
      >
        <li class="options__list_item">
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

<script>
export default {
  name: 'OptionsApi',
  data: () => ({
    todos: [],
    text: ''
  }),
  methods: {
    addTodo() {
      this.todos.push({
        text: this.text,
        done: false
      })
      this.text = ''
    },
    finishTodo(index) {
      this.todos[index].done = true
    }
  }
}
</script>

<style>
.options__list_item {
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
