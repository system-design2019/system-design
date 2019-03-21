## 开发环境(To 后端)

**IntelliJ Idea + Java 1.8.0 + Spring Boot + Tomcat(9.0)(可选)** 



- 直接将项目导入为IntelliJ项目，点击运行
- 测试`url`为 http://localhost:8080

## 测试环境(To Other)

**Java 1.8.0**



- 运行`system-design\backend\target`目录下的`jar`包

  ```bash
  $ java -jar .\swsad-0.0.1-SNAPSHOT.jar 
  ```

- 测试`url`为 http://localhost:8080

## API接口

请求`URL` ：http://api.janking.cn

> 此URL还没有与GitHub同步，所以测试还是用http://localhost:8080

| 路径 | 方法 | 参数 | 返回 | 备注   |
| ---- | ---- | ---- | ---- | ------ |
| /    | GET  | 无   |   字符串   | 测试 |
| /hello | GET | 无 | 字符串 | 测试 |

## 资料

- IDEA 打包Spring项目

  <https://blog.csdn.net/qq_34409900/article/details/80561277>

- IDEA 创建一个Restful的Spring Boot项目

  <https://blog.csdn.net/qq_18297675/article/details/79407438>

- 服务器部署jar包

  <https://blog.csdn.net/qq_39507276/article/details/82227416>

- Spring项目绑定域名

  <https://cloud.tencent.com/developer/article/1332603>
