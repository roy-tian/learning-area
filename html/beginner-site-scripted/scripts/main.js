// 图片切换器
const myImage = document.querySelector('img');

myImage.onclick = function() {
  const mySrc = myImage.getAttribute('src');
  if(mySrc === 'images/firefox-icon.png') {
    myImage.setAttribute ('src','images/firefox2.png');
  } else {
    myImage.setAttribute ('src','images/firefox-icon.png');
  }
}

// 自定义欢迎信息
const myButton = document.querySelector('button');
const myHeading = document.querySelector('h1');

myButton.onclick = setUserName;

if(!localStorage.getItem('name')) {
  setUserName();
} else {
  const storedName = localStorage.getItem('name');
  myHeading.innerHTML = 'Mozilla 酷毙了，' + storedName  + '！';
}

function setUserName() {
  const myName = prompt('请输入你的名字');
  localStorage.setItem('name', myName);
  myHeading.innerHTML = 'Mozilla 酷毙了，' + myName + '！';
}