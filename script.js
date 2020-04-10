const addDrag = (e) => {
    e.target.parentElement.classList.add('dragging');
}

const removeDrag = (e) => {
    e.target.parentElement.classList.remove('dragging');
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.input-container:not(.dragging)')]
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2;
        console.log(offset);
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
    let array = collectTexts();
    array.sort();
    pushToHTML(array);
}

const sortUp = () => {
    let array = collectTexts();
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

const buildNewInputContainer = () => {
    const inputContainer = document.createElement('div');
    inputContainer.className = 'input-container';
    // inputContainer.addEventListener('dragstart', () => {
    //     inputContainer.classList.add('dragging');
    // })

    // inputContainer.addEventListener('dragend', () => {
    //     inputContainer.classList.remove('dragging');
    // })
     container.append(inputContainer);

    const mover = document.createElement('div');
    mover.draggable = 'true';
    mover.className = 'mover';
    mover.addEventListener('dragstart', addDrag);
    mover.addEventListener('dragend', removeDrag);
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

const container = document.querySelector('.container');
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

const firstContainerDelete = document.querySelector('.deliter');
const sorter = document.getElementById('sorter');
const newInput = document.querySelector('.new-input');
const draggable = document.querySelector('.mover');

firstContainerDelete.addEventListener('click', deliteContainer);
newInput.addEventListener('click', buildNewInputContainer);
sorter.addEventListener('click', sortText);
draggable.addEventListener('dragstart', addDrag);
draggable.addEventListener('dragend', removeDrag);
