/**
 * @jsx React.DOM
 */
var React = require('react');
var Firebase = require('firebase');
var TaskConstants = require('../constants/task_constants');

var TaskForm = React.createClass({
  getInitialState: function() {
    return {
      text: ''
    };
  },
  componentWillMount: function() {
    this.firebaseRef = new Firebase(TaskConstants.TASKS_URL);
  },
  componentWillUnmount: function() {
    this.firebaseRef.off();
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.firebaseRef.push({
      text: this.state.text,
      secondsElapsed: 0
    });
    this.setState({text: ''});
  },
  onChange: function(event) {
    this.setState({
      text: event.target.value
    });
  },
  render: function() {
    return (
      <form className="task-form" onSubmit={this.handleSubmit}>
        <input onChange={this.onChange}
          value={this.state.text}
          placeholder="What needs doing..." />
      </form>
    );
  }
});

module.exports = TaskForm;