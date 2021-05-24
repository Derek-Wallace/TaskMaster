import { ProxyState } from "../AppState.js"
import { List } from "../Models/List.js"
import { saveState } from "../Utils/LocalStorage.js"

class ListService{

  constructor(){
    ProxyState.on('lists', saveState)
    ProxyState.on('tasks', saveState)
  }
  addList(formData){
    let newList = new List(formData.name, formData.color)
    ProxyState.lists.unshift(newList)
    ProxyState.lists = ProxyState.lists
  }

  removeList(list){
    ProxyState.lists = ProxyState.lists.filter(l => l.id != list)
  }
}

export const listService = new ListService()