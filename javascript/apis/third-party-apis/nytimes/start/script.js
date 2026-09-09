// 定义 baseURL 和 key，将它们用于请求 URL

const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const key = 'INSERT-YOUR-API-KEY-HERE';

// 获取需要操作的所有 DOM 元素的引用
const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const section = document.querySelector('section');
const nav = document.querySelector('nav');

// 开始时隐藏“上一页”/“下一页”导航，因为暂时不需要它
nav.style.display = 'none';

// 定义初始页码和导航显示状态
let pageNumber = 0;

// 用于控制功能的事件监听器
