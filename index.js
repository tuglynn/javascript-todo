const message = document.getElementById('message');
const listOfTasks = document.getElementById('list');
function clearMessage() {
    setTimeout(() => message.innerHTML = '', 3000);
}
function clearStorage() {
    localStorage.setItem('toDoList', '');
    listOfTasks.innerHTML = '';
    message.innerHTML = 'todo list cleared';
    clearMessage();
}
function genList() {
    if (localStorage.getItem('toDoList')) {
        const savedList = localStorage.getItem('toDoList');
        const splitList = savedList.split('|');
        for (let i = 0; i < splitList.length; i++) {
            listOfTasks.innerHTML += `
            <li>${splitList[i]}<button class="delbtn" onclick="delTodo(event);">X</button></li>`;
        }
    }
}
function delTodo(event) {
    const clickedItem = event.target;
    if (clickedItem.classList.contains('delbtn')) {
        const deleteItem = clickedItem.parentNode;
        const toDoText = deleteItem.innerHTML.split('<')[0];
        const oldList = localStorage.getItem('toDoList');
        const splitList = oldList.split('|');
        const updatedTaskArray = splitList.filter(task => task !== toDoText);
        const newList = updatedTaskArray.join('|');
        localStorage.setItem('toDoList', newList);
        deleteItem.remove();
        message.innerHTML = 'Todo completed';
        clearMessage();
    }
}
function addToDo(event) {
    event.preventDefault();
    const todo = document.getElementById('todo').value.trim();
    //check if a todo was entered
    if (todo == '') {
        message.innerHTML = 'please enter a todo';
        clearMessage();
        //add todo to list
    } else {
        listOfTasks.innerHTML += `
        <li>${todo}<button class="delbtn" onclick="delTodo(event);">X</button></li>
        `
        let currentTasks = localStorage.getItem('toDoList');
        if (!currentTasks) {
            localStorage.setItem('toDoList', todo);
        } else {
            let newTask = currentTasks + '|' + todo;
            localStorage.setItem('toDoList', newTask);
        }
        document.querySelector('#todo').value = '';
    }
    return false;
}
genList();