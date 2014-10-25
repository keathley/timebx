var AppDispatcher = require('../dispatchers/app_dispatcher');
var EventEmitter = require('events').EventEmitter;
var TaskConstants = require('../constants/task_constants');
var merge = require('react/lib/merge');

var ActionTypes = TaskConstants.ActionTypes;

var CHANGE_EVENT = 'change';

var _tasks = {};

function create(text) {
  var timestamp = Date.now();
  return {
    id: 'm_' + timestamp,
    text: text
  };
}

function _addTasks(tasks) {
  tasks.forEach(function(task) {
    if (!_tasks[task.id]) {
      _tasks[task.id] = {
        text: task.text
      };
    }
  });
}

var TaskStore = merge(EventEmitter.prototype, {
  all: function() {
    return _tasks;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

TaskStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.TASK_CREATE:
      var task = create(action.text);
      _tasks[task.id] = task;
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