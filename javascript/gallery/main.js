const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* 遍历图片并添加至缩略图区 */

for(let i = 1; i <= 5; i++) {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', 'images/pic' + i + '.jpg');
  thumbBar.appendChild(newImage);
  newImage.onclick = on_newImage_click;
}

function on_newImage_click(e) {
  const imgSrc = e.target.getAttribute('src');
  displayImage(imgSrc); 
}

function displayImage(imgSrc) {
  displayedImage.setAttribute('src', imgSrc);
}

/* 编写 变亮/变暗 按钮 */

btn.onclick = function() {
  const btnClass = btn.getAttribute('class'); 
  if(btnClass === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = '变亮';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = '变暗';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  }
}
