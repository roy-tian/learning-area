const btnReset = document.getElementById('btn-reset');
const btnSolution = document.getElementById('btn-solution');
const selectItems = document.getElementById('select-items');
const blockOutput = document.querySelector('.output');
const blockInput = document.querySelector('.input');

let userEntry = "";
let item = 'emphasis';

initSelections();
initBlocksAndBtns(item);

btnReset.addEventListener('click', () => initBlocksAndBtns(item));

btnSolution.addEventListener('click', () => {
  if (btnSolution.textContent === '显示答案') {
    blockInput.value =
    blockOutput.innerHTML = getAnswer(item);
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

selectItems.addEventListener('change', () => {
  item = selectItems.value;
  initBlocksAndBtns(item);
});

function initBlocksAndBtns(item) {
  userEntry =
  blockOutput.innerHTML =
  blockInput.value = getOriginal(item);
  btnSolution.textContent = '显示答案';
}

function initSelections() {
  for (let i = 0; i !== CODE_DB.length; i++) {
    const option = document.createElement('option');
    option.setAttribute('value', getName(i));
    option.textContent = getDescription(i);
    selectItems.appendChild(option);
  }
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