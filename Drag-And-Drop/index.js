let lists = document.querySelectorAll('.list');
let lists_class = document.getElementsByClassName('list');
let leftBox = document.getElementById('left');
let rightBox = document.getElementById('right');

for (let list of lists) {
  list.addEventListener('dragstart', (event) => {
    let selected = event.target;

    leftBox.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    leftBox.addEventListener('drop', (event) => {
      leftBox.appendChild(selected);
      selected = null;
    });

    rightBox.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    rightBox.addEventListener('drop', (event) => {
      rightBox.appendChild(selected);
      selected = null;
    });
  });
}
