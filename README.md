# README

## 环境依赖

## 目录结构
|-- frontend 
|-- backend 
|-- management 
|-- UIandProto

## 看板使用
### project简介
1. 目前有四个看板pro(ui/front/back/product)，大家平时各自管理各自的看板pro，便于查看新需求和自己的任务管理
2. UI/frontend/backend都有need triage、high、progess、close四列，第一列表示待办，high表示高优先级待办，这两列都是to do类型，表示未完成的任务，progress为进行中，close表示已经完成任务
3. management有todo、processing、needs review、close四列，processing和review都是待查类型，表示进行中和待查，其他相同
2. 添加issue后kanban上会在todo column上自动添加
3. 添加issue必选project，前端方向就选frontend，其他同理
4. 如果是跨方向提issue，project不仅选择被选的方向，还要选management，方便PM查看
例：如果前端有修改界面的需求，就提出issue，project选择UI和management，UI查看看板可自动查看当前issue，同时PM可查修改
### 步骤
1. 在repo中选择添加issue
2. 编辑标题，标题后带week数表示ddl，可在详细信息中添加ddl日期作为具体记录
3. 右侧选择label表示issue类型，可自主添加新label，但添加后需完善下方label样式
4. 右侧选择project表示相关pro，相关看板会自动添加
5. 关闭issue时看板也会自动修改

### label样式
1. negotiations -------------- 大家一起协商
2. management -------------- 产品方向
2. frontend ------------------ 前端方向
3. backend ------------------- 后台方向
4. UI ------------------------- 界面方向
5. question ------------------- 有问题需要研究的地方
6. bug ------------------------ 有bug需要修复的地方