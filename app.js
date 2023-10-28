const form = document.querySelector(".formAdd");
const addButton = document.querySelector(".addButton");
const addInput = document.querySelector("#input");
const searchInput = document.querySelector("#search");
const searchButton = document.querySelector(".searchButton");
const AllRemoveButton = document.querySelector(".removeButton");
const addListForm = document.querySelector(".container-left");
const searchListForm = document.querySelector("right-top");
const todoList = document.querySelector(".todoList");

let todos = [];

runEvent();

function runEvent() {
    form.addEventListener("submit", addTodo);
    todoList.addEventListener("click", removeTodoUI);
    AllRemoveButton.addEventListener("click", allTodosRemove);
    document.addEventListener("DOMContentLoaded", pageLoaded);
    searchInput.addEventListener("keyup", filter);

}

function addTodo(e) {
    e.preventDefault();

    const inputText = addInput.value.trim();
    if (inputText === null || inputText === "") {
        alert("Lütfen Boş Bırakmayınız");
    }
    else {
        addTodoUI(inputText);
        addTodoToStorage(inputText);
        alert("Girdiğiniz Todo Listeye Eklendi");

    }
}

function addTodoUI(newTodo) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = "";
}

function removeTodoUI(e) {
    if (e.target.className === "fa fa-remove") {
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        alert("Todo Başarıyla Silindi");

        removeTodoStorage(todo.textContent);
    }
}

function removeTodoStorage(removeTodo){
    checkTodoFromStorage();
    todos.forEach(function(todo,index){
        if(removeTodo===todo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));


}
function allTodosRemove() {
    const todoListesi = document.querySelectorAll("li");
    if (todoListesi.length > 0) {
        todoListesi.forEach(function (todo) {
            todo.remove();
            localStorage.clear("todos");
        });
        alert("Listedeki Tüm Todolar Silindi");
    }
    else {
        alert("Silmek İstediğiniz Todo Listesinde En Az Bir Tane Todo Olmalı");
    }
}

function pageLoaded() {
    checkTodoFromStorage();
    todos.forEach(function (todo) {
        addTodoUI(todo);
    })
}
function checkTodoFromStorage() {
    if (localStorage.getItem("todos") == null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function addTodoToStorage(newTodo) {
    checkTodoFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function filter(e) {
    const filterValue = e.target.value.toLowerCase().trim();
    const list = document.querySelectorAll("li");


    if (list.length > 0) {
        list.forEach(function (todo) {
            if (todo.textContent.toLowerCase().trim().includes(filterValue)){
                todo.setAttribute("style","display: block");
            }
            else{
                todo.setAttribute("style","display: none");
            }
        })
    }
    else {
        alert("Todo Listesinde Arama Yapmak İçin En Az Bir Tane Todo Olmalıdır.");
    }



}