# 链接评分指南

这些任务用于检验学习者是否理解 [创建超链接](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks)课程中介绍的超链接知识。该课程属于 MDN Web 开发学习区。

## 任务 1

第一个任务涵盖链接基础：设置链接目标、提供描述性标题，以及创建电子邮件链接。答案应类似于下面的代码：

```
<h1>鲸鱼信息</h1>

<p>如需了解我们开展的保护活动以及所研究的鲸鱼，
请参阅我们的 <a href="whales.html" target="_blank" title="包含蓝鲸和抹香鲸的信息">鲸鱼页面</a>。</p>

<p>如需向团队咨询更多问题，欢迎<a href="mailto:whales@example.com?subject=关于%20鲸鱼的问题">给我们发邮件</a>。</p>
```

title 属性应包含对链接页面有帮助但不是理解页面主题所必需的补充信息。如果电子邮件链接包含主题，则必须使用 `%20` 转义字符表示主题中的空格。

## 任务 2

第二个任务用于检验学习者对绝对路径、相对路径以及片段标识符的理解。

完成后的列表代码应类似于下面的代码：

```
<h1>列表路径测试</h1>

<ul>
  <li><a href="blue/blue-whale.jpg" target="_blank">将我链接到蓝鲸图片</a></li>
  <li><a href="../narwhal/narwhal.jpg" target="_blank">将我链接到独角鲸图片</a></li>
  <li><a href="https://www.google.co.uk/imghp" target="_blank">将我链接到 Google 图片搜索</a></li>
  <li><a href="#bottom">将我链接到页面底部的段落</a></li>
</ul>
```

## 任务 3

本组最后一个任务关注链接文字的良好实践。代码应类似于下面的代码：

```
<p>我们经常研究独角鲸。要了解更多信息，请访问我们的 <a href="narwhals.html" target="_blank">独角鲸页面</a>。</p>

<p>如果你还有问题，可以<a href="mailto:whales@example.com">给我们的支持团队发送邮件</a>。</p>

<p>你还可以<a href="factfile.pdf" target="_blank">下载我们的资料文件（PDF，4 MB）</a>，其中包含更多信息和常见问题。</p>
```

简单来说，需要使用良好的链接文字重写全部三个段落，并在第三个段落的链接上添加提示，说明这是一个较大的下载文件。
