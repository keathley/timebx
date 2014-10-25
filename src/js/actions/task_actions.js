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
  }
};

module.exports = TaskActions;
