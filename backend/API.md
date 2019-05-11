# 用户(User)

**统一返回格式**

```java
public class Message<T> {
    //是否成功的标志
    boolean success;
    //其他消息
    String msg;
    //具体数据
    T data;
    public Message(){
        success = false;
        msg = "";
        data = null;
    }
}
```

## 重置用户表

删除原来的用户表，并且重新创建用户表

- `/users/reset`  
- `GET` 
- 参数：无
- 返回：`Message<String>`

**示例：**

Response:

```json
{
    "success": true,
    "msg": "用户表重置成功",
    "data": null
}
```



## 获取所有用户

- `/users`  

- `GET` 

- 参数：无

- 返回：`Message<List<User>>`

**示例：**

Response:

```json
{
    "success": true,
    "msg": "获取成功",
    "data": [
        {
            "id": 1517178053,
            "password": "mypassword",
            "email": "a@qq.com",
            "phone": "$10002",
            "name": "$10002",
            "studentId": "",
            "grade": -1,
            "major": "",
            "gender": -1,
            "age": -1,
            "nickname": ""
        },
        {
            "id": 1517178059,
            "password": "mypassword",
            "email": "b@qq.com",
            "phone": "$10001",
            "name": "$10001",
            "studentId": "",
            "grade": -1,
            "major": "",
            "gender": -1,
            "age": -1,
            "nickname": ""
        }
    ]
}
```

## 注册

- 路径：`/register`

- 方法：`POST`

- 参数：

  - 类型：`application/json : User`

  - 表示：用户对象
  - 注意：`email`和`phone`与其他用户不重复，**允许**只设置一个字段

- 返回：`Message<String>`


**示例：**

RequestBody:

```json
{
    "password": "mypassword",
    "email": "a@qq.com"
}
```

Response:

```json
{
    "success": true,
    "msg": "注册成功",
    "data": null
}
```



## 登录

- 路径：`/user`

- 方法：`POST`

- 参数：

  - 类型：`application/json : User`

  - 表示：账号密码

  - 注意：只有其中的email，phone，password字段有效

    ​	   其中email和phone必须有且仅有一个存在

    ​           返回的User对象如果**email、phone、name**以字符“$"开头则表示**未初始化**

- 返回：`Message<User>`


**示例：**

RequestBody:

```json
{
    "password": "mypassword",
    "email": "b@qq.com"
}
```

Response:

```json
{
    "success": true,
    "msg": "登录成功",
    "data": {
        "id": 1517178059,
        "password": "mypassword",
        "email": "b@qq.com",
        "phone": "$10001",
        "name": "$10001",
        "studentId": "",
        "grade": -1,
        "major": "",
        "gender": -1,
        "age": -1,
        "nickname": ""
    }
}
```

## 删除

- 路径：`/user/{userId}`

- 方法：`DELETE`

- 参数：无

- 返回：`Message<String>`


**示例：**

URL:

```
http://localhost:8080/user/1517178059
```

Response:

```json
{
    "success": false,
    "msg": "不存在该用户",
    "data": null
}
```

## 更新资料

- 路径：`/user`
- 方法：`PUT`
- 参数：`User`
  - 可修改除了ID所有属性，**包括密码**，此处不验证密码！
  - **用户ID**作为唯一标识，其它字段都有改变的可能性！
- 返回：`Message<String>`


**示例：**

RequestBody:

```json
{
    "id": 1517178053,
    "password": "changepassword",
    "email": "a@qq.com",
    "phone": "$10001",
    "name": "$10001",
    "studentId": "",
    "grade": -1,
    "major": "",
    "gender": -1,
    "age": -1,
    "nickname": ""
}
```

Response:

```json
{
    "success": true,
    "msg": "修改成功",
    "data": null
}
```

## 上传头像

- 路径：`/upload`
- 方法：`POST`
- 参数：`multipart/form-data`
- 返回：`Message<String>`
  - `data`属性表示图片`URL`

**示例：**

html:

```html
<html>  
<body>  
  <form action="http://localhost:8080/upload" method="POST" enctype="multipart/form-data">  
    <input type="file" name="file"/>  
    <input type="submit" value="Upload"/>   
  </form>  
</body>  
</html>  
```

Response:

```json
{
	"success": true,
	"msg": "上传成功",
	"data": "C:\\Users\\Janking\\IdeaProjects\\systemdesign\\backend\\target\\classes/static/faces/fluidicon.png"
}
```





# 问卷

## 查询所有问卷：

- 路径 /allques
- 方法 get

输入
http://localhost:8080/allques

返回样例
```json
{
    "success": true,
    "msg": "获取成功",
    "data": [
        {
            "task_id": 10,
            "title": "$",
            "publisher": "$",
            "description": "$",
            "reward": 0,
            "effective": "2019-4-28",
            "request": "$",
            "status": "not done",
            "panticipant": "zheng"
        },
        {
            "task_id": 30,
            "title": "postmdan_test",
            "publisher": "yourfathder",
            "description": "test postmdan first",
            "reward": 800,
            "effective": "2019-4-28",
            "request": "sodme new",
            "status": "not done",
            "panticipant": "zheng"
        },
        {
            "task_id": 40,
            "title": "shixun",
            "publisher": "yourmother",
            "description": "test postmdan second",
            "reward": 100,
            "effective": "2019-4-28",
            "request": "good boy",
            "status": "not done",
            "panticipant": "zheng"
        }
    ]
}
```




## 添加问卷

- 路径 /createques
- post

输入样例
http://loacalhost:8080/createques
```json
{
	"task_id":40,
	"title":"shixun",
	"publisher":"yourmother",
	"description":"test postmdan second",
	"reward":100,
	"effective_time":"2019-09-19",
	"request":"good boy",
	"task_status":"not done",
	"panticipant":"songxiao"
}
```


## 根据ID获取问卷详情

- 路径 /getQues/{quesID}
- 方法 get

输入
http://localhost/getQues/{quesID}

返回
```json
{
    "success": true,
    "msg": "获取成功",
    "data": {
        "quesID": 123,
        "title": "ziranyuyan",
        "content": "di11cizuoye",
        "publisher": "zheng",
        "reward": 78,
        "attend": 2,
        "total": 50,
        "endtime": "2019-10-5",
        "request": "liangtian",
        "status": "not done"
    }
}
```




## 根据ID获取问卷内容

- 路径 /getQuesCont/{quesID}
- 方法 get

输入
http://localhost:8080/getQuesCont/{quesID}

返回
```json
{
    "success": true,
    "msg": "获取成功",
    "data": "di11cizuoye"
}
```
