var _ = require('lodash');
var ServerActionCreators = require('../actions/server_action_creators');

module.exports = {
  create: function(text) {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    var timestamp = Date.now();
    var id = 'm_' + timestamp;
    var newTask = {
      id: id,
      text: text,
      secondsElapsed: 0
    };
    tasks.unshift(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    ServerActionCreators.receiveCreatedTask(newTask);
  },
  getAll: function() {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    ServerActionCreators.receiveAll(tasks);
  },
  save: function(task) {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    var taskIndex = _.findIndex(tasks, { 'id': task.id});
    tasks[taskIndex] = task;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
};