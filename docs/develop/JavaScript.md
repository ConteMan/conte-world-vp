---
---
> 搬运、摘录、参考、修改自以下项目、文章，十分感谢：  
> [https://github.com/CavsZhouyou/Front-End-Interview-Notebook](https://github.com/CavsZhouyou/Front-End-Interview-Notebook)

## JavaScript 基本类型

8 种。  
- 原始数据类型：Undefined、Null、Boolean、Number、String、Symbol、BigInt；
- 引用数据类型：Object；

## 堆、栈

堆和栈的概念存在于数据结构中和操作系统内存中。  
在数据结构中，栈中数据的存取方式为先进后出。而堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大小来规定。  
完全二叉树是堆的一种实现方式。  
在操作系统中，内存被分为栈区和堆区。  
栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。  
堆区内存一般由程序员分配释放，若程序员不释放，程序结束时可能由垃圾回收机制回收。  

## undefined 与 undeclared

已经在作用域中声明但还没有赋值的变量，是 undefined。相反，还没有在作用域中声明过的变量，是 undeclared。

## null 与 undefined 的区别

Undefined 和 Null 都是基本数据类型，分别都只有一个值：undefined 和 null。  
undefined 代表的含义是未定义，null 代表的含义是空对象。一般声明了但是还没有定义的时候就会返回 undefined；null 主要用于赋值给一些可能会返回对象的变量，作为初始化。   
undefined 在 JavaScript 中不是一个保留字，这意味着我们可以使用 undefined 作为一个变量名，当然，这样是非常危险的：它会影响我摩恩对 undefined 值的判断。  
获得安全的 undefined 值，比如 void 0。  
对这两种类型使用 typeof 进行判断的时候， Null 类型会返回「object」，这是一个历史遗留问题。使用双等号对两种类型的值进行比较时为 true，三等号时为 false。  

## 一些 JavaScript 的良好规范

> 使用 `eslint` 进行辅助代码规范十分便利。

- 函数作用域中的变量声明尽量放置于函数首部，且赋值对应类型的初始值
- 无需变动的字符串使用常量代替
- 使用「===」进行比较
- 不在内置对象（Array、Date 等）的原型上添加方法
- switch 语句必须带有 default 分支
- for 循环、if 语句，使用大括号，不省略

## JavaScript 原型、原型链

在 JavaScript 中，使用构造函数来新建对象，每个构造函数内部都有一个 prototype 属性值，这个属性值是一个对象，这个对象包含了可以由该构造函数的所有实例对象共享的属性和方法。使用构造函数新建一个对象后，在这个对象的内部将包含一个指针，这个指针指向构造函数的 prototype 属性对应的值，在 ES5 中这个指针被称为对象的原型。  
一般来说我们是不能够获取到这个值，但是现在浏览器都实现了 __proto__ 属性来让我们访问这个属性，但是最好不要使用这个属性，因为它并不是规范所规定。ES5 中增加了 Object.getPrototypeOf() 方法来获取对象原型。  
当访问一个对象的属性时，如果这个对象内部不存在，那么它就会去它的原型对象中查找这个属性，这个原型对象又会有自己的原型，如此查找下去，也就是原型链的概念。原型链的尽头一般来说都是 Object.prototype，所以这就是新建的对象为什么能够使用 toString() 等方法的原因。  
JavaScript 对象是通过引用来传递，创建的每个新对象实体中并没有一份属于自己的原型副本，所以修改原型时，与之相关的对象也会继承这一改变。

## JavaScript 获取原型的方法

- p.__proto__
- p.constructor.prototype
- Object.getPrototypeOf(p)

## JavaScript 中整数的安全范围

安全是指转化为二进制存储时不会出现精度丢失。  
安全整数范围为 -(2^53 - 1) 到 2^53 - 1 之间的整数，即 -9007199254740991 到 9007199254740991 包含边界值。  
因为 JavaScript 的数字存储使用了 IEEE 754 中规定的双精度浮点数数据类型，而这一数据类型能够安全存储 -(2^53 - 1) 到 2^53 - 1 之间的数值（包含边界值）。  

使用 Number 的静态属性获取最大、最小安全整数：
- Number.MIN_SAFE_INTEGER
- Number.MAX_SAFE_INTEGER
使用 Number.isSafeInteger() 方法判断传入的参数值是否是一个安全整数。  

## typeof NaN 的结果是什么？

``` JavaScript 
    typeof NaN; // number
    NaN != NaN  // true。
```

NaN 指「不是一个数字（not a number）」，是一个「警戒值（sentinel value，有特殊用途的常规值）」，用于指出数字类型中的错误情况，即「执行数学运算没有成功，这是失败后返回的结果」。  
NaN 是一个特殊值，它和自身不相等，是唯一一个非自反（自反，reflexive，即 x === x 不成立）的值。  

## Array 构造函数只有一个参数时的表现

Array 构造函数只有一个数字参数的时候，该参数会被作为数组的预设长度（length），而非只充当数组中的一个元素。这样创建的只是一个空数组，只不过他的 length 属性被设置成了指定的值。  
构造函数 `Array(...)` 不要求必须使用 new 关键字。未使用 new 关键字时，会自动补上。  

## 其他值到字符串的转换规则

规范的 9.8 节中定义了抽象操作 ToString ，它负责处理非字符串到字符串的强制类型转换。
1. Null 和 Undefined 类型 ，null 转换为 "null"，undefined 转换为 "undefined"，
2. Boolean 类型，true 转换为 "true"，false 转换为 "false"。
3. Number 类型的值直接转换，不过那些极小和极大的数字会使用指数形式。
4. Symbol 类型的值直接转换，但是只允许显式强制类型转换，使用隐式强制类型转换会产生错误。
5. 对普通对象来说，除非自行定义 toString() 方法，否则会调用 toString()（Object.prototype.toString()） 来返回内部属性 [[Class]] 的值，如"[object Object]"。如果对象有自己的 toString() 方法，字符串化时就会 调用该方法并使用其返回值。  

## 其他值到数字值的转换规则

有时我们需要将非数字值当作数字来使用，比如数学运算。为此 ES5 规范在 9.3 节定义了抽象操作 ToNumber。
1. Undefined 类型的值转换为 NaN。
2. Null 类型的值转换为 0。
3. Boolean 类型的值，true 转换为 1，false 转换为 0。
4. String 类型的值转换如同使用 Number() 函数进行转换，如果包含非数字值则转换为 NaN，空字符串为 0。
5. Symbol 类型的值不能转换为数字，会报错。
6. 对象（包括数组）会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型值，则再遵循以上规则将其强制转换为数字。为了将值转换为相应的基本类型值，抽象操作 ToPrimitive 会首先（通过内部操作 DefaultValue）检查该值是否有valueOf() 方法。如果有并且返回基本类型值，就使用该值进行强制类型转换。如果没有就使用 toString() 的返回值（如果存在）来进行强制类型转换。如果 valueOf() 和 toString() 均不返回基本类型值，会产生 TypeError 错误。  

## 其他值到布尔值的转换规则

ES5 规范 9.2 节中定义了抽象操作 ToBoolean，列举了布尔强制类型转换所有可能出现的结果。
以下这些是假值：
- undefined
- null
- false
- +0、-0 和 NaN
- ""
假值的布尔强制类型转换结果为 false。从逻辑上说，假值列表以外的都应该是真值。  

## {} 和 [] 的 valueOf 和 toString 的结果

{} 的 valueOf 结果为 {} ，toString 的结果为 "[object Object]"。
[] 的 valueOf 结果为 [] ，toString 的结果为 ""。

## 假值对象

浏览器在某些特定情况下，在常规 JavaScript 语法基础上自己创建了一些外来值，这些就是“假值对象”。假值对象看起来和普通对象并无二致（都有属性，等等），但将它们强制类型转换为布尔值时结果为 false 最常见的例子是 document.all，它是一个类数组对象，包含了页面上的所有元素，由 DOM（而不是 JavaScript 引擎）提供给 JavaScript 程序使用。  


## `~` 操作符的作用

`~` 返回 2 的补码，并且 `~` 会将数字转换为 32 位整数。  

## `+` 操作符什么时候用于字符串的拼接？

根据 ES5 规范 11.6.1 节，如果某个操作数是字符串或者能够通过以下步骤转换为字符串的话，+ 将进行拼接操作。如果其中一个操作数是对象（包括数组），则首先对其调用 ToPrimitive 抽象操作，该抽象操作再调用 [[DefaultValue]]，以数字作为上下文。如果不能转换为字符串，则会将其转换为数字类型来进行计算。
简单来说就是，如果 + 的其中一个操作数是字符串（或者通过以上步骤最终得到字符串），则执行字符串拼接，否则执行数字加法。
那么对于除了加法的运算符来说，只要其中一方是数字，那么另一方就会被转为数字。  

## 什么情况下会发生布尔值的隐式强制类型转换？

1. if (..) 语句中的条件判断表达式。
2.  for ( .. ; .. ; .. ) 语句中的条件判断表达式（第二个）。
3.  while (..) 和 do..while(..) 循环中的条件判断表达式。
4. ? : 中的条件判断表达式。
5. 逻辑运算符 ||（逻辑或）和 &&（逻辑与）左边的操作数（作为条件判断表达式）。

## `||` 和 `&&` 操作符的返回值

`||` 和 `&&`首先会对第一个操作数执行条件判断，如果其不是布尔值，则进行强制类型转换，然后执行条件判断。
对于 `||` 来说，如果第一个操作数的条件判断的结果为 true，就返回第一个操作数的值，如果为 false 就返回第二个操作数的值。
`&&` 则相反，如果第一个操作数条件判断结果为 true，就返回第二个操作数的值，如果为 false 就返回第一个操作数的值。
`||` 和 `&&` 返回它们其中一个操作数的值，而非条件判断结果。  

## Symbol 值的强制类型转换

ES6 允许从符号到字符串的显式强制类型转换，然而隐式强制类型转换会产生错误。
Symbol 值不能够被强制类型转换为数字（显式和隐式都会产生错误），但是可以被强制类型转换为布尔值（显式和隐式的结果都是 true）。  

## `==` 操作符的强制类型转换规则

1. 字符串和数字之间的相等比较，将字符串转换为数字之后再进行比较。
2. 其他类型和布尔类型之间的相等比较，先将布尔值转换为数字后，再应用其他规则进行比较。
3. null 和 undefined 之间的相等比较，结果为真。其他值和它们进行比较都返回假值。
4. 对象和非对象之间的相等比较，对象先调用 ToPrimitive 抽象操作后，再进行比较。
5. 如果一个操作值为 NaN ，则相等比较返回 false（ NaN 本身也不等于 NaN ）。
6. 如果两个操作值都是对象，则比较它们是不是指向同一个对象。如果两个操作数都指向同一个对象，则相等操作符返回 true，否则，返回 false。  

## 如何将字符串转化为数字，例如 `'12.3b'`？

1. 使用 Number() 方法，前提是所包含的字符串不包含不合法字符。
2. 使用 parseInt() 方法，parseInt() 函数可解析一个字符串，并返回一个整数。还可以设置要解析的数字的基数。当基数的值为 0，或没有设置该参数时，parseInt() 会根据 string 来判断数字的基数。
3. 使用 parseFloat() 方法，该函数解析一个字符串参数并返回一个浮点数。
4. 使用 + 操作符的隐式转换。  

## 如何将浮点数点左边的数，每三位添加一个逗号，如 12000000.11 转化为 12,000,000.11 ?

``` JavaScript
// 方法一
function format(number) {
  return number && number.replace(/(?!^)(?=(\d{3})+\.)/g, ",");
}
// 方法二
function format1(number) {
  return Intl.NumberFormat().format(number)
}
// 方法三
function format2(number) {
  return number.toLocaleString('en')
}
```

## JavaScript 创建对象的几种方式?

我们一般使用字面量的形式直接创建对象，但是这种创建方式对于创建大量相似对象的时候，会产生大量的重复代码。但 js 和一般的面向对象的语言不同，在 ES6 之前它没有类的概念。但是我们可以使用函数来进行模拟，从而产生出可复用的对象。

几种方式:
1. 工厂模式，工厂模式的主要工作原理是用函数来封装创建对象的细节，从而通过调用函数来达到复用的目的。但是它有一个很大的问题就是创建出来的对象无法和某个类型联系起来，它只是简单的封装了复用代码，而没有建立起对象和类型间的关系。

2. 构造函数模式。js 中每一个函数都可以作为构造函数，只要一个函数是通过 new 来调用的，那么我们就可以把它称为构造函数。执行构造函数首先会创建一个对象，然后将对象的原型指向构造函数的 prototype 属性，然后将执行上下文中的 this 指向这个对象，最后再执行整个函数，如果返回值不是对象，则返回新建的对象。因为 this 的值指向了新建的对象，因此我们可以使用 this 给对象赋值。构造函数模式相对于工厂模式的优点是，所创建的对象和构造函数建立起了联系，因此我们可以通过原型来识别对象的类型。但是构造函数存在一个缺点就是，造成了不必要的函数对象的创建，因为在 js 中函数也是一个对象，因此如果对象属性中如果包含函数的话，那么每次我们都会新建一个函数对象，浪费了不必要的内存空间，因为函数是所有的实例都可以通用的。

3. 原型模式，因为每一个函数都有一个 prototype 属性，这个属性是一个对象，它包含了通过构造函数创建的所有实例都能共享的属性和方法。因此我们可以使用原型对象来添加公用属性和方法，从而实现代码的复用。这种方式相对于构造函数模式来说，解决了函数对象的复用问题。但是这种模式也存在一些问题，一个是没有办法通过传入参数来初始化值，另一个是如果存在一个引用类型如 Array 这样的值，那么所有的实例将共享一个对象，一个实例对引用类型值的改变会影响所有的实例。

4. 组合使用构造函数模式和原型模式，这是创建自定义类型的最常见方式。因为构造函数模式和原型模式分开使用都存在一些问题，因此我们可以组合使用这两种模式，通过构造函数来初始化对象的属性，通过原型对象来实现函数方法的复用。这种方法很好的解决了两种模式单独使用时的缺点，但是有一点不足的就是，因为使用了两种不同的模式，所以对于代码的封装性不够好。

5. 动态原型模式，这一种模式将原型方法赋值的创建过程移动到了构造函数的内部，通过对属性是否存在的判断，可以实现仅在第一次调用函数时对原型对象赋值一次的效果。这一种方式很好地对上面的混合模式进行了封装。

6. 寄生构造函数模式，这一种模式和工厂模式的实现基本相同，我对这个模式的理解是，它主要是基于一个已有的类型，在实例化时对实例化的对象进行扩展。这样既不用修改原来的构造函数，也达到了扩展对象的目的。它的一个缺点和工厂模式一样，无法实现对象的识别。

## JavaScript 继承的实现方式?

几种方式：
1. 以原型链的方式来实现继承，但是这种实现方式存在的缺点是，在包含有引用类型的数据时，会被所有的实例对象所共享，容易造成修改的混乱。还有就是在创建子类型的时候不能向超类型传递参数。

2. 使用借用构造函数的方式，这种方式是通过在子类型的函数中调用超类型的构造函数来实现的，这一种方法解决了不能向超类型传递参数的缺点，但是它存在的一个问题就是无法实现函数方法的复用，并且超类型原型定义的方法子类型也没有办法访问到。

3. 组合继承，组合继承是将原型链和借用构造函数组合起来使用的一种方式。通过借用构造函数的方式来实现类型的属性的继承，通过将子类型的原型设置为超类型的实例来实现方法的继承。这种方式解决了上面的两种模式单独使用时的问题，但是由于我们是以超类型的实例来作为子类型的原型，所以调用了两次超类的构造函数，造成了子类型的原型中多了很多不必要的属性。

4. 原型式继承，原型式继承的主要思路就是基于已有的对象来创建新的对象，实现的原理是，向函数中传入一个对象，然后返回一个以这个对象为原型的对象。这种继承的思路主要不是为了实现创造一种新的类型，只是对某个对象实现一种简单继承，ES5 中定义的 Object.create() 方法就是原型式继承的实现。缺点与原型链方式相同。

5. 寄生式继承，寄生式继承的思路是创建一个用于封装继承过程的函数，通过传入一个对象，然后复制一个对象的副本，然后对象进行扩展，最后返回这个对象。这个扩展的过程就可以理解是一种继承。这种继承的优点就是对一个简单对象实现继承，如果这个对象不是我们的自定义类型时。缺点是没有办法实现函数的复用。

6. 寄生式组合继承，组合继承的缺点就是使用超类型的实例做为子类型的原型，导致添加了不必要的原型属性。寄生式组合继承的方式是使用超类型的原型的副本来作为子类型的原型，这样就避免了创建不必要的属性。

## 寄生式组合继承的实现?

``` JavaScript
function Person(name) {
  this.name = name;
}

Person.prototype.sayName = function() {
  console.log("My name is " + this.name + ".");
};

function Student(name, grade) {
  Person.call(this, name);
  this.grade = grade;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.sayMyGrade = function() {
  console.log("My grade is " + this.grade + ".");
};
```

## JavaScript 的作用域链?

作用域链的作用是保证对执行环境有权访问的所有变量和函数的有序访问，通过作用域链，我们可以访问到外层环境的变量和函数。
作用域链的本质上是一个指向变量对象的指针列表。变量对象是一个包含了执行环境中所有变量和函数的对象。作用域链的前端始终都是当前执行上下文的变量对象。全局执行上下文的变量对象（也就是全局对象）始终是作用域链的最后一个对象。  

## `this` 对象的理解

`this` 是执行上下文中的一个属性，它指向最后一次调用这个方法的对象。在实际开发中，`this` 的指向可以通过四种调用方式来判断。

1. **函数调用模式**。当一个函数不是一个对象的属性时，直接作为函数来调用时，this 指向全局对象。
2. **方法调用模式**。如果一个函数作为一个对象的方法来调用时，this 指向这个对象。
3. **apply 、 call 和 bind 调用模式**。这三个方法都可以显示的指定调用函数的 this 指向。其中 apply 方法接收两个参数：一个是 this 绑定的对象，一个是参数数组。call 方法接收的参数，第一个是 this 绑定的对象，后面的其余参数是传入函数执行的参数。也就是说，在使用 call() 方法时，传递给函数的参数必须逐个列举出来。bind 方法通过传入一个对象，返回一个 this 绑定了传入对象的新函数。这个函数的 this 指向除了使用 new 时会被改变，其他情况下都不会改变。
4. **构造器调用模式**。如果一个函数用 new 调用时，函数执行前会新创建一个对象，this 指向这个新创建的对象。

这四种方式，使用构造器调用模式的优先级最高，然后是 apply 、 call 和 bind 调用模式，然后是方法调用模式，然后是函数调用模式。  

## `eval`

`eval` 将字符串解析成 JavaScript 代码并运行。
尽量避免使用 `eval`: 安全隐患，性能差（解析语句，执行）。  

## DOM 和 BOM

DOM 指的是文档对象模型，它指的是把文档当做一个对象来对待，这个对象主要定义了处理网页内容的方法和接口。  
BOM 指的是浏览器对象模型，它指的是把浏览器当做一个对象来对待，主要定义了与浏览器进行交互的方法和接口。BOM 的核心是 window，而 window 具有双重角色，它既是通过 js 访问浏览器窗口的一个接口，又是一个全局对象。这意味着在网页中定义任何对象、变量和函数，都作为全局对象的一个属性或者方法存在。window 对象包含 location 对象、navigator 对象、screen 对象等子对象，并且 DOM 的最根本的对象 document 也是 BOM 的 window 对象的子对象。  

## 写一个通用的事件侦听器函数

``` JavaScript
const EventUtils = {
  // 视能力分别使用dom0||dom2||IE方式 来绑定事件
  // 添加事件
  addEvent: function(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },

  // 移除事件
  removeEvent: function(element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = null;
    }
  },

  // 获取事件目标
  getTarget: function(event) {
    return event.target || event.srcElement;
  },

  // 获取 event 对象的引用，取到事件的所有信息，确保随时能使用 event
  getEvent: function(event) {
    return event || window.event;
  },

  // 阻止事件（主要是事件冒泡，因为 IE 不支持事件捕获）
  stopPropagation: function(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },

  // 取消事件的默认行为
  preventDefault: function(event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  }
};
```

## 事件是什么？ IE 与 Firefox 的事件机制有什么区别？如何阻止冒泡？

- 事件是用户操作网页时发生的交互动作，比如 click、move， 除了用户触发的动作外，还可以是文档加载、窗口滚动、大小调整等。事件被封装成 event 对象，包含该事件发生时的所有相关信息（event 的属性）以及可以对事件进行的操作（event 的方法）。
- 事件处理机制。IE 支持事件冒泡，Firefox 支持事件冒泡和事件捕获。
- 阻止冒泡 `event.stopPropagation()`，IE 下 `event.cancelBubble = true;`。

## 三种事件模型

事件是用户操作网页时发生的交互动作或者网页本身的一些操作，现代浏览器一共有三种事件模型。  
第一种事件模型是最早的 DOM0 级模型，这种模型不会传播，所以没有事件流的概念，但是现在有的浏览器支持以冒泡的方式实
现，它可以在网页中直接定义监听函数，也可以通过 js 属性来指定监听函数。这种方式是所有浏览器都兼容的。  
第二种事件模型是 IE 事件模型，在该事件模型中，一次事件共有两个过程，事件处理阶段，和事件冒泡阶段。事件处理阶段会首先执行目标元素绑定的监听事件。然后是事件冒泡阶段，冒泡指的是事件从目标元素冒泡到 document，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。这种模型通过 attachEvent 来添加监听函数，可以添加多个监听函数，会按顺序依次执行。  
第三种是 DOM2 级事件模型，在该事件模型中，一次事件共有三个过程，第一个过程是事件捕获阶段。捕获指的是事件从 document 一直向下传播到目标元素，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。后面两个阶段和 IE 事件模型的两个阶段相同。这种事件模型，事件绑定的函数是 addEventListener，其中第三个参数可以指定事件是否在捕获阶段执行。

## 事件委托

事件委托，也可以称为事件代理。本质上是利用了浏览器事件冒泡机制。因为事件在冒泡的过程中会上传到父节点，并且父节点可以通过事件对象获取到目标节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理。  
使用事件代理，可以不必为每一个子元素都绑定监听事件，减少内存消耗。并且可以实现事件的动态绑定：新增子节点不必单独添加监听，都可以被父节点的监听函数处理。  

## ["1", "2", "3"].map(parseInt)

parseInt() 函数能解析一个字符串，并返回一个整数，需要两个参数 val 和 radix，其中 radix 表示要解析的数字的基数。（该值介于 2 ~ 36 之间，并且字符串中的数字不能大于 radix 才能正确返回数字结果值）。  
此处 map 传了 3 个参数 (element, index, array)，默认第三个参数被忽略掉，因此三次传入的参数分为 "1-0", "2-1", "3-2"。因为字符串的值不能大于基数，因此后面两次调用均失败，返回 NaN ，第一次基数为 0 ，按十进制解析返回 1。

## 什么是闭包，为什么使用它？

闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，创建的函数可以访问到当前函数的局部变量。  
闭包有两个常用的用途。  
- 闭包使我们在函数外部能够访问到函数内部的变量。通过使用闭包，我们可以通过在外部调用闭包函数，从而在外部访问到函数内部的变量，可以使用这种方法来创建私有变量。  
- 闭包使已经运行结束的函数上下文中的变量对象继续留在内存中，因为闭包函数保留了这个变量对象的引用，所以这个变量对象不会被回收。  
其实闭包的本质就是作用域链的一个特殊的应用，只要了解了作用域链的创建过程，就能够理解闭包的实现原理。  

## JavaScript 严格模式

`use strict;` 是一种 ECMAScript 5 添加的（严格）运行模式，这种模式使得 Javascript 在更严格的条件下运行。  
建立严格模式目的：
- 消除 Javascript 语法的一些不合理、不严谨之处，减少一些怪异行为;
- 消除代码运行的一些不安全之处，保证代码运行的安全；
- 提高编译器效率，增加运行速度；
- 为未来新版本的 Javascript 做好铺垫。
特点：
- 禁止使用 with 语句。
- 禁止 this 关键字指向全局对象。
- 对象不能有重名的属性。

## JavaScript `hasOwnProperty` 函数

所有继承了 Object 的对象都会继承到 hasOwnProperty 方法。这个方法可以用来检测一个对象是否含有特定的自身属性，和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。

## JSON

JSON 是一种数据交换格式，基于文本，优于轻量，用于交换数据。  
JSON 可以表示数字、布尔值、字符串、null、数组（值的有序序列），以及由这些值（或数组、对象）所组成的对象（字符串与值的映射）。  
JSON 使用 JavaScript 语法，但是 JSON 格式仅仅是一个文本。文本可以被任何编程语言读取及作为数据格式传递。  

## JavaScript 延迟加载

js 的加载、解析和执行会阻塞页面的渲染过程，因此我们希望 js 脚本能够尽可能的延迟加载，提高页面的渲染速度。
几种方式是：  
第一种方式是我们一般采用的是将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最后来加载执行。  
第二种方式是给 js 脚本添加 `defer` 属性，这个属性会让脚本的加载与文档的解析同步解析，然后在文档解析完成后再执行这个脚本文件，这样的话就能使页面的渲染不被阻塞。多个设置了 defer 属性的脚本按规范来说最后是顺序执行的，但是在一些浏览器中可能不是这样。  
第三种方式是给 js 脚本添加 `async` 属性，这个属性会使脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 js 脚本，这个时候如果文档没有解析完成的话同样会阻塞。多个 async 属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次执行。  
第四种方式是动态创建 DOM 标签的方式，我们可以对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本。  

## Ajax

2005年，Ajax 方法（Asynchronous JavaScript and XML）正式诞生，Jesse James Garrett 发明了这个词汇。它开始流行的标志是，2月份发布的 Google Maps 项目大量采用该方法。它几乎成了新一代网站的标准做法，促成了 Web 2.0时代的来临。  
通过 JavaScript 的 异步通信，从服务器获取 XML 文档从中提取数据，再更新当前网页的对应部分，而不用刷新整个网页。  
一般步骤：
- 创建 XMLHttpRequest 对象，也就是创建一个异步调用对象
- 创建一个新的 HTTP 请求，并指定该 HTTP 请求的方法、URL 及验证信息
- 设置响应 HTTP 请求状态变化的函数
- 发送 HTTP 请求
- 获取异步调用返回的数据
- 使用 JavaScript 和 DOM 实现局部刷新

通俗来说：  
首先是创建一个 XMLHttpRequest 对象。  
然后在这个对象上使用 open 方法创建一个 http 请求，open 方法所需要的参数是请求的方法、请求的地址、是否异步和用户的认证信息。  
在发起请求前，我们可以为这个对象添加一些信息和监听函数。比如说我们可以通过 setRequestHeader 方法来为请求添加头信息。我们还可以为这个对象添加一个状态监听函数。XMLHttpRequest 对象一共有 5 个状态，当它的状态变化时会触发onreadystatechange 事件，我们可以通过设置监听函数，来处理请求成功后的结果。当对象的 readyState 变为 4 的时候，代表服务器返回的数据接收完成，这个时候我们可以通过判断请求的状态，如果状态是 2xx 或者 304 的话则代表返回正常。这个时候我们就可以通过 response 中的数据来对页面进行更新了。  
当对象的属性和监听函数设置完成后，最后我们调用 send 方法来向服务器发起请求，可以传入参数作为发送的数据体。  

## 浏览器缓存机制

浏览器的缓存机制指的是通过在一段时间内保留已接收到的 web 资源的一个副本，如果在资源的有效时间内，发起了对这个资源的再一次请求，那么浏览器会直接使用缓存的副本，而不是向服务器发起请求。使用 web 缓存可以有效地提高页面的打开速度，减少不必要的网络带宽的消耗。  

web 资源的缓存策略一般由服务器来指定，可以分为两种，分别是 **强缓存策略** 和 **协商缓存策略**。  
  
### 强缓存策略
使用强缓存策略时，如果缓存资源有效，则直接使用缓存资源，不必再向服务器发起请求。强缓存策略可以通过两种方式来设置，分别是 HTTP 头信息中的 Expires 属性和 Cache-Control 属性。  

#### Expires 属性
服务器通过在响应头中添加 **Expires 属性**，来指定资源的过期时间。在过期时间以内，该资源可以被缓存使用，不必再向服务器发送请求。这个时间是一个绝对时间，它是服务器的时间，因此可能存在这样的问题，就是客户端的时间和服务器端的时间不一致，或者用户可以对客户端时间进行修改的情况，这样就可能会影响缓存命中的结果。  

#### Cache-Control 属性
Expires 是 HTTP 1.0 中的方式，因为它的一些缺点，在 HTTP 1.1 中提出了一个新的头部属性就是 **Cache-Control 属性**，它提供了对资源的缓存的更精确的控制。它有很多不同的值，常用的比如我们可以通过设置 max-age 来指定资源能够被缓存的时间的大小，这是一个相对的时间，它会根据这个时间的大小和资源第一次请求时的时间来计算出资源过期的时间，因此相对于 Expires 来说，这种方式更加有效一些。常用的还有比如 private ，用来规定资源只能被客户端缓存，不能够代理服务器所缓存。还有如 no-store ，用来指定资源不能够被缓存，no-cache 代表该资源能够被缓存，但是立即失效，每次都需要向服务器发起请求。  
一般来说只需要设置其中一种方式就可以实现强缓存策略，当两种方式一起使用时，Cache-Control 的优先级要高于 Expires 。  

### 协商缓存策略
使用协商缓存策略时，会先向服务器发送一个请求，如果资源没有发生修改，则返回一个 304 状态，让浏览器使用本地的缓存副本。如果资源发生了修改，则返回修改后的资源。协商缓存也可以通过两种方式来设置，分别是 http 头信息中的 **Etag** 和 **Last-Modified** 属性。  

#### Last-Modified
服务器通过在响应头中添加 Last-Modified 属性来指出资源最后一次修改的时间，当浏览器下一次发起请求时，会在请求头中添加一个 If-Modified-Since 的属性，属性值为上一次资源返回时的 Last-Modified 的值。当请求发送到服务器后服务器会通过这个属性来和资源的最后一次的修改时间来进行比较，以此来判断资源是否做了修改。如果资源没有修改，那么返回 304 状态，让客户端使用本地的缓存。如果资源已经被修改了，则返回修改后的资源。使用这种方法有一个缺点，就是 **Last-Modified 标注的最后修改时间只能精确到秒级**，如果某些文件在1秒钟以内，被修改多次的话，那么文件已将改变了但是 Last-Modified 却没有改变，这样会造成缓存命中的不准确。  

#### Etag
因为 Last-Modified 的这种可能发生的不准确性，http 中提供了另外一种方式，那就是 **Etag** 属性。服务器在返回资源的时候，在头信息中添加了 Etag 属性，这个属性是资源生成的唯一标识符，当资源发生改变的时候，这个值也会发生改变。在下一次资源请求时，浏览器会在请求头中添加一个 If-None-Match 属性，这个属性的值就是上次返回的资源的 Etag 的值。服务接收到请求后会根据这个值来和资源当前的 Etag 的值来进行比较，以此来判断资源是否发生改变，是否需要返回资源。通过这种方式，比 Last-Modified 的方式更加精确。

当 Last-Modified 和 Etag 属性同时出现的时候，Etag 的优先级更高。使用协商缓存的时候，服务器需要考虑负载平衡的问题，因此多个服务器上资源的 Last-Modified 应该保持一致，因为每个服务器上 Etag 的值都不一样，因此在考虑负载平衡时，最好不要设置 Etag 属性。

### 总结
强缓存策略和协商缓存策略在缓存命中时都会直接使用本地的缓存副本，区别只在于协商缓存会向服务器发送一次请求。它们缓存不命中时，都会向服务器发送请求来获取资源。在实际的缓存机制中，强缓存策略和协商缓存策略是一起合作使用的。浏览器首先会根据请求的信息判断，强缓存是否命中，如果命中则直接使用资源。如果不命中则根据头信息向服务器发起请求，使用协商缓存，如果协商缓存命中的话，则服务器不返回资源，浏览器直接使用本地资源的副本，如果协商缓存不命中，则浏览器返回最新的资源给浏览器。  

## 浏览器同源政策

一个域下的 js 脚本在未经允许的情况下，不能够访问另一个域的内容。这里的同源的指的是两个域的协议、域名、端口号必须相同，否则则不属于同一个域。  
同源政策主要限制：
- 当前域下的 js 脚本不能够访问其他域下的 cookie、localStorage 和 indexDB。
- 当前域下的 js 脚本不能够操作访问操作其他域下的 DOM。
- 是当前域下 ajax 无法发送跨域请求。
同源政策的目的主要是为了保证用户的信息安全，它只是对 js 脚本的一种限制，并不是对浏览器的限制，对于一般的 img 请求都不会有跨域的限制。  

## 跨域问题的解决

解决跨域的方法我们可以根据我们想要实现的目的来划分。  

只是想要实现主域名下的不同子域名的跨域操作，我们可以使用设置 document.domain 来解决。  
- 将 document.domain 设置为主域名，来实现相同子域名的跨域操作，这个时候主域名下的 cookie 就能够被子域名所访问。同时如果文档中含有主域名相同，子域名不同的 iframe 的话，我们也可以对这个 iframe 进行操作。  

想要解决不同跨域窗口间的通信问题，比如说一个页面想要和页面的中的不同源的 iframe 进行通信的问题，我们可以使用 location.hash 或者 window.name 或者 postMessage 来解决。  
- 使用 location.hash 的方法，我们可以在主页面动态的修改 iframe 窗口的 hash 值，然后在 iframe 窗口里实现监听函数来实现这样一个单向的通信。因为在 iframe 是没有办法访问到不同源的父级窗口的，所以我们不能直接修改父级窗口的 hash 值来实现通信，我们可以在 iframe 中再加入一个 iframe ，这个 iframe 的内容是和父级页面同源的，所以我们可以 window.parent.parent 来修改最顶级页面的 src，以此来实现双向通信。
- 使用 window.name 的方法，主要是基于同一个窗口中设置了 window.name 后不同源的页面也可以访问，所以不同源的子页面可以首先在 window.name 中写入数据，然后跳转到一个和父级同源的页面。这个时候级页面就可以访问同源的子页面中 window.name 中的数据了，这种方式的好处是可以传输的数据量大。
- 使用 postMessage 来解决的方法，这是一个 h5 中新增的一个 api。通过它我们可以实现多窗口间的信息传递，通过获取到指定窗口的引用，然后调用 postMessage 来发送信息，在窗口中我们通过对 message 信息的监听来接收信息，以此来实现不同源间的信息交换。

如果是像解决 ajax 无法提交跨域请求的问题，我们可以使用 **jsonp**、**CORS**、**websocket** 协议、**服务器代理**来解决问题。
- 使用 jsonp 来实现跨域请求，它的主要原理是通过动态构建 script  标签来实现跨域请求，因为浏览器对 script 标签的引入没有跨域的访问限制 。通过在请求的 url 后指定一个回调函数，然后服务器在返回数据的时候，构建一个 json 数据的包装，这个包装就是回调函数，然后返回给前端，前端接收到数据后，因为请求的是脚本文件，所以会直接执行，这样我们先前定义好的回调函数就可以被调用，从而实现了跨域请求的处理。这种方式**只能用于 GET 请求**。
- 使用 CORS 的方式，CORS 是一个 W3C 标准，全称是"跨域资源共享"。CORS 需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，因此我们只需要在服务器端配置就行。
    浏览器将 CORS 请求分成两类：**简单请求**和**非简单请求**。
    对于简单请求，浏览器直接发出 CORS 请求。具体来说，就是会在头信息之中，增加一个 Origin 字段。Origin 字段用来说明本次请求来自哪个源。服务器根据这个值，决定是否同意这次请求。对于如果 Origin 指定的源，不在许可范围内，服务器会返回一个正常的 HTTP 回应。浏览器发现，这个回应的头信息没有包含 Access-Control-Allow-Origin 字段，就知道出错了，从而抛出一个错误，ajax 不会收到响应信息。如果成功的话会包含一些以 Access-Control- 开头的字段。
    非简单请求，浏览器会先发出一次预检请求，来判断该域名是否在服务器的白名单中，如果收到肯定回复后才会发起请求。
- 使用 websocket 协议，这个协议没有同源限制。
- 使用服务器来代理跨域的访问请求，就是有跨域的请求操作时发送请求给后端，让后端代为请求，然后最后将获取的结果发返回。

## HTTP cookie

MDN [HTTP cookies](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)  

cookie 是服务器提供的一种用于维护会话状态信息的数据，通过服务器发送到浏览器，浏览器保存在本地，当下一次有同源的请求时，将保存的 cookie 值添加到请求头部，发送给服务端。可以用来实现记录用户登录状态等功能。cookie 一般可以存储 4k 大小的数据，并且只能够被同源的网页所共享访问。  
服务器端可以使用 Set-Cookie 的响应头部来配置 cookie 信息。一条 cookie 包括 expires、domain、path、secure、HttpOnly 等属性。其中 expires 指定了 cookie 失效的时间，domain 是域名、path 是路径，domain 和 path 一起限制了 cookie 能够被哪些 url 访问。secure 规定了 cookie 只能在确保安全的情况下传输，HttpOnly 规定了这个 cookie 只能被服务器访问，不能使用 js 脚本访问。  
在发生 xhr 的跨域请求的时候，即使是同源下的 cookie，也不会被自动添加到请求头部，除非显示地规定。  

## JavaScript 的几种模块规范？

js 中现在比较成熟的有四种模块加载方案。  
1. **CommonJS 方案**，它通过 require 来引入模块，通过 module.exports 定义模块的输出接口。这种模块加载方案是服务器端的解决方案，它是以同步的方式来引入模块的，因为在服务端文件都存储在本地磁盘，所以读取非常快，所以以同步的方式加载没有问题。但如果是在浏览器端，由于模块的加载是使用网络请求，因此使用异步加载的方式更加合适。
2. **AMD 方案**，这种方案采用异步加载的方式来加载模块，模块的加载不影响后面语句的执行，所有依赖这个模块的语句都定义在一个回调函数里，等到加载完成后再执行回调函数。require.js 实现了 AMD 规范。
3. **CMD 方案**，这种方案和 AMD 方案都是为了解决异步模块加载的问题，sea.js 实现了 CMD 规范。它和 require.js 的区别在于模块定义时对依赖的处理不同和对依赖模块的执行时机的处理不同。
4. ES6 提出的方案，**使用 import 和 export 的形式来导入导出模块**。这种方案和上面三种方案都不同。

## AMD 和 CMD 规范的区别？

- 在模块定义时对依赖的处理不同。AMD 推崇依赖前置，在定义模块的时候就要声明其依赖的模块。而 CMD 推崇 就近依赖，只有在用到某个模块的时候再去 require。
- 对依赖模块的执行时机处理不同。首先 AMD 和 CMD 对于模块的加载方式都是异步加载，不过它们的区别在于 模块的执行时机，AMD 在依赖模块加载完成后就直接执行依赖模块，依赖模块的执行顺序和我们书写的顺序不一定一致。而 CMD 在依赖模块加载完成后并不执行，只是下载而已，等到所有的依赖模块都加载好后，进入回调函数逻辑，遇到 require 语句 的时候才执行对应的模块，这样模块的执行顺序就和我们书写的顺序保持一致了。

## ES 6 的 Class

ES6 新添加的 class 只是为了补充 js 中缺少的一些面向对象语言的特性，但本质上来说它只是一种语法糖，不是一个新的东西，其背后还是原型继承的思想。通过加入 class 可以有利于我们更好的组织代码。  
在 class 中添加的方法，其实是添加在类的原型上的。  

## DOM 操作

``` JavaScript
// 创建
createDocumentFragment(node);
createElement(node);
createTextNode(text);

// 添加、移除、替换、插入
appendChild(node)
removeChild(node)
replaceChild(new, old)
insertBefore(new, old)

// 查找
getElementById();
getElementsByName();
getElementsByTagName();
getElementsByClassName();
querySelector();
querySelectorAll();

// 属性操作
getAttribute(key);
setAttribute(key, value);
hasAttribute(key);
removeAttribute(key);

```

## innerHTML 与 outerHTML 区别

``` html
对于这样一个 HTML 元素：<div>content<br/></div>。

innerHTML：内部 HTML，content<br/>；
outerHTML：外部 HTML，<div>content<br/></div>；  
innerText：内部文本，content ；  
outerText：内部文本，content ；  
```

## JavaScript 类数组对象

一个拥有 length 属性和若干索引属性的对象就可以被称为类数组对象，类数组对象和数组类似，但是不能调用数组的方法。  
常见的类数组对象有 arguments 和 DOM 方法的返回结果，还有函数也可以被看作是类数组对象，因为它含有 length 属性值，代表可接收的参数个数。  

常见的类数组转换为数组的方法有这样几种：
- 通过 call 调用数组的 slice 方法来实现转换 Array.prototype.slice.call(arrayLike);
- 通过 call 调用数组的 splice 方法来实现转换 Array.prototype.splice.call(arrayLike, 0);
- 通过 apply 调用数组的 concat 方法来实现转换 Array.prototype.concat.apply([], arrayLike);
- 通过 Array.from 方法来实现转换 Array.from(arrayLike);

## JavaScript 数组和对象的原生方法

- 数组和字符串的转换方法：toString()、toLocalString()、join() 其中 join() 方法可以指定转换为字符串时的分隔符。  
- 数组尾部操作的方法 pop() 和 push()，push 方法可以传入多个参数。  
- 数组首部操作的方法 shift() 和 unshift() 重排序的方法 reverse() 和 sort()，sort() 方法可以传入一个函数来进行比较，传入前后两个值，如果返回值为正数，则交换两个参数的位置。  
- 数组连接的方法 concat() ，返回的是拼接好的数组，不影响原数组。  
- 数组截取办法 slice()，用于截取数组中的一部分返回，不影响原数组。  
- 数组插入方法 splice()  ，影响原数组。
- 查找特定项的索引的方法，indexOf() 和 lastIndexOf()  。
- 迭代方法 every()、some()、filter()、map() 和 forEach()  。
- 数组归并方法 reduce() 和 reduceRight()  。

## JavaScript 尾后逗号

尾后逗号 （有时叫做“终止逗号”）在向 JavaScript 代码添加元素、参数、属性时十分有用。如果你想要添加新的属性，并且上一行已经使用了尾后逗号，你可以仅仅添加新的一行，而不需要修改上一行。这使得版本控制的代码比较（diff）更加清晰，代码编辑过程中遇到的麻烦更少。

## JavaScript 中的作用域和变量声明提升

变量提升的表现是，无论我们在函数中何处位置声明的变量，好像都被提升到了函数的首部，我们可以在变量声明前访问到而不会报错。  
造成变量声明提升的本质原因是 js 引擎在代码执行前有一个解析的过程，创建了执行上下文，初始化了一些代码执行时需要用到的对象。当我们访问一个变量时，我们会到当前执行上下文中的作用域链中去查找，而作用域链的首端指向的是当前执行上下文的变量对象，这个变量对象是执行上下文的一个属性，它包含了函数的形参、所有的函数和变量声明，这个对象的是在代码解析的时候创建的。这就是会出现变量声明提升的根本原因。  

## 会造成内存泄露的操作

- 由于使用未声明的变量，而意外的创建了一个全局变量，而使这个变量一直留在内存中无法被回收。
- 设置了 setInterval 定时器，而忘记取消它，如果循环函数有对外部变量的引用的话，那么这个变量会被一直留在内存中，而无法被回收。
- 获取一个 DOM 元素的引用，而后面这个元素被删除，由于我们一直保留了对这个元素的引用，所以它也无法被回收。
- 不合理的使用闭包，从而导致某些变量一直被留在内存当中。

## 实现一个页面操作不会整页刷新的网站，并且能在浏览器前进、后退时正确响应。给出你的技术实现方案？

通过使用 pushState + ajax 实现浏览器无刷新前进后退，当一次 ajax 调用成功后我们将一条 state 记录加入到 history 对象中。一条 state 记录包含了 url、title 和 content 属性，在 popstate 事件中可以获取到这个 state 对象，我们可以使用 content 来传递数据。最后我们通过对 window.onpopstate 事件监听来响应浏览器的前进后退操作。  
使用 pushState 来实现有两个问题，一个是打开首页时没有记录，我们可以使用 replaceState 来将首页的记录替换，另一个问题是当一个页面刷新的时候，仍然会向服务器端请求数据，因此如果请求的 url 需要后端的配合将其重定向到一个页面。  

## 如何判断当前脚本运行在浏览器还是 node 环境中？

``` JavaScript
// 判断 Global 对象
this === window ? ''browser' : 'node';
```

## 移动端的点击事件的有延迟，时间是多久，为什么会有？ 怎么解决这个延时？

移动端点击有 300ms 的延迟是因为移动端会有双击缩放的这个操作，因此浏览器在 click 之后要等待 300ms，看用户有没有下一次点击，来判断这次操作是不是双击。  

解决办法：
1. 通过 meta 标签禁用网页的缩放。
2. 通过 meta 标签将网页的 viewport 设置为 ideal viewport。
3. 调用一些 js 库，比如 FastClick。

click 延时问题还可能引起**点击穿透**的问题，就是如果我们在一个元素上注册了 touchStart 的监听事件，这个事件会将这个元素隐藏掉，我们发现当这个元素隐藏后，触发了这个元素下的一个元素的点击事件，这就是点击穿透。  

## Polyfill

Polyfill 指的是用于实现浏览器并不支持的原生 API 的代码。  
比如说 querySelectorAll 是很多现代浏览器都支持的原生 Web API，但是有些古老的浏览器并不支持，那么假设有人写了一段代码来实现这个功能使这些浏览器也支持了这个功能，那么这就可以成为一个 Polyfill。  
shim 是一个库，有自己的 API，而不是单纯实现原生不支持的 API。  

## 节流与防抖

``` JavaScript
// 函数防抖： 在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。
// 函数节流： 规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。

// 函数防抖的实现
function debounce(fn, wait) {
  var timer = null;

  return function() {
    var context = this,
      args = arguments;

    // 如果此时存在定时器的话，则取消之前的定时器重新记时
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    // 设置定时器，使事件间隔指定事件后执行
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}

// 函数节流的实现;
function throttle(fn, delay) {
  var preTime = Date.now();

  return function() {
    var context = this,
      args = arguments,
      nowTime = Date.now();

    // 如果两次时间间隔超过了指定时间，则执行函数。
    if (nowTime - preTime >= delay) {
      preTime = Date.now();
      return fn.apply(context, args);
    }
  };
}
```

## Unicode 和 UTF-8 之间的关系

Unicode 是一种字符集合，可容纳 100 多万个字符。每个字符对应一个不同的 Unicode 编码。它之规定了符号的二进制代码，没有规定这个二进制代码在计算机中如何编码传输。  
UTF-8 是一种对 Unicode 的编码方式，它是一种变长的编码方式，可以用 1-4 个字节表示一个字符。  

## JavaScript 事件循环

事件队列是一个存储着待执行任务的队列，其中的任务严格按照时间先后顺序执行，在队列头部的任务会率先执行，队尾的任务最后执行。事件队列每次仅执行一个任务，该任务执行完毕之后，在执行下一个。执行栈是一个类似于函数调用栈的运行容器，当执行栈为空时，JavaScript 引擎便检查事件队列，如果队列不为空，就将队列中的第一个任务入栈运行。  
因为 JavaScript 是单线程运行的，在代码执行的时候，通过将不同函数的执行上下文压入执行栈中来保证代码的有序执行。在执行同步代码的时候，如果遇到了异步事件，JavaScript 引擎并不会一直等待其返回结果，而是会将这个事件挂起，继续执行执行栈中的其他任务。当异步事件执行完毕后，再将异步事件对应的回调加入到与当前执行栈中不同的另一个任务队列中等待执行。任务队列可以分为宏任务队列和微任务队列，当前执行栈中的事件执行完毕后，JavaScript 引擎首先会判断微任务队列中是否有任务可以执行，如果有就将微任务队首的事件压入栈中执行。当微任务队列中的任务都执行完成后再去判断宏任务队列中的任务。  
微任务包括了 promise 的回调、node 中的 process.nextTick 、对 Dom 变化监听的 MutationObserver。  
宏任务包括了 script 脚本的执行、setTimeout ，setInterval ，setImmediate 一类的定时事件，还有如 I/O 操作、UI 渲
染等。  

## JavaScript 深、浅拷贝

浅拷贝指的是将一个对象的属性值复制到另一个对象，如果有的属性的值为引用类型的话，那么会将这个引用的地址复制给对象，因此两个对象会有同一个引用类型的引用。浅拷贝可以使用  Object.assign 和展开运算符来实现。  
深拷贝相对浅拷贝而言，如果遇到属性值为引用类型的时候，它新建一个引用类型并将对应的值复制给它，因此对象获得的一个新的引用类型而不是一个原有类型的引用。  

## 手写 call、apply 及 bind 函数

``` JavaScript
// call函数实现
Function.prototype.myCall = function(context) {
  // 判断调用对象
  if (typeof this !== "function") {
    console.error("type error");
  }
  // 获取参数
  let args = [...arguments].slice(1), result = null;
  // 判断 context 是否传入，如果未传入则设置为 window
  context = context || window;
  // 将调用函数设为对象的方法
  context.fn = this;
  // 调用函数
  result = context.fn(...args);
  // 将属性删除
  delete context.fn;

  return result;
};

// apply 函数实现
Function.prototype.myApply = function(context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let result = null;
  // 判断 context 是否存在，如果未传入则为 window
  context = context || window;
  // 将函数设为对象的方法
  context.fn = this;
  // 调用方法
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  // 将属性删除
  delete context.fn;
  return result;
};

// bind 函数实现
Function.prototype.myBind = function(context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  // 获取参数
  var args = [...arguments].slice(1),
    fn = this;
  return function Fn() {
    // 根据调用方式，传入不同绑定值
    return fn.apply(
      this instanceof Fn ? this : context,
      args.concat(...arguments)
    );
  };
};
```
call 函数的实现步骤：
1. 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
2. 判断传入上下文对象是否存在，如果不存在，则设置为 window 。
3. 处理传入的参数，截取第一个参数后的所有参数。
4. 将函数作为上下文对象的一个属性。
5. 使用上下文对象来调用这个方法，并保存返回结果。
6. 删除刚才新增的属性。
7. 返回结果。

apply 函数的实现步骤：
1. 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
2. 判断传入上下文对象是否存在，如果不存在，则设置为 window 。
3. 将函数作为上下文对象的一个属性。
4. 判断参数值是否传入
5. 使用上下文对象来调用这个方法，并保存返回结果。
6. 删除刚才新增的属性
7. 返回结果

bind 函数的实现步骤：
1. 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
2. 保存当前函数的引用，获取其余传入参数值。
3. 创建一个函数返回
4. 函数内部使用 apply 来绑定函数调用，需要判断函数作为构造函数的情况，这个时候需要传入当前函数的 this 给 apply 调用，其余情况都传入指定的上下文对象。

## 函数柯里化

函数柯里化是指将使用多个参数的函数转换成一系列使用一个参数的函数的技术。

``` JavaScript
function curry(fn, args) {
  // 获取函数需要的参数长度
  let length = fn.length;

  args = args || [];

  return function() {
    let subArgs = args.slice(0);

    // 拼接得到现有的所有参数
    for (let i = 0; i < arguments.length; i++) {
      subArgs.push(arguments[i]);
    }

    // 判断参数的长度是否已经满足函数所需参数的长度
    if (subArgs.length >= length) {
      // 如果满足，执行函数
      return fn.apply(this, subArgs);
    } else {
      // 如果不满足，递归返回科里化的函数，等待参数的传入
      return curry.call(this, fn, subArgs);
    }
  };
}

// es6 实现
function curry(fn, ...args) {
  return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);
}
```

## XSS 攻击

XSS 攻击指的是跨站脚本攻击，是一种代码注入攻击。攻击者通过在网站注入恶意脚本，使之在用户的浏览器上运行，从而盗取用户的信息如 cookie 等。  
XSS 的本质是因为网站没有对恶意代码进行过滤，与正常的代码混合在一起了，浏览器没有办法分辨哪些脚本是可信的，从而导致了恶意代码的执行。  
XSS 一般分为存储型、反射型和 DOM 型。  
- 存储型指的是恶意代码提交到了网站的数据库中，当用户请求数据的时候，服务器将其拼接为 HTML 后返回给了用户，从而导致了恶意代码的执行。
- 反射型指的是攻击者构建了特殊的 URL，当服务器接收到请求后，从 URL 中获取数据，拼接到 HTML 后返回，从而导致了恶意代码的执行。
- DOM 型指的是攻击者构建了特殊的 URL，用户打开网站后，js 脚本从 URL 中获取数据，从而导致了恶意代码的执行。

## CSP

CSP 指的是内容安全策略，它的本质是建立一个白名单，告诉浏览器哪些外部资源可以加载和执行。我们只需要配置规则，如何拦截由浏览器自己来实现。  
通常有两种方式来开启 CSP，一种是设置 HTTP 首部中的 Content-Security-Policy，一种是设置 meta 标签的方式 ` <meta http-equiv="Content-Security-Policy">`。

## CSRF

CSRF 攻击指的是跨站请求伪造攻击，攻击者诱导用户进入一个第三方网站，然后该网站向被攻击网站发送跨站请求。如果用户在被攻击网站中保存了登录状态，那么攻击者就可以利用这个登录状态，绕过后台的用户验证，冒充用户向服务器执行一些操作。  
CSRF 攻击的本质是利用了 cookie 会在同源请求中携带发送给服务器的特点，以此来实现用户的冒充。  
一般的 CSRF 攻击类型有三种：
- GET 类型的 CSRF 攻击，比如在网站中的一个 img 标签里构建一个请求，当用户打开这个网站的时候就会自动发起提交。  
- POST 类型的 CSRF 攻击，比如说构建一个表单，然后隐藏它，当用户进入页面时，自动提交这个表单。  
- 链接类型的 CSRF 攻击，比如说在 a 标签的 href 属性里构建一个请求，然后诱导用户去点击。  

CSRF 可以用下面几种方法来防护：
1. 同源检测。服务器根据 http 请求头中 origin 或者 referer 信息来判断请求是否为允许访问的站点，从而对请求进行过滤。当 origin 或者 referer 信息都不存在的时候，直接阻止。这种方式的缺点是有些情况下 referer 可以被伪造。还有就是我们这种方法同时把搜索引擎的链接也给屏蔽了，所以一般网站会允许搜索引擎的页面请求，但是相应的页面请求这种请求方式也可能被攻击者给利用。  
2. 使用 CSRF Token 来进行验证，服务器向用户返回一个随机数 Token ，当网站再次发起请求时，在请求参数中加入服务器端返回的 token ，然后服务器对这个 token 进行验证。这种方法解决了使用 cookie 单一验证方式时，可能会被冒用的问题，但是这种方法存在一个缺点就是，我们需要给网站中的所有请求都添加上这个 token，操作比较繁琐。还有一个问题是一般不会只有一台网站服务器，如果我们的请求经过负载平衡转移到了其他的服务器，但是这个服务器的 session 中没有保留这个 token 的话，就没有办法验证了。这种情况我们可以通过改变 token 的构建方式来解决。  
3. 使用双重 Cookie 验证的办法，服务器在用户访问网站页面时，向请求域名注入一个Cookie，内容为随机字符串，然后当用户再次向服务器发送请求的时候，从 cookie 中取出这个字符串，添加到 URL 参数中，然后服务器通过对 cookie 中的数据和参数中的数据进行比较，来进行验证。使用这种方式是利用了攻击者只能利用 cookie，但是不能访问获取 cookie 的特点。并且这种方法比 CSRF Token 的方法更加方便，并且不涉及到分布式访问的问题。这种方法的缺点是如果网站存在 XSS 漏洞的，那么这种方式会失效。同时这种方式不能做到子域名的隔离。  
4. 在设置 cookie 属性的时候设置 Samesite ，限制 cookie 不能作为被第三方使用，从而可以避免被攻击者利用。Samesite 一共有两种模式，一种是严格模式，在严格模式下 cookie 在任何情况下都不可能作为第三方 Cookie 使用，在宽松模式下，cookie 可以被请求是 GET 请求，且会发生页面跳转的请求所使用。  

## Samesite Cookie

Samesite Cookie 表示同站 cookie，避免 cookie 被第三方所利用。  
将 Samesite 设为 strict ，这种称为严格模式，表示这个 cookie 在任何情况下都不可能作为第三方 cookie。  
将 Samesite 设为 Lax ，这种模式称为宽松模式，如果这个请求是个 GET 请求，并且这个请求改变了当前页面或者打开了新的页面，那么这个 cookie 可以作为第三方 cookie，其余情况下都不能作为第三方 cookie。  
使用这种方法的缺点是，因为它不支持子域，所以子域没有办法与主域共享登录信息，每次转入子域的网站，都回重新登录。还有一个问题就是它的兼容性不够好。  

## MVVM、MVC、MVP

MVC、MVP 和 MVVM 是三种常见的软件架构设计模式，主要通过分离关注点的方式来组织代码结构，优化我们的开发效率。  
比如说我们实验室在以前项目开发的时候，使用单页应用时，往往一个路由页面对应了一个脚本文件，所有的页面逻辑都在一个脚本文件里。页面的渲染、数据的获取，对用户事件的响应所有的应用逻辑都混合在一起，这样在开发简单项目时，可能看不出什么问题，当时一旦项目变得复杂，那么整个文件就会变得冗长，混乱，这样对我们的项目开发和后期的项目维护是非常不利的。  
MVC 通过分离 Model、View 和 Controller 的方式来组织代码结构。其中 View 负责页面的显示逻辑，Model 负责存储页面的业务数据，以及对相应数据的操作。并且 View 和 Model 应用了观察者模式，当 Model 层发生改变的时候它会通知有关 View 层更新页面。Controller 层是 View 层和 Model 层的纽带，它主要负责用户与应用的响应操作，当用户与页面产生交互的时候，Controller 中的事件触发器就开始工作了，通过调用 Model 层，来完成对 Model 的修改，然后 Model 层再去通知 View 层更新。  
MVP 模式与 MVC 唯一不同的在于 Presenter 和 Controller。在 MVC 模式中我们使用观察者模式，来实现当 Model 层数据发生变化的时候，通知 View 层的更新。这样 View 层和 Model 层耦合在一起，当项目逻辑变得复杂的时候，可能会造成代码的混乱，并且可能会对代码的复用性造成一些问题。MVP 的模式通过使用 Presenter 来实现对 View 层和 Model 层的解耦。MVC 中的 Controller 只知道 Model 的接口，因此它没有办法控制 View 层的更新，MVP 模式中，View 层的接口暴露给了 Presenter 因此我们可以在 Presenter 中将 Model 的变化和 View 的变化绑定在一起，以此来实现 View 和 Model 的同步更新。这样就实现了对 View 和 Model 的解耦，Presenter 还包含了其他的响应逻辑。  
MVVM 模式中的 VM，指的是 ViewModel，它和 MVP 的思想其实是相同的，不过它通过双向的数据绑定，将 View 和 Model 的同步更新给自动化了。当 Model 发生变化的时候，ViewModel 就会自动更新；ViewModel 变化了，View 也会更新。这样就将 Presenter 中的工作给自动化了。  

## VUE 双向数据绑定

vue 通过使用双向数据绑定，来实现了 View 和 Model 的同步更新。vue 的双向数据绑定主要是通过使用数据劫持和发布订阅者模式来实现的。  
首先我们通过 Object.defineProperty() 方法来对 Model 数据各个属性添加访问器属性，以此来实现数据的劫持，因此当 Model 中的数据发生变化的时候，我们可以通过配置的 setter 和 getter 方法来实现对 View 层数据更新的通知。  
数据在 html 模板中一共有两种绑定情况，一种是使用 v-model 来对 value 值进行绑定，一种是作为文本绑定，在对模板引擎进行解析的过程中。  
如果遇到元素节点，并且属性值包含 v-model 的话，我们就从 Model 中去获取 v-model 所对应的属性的值，并赋值给元素的 value 值。然后给这个元素设置一个监听事件，当 View 中元素的数据发生变化的时候触发该事件，通知 Model 中的对应的属性的值进行更新。  
如果遇到了绑定的文本节点，我们使用 Model 中对应的属性的值来替换这个文本。对于文本节点的更新，我们使用了发布订阅者模式，属性作为一个主题，我们为这个节点设置一个订阅者对象，将这个订阅者对象加入这个属性主题的订阅者列表中。当 Model 层数据发生改变的时候，Model 作为发布者向主题发出通知，主题收到通知再向它的所有订阅者推送，订阅者收到通知后更改自己的数据。  

## Object.defineProperty 

Object.defineProperty 函数一共有三个参数，第一个参数是需要定义属性的对象，第二个参数是需要定义的属性，第三个是该属性描述符。  
一个属性的描述符有四个属性，分别是 value 属性的值，writable 属性是否可写，enumerable 属性是否可枚举，configurable 属性是否可配置修改。  

## VUE 数据劫持

`Object.defineProperty()` 有一些对属性的操作，使用这种方法无法拦截，比如说通过下标方式修改数组数据或者给对象新增属性，vue 内部通过重写函数解决了这个问题。在 Vue3.0 中已经不使用这种方式了，而是通过使用 Proxy 对对象进行代理，从而实现数据劫持。使用 Proxy 的好处是它可以完美的监听到任何方式的数据改变，唯一的缺点是兼容性的问题，因为这是 ES6 的语法。  

## 什么是 Virtual DOM？为什么 Virtual DOM 比原生 DOM 快？

首先对我们将要插入到文档中的 DOM 树结构进行分析，使用 js 对象将其表示出来，比如一个元素对象，包含 TagName、props 和 Children 这些属性。然后我们将这个 js 对象树给保存下来，最后再将 DOM 片段插入到文档中。
当页面的状态发生改变，我们需要对页面的 DOM 的结构进行调整的时候，我们首先根据变更的状态，重新构建起一棵对象树，然后将这棵新的对象树和旧的对象树进行比较，记录下两棵树的的差异。最后将记录的有差异的地方应用到真正的 DOM 树中去，这样视图就更新了。  
Virtual DOM 这种方法对于我们需要有大量的 DOM 操作的时候，能够很好的提高我们的操作效率，通过在操作前确定需要做的最小修改，尽可能的减少 DOM 操作带来的重流和重绘的影响。其实 Virtual DOM 并不一定比我们真实的操作 DOM 要快，这种方法的目的是为了提高我们开发时的可维护性，在任意的情况下，都能保证一个尽量小的性能消耗去进行操作。  

## 谈谈对 webpack 的看法

我当时使用 webpack 的一个最主要原因是为了简化页面依赖的管理，并且通过将其打包为一个文件来降低页面加载时请求的资源数。  
我认为 webpack 的主要原理是，它将所有的资源都看成是一个模块，并且把页面逻辑当作一个整体，通过一个给定的入口文件，webpack 从这个文件开始，找到所有的依赖文件，将各个依赖文件模块通过 loader 和 plugins 处理后，然后打包在一起，最后输出一个浏览器可识别的 JS 文件。  
Webpack 具有四个核心的概念，分别是 Entry（入口）、Output（输出）、Loader 和 Plugins（插件）。  
- entry 是 webpack 的入口起点，它指示 webpack 应该从哪个模块开始着手，来作为其构建内部依赖图的开始。
- output 属性告诉 webpack 在哪里输出它所创建的打包文件，也可指定打包文件的名称，默认位置为 ./dist。
- loader 可以理解为 webpack 的编译器，它使得 webpack 可以处理一些非 JavaScript 文件。在对 loader 进行配置的时候，test 属性，标志有哪些后缀的文件应该被处理，是一个正则表达式。use 属性，指定 test 类型的文件应该使用哪个 loader 进行预处理。常用的 loader 有 css-loader、style-loader 等。
- plugins 可以用于执行范围更广的任务，包括打包、优化、压缩、搭建服务器等等，要使用一个插件，一般是先使用 npm 包管理器进行安装，然后在配置文件中引入，最后将其实例化后传递给 plugins 数组属性。


## offsetWidth/offsetHeight,clientWidth/clientHeight 与 scrollWidth/scrollHeight

clientWidth/clientHeight 返回的是元素的内部宽度，它的值只包含 content + padding，如果有滚动条，不包含滚动条。  
clientTop 返回的是上边框的宽度。  
clientLeft 返回的左边框的宽度。  

offsetWidth/offsetHeight 返回的是元素的布局宽度，它的值包含 content + padding + border 包含了滚动条。  
offsetTop 返回的是当前元素相对于其 offsetParent 元素的顶部的距离。  
offsetLeft 返回的是当前元素相对于其 offsetParent 元素的左部的距离。  

scrollWidth/scrollHeight 返回值包含 content + padding + 溢出内容的尺寸。  
scrollTop 属性返回的是一个元素的内容垂直滚动的像素数。  
scrollLeft 属性返回的是元素滚动条到元素左边的距离。  

## Set、WeakSet

ES 6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。  
WeakSet 结构与 Set 类似，也是不重复的值的集合。但是 WeakSet 的成员只能是对象，而不能是其他类型的值。WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用。  

## Map、WeakMap

Map 数据结构，类似对象，也是键值对的集合。但是「键」的范围不限于字符串，各种类型的值（包括对象）都可以作为「键」。  
WeakMap 结构和 Map 类似，也是用于生成键值对的集合。但是 WeakMap 只接受对象作为键名（null 除外），不接受其他类型的值作为键名，且 WeakMap 的键名所指向的对象，不计入垃圾回收机制。  

## Proxy

Proxy 用于修改某些操作的默认行为，等同于在语言层面作出修改，所以属于一种「元编程」，即对编程语言进行编程。  
Proxy 可以理解成，在目标对象之间架设一层「拦截」，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。  

## Reflect 对象创建目的？

1. 将 Object 对象的一些明显属于语言内部的方法（比如 Object.defineProperty，放到 Reflect 对象上。
2. 修改某些 Object 方法的返回结果，让其变得更合理。
3. 让 Object 操作都变成函数行为。
4. Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。这就让 Proxy 对象可以方便地调用对应的 Reflect 方法，完成默认行为，作为修改行为的基础。也就是说，不管 Proxy 怎么修改默认行为，你总可以在 Reflect 上获取默认行为。

## require 模块引入的查找方式？

当 Node 遇到 require(X) 时，按下面的顺序处理。  
- 如果 X 是内置模块（比如 require('http')）
    - 返回该模块。
    - 不再继续执行。

- 如果 X 以 "./" 或者 "/" 或者 "../" 开头
    - 根据 X 所在的父模块，确定 X 的绝对路径。
    - 将 X 当成文件，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。
    X
    X.js
    X.json
    X.node
    - 将 X 当成目录，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。
    X/package.json（main字段）
    X/index.js
    X/index.json
    X/index.node

- 如果 X 不带路径
    - 根据 X 所在的父模块，确定 X 可能的安装目录。
    - 依次在每个目录中，将 X 当成文件名或目录名加载。

- 抛出 "not found"

## Promise 对象，Promise/A+ 规范

Promise 对象是异步编程的一种解决方案，最早由社区提出。Promises/A+ 规范是 JavaScript Promise 的标准，规定了一个 Promise 所必须具有的特性。  
Promise 是一个构造函数，接收一个函数作为参数，返回一个 Promise 实例。一个 Promise 实例有三种状态，分别是 pending、resolved 和 rejected，分别代表了进行中、已成功和已失败。实例的状态只能由 pending 转变 resolved 或者 rejected 状态，并且状态一经改变，就凝固了，无法再被改变了。状态的改变是通过 resolve() 和 reject() 函数来实现的，我们可以在异步操作结束后调用这两个函数改变 Promise 实例的状态，它的原型上定义了一个 then 方法，使用这个 then 方法可以为两个状态的改变注册回调函数。这个回调函数属于微任务，会在本轮事件循环的末尾执行。  

## Vue 的各个生命阶段

Vue 一共有8个生命阶段，分别是创建前、创建后、加载前、加载后、更新前、更新后、销毁前和销毁后，每个阶段对应了一个生命周期的钩子函数。

（1）beforeCreate 钩子函数，在实例初始化之后，在数据监听和事件配置之前触发。因此在这个事件中我们是获取不到 data 数据的。  
（2）created 钩子函数，在实例创建完成后触发，此时可以访问 data、methods 等属性。但这个时候组件还没有被挂载到页面中去，所以这个时候访问不到 $el 属性。一般我们可以在这个函数中进行一些页面初始化的工作，比如通过 ajax 请求数据来对页面进行初始化。  
（3）beforeMount 钩子函数，在组件被挂载到页面之前触发。在 beforeMount 之前，会找到对应的 template，并编译成 render 函数。  
（4）mounted 钩子函数，在组件挂载到页面之后触发。此时可以通过 DOM API 获取到页面中的 DOM 元素。  
（5）beforeUpdate 钩子函数，在响应式数据更新时触发，发生在虚拟 DOM 重新渲染和打补丁之前，这个时候我们可以对可能会被移除的元素做一些操作，比如移除事件监听器。  
（6）updated 钩子函数，虚拟 DOM 重新渲染和打补丁之后调用。  
（7）beforeDestroy 钩子函数，在实例销毁之前调用。一般在这一步我们可以销毁定时器、解绑全局事件等。  
（8）destroyed 钩子函数，在实例销毁之后调用，调用后，Vue 实例中的所有东西都会解除绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。  
当我们使用 keep-alive 的时候，还有两个钩子函数，分别是 activated 和 deactivated 。用 keep-alive 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 deactivated 钩子函数，命中缓存渲染后会执行 actived 钩子函数。  

## Vue 组件间数据传递方式

### 父子组件间通信
第一种方法是子组件通过 props 属性来接受父组件的数据，然后父组件在子组件上注册监听事件，子组件通过 emit 触发事件来向父组件发送数据。  
第二种是通过 ref 属性给子组件设置一个名字。父组件通过 $refs 组件名来获得子组件，子组件通过 $parent 获得父组件，这样也可以实现通信。  
第三种是使用 provider/inject，在父组件中通过 provider 提供变量，在子组件中通过 inject 来将变量注入到组件中。不论子组件有多深，只要调用了 inject 那么就可以注入 provider 中的数据。  

### 兄弟组件间通信
第一种是使用 eventBus 的方法，它的本质是通过创建一个空的 Vue 实例来作为消息传递的对象，通信的组件引入这个实例，通信的组件通过在这个实例上监听和触发事件，来实现消息的传递。  
第二种是通过 $parent.$refs 来获取到兄弟组件，也可以进行通信。  

### 任意组件之间
使用 eventBus ，其实就是创建一个事件中心，相当于中转站，可以用它来传递事件和接收事件。  

如果业务逻辑复杂，很多组件之间需要同时处理一些公共的数据，这个时候采用上面这一些方法可能不利于项目的维护。这个时候可以使用 vuex ，vuex 的思想就是将这一些公共的数据抽离出来，将它作为一个全局的变量来管理，然后其他组件就可以对这个公共数据进行读写操作，这样达到了解耦的目的。  

## Vue computed 和 watch 的差异

- computed 是计算一个新的属性，并将该属性挂载到 Vue 的实例上，而 watch 是监听已经存在且挂载到 Vue 实例上的数据，所以使用 watch 同样可以监听 computed 计算属性的变化。
- computed 本质是一个惰性求值的的观察者，具有缓存性，只有当依赖变化后，第一次访问 computed 属性，才会计算新值，而 watch 则是当数据发生变化就会调用执行函数。
- 从使用场景上来看，computed 适用于一个数据被多个数据影响，而 watch 适用于一个数据影响多个数据。

## vue-router 中 `$route` 和 `$router` 区别

`$route` 是「路由信息对象」，包括 path、params、hash、query、fullPath、matched、name 等路由信息。而 `$router` 是「路由实例」对象，包括了路由的跳转方法、钩子函数等。


## 开发中常用的 Content-Type

- application/x-www-form-urlencoded
    浏览器的原生 form 表单，如果不设置 enctype 属性，那么最终就会以 application/x-www-form-urlencoded 方式提交数据。该种方式提交的数据放在 body 里面，数据按照 `key1=val1&key2=val2` 的方式进行编码，key 和 val 都进行了 URL 转码。
- multipart/form-data
    该种方式也是一个常见的 POST 提交方式，通常表单上传文件时使用该种方式。
- application/json
    告诉服务器消息主体是序列化后的 JSON 字符串。
- text/xml
    该种方式主要用来提交 XML 格式的数据。

## 如何确定页面的可用性时间，什么是 Performance API？

Performance API 用于精确度量、控制、增强浏览器的性能表现。这个 API 为测量网站性能，提供以前没有办法做到的精度。  
使用 getTime 来计算脚本耗时的缺点，首先，getTime方法（以及 Date 对象的其他方法）都只能精确到毫秒级别（一秒的千分之一），想要得到更小的时间差别就无能为力了。其次，这种写法只能获取代码运行过程中的时间进度，无法知道一些后台事件的时间进度，比如浏览器用了多少时间从服务器加载网页。  
为了解决这两个不足之处，ECMAScript 5引入“高精度时间戳”这个 API，部署在 performance 对象上。它的精度可以达到1毫秒的千分之一（1秒的百万分之一）。  
navigationStart：当前浏览器窗口的前一个网页关闭，发生 unload 事件时的 Unix 毫秒时间戳。如果没有前一个网页，则等于 fetchStart 属性。  
loadEventEnd：返回当前网页 load 事件的回调函数运行结束时的 Unix 毫秒时间戳。如果该事件还没有发生，返回 0。  
根据上面这些属性，可以计算出网页加载各个阶段的耗时。比如，网页加载整个过程的耗时的计算方法如下：
```JavaScript
var t = performance.timing;
var pageLoadTime = t.loadEventEnd - t.navigationStart;
```