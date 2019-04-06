# User



## 获取所有用户

- `/users`  

- `GET` 

- 参数：无

- 返回：`List<User>`

**示例：**

Response:

```json
[
    {
        "id": -890,
        "password": "p",
        "email": "e",
        "phone": "p"
    },
    {
        "id": 123,
        "password": "p",
        "email": "e",
        "phone": "p"
    }
]

```

## 注册

- 路径：`/register`

- 方法：`POST`

- 参数：

  - 类型：`application/json : User`

  - 表示：用户对象
  - 注意：`email`和`phone`与其他用户不重复，可以只设置一个字段

- 返回：`boolean`

  若新建用户成功，返回true

  若失败，返回false

**示例：**

RequestBody:

```json
{
	"email":"a@qq.com",
	"phone":"155xxxx6875",
	"password":"mypassword"
}
```

Response:

```json
true
```



## 登录

- 路径：`/user`

- 方法：`POST`

- 参数：

  - 类型：`application/json : User`

  - 表示：账号密码

  - 注意：只有其中的email，phone，password字段有效，其中email和phone必须有且仅有一个存在

    ​           返回的User对象如果email或者phone以字符“$"开头则表示未初始化

- 返回：`User`

  成功登陆返回用户对象

  失败返回`null`

**示例：**

RequestBody:

```json
{
	"phone":"155xxxx6875",
	"password":"mypassword"
}
```

Response:

```json
{
    "id": 10002,
    "password": "mypassword",
    "email": "$10002",
    "phone": "155xxxx6875"
}
```

## 删除

- 路径：`/user/{userId}`

- 方法：`DELETE`

- 参数：无

- 返回：`boolean`

  若删除成功，返回true

  若失败，返回false

**示例：**

URL:

```json
http://localhost:8080/user/10002
```

Response:

```json
true
```

## 更新资料

- 路径：`/user`

- 方法：`PUT`

- 参数：`User`

  - 用户ID作为唯一标识，其它字段都有改变的可能性！

- 返回：`boolean`

  若更新成功，返回true

  若失败，返回false

**示例：**

RequestBody:

```json
{
	"id":10000,
	"password":"changepassword"
}
```

Response:

```json
true
```

