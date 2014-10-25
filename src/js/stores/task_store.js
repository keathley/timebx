var AppDispatcher = require('../dispatchers/app_dispatcher');
var EventEmitter = require('events').EventEmitter;
var TaskConstants = require('../constants/task_constants');
var merge = require('react/lib/merge');
var _ = require('lodash');

var ActionTypes = TaskConstants.ActionTypes;

var CHANGE_EVENT = 'change';

var _tasks = {};

function _addTasks(rawTasks) {
  var tasks = _(rawTasks).reverse();
  tasks.forEach(function(task) {
    if (!_tasks[task.id]) {
      _tasks[task.id] = task;
    }
  });
}

function _taskUpdateTime(id, time) {
  _tasks[id].secondsElapsed = time;
}

var TaskStore = merge(EventEmitter.prototype, {
  all: function() {
    return _tasks;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

TaskStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_CREATED_TASK:
      var task = action.task;
      _tasks[task.id] = task;
      break;

    case ActionTypes.TASK_UPDATE_TIME:
      _taskUpdateTime(action.id, action.time);
      break;

    case ActionTypes.RECEIVE_TASKS:
      _addTasks(action.tasks);
      break;

    default:
      return true;
  }

  TaskStore.emitChange();

  return true;
});

module.exports = TaskStore;