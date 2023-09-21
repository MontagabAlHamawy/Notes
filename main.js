let input = document.querySelector(".in");
        let submit = document.querySelector(".p");
        let tasksdiv = document.querySelector(".co");

        let arrayofatasks = [];

        if (localStorage.getItem("tasks")) {
            arrayofatasks = JSON.parse(localStorage.getItem("tasks"));
            updateNoItemsText(); // تحديث نص "there are no items"
        }

        getdate();

        submit.onclick = function () {
            if (input.value !== "") {
                addTaskToArray(input.value);
                input.value = "";
            }
        };

        tasksdiv.addEventListener("click", (e) => {
            if (e.target.classList.contains("p3")) {
                deleteTask(e.target.parentElement.getAttribute("data-id"));
                e.target.parentElement.remove();
                updateNoItemsText(); // تحديث نص "there are no items"
            }
            if (e.target.classList.contains("conte")) {
                toggleTaskStatus(e.target.getAttribute("data-id"));
                e.target.classList.toggle("done");
            }
        });

        function addTaskToArray(taskText) {
            const task = {
                id: Date.now(),
                title: taskText,
                completed: false,
            };
            arrayofatasks.push(task);

            addElementToPage(task);
            saveData();
            updateNoItemsText(); // تحديث نص "there are no items"
        }

        function addElementToPage(task) {
            let div = document.createElement("div");
            div.className = "conte";
            if (task.completed) {
                div.classList.add("done");
            }
            div.setAttribute("data-id", task.id);

            let pp = document.createElement("p");
            pp.appendChild(document.createTextNode(task.title));
            pp.className = "p2";
            div.appendChild(pp);

            let span = document.createElement("p");
            span.className = "p3";
            span.appendChild(document.createTextNode("delete"));
            div.appendChild(span);

            tasksdiv.appendChild(div);
        }

        function saveData() {
            localStorage.setItem("tasks", JSON.stringify(arrayofatasks));
        }

        function getdate() {
            let data = localStorage.getItem("tasks");
            if (data) {
                let tasks = JSON.parse(data);
                tasks.forEach((task) => {
                    addElementToPage(task);
                });
            }
        }

        function deleteTask(taskId) {
            arrayofatasks = arrayofatasks.filter((task) => task.id != taskId);
            saveData();
        }

        function toggleTaskStatus(taskId) {
            arrayofatasks.forEach((task) => {
                if (task.id == taskId) {
                    task.completed = !task.completed;
                }
            });
            saveData();
        }

        // تحديث نص "there are no items"
        function updateNoItemsText() {
            if (arrayofatasks.length === 0) {
                document.querySelector(".k").style.display = "block";
            } else {
                document.querySelector(".k").style.display = "none";
            }
        }
