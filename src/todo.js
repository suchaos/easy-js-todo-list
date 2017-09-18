var log = function() {
    console.log.apply(console, arguments)
}

var addButton = document.querySelector("#id-button-add")
addButton.addEventListener("click", function() {
    var todoInput = document.querySelector("#id-input-todo")
    var todo = todoInput.value
    var todoContainer = document.querySelector(".todo-container")
    var template = templateTodo(todo)
    if (todo) {
        todoContainer.insertAdjacentHTML('beforeend', template)
        todoInput.value = ''
    } else {
        alert("请填写内容")
    }
})

function templateTodo(todo) {
    var t = `
    <div class="todo-cell">
        <button class="todo-done">完成</button>
        <button class="todo-delete">删除</button>
        <span contenteditable="true">${todo}</span>
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
        todoDiv.remove()
    }
})

function toggleClass(element, className) {
    if (element.classList.contains("done")) {
        element.classList.remove("done")
    } else {
        element.classList.add("done")
    }
}