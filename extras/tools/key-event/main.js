const textarea = document.getElementById('test-target');
const consoleLog = document.getElementById('console-log');
const btnClearConsole = document.getElementById('btn-clear-console');

function logMessage(message) {
  document.getElementById("console-log").innerHTML += message + "<br>";
}

textarea.addEventListener('keydown', (e) => {
  if (!e.repeat)
    logMessage(`按下 "${e.key}" 键 [事件： keydown]`);
  else
    logMessage(`重复 "${e.key}" 键 [事件： keydown]`);
});

textarea.addEventListener('beforeinput', (e) => {
  logMessage(`即将输入 "${e.data}" [事件： beforeinput]`);
});

textarea.addEventListener('input', (e) => {
  logMessage(`输入 "${e.data}" [事件： input]`);
});

textarea.addEventListener('keyup', (e) => {
  logMessage(`释放 "${e.key}" 键 [事件： keyup]\n`);
});

btnClearConsole.addEventListener('click', () => {
  let child = consoleLog.firstChild;
  while (child) {
   consoleLog.removeChild(child);
   child = consoleLog.firstChild;
  }
});