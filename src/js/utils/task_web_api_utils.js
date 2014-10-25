var ServerActionCreators = require('../actions/server_action_creators');

module.exports = {
  create: function(text) {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    var timestamp = Date.now();
    var id = 'm_' + timestamp;
    var newTask = {
      id: id,
      text: text
    };
    tasks.unshift(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    ServerActionCreators.receiveCreatedTask(newTask);
  },
  getAll: function() {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    ServerActionCreators.receiveAll(tasks);
  }
};