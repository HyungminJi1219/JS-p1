
let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
let horizontalUnderLine = document.getElementById("under-line");

tabs.forEach(menu=>menu.addEventListener("click",(e)=>horizontalIndicator(e)));

function horizontalIndicator(e) {
    horizontalUnderLine.style.left = e.currentTarget.offsetLeft + "px";
    horizontalUnderLine.style.width = e.currentTarget.offsetWidth + "px";
    horizontalUnderLine.style.top = e.currentTarget.offsetHeight + "px";
}

let taskList = []
let filterList = []
let mode = "all"
addButton.addEventListener("click",addTask);

for (let i = 1; i <tabs.length; i++ ) {
    tabs[i].addEventListener("click",function(event) {filter(event)});
}

function filter(event) {
    console.log("filter click", event.target.id);
    mode = event.target.id;
    filterList = []
    if (mode == "all") {
        render();
    }
    else if (mode == "ongoing") {
        for (let i = 0; i <taskList.length; i++) {
            if (taskList[i].isComplete == false) {
                filterList.push(taskList[i]);
            }
        }
        render();
    }else if (mode == "done") {
        for (let i = 0; i <taskList.length; i++) {
            if (taskList[i].isComplete == true) {
                filterList.push(taskList[i]);
            }
        }
        render()
    }
}
function addTask() {
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task);
    filterList.push(task);
    console.log(taskList);
    render();
}
function toggleComplete(id) {
    for (let i = 0; i <taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList)

}
function render() {
    let list = []
    if (mode == "all") {
        list = taskList;
    }
    else if (mode == "ongoing" || mode == "done") {
        list = filterList;
    }
    let resultHTML = '';
    console.log("inside", list );

    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            resultHTML += `<div class = "task">
            <div class = "task-done"> ${list[i].taskContent} </div>
            <div>
                <button onClick = "toggleComplete('${list[i].id}')">Check</button>
                <button onClick = "deleteTask('${list[i].id}')">Delete</button>
            </div>
            </div>`;
        }
        else {
            resultHTML += `<div class = "task">
                <div> ${list[i].taskContent} </div>
                <div>
                    <button onClick = "toggleComplete('${list[i].id}')">Check</button>
                    <button onClick = "deleteTask('${list[i].id}')">Delete</button>
                </div>
                </div>`;
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}
function deleteTask(id) {
    for (let i = 0; i <taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i,1)
            filterList.splice(i,1);
            break;
        }
    }
    render()
}
function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
