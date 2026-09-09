# “无障碍排障”评分指南
下面的指南介绍 MDN 学习区无障碍主题——[无障碍排障](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Accessibility_troubleshooting)——的评分标准。评估中的每项子任务都列在下面，并说明该任务的分值和评分细则。

注意：这些只是指导原则，并非不可更改的规则——遇到边界情况或难以明确判断的情况时，可以自行决定如何评分。

总分为 37 分。请计算最终得分，然后除以 37 并乘以 100，得到百分制成绩。作为参考，可以查看这份能获得满分的[完成版网站](index.html)。

## 颜色

<dl>
<dt>当前配色使文字难以阅读。你能测试当前的文字/背景对比度、报告测试结果，然后通过修改指定颜色来修复它吗？</dt>
<dd>此项共 2 分——1 分用于使用 WebAIM 的[颜色对比度检查器](http://webaim.org/resources/contrastchecker/)等工具检查当前文字/背景对比度并以某种方式报告结果，另 1 分用于将当前配色更新为对比度良好的配色（也就是通过检查器的 WCAG AA 检查）。</dd>
</dl>

## 语义化 HTML

<dl>
    <dt>内容仍然不够无障碍——请报告使用屏幕阅读器浏览它时会发生什么。</dt>
    <dd>1 分；报告应表明用户无法在标题之间跳转并将标题用作路标，甚至无法判断标题和段落的起止位置。</dd>
    <dt>你能更新文章文字，使屏幕阅读器用户更容易浏览吗？</dt>
    <dd>8 分。
  <ul>
      <li>需要移除所有换行（<code>&lt;br&gt;</code> 标签）（2 分）。</li>
      <li>需要将 <code>&lt;font&gt;</code> 元素替换为合适的标题元素（<code>&lt;h1&gt;</code>、<code>&lt;h2&gt;</code>、<code>&lt;h3&gt;</code>）（2 分）。</li>
      <li>需要将段落放入段落元素（<code>&lt;p&gt;</code>）中（2 分）。</li>
      <li>在 CSS 文件中，需要将 <code>font[size="7"]</code>/<code>font[size="6"]</code>/<code>font[size="5"]</code> 替换为 <code>h1</code>/<code>h2</code>/<code>h3</code>。</li>
  </ul>
  </dd>
    <dt>网站的导航菜单部分（包裹在 <code>&lt;div class="nav"&gt;&lt;/div&gt;</code> 中）可以放入合适的 HTML5 语义元素来提高无障碍性。应该将它更新为什么元素？请完成更新。</dt>
    <dd>3 分。
  <ul>
      <li>需要将 <code>&lt;div class="nav"&gt;&lt;/div&gt;</code> 替换为 <code>&lt;nav&gt;&lt;/nav&gt;</code>。</li>
      <li>在 CSS 文件中，需要将 <code>div[class="nav"]</code> 的实例替换为 <code>nav</code>。</li>
  </ul>
  </dd>
</dl>

## 图片

<dl>
    <dt>当前图片对屏幕阅读器用户不可访问。你能修复它吗？</dt>
    <dd>3 分。可以用任何合适的方式添加替代文本来修复；请参阅<a href="https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML#Text_alternatives">文本替代</a>——在文字中描述图片，并使用 <code>aria-labelledby</code> 将二者关联起来是不错的方法，也可以直接使用传统的 <code>alt</code> 属性。</dd>
</dl>

## 音频播放器

<dl>
    <dt>听力障碍（失聪）人士无法访问音频——你能为这些用户添加某种无障碍替代内容吗？</dt>
    <dd>2 分。对于这个简单示例，任何文字稿方案都可以——链接到单独的文件、将文字稿写在同一页面中等都可以。只需听取音频、写出文字稿，并以某种方式将其添加到页面中。</dd>
    <dt>不支持 HTML5 音频的旧版浏览器用户无法访问音频。如何让他们仍然能够访问音频？</dt>
    <dd>2 分。在 <code>&lt;audio&gt;</code> 标签内部的替代内容中添加音频链接即可，也可以更进一步，提供某种 Flash 音频播放器作为替代内容。</dd>
</dl>

## 表单

<dl>
    <dt>顶部搜索表单中的 input 元素需要标签，但我们不想添加可能破坏设计、且视力正常用户并不真正需要的可见文字标签。如何添加只有屏幕阅读器可访问的标签？</dt>
    <dd>2 分。可以在 input 元素上添加带有描述性文字的 <code>aria-label</code> 属性。屏幕阅读器遇到该 input 时就会读出这个标签。</dd>
    <dt>评论表单中的两个 input 元素有可见文字标签，但它们没有明确地与标签关联——如何实现这种关联？注意，你还需要更新一些 CSS 规则。</dt>
    <dd>4 分。应将标签文字包裹在 <code>&lt;label&gt;</code> 元素中，并为其添加 <code>for</code> 属性，属性值应为它所标记的 input 元素的 ID。</dd>
</dl>

## 显示/隐藏评论控件

<dl>
    <dt>显示/隐藏评论控件按钮当前无法通过键盘访问。你能让它支持键盘访问吗？这包括让它可以获得焦点，以及使用回车键激活。</dt>
    <dd>2 分。将当前标记按钮的 <code>&lt;div&gt;</code> 元素改为 <code>&lt;button&gt;</code> 元素即可轻松实现。也可以使用 <code>tabindex</code> 和 JavaScript 修复按钮；请参阅<a href="https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML#Building_keyboard_accessibility_back_in">恢复键盘无障碍性</a>。不过前一种方法简单得多。</dd>
</dl>

## 表格

<dl>
    <dt>数据表当前不够无障碍——屏幕阅读器用户很难将数据行和列对应起来，而且表格没有任何摘要来说明它展示的内容。你能为 HTML 添加一些功能来解决这个问题吗？</dt>
    <dd>6 分。
  <ul>
      <li>应在 <code>summary</code> 属性或 <code>&lt;caption&gt;</code> 元素中添加合适的表格摘要。</li>
      <li>应将第一行和第一列中的每个单元格改为标题（<code>&lt;th&gt;</code>）。</li>
      <li>应为第一行的标题添加 <code>scope="col"</code>，为第一列的标题添加 <code>scope="row"</code>。</li>
  </ul>
  </dd>
</dl>

## 其他注意事项

<dl>
    <dt>你能再列出两个可以让网站更无障碍的改进想法吗？</dt>
    <dd>此项 2 分。任何合理的想法都可以；我们想到的包括：
    <ul>
        <li>为评论表单添加客户端验证。</li>
        <li>使用媒体查询，让网站在移动设备上更易用。</li>
        <li>想办法在点击显示评论控件按钮时，向屏幕阅读器用户播报当前显示的评论数量。例如，为评论区的 <code>h2</code> 元素添加值为 <code>"alert"</code> 的 <code>role</code> 属性，并将其文字更新为“评论（有 1 条）”。</li>
    </ul>
  </dd>
</dl>
