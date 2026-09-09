# JavaScript variables marking guide

这些题目旨在检验对以下内容的理解： the JavaScript features covered in the [Storing the information you need — Variables](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Variables) lesson in Learn Web Development on MDN.

注意：如果代码中出现错误，错误会输出到页面的结果面板中, to help you try to figure out the answer (or into the browser's JavaScript console, 对于可下载版本则会输出到浏览器的 JavaScript 控制台中).

## Task 1

This task covers basic understanding of declaring a variable with a value, and initializing it — both separately and at the same time. Ideally your code should look something like this:

```js
let myName;
myName = "Chris";
let myAge = 42;
```

`let` is ideal for both declarations. `const` is not really appropriate, as such values might change, and it won't work in the first instance. `var` is not OK.

The `myAge` value will work whether you've initialised it with a numeric (no quotes) or string (quotes) value, however it is a numeric value, so using quotes for it isn't correct.

## Task 2

In task 2 the student needs to add a new line to correct the `myName` variable value so that it outputs their name on the screen.

The finished code should look something like this:

```js
let myName = "Paul";
myName = "Chris";
```

## Task 3

The last task in this article focuses around fixing some variable-related errors. Basically:

1. The `myName` variable is not being outputted correctly because it is being declared once using `const`, and then an attempt is being made to change the value.
2. The result of the sum is not being outputted correctly because the `myAge` variable is being declared as a number. It needs to have the quotes removed.

The solution should look something like this:

```js
let myName = "Default";
myName = "Chris";

let myAge = 42;
```
