# Runtyper
> [Babel](https://babeljs.io) plugin for runtime type-checking in JavaScript

Use Runtyper in your *development builds* and it will throw error every time
when some operation is applied to inconsistent types. No annotations needed.

## Example
When somewhere in code you have comparison like `x === y` and in runtime `x = 1`, `y = "1"`, 
you will get unexpected `false` result due to missing type conversion.  
After applying Runtyper it will notify you about such situation as soon as it occurs:

![runtyper warning](https://cloud.githubusercontent.com/assets/1473072/24371480/926108e8-1333-11e7-8e17-0223ed0c21ad.png)

## Install
```bash
npm install --save-dev babel-plugin-runtyper
```

## Usage
Just add `babel-plugin-runtyper` to babel config in *development builds*.  
For example, in `package.json` scripts:
```json
"scripts": {
  "babel-dev": "babel in.js -o out.js --plugins=babel-plugin-runtyper"
}
``` 
or with [webpack babel-loader](https://webpack.js.org/loaders/babel-loader/):
```js
{
    test: /\.js$/,
    exclude: /(node_modules)/,
    loader: 'babel-loader',
    query: {
        plugins: [
            ['babel-plugin-runtyper', {enabled: !PRODUCTION}]
        ]
    }
}
```
or directly in terminal: 
```bash
babel in.js -o out.js --plugins=babel-plugin-runtyper
```
No changes to your existing codebase needed.

## How it works
Basically it wraps all type-important places into function that additionally performs type checking. 
Currently strict comparison `===, !==` and numeric operations `+,-,*,/,%` are wrapped.  
Before: 
```js
if (x === y) { ... }
```
After:
```js
if (strictEqual(x, y)) { ... }
```

## Compare to static tools
Static code analysis is another approach to type checking. 
For example, there are Microsoft's [TypeScript](http://www.typescriptlang.org) and Facebook's [Flow](https://flowtype.org).
They can be used together with Runtyper to cover most of cases in both pre-runtime and runtime stages.

But using static tools requires extra efforts for:
* writing annotations
* integration with third-party libraries as their API should be also annotated)
* processing external data from user or server 
* involving new members who is not familiar with typed JavaScript

Lets take an example from [Flow's get started page](https://flowtype.org/en/docs/getting-started/):
```js
// @flow
function square(n) {
  return n * n; // Error!
}

square("2", "2");
```

but if I have textfield and will call `square()` with user's input - error will not be found: 
```js
// @flow
function square(n) {
  return n * n; // no Error, until you annotate `event.target.value`
}

window.document.getElementById('username').addEventListener('change', function (event) {
  square(event.target.value);
});
```
You can try it here: https://flowtype.org/try/

Runtyper allows to catch such cases:

![runtyper warning textfield](https://cloud.githubusercontent.com/assets/1473072/24371601/f8d10ab0-1333-11e7-8baf-6b6501accd29.png)

So use both approaches to make your applications more robust and reliable.

## License
MIT @ [Vitaliy Potapov](https://github.com/vitalets)
