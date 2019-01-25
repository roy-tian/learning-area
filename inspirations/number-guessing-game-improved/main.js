let randomNumber,
inputGuess = document.getElementById('guess'),
btnGuess = document.getElementById('btn-guess'),
btnRestart = document.getElementById('btn-restart'),
divLogs = document.getElementById('logs'),
guesses = [];

btnRestart.addEventListener('click', newGame, false);
btnGuess.addEventListener('click', guess, false);

newGame();

function newGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    btnGuess.disabled = false;
    btnRestart.disabled = true;
    divLogs.innerHTML = '';
    guesses = [];
    inputGuess.focus();
}

function guess() {
    let index = inputGuess.value;
    inputGuess.value = '';
    if ( ! index.match(/^([1-9][0-9]{0,1}|100)$/) ) {
        divLogs.innerHTML += 
            '<p class="wrong">你输入的不是100以内的自然数，请重新输入</p>';
    } else {
        index = Number(index);
        if (guesses.indexOf(index) !== -1) {
            divLogs.innerHTML +=
                '<p class="wrong">请不要在同一处跌倒两次。</p>';
        } else {
            guesses.push(index);
            if (index === randomNumber) {
                divLogs.innerHTML +=
                    '<p class="success">恭喜你在 ' +
                    guesses.length +
                    ' 次尝试后猜出了这个数字！<br>没错,答案是 ' +
                    randomNumber +
                    '。点击【重新开始】按钮开始新的游戏。</p>';
                btnGuess.disabled = true;
                btnRestart.disabled = false;
            } else if (guesses.length === 10) {
                divLogs.innerHTML +=
                    '<p class="failed">很遗憾你没能在 10 次内猜出这个数字。' +
                    '<br>现在我告诉你这个数是 ' +
                    randomNumber +
                    '。点击【重新开始】按钮开始新的游戏。</p>';
                btnGuess.disabled = true;
                btnRestart.disabled = false;
            } else if (index > randomNumber) {
                divLogs.innerHTML +=
                    '<p class="higher">你猜错了！<br>' +
                    index +
                    ' 比正确答案高。你还有 ' +
                    (10 - guesses.length) +
                    ' 次机会。</p>';
            } else if (index < randomNumber) {
                divLogs.innerHTML +=
                    '<p class="lower">你猜错了！<br>' +
                    index +
                    ' 比正确答案低。你还有 ' +
                    (10 - guesses.length) +
                    ' 次机会。</p>';
            }
        }
    }
    inputGuess.focus();
}