const draggables = document.querySelectorAll('.input-container');
const container = document.querySelector('.container');

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    })

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    })
})


container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
        container.appendChild(draggable)
    } else {
        container.insertBefore(draggable, afterElement)
    }
})


function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.input-container:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2 
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}

const collectTexts = () => {
    const inputTexts = document.querySelectorAll('.text');
    const textArray = [];
    inputTexts.forEach((element) => {
        textArray.push(element.value);
    });
    return textArray;
}

const pushToHTML = (array) => {
    const inputTexts = document.querySelectorAll('.text');
    for (let i = 0; i < array.length; i++) {
        inputTexts[i].value = array[i];
    }
}

const sortDown = () => {
    array = collectTexts();
    array.sort();
    pushToHTML(array);
}

const sortUp = () => {
    array = collectTexts();
    array.reverse();
    pushToHTML(array);
}

const sortText = () => {
    if (sorter.className === 'sort-down') {
        sortDown();
    } else {
        sortUp();
    }
    sorter.classList.toggle('sort-down');
    sorter.classList.toggle('sort-up');
}

const deliteContainer = (e) => {
    const toDel = e.target.parentElement;
    toDel.remove();
}

const builNewInputContainer = () => {
    const inputContainer = document.createElement('div');
    inputContainer.className = 'input-container';
    inputContainer.draggable = 'true';
    inputContainer.addEventListener('dragstart', () => {
        inputContainer.classList.add('dragging');
    })

    inputContainer.addEventListener('dragend', () => {
        inputContainer.classList.remove('dragging');
    })
    container.append(inputContainer);

    const mover = document.createElement('div');
    mover.className = 'mover';
    mover.innerHTML = '&#8759';
    inputContainer.append(mover);

    const input = document.createElement('input');
    input.className = 'text';
    inputContainer.append(input);

    const deliter = document.createElement('div');
    deliter.className = 'deliter';
    deliter.addEventListener('click', deliteContainer);
    inputContainer.append(deliter);
}

const firstContainerDelete = document.querySelector('.deliter');
firstContainerDelete.addEventListener('click', deliteContainer);


const sorter = document.getElementById('sorter');
sorter.addEventListener('click', sortText);

const newInput = document.querySelector('.new-input');
newInput.addEventListener('click', builNewInputContainer);



