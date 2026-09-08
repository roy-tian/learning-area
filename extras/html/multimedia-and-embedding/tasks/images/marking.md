# 图片评分指南

这些任务用于检验学习者是否理解 [HTML 中的图片](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML)课程中介绍的 HTML 功能。该课程属于 MDN Web 开发学习区。

## 任务 1

本任务考查学习者将简单图片嵌入页面、为图片提供替代文本以及设置 `width` 和 `height` 属性的能力。理想答案应类似于下面的代码：

```
<h1>基础图片嵌入</h1>

<img src="images/blueberries.jpg"
     alt="一堆蓝莓，这些浆果小而圆，呈蓝色"
     width="615" height="419">
```

文件名和路径必须正确，图片才能显示。对于无法看到图片的人，`alt` 文本应该描述图片的视觉外观。最后，`width` 和 `height` 属性应与图片的固有宽度和高度相同，这样图片才能按正确尺寸显示。

## 任务 2

任务 2 要求学习者为 `<img>` 元素添加 `title`，创建鼠标悬停时出现的工具提示。代码应类似于下面的形式：

```
<h1>基础图片标题</h1>

<img src="larch.jpg"
     alt="几棵高大的常绿树，也叫落叶松"
     title="《蒙提·派森：如何从很远的地方辨认不同的树木》中的第一名">
```

由于屏幕阅读器的支持并不可靠，而且可能产生干扰，`title` 属性中的信息不应是必需的。这里的内容只是为了增加趣味。

## 任务 3

任务 3 要求学习者在 HTML 中创建一张带有标题的图片。

完成后的代码可能类似于下面的形式：

```
<h1>图片与标题</h1>

<figure>
  <img src="firefox.png"
       alt="一只抽象化的火焰狐狸环绕着蓝色球体"
       width="446" height="460">
  <figcaption>2019 年重新抽象设计的 Firefox 徽标！</figcaption>
</figure>
```

注意，标题应包含额外信息，而不应只是重复 `alt` 文本中对图片的描述。
