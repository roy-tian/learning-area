# JavaScript conditionals marking guide

这些题目旨在检验对以下内容的理解： the JavaScript features covered in the [Making decisions in your code — conditionals](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Building_blocks/conditionals) lesson in Learn Web Development on MDN.

注意：如果代码中出现错误，错误会输出到页面的结果面板中, to help you try to figure out the answer (or into the browser's JavaScript console, 对于可下载版本则会输出到浏览器的 JavaScript 控制台中).

## Task 1

In this task you are supposed to create your own basic `if ... else` statement that tests whether the season is summer or not, and stores an appropriate response in the `response` variable, which is then printed out in the results panel. The `else` clause should print some kind of generic response.

To finish off, you need to add an `else if` clause to also check whether it is winter, and if so, put an appropriate response inside `response`.

The finished code should look something like this:

```js
let season = "summer";
let response;

if (season === "summer") {
  response = "你所在的地方可能阳光温暖，好好享受阳光吧！";
} else if (season === "winter") {
  response = "希望你那里不会太冷。穿些暖和的衣服吧！";
} else {
  response =
    "我不知道你那里是什么季节。希望你一切都好。";
}
```

## Task 2

Task 2 tests some more complex conditionals, like not equal, less than, greater than, etc., along with a nested structure.

You are given two variables containing an indicator of the answer machine being switched on or not (`true`/`false`), and a score. You are also given an uninitialized `response` variable.

You need to create one `if ... else` structure that checks whether the machine is switched on and puts a message into the `response` variable if it isn't, telling the user to switch the machine on.

Inside the `if` part, you need to nest an `if ... else if` structure that puts appropriate messages into the `response` variable depending on different scores. The conditional operator tests should look like this:

- `score < 0 || score > 100` - "这不可能，发生了错误。" This could also be done just by an `else` clause, as the scores between 0 and 100 are all covered by the other clauses. But it's nice to be exact.
- `score >= 0 && score < 20` - "分数太低了——完全不及格！"
- `score >= 20 && score < 40` - "你知道一些东西，但分数相当低，还需要改进。"
- `score >= 40 && score < 70` — "做得还可以，不错！"
- `score >= 70 && score < 90` — "分数很棒，你确实掌握得很好。"
- `score >= 90 && score <= 100` — "分数真惊人！你作弊了吗？这是真的吗？"

The finished code should look something like this:

```js
let response;
let score = 75;
let machineActive = false;

if (machineActive) {
  if (score < 0 || score > 100) {
    response = "这不可能，发生了错误。";
  } else if (score >= 0 && score < 20) {
    response = "分数太低了——完全不及格！";
  } else if (score >= 20 && score < 40) {
    response =
      "你知道一些东西，但分数相当低，还需要改进。";
  } else if (score >= 40 && score < 70) {
    response = "做得还可以，不错！";
  } else if (score >= 70 && score < 90) {
    response = "分数很棒，你确实掌握得很好。";
  } else if (score >= 90 && score <= 100) {
    response = "分数真惊人！你作弊了吗？这是真的吗？";
  }
} else {
  response = "机器已关闭。请打开机器来处理分数。";
}
```

## Task 3

For the final task we have to offer in this set, we need you to first write an `if ... else` statement that checks whether `machineActive` is `true`. If so, set `machineResult` to a string telling the user they can successfully log in. If not, set it to a message telling them they need to activate the machine before they can log in.

Inside the `if` part of the structure, you need to write a ternary operator that checks whether `pwd` is equal to `cheese`. If so, it assigns a string saying that the login was successful; if not assign a string saying the log in failed. The result should be assigned to a variable called `pwdResult`.

Your solution should look something like this:

```js
let machineActive = true;
let pwd = "cheese";

let machineResult;
let pwdResult;

if (machineActive) {
  machineResult = "机器已激活。正在尝试登录。";
  pwdResult =
    pwd === "cheese"
      ? "登录成功。"
      : "密码不正确；登录失败。";
} else {
  machineResult = "机器未激活。请激活后重试登录。";
}
```
