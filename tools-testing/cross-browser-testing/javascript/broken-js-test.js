for(let i = 1; i <= 10; i++) {
  const para = document.createElement('p');
  para.textContent = '这是第 ' + i + ' 个段落。';
  document.body.appendChild(para);
  addHandler(para, i);
}

function addHandler(para, i) {
  para.onclick = function() {
    alert('你好，我是第 ' + i + ' 个段落！');
  }
