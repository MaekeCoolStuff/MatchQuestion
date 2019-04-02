var droppables = document.getElementsByClassName('dropzone');
var overlapThreshold = "50%"; 


let option1 = Draggable.create("#drag1", {
    bounds: document.getElementById("container"),
    autoScroll: 1,
    onDragStart: function(e) {
       //document.getElementById('container').appendChild(e.target);
    },
    onDrag: function(e) {
        var i = droppables.length;
        while (--i > -1) {
            if (this.hitTest(droppables[i])) {
                droppables[i].classList.add("highlight");
            } else {
                droppables[i].classList.remove("highlight");
            }
        }
    },
    onDragEnd: function(e) {
        console.log('end', e);
        var i = droppables.length;
        while (--i > -1) {
            if (this.hitTest(droppables[i])) {
               droppables[i].appendChild(e.target.childNodes[0]);
               droppables[i].classList.remove("highlight");
               e.target.remove();
               return;
            } else {
                droppables[i].classList.remove("highlight");
            }
        }
    }
});