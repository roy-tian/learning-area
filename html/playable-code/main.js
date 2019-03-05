const btnReset = document.getElementById('btn-reset');
const btnSolution = document.getElementById('btn-solution');
const selectItem = document.getElementById('select-item');
const blockOutput = document.querySelector('.output');
const blockInput = document.querySelector('.input');

let userEntry = "";
let item = 'italics';

init(item);

btnReset.addEventListener('click', () => init(item));

btnSolution.addEventListener('click', () => {
  if (btnSolution.textContent === '显示答案') {
    blockInput.value =
    blockOutput.innerHTML = CODE_DB[item].answer;
    btnSolution.textContent = '隐藏答案';
  } else {
    blockInput.value =
    blockOutput.innerHTML = userEntry;
    btnSolution.textContent = '显示答案';
  }
});

blockInput.addEventListener('keydown', (e) => {
  switch (e.key) {
  case 'Tab':
    e.preventDefault();
    insertAtCursor('\t');
    break;
  case "Escape":
    blockInput.blur();
    break;
  }
});

blockInput.addEventListener('keyup', () => {
  userEntry = blockInput.value;
  blockOutput.innerHTML = blockInput.value;
  if (btnSolution.textContent === '隐藏答案') {
    btnSolution.textContent = '显示答案';
  } 
});

selectItem.addEventListener('change', () => {
  item = selectItem.value;
  init(item);
});

function init(item) {
  userEntry =
  blockOutput.innerHTML =
  blockInput.value = CODE_DB[item].original;
  btnSolution.textContent = '显示答案';
}

function insertAtCursor(text) {
  const scrollPos = blockInput.scrollTop;
  const cursorPos = blockInput.selectionStart;

  const front = blockInput.value.substring(0, cursorPos);
  const back = blockInput.value.substring(
    blockInput.selectionEnd, blockInput.value.length);

  blockInput.value = front + text + back;
  blockInput.selectionStart = 
  blockInput.selectionEnd = cursorPos + text.length;
  blockInput.focus();
  blockInput.scrollTop = scrollPos;
}