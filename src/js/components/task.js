/**
 * @jsx React.DOM
 */
var React = require('react');
var ReactFireMixin = require('reactfire');
var TaskConstants = require('../constants/task_constants');
var _ = require('lodash');

var MINHEIGHT = 100;
var GRABBER_SIZE = 14;

var Task = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function(){
    return {
      top: 0,
      bottom: 0,
      resizing: false,
      secondsElapsed: 0,
      working: false
    };
  },
  componentWillMount: function() {
    this.firebaseRef = new Firebase(TaskConstants.TASK_URL(this.props.task.id));
    this.bindAsObject(this.firebaseRef, 'task');
  },
  componentDidMount: function() {
    this.updateGlobalPos();
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseMove);
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('touchend', this.handleTouchEnd);
    this.firebaseRef.off();
  },
  clampBottomPos: function(top, bottom) {
    if (bottom - top < MINHEIGHT) {
      bottom = Math.floor(MINHEIGHT + top);
    }
    return bottom;
  },
  startWorking: function() {
    this.interval = setInterval(this.tick, 1000);
    this.setState({ working: true });
  },
  stopWorking: function() {
    clearInterval(this.interval);
    this.setState({ working: false });
  },
  toggleStart: function() {
    if (this.state.working)
      this.stopWorking();
    else
      this.startWorking();
  },
  handleTouchStart: function(e) {
    this.setState({ resizing: true });
    this.updateGlobalPos();
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleTouchEnd);
    e.preventDefault();
  },
  handleTouchMove: function(e) {
    var touchPoint = e.changedTouches[0];
    this.updateDrag(touchPoint.clientY);
    e.preventDefault();
  },
  handleTouchEnd: function(e) {
    if (!this.state.resizing) { return; }
    this.setState({ resizing: false });
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('touchend', this.handleTouchEnd);
    e.preventDefault();
  },
  handleMouseDown: function(e) {
    this.setState({ resizing: true });
    this.updateGlobalPos();
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  },
  handleMouseMove: function(e) {
    this.updateDrag(e.clientY);
  },
  handleMouseUp: function(e) {
    if (!this.state.resizing) { return; }
    this.setState({ resizing: false });
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseMove);
  },
  updateDrag: function(bottomPos) {
    var gridSize = 20;
    var top     = this.state.top;
    var rounded = gridSize * Math.round(bottomPos/gridSize) + 10;
    rounded = this.clampBottomPos(top, rounded);
    this.setState({ bottom: rounded });
  },
  updateGlobalPos: function() {
    var rect = this.getDOMNode().getBoundingClientRect();
    this.setState({
      top: rect.top,
      bottom: rect.bottom
    });
  },
  tick: function() {
    var newTime = this.state.task.secondsElapsed + 1;
    this.firebaseRef.update({ secondsElapsed: newTime });
  },
  formatTime: function(timeInSeconds) {
    seconds = Math.floor(timeInSeconds % 60);
    minutes = Math.floor(timeInSeconds / 60) % 60;
    hours = Math.floor(timeInSeconds / 3600);
    return format(hours) + ":" + format(minutes) + ":" + format(seconds);

    function format(unit) {
      return unit < 10 ? "0" + unit : unit;
    }
  },
  heightToEstimatedTime: function(height) {
    var base = Math.floor(height / 100);
    var other = (height / 10) % 10 / 2;
    var minutes = (other * 15 * 60);
    return 15*60 + (minutes) + (base - 1)*60*60;
  },
  render: function() {
    var task = this.state.task;
    var height = this.state.bottom - this.state.top;
    var heightToColor = (height - 100) / (300 - 100); // Move these to constants
    var hue = (1 - heightToColor) * 120;
    var estimatedTime = this.heightToEstimatedTime(height);
    var percentageDone = task.secondsElapsed / this.heightToEstimatedTime(height);
    var heightStyle = {
      height: height,
      backgroundColor: 'hsl(' + hue + ', 8%, 50%)'
    };
    var doneStyle = {
      height: (height - GRABBER_SIZE) * percentageDone,
      backgroundColor: 'hsl(' + hue + ', 40%, 50%)'
    };
    return (
      <div className="task" style={heightStyle}>
        <div className="task-wrapper"
              onClick={this.toggleStart}>
          <div className="task-info">
            <h1 className="task-title">{task.text}</h1>
            <h3 className="task-total-time">
              <i className="fa fa-clock-o" />
              <span className="time">{this.formatTime(estimatedTime)}</span>
            </h3>
          </div>
          <div className="task-stats">
            <h1 className="task-elapsed-time">
              {this.formatTime(task.secondsElapsed)}
            </h1>
          </div>
        </div>
        <div className="task-done-amount" style={doneStyle} />
        <div className="grabber"
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart} />
      </div>
    );
  }
});

module.exports = Task;
