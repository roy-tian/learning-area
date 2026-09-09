// 设置画布

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// 生成随机数的函数

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 生成随机颜色的函数

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}
