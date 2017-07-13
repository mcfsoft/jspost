这是一个javascript代码文件，它能使你很方面地在html里进行触发post操作


------------------------------------------

直接提交到当前页面的URL：
return jsPostOn(function () {
            alert('提交完成！');
        });


------------------------------------------

提交到指定URL：

return jsPost('http://www.baidu.com',function () {
            alert('提交完成！');
        });

------------------------------------------