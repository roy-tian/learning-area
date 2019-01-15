let textarea = document.getElementById('test-target'),
consoleLog = document.getElementById('console-log'),
btnClearConsole = document.getElementById('btn-clear-console');

function logMessage(message) {
  let p = document.createElement('p');
  p.appendChild(document.createTextNode(message));
  consoleLog.appendChild(p);
}

textarea.addEventListener('keydown', (e) => {
    if (!e.repeat)
       logMessage(`第一个 keydown 事件。key 属性的值为"${e.key}"`);
    else
       logMessage(`keydown 事件重复。key 属性的值为"${e.key}"`);
});
    
textarea.addEventListener('beforeinput', (e) => {
    logMessage(`beforeinput 事件。你准备输入"${e.data}"`);
});
    
textarea.addEventListener('input', (e) => {
    logMessage(`input 事件。你刚刚输入了"${e.data}"`);
});
    
textarea.addEventListener('keyup', (e) => {
    logMessage(`keyup 事件。key 属性的值为"${e.key}"`);
});

    
btnClearConsole.addEventListener('click', (e) => {
    let child = consoleLog.firstChild;
    while (child) {
        consoleLog.removeChild(child);
        child = consoleLog.firstChild;
    }
});