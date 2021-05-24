import { generateId } from "../Utils/GenerateId.js"

export class Task{
  constructor(name, list, isChecked, id){
    this.name = name
    this.list = list
    this.isChecked = false
    this.id = id || generateId()
  }
}