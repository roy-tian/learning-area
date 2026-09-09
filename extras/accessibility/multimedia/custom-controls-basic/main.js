// 获取按钮和视频的引用。

const playPauseBtn = document.querySelector('.playpause');
const stopBtn = document.querySelector('.stop');
const rwdBtn = document.querySelector('.rwd');
const fwdBtn = document.querySelector('.fwd');
const timeLabel = document.querySelector('.time');

const player = document.querySelector('video');

// 移除播放器的原生控件。

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
