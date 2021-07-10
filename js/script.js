const template = createEmptyTemplate();

document.getElementById('todoForm')
    .addEventListener('submit', function (e) {
        e.preventDefault();
        const inputs = e.target.querySelectorAll('input, textarea');
        const todoItem = {};

        for(let input of inputs) {
            if(input.value === '') return alert('Заполние форму!');
            todoItem[input.name] = input.value;
        }

        saveItem(todoItem);
        renderItem(todoItem);
        e.target.reset();
        
    })


window.addEventListener('load', function (e) {
    if(!localStorage.todos) return;

    const todos = JSON.parse(localStorage.getItem('todos'));

    todos.forEach(function (item) {
        renderItem(item)
    });

    

})
document.addEventListener('change',(e)=>{
if(e.target.type === "checkbox"){
    let checkboxElem = document.querySelectorAll('input[type = "checkbox"]');
    for(let i = 0;i<=checkboxElem.length;i++){
        if(checkboxElem[i] === true){
            localStorage.todos[i].completed = true;
        }
    }
}
})
const deleteALL = document.getElementById('deleteALL');
deleteALL.addEventListener('click',function(){
    localStorage.clear();
    window.location.reload();
   
});






function saveItem(todoItem) {
     
    todoItem.completed = false;

    if(localStorage.todos) {
        let todosArray = JSON.parse(localStorage.todos);
        todosArray.push(todoItem);
        todosArray = JSON.stringify(todosArray);
        localStorage.setItem('todos', todosArray);
        return;
    }
   

    let todosArray = JSON.stringify([todoItem]);
    localStorage.setItem('todos', todosArray);
    localStorage.todos.TaskDone =checkboxElem.checked;
}


function renderItem(todoItem) {
    const localTemplate = template.cloneNode(true);
    localTemplate.querySelector('.taskHeading').innerText = todoItem.title
    localTemplate.querySelector('.taskDescription').innerText = todoItem.description;
    document.getElementById('todoItems').prepend(localTemplate);
}


function createEmptyTemplate() {
    const col = document.createElement('div');
    col.className = 'col-4';

    const taskWrapper = document.createElement('div');
    taskWrapper.className = 'taskWrapper';
    col.append(taskWrapper);

    const taskHeading = document.createElement('div');
    taskHeading.className = 'taskHeading';

    const taskDescription = document.createElement('div');
    taskDescription.className = 'taskDescription';

    taskWrapper.append(taskHeading);
    taskWrapper.append(taskDescription);
    const checkButton = document.createElement('input');
    checkButton.type='checkbox';
    taskWrapper.append(checkButton);
    const  removeTask = document.createElement('input');
    removeTask.setAttribute('type', 'button');
    removeTask.setAttribute("value", "Удалить");
    removeTask.setAttribute("id", "removeButton");
    taskWrapper.appendChild(removeTask);
    
    
    
   
    


    return col;
}












