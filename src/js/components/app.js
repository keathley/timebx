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
  handleClick: function(index) {
    for (var i in this.refs) {
      var task = this.refs[i];
      task.updateGlobalPos();
    }
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
        <Task onResize={this.handleClick.bind(this, i)}
          key={i}
          task={task}
          ref={'item' + i} />
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
