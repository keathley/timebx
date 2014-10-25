/**
 * @jsx React.DOM
 */

var React = require('react');
var TaskActions = require('../actions/task_actions');

var TaskForm = React.createClass({
  getInitialState: function() {
    return {
      text: ''
    };
  },
  handleSubmit: function(e) {
    e.preventDefault();
    TaskActions.create(this.state.text);
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