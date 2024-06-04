/**
 * Color 1 : #607EAA
 * Color 2 : #AC7088
 * Color 3 : #EED180
 * Color 4 : #F37878
 * Color 5 : #90C8AC
 * Color 6 : #D8CCA3
 * Color 7 : #82A284
 */


let todoList = [
    {
        id: 1,
        date: "2022-08-10",
        time: "11:30",
        todo: "Belanja Mingguan",
        color: "#90C8AC"
    },
    {
        id: 2,
        date: "2022-08-10",
        time: "10:30",
        todo: "Memasak makanan",
        color: "#F37878"
    },
    {
        id: 3,
        date: "2022-08-20",
        time: "17:30",
        todo: "Belajar Coding",
        color: "#EED180"
    },
    {
        id: 4,
        date: "2022-08-13",
        time: "14:30",
        todo: "Bersih-bersih rumah",
        color: "#82A284"
    },
    {
        id: 5,
        date: "2022-08-16",
        time: "19:30",
        todo: "Mencuci Baju",
        color: "#607EAA"
    }
]


const showTodo = (data) => {
    console.log(data)
    let content = ""
    
    data.forEach(element => {
         content += `
            <div class="card-body">
                <h5 class="card-title">${element.todo}</h5>
                <p class="card-text">${element.time}</p>
                <p>${element.date}</p>
                <p>${element.color}</p>
                <button type="button" class="btn btn-primary" onclick="deleteTodo(${element.id})">Hapus</button>
            </div>
        `
    })
    
    document.getElementById("list-todo").innerHTML = content;
}

showTodo(todoList);

const addData = () => {
    let date = document.getElementById("inputDate").value;
    let time = document.getElementById("inputTime").value;
    let todo = document.getElementById("inputTodo").value;
    let color = "";

    let option1 = document.getElementById('option1');
    let option2 = document.getElementById('option2');
    let option3 = document.getElementById('option3');
    let option4 = document.getElementById('option4');
    let option5 = document.getElementById('option5');
    let option6 = document.getElementById('option6');
    let option7 = document.getElementById('option7');

    // Mungkin code if nya dipakai buat final exam saja
     if (option1.checked) {
        color = "#607EAA";
      } else if (option2.checked) {
        color = "#AC7088";
      } else if (option3.checked) {
        color = "#EED180";
      } else if (option4.checked) {
        color = "#F37878";
      } else if (option5.checked) {
        color = "#90C8AC";
      } else if (option6.checked) {
        color = "#D8CCA3";
      } else {
        color = "#82A284";
      }
    todoList.push({date: date, time: time, todo: todo, color : color});
    showTodo(todoList);
    clearData(); 
}

const clearData = () => {
    document.getElementById("inputDate").value = "";
    document.getElementById("inputTime").value = "";
    document.getElementById("inputTodo").value = "";
}

const sortAscending = () => {
    todoList.sort((a, b) => new Date(a.date) - new Date(b.date));
    showTodo(todoList);
}

const sortDescending = () => {
    todoList.sort((a, b) => new Date(b.date) - new Date(a.date));
    showTodo(todoList);
}

// Function delete courseList
const deleteTodo = (id) => {
    todoList.forEach((element, index) => {
        if(id === element.id) {
            todoList.splice(index, 1);
        }
    })
    
    showTodo(todoList);
}

// Function search
const searchTodo = () => {
    let text = document.getElementById("search").value;
    
    // const result = todoList.filter(element => element.todo.indexOf(text) != -1)
    const result = todoList.filter(element => element.todo.toLowerCase().includes(text));
    // console.log(result)
    showTodo(result);
}