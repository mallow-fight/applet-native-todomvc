const {
  getTodoList,
  addTodo,
  deleteTodo,
  updateTodo
} = require('../../api/todo.js')
Page({
  data: {
    todos: [],
    todoThing: {
      title: ''
    }
  },
  onLoad: function () {
    const that = this
    getTodoList(function(todos) {
      that.setData({
        todos: todos.reverse()
      })
    })
  },
  bindTodoThing: function(e) {
    this.setData({
      todoThing: {
        title: e.detail.value,
        completed: false
      }
    })  
  },
  addTodoThing: function() {
    const todoThing = this.data.todoThing
    const title = this.data.todoThing.title
    if (!title || !title.length) {
      return wx.showToast({
        icon: 'none',
        title: '输入不能为空!'
      })
    }
    const that = this
    addTodo(function(addTodo) {
      that.setData({
        todos: [addTodo].concat(that.data.todos)
      })
    }, todoThing)
  },
  cutTodos: function(id) {
    const nextTodos = []
    this.data.todos.map(todo => {
      if(todo.id === id) return;
      return nextTodos.push(todo)
    })
    this.setData({
      todos: nextTodos
    })
  },
  removeTodo: function(e) {
    const that = this
    deleteTodo(function(data) {
      that.cutTodos(data.id)
    }, {id: e.currentTarget.id})
  },
  toggleTodoCompleted: function(id) {
    const todos = this.data.todos
    for(var i = 0; i < todos.length; i++) {
      if(todos[i].id === id) {
        todos[i].completed = !todos[i].completed
        this.setData({
          todos: todos
        })
        break
      }
    }
  },
  toggleTodo: function(e) {
    const that = this
    updateTodo(function(data) {
      that.toggleTodoCompleted(data.id)
    }, {id: e.currentTarget.id, completed: !e.currentTarget.dataset.todoCompleted})
  },
  editTodoThing: function(e) {
    const todo = e.currentTarget.dataset.todo
    updateTodo(function(data) {
      console.log('updated:', data)
    }, {id: todo.id, title: e.detail.value})
  }
})
