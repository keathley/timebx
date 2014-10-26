module.exports = {
  TASKS_URL: 'https://timebx.firebaseio.com/tasks/',
  TASK_URL: function(id) {
    return this.TASKS_URL + id;
  }
};
