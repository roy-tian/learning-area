# 媒体与嵌入评分指南

这些任务用于检验学习者是否理解 [视频和音频内容](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content)以及[从 object 到 iframe——其他嵌入技术](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Other_embedding_technologies)课程中介绍的 HTML 功能。这些课程属于 MDN Web 开发学习区。

## 任务 1

本任务考查学习者使用单一来源组装简单音频播放器的能力。理想答案应类似于下面的代码：

```
<h1>基础音频嵌入</h1>

<audio src="media/audio.mp3" controls>
  <p>你的浏览器不支持 HTML5 音频。请改用<a href="media/audio.mp3">音频链接</a>。</p>
</audio>
```

文件名和路径必须正确，音频才能播放。应包含 `controls` 属性，以便我们轻松播放音频；备用文本也是最佳实践，尽管现在大多数浏览器都支持此功能。

## 任务 2

接下来要完成稍微复杂一些的内容：一个带有多个来源的完整视频播放器。代码应类似于下面的形式：

```
<h1>视频嵌入</h1>

<video controls muted
       width="320" height="240">
  <source src="media/video.mp4" type="video/mp4">
  <source src="media/video.webm" type="video/webm">
  <track kind="subtitles" src="media/subtitles_en.vtt" srclang="zh-CN">
  <p>你的浏览器不支持 HTML5 视频。请改用<a href="media/video.mp4">视频链接</a>。</p>
</video>
```

这里有多项内容需要完成：

* 使用 `controls` 让播放器显示控件。
* 按要求设置 `width` 和 `height`。
* 使用 `muted` 确保不播放声音。
* 使用两个分别指向不同视频格式的 `<source>` 元素，为不支持 MP4、而支持 WebM 的旧版浏览器提供支持。每个元素都应设置 `type` 属性，说明视频的 MIME 类型，这样浏览器无需开始下载视频就能预先判断是否可以播放。
* 使用 `<track>` 元素显示字幕，并设置恰当的 `kind`、`src` 和 `srclang` 属性。
* 像前面一样提供合适的备用内容。

注意，如果尝试直接在本地运行示例，字幕不会加载，这是浏览器的安全策略所致。要查看字幕，必须通过实际的 Web 服务器运行示例。

## 任务 3

任务 3 要求学习者测试嵌入技术。

完成后的代码可能类似于下面的形式：

```
<h1>嵌入</h1>

<object data="media/mypdf.pdf" type="application/pdf"
        width="400" height="400" typemustmatch>
</object>

<hr>

<iframe width="560" height="315" src="https://www.youtube.com/embed/SB-qEYVdvXA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


```

在第一个示例中，只需查找将 PDF 嵌入页面的正确代码，并确保 PDF 文件的路径正确。

在第二个示例中，需要访问 YouTube、Google 地图或类似网站，找到嵌入功能，然后将嵌入代码复制到实时示例中。根据使用的服务不同，这段代码的形式会有很大差异。
