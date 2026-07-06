# 🦁 广东舞狮文创 — 微信小程序

基于广东醒狮文化的数字化互动体验小程序，面向 4-12 岁儿童，通过敲鼓、AR 拍照、涂色装饰等方式让儿童在"玩"中感受舞狮文化。

## 功能

| 模块 | 说明 |
|------|------|
| **🥁 敲鼓节奏游戏** | 6 种敲击模式，缩圈判定（S/A/B/C 评级），连击系统，2 首曲目 |
| **📸 AR 狮头拍照** | 小狮贴纸选择 → 双指缩放/旋转/拖拽编辑 → 保存作品 |
| **🎨 狮头涂色装饰** | 16 色调色盘 + 画笔粗细 + 5 种装饰素材（25 个）+ 橡皮擦 + 撤销 |
| **🛒 商店** | 8 款商品，分类筛选，跳转小程序联盟购买 |
| **👤 个人中心** | 5 只小狮收集 + 10 项成就系统 + 作品网格 + 游戏记录 |
| **📖 舞狮故事** | 3 张文化知识卡片 + 详情页（内容源自论文） |

### 解锁激励系统

敲鼓通关 → 🔥火火狮 → AR 拍照 → 💧水水狮 → 涂色完成 → ✨金金狮 → S/A 评级 → 🌿木木狮 → 收集 4 只 → 🪨土土狮（隐藏）

## 技术栈

- **框架：** 微信小程序原生（WXML + WXSS + JS）
- **后端：** 微信云开发（云数据库 + 云存储 + 云函数）
- **画布：** Canvas 2D（涂色 + AR 贴纸合成）
- **音频：** `wx.createInnerAudioContext`
- **相机：** `wx.createCameraContext`
- **支付：** 小程序联盟（无企业支付资质替代方案）

## 项目结构

```
miniprogram/
├── app.json / app.js / app.wxss    # 全局配置
├── pages/
│   ├── index/      # 首页（Hero + 功能入口 + 故事卡片）
│   ├── shop/       # 商店（商品展示 + 分类）
│   └── mine/       # 个人中心（收集 + 成就 + 作品）
├── package-drum/   # 敲鼓游戏（子包）
├── package-ar/     # AR 拍照（子包）
├── package-color/  # 涂色装饰（子包）
├── package-news/   # 故事详情（子包）
├── images/         # 图片资源
└── utils/          # 工具函数（解锁引擎 unlock.js）

docs/               # 项目文档（PRD、交互设计、设计规范、品牌等）
全部内容/            # 原始设计素材（IP 形象、图标、花纹等）
scripts/            # 工具脚本
```

## 开发

```bash
# 使用微信开发者工具打开 miniprogram/ 目录
# 需开通微信云开发环境
```

## 新开发者入门

### 1. 创建 project.config.json

`project.config.json` 已从 Git 中移除（因含 AppID），需在 `miniprogram/` 下手动创建：

```json
{
  "appid": "your_appid_here",
  "projectname": "广东醒狮文创",
  "libVersion": "3.7.12",
  "cloudfunctionRoot": "cloud/",
  "cloudfunctionTemplateRoot": "cloudfunctionTemplate/",
  "compileType": "miniprogram",
  "setting": {
    "urlCheck": false,
    "es6": true,
    "enhance": true,
    "postcss": true,
    "preloadBackgroundData": false,
    "minified": true,
    "newFeature": true,
    "coverView": true,
    "nodeModules": false,
    "autoAudits": false,
    "showShadowRootInWxmlPanel": true,
    "scopeDataCheck": false,
    "uglifyFileName": false,
    "checkInvalidKey": true,
    "checkSiteMap": true,
    "uploadWithSourceMap": true,
    "compileHotReLoad": false,
    "lazyloadPlaceholderEnable": false,
    "useMultiFrameRuntime": true,
    "useApiHook": true,
    "useApiHostProcess": true,
    "babelSetting": { "output": { "beautify": false }, "ignore": [] }
  },
  "condition": {}
}
```

### 2. 音频资源

`miniprogram/audio/` 目录被 Git 忽略（文件体积大）。开发者需自行准备 `drum/`、`story/`、`effect/` 子目录下的 `.mp3` 文件，或修改代码改为 CDN 加载方式。音频清单见 `docs/交互设计文档.md`。

### 3. 微信云开发

需开通微信云开发环境，将 `env` 配置为你的环境 ID。云函数及数据库集合定义见 `docs/技术规划文档.md`。

## 版本

当前版本：**V1.0**（MVP 版本，四大核心功能 + 解锁激励系统已实现）

## 可扩展方向

| 方向 | 说明 |
|------|------|
| **多语言** | 支持粤语/英文，故事卡片内容从论文扩展为多语言版本 |
| **音频 CDN 化** | 将本地 `.mp3` 迁移至云端存储，减少包体积 |
| **用户系统** | 接入微信登录 + 云数据库持久化用户进度 |
| **排行榜** | 敲鼓游戏增加好友排行（云函数 + 云数据库） |
| **AR 进阶** | 接入真实 AR 引擎（如 VPS），识别狮头轮廓叠加特效 |
| **运营后台** | 管理端管理商品、成就、内容更新 |
| **Web 管理端** | 为运营人员提供内容管理、数据看板 |
| **社区分享** | 作品墙、社交裂变传播 |

### 4. 配置 Git 远程仓库

项目推送时使用的远程 URL 已移除了 Token，如需推送请在自己本地配置鉴权：

```bash
git remote set-url origin https://github.com/你的用户名/guangdong-wenshi.git
# 或使用 SSH
git remote set-url origin git@github.com:你的用户名/guangdong-wenshi.git
```

> 项目使用分包机制，主包 + 4 个子包。开发者需在微信开发者工具中关联云开发环境 ID。

## 文档

| 文档 | 说明 |
|------|------|
| `docs/落地版PRD.md` | 产品需求文档（唯一参考） |
| `docs/交互设计文档.md` | 交互规范与页面状态机 |
| `docs/design-spec.md` | 设计规范（色值、字体、组件） |
| `docs/技术规划文档.md` | 技术方案与数据库设计 |
| `docs/品牌.md` | 品牌视觉系统 |
| `docs/测试用例.md` | 测试用例 |
| `docs/页面故事地图.md` | 页面规划与 MVP 优先级 |

## 参考论文

温玉婷《基于广东醒狮文化的数字化互动体验设计与研究》

## 许可

仅供学习交流使用。
