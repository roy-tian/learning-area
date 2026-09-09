// 获取所有音频和视频播放器的引用。
// 将它们存储在同一个数组中。

const videos = document.querySelectorAll('video');

const audios = document.querySelectorAll('audio');

let players = [];

for(let a = 0; a < audios.length; a++) {
  players.push(audios[a]);
}

for(let v = 0; v < videos.length; v++) {
  players.push(videos[v]);
}

// 移除所有播放器的原生控件。

for(let p = 0; p < players.length; p++) {
  players[p].removeAttribute('controls');
}

// 定义播放器控件对象的构造函数。

function PlayerController(player, playPauseBtn, stopBtn, rwdBtn, fwdBtn, timeLabel) {
  this.player = player;
  this.playPauseBtn = playPauseBtn;
  this.stopBtn = stopBtn;
  this.rwdBtn = rwdBtn;
  this.fwdBtn = fwdBtn;
  this.timeLabel = timeLabel;

  this.interval;

  this.playPauseBtn.onclick = function() {
    if(player.paused) {
      player.play();
      playPauseBtn.textContent = '暂停';
    } else {
      player.pause();
      playPauseBtn.textContent = '播放';
    }
  }

  this.stopBtn.onclick = function() {
    player.pause();
    player.currentTime = 0;
    playPauseBtn.textContent = '播放';
  }

  this.rwdBtn.onclick = function() {
    player.currentTime -= 3;
  }

  this.fwdBtn.onclick = function() {
    player.currentTime += 3;
    if(player.currentTime >= player.duration || player.paused) {
      player.pause();
      player.currentTime = 0;
      playPauseBtn.textContent = '播放';
    }
  }

  this.player.ontimeupdate = function() {
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
  }
}



// 为所有播放器添加控件栏。

for(let i = 0; i < players.length; i++) {
  const controls = document.createElement('div');
  controls.setAttribute('class', 'controls');
  players[i].parentNode.appendChild(controls);

  const playpause = document.createElement('button');
  const stop = document.createElement('button');
  const rwd = document.createElement('button');
  const fwd = document.createElement('button');
  const time = document.createElement('div');

  playpause.setAttribute('class', 'playpause');
  stop.setAttribute('class', 'stop');
  rwd.setAttribute('class', 'rwd');
  fwd.setAttribute('class', 'fwd');
  time.setAttribute('class', 'time');

  playpause.textContent = '播放';
  stop.textContent = '停止';
  rwd.textContent = '后退';
  fwd.textContent = '前进';
  time.textContent = '00:00';

  controls.appendChild(playpause);
  controls.appendChild(stop);
  controls.appendChild(rwd);
  controls.appendChild(fwd);
  controls.appendChild(time);

  let playerInstance = new PlayerController(players[i], playpause, stop, rwd, fwd, time);
}
