import { ProxyState } from "../AppState.js";
import { Task } from "../Models/Task.js";

class TasksService{
  addTask(formData){
    let newTask = new Task(formData.name, formData.list)
    ProxyState.tasks.push(newTask)
    ProxyState.tasks = ProxyState.tasks
  }

  removeTask(taskId){
    ProxyState.tasks = ProxyState.tasks.filter(task => task.id != taskId)
  }

}

export const tasksService = new TasksService