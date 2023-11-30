class TaskList extends HTMLElement {
    constructor() {
        super();

        this.tasks = [];
        this.attachShadow({ mode: 'open' });
        this.render();

    }

    connectedCallback() {
        const shadowRoot = this.shadowRoot.getElementById('addTaskButton')
        console.log(shadowRoot);
        shadowRoot.addEventListener('click', () => {
            const newTaskInput = this.shadowRoot.getElementById('newTaskInput');
            console.log(newTaskInput.value);
            if (newTaskInput.value) {
                this.addTask(newTaskInput.value);
                newTaskInput.value = '';
            }
        });
    }

    addTask(taskText) {
        this.tasks.push({ text: taskText, completed: false });
        this.render();
    }

    toggleTask(index) {
        this.tasks[index].completed = !this.tasks[index].completed;
        this.render();
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .form{
                    display: flex;
                    justify-content: center;
                    height: 50px;
                    padding: 20px;
                }
                .form > input {
                    margin: 5px;
                    font-size: 20px;
                    border-radius: 5px;
                    box-shadow: 2px 2px white;
                    border: none;
                }
                .form > input:active, :hover, :focus {
                    outline: 0;
                    outline-offset: 0;
                }
                .form > input:hover {
                    box-shadow: none;
                    transition: 0.2s;
                }
                .form > input:focus {
                    border: 2px solid black;
                }
                .form > button {
                    margin: 5px;
                    font-size: 15px;
                    border: none;
                    border-radius: 5px;
                    box-shadow: 2px 2px white;
                }
                .form > button:hover {
                    box-shadow: none;
                    transition: 0.2s;
                    transform: scale(1.1);
                }
                
                
                ul{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    
                }
                li{
                    list-style: none;
                    border: 2px solid black;
                    border-radius: 5px;
                    margin: 10px;
                    padding: 10px;
                    background-color: white;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: fit-content;
                }
                li > input {
                    width: 20px;
                    height: 20px;
                }
                li > span{
                    font-size: 25px;
                    color: gray;
                    margin: 10px;
                }
                li > button {
                    margin: 5px;
                    padding: 5px;
                    font-size: 15px;
                    border: none;
                    border-radius: 5px;
                    box-shadow: 2px 2px black;
                }
                li > button:hover {
                    box-shadow: none;
                    transform: scale(1.1);
                    transition: 0.5s;
                }
            </style>
            <div class="form">
                <input id="newTaskInput" type="text" placeholder="Write what you want to do">
                <button id="addTaskButton" onclick="this.connectedCallback">Add Task</button>
            </div>
            <ul>
            ${this.tasks.map((task, index) => `
            <li class="${task.completed ? 'completed' : ''}">
                <input type="checkbox" ${task.completed ? 'checked' : ''} 
                    onclick="document.querySelector('task-list').toggleTask(${index})">
                <span>${task.text}</span>
                <button onclick="document.querySelector('task-list').deleteTask(${index})">Delete</button>
            </li>
        `).join('')}
        </ul>
        `;
        this.connectedCallback()
    }
}
customElements.define('task-list', TaskList);