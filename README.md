### This is a front-end envrioment for react.js and vue.js

#### React.js

##### To start react.js you need config the webpack.config.js

module.exports.entry

```
entry: {
    // 'app/index': './src/app/index.jsx',
    'app/index': './src/app/index.vue.js',
},
```

##### To start vue.js you need change config the wepback.config.js

module.exports.entry

```
entry: {
    // 'app/index': './src/app/index.jsx',
    'app/index': './src/app/index.vue.js',
},
```
> this enviroment will load *.jsx as react module, *.vue as vue module automatically


====

### 安装

```
npm install 
```

or

```
yarn
```

### 快速启动开发模式

```
npm run dev
```

or

```
yarn dev
```

### 快速启动产品模式（压缩，production模式打包）

```
npm run build
```

or 

```
yarn build
```


### 独立的任务

#### 1.开启开发模式下的webpack

```
npm run dev:webpack
```

or

```
yarn dev:webpack
```

#### 2.开启开发模式下的自动刷新的Webpack

```
npm run dev:webpackServer
```

or

```
yarn dev:webpackServer
```


#### 3.开启开发模式下的gulp

```
npm run dev:gulp
```

or

```
yarn dev:gulp
```
