import { ProxyState } from "../AppState.js"
import { tasksService } from "../Services/TasksService.js"




export class TasksController{
  constructor(){

  }

  addTask(event, list){
    event.preventDefault()
    let form = event.target
    let formData = {
      name: form.name.value,
      list: list
    }
    tasksService.addTask(formData)
 }

  check(taskId){
    let task = ProxyState.tasks.find(t => t.id == taskId)
     task.isChecked = document.getElementById(taskId).checked
     ProxyState.tasks = ProxyState.tasks
  }

 removeTask(taskId){
   let answer = window.confirm("This will delete the task, are you sure?")
   if (answer == true){
     tasksService.removeTask(taskId)
   }
 }
}