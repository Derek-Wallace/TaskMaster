import { ProxyState } from "../AppState.js";
import { listService } from "../Services/ListService.js";
import { loadState } from "../Utils/LocalStorage.js";



function _drawLists(){
  let template = ''
  let lists = ProxyState.lists
  lists.forEach(list =>{
    let task = ProxyState.tasks.filter(t => t.list == list.id)
    let checkedTotal = ProxyState.tasks.filter(t => t.list == list.id && t.isChecked == true)
    template += /*html*/`
    <div class="col-3 my-5">
              <div class="card shadow">
                  <div class="card-header" style="background-color:${list.color}">
                    <div class="row justify-content-end">
                      <button class ="btn bg-transparent border-0" onclick="app.listsController.removeList('${list.id}')"><b class="text-light">X</b></button>
                    </div>
                    <div class="row justify-content-center">
                      <h4 class="text-light">${list.name.toUpperCase()}</h4>
                    </div>
                    <div class="row justify-content-center">
                      <h5 class="text-center text-light">${checkedTotal.length}/${task.length}</h5>
                    </div>
                  </div>
                  `
                  
                  task.forEach(t =>{
                    template += /*html*/ `
                    <div class="card-body d-flex p-0 align-items-center justify-content-between mx-2">
                    <div class="d-flex align-items-center">
                          <input type="checkbox" onclick="app.tasksController.check('${t.id}')" id="${t.id}" class="mx-2 "/>
                          <p class="pt-3 mx-2">
                          <b>${t.name}</b> 
                          </p>
                      </div>
                        <div class="">
                          <button class="btn text-danger mdi mdi-trash-can-outline" onclick="app.tasksController.removeTask('${t.id}')"></button>
                        </div>
                    </div>`
                    })



                  template += /*html*/`
                  <form class="m-2" onsubmit="app.tasksController.addTask(event, '${list.id}')">
                      <label for="name" class="sr-only" >Task Name</label>
                      <input required type="text" minlength = "3" maxlength = "50" name="name" placeholder="Task Name" class="border-top-0 border-right-0 border-left-0">
                      <button class="btn btn-success mdi mdi-check"></button>
                      </form>
              </div>
          </div>
    `
  })
  document.getElementById("lists").innerHTML = template
  ProxyState.tasks.forEach(t =>{
    if (t.isChecked == true) {
      document.getElementById(t.id).checked = true
    }
  })
}
export class ListsController{
  constructor(){
    ProxyState.on("lists", _drawLists)
    ProxyState.on("tasks", _drawLists)
    loadState()
  }


  addList(event){
    event.preventDefault()
    let form = event.target
    let formData = {
      name: form.name.value,
      color: form.color.value
    }
    listService.addList(formData)
    form.reset()
  }

  removeList(list){
    let answer = window.confirm("This will delete everything, are you sure?")
    if (answer == true){
      listService.removeList(list)
    }
  }
}