## 开发环境

**IntelliJ Idea + Java 1.8.0 + Spring Boot + MySQL5.5(服务器上) + Tomcat(9.0)(可选)** 



- 直接将项目导入为`IntelliJ`项目，点击运行

- 服务器数据库地址为 jdbc:mysql://52.76.250.96:3306/swsad

  用户名:swsad

  密码:swsad

- 测试`url`为 http://localhost:8080

## 部署环境

**Java 1.8.0**



- 使用`IDEA maven`打包生成`jar`包

- 运行`system-design\backend\target`目录下的`jar`包

  ```bash
  //windows
  $ java -jar .\swsad-0.0.1-SNAPSHOT.jar 
  //linux continue
  $ nohup java -jar swsad-0.0.1-SNAPSHOT.jar &

  ```

- 测试`url`为 http://localhost:8080

## API接口

[API详细文档](api.md)

请求`URL` ：http://52.76.250.96:8080

> 此URL还没有与GitHub同步

## 资料

- IDEA 打包Spring项目

  <https://blog.csdn.net/qq_34409900/article/details/80561277>

- IDEA 创建一个Restful的Spring Boot项目

  <https://blog.csdn.net/qq_18297675/article/details/79407438>

- 服务器部署jar包

  <https://blog.csdn.net/qq_39507276/article/details/82227416>

- Spring项目绑定域名

  <https://cloud.tencent.com/developer/article/1332603>

- 安装MySQL

  <https://blog.csdn.net/qq_38683692/article/details/82859141>

- MySQL语法

  <http://www.runoob.com/mysql/mysql-create-tables.html>

- MySQL8使用JDBC连接的问题(但是服务器用不了版本8)

  <https://blog.csdn.net/qq_22076345/article/details/81952035>

## 笔记

保存`jar`文件的`ignore`

```
target/classes
target/generated-sources
target/generated-test-sources
target/maven-archiver
target/maven-archiver
target/maven-archiver
target/test-classes
```

