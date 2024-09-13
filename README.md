# 简介
这是FDFZ城市定向社的网站界面源码库。此项目的初衷是为了优化城定参与者（包括Player、NPC等）的体验。在2024年8月，由[@Er1cMa](https://github.com/er1cma)先提出开发城定在线化的设想，[@jeremy0519](https://github.com/jeremy0519)觉得很赞，于是项目正式启动。目前，还有很多基本功能没有实现，希望有能力的同学们积极提交discussions、pr，让我们一起把城定做的更好！

预览网址（此网址随仓库自动更新）：https://cityrun.pages.dev

项目主要功能包括：
- [ ] Player在城定过程中查看当前的Task&Route Info
- [ ] Player在城定过程中查看总计已用时间和当前Task/Route花费时间
- [ ] Admin在活动前编辑各个Task&Route Info
- [ ] 可视化编辑Task&Route Info
- [ ] NPC在各点位查看各组选手状态，并确认选手是否到达点位/完成任务/加减时（然后给Player发送Task/Route Info）
- [ ] 活动结束后展示排行榜

在提交贡献前，请务必确保您了解FDFZ城定规则。[直达Project面板](https://github.com/users/jeremy0519/projects/1)
# 开发指南
本项目前端采用[Vue3](https://cn.vuejs.org/guide/introduction.html)(含[Vue-router](https://router.vuejs.org/zh/introduction.html))+[Bootstrap5](https://getbootstrap.com/docs/5.3/getting-started/introduction/)+[FontAwesome](https://fontawesome.com/search)+[appwrite-js-sdk](https://appwrite.io/docs)

## 安装依赖
先安装[nodejs v22](https://nodejs.org/zh-cn/download/package-manager)

再安装pnpm包管理器
`npm install -g pnpm`

`pnpm install`
## 本地运行
`pnpm dev`
