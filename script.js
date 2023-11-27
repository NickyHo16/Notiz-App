let title = ['Garten', 'Haushalt']
let todo = ['Rasen', 'Spülmaschine ausräumen']
let trashTitle = ['Lerne']
let trashTodo = ['DA']

load();


function addNote() {
    document.getElementById('content').innerHTML = ''; /*4.Das Element leeren, damit nur neue Aufgaben hinzugefügt werden(wird gecleart) */

    for (let i = 0; i < title.length; i++) {            /*5. durch unser Array neu durch-iterrieren*/
        document.getElementById('content').innerHTML += `
        <div class="outputNote" id="output1">
                <h3>${title[i]}</h3>
                <span>${todo[i]}</span>
                <button class="buttonDelete" id="deleteTodo" onclick="deleteTodo(${i})" >Delete</button>

            </div>
        `;
    }

}

function addTodo() {

    let todos = document.getElementById('inputField').value; /* 1.Input in eine Variable binden*/
    let task = document.getElementById('inputText').value;

    if (document.getElementById('inputField').value.length && document.getElementById('inputText').value.length > 0) {
        title.push(todos);                                       /*2.aus dem value ins Array pushen*/
        todo.push(task);

        addNote();                                              /*3.um die Dinge zur Liste hinzuzufügen, muss die Funktion noch einmal aufgerufen werden */
        document.getElementById('inputField').value = '';       /*6. Das Textfeld leeren */
        document.getElementById('inputText').value = '';        /*6. Das Textfeld leeren */
        save();
        /*trashRender();*/
    } else {
        alert('Bitte Titel und Notiz eintragen!')
    }
}


function deleteTodo(position) {

    let trashTi = title[position]; /*eine varaible definieren für den trash*/
    let trashNo = todo[position];

    trashTitle.push(trashTi);      /*den trash ins Array pushen welches ich grade lösche */
    trashTodo.push(trashNo);       /*den trash ins Array pushen welchen ich grade löschen*/

    title.splice(position, 1);     /*löscht den Eintrag aus dem Array welches grade gelöscht wurde*/
    todo.splice(position, 1);      /*löscht den Eintrag aus dem Array welches grade gelöscht wurde*/

    addNote();                     /*fügt die Funktion hinzu, wenn ich was im HTML Code ändere, muss ich den Code wieder aufrufen */
    save();                        /*ruft die Funtion auf, die Einträge aus dem Array im Local Storage speichert */



}

/*Local Storage, Variablen speichern*/

function save() {
    let titleAsText = JSON.stringify(title);
    localStorage.setItem('title', titleAsText);
    let todoAsText = JSON.stringify(todo);
    localStorage.setItem('todo', todoAsText);

    let trashTitleAsText = JSON.stringify(trashTitle);
    let trashTodoAsText = JSON.stringify(trashTodo);
    localStorage.setItem('trashTitle', trashTitleAsText);
    localStorage.setItem('trashTodo', trashTodoAsText);
}

function load() {
    let titleAsText = localStorage.getItem('title');
    let todoAsText = localStorage.getItem('todo');
    if (titleAsText && todoAsText) {
        title = JSON.parse(titleAsText);
        todo = JSON.parse(todoAsText);

    }

    let trashTitleAsText = localStorage.getItem('trashTitle');
    let trashTodoAsText = localStorage.getItem('trashTodo');
    if (trashTitle && trashTodoAsText) {
        trashTitle = JSON.parse(trashTitleAsText);
        trashTodo = JSON.parse(trashTodoAsText);

    }
}

/*to hide the burger menu start*/

function hide() {

    let element = document.getElementById('hideElement');
    element.classList.toggle('d-none');
}




/*to hide the burger menu end*/

/* trash start */

function trashRender() {
    load();
    let deletedContent = document.getElementById('trashcontent');
    deletedContent.innerHTML = '';                                  /*4.Das Element leeren, damit nur neue Aufgaben hinzugefügt werden(wird gecleart) */

    for (let i = 0; i < trashTitle.length; i++) {                   /*5. durch unser Array neu durch-iterrieren*/
        deletedContent.innerHTML += `
      <div class="outputNote" id="output1">
              <h3>${trashTitle[i]}</h3>
              <span>${trashTodo[i]}</span>
              <img src="img/kreispfeil-nach-rechts.png" style="width: 20px; height: auto" class="menuicon" onclick="undone(${i})">
              <button class="trashButtonDelete" id="deleteTodo" onclick="deletetTrash(${i})" >Delete</button>

          </div>
      `;
    }

}



/*trash leeren? */

function deletetTrash(position) {
    trashTitle.splice(position, 1);
    trashTodo.splice(position, 1);
    save();                        /*ruft die Funtion auf, die Einträge aus dem Array im Local Storage speichert */

    trashRender()

}

/*Deleted Undone*/

function undone(position) {

    let undonetrashTitle = trashTitle[position];
    let undonetrashTodo = trashTodo[position];

    title.push(undonetrashTitle);
    todo.push(undonetrashTodo);

    trashTitle.splice(position, 1);
    trashTodo.splice(position, 1);

    save();
    trashRender();
    load();


}