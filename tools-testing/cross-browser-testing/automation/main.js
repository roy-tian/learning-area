let array = ['Chris', 'Bob', 'Mark', 'Paul'];

// 箭头函数语法
array.forEach((e, i, a) => {
   const elem = document.createElement('p');
   elem.textContent = (i + 1) + '. ' + e;
   document.body.appendChild(elem);
});
