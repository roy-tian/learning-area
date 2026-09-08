# “构建内容页面”评分指南

以下指南说明 MDN 学习区 HTML 主题——[构建内容页面](https://developer.mozilla.org/en-US/Learn/HTML/Introduction_to_HTML/Structuring_a_page_of_content)——的评分标准。下面列出了测验中的每项任务，并说明每项任务的分值。

注意：这些内容是指导原则，并非一成不变的规则。遇到边界情况或标准不明确的情况时，可以根据实际情况自行判断分数。

总分为 30 分。请计算最终得分，然后除以 30，再乘以 100，得到百分制成绩。作为参考，可以查看[完成后的标记页面](index.html)，该答案应当获得满分。

## 块级/结构语义

<dl>
<dt>页眉（4 分）</dt>
<dd>应使用 &lt;header&gt; 元素包裹 &lt;h1&gt;、第一个 &lt;img&gt; 和完整的 &lt;ul&gt;。</dd>
<dt>导航菜单（4 分）</dt>
<dd>应使用 &lt;nav&gt; 元素包裹 &lt;ul&gt;。</dd>
<dt>主体内容（4 分）</dt>
<dd>应使用 &lt;main&gt; 元素包裹两个 &lt;h2&gt;、前两个 &lt;p&gt; 以及最后四个 &lt;img&gt;。</dd>
<dt>欢迎文字（4 分）</dt>
<dd>应使用 &lt;article&gt; 或 &lt;section&gt; 元素包裹第一个 &lt;h2&gt; 和前两个 &lt;p&gt;。</dd>
<dt>图片侧边栏（4 分）</dt>
<dd>应使用 &lt;aside&gt; 元素包裹第二个 &lt;h2&gt; 和最后四个 &lt;img&gt;。</dd>
<dt>页脚（4 分）</dt>
<dd>应使用 &lt;footer&gt; 元素包裹最后两个 &lt;p&gt;。</dd>
</dl>

## 其他任务

<dl>
<dt>应用提供的 CSS（4 分）。</dt>
<dd>应在开始时提供的现有 &lt;link&gt; 元素正下方添加另一个 &lt;link&gt; 元素，例如：&lt;link rel="stylesheet" href="style.css"&gt;。</dd>
<dt>如果尽可能通过验证，可以获得额外分数（2 分）。</dt>
<dd>如果学生的代码能够通过验证（Google Fonts 的 link 元素除外），即可获得这些分数。</dd>
</dl>
