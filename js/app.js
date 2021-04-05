document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.querySelector(".add-task") 
  const addButton = document.querySelector(".add-button") 
  const incompleteTaskHolder = document.querySelector(".todo-list") 
  const completedTasksHolder = document.querySelector(".completed-tasks") 

  var createNewTaskElement = function (taskString) {
    var listItem = document.createElement("li")
    var checkBox = document.createElement("input") 
    var label = document.createElement("label") 
    var editInput = document.createElement("input") 
    var editButton = document.createElement("button") 
    var deleteButton = document.createElement("button") 
    var deleteButtonImg = document.createElement("img")

    label.innerText = taskString
    label.className = 'task'

    checkBox.type = "checkbox"
    editInput.type = "text"
    editInput.className = "task"

    editButton.innerText = "Edit" 
    editButton.className = "edit-task"

    deleteButton.className = "delete-task"
    deleteButtonImg.src = './assets/icons/remove.svg'
    deleteButton.appendChild(deleteButtonImg)

    listItem.appendChild(checkBox)
    listItem.appendChild(label)
    listItem.appendChild(editInput)
    listItem.appendChild(editButton)
    listItem.appendChild(deleteButton)
    return listItem
  }

  var addTask = function () {
    console.log("Add Task...")
    if (!taskInput.value) return
    var listItem = createNewTaskElement(taskInput.value)
    incompleteTaskHolder.appendChild(listItem)
    bindTaskEvents(listItem, taskCompleted)
    taskInput.value = ""
  }

  var editTask = function () {
    console.log("Edit Task...")
    console.log("Change 'edit' to 'save'")


    var listItem = this.parentNode

    var editInput = listItem.querySelector('input[type=text]')
    var label = listItem.querySelector("label")
    var editBtn = listItem.querySelector(".edit-task")
    var containsClass = listItem.classList.contains("editMode")
    if (containsClass) {
      label.innerText = editInput.value
      editBtn.innerText = "Edit"
    } else {
      editInput.value = label.innerText
      editBtn.innerText = "Save"
    }

    listItem.classList.toggle("editMode")
  }

  var deleteTask = function () {
    console.log("Delete Task...")
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem)
  }

  var taskCompleted = function () {
    console.log("Complete Task...")
    var listItem = this.parentNode
    completedTasksHolder.appendChild(listItem)
    bindTaskEvents(listItem, taskIncomplete)

  }

  var taskIncomplete = function () {
    console.log("Incomplete Task...")
    var listItem = this.parentNode
    incompleteTaskHolder.appendChild(listItem)
    bindTaskEvents(listItem, taskCompleted)
  }

  var ajaxRequest = function () {
    console.log("AJAX Request")
  }

  addButton.onclick = addTask
  addButton.addEventListener("click", addTask)
  addButton.addEventListener("click", ajaxRequest)


  var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("bind list item events")
    var checkBox = taskListItem.querySelector(".check")
    var editButton = taskListItem.querySelector(".edit-task")
    var deleteButton = taskListItem.querySelector(".delete-task")


    editButton.onclick = editTask
    deleteButton.onclick = deleteTask
    checkBox.onchange = checkBoxEventHandler
  }

  for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted)
  }

  for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete)
  }

})