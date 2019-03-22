// var draggableElements = document.querySelectorAll('.match-child');

// function handleDragStart(e) {
//     this.style.opacity = '0.4';
//     e.dataTransfer.setData('text', e.target.id);
// }

// function handleDragOver(e) {
//     if(e.preventDefault) {
//         e.preventDefault();
//     }

//     e.dataTransfer.dropEffect = 'move';

//     return false;
// }

// function handleDrop(e) {
//     console.log('e', e);
//     if(e.stopPropagation) {
//         e.stopPropagation();
//     }

//     return false;
// }

// function handleDragEnd(e) {
//     [].forEach.call(draggableElements, function(element) {
//         element.classList.remove('over');
//     })
// }

// function handleDragEnter(e) {
//     this.classList.add('over');
// }

// function handleDragLeave(e) {
//     this.classList.remove('over');
// }

// [].forEach.call(draggableElements, function(element) {
//     element.addEventListener('dragstart', handleDragStart, false);
//     element.addEventListener('dragenter', handleDragEnter, false);
//     element.addEventListener('dragover', handleDragOver, false);
//     element.addEventListener('dragleave', handleDragLeave, false);
//     element.addEventListener('drop', handleDrop, false);
//     element.addEventListener('dragend', handleDragEnd, false);
// });

function dragLeave(ev) {
    ev.preventDefault();
    ev.target.classList.remove('over');
}

function allowDrop(ev) {
    ev.preventDefault();
    ev.target.classList.add('over');
}

function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    ev.target.classList.remove('over');
    var data = ev.dataTransfer.getData('text');
    ev.target.appendChild(document.getElementById(data));
}