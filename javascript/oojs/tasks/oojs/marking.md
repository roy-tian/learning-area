# Object-oriented JavaScript marking guide

这些题目旨在检验对以下内容的理解： the JavaScript features covered in the [Object-oriented JavaScript for beginners](https://wiki.developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object-oriented_JS), [Object prototypes](https://wiki.developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object_prototypes), and [Inheritance in JavaScript](https://wiki.developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Inheritance) lessons in Learn Web Development on MDN.

注意：如果代码中出现错误，错误会输出到页面的结果面板中, to help you try to figure out the answer (or into the browser's JavaScript console, 对于可下载版本则会输出到浏览器的 JavaScript 控制台中).

## Task 1

In this task we provide you with a `Shape` class containing only some data properties.

We want you to:

- add a constructor
- define a `calcPerimeter()` method
- create two instances of the class, a square and a triangle, and call their `calcPerimeter()` methods

Your code should look something like this:

```js
class Shape {
  name;
  sides;
  sideLength;

  constructor(name, sides, sideLength) {
    this.name = name;
    this.sides = sides;
    this.sideLength = sideLength;
  }

  calcPerimeter() {
    console.log(
      `The ${this.name}'s perimeter length is ${this.sides * this.sideLength}.`
    );
  }
}

const square = new Shape("square", 4, 5);
square.calcPerimeter();

const triangle = new Shape("triangle", 3, 3);
triangle.calcPerimeter();
```

## Task 2

Next, we'd like you to start with the `Shape` class you created in the last task.

We'd like you to create a `Square` class that inherits from `Shape`, and adds a `calcArea()` method that calculates the square's area.

Create an instance of the `Square` called square with appropriate property values, and call its `calcPerimeter()` and `calcArea()` methods to show that it works.

Your code should look something like this:

```js
class Shape {
  name;
  sides;
  sideLength;

  constructor(name, sides, sideLength) {
    this.name = name;
    this.sides = sides;
    this.sideLength = sideLength;
  }

  calcPerimeter() {
    console.log(
      `The ${this.name}'s perimeter length is ${this.sides * this.sideLength}.`
    );
  }
}

class Square extends Shape {
  constructor(sideLength) {
    super("square", 4, sideLength);
  }

  calcArea() {
    console.log(
      `The ${this.name}'s area is ${this.sideLength * this.sideLength} squared.`
    );
  }
}

const square = new Square(4);

square.calcPerimeter();
square.calcArea();
```
