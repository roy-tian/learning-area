# Marking guide for "Adding features to our bouncing balls demo"

The following guide outlines a marking guide for the "Introducing JavaScript Objects" module assessment, part of the MDN Learning Area JavaScript Topic — see [Adding features to our bouncing balls demo](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Adding_bouncing_balls_features). Each subtask detailed in the assessment is listed below, along with an explanation of how many marks the task is worth, and the mark breakdown.

Note: These are guidelines, not set in stone rules — you are of course free to use your judgement on mark awarding when you meet an edge case, or something that isn't clear cut.

The overall mark awarded is out of 44. Work out their final mark, and then divide by 44 and multiply by 100 to give a percentage mark. For reference, you can find a [finished program](main.js) that would be awarded top marks.

## Creating our new objects

<dl>
<dt>The <code>Shape()</code> constructor</dt>
<dd>Three marks for this — creating this constructor is not difficult — you just need to copy the original <code>Ball()</code> constructor, remove the <code>color</code> and <code>size</code> definitions, then add the extra <code>exists</code> property/parameter.</dd>
<dt>The <code>Ball()</code> constructor</dt>
<dd>eight marks for this in total, as it is a bit more complex:
  <ul>
    <li>Two marks for using <code>Shape.call(this, x, y, velX, velY, exists)</code> to inherit the <code>x</code>, <code>y</code>, <code>velX</code>, <code>velY</code>, and <code>exists</code> properties from Shape().</li>
    <li>Two marks for including those properties as parameters in the constructor (it won't work without it).</li>
    <li>Two marks for creating non-inherited <code>color</code> and <code>size</code> property definitions, which should be the same as the ones in the original <code>Ball()</code> constructor.</li>
    <li>Two marks for defining <code>Ball.prototype</code> and <code>Ball.prototype.constructor</code> correctly, according to the technique in our <a href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance#Setting_Teacher()%27s_prototype_and_constructor_reference">inheritance article</a>.</li>
  </ul>
</dd>
</dl>

## Defining EvilCircle()

<dl>
<dt>Inheritance</dt>
<dd>One mark for using <code>shape.call(this, x, y, 20, 20, exists)</code> to inherit the <code>x</code>, <code>y</code>, <code>velx</code>, <code>velY</code>, and <code>exists</code> properties, but keeping the 3rd and 4th properties constant at 20. One mark for specifying <code>x</code>/<code>y</code>/<code>exists</code> as parameters in the constructor.</dd>
<dt>Specifying new properties</dt>
<dd>Two marks for specifying the four new required properties.</dd>
<dt>Prototype and constructor</dt>
<dd>One mark for defining <code>EvilCircle.prototype</code> and <code>EvilCircle.prototype.constructor</code> using the same pattern as before.</dd>
</dl>

## Defining EvilCircle()'s methods

<dl>
<dt>draw()</dt>
<dd>Three marks for this. After copying the <code>Ball.prototype.draw</code> definition and changing <code>Ball</code> to <code>EvilCircle</code>, you simply need to:
  <ul>
    <li>Change <code>fillStyle</code> to <code>strokeStyle</code>.</li>
    <li>Change <code>fill()</code> to <code>stroke()</code>.</li>
    <li>Add <code>ctx.lineWidth = 3</code> soon after the <code>beginPath()</code> call, but not after the <code>stroke()</code> call. Also, values other than 3 are acceptable, as long as it doesn't look too silly.</li>
  </ul>
</dd>
<dt>checkBounds()</dt>
<dd>Five marks for this. After copying the <code>Ball.prototype.update</code> definition and changing <code>Ball</code> to <code>EvilCircle</code>, you need to:
  <ul>
    <li>Get rid of the last two lines (1 mark).</li>
    <li>Change the code lines inside the <code>if()</code> blocks so that the ball won't bounce back from the screen edges; instead, it just won't move past them. The solution can be seen in the finished program (4 marks).</li>
  </ul>
</dd>
<dt>setControls()</dt>
<dd>Three marks for this. You need to:
  <ul>
    <li>Write a container for the method definition, i.e. <code>EvilCircle.prototype.setControls = function() { }</code>  (1 mark).</li>
    <li>Copy the provided code block into the method (1 mark).</li>
    <li>Explain that we needed to include <code>var _this = this;</code> because we need to reference this as it is inside the constructor's scope. If we didn't include this line and just referenced <code>this</code> inside the inner event handler function, it wouldn't work, as the scope would be the event handler, not the outer constructor function scope. (1 mark)</li>
  </ul>
</dd>
<dt>collisionDetect()</dt>
<dd>Two marks for this. After copying the <code>Ball.prototype.collisionDetect</code> definition and changing <code>Ball</code> to <code>EvilCircle</code>, you need to:
  <ul>
    <li>Change the test inside the outer <code>if()</code> statement's parentheses to <code>balls[j].exists</code> — you basically need to check whether the current ball's <code>exists</code> proerty is <code>true</code>. (1 mark).</li>
    <li>Change the code inside the inner <code>if()</code> statement's curly braces to <code>balls[j].exists = false;</code> — if a ball gets hit by the evil circle, it will stop existing (1 mark).</li>
  </ul>
</dd>
</dl>

## Bringing the evil circle into the program

<dl>
<dt>Creating an <code>EvilCircle</code> instance, and calling <code>setControls()</code></dt>
<dd>Three marks for this — you need to create a new instance of the <code>EvilCircle</code>, for example:
<pre>var evil = new EvilCircle(random(0,width), random(0,height), true);
</pre>
and then call its <code>setControls()</code> method:
<pre>evil.setControls()</pre>
These lines must be included in a way that they only run once, not with every loop iteration. The easiest way to do this is to just include the lines outside the loop function definition, before <code>loop()</code> is called.</dd>
<dt>make it so that the ball functions are only called inside the loop if the current ball exists</dt>
<dd>Two marks for this — you simply need to wrap the three <code>ball[i]</code> function calls inside the for loop inside <code>if(balls[i].exists) { ... }</code>.</dd>
<dt>Call the evil ball instance's <code>draw()</code>, <code>checkBounds()</code>, and <code>collisionDetect()</code> methods...</dt>
<dd>Two marks for this; you just need to include the folowing lines inside the <code>loop()</code>, just before the <code>requestAnimationFrame()</code> line:

<pre>evil.draw();
evil.checkBounds();
evil.collisionDetect();</pre>

</dd>
</dl>

## Implementing the score counter

<dl>
<dt>Adding a <code>&lt;p&gt;</code> element</dt>
<dd>One mark — you just need to add the following below the <code>&lt;h1&gt;</code> element in your HTML file:
<pre>&lt;p&gt;Ball count: &lt;/p&gt;</pre>
</dd>
<dt>Add the provided CSS rule to the bottom of the CSS file</dt>
<dd>One mark — the CSS rule needs to be copied exactly as shown in to the bottom of the CSS file.</dd>
<dt>JavaScript updates</dt>
<dd>Six marks in total. You need to complete the following tasks:
  <ul>
    <li>Create a variable that stores a reference to the paragraph — something like this is fine: <code>var para = document.querySelector('p');</code> (one mark).</li>
    <li>Keep a count of the number of balls on screen in some way. Probably the easiest way is to just create a separate variable (<code>var count = 0;</code>) and then increment/decrement it when a ball is added to or removed from the scene. But another approach would also be OK, as long as it works (one mark).</li>
    <li>Increment the count and display the updated number of balls present each time a ball is added to the scene. You should insert something like the following into the <code>loop()</code> function, just after each ball is created (two marks):
<pre>count++;
para.textContent = 'Ball count: ' + count;</pre>
    </li>
    <li>Decrement the count and display the updated number of balls present each time the evil circle eats a ball (causes it not to exist). Something like the following should be inserted each time a ball's <code>exists</code> property is set to <code>false</code> (which occurs inside the evil circle's <code>collisionDetect()</code> method) (two marks):
    <pre>count--;
para.textContent = 'Ball count: ' + count;</pre>
    </li>
  </ul>
</dd>
</dl>
