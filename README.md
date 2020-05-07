## intro

a js obfuscator plugin for webpack

## quick start

```
npm i @jarzzzi/obfuscator-webpack-plugin --dev
```

## example
```js
const CodeObfuscatorWebpackPlugin = require('@jarzzzi/obfuscator-webpack-plugin')

plugins: [
    new CodeObfuscatorWebpackPlugin({
      // javascript-obfuscator options
      options: {
        compact: true,
      },
      chunks: ['dist'],
    })
  ]
```

## links

- know more here to go [javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator)
