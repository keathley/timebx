/**
 * @jsx React.DOM
 */
var React = require('react');
var Task = require('./task');
var TaskStore = require('../stores/task_store');
var TaskForm = require('./task_form');

function getTaskState() {
  return {
    tasks: TaskStore.all()
  };
}

var APP = React.createClass({
  getInitialState: function() {
    return getTaskState();
  },
  componentDidMount: function() {
    TaskStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    TaskStore.removeChangeListener(this._onChage);
  },
  _onChange: function(e) {
    this.setState(getTaskState());
  },
  render: function() {
    var tasks = [];
    for (var key in this.state.tasks) {
      tasks.push(<Task key={key} task={this.state.tasks[key]} />);
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
