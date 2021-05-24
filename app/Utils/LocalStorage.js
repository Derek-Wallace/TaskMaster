import { ProxyState } from "../AppState.js";

export function saveState(){
  window.localStorage.setItem('TaskMaster', JSON.stringify({
    lists: ProxyState.lists,
    tasks: ProxyState.tasks
  }))
}

export function loadState(){
  let loadedData = JSON.parse(window.localStorage.getItem('TaskMaster'))
  if (loadedData != null) {
    ProxyState.lists = loadedData.lists
    ProxyState.tasks = loadedData.tasks
  }
}
