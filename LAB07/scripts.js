document.addEventListener("DOMContentLoaded", function () {
    // กำหนดตัวแปรสำหรับ element ต่าง ๆ ใน DOM
    const todoList = document.getElementById("todo-list");
    const todoInput = document.getElementById("todo-input");
    const addButton = document.getElementById("add-button");

    // อาร์เรย์สำหรับเก็บรายการ Todo
    let todos = [];

    // เพิ่มรายการ Todo
    function addTodo() {
        // ดึงข้อความจาก input element
        const todoText = todoInput.value.trim();
        if (todoText !== "") {
            // สร้าง object ที่เก็บข้อมูลของรายการ Todo
            const todoItem = {
                text: todoText,
                completed: false,
            };
            // เพิ่มรายการ Todo ลงในอาร์เรย์
            todos.push(todoItem);
            // แสดงรายการ Todo ใหม่
            renderTodoList();
            // ล้างค่าใน input element
            todoInput.value = "";
        }
    }

    // ลบรายการ Todo
    function deleteTodo(index) {
        // ใช้ splice เพื่อลบรายการที่ต้องการตาม index
        todos.splice(index, 1);
        // แสดงรายการ Todo ใหม่หลังจากลบ
        renderTodoList();
    }

    // ตรวจสอบ/ยกเลิกการเสร็จสิ้นรายการ Todo
    function toggleComplete(index) {
        // เปลี่ยนสถานะการเสร็จสิ้นของรายการที่ต้องการ
        todos[index].completed = !todos[index].completed;
        // แสดงรายการ Todo ใหม่
        renderTodoList();
    }

    // แสดงรายการ Todo บนหน้าเว็บ
    function renderTodoList() {
        console.log(todos);
        // ล้าง HTML ใน todoList
        todoList.innerHTML = "";
        // สร้าง element ใหม่สำหรับแต่ละรายการ Todo
        for (let i = 0; i < todos.length; i++) {
            const todoItem = todos[i];
            const listItem = document.createElement("li");
            listItem.textContent = todoItem.text;

            // เพิ่ม class "completed" ถ้ารายการ Todo เสร็จสิ้นแล้ว
            if (todoItem.completed) {
                listItem.classList.add("completed");
            }

            // สร้างปุ่ม "ลบ" และ "เสร็จ"/"ยกเลิก"
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "ลบ";
            deleteButton.addEventListener("click", () => deleteTodo(i));

            const completeButton = document.createElement("button");
            completeButton.textContent = todoItem.completed ? "ยกเลิกเสร็จ" : "เสร็จ";
            completeButton.addEventListener("click", () => toggleComplete(i));

            // เพิ่มปุ่มลบและปุ่มเสร็จ/ยกเลิกเข้าไปใน listItem
            listItem.appendChild(completeButton);
            listItem.appendChild(deleteButton);

            // เพิ่ม listItem เข้าไปใน todoList
            todoList.appendChild(listItem);
        }
    }

    // การกดปุ่ม "เพิ่ม"
    addButton.addEventListener("click", addTodo);

    // การกด Enter ใน input
    todoInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTodo();
        }
    });

    // แสดงรายการ Todo ครั้งแรก
    renderTodoList();
});
