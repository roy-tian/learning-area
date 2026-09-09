const request = require('request'); // 引入 request 以使用 REST API
let webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

// 输入功能
let capabilities = {
   'browserName' : 'Firefox',
   'browser_version' : '56.0 beta',
   'os' : 'OS X',
   'os_version' : 'Sierra',
   'resolution' : '1280x1024',
   'browserstack.user' : 'chrismills4',
   'browserstack.key' : 'DoDmjvSzK5eLSmAtVwi4',
   'browserstack.debug' : 'true',
   'build' : 'First build',
   'project' : 'Google 测试 2' // 拆分为多个项目
};

let driver = new webdriver.Builder().
  usingServer('http://hub-cloud.browserstack.com/wd/hub').
  withCapabilities(capabilities).
  build();

// 获取会话 ID
let sessionId;

driver.session_.then(function(sessionData) {
  sessionId = sessionData.id_;
});

driver.get('http://www.google.com');
driver.findElement(By.name('q')).sendKeys('webdriver');

driver.sleep(1000).then(function() {
  driver.findElement(By.name('q')).sendKeys(webdriver.Key.TAB);
});

driver.findElement(By.name('btnK')).click();

driver.sleep(2000).then(function() {
  driver.getTitle().then(function(title) {
    if(title === 'webdriver - Google Search') {
      console.log('测试通过');
      request({uri: "https://chrismills4:DoDmjvSzK5eLSmAtVwi4@www.browserstack.com/automate/sessions/" + sessionId + ".json", method:"PUT", form:{"status":"passed","reason":"Google 结果显示了正确的标题"}});
    } else {
      console.log('测试失败');
      request({uri: "https://chrismills4:DoDmjvSzK5eLSmAtVwi4@www.browserstack.com/automate/sessions/" + sessionId + ".json", method:"PUT", form:{"status":"failed","reason":"Google 结果显示了错误的标题"}});
    }
  });
});

driver.quit();
