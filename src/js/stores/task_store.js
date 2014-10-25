var AppDispatcher = require('../dispatchers/app_dispatcher');
var EventEmitter = require('events').EventEmitter;
var TaskConstants = require('../constants/task_constants');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var _tasks = {};

function create(text) {
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _tasks[id] = {
    id: id,
    complete: false,
    text: text
  };
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

AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {
    case TaskConstants.TASK_CREATE:
      console.log(action);
      text = action.task.trim();
      if (text !== '') {
        create(text);
      }
      break;

    default:
      return true;
  }

  TaskStore.emitChange();

  return true;
});

module.exports = TaskStore;