class TaskList {
  constructor(tasks, options = {}) {
    // ...
    this.taskApi = this.getTaskApi();
  }
  getTaskApi() {
    return {
      skip: reason => {
        this.currentTaskStatus = 'skiped';
        this.next({ reason, type: 'skip' });
      },
      error: err => {
        if (this.currentTaskStatus === 'running') {
          this.currentTaskStatus = 'failed';
          this._fail(err);
        }
      },
      complete: () => {
        if (this.currentTaskStatus === 'running') {
          this.currentTaskStatus = 'done';
          this.next();
        }
      }
    }
  }

  _startTask(index, { reason, type = '' } = {}) {
    let { title, task } = this._tasks[index];
    // eslint-disable-next-line no-console
    console.log(`正在执行任务： ${title}`);
    return task(this._context, this.taskApi);
  }
}
