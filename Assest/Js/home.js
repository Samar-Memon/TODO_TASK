let createNoteBtn = document.querySelector('.createNotes');
let notes = document.querySelector('.notes');
let createNoteArea = document.querySelector('.createNoteArea');

let groups = document.querySelectorAll('.group');

let group1 = document.getElementById('group1');
let group2 = document.getElementById('group2');
let group3 = document.getElementById('group3');
let selectType = document.getElementById('selectType');
let titleInput = document.getElementById('titleInput');
let taskInput = document.getElementById('taskInput');
let dateInput = document.getElementById('dateInput');

let userId = document.querySelector('.userId b');
let localvalue = localStorage.getItem('value');

const logout = () => {
    document.querySelector('.logout').classList.toggle('show')
}
document.querySelector('.logout').addEventListener('click', () => {
    history.back();
    setTimeout(() => {
        location.reload();
    }, 1200)
})

const localIdArray = () => {
    return JSON.parse(localStorage.getItem('idArray'));
};
userId.innerHTML = localIdArray()[localvalue].username;

document.querySelector('.logo a').innerHTML = `Welcome "${localIdArray()[localvalue].username.toUpperCase()}"`;

const createNote = () => {
    notes.style.display = 'none';
    createNoteArea.style.display = 'flex';
}

const closeCreateNote = () => {
    createNoteArea.style.display = 'none';
    notes.style.display = 'flex';
};

const saveToLocalStorage = () => {
    let groupData = {
        todo: group1.innerHTML,
        processing: group2.innerHTML,
        completed: group3.innerHTML
    };
    localStorage.setItem('groups', JSON.stringify(groupData));
};

const loadFromLocalStorage = () => {
    let groupData = JSON.parse(localStorage.getItem('groups'));
    if (groupData) {
        group1.innerHTML = groupData.todo;
        group2.innerHTML = groupData.processing;
        group3.innerHTML = groupData.completed;

        document.querySelectorAll('.delete').forEach(deleteBtn => {
            deleteBtn.addEventListener('click', () => {
                deleteBtn.closest('.box').remove();
                saveToLocalStorage();
            });
        });

        document.querySelectorAll('.box').forEach(box => {
            box.setAttribute('draggable', true);
        });
    }
};

const createNoteBox = () => {
    let date = new Date(dateInput.value).getTime();
    let todayDate = new Date().getTime();
    let minusdays = date - todayDate;
    let shareDay;

    let days = Math.floor(minusdays / (1000 * 60 * 60 * 24));
    if (date >= todayDate) {
        shareDay = days;
    }

    let titleInputValue = titleInput.value.trim().toLowerCase();
    let taskInputValue = taskInput.value.trim().toLowerCase();

    let groupName;
    if (selectType.value == 'todo') {
        groupName = 'To-Do Items';
    } else if (selectType.value == 'processing') {
        groupName = 'Processing Items';
    } else if (selectType.value == 'completed') {
        groupName = 'Completed Items';
    }

    let data = `<div class="title"><h2>${titleInputValue}</h2></div>
                <div class="task"><p>${taskInputValue}</p></div>
                <div class="bottomArea">
                    <div class="groupName">(${groupName})</div>
                    <div class="timer">${shareDay} Days left</div>
                </div>
                <div class="delete"><i class="fa-solid fa-trash"></i></div>`;

    let createDivForBox = document.createElement('div');
    createDivForBox.className = 'box';
    createDivForBox.innerHTML = data;
    createDivForBox.setAttribute("draggable", true);

    if (titleInputValue.length > 0 && taskInputValue.length > 0 && date >= todayDate) {
        if (selectType.value == 'todo') {
            group1.appendChild(createDivForBox);
        } else if (selectType.value == 'processing') {
            group2.appendChild(createDivForBox);
        } else if (selectType.value == 'completed') {
            group3.appendChild(createDivForBox);
        }

        if (shareDay > 10) {
            createDivForBox.querySelector('.timer').style.background = 'blue';
            createDivForBox.querySelector('.timer').style.borderColor = 'blue';
        } else if (shareDay >= 4) {
            createDivForBox.querySelector('.timer').style.background = 'green';
            createDivForBox.querySelector('.timer').style.borderColor = 'green';
        } else {
            createDivForBox.querySelector('.timer').style.background = 'red';
            createDivForBox.querySelector('.timer').style.borderColor = 'red';
        }

        createDivForBox.querySelector('.delete').addEventListener('click', () => {
            createDivForBox.remove();
            saveToLocalStorage();
        });

        closeCreateNote();
        clearInputs();
        saveToLocalStorage();
    }
};

const clearInputs = () => {
    document.querySelectorAll('input').forEach(input => {
        input.value = '';
    });
    document.querySelector('textarea').value = '';
};

groups.forEach(group => {
    group.addEventListener('dragover', e => {
        e.preventDefault();
        group.classList.add('hovered');
    });

    group.addEventListener('dragleave', () => {
        group.classList.remove('hovered');
    });

    group.addEventListener('drop', e => {
        e.preventDefault();
        let box = document.querySelector('.dragging');
        group.appendChild(box);
        group.classList.remove('hovered');

        let groupName;
        if (group === group1) {
            groupName = 'To-Do Items';
        } else if (group === group2) {
            groupName = 'Processing Items';
        } else if (group === group3) {
            groupName = 'Completed Items';
        }
        box.querySelector('.groupName').textContent = `(${groupName})`;

        saveToLocalStorage();
    });
});

document.addEventListener('dragstart', e => {
    if (e.target.classList.contains('box')) {
        e.target.classList.add('dragging');
    }
});

document.addEventListener('dragend', e => {
    if (e.target.classList.contains('box')) {
        e.target.classList.remove('dragging');
    }
});

loadFromLocalStorage();