var AppDispatcher = require('../dispatchers/app_dispatcher');
var TaskConstants = require('../constants/task_constants');
var TaskWebAPIUtils = require('../utils/task_web_api_utils');

var ActionTypes = TaskConstants.ActionTypes;

var TaskActions = {
  create: function(text) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.TASK_CREATE,
      text: text
    });
    TaskWebAPIUtils.create(text);
  },

  updateTime: function(task, time) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.TASK_UPDATE_TIME,
      id: task.id,
      time: task.secondsElapsed
    });
    task.secondsElapsed = time;
    TaskWebAPIUtils.save(task);
  }
};

module.exports = TaskActions;
