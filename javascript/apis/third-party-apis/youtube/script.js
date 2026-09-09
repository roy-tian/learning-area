// 获取需要操作的 DOM 元素引用
const searchTerm = document.querySelector('.search');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');

const section = document.querySelector('section');

// 窗口（标签页）加载完成后运行 onClientLoad()
// 启动整个流程
window.addEventListener('load', onClientLoad);

// 加载并初始化 API，完成后运行 onYouTubeApiLoad() 函数
function onClientLoad() {
  gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// 将你的密钥附加到 API
function onYouTubeApiLoad() {
  // To get a key for your own application:
  // 1. Go to https://console.cloud.google.com/apis/dashboard
  // 2. Create a new project if you've not already got one
  // 3. Click the Enable API button
  // 4. Choose YouTube Data API
  // 5. Click the Enable button
  // 6. Click create credentials
  // 7. Select "Web 浏览器（JavaScript）" from the second dropdown
  // 8. Click the "公开数据" radio button
  // 9. Click the "需要哪些凭据？" button
  // 10. Copy your API key and paste it in below
  gapi.client.setApiKey('YOUR-API-KEY-HERE');

  // 为表单添加事件监听器，以便执行搜索
  // 提交时运行 search() 函数
  searchForm.addEventListener('submit', search);
}

function search(e) {
  // 使用 preventDefault() 阻止表单实际提交
  e.preventDefault();

  // 使用 Data API 创建搜索请求；
  const request = gapi.client.youtube.search.list({
    // 设置响应包含的数据类型
    part: 'snippet',
    // 设置要返回的结果数量
    maxResults: 10,
    // 设置要搜索的查询词
    q: searchTerm.value
  });

  // 发送请求，并指定响应返回时运行的函数
  request.execute(onSearchResponse);
}

// 此函数会自动接收响应作为参数
function onSearchResponse(response) {
  // 清空 <section> 元素
  while (section.firstChild) {
      section.removeChild(section.firstChild);
  }

  // 将搜索的实际结果存入变量
  const results = response.items;

  // 遍历结果，并对每个结果运行 displayVideo()
  for (let i = 0; i < results.length; i++) {
    displayVideo(results[i], i);
  }
}

function displayVideo(result, i) {
  // 为每个视频创建唯一 ID 的 div，并将其添加到 <section>
  // YouTube Iframe Player API 会将每个 div 替换为
  // 包含对应视频的 <iframe>
  const vid = document.createElement('div');
  vidId = 'vid' + i;
  vid.id = vidId;
  section.appendChild(vid);

  // 使用 YT.Player() 构造函数创建新的视频播放器对象，
  // 指定将被替换元素（<div>）的 ID，
  // 指定高度、宽度以及处理自定义 onReady 事件的事件处理器
  const player = new YT.Player(vidId, {
    height: '360',
    width: '480',
    videoId: result.id.videoId,
    events: {
      'onReady': onPlayerReady
    }
  });

  // onPlayerReady() 处理器获取每个视频的 ID，并检查视频时长
  // 如果时长为 0，视频无法播放，因此直接删除它
  function onPlayerReady(e) {
    console.log(e.target)
    const myId = e.target.id;
    const duration = e.target.getDuration();
    if (duration === 0) {
      console.log(`无法播放视频 ${myId}，因此已将其删除。`);
      section.removeChild(e.target.a);
    } else {
      console.log(`视频 ${myId} 已准备好播放。`);
    }
  }
}
