"use strict";

const assert = require("assert");

const { Builder, Capabilities, By } = require("selenium-webdriver");

describe("警告", () => {
  it("应具有正确的文本内容——这是第一个按钮", (done) => {
    let driver = new Builder()
      .withCapabilities(Capabilities.firefox())
      .build();

    driver
      .get(
        "https://roy-tian.github.io/learning-area/tools-testing/cross-browser-testing/accessibility/native-keyboard-accessibility.html"
      )
      .then(() => driver.findElement(By.css("button:nth-of-type(1)")))
      .then((button) => button.click())
      .then(() => driver.switchTo().alert())
      .then((alert) => alert.getText())
      .then((text) => assert.equal(text, "这是第一个按钮的消息"))
      .then(() => driver.quit())
      .then(done)
      .catch((err) => done(err));
  });
});
