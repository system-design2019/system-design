# 软件需求规格说明书（SRS）

| 版本 | 日期      | 描述                           | 作者   |
| ---- | --------- | ------------------------------ | ------ |
| V1.0 | 2019.4.10 | 领域建模                       | 宋晓彤 |
| V1.1 | 2019.4.15 | 状态建模                       | 宋晓彤 |
| V1.2 | 2019.5.1  | 用例建模                       | 宋晓彤 |
| V1.3 | 2019.5.7  | 用例建模（问卷活动图）         | 宋晓彤 |
| V1.4 | 2019.5.15 | 补充需求                       | 宋晓彤 |
| V2.0 | 2019.5.20 | 用例建模（个人登录、首页）     | 宋晓彤 |
| V3.0 | 2019.5.27 | 用例建模（跑腿）、补充需求     | 宋晓彤 |
| V3.1 | 2019.6.1  | 领域建模（修改新版本状态）     | 宋晓彤 |
| V3.2 | 2019.6.9  | 补充需求                       | 宋晓彤 |
| V4.0 | 2019.6.15 | 用例建模（历史信息）、领域建模 | 宋晓彤 |
| V4.1 | 2019.6.24 | 补充需求                       | 宋晓彤 |

### 目录

1. [用例建模](#1)
   - [1.1 01-系统用例总览](#1.1.01)
   - [1.2 01-问卷交易多泳道活动图](#1.2.01)
   - [1.2 02-跑腿交易多泳道活动图](#1.2.02)
2. 业务流程描述
   - [2.1 01-a01-注册](https://system-design2019.github.io/files/uml/usecase1-1)
   - [2.1 01-a02-登录](https://system-design2019.github.io/files/uml/usecase1-2)
   - [2.1 02-b01-发布问卷](https://system-design2019.github.io/files/uml/usecase1-3)
   - [2,1 02-b02-发布跑腿](https://system-design2019.github.io/files/uml/usecase1-4)
   - [2.1 03-c01-填写问卷](https://system-design2019.github.io/files/uml/usecase1-5)
   - [2.1 03-c02-参与跑腿](https://system-design2019.github.io/files/uml/usecase1-6)
   - [2.2 01-d01-验证码](https://system-design2019.github.io/files/uml/usecase2-1)
   - [2.2 01-d02-修改密码](https://system-design2019.github.io/files/uml/usecase2-2)
   - [2.2 02-e01-支付押金](https://system-design2019.github.io/files/uml/usecase2-3)
   - [2.2 02-e02-编辑问卷题目内容](https://system-design2019.github.io/files/uml/usecase2-4)
   - [2.2 02-e03-关闭任务](https://system-design2019.github.io/files/uml/usecase2-5)
   - [2.2 02-e04-查看参与情况](https://system-design2019.github.io/files/uml/usecase2-6)
   - [2.2 03-f01-虚拟币](https://system-design2019.github.io/files/uml/usecase2-7)
   - [2.2 04-g01-通知系统](https://system-design2019.github.io/files/uml/usecase2-8)
3. [领域建模](https://system-design2019.github.io/files/Domain)
   - 3.1 全系统领域模型
   - 3.2 问卷系统领域模型
   - 3.3 跑腿系统领域模型
   - 3.4 个人系统领域模型
4. [状态建模](https://system-design2019.github.io/files/State)
   - 4.1 问卷对象状态模型
   - 4,2 跑腿对象状态模型
5. [功能建模](https://system-design2019.github.io/files/Sequence)
   - 5.1 01-用户发布问卷
   - 5.1 02-用户填写问卷
   - 5.1 03-用户关闭问卷
   - 5.1 -04-用户删除问卷
   - 5.2 01-用户发布跑腿
   - 5.2 02-用户参与跑腿
   - 5.2 03-用户关闭跑腿
   - 5.2 04-用户删除跑腿
   - 5.3 01-充值
   - 5.3 02-提现
   - 5.4 01-接收通知
   - 5.4 02-删除通知
   - 5.4 03-发送通知
   - 5.4 04-标为已读/未读
   - 5.5 01-用户登录
   - 5.5 02-用户注册
   - 5.5 03-修改信息
6. [补充需求](https://system-design2019.github.io/files/Requirements)
   - 6.1 简介
   - 6.2 功能性需求
   - 6.3 用户体验需求
   - 6.4 兼容性需求
   - 6.5 可靠性需求
   - 6.6 安全性需求
   - 6.7 开源工具相关需求
   - 6.8 法律问题相关需求

<h2 id="1">用例建模</h2>

<h3 id="1.1">1.1 用例图</h3>

<h4 id="1.1.01">1.1 01-系统用例总览</h4>

下图为Time is Money挣闲钱平台系统用例图一览，其中，子用例图及其活动图见[业务流程描述](#2)

Time is money的用例主要包括注册/登录、首页操作、发布任务、接受任务、收藏任务，以及通知操作，其中不同的用例所关联的用例也不相同，下图对此做出了总体的说明。

![usecase_total](./pic/usecase-total.png)



<h3 id="1.2"> 活动图</h3>

对于Time is Money平台来说，最主要的业务逻辑在于任务的交易过程，任务又被分为跑腿与问卷，由此，我们分别对这两项业务进行泳道图绘制(以下业务流程均为happy path)

<h4 id="1.2.01">（1） 问卷交易业务</h4>

发布者编辑问卷题目->发布者设置问卷信息->发布者提交押金->接受者接受任务->接受者填写问卷->发布者关闭问卷->交易结算

![usecase_total](./pic/quesac.png)

<h4 id="1.2.02">（2）跑腿交易业务</h4>

发布者设置跑腿信息->发布者提交押金->接受者提交押金->接受者完成任务->发布者确认跑腿完成->交易结算

![usecase_total](./pic/errandac.png)

