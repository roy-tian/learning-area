// 创建所需常量
const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');

// 创建一个 db 对象实例，用来保存已打开的数据库
let db;

// 打开数据库；如果数据库不存在就创建它
// (see the upgradeneeded handler below)
const openRequest = window.indexedDB.open('notes_db', 1);

// 错误处理器表示数据库打开失败
openRequest.addEventListener('error', () => console.error('数据库打开失败'));

// 成功处理器表示数据库已成功打开
openRequest.addEventListener('success', () => {
  console.log('数据库已成功打开');

  // 将已打开的数据库对象存入 db 变量，下面会频繁使用它
  db = openRequest.result;

  // 运行 displayData() 函数，显示 IDB 中已有的笔记
  displayData();
});

// 如果尚未完成，就设置数据库表
openRequest.addEventListener('upgradeneeded', e => {

  // 获取已打开数据库的引用
  db = e.target.result;

  // 创建用于存储笔记的 objectStore（基本上类似一张表）
  // 包括自动递增的键
  const objectStore = db.createObjectStore('notes_os', { keyPath: 'id', autoIncrement:true });

  // 定义 objectStore 中包含哪些数据项
  objectStore.createIndex('title', 'title', { unique: false });
  objectStore.createIndex('body', 'body', { unique: false });

  console.log('数据库设置完成');
});

// 创建提交处理器，使表单提交时运行 addData() 函数
form.addEventListener('submit', addData);

// 定义 addData() 函数
function addData(e) {
  // 阻止默认行为——我们不希望表单以传统方式提交
  e.preventDefault();

  // 获取表单字段中的值，并将其存入准备插入数据库的对象
  const newItem = { title: titleInput.value, body: bodyInput.value };

  // 打开 read/write 数据库事务，准备添加数据
  const transaction = db.transaction(['notes_os'], 'readwrite');

  // 获取已经添加到数据库中的对象存储
  const objectStore = transaction.objectStore('notes_os');

  // 请求将 newItem 对象添加到对象存储
  const addRequest = objectStore.add(newItem);

  addRequest.addEventListener('success', () => {
    // 清空表单，为添加下一条记录做准备
    titleInput.value = '';
    bodyInput.value = '';
  });

  // 事务完成后报告成功状态
  transaction.addEventListener('complete', () => {
    console.log('事务已完成：数据库修改结束。');

    // 再次运行 displayData()，更新数据展示并显示新添加的项目。
    displayData();
  });

  transaction.addEventListener('error', () => console.log('事务未打开，原因是出现错误。'));
}

// Define the displayData() function
function displayData() {
  // 每次更新显示时清空列表元素的内容
  // 如果不这样做，每添加一条新笔记就会出现重复列表项
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  // 打开对象存储并获取游标——游标会遍历所有
  // 存储中的不同数据项
  const objectStore = db.transaction('notes_os').objectStore('notes_os');
  objectStore.openCursor().addEventListener('success', e => {
    // 获取游标的引用
    const cursor = e.target.result;

    // 如果还有数据项需要遍历，就继续运行这段代码
    if(cursor) {
      // 创建列表项、h3 和 p，用来显示每个数据项
      // 构造 HTML 片段，并将其添加到列表中
      const listItem = document.createElement('li');
      const h3 = document.createElement('h3');
      const para = document.createElement('p');

      listItem.appendChild(h3);
      listItem.appendChild(para);
      list.appendChild(listItem);

      // 将游标中的数据放入 h3 和段落
      h3.textContent = cursor.value.title;
      para.textContent = cursor.value.body;

      // 将数据项 ID 存入 listItem 的属性，以便知道
      // 它对应哪个项目；之后删除项目时会用到它
      listItem.setAttribute('data-note-id', cursor.value.id);

      // 创建按钮并将其放入每个 listItem
      const deleteBtn = document.createElement('button');
      listItem.appendChild(deleteBtn);
      deleteBtn.textContent = '删除';

      // 设置事件处理器，使按钮点击时运行 deleteItem()
      // 函数
      deleteBtn.addEventListener('click', deleteItem);

      // 移动到游标中的下一项
      cursor.continue();
    } else {
      // 如果列表项仍为空，就显示“没有存储任何笔记”消息
      if(!list.firstChild) {
        const listItem = document.createElement('li');
        listItem.textContent = '没有存储任何笔记。'
        list.appendChild(listItem);
      }
      // 如果没有更多游标项目可遍历，就记录提示
      console.log('所有笔记已显示');
    }
  });
}

// 定义 deleteItem() 函数
function deleteItem(e) {
  // 获取要删除项目的名称。我们需要
  // 在与 IDB 一起使用前将其转换为数字；IDB 键
  // 的值区分类型。
  const noteId = Number(e.target.parentNode.getAttribute('data-note-id'));

  // 打开数据库事务，并使用上面获取的 ID 找到和删除项目
  const transaction = db.transaction(['notes_os'], 'readwrite');
  const objectStore = transaction.objectStore('notes_os');
  const deleteRequest = objectStore.delete(noteId);

  // 报告数据项已删除
  transaction.addEventListener('complete', () => {
    // 删除按钮的父元素
    // 也就是列表项，使其不再显示
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    console.log(`笔记 ${noteId} 已删除。`);

    // 如果列表项仍为空，就显示“没有存储任何笔记”消息
    if(!list.firstChild) {
      const listItem = document.createElement('li');
      listItem.textContent = '没有存储任何笔记。';
      list.appendChild(listItem);
    }
  });
}
