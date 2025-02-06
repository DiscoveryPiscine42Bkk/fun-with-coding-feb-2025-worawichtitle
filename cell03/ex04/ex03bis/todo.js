$(document).ready(function() {
    const $list = $("#ft_list");
    let TodoList = [];

    // ไว้โหลดข้อมูลจาก cookies 1.1
    let saved = getCookie("todoList"); //ไปเอาค่าใน cookie มาใส่ใน list 1.2
    if (saved) {
        TodoList = JSON.parse(decodeURIComponent(saved));
        render(); // ส่งไป render 1.3
    }

    $("#new").click(function() { // สร้างงานใหม่เมื่อกดปุ่ม 2.1
        let name = prompt("Enter your TO DO:");
        if (name && name.trim() !== "") {
            TodoList.unshift(name.trim()); // ลบช่องว่างหน้าหลัง แล้วใส่ข้อมูลใน TodoList
            render(); // ส่งไป render 2.2
        }
    });

    function render() { // โหลดข้อมูลจากคุกกี้ 1.3 2.2
        $list.empty(); // ลบข้อมูลเก่าที่แสดงอยู่
        TodoList.forEach((task, index) => {
            const $taskDiv = $("<div>").addClass("todo").text(task);

            $taskDiv.click(function() { // ถ้ากดตัวงานจะลบ 3.1
                if (confirm("Do you really want to remove this TO DO?")) {
                    removeTask(index); // ถ้ากดตัวยืนยันจะส่ง index ไปเพื่อลบด้วย index 3.2
                }
            });

            $list.append($taskDiv);
        });
        saveTasks(); // ส่งไป saveTasks 1.4 2.3
    }

    function saveTasks() { //เก็บ cookie 1.4 2.3
        document.cookie = "todoList=" + encodeURIComponent(JSON.stringify(TodoList)) + "; path=/";
    }

    function getCookie(name) { // เอาค่าใน cookie ออกมา 1.2
        const nameEQ = name + "=";
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            if (cookie.startsWith(nameEQ)) {
                return cookie.substring(nameEQ.length);
            }
        }
        return null;
    }

    function removeTask(index) { // ลบ task ด้วย index 3.2
        TodoList.splice(index, 1);
        render();
    }
});