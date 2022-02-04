const section = document.querySelector('section');
const editable = document.querySelector('.editable');
const textareaJS = document.querySelector('.playable-js');
const reset = document.getElementById('reset');
const jsCode = textareaJS.value;

function fillCode() {
    editable.textContent = textareaJS.value;
    try {
      eval(editable.textContent);
    } catch(e) {
      section.innerHTML = ' ';
      const para = document.createElement('p');
      para.textContent = e;
      section.appendChild(para);
    }
}

reset.addEventListener('click', function () {
    textareaJS.value = jsCode;
    fillCode();
});

textareaJS.addEventListener('input', fillCode);
window.addEventListener('load', fillCode);
