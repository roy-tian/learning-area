// 获取按钮和视频的引用。

const playPauseBtn = document.querySelector('.playpause');
const stopBtn = document.querySelector('.stop');
const rwdBtn = document.querySelector('.rwd');
const fwdBtn = document.querySelector('.fwd');
const timeLabel = document.querySelector('.time');

const player = document.querySelector('audio');

// 移除所有播放器的原生控件。

player.removeAttribute('controls');

// 定义播放器控件对象的构造函数。

playPauseBtn.onclick = function() {
  if(player.paused) {
    player.play();
    playPauseBtn.textContent = '暂停';
  } else {
    player.pause();
    playPauseBtn.textContent = '播放';
  }
};

stopBtn.onclick = function() {
  player.pause();
  player.currentTime = 0;
  playPauseBtn.textContent = '播放';
};

rwdBtn.onclick = function() {
  player.currentTime -= 3;
};

fwdBtn.onclick = function() {
  player.currentTime += 3;
  if(player.currentTime >= player.duration || player.paused) {
    player.pause();
    player.currentTime = 0;
    playPauseBtn.textContent = '播放';
  }
};

player.ontimeupdate = function() {
  let minutes = Math.floor(player.currentTime / 60);
  let seconds = Math.floor(player.currentTime - minutes * 60);
  let minuteValue;
  let secondValue;

  if (minutes<10) {
    minuteValue = "0" + minutes;
  } else {
    minuteValue = minutes;
  }

  if (seconds<10) {
    secondValue = "0" + seconds;
  } else {
    secondValue = seconds;
  }

  mediaTime = minuteValue + ":" + secondValue;
  timeLabel.textContent = mediaTime;
};

// 控制文字稿的显示。

const transcript = document.querySelector('.transcript');
const transcriptBtn = document.querySelector('.transcript-container button');

transcriptBtn.onclick = function() {
  if(transcriptBtn.textContent === '显示文字稿') {
    transcript.style.height = '150px';
    transcriptBtn.textContent = '隐藏文字稿';
  } else {
    transcript.style.height = '0';
    transcriptBtn.textContent = '显示文字稿';
  }
};
