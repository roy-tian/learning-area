# “为社区学校主页排版”评分指南

以下指南说明 MDN 学习区 CSS 主题——[为社区学校主页排版](https://developer.mozilla.org/zh-CN/docs/learn/CSS/Styling_text/Typesetting_a_homepage)——的评分标准。下面列出了测验中的每项任务，并说明每项任务的分值和评分细则。

注意：这些内容是指导原则，并非一成不变的规则。遇到边界情况或标准不明确的情况时，可以根据实际情况自行判断分数。

总分为 40 分。请计算最终得分，然后除以 40，再乘以 100，得到百分制成绩。作为参考，可以查看[完成后的排版主页](index.html)，该答案应当获得满分。

## 字体

<dl>
<dt>“下载几款可免费使用的字体”（3 分）</dt>
<dd>两款字体各自因选用得当可得 1 分（题目描述中说“所选字体应让页面显得相当严肃、正式、可信——正文使用衬线体作为全站字体，标题搭配无衬线体或粗衬线体会很不错”），另外 1 分取决于所用字体是否可以合法使用。</dd>
<dt>“使用合适的服务生成防弹（bulletproof）的 <code>@font-face</code> 代码”（2 分）</dt>
<dd>使用类似 fontsquirrel 生成器的服务来创建防弹的 <code>@font-face</code> 代码即可得分。可以对照上面链接的示例进行检查。如果不具备跨浏览器兼容性，或未能成功应用字体，则不得分。</dd>
<dt>“把正文字体应用到整个页面，把标题字体应用到标题。”（3 分）</dt>
<dd>正文字体应应用于 <code>&lt;html&gt;</code> 元素，标题字体应只应用于 <code>&lt;h1&gt;</code> 和 <code>&lt;h2&gt;</code>。各 1 分。此外，如果在字体栈中为每种字体提供了合理的回退字体，而不只是单一字体，可另得 1 分加分。</dd>
</dl>

## 通用文本样式

<dl>
<dt>“为页面设置全站 <code>font-size</code> 为 10px”（1 分）</dt>
<dd><code>font-size: 10px;</code> 应应用于 <code>&lt;html&gt;</code> 元素。</dd>
<dt>“使用合适的相对单位，为标题和其他元素类型设置合适的字号。”（3 分）</dt>
<dd>字号设置可根据设计是否合理得 0 到 2 分。如果使用了 em 或 rem 等合理的相对单位，另得 1 分。</dd>
<dt>“为正文设置合适的 <code>line-height</code>。”（1 分）</dt>
<dd>大约 1.4 到 1.6 之间最为理想，可以得分。</dd>
<dt>“让顶级标题在页面上居中。”（1 分）</dt>
<dd>在顶级标题上设置 <code>text-align: center;</code> 即可得分。使用 Flexbox 也可以。其他方法可能过于绕弯，难以得分。</dd>
<dt>“为标题添加一点 <code>letter-spacing</code>……”（1 分）</dt>
<dd>一般来说，像 1 或 2 像素（0.1 或 0.2 rem）这样的小值就可以，具体取决于字体。</dd>
<dt>“视情况为正文添加一些字间距和词间距。”（1 分）</dt>
<dd>大约 0.5 或 1 像素的字间距和大约 3px 的词间距看起来比较合适，能让文字更有呼吸感，具体取决于字体。</dd>
<dt>“为 <code>&lt;section&gt;</code> 中每个标题后的第一段设置一点文本缩进，比如 20px。”（2 分）</dt>
<dd>这是对选择器和背景知识的一个很好的小测试。选择器应为 <code>h2 + p</code>，使用的声明应为 <code>text-indent: 20px;</code>。各 1 分。</dd>
</dl>

## 链接

<dl>
<dt>“为链接的 link、visited、focus 和 hover 状态设置与页面顶部和底部横条颜色相配的颜色。”（3 分）</dt>
<dd>第一个分要求链接状态的规则按 <code>a</code>、<code>a:link</code>、<code>a:visited</code>、<code>a:focus</code>、<code>a:hover</code>、<code>a:active</code> 的正确顺序排列。第二个分要求 link 和 visited 状态使用与页面相配的颜色。第三个分要求 focus 和 hover 状态使用不同的颜色（由于下一条要求，给它们相同的颜色也可以）。link 与 visited 样式相同、focus 与 hover 样式相同是可以接受的。</dd>
<dt>“让链接默认带下划线，但在悬停或获得焦点时下划线消失。”（2 分）</dt>
<dd>链接默认应设置 <code>text-decoration: underline</code>。可以只在 focus 和 hover 状态上设置 <code>text-decoration: none;</code>。使用 <code>border-bottom</code> 的方法同样可以接受。</dd>
<dt>“移除页面上所有链接的默认焦点轮廓。”（1 分）</dt>
<dd>只需在所有链接（<code>a</code>）上设置 <code>outline: none</code>。</dd>
<dt>“给 active 状态设置明显不同的样式，让它突出醒目，但仍要与页面整体设计相协调。”（2 分）</dt>
<dd>如果样式非常夸张、足够突出，得 1 分；如果既有辨识度又不失品位，得 2 分。</dd>
<dt>“让外部链接旁边插入外部链接图标。”（4 分）</dt>
<dd>这道题值 4 分，因为它相当复杂。以下各项各得 1 分：
  <ul>
    <li>使用合适的属性选择器，只选中 <code>href</code> 属性中包含 “http” 的链接。</li>
    <li>添加一些内边距，为图标显示留出空间。</li>
    <li>包含正确的 <code>background-*</code> 属性或 <code>background</code> 简写来放置背景图片，并使其不重复。</li>
    <li>包含 <code>background-size</code> 属性，将图标动态调整为合适的大小；或者用图像编辑器把图标调整为合适的尺寸。</li>
  </ul>
</dd>
</dl>

## 列表

<dl>
<dt>“确保列表和列表项的间距与页面整体样式协调。”（1 分）</dt>
<dd>这一项通常默认就能满足，但如果学生把 <code>&lt;ul&gt;</code> 和 <code>&lt;ol&gt;</code> 的上下外边距设为 16px（1.6rem），可额外得 1 分。这是为了确保即使两个列表相邻摆放，间距也始终正确。</dd>
<dt>“给列表项配上漂亮的列表符号，要适合页面设计。你可以选择自定义符号图片，也可以用其他方式。”（1 分）</dt>
<dd>这完全取决于学生：他们可以为 <code>&lt;ul&gt;</code> 和 <code>&lt;ol&gt;</code> 设置简单的 <code>list-style-type</code>，也可以玩出些更有意思的花样；随他们喜欢。</dd>
</dl>

## 导航菜单

<dl>
<dt>“为导航菜单设置样式，使其外观与页面的整体风格相符。”（8 分）</dt>
<dd>这道题分值很高，因为它相当复杂且包含多个部分。理想情况下，学生应该：
  <ul>
    <li>让每条选择器都以 <code>nav</code> 开头，确保只影响导航菜单。</li>
    <li>把 <code>&lt;ul&gt;</code> 的左内边距设为 0。</li>
    <li>给 <code>&lt;ul&gt;</code> 设置一些上外边距，使第一个列表项的文字与旁边各列的标题对齐；给 <code>&lt;li&gt;</code> 设置一些下外边距，让菜单项之间留出适当间距。</li>
    <li>在 <code>&lt;li&gt;</code> 上设置 <code>list-style-type: none;</code> 去掉列表符号。</li>
    <li>把链接设为 <code>display: inline-block</code>，使它们可以设置尺寸。</li>
    <li>给链接设置合适的样式，使其美观并与页面风格相配。可以包括居中文本、行高、更大的字号、颜色、边框等，只要看起来不错即可。</li>
    <li>给 focus 和 hover 状态设置不同的样式，使导航菜单在交互时有响应。</li>
    <li>给 active 状态再设置一种不同的样式，使链接被激活时一目了然。</li>
  </ul>
</dd>
</dl>
