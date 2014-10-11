/**
 * @jsx React.DOM
 */
var React = require('react');
var Task = require('./task');

var APP = React.createClass({
  getInitialState: function() {
    return {
      tasks: []
    };
  },
  componentDidMount: function() {
    this.setState({
      tasks: [
        'Work on website',
        'Do some other shit'
      ]
    });
  },
  handleClick: function(index) {
    for (var i in this.refs) {
      if (index !== i) {
        var task = this.refs[i];
        task.updateGlobalPos();
      }
    }
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
      <div>
        {tasks}
      </div>
    );
  }
});

module.exports = APP;
