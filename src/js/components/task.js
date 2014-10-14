/**
 * @jsx React.DOM
 */

var React = require('react');

function heightToSeconds(height) {
  var minutes = height / 100;
  return minutes * 60;
}

var Task = React.createClass({
  getInitialState: function(){
    return {
      resizing: false,
      secondsElapsed: 0
    };
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
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
  render: function() {
    var height = this.state.bottom - this.state.top;
    var heightToColor = (height - 100) / (300 - 100); // Move these to constants
    var hue = (1 - heightToColor) * 120;
    var estimatedTime = height;
    var percentageDone = this.state.secondsElapsed / heightToSeconds(height);
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
        <div className="task-wrapper">
          <div className="task-info">
            <h1 className="task-title">{this.props.task}</h1>
            <h3 className="task-total-time">
              <i className="fa fa-clock-o" />
              <span className="time">01:15:00</span>
            </h3>
          </div>
          <div className="task-stats">
            <h1 className="task-elapsed-time">
              00:42:13
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
