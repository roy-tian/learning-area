const TOTAL_IMAGES = 10;    // 图片库中图片的数量
const SLIDE_SIZE = 4;       // 缩略图的数量
const images = [];          // 保存图片的 url

// 四个 HTMLElements
const divFull = document.getElementById('div-full');
const btnBrightness = document.getElementById('btn-brightness');
const btnBlur = document.getElementById('btn-blur');
const btnGray = document.getElementById('btn-gray');

// 为取得缩略图行中第一个图片的 url
let slideFirstIndex = 0;

initSlide();
deploySlide();

// 添加一个 setFilter 方法，作为编辑图片效果的方法
HTMLElement.prototype.setFilter = function(name, value) {
    this.style.filter =
        window.getComputedStyle(this, null)
            .getPropertyValue('filter')
            .replace(new RegExp(name + '\\\((.*?)\\\)'),
                     name + '(' + value + ')');
};

btnBrightness.onclick = () => {
    if (btnBrightness.textContent === '变暗') {
        divFull.setFilter('brightness', 0.3);
        btnBrightness.textContent = '变亮';
    } else {
        divFull.setFilter('brightness', 1);
        btnBrightness.textContent = '变暗';
    }
};

btnBlur.onclick = () => {
    if (btnBlur.textContent === '模糊') {
        divFull.setFilter('blur', '10px');
        btnBlur.textContent = '清晰';
    } else {
        divFull.setFilter('blur', '0px');
        btnBlur.textContent = '模糊';
    }
};

btnGray.onclick = () => {
    if (btnGray.textContent === '黑白') {
        divFull.setFilter('grayscale', 1);
        btnGray.textContent = '彩色';
    } else {
        divFull.setFilter('grayscale', 0);
        btnGray.textContent = '黑白';
    }
};

// 点击任意缩略图，即显示在主图位置
document.querySelectorAll('.div-thumb').forEach(value => {
    value.onclick =
        () => divFull.style.backgroundImage = value.style.backgroundImage;
});

document.getElementById('div-nav-left').onclick = () => {
    if (slideFirstIndex > 0)
        deploySlide(--slideFirstIndex);
};

document.getElementById('div-nav-right').onclick = () => {
    if (slideFirstIndex < TOTAL_IMAGES - SLIDE_SIZE)
        deploySlide(++slideFirstIndex);
};

// 初始化 images，为主图设置 url
function initSlide() {
    for (let i = 0; i < TOTAL_IMAGES; i++) {
        images.push('url(../../javascript/gallery/images/pic' + (i+1) + '.jpg)');
    }
    divFull.style.backgroundImage = images[0];
}

// Slide 移动时重新放置图片
function deploySlide(index = 0) {
    for (let i = 0; i < SLIDE_SIZE; i++) {
        const currentThumb = document.getElementById('div-thumb-' + i);
        currentThumb.style.backgroundImage = images[i+index];
    }
}