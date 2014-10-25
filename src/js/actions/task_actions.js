var AppDispatcher = require('../dispatchers/app_dispatcher');
var TaskConstants = require('../constants/task_constants');

var TaskActions = {
  create: function(task) {
    AppDispatcher.handleViewAction({
      actionType: TaskConstants.TASK_CREATE,
      task: task
    });
  }
};

module.exports = TaskActions;
