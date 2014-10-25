var keyMirror = require('react/lib/keyMirror');

module.exports = {
  ActionTypes: keyMirror({
    TASK_CREATE: null,
    RECEIVE_TASKS: null,
    RECEIVE_CREATED_TASK: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};