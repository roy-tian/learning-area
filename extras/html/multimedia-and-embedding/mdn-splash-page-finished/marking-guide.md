# “Mozilla 宣传页”评分指南

下面是 MDN 学习区 HTML 测验——[Mozilla 宣传页](https://developer.mozilla.org/en-US/Learn/HTML/Multimedia_and_embedding/Mozilla_splash_page)的评分指南。下文列出了测验中的每项任务，并说明每项任务的分值和评分细则。

注意：这些只是指导原则，并非一成不变的规则。遇到边界情况或指南中没有明确说明的情况时，你可以自行判断如何评分。

总分为 28 分。请计算最终得分，再除以 28 并乘以 100，得到百分制分数。作为参考，可以查看[完成后的宣传页](index.html)，它应当获得满分。

## 准备图片

<dl>
<dt>本部分共 6 分</dt>
<ul>
  <li>制作 Firefox 徽标的 400px 和 120px 版本，得 1 分。</li>
  <li>制作扩展图片的 400px 和 120px 版本，得 1 分。</li>
  <li>制作恐龙徽标的 400px 和 120px 版本，得 1 分。</li>
  <li>保留原样的 MDN 徽标 SVG，得 1 分。</li>
  <li>制作小熊猫图片的 1200px 和 600px 版本；只有前者为横向、后者为纵向且显示小熊猫特写时，才得 1 分。</li>
  <li>优化图片，使它们尺寸小而质量合适，得 1 分。</li>
  </ul>
</dd>
</dl>

## 在页眉中添加徽标

<dl>
<dt>本部分共 2 分</dt>
<ul>
  <li>让图片的 <code>src</code> 指向 120px 版本的 Firefox 徽标，得 1 分。</li>
  <li>为图片提供恰当的 <code>alt</code> 文本，得 1 分。</li>
</ul>
</dd>
</dl>

## 在主体文章中添加视频

<dl>
<dt>本部分共 2 分</dt>
<ul>
  <li>嵌入正确的视频，得 1 分。</li>
  <li>将视频宽度设为 400px，并设置合理的高度，得 1 分。</li>
</ul>
</dd>
</dl>

## 为更多信息链接添加响应式图片

<dl>
<dt>本部分共 14 分</dt>
<ul>
  <li>前三个链接各 4 分。要获得每个链接的全部分数，学习者必须：
    <ul>
      <li>在链接中使用正确的图片（“下载 Firefox”使用 Firefox 徽标，mozilla.org 使用恐龙图片，扩展站点使用扩展图片）。</li>
      <li>包含恰当的 <code>src</code> 和 <code>alt</code> 属性。</li>
      <li>包含 <code>srcset</code> 属性，并声明 120px 版本为 120w、400px 版本为 400w。</li>
      <li>包含 <code>sizes</code> 属性，并声明视口宽度不超过 500px 时使用 120px 版本，否则使用 400px 版本（<code>(max-width: 500px)</code>）。</li>
    </ul>
  </li>
  <li>在最后一个链接中使用普通图片元素嵌入 SVG 图片，并提供恰当的 <code>src</code> 属性和 <code>alt</code> 文本，得 2 分。</li>
</ul>
</dd>
</dl>

## 艺术指导的小熊猫图片

<dl>
<dt>本部分共 5 分</dt>
<ul>
  <li>使用 <code>&lt;picture&gt;</code> 元素，得 1 分。</li>
  <li>在 <code>&lt;picture&gt;</code> 元素中包含一个指向横向版本、并带有恰当 <code>alt</code> 文本的 <code>&lt;img&gt;</code> 元素，得 2 分。</li>
  <li>包含一个 <code>&lt;source&gt;</code> 元素，其 <code>srcset</code> 属性指向纵向版本图片，<code>media</code> 属性使图片仅在视口宽度不超过 600px 时显示（<code>(max-width: 600px)</code>），得 2 分。</li>
</ul>
</dd>
</dl>
