// 定义 baseURL 和 key，将它们用于请求 URL

const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const key = '3Cm3bHxG1I3ROE2N94Y8vw7347XEAaQk';

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
searchForm.addEventListener('submit', submitSearch);
nextBtn.addEventListener('click', nextPage);
previousBtn.addEventListener('click', previousPage);

function submitSearch(e){
  pageNumber = 0;
  fetchResults(e);
}

function fetchResults(e) {
  // 使用 preventDefault() 阻止表单提交
  e.preventDefault();

  // 拼接完整 URL
  let url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${searchTerm.value}&fq=document_type:("article")`;

  if (startDate.value !== '') {
    url = `${url}&begin_date=${startDate.value}`;
  };

  if (endDate.value !== '') {
    url = `${url}&end_date=${endDate.value}`;
  };

  // 使用 fetch() 向 API 发出请求
  fetch(url)
    .then( response => response.json() )
    .then( json => displayResults(json) )
    .catch( error => console.error(`获取数据时出错：${error.message}`) );
}

function displayResults(json) {
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }

  const articles = json.response.docs;

  if (articles.length === 10) {
    nav.style.display = 'block';
  } else {
    nav.style.display = 'none';
  }

  if (articles.length === 0) {
    const para = document.createElement('p');
    para.textContent = '没有返回结果。'
    section.appendChild(para);
  } else {
    for (const current of articles) {
      const article = document.createElement('article');
      const heading = document.createElement('h2');
      const link = document.createElement('a');
      const img = document.createElement('img');
      const para1 = document.createElement('p');
      const keywordPara = document.createElement('p');
      keywordPara.classList.add('keywords');

      console.log(current);

      link.href = current.web_url;
      link.textContent = current.headline.main;
      para1.textContent = current.snippet;
      keywordPara.textContent = '关键词：';
      for (const keyword of current.keywords) {
        const span = document.createElement('span');
        span.textContent = `${keyword.value} `;
        keywordPara.appendChild(span);
      }

      if (current.multimedia.length > 0) {
        img.src = `http://www.nytimes.com/${current.multimedia[0].url}`;
        img.alt = current.headline.main;
      }

      article.appendChild(heading);
      heading.appendChild(link);
      article.appendChild(img);
      article.appendChild(para1);
      article.appendChild(keywordPara);
      section.appendChild(article);
    }
  }
};

function nextPage(e) {
  pageNumber++;
  fetchResults(e);
};

function previousPage(e) {
  if(pageNumber > 0) {
    pageNumber--;
  } else {
    return;
  }
  fetchResults(e);
};
