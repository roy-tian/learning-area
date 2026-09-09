# JavaScript math marking guide

这些题目旨在检验对以下内容的理解： the JavaScript features covered in the [Basic math in JavaScript — numbers and operators](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Math) lesson in Learn Web Development on MDN.

注意：如果代码中出现错误，错误会输出到页面的结果面板中, to help you try to figure out the answer (or into the browser's JavaScript console, 对于可下载版本则会输出到浏览器的 JavaScript 控制台中).

## Task 1

In this task you need to create four variables that contain numbers. The first two need to be added together and stored, while the fourth needs to be subtracted from the third and the result stored. The two results of these operations need to be multiplied together to create another result, 48, which should be stored in the variable `finalResult`.

Finally, you need to write a calculation that checks whether this number is even or odd, with the result stored in `evenOddCheck`. The operator you need here is modulo (`%`). If your value modulo 2 equals 0, you know it is even.

The answer should look something like this:

```js
const number1 = 4;
const number2 = 8;
const number3 = 12;
const number4 = 8;

const additionResult = number1 + number2;
const subtractionResult = number3 - number4;

finalResult = additionResult * subtractionResult;

evenOddResult = finalResult % 2;
```

This task also tests your variable naming abilities. An extra mark if the variables have sensible names that follow best practices (lower camel case, descriptive, not too long).

## Task 2

In our second task for this article we need to consider operator precedence and use parentheses to make the first two calculations give the result we were expecting.

Next, we ideally need to use the multiplication assignment operator to multiply the two results together and then assign the product of this back to `result`.

After that we need to use the `toFixed()` method available on numbers to round `result` to 2 decimal places, storing the product of this in a `finalResult` variable.

Finally, using `typeof` we can test if a variable contains a string. We need to use `Number()` to convert `finalResult` to a number type. This final number needs to be stored in a variable called `finalNumber`.

The result should look something like this:

```js
let result = (7 + 13) / (9 + 7);
let result2 = 100 / (2 * 6);

result *= result2;

const finalResult = result.toFixed(2);

const finalNumber = Number(finalResult);
```

## Task 3

This last task tests the student's ability to use comparison operators. Here we need to write some tests to show that mathematically prove or disprove the statements in the question.

The test results should be stored inside variables called `weightComparison`, `heightComparison`, and `pwdMatch`, respectively.

Your code should look something like this:

```js
const weightComparison = eleWeight < mouseWeight;

const heightComparison = ostrichHeight > duckHeight;

const pwdMatch = pwd1 === pwd2;
```
