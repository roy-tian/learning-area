# “标记一封信”评分指南

以下指南说明 MDN 学习区 HTML 主题——[标记一封信](https://developer.mozilla.org/en-US/Learn/HTML/Introduction_to_HTML/Marking_up_a_letter)——的评分标准。下面列出了测验中的每项任务，并说明每项任务的分值和评分细则。

注意：这些内容是指导原则，并非一成不变的规则。遇到边界情况或标准不明确的情况时，可以根据实际情况自行判断分数。

总分为 45.5 分。请计算最终得分，然后除以 45.5，再乘以 100，得到百分制成绩。作为参考，可以查看[完成后的标记信件](index.html)，该答案应当获得满分。

## 块级/结构语义

<dl>
<dt>应使用合适的结构组织整个文档，包括 &lt;!doctype&gt;、&lt;html&gt;、&lt;head&gt; 和 &lt;body&gt; 元素（5 分）</dt>
<dd>需要做到：
<ul>
  <li>提供 HTML5 文档类型声明（&lt;!doctype html&gt;，1 分）</li>
  <li>在文档类型声明之后包含 &lt;head&gt; 元素（1 分）</li>
  <li>使用 &lt;body&gt; 元素包裹页面内容（1 分）</li>
  <li>使用 &lt;html&gt; 元素包裹 head 和 body（1 分）</li>
  <li>如果在 &lt;html&gt; 标签中包含 lang 属性，可获得 1 分奖励（1 分）</li>
</ul>
</dd>
<dt>信件整体应使用段落和标题进行标记，下面列出的情况除外。应有一个顶级标题（“回复：”行）和三个二级标题（6 分）</dt>
<dd>需要做到：
  <ul>
  <li>将“回复：”行标记为 &lt;h1&gt; 元素（1 分）</li>
  <li>将“开学日期”“学习科目”和“异域舞蹈”标记为 &lt;h2&gt; 元素（3 分）</li>
  <li>将所有适合使用段落、但不应标记为标题或列表的结构化内容标记为段落（2 分）</li>
</ul>
</dd>
<dt>学期开始日期、研究主题和特色舞蹈应使用合适的列表类型进行标记（6 分）</dt>
<dd>这一项相对简单。根据不同列表的内容和使用场景，应该做到：
<ul>
  <li>将学期开始日期标记为无序列表（&lt;ul&gt;/&lt;li&gt;），或者有理由地使用有序列表（&lt;ol&gt;/&lt;li&gt;）；两者均可（2 分）</li>
  <li>将研究主题标记为有序列表（&lt;ol&gt;/&lt;li&gt;）（2 分）</li>
  <li>将特色舞蹈标记为描述列表（&lt;dl&gt;/&lt;dd&gt;/&lt;dt&gt;）（2 分）</li>
</ul>
</dd>
<dt>两个地址应放在 <code>&lt;address&gt;</code> 元素中。地址的每一行都应换行，但不能使用新的段落。（3 分）</dt>
<dd>使用 &lt;address&gt; 元素包裹两个地址，并在每个地址的每一行末尾添加 &lt;br&gt; 元素；每个地址的最后一行除外。</dd>
</dl>

## 行级语义

<dl>
<dt>发件人和收件人的姓名（以及“联系电话”和“电子邮件”）应使用表示重要性的元素进行标记（2 分，每项 0.5 分）</dt>
<dd>应使用 &lt;strong&gt; 元素包裹“李雷 教授”“韩梅梅 女士”“联系电话”和“电子邮件”。</dd>
<dt>文档中的四个日期应使用包含机器可读日期的合适元素进行标记（2 分，每项 0.5 分）</dt>
<dd>四个日期都应使用 &lt;time&gt; 元素标记，并且每个元素都应包含 datetime 属性，其中写入机器可读的日期。例如：&lt;time datetime="2019-02-22"&gt;2019 年 2 月 22 日&lt;/time&gt;</dd>
<dt>信件中的第一个地址和第一个日期应设置 class 属性值“sender-column”；稍后添加的 CSS 会使它们右对齐，这符合传统信件的布局方式。（2 分）</dt>
<dd>应为文档中的第一个 &lt;p&gt; 元素设置 class="sender-column" 属性；第一个日期应放在 &lt;p&gt; 元素中，该元素也应设置 class="sender-column" 属性。</dd>
<dt>信件中的五个首字母缩略词/缩写应进行标记，以提供每个缩写的完整含义。（2.5 分，每项 0.5 分）</dt>
<dd>正文中的五个缩写——“PhD”“HTML”“CSS”“BCE”和“Prof.”——都应使用带有 title 属性的 &lt;abbr&gt; 元素包裹。例如：&lt;abbr title="哲学博士（Doctor of Philosophy）"&gt;PhD&lt;/abbr&gt;。</dd>
<dt>六个下标/上标应使用合适的元素进行标记（3 分，每项 0.5 分）。</dt>
<dd>化学式中的四个数字应使用 &lt;sub&gt; 元素包裹，例如 H&lt;sub&gt;2&lt;/sub&gt;O。两个指数表达式中最右侧的数字都应使用 &lt;sup&gt; 元素包裹，例如 10&lt;sup&gt;3&lt;/sup&gt;。</dd>
<dt>尝试使用表示重要性或强调的元素标记正文中至少两个合适的词语（1 分，每项 0.5 分）</dt>
<dd>这一项有较大的解释空间；只要选择恰当的词语进行标记即可。</dd>
<dt>有两个位置应添加超链接；请添加带有标题的合适链接。链接目标统一使用 http://example.com（4 分）</dt>
<dd>
  应在合理的文字外层使用 &lt;a&gt; 元素创建两个链接。每个元素都应有指向虚拟 URL 的 href 属性，例如“http://www.example.com”或“*”，并且应有描述链接目标的 title 属性。如果链接文字不恰当和/或缺少属性，应扣除 0.5 分。
  <ul>
    <li>第一个位置：例如 &lt;a href="http://www.example.com" title="纽臂大学大事时间表"&gt;学校大事时间表&lt;/a&gt;</li>
    <li>第二个位置：例如 &lt;a href="http://www.example.com" title="李雷的异域舞蹈研究"&gt;异域舞蹈研究&lt;/a&gt;</li>
  </ul>
</dd>
<dt>大学格言及其出处应使用合适的元素进行标记（2 分）</dt>
<dd>应使用 &lt;q&gt; 元素包裹“人人皆可纽臂”，并使用 &lt;cite&gt; 元素包裹“诸葛中天传”。</dd>
</dl>

## 文档的 head 部分

<dl>
  <dt>应使用合适的 meta 标签将文档字符集设置为 utf-8（1 分）</dt>
  <dd>答案应为 &lt;meta charset="utf-8"&gt; 或等价写法，并且该标签应位于 &lt;head&gt; 元素中。</dd>
  <dt>应使用合适的 meta 标签指定信件作者（1 分）</dt>
  <dd>答案可以类似于 &lt;meta name="author" content="李雷"&gt;，并且应位于 &lt;head&gt; 元素中。</dd>
  <dt>应将提供的 CSS 放在合适的标签中（2 分）</dt>
  <dd>应将提供的 CSS 文件内容粘贴到 &lt;head&gt; 元素中的 &lt;style&gt; 元素内。或者，也可以（事实上更推荐）将 CSS 放入外部 CSS 文件，并使用 &lt;link&gt; 元素引入。</dd>
</dl>

## 其他任务

<dl>
<dt>如果代码尽可能通过验证，可以获得额外分数（2 分）。</dt>
<dd>如果学生的代码能够通过验证（Google Fonts 的 link 元素除外），即可获得这些分数。</dd>
</dl>
