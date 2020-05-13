# Marking guide for "Image gallery"
The following guide outlines a marking guide for the MDN Learning Area JavaScript Topic — [Image gallery](https://developer.mozilla.org/en-US/Learn/JavaScript/Building_blocks/Image_gallery). Each subtask detailed in the assessment is listed below, along with an explanation of how many marks the task is worth, and the mark breakdown.

Note: These are guidelines, not set in stone rules — you are of course free to use your judgement on mark awarding when you meet an edge case, or something that isn't clear cut.

The overall mark awarded is out of 21. Work out their final mark, and then divide by 21 and multiply by 100 to give a percentage mark. For reference, you can find a [finished program](main.js) that would be awarded top marks.

## Looping through the images

<dl>
<dt>Creating the loop</dt>
<dd>Four marks for this — the actual solution is fairy simple, but there are a few details to get right (any suitable loop type can be used):
<ol>
  <li>The initializer should start at 1, and the loop should iterate until a value of 5. This is useful, as the first image has the number 1 in its filename, then 2, 3, etc.</li>
  <li>The iterator should add 1 to the initializer after each iteration.</li>
</ol>
</dd>
<dt>Building the image path for each loop iteration</dt>
<dd>Three marks for this. The student basically just needs to replace the <code>xxx</code> placeholder with a string concatenation that will use the initializer to build the image path in each case. The pattern we need is this: <code>'images/pic' + i + '.jpg'</code>.</dd>
</dl>

## Adding an onclick handler to each thumbnail image

<dl>
<dt>Find the value of the src attribute of the current image.</dt>
<dd>Four marks for this; An anonymous function would make most sense:
<pre>
newImage.onclick = function(e) {
  displayedImage.src = e.target.src;
}
</pre>
</dd>
</dl>

## Writing a handler that runs the darken/lighten button
<dl>
<dt>Adding an onclick handler</dt>
<dd>Two marks; the <code>&lt;button&gt;</code> is referenced in the <code>btn</code> constant, so the handler will need to look something like <code>btn.onclick = function() { ... }</code>. In this case, invoking a named function would also be ok, e.g. <code>btn.onclick = myFunction;</code></dd>
<dt>Checking the current class name set on the <code>&lt;button&gt;</code> element</dt>
<dd>Two marks; this again uses <code>getAttribute()</code>, and you just need to run this on the <code>btn</code> constant — <code>const btnClass = btn.getAttribute('class');</code>
<dt>The conditional statement</dt>
<dd>Six marks for this. It is not that complex, but there is a fair bit of work to do here. The conditional statement just needs to look like this:
<pre>
if(btnClass === 'dark') {
  ...  
} else {
  ...
}
</pre>
Then the student needs to grab the three lines provided in the assessment text, and modify it to set the things that are needed in each state. So a finished event handler could look something like this:
<pre>
btn.onclick = function() {
  const btnClass = btn.getAttribute('class');
  if(btnClass === 'dark') {
    btn.setAttribute('class','light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    btn.setAttribute('class','dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
}
</pre>
</dd>
</dl>
