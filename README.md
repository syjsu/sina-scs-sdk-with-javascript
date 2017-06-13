# sina-scs-sdk-with-javascript
新浪云存储的js版sdk，不需要安装node环境浏览器即可执行

打印浏览器上传的表单数据 form

```javascript

        <script src="./sha1.js" type="text/javascript"></script>
        <script src="./scs.js" type="text/javascript"></script>

        <script type="text/javascript">
			      var scs = new SCS('您的AK','您的SK','您的Bucket');
            var data = scs.upload();
            console.log(data);
        </script>
```

具体打印的表单用vue.js之类填到表单就可以了
