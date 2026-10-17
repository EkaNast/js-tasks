const counter = document.getElementById('counter');
const addBtn = document.getElementById('add');
const resetBtn = document.getElementById('reset');

let count = 0;

addBtn.addEventListener('click', () => {
  count++;
  counter.textContent = count;
});

resetBtn.addEventListener('click', () => {
  count = 0;
  counter.textContent = count;
});
