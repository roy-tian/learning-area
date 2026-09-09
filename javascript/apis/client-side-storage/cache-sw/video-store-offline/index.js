// 创建常量
const section = document.querySelector('section');
const videos = [
  { 'name' : 'crystal' },
  { 'name' : 'elf' },
  { 'name' : 'frog' },
  { 'name' : 'monster' },
  { 'name' : 'pig' },
  { 'name' : 'rabbit' }
];
// 创建一个 db 对象实例，用来保存数据库
let db;

function init() {
  // 逐个遍历视频名称
  for(const video of videos) {
    // 打开事务、获取对象存储，并按名称获取每个视频
    const objectStore = db.transaction('videos_os').objectStore('videos_os');
    const request = objectStore.get(video.name);
    request.addEventListener('success', () => {
      // 如果数据库中存在结果（结果不是 undefined）
      if(request.result) {
        // 从 IDB 获取视频，并使用 displayVideo() 显示
        console.log('正在从 IDB 获取视频');
        displayVideo(request.result.mp4, request.result.webm, request.result.name);
      } else {
        // 从网络获取视频
        fetchVideoFromNetwork(video);
      }
    });
  }
}

// Define the fetchVideoFromNetwork() function
function fetchVideoFromNetwork(video) {
  console.log('正在从网络获取视频');
  // 使用 fetch() 函数获取视频的 MP4 和 WebM 版本，
  // 然后将响应主体转换为 Blob
  const mp4Blob = fetch(`videos/${video.name}.mp4`).then(response => response.blob());
  const webmBlob = fetch(`videos/${video.name}.webm`).then(response => response.blob());

  // 两个 promise 都兑现后才执行下面的代码
  Promise.all([mp4Blob, webmBlob]).then(values => {
    // 使用 displayVideo() 显示从网络获取的视频
    displayVideo(values[0], values[1], video.name);
    // 使用 storeVideo() 将其存入 IDB
    storeVideo(values[0], values[1], video.name);
  });
}

// 定义 storeVideo() 函数
function storeVideo(mp4Blob, webmBlob, name) {
  // 打开事务并获取对象存储；将其设为 readwrite，以便写入 IDB
  const objectStore = db.transaction(['videos_os'], 'readwrite').objectStore('videos_os');
  // 创建要添加到 IDB 的记录
  const record = {
    mp4 : mp4Blob,
    webm : webmBlob,
    name : name
  }

  // 使用 add() 将记录添加到 IDB
  const request = objectStore.add(record);

  request.addEventListener('success', () => console.log('记录添加尝试已结束'));
  request.addEventListener('error', () => console.error(request.error));
}

// 定义 displayVideo() 函数
function displayVideo(mp4Blob, webmBlob, title) {
  // 根据 Blob 创建对象 URL
  const mp4URL = URL.createObjectURL(mp4Blob);
  const webmURL = URL.createObjectURL(webmBlob);

  // 创建用于在页面中嵌入视频的 DOM 元素
  const article = document.createElement('article');
  const h2 = document.createElement('h2');
  h2.textContent = title;
  const video = document.createElement('video');
  video.controls = true;
  const source1 = document.createElement('source');
  source1.src = mp4URL;
  source1.type = 'video/mp4';
  const source2 = document.createElement('source');
  source2.src = webmURL;
  source2.type = 'video/webm';

  // 将 DOM 元素嵌入页面
  section.appendChild(article);
  article.appendChild(h2);
  article.appendChild(video);
  video.appendChild(source1);
  video.appendChild(source2);
}

// 打开数据库；如果数据库不存在就创建它
// (see upgradeneeded below)
const request = window.indexedDB.open('videos_db', 1);

// 错误处理器表示数据库打开失败
request.addEventListener('error', () => console.error('数据库打开失败'));

// 成功处理器表示数据库已成功打开
request.addEventListener('success', () => {
  console.log('数据库已成功打开');

  // 将已打开的数据库对象存入 db 变量，下面会频繁使用它
  db = request.result;
  init();
});

// 如果尚未完成，就设置数据库表
request.addEventListener('upgradeneeded', e => {

  // 获取已打开数据库的引用
  const db = e.target.result;

  // 创建用于存储视频的 objectStore（基本上类似一张表）
  // 包括自动递增的键
  const objectStore = db.createObjectStore('videos_os', { keyPath: 'name' });

  // 定义 objectStore 中包含哪些数据项
  objectStore.createIndex('mp4', 'mp4', { unique: false });
  objectStore.createIndex('webm', 'webm', { unique: false });

  console.log('数据库设置完成');
});

// 注册 Service Worker，使站点可以离线工作
if('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/learning-area/javascript/apis/client-side-storage/cache-sw/video-store-offline/sw.js')
    .then(() => console.log('Service Worker 已注册'));
}
