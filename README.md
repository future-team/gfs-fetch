# gfs-fetch

数据请求模块，可配合`gfs-mock` 或 `gfs-loadingbar`组合使用，也可以根据具体需求自己实现；

## 安装

```bash

	npm install gfs-fetch --save
	
```

## 使用

```js

	import Fetch from 'gfs-fetch';
	
	let fetch = new Fetch([mock][,loadingbar]);
	fetch.run('/mocks/ajax.jsons'[,options]).then((data)=>{
    	
    },function(ex){
        root.innerHTML = `<font color="red">${ex.responseText}</font>`;
    });

```

## Options 参数

`dataType`	{string} 数据返回类型 默认为`json`		
									
`asyn`  {boolean} 是否为异步请求，默认为`true`
													
`method`  {string} 数据请求方式，默认为`GET`，可选值有：POST、GET、OPTION、DEL、PUT	
								
`timeout`  {number} 请求超时时间，可选填	
							
`credentials`  {object} 跨域是是否要包含cookie值，可选值：include
									
`success`  {function} 请求成功回调，必须	
							
`error`  {function} 请求失败回调，可选	
								
`header` {object} 包含的请求头，可选	
								
`body` {object} 需要传递给服务端的属性字段值，可选
										
`cache` {boolean} 请求数据是否缓存	
										


## 整合mock 和 loadingbar

- mock: 需实现`getUrl(url:string):string`方法，包装本地url并返回					
- loadingbar: 需实现`run()` 和 `end()`，loadingbar的开始和结束

## Command

```
	#测试	
	npm run test	
	#打包	
	npm run build	
	#例子演示	
	npm start
```


