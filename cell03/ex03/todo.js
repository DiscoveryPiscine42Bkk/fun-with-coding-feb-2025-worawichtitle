const list = document.getElementById("ft_list");
let TodoList = [];

// ไว้โหลดข้อมูลจาก cookies
let saved = getCookie("todoList");
if (saved) {
    TodoList = JSON.parse(decodeURIComponent(saved));
    // console.log(TodoList);
    render();
}

function newTodo() { // สร้างงานใหม่ 1.
    let name = prompt("Enter your TO DO:");
    if (name && name.trim() !== "") {
        TodoList.unshift(name.trim()); // ลบช่องว่างหน้าหลัง แล้วใส่ข้อมูลใน TodoList
        render(); // ส่งไป render 2.
    }
}

function render() { // โหลดข้อมูลจากคุกกี้ 2.
    list.innerHTML = ""; // ลบข้อมูลเก่าที่แสดงอยู่
    TodoList.forEach((task, index) => { //
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("todo");
        taskDiv.textContent = task;

        taskDiv.addEventListener("click", function () {
            if (confirm("Do you really want to remove this TO DO?")) {
                removeTask(index);
            }
        });

        list.appendChild(taskDiv);
    });
    saveTasks(); // ส่งไป saveTasks 3.
}

function saveTasks() { //เก็บ cookie 3.
    document.cookie = "todoList=" + encodeURIComponent(JSON.stringify(TodoList)) + "; path=/";
}

function getCookie(name) { // ***จุดกันตัวพิเศษ*** 
    const nameEQ = name + "=";
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        if (cookie.startsWith(nameEQ)) {
            return cookie.substring(nameEQ.length);
        }
    }
    return null;
}

function removeTask(index) {
    TodoList.splice(index, 1); // task ด้วย index
    render();
}
