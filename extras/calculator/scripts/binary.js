layoutBinaryRow(document.getElementById('binary-row-1'), 63);
layoutBinaryRow(document.getElementById('binary-row-2'), 31);

function layoutBinaryRow(tr, max) {
  for (let i = 0; i != 7; i++) {
    for (let j = 0; j != 4; j++) {
      const tdDigit = document.createElement('td');
      tdDigit.setAttribute('class', 'binary');
      tdDigit.setAttribute('id', 'd' + (max--));
      tdDigit.textContent = '0';
      tr.appendChild(tdDigit);
    }
    const tdBlack = document.createElement('td');
    tr.appendChild(tdBlack);
  }
  for (let j = 0; j != 4; j++) {
    const tdDigit = document.createElement('td');
    tdDigit.setAttribute('class', 'binary');
    tdDigit.setAttribute('id', 'd' + (max--));
    tdDigit.textContent = '0';
    tr.appendChild(tdDigit);
  }
}