/**
 * @jsx React.DOM
 */

var React = require('react');

var Task = React.createClass({
  getInitialState: function(){
    return {
      resizing: false,
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
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseMove);
  },
  clampBottomPos: function(top, bottom) {
    if (bottom - top < 100) {
      bottom = 100 + top;
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
  render: function() {
    var height = this.state.bottom - this.state.top;
    var heightToColor = (height - 100) / (300 - 100); // Move these to constants
    var hue = (1 - heightToColor) * 120;
    console.log(hue);
    var heightStyle = {
      height: height,
      backgroundColor: 'hsl(' + hue + ', 20%, 50%)'
    };
    return (
      <div className="task" style={heightStyle}>
        <p>{this.props.task}</p>
        <div className="grabber" onMouseDown={this.handleMouseDown} />
      </div>
    );
  }
});

module.exports = Task;
