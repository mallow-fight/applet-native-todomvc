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
    getTodoList( todos => {
      this.setData({
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
    return !title || !title.length ? wx.showToast({
      icon: 'none',
      title: '输入不能为空!'
    }) : addTodo( addTodo => {
      this.setData({
        todos: [addTodo].concat(this.data.todos),
        todoThing: {
          title: ''
        }
      })
    }, todoThing)
  },
  cutTodos: function(id) {
    const nextTodos = []
    this.data.todos.map(todo => {
      return todo.id === id ? false : nextTodos.push(todo)
    })
    this.setData({
      todos: nextTodos
    })
  },
  removeTodo: function(e) {
    deleteTodo( data => {
      this.cutTodos(data.id)
    }, {id: e.currentTarget.id})
  },
  synchroTodo: function(data) {
    const todos = this.data.todos
    for(var i = 0; i < todos.length; i++) {
      if(todos[i].id === data.id) {
        todos[i] = data
        this.setData({
          todos: todos
        })
        break
      }
    }
  },
  toggleTodo: function(e) {
    updateTodo( data => {
      this.synchroTodo(data)
    }, {id: e.currentTarget.id, completed: !e.currentTarget.dataset.todoCompleted})
  },
  editTodoThing: function(e) {
    const todo = e.currentTarget.dataset.todo
    updateTodo( data => {
      this.synchroTodo(data)
    }, {id: todo.id, title: e.detail.value})
  }
})
