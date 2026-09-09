const ongoingTouches = [];
const el = document.getElementById("canvas");
const ctx = el.getContext("2d");

startup();

function startup() {
  el.width = 600;
  el.height = 600;
  el.addEventListener("touchstart", handleStart, { passive: false });
  el.addEventListener("touchend", handleEnd, { passive: false });
  el.addEventListener("touchcancel", handleCancel, { passive: false });
  el.addEventListener("touchmove", handleMove, { passive: false });
  log("初始化成功。");
}

function handleStart(evt) {
  evt.preventDefault();
  log("触摸开始。");
  const touches = evt.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    log("开始第 " + i + " 个触摸 ...");
    ongoingTouches.push(copyTouch(touches[i]));
    const point = getCanvasPoint(touches[i]);
    ctx.beginPath();
    ctx.fillStyle = colorForTouch(touches[i]);
    ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI, false);
    // 在起点画一个圆
    ctx.fill();
    log("第 " + i + " 个触摸已开始。");
  }
}

function handleMove(evt) {
  evt.preventDefault();
  const touches = evt.changedTouches;
  for (let i = 0; i < touches.length; i++) {
    const color = colorForTouch(touches[i]);
    const idx = ongoingTouchIndexById(touches[i].identifier);
    if (idx >= 0) {
      const point = getCanvasPoint(touches[i]);
      log("继续第 " + idx + " 个触摸。");
      ctx.beginPath();
      log("ctx.moveTo(" + ongoingTouches[idx].x + ", " +
        ongoingTouches[idx].y + ");");
      ctx.moveTo(ongoingTouches[idx].x, ongoingTouches[idx].y);
      ctx.lineWidth = 4;
      ctx.fillStyle = color;
      log("ctx.lineTo(" + point.x + ", " + point.y + ");");
      ctx.lineTo(point.x, point.y);
      ctx.strokeStyle = color;
      ctx.stroke();
      ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // 切换到新触摸
      log(".");
    } else {
      log("无法确定下一个触摸点。");
    }
  }
}

function handleEnd(evt) {
  evt.preventDefault();
  log("触摸结束。");
  const touches = evt.changedTouches;
  for (let i = 0; i < touches.length; i++) {
    const color = colorForTouch(touches[i]);
    const idx = ongoingTouchIndexById(touches[i].identifier);
    if (idx >= 0) {
      const point = getCanvasPoint(touches[i]);
      ctx.lineWidth = 4;
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(ongoingTouches[idx].x, ongoingTouches[idx].y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
      ctx.fillRect(point.x - 4, point.y - 4, 8, 8);
      // 在终点画一个正方形
      ongoingTouches.splice(idx, 1);  // 用完后移除
    } else {
      log("无法确定下一个触摸点。");
    }
  }
}

function handleCancel(evt) {
  evt.preventDefault();
  log("触摸取消。");
  const touches = evt.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    const idx = ongoingTouchIndexById(touches[i].identifier);
    if (idx >= 0)
      ongoingTouches.splice(idx, 1);  // 用完后删除
  }
}

// 以下是便捷函数

function getCanvasPoint(touch) {
  const rect = el.getBoundingClientRect();
  return {
    x: touch.clientX - rect.left - el.clientLeft,
    y: touch.clientY - rect.top - el.clientTop
  };
}

function colorForTouch(touch) {
  const r = (touch.identifier % 16).toString(16);
  const g = (Math.floor(touch.identifier / 3) % 16).toString(16);
  const b = (Math.floor(touch.identifier / 7) % 16).toString(16);
  const color = "#" + r + g + b;
  log("identifier " + touch.identifier + " 的颜色为：" + color);
  return color;
}

function copyTouch(touch) {
  const point = getCanvasPoint(touch);
  return {
    identifier: touch.identifier,
    x: point.x,
    y: point.y
  };
}

function ongoingTouchIndexById(idToFind) {
  for (let i = 0; i < ongoingTouches.length; i++) {
    const id = ongoingTouches[i].identifier;

    if (id === idToFind) {
      return i;
    }
  }
  return -1;    // 未找到
}

function log(msg) {
  const p = document.getElementById('log');
  p.textContent =
    new Date().toString().substring(16, 24) + ' ' + msg + "\n" + p.textContent;
}
