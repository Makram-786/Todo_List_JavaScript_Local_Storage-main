const todo_form = document.getElementById('todo_form');
const item = document.getElementById('item');
let todoList = window.localStorage.getItem('list') ? JSON.parse(window.localStorage.getItem('list')) : [];
const container = document.querySelector('.todo_list');
let message = document.createElement('p');
var isEditing = false;
var editID = '';
document.addEventListener('DOMContentLoaded', function() {
    if(todoList.length){
        let list = JSON.parse(window.localStorage.getItem('list')) || [];
        renderList(list);
    }else{
        throwError()
    }
});
todo_form.addEventListener('submit', function(e) {
    e.preventDefault();
    const newItem = {
        id: Math.random(),
        item: item.value
    };
    if (!item.value) {
        return window.alert('Please fill the field first.');
    }
        if(isEditing){
            let updatedList = todoList.map(list=>{
                if(list.id==editID){
                    list.item=item.value
                }
                return list
            })
            window.localStorage.setItem('list', JSON.stringify(updatedList))
            this.isEditing=false;
            document.getElementById('submit').innerText = 'Add Todo'
            item.value=''
            renderList(updatedList)
        }else{

            todoList.push(newItem);
            window.localStorage.setItem('list', JSON.stringify(todoList));
            container.innerHTML = '';
            renderList(todoList);
            item.value = "";
        }


    
});
function renderList(todoList) {

    container.innerHTML = ''; // Clear the container before rendering
    if(todoList.length){
        todoList.forEach((list) => {
            container.innerHTML += `<div class='card'><li class="title">${list.item}</li>
            <li>
            <button class='btn-danger btn' id=${list.id} onclick='deleteItem(${list.id})'>Delete</button>
            <button class='btn-secondary btn' onclick='editItem(${list.id},true)'>Edit</button>
            </li></div>`;
        });
    }else{
        throwError()
    }
}
function editItem(id,isEditing){
    this.isEditing = isEditing;
    if(isEditing){
        document.getElementById('submit').innerText = 'Update Todo'
    }
    let requestedItem = todoList.find(list => list.id == id)
    item.value = requestedItem.item;
    this.editID = requestedItem.id;
}
function deleteItem(id) {
    // Filter the global todoList and update it
    todoList = todoList.filter(item => item.id !== id);
    
    // Update local storage with the new list
    window.localStorage.setItem('list', JSON.stringify(todoList));
    
    // Re-render the list
    renderList(todoList);
}
function  throwError(){
    if(!todoList.length){
         message.innerText = 'No Items Found'
         container.append(message)
    }
}
