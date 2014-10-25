var TaskConstants = require('../constants/task_constants');
var AppDispatcher = require('../dispatchers/app_dispatcher');

var ActionTypes = TaskConstants.ActionTypes;

module.exports = {
  receiveAll: function(tasks) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_TASKS,
      tasks: tasks
    });
  },

  receiveCreatedTask: function(task) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_CREATED_TASK,
      task: task
    });
  }
};
