# Marking guide for "Structuring a page of content"

The following guide outlines a marking guide for the MDN Learning Area HTML Topic — [Structuring a page of content](https://developer.mozilla.org/en-US/Learn/HTML/Introduction_to_HTML/Structuring_a_page_of_content). Each subtask detailed in the assessment is listed below, along with an explanation of how many marks the task is worth.

Note: These are guidelines, not set in stone rules — you are of course free to use your judgement on mark awarding when you meet an edge case, or something that isn't clearly cut.

The overall mark awarded is out of 30. Work out their final mark, and then divide by 30 and multiply by 100 to give a percentage mark. For reference, you can find a [finished marked up page](index.html) that would be awarded top marks.

## Block/structural semantics

<dl>
<dt>The header (4 marks.)</dt>
<dd>They need to wrap the &lt;h1&gt;, first &lt;img&gt; and whole of the &lt;ul&gt; in a &lt;header&gt; element.</dd>
<dt>The navigation menu (4 marks.)</dt>
<dd>They need to wrap the &lt;ul&gt; in a &lt;nav&gt; element.</dd>
<dt>The main content (4 marks.)</dt>
<dd>They need to wrap both &lt;h2&gt;s, the first two &lt;p&gt;s and the last four &lt;img&gt;s in a &lt;main&gt; element.</dd>
<dt>The welcome text (4 marks.)</dt>
<dd>They need to wrap the first &lt;h2&gt; and the first two &lt;p&gt;s in an &lt;article&gt; element or a &lt;section&gt; element.</dd>
<dt>The image sidebar (4 marks.)</dt>
<dd>They need to wrap the second &lt;h2&gt; and the last four &lt;img&gt;s in an &lt;aside&gt; element.</dd>
<dt>The footer (4 marks.)</dt>
<dd>They need to wrap the last two &lt;p&gt;s in a &lt;footer&gt; element.</dd>
</dl>

## Other tasks

<dl>
<dt>Apply the provided CSS to the page by adding another &lt;link&gt; element just below the existing one provided at the start (4 marks.)</dt>
<dd>The element should look like this: &lt;link rel="stylesheet" href="style.css"&gt;</dd>
<dt>You'll get bonus points if it validates as much as possible (2 marks.)</dt>
<dd>If the student's code validates, apart from the Google Font link element, they get the marks.</dd>
