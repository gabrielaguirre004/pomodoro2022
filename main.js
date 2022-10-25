
const task = [];
let time = 0;
let timer = null;
let timerbreak = null;
let current = null;

const bAdd = document.querySelector("#bAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector("#form");
const taskName = document.querySelector('#time #taskName');

renderTime();
renderTasks();

form.addEventListener("submit", e => {
    e.preventDefault();
    if (itTask.value != ""){
      createTask(itTask.value);
      itTask.value = "";
      renderTasks();
    }
});

function createTask(value) {

    const newTask ={
        id:(Math.random() * 100).toString(36).slice(3),
        title: value,
        completed:false,

    };
    task.unshift(newTask);
}
function renderTasks (){
    const html = task.map(task =>{
            return` 
            <div class="task">
                <div class="completed">${task.completed ? `<span class="done">Done</span>`
                :`<button class="start-button"data-id="${task.id}">Start</button>`}</div>
                <div class="title">${task.title}</div>
            </div>
            `;  
        } );

        const taskContainer =document.querySelector('#tasks');
        taskContainer.innerHTML=html.join('');

        const startButtons= document.querySelectorAll('.task .start-button');
        startButtons.forEach(button => {
            button.addEventListener('click', e => {
                if(!timer){
                    const id = button.getAttribute('data-id');
                    starButtonHandler(id);
                    button.textContent='In progress.....'
                }
         });
     });    

}

function starButtonHandler(id) {
    time = 25 * 60 ;
    current =id;
    const taskIndex = task.findIndex(task => task.id === id );
    taskName.textContent = task [taskIndex].title;
       renderTime();

    timer= setInterval(()=> {
        timerHandler(id);
    },1000);
}

function timerHandler(id) {
    time --;
    renderTime();

    if( time ===0){
        clearInterval(timer);
        markCompleted(id);
        timer = null;
        renderTasks();
        startBreak();
    }
}
function startBreak() {
     time = 5 * 60 ;
     taskName.textContent = `Break`;
       renderTime();
     timerbreak = setInterval( () =>{
        timerBreakHandler();
     }, 1000 );
}

function timerBreakHandler() {
    time --;
    renderTime();

    if( time ===0){
        clearInterval(timerbreak);
        current= null;
        timerbreak = null;
        taskName.textContent = ``;
        renderTasks();
        
    }

}

function renderTime(){
     const timeDiv = document.querySelector(`#time #value`);
     const minutes = parseInt(time / 60);
     const seconds = parseInt( time % 60);
     timeDiv.textContent = `${ minutes < 10 ? "0" : " "} ${ minutes } : ${ seconds < 10 ? "0" : " "} ${ seconds}`; 
}

function markCompleted(id) { 
    const taskIndex = task.findIndex((task) => task.id === id );
    task [taskIndex].completed = true;

}










