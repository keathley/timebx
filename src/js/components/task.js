/**
 * @jsx React.DOM
 */

var React = require('react');


var Task = React.createClass({
  getInitialState: function(){
    return {
      resizing: false,
      secondsElapsed: 0,
      working: false
    };
  },
  componentDidMount: function() {
    var rect = this.getDOMNode().getBoundingClientRect();
    this.setState({
      top: rect.top,
      bottom: rect.bottom
    });
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseMove);
  },
  clampBottomPos: function(top, bottom) {
    if (bottom - top < 150) {
      bottom = 150 + top;
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
    console.log("TOGGLE", this.state.working);
    if (this.state.working)
      this.stopWorking();
    else
      this.startWorking();
  },
  handleMouseDown: function(e) {
    this.setState({ resizing: true });
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  },
  handleMouseMove: function(e) {
    var top     = 10 * Math.round(this.state.top/10);
    var rounded = 5  * Math.round(e.clientY/5);
    rounded = this.clampBottomPos(top, rounded);
    this.setState({
      bottom: rounded
    });
  },
  handleMouseUp: function(e) {
    if (!this.state.resizing) { return; }
    this.props.onResize();
    this.setState({ resizing: false });
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseMove);
  },
  updateGlobalPos: function() {
    var rect = this.getDOMNode().getBoundingClientRect();
    this.setState({
      top: rect.top,
      bottom: rect.bottom
    });
  },
  tick: function() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
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
  heightToSeconds: function(height) {
    var minutes = height / 100;
    return minutes * 60;
  },
  render: function() {
    var height = this.state.bottom - this.state.top;
    var heightToColor = (height - 100) / (300 - 100); // Move these to constants
    var hue = (1 - heightToColor) * 120;
    var estimatedTime = this.heightToSeconds(height);
    var percentageDone = this.state.secondsElapsed / this.heightToSeconds(height);
    var heightStyle = {
      height: height,
      backgroundColor: 'hsl(' + hue + ', 8%, 50%)'
    };
    var doneStyle = {
      height: height * percentageDone,
      backgroundColor: 'hsl(' + hue + ', 40%, 50%)'
    };
    return (
      <div className="task" style={heightStyle}>
        <div className="task-wrapper" onClick={this.toggleStart}>
          <div className="task-info">
            <h1 className="task-title">{this.props.task}</h1>
            <h3 className="task-total-time">
              <i className="fa fa-clock-o" />
              <span className="time">{this.formatTime(estimatedTime)}</span>
            </h3>
          </div>
          <div className="task-stats">
            <h1 className="task-elapsed-time">
              {this.formatTime(this.state.secondsElapsed)}
            </h1>
          </div>
        </div>
        <div className="task-done-amount" style={doneStyle} />
        <div className="grabber" onMouseDown={this.handleMouseDown} />
      </div>
    );
  }
});

module.exports = Task;
