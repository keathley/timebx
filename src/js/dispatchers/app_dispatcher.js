var Dispatcher = require('flux').Dispatcher;
var copyProperties = require('react/lib/copyProperties');
var TaskConstants = require('../constants/task_constants');

var PayloadSources = TaskConstants.PayloadSources;

var AppDispatcher = copyProperties(new Dispatcher(), {
  handleServerAction: function(action) {
    this.dispatch({
      source: PayloadSources.SERVER_ACTION,
      action: action
    });
  },

  handleViewAction: function(action) {
    this.dispatch({
      source: PayloadSources.VIEW_ACTION,
      action: action
    });
  }
});
module.exports = AppDispatcher;