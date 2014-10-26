/**
 * @jsx React.DOM
 */
var React = require('react');
var Task = require('./task');
var TaskForm = require('./task_form');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var TaskConstants = require('../constants/task_constants');

var APP = React.createClass({
  getInitialState: function() {
    return {
      tasks: []
    };
  },
  componentWillMount: function() {
    var tasks = [];
    this.firebaseRef = new Firebase(TaskConstants.TASKS_URL);
    this.firebaseRef.on("child_added", function(snapshot) {
      var task = snapshot.val();
      task.id = snapshot.name();
      tasks.push(task);
      this.setState({
        tasks: tasks
      });
    }.bind(this));
  },
  componentWillUnmount: function() {
    this.firebaseRef.off();
  },
  render: function() {
    var tasks = [];
    for (var key in this.state.tasks) {
      tasks.unshift(<Task key={key} task={this.state.tasks[key]} />);
    }
    return (
      <div className="task-list">
        <TaskForm />
        {tasks}
      </div>
    );
  }
});

module.exports = APP;
