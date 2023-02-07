// 유저가 값을 입력한다

// +를 버튼을 클릭하면, 할일이 추가된다

// delete 버튼을 누르면 할일이 삭제된다
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남탭은, 끝난 아이탬만, 진행중 탭은 진행중인 아이탬. 
// 전체탭을 누르면 다시 전체아이탬으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
// 여러가지 가져오기떄문에 QuerySelectorAll <task-table 의 div> 
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
    //event는 클릭했을때 발생하는 모든 상황에 대해서 알려줌.
    tabs[i].addEventListener("click",function(event) {filter(event)});
}

function filter(event) {
    console.log("filter click", event.target.id);
    //클릭한 정확한 컴포넌트가 딱 프린트가 됨.
    mode = event.target.id;
    filterList = []
    //let filterList = [] <- 지역변수가 아닌 전역변수로 바꿔주자
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
            // EventListener 말고 onclick 도 있음 (두가지 방식)
            // single Quotation  <https://flexiple.com/javascript/double-vs-single-quotes-javascript/>
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
    // React 라이버러리.
}
function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
