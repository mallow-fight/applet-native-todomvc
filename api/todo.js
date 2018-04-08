const config = require('./config.js')
const baseUrl = config.baseUrl
const item = '/item'
const todoBaseUrl = baseUrl + item
function formatRequest(options) {
  var route = options.route || ''
  if(route) { route = '/' + route }
  return wx.request({
    url: todoBaseUrl + route,
    method: options.method || 'GET',
    success: function(res) {
      options.callback(res.data)
    },
    data: options.data || {},
    fail: function(res) {
      options.callback('this is a server error')
    }
  })
}
module.exports = {
  getTodoList: function getTodoListF(callback) {
    return formatRequest({
      callback
    })
  },
  addTodo: function addTodoF(callback, payload) {
    return formatRequest({
      method: 'POST',
      callback,
      data: payload,
    })
  },
  deleteTodo: function deleteTodoF(callback, payload) {
    return formatRequest({
      method: 'DELETE',
      route: payload.id,
      callback
    })
  },
  updateTodo: function updateTodoF(callback, payload) {
    return formatRequest({
      method: 'PUT',
      route: payload.id,
      data: payload,
      callback
    })
  }
}