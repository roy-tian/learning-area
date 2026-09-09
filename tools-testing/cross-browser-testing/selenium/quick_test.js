const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

let driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

driver.get('https://roy-tian.github.io/learning-area/tools-testing/cross-browser-testing/accessibility/native-keyboard-accessibility.html');

const button = driver.findElement(By.css('button:nth-of-type(1)'));

button.click();

const alert = driver.switchTo().alert();

alert.getText().then(function(text) {
  console.log('警告文本为：\'' + text + '\'');
});

alert.accept();

const input = driver.findElement(By.id('name'));

driver.sleep(2000).then(function() {
  input.sendKeys('正在填写表单');
  input.getAttribute("value").then(function(value) {
    if(value !== '') {
      console.log('表单输入可编辑');
    }
  });
});

driver.quit();
