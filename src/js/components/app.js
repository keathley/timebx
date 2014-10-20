/**
 * @jsx React.DOM
 */
var React = require('react');
var Task = require('./task');

var APP = React.createClass({
  getInitialState: function() {
    return {
      tasks: [
        'Work on website',
        'Other stuff'
      ]
    };
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextTasks = [this.state.text].concat(this.state.tasks);
    var nextText = '';
    this.setState({tasks: nextTasks, text: nextText});
  },
  render: function() {
    var tasks = this.state.tasks.map(function(task, i) {
      return (
        <Task task={task} />
      );
    }, this);
    return (
      <div className="task-list">
        <form className="task-form" onSubmit={this.handleSubmit}>
          <input onChange={this.onChange}
            value={this.state.text}
            placeholder="What needs doing..." />
        </form>
        {tasks}
      </div>
    );
  }
});

module.exports = APP;
