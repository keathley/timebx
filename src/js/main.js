/**
 * @jsx React.DOM
 */
var APP = require('./components/app');
var React = require('react');
var TaskWebAPIUtils = require('./utils/task_web_api_utils');
window.React = React;

if (!localStorage.getItem('tasks'))
  localStorage.setItem('tasks', JSON.stringify([]));

TaskWebAPIUtils.getAll();

React.renderComponent(
  <APP />,
  document.getElementById('main'));
