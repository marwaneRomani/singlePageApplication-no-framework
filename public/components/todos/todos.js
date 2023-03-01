import { getTodos } from "../../services/getTodos.js";
import { apptlicationState } from "../../state/state.js";

const html = `
<Style>
* {
   margin: 0;
   padding: 0;
   font-family: sans-serif;
}


header { 
   display: flex;
   padding: 1rem;
   background-color: #06be9a;
}

header > h1 {
   color: #ebdbdb;
}

main {
   display: flex;
   justify-content: space-around;
   padding-top: 20px;
}

main > button:nth-child(1) {
   background-color: #06b89400;
   border: 1px solid #06be9a00;
   padding: 10px 25px;
   text-align: center;
   text-decoration: none;
   font-size: 15px;
   cursor: pointer;
}

.data-table {
   border-collapse: collapse;
   font-size: 0.9em;
   min-width: 400px;
   border-radius: 5px 5px 0 0;
   overflow: hidden;
   box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.data-table thead tr {
   background-color: #009879;
   color: #ffffff;
   text-align: left;
   font-weight: bold;
}


.data-table th,
.data-table td {
   padding: 12px 15px;
}

.data-table tbody tr {
   border-bottom: 1px solid #dddddd;
}

.data-table tbody tr:nth-of-type(even) {
   background-color: #f3f3f3;
}

.data-table tbody tr:last-of-type {
   border-bottom: 2px solid #009879;
}

.data-table tbody tr.active-row {
   font-weight: bold;
   color: #009879;
}

.button-delete {
   background-color: #F44336;
   border: 1px solid #F44336;
   border-radius: 3px;
   color: #ffffff;
   padding: 10px 25px;
   text-align: center;
   text-decoration: none;
   font-size: 13px;
   cursor: pointer;
   margin: 3px ;
}

.button-complete {
   background-color: #1f5dad;
   border: 1px solid #3148cc;
   border-radius: 3px;
   color: #ffffff;
   padding: 10px 25px;
   text-align: center;
   text-decoration: none;
   font-size: 13px;
   cursor: pointer;
   margin: 3px ;   
}

.button-completed {
   background-color: #36f48b;
   border: 1px solid #31cc72;
   border-radius: 3px;
   color: #ffffff;
   padding: 10px 25px;
   text-align: center;
   text-decoration: none;
   font-size: 13px;
   margin: 3px ;   
}

.form{
   align-items: center;
   width: 100%;
   display: flex;
   flex-direction: column;
}
.form>*{
   width: 300px;
   margin: 10px;
}
.controls{
   display: flex;
   justify-content: space-between;
}
input::placeholder{
padding: 10px;
}
input{
   padding: 10px 0px;
}
select{
 padding: 10px;
}
.controls button{
   padding: 10px 20px;
   border: 0px;
   border-radius: 5px;
   font-size: 1em;
}
.reset{
   background-color: gray;
   color: white;
}
.submit{
   background-color: rgb(22, 126, 252);
   color: white;
}

.disable {
   background-color: rgb(139 148 159);
}    </Style>
   <table class="data-table">
   <thead>
       <tr>
           <th>userId</th>
           <th>id</th>
           <th>title</th>
           <th>completed</th>
           <th>delete</th>
           <th>complete</th>
       </tr>
   </thead>

   <tbody id="table-body">
       
   </tbody>
   </table>
   <div class="form">
       <input id="todo" placeholder="todo">
       <select id="userId">
           <option value="1">1</option>
           <option value="2">2</option>
       </select>
       <div class="controls">
           <button class="reset">reset</button>
           <button class="submit">submit</button>
       </div>
   </div>

`


export function renderComponent({ loggedIn }) {
    let div = getHtml(html);

    let table = div.querySelector("#table-body");

    getTodos()
    .then(res => {
        res.json()
           .then(data => {
              data.todos.forEach(todo => {
                 renderTodo(todo,table);
              });
           })
    });


    return div;
}


function getHtml(html) {
    const div = document.createElement("div");
    
    div.innerHTML = html;

    return div;
}


function renderTodo (todo, table) {
   let tr = document.createElement("tr",);
   let todoId = document.createElement("td");
   let userId = document.createElement("td");
   let todoElement = document.createElement("td");
   let isComplete = document.createElement("td");

   let del = document.createElement("td");
   let compl = document.createElement("td");

   let deleteBtn = createHtmlElement("button", {"class" : "button-delete"}, "delete")
   del.appendChild(deleteBtn);


   let completeBtn = createHtmlElement("button", {"class" : (!todo.completed) ? "button-complete" : "button-completed" }, (!todo.completed) ? "complete" : "completed")
   compl.appendChild(completeBtn);

   deleteBtn.addEventListener("click", e => { 
       deleteTodo(todo)
           .then(data => table.removeChild(tr));
   })

   if (todo.completed) {
       tr.classList.add("active-row")
   }
   else {
       completeBtn.addEventListener("click", e => {
           updateTodo({ id: todo.id, userId: todo.userId, title: todo.title, completed: true });
           tr.classList.add("active-row");
           completeBtn.classList.remove("button-complete");
           completeBtn.classList.add("button-completed");
           completeBtn.innerText = "completed";
           isComplete.innerText = true;
       })
   }   

   todoId.innerText = todo.id;
   userId.innerText = todo.userId;
   todoElement.innerText = todo.title;
   isComplete.innerText = todo.completed;

   tr.append(userId,todoId,todoElement,isComplete, del, compl);

   table.appendChild(tr);
}


function createHtmlElement(tagName , attributes = {}, content = null) {
   const element = document.createElement(tagName);

   element.innerText = content;
   
   for (const [attribute, value] of Object.entries(attributes)) {
       if (value != false && value != null) 
           element.setAttribute(attribute, value);
   }
   
   return element;
}