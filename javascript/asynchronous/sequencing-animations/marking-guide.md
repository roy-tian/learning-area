
# Marking guide for "动画序列"

下面的评分指南介绍了评分标准 for the MDN Learning Area JavaScript Topic — [动画序列](https://developer.mozilla.org/zh-CN/Learn/JavaScript/Asynchronous/Sequencing_animations). Each subtask detailed in the assessment is listed below, along with an explanation of how many marks the task is worth, and the mark breakdown.

注意：这些只是指南，并非不可改变的规则 — you are of course free to use your judgement on mark awarding when you meet an edge case, or something that isn't clear cut.

总分为 9.

The assessment asks for the animation sequence to be implemented in three different forms:

1. "Promise 地狱": something that works, but has the promise version of the "回调地狱" problem.

2. "Promise 链": implemented as a promise chain. There are a few different ways to write this, because of the different forms an arrow function can take. We ask which is the most concise form.

3. "async/await": implemented using async and await.

## Promise 地狱

Three marks for this. The code should look something like:

```js
alice1.animate(aliceTumbling, aliceTiming).finished
  .then(() => {
    const alice2Animation = alice2.animate(aliceTumbling, aliceTiming).finished;
    alice2Animation.then(() => {
      alice3.animate(aliceTumbling, aliceTiming);
    });
  });
```

The main thing here is that we nest calls to `then()`, making the code much harder to read.

## Promise 链

Three marks for this. The code should look something like:

```js
alice1.animate(aliceTumbling, aliceTiming).finished
  .then(() => alice2.animate(aliceTumbling, aliceTiming).finished)
  .then(() => alice3.animate(aliceTumbling, aliceTiming).finished)
  .catch(error => console.error(`动画 Alice 时出错：${error}`));
```

This is the most concise version. It would be fine to have some different ways of writing the arrow functions, such as:

```js
alice1.animate(aliceTumbling, aliceTiming).finished
  .then(() => { return alice2.animate(aliceTumbling, aliceTiming).finished; })
  .then(() => { return alice3.animate(aliceTumbling, aliceTiming).finished; })
  .catch(error => console.error(`动画 Alice 时出错：${error}`));
```

## async/await

Three marks for this. The code should look something like:

```js
async function animateAlices() {
  try {
    await alice1.animate(aliceTumbling, aliceTiming).finished;
    await alice2.animate(aliceTumbling, aliceTiming).finished;
    await alice3.animate(aliceTumbling, aliceTiming).finished;
  }
  catch (error) {
    console.error(`动画 Alice 时出错：${error}`);
  }
}

animateAlices();
```
