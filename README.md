# A twist on accounting.toFixed

_An assessment from the [Watch and Code](https://watchandcode.com) premium curriculum._

### DIRECTIONS:

In [AccountingJS 13](https://watchandcode.com/courses/77710/lectures/2228465), we looked at [`accounting.toFixed`](http://openexchangerates.github.io/accounting.js/#methods) method. We found that we could improve the function by simulating calculations like `1.005 * 100` with `1.005e2` (using exponential notation).

Your job is to rewrite `accounting.toFixed` so that it does _NOT_ use multiplication or exponential notation. Instead, you will actually move the decimal point using string manipulation.

So in the example above, instead of using `1.005e2`, you'll need to figure out a way to work with the string `"1.005"` and then create a new string with the decimal point moved over two places to the right. In other words, you need to turn `"1.005"` into `"100.5"` using string manipulation.

Include tests that cover the weird cases we saw in the video like `0.615`, `10.235`, and `1.005`.

This is more of a fun exercise than a practical solution since exponential notation works fine, but it's a great way to force you to learn about string manipulation. It also helps to reinforce what you've learned, so I'll take it :)

Also if you didn't know about exponential notation, this would be a great approach. So this is a good way to see how to solve the problem from a different angle.
