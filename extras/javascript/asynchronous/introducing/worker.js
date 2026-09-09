// 执行同步计算并向主线程发送结果。
onmessage = function() {
  let myDate;
  for(let i = 0; i < 10000000; i++) {
    let date = new Date();
    myDate = date
  }

  postMessage(myDate);
}
