var log = function() {
    console.log.apply(console, arguments)
}

var todoList = []

var addButton = document.querySelector("#id-button-add")
addButton.addEventListener("click", function() {
    var todoInput = document.querySelector("#id-input-todo")
    var task = todoInput.value
    var todo = {
        task: task,
        time: currentTime()
    }
    todoList.push(todo)
    saveTodoList()
    insertTodoToHtml(todo)
    todoInput.value = ''
})

function insertTodoToHtml(todo) {
    var todoContainer = document.querySelector(".todo-container")
    var template = templateTodo(todo)
    if (todo.task) {
        todoContainer.insertAdjacentHTML('beforeend', template)
    } else {
        // alert("请填写内容")
    }
}

function templateTodo(todo) {
    var t = `
    <div class="todo-cell">
        <button class="todo-done">完成</button>
        <button class="todo-delete">删除</button>
        <span contenteditable="true">${todo.task}</span>
        <span>${todo.time}</span>
    </div>
    `
    return t
}

var todoContainer = document.querySelector(".todo-container")
todoContainer.addEventListener("click", function(event) {
    var target = event.target
    var todoDiv = target.parentElement
    if (target.classList.contains("todo-done")) {
        toggleClass(todoDiv, "done")
    } else if (target.classList.contains("todo-delete")) {
        var index = indexOfElement(target.parentElement)
        todoDiv.remove()
        todoList.splice(index, 1)
        saveTodoList()
    }
})

// 点击修改task, 阻止回车换行
todoContainer.addEventListener("keydown", function(event) {
    var target = event.target
    if (event.key == "Enter") {
        // 失去焦点
        target.blur()
        // 阻止回车换行
        event.preventDefault()
    } 
})

function toggleClass(element, className) {
    if (element.classList.contains("done")) {
        element.classList.remove("done")
    } else {
        element.classList.add("done")
    }
}

function currentTime() {
    var d = new Date()
    var month = d.getMonth() + 1
    var date = d.getDate()
    var hours = d.getHours()
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    var timeString = `${month}/${date} ${hours}:${minutes}:${seconds}`
    return timeString
}

// 返回自己在父元素中的下标
function indexOfElement(element) {
    var parent = element.parentElement
    console.log(parent)
    for (var i = 0; i < parent.children.length; i++) {
        var e = parent.children[i]
        console.log(parent.children[i])
        if (e === element) {
            return i
        }
    }
}

function saveTodoList() {
    var s = JSON.stringify(todoList)
    localStorage.todoList = s
}

function loadTodoList() {
    var s = localStorage.todoList
    return JSON.parse(s)
}

todoList = loadTodoList()
for (var i = 0; i < todoList.length; i++) {
    var todo = todoList[i];
    insertTodoToHtml(todo)
}