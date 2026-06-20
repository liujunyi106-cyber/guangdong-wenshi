# 广东舞狮文创小程序 · 设计规范 (Design Spec)

> 版本：V2.12 | 来源：Figma `📱 首页` (19:91) + `敲鼓玩法` (43:168) + `商店` (68:2) + `故事详情` (110:26) | 日期：2026-06-20 | 更新：成就灰化+英文中文化+教程层级
> 
> 本次更新：新增个人中心设计规范;商店Hero IP改为position:absolute;未解锁小狮保留原色
>
> 本文档为后续所有 Figma 绘制、小程序 UI 开发、原型产出的**唯一设计规范参考**。与 `品牌.md` 冲突时以此为准。

---

## 1. 画板规格

| 属性 | 值 | 说明 |
|------|-----|------|
| 设计基准 | **375 × 812 px** | iPhone X/11/12/13/14/15 标准 |
| 页面方向 | 竖屏锁定 | 禁止横屏 |
| 页面底色 | `#FFFFFF` | 纯白底 |
| 状态栏高度 | 88rpx (44px) | 顶部 safe area |
| 底部导航高度 | **66px** | 起始 y=746 |
| 页面左右安全边距 | **20px** | 内容区宽 = 335px |
| 内容区最大宽度 | **335px** | 375 - 20×2 |

### 1.1 全局布局

| 属性 | 值 |
|------|-----|
| body `display` | `block`（非 flex） |
| 手机容器尺寸 | 固定 `375×812` px |
| 容器居中 | `margin: 0 auto` |
| 滚动 | `html, body { overflow: hidden }` 已移除，页面滚动由子容器管理 |
| 状态栏 z-index | `30`，全局组件，所有页面共享，黑底 #1E1E1E 无时间文字 |

---

## 2. 色彩系统

### 2.1 核心色板

| Token | Hex | 用途 |
|--------|-----|------|
| `--color-white` | `#FFFFFF` | 页面底 / 卡片白底 / 底部导航底 / CTA 按钮底 |
| `--color-black` | `#000000` | 主标题文字 / CTA 按钮文字 / 弹窗标题 |
| `--color-brand-red` | **`#E31E15`** | 品牌红（选中态 tab / 播放按钮 / CTA 圆点） |
| `--color-brand-red-light` | `#F36F59` | 次级卡片背景 / 模式选择按钮背景（珊瑚粉） |
| `--color-gray-light` | `#D9D9D9` | 装饰元素 / 骨架屏灰度 / 弹窗拖动条 |
| `--color-gray-mid` | `#AAAAAA` | 未选中态文字 / 取消按钮文字 |
| `--color-gray-slate` | `#94A3B8` | 次标题说明文字（弹窗副标题/卡片副标题） |
| `--color-gray-dark` | `#333333` | 深灰文字/背景 |
| `--color-text-dark` | `#252525` | 子区域深色标题（舞狮故事） |
| `--color-cta-dark` | `#1E1E1E` | 播放按钮三角等深色图形 |
| `--color-cancel-bg` | `#F5F5F5` | 取消按钮背景 |

### 2.2 五行小狮色板

| 小狮 | Hex | 用途 |
|------|-----|------|
| 火火狮 🔥 | `#E31E15` | 火属性 / 敲鼓主视觉 |
| 水水狮 💧 | `#5AB8E8` | 水属性 / AR 拍照 |
| 金金狮 ✨ | `#D9A441` | 金属性 / 涂色奖励 |
| 木木狮 🌿 | `#65B96A` | 木属性 / 成就高分 |
| 土土狮 🪨 | `#9A6A3E` | 土属性 / 终极隐藏 |

### 2.3 状态色

| Token | Hex | 用途 |
|--------|-----|------|
| `--color-success` | `#34C759` | 保存成功 / 权限通过 |
| `--color-warning` | `#FFB020` | 未解锁提示 / 推荐标签 |
| `--color-error` | `#FF4D4F` | 加载失败 / 网络错误 |
| `--color-disabled` | `#C9CDD4` | 未解锁灰态 / 不可点击 |

### 2.4 CSS 变量

```css
:root {
  /* Core */
  --color-white: #FFFFFF;
  --color-black: #000000;
  --color-brand-red: #E31E15;
  --color-brand-red-light: #F36F59;
  --color-gray-light: #D9D9D9;
  --color-gray-mid: #AAAAAA;
  --color-gray-slate: #94A3B8;
  --color-gray-dark: #333333;
  --color-text-dark: #252525;
  --color-cta-dark: #1E1E1E;
  --color-cancel-bg: #F5F5F5;

  /* Five Lions */
  --color-fire: #E31E15;
  --color-water: #5AB8E8;
  --color-gold: #D9A441;
  --color-wood: #65B96A;
  --color-earth: #9A6A3E;

  /* States */
  --color-success: #34C759;
  --color-warning: #FFB020;
  --color-error: #FF4D4F;
  --color-disabled: #C9CDD4;

  /* Spacing */
  --page-margin: 20px;
  --content-width: 335px;
  --card-gap: 15px;
  --section-gap: 20px;

  /* Radius */
  --radius-card: 16px;
  --radius-button: 8px;
  --radius-tag: 8px;
  --radius-pill: 999px;

  /* Shadows */
  --shadow-card: 0 4px 16px rgba(0, 0, 0, 0.06);
  --shadow-hero: 0 8px 24px rgba(227, 30, 21, 0.12);
}
```

---

## 3. 字体体系

### 3.1 字体栈

| 字体 | 角色 | 使用场景 |
|------|------|---------|
| **MiSans Latin** | 中文主字体 | 标题、正文、功能入口文案 |
| **Inter** | 拉文字体 | 状态栏、底部导航文字、辅助标注 |
| **DIN** | 装饰字体 | Hero 英文点缀（Hello!） |

> 微信小程序中 MiSans 为系统字体，可直接使用。Inter/DIN 用于设计稿占位，小程序中回退到系统字体。

### 3.2 字号层级

| 层级 | 字号 | 字重 | 字体 | 用途 |
|------|------|------|------|------|
| **Hero English** | 38px | 700 (Bold) | DIN | "Hello!" 英文点缀 |
| **Hero Title** | 30px | 700 (Heavy) | MiSans Latin | "一起来敲鼓" |
| **Page Title** | 20px | 630 (Bold) | MiSans Latin | 区域标题："小狮子""狮子拍照""狮子绘画" |
| **Sub Title** | 16px | 520 (Semibold) | MiSans Latin | 子区域标题："舞狮故事" |
| **Card Subtitle** | 12px | 380 (Medium) | MiSans Latin | 副标题："画你的专属狮子吧""快来一起拍照吧" |
| **CTA Text** | 12px | 520 (Semibold) | MiSans Latin | CTA 按钮："快来一起来敲鼓吧" |
| **Status Bar** | — | — | — | 黑底 #1E1E1E，无文字 |
| **Tab Active** | 12px | 600 (Semi Bold) | Inter | 选中态 tab 文字 |
| **Tab Inactive** | 12px | 500 (Medium) | Inter | 未选中态 tab 文字 |
| **Modal Title** | 20px | 630 (Bold) | MiSans Latin | 弹窗标题 "选择玩法" |
| **Modal Sub** | 12px | 380 (Medium) | MiSans Latin | 弹窗副标题 #94A3B8 |
| **Modal Option** | 20px | 630 (Bold) | MiSans Latin | 模式选择按钮文字 |
| **Cancel Btn** | 16px | 380 (Medium) | MiSans Latin | "取消" 按钮文字 |

### 3.3 字重对照表

| 名称 | 数值 | 用途 |
|------|------|------|
| Heavy | 700 | Hero 超大标题 |
| Bold | 630-700 | 页面/区域标题 |
| Semibold | 520-600 | 子标题 / CTA |
| Medium | 380-500 | 正文 / 副标题 / 说明文字 |

> 注：WXSS 仅支持标准 CSS font-weight 值（100-900 整百倍），Figma 中的 630/520/380/330 已分别映射为 600/500/400/300。

---

## 4. 布局系统

### 4.1 页面结构（从上到下）

| 区域 | y 起点 | 高度 | 宽度 | 说明 |
|------|--------|------|------|------|
| 状态栏 | 0 | 88rpx (44px) | 375px | 纯黑底 #1E1E1E，无文字 |
| 页面标题 | ~40 | 27px | auto | "小狮子" 居中 |
| Hero 卡片 | **83** | **202px** | 335px | 敲鼓主入口卡 |
| 次级卡片行 | **301** | 121px | 2×160px | AR拍照 + 涂色装饰 |
| 舞狮故事 | **438** | — | — | 趣闻列表区域 |
| 底部导航 | **746** | 66px | 375px | 3 tab 导航 |

### 4.2 间距规范

| 关系 | 间距 |
|------|------|
| 页面左右边距 | 20px |
| Hero 卡 → 次级卡 | 18px (301-283) |
| 次级卡之间 | 15px |
| 卡片内边距 | 17px (标题 offset) |
| 卡片内标题到副标题 | 8px |
| 底部导航 icon 到文字 | 3px |

---

## 5. 组件规范

### 5.1 Hero 卡片 (25:223 "Frame 2")

```
┌──────────────────────────────────┐ 335×202
│  Hello !               ░░░░░░░░ │ ← 右上角：4×4 圆点矩阵 SVG 90×69（渐变 #ED4F3E→#F05C49）
│  一起来敲鼓               ░░░░░░ │    小狮 IP 图片 193×193 置于圆点矩阵上层
│  做游戏吧               🦁   │ ← Hello(x17,y29)+!(x121.71,y27) DIN Bold 38px #FFF
│  ┌────────────────────────┐ ══╗ │   "!" 比 Hello 高 2px
│  │ 快来一起来敲鼓吧       │ ▶ ║ │ ← MiSans 30px Heavy 白 / MiSans 12px Medium 白
│  └────────────────────────┘ ══╝ │ ← CTA 白底 146×31 圆角8px, ▶ SVG 红圆播放按钮
└──────────────────────────────────┘
     圆角 16px                        ▶按钮 SVG `btn-play.svg`（红圆 + 黑三角）
```

**Hero 文字节点明细：**

| 文字 | 节点 ID | 字体 | 字号 | 位置 (Frame 2 内) | 颜色 |
|------|---------|------|------|-------------------|------|
| "Hello" | 25:11 | DIN Bold | 38px | x=17, y=29 | `#FFFFFF` |
| "!" | 25:18 | DIN Bold | 38px | x=121.71, y=27 | `#FFFFFF` |
| "一起来敲鼓" | 25:17 | MiSans Heavy | 30px | x=17, y=64 | `#FFFFFF` |
| "做游戏吧" | — | MiSans Medium | 12px | x=17, y=104 | `#FFFFFF` |

**Hero 装饰元素（新增 V2.3）：**

| 元素 | 规格 | 文件 |
|------|------|------|
| 圆点矩阵 | 90×69 px, 右上角, 渐变 `#ED4F3E`→`#F05C49` | `hero-dots.svg` |
| 小狮 IP 图 | 193×193 px, right:0, top:9 | `全部内容\3Dicon\12c28603...png` |
| CTA 播放钮 | 红圆 SVG + 黑三角 | `btn-play.svg` |

> **关键：** "Hello" 和 "!" 是两个独立文本节点，"!" 位置比 "Hello" 高 2px（y=27 vs y=29），形成俏皮的错位效果。

**CTA 按钮详细规格：**
- 容器：白色 `#FFFFFF`，146×31 px，圆角 8px，x=14, y=149
- 文字："快来一起来敲鼓吧"，MiSans Semibold 12px，`#000000`，x=8, y=7
- ▶ 播放按钮：红色椭圆 `#E31E15` 直径 14px + 黑色三角 Polygon `#1E1E1E` 7×7px
- ▶ 按钮位于 CTA 右侧 x=123, y=9

> **V2.7 交互变更：** 点击 Hero 卡片直接进入敲鼓选曲页，不再弹出模式选择弹窗（"单人/亲子"）。

### 5.2 次级功能卡片 (25:7 "AR拍照" / 25:22 "涂色装饰")

```
┌─────────────────────┐ 160×121
│  狮子拍照            │ ← MiSans 20px Bold #FFFFFF
│  快来一起拍照吧      │ ← MiSans 12px Medium #FFFFFF
│           ┌───┐      │
│           │ 🦁 │     │ ← 3D 图标 78×78（来自 `全部内容\3Dicon\`）
│           └───┘      │
│  ░░░░░░░░░░░░░░░░░  │ ← 点阵 SVG 160×48（渐变 #FFA595→#F36F59）
└─────────────────────┘
      圆角 16px
      背景 #F36F59 (珊瑚粉)
```

| 属性 | 值 |
|------|-----|
| 尺寸 | 160×121 px |
| 圆角 | 16px |
| 背景色 | `#F36F59` |
| 标题 | MiSans Bold 20px #FFFFFF, x=17, y=10 |
| 副标题 | MiSans Medium 12px #FFFFFF, x=17, y=35 |
| AR 图片 | 78×78px, x=82, y=43 |
| 涂色图片 | 69.63×69.63px, x=90, y=51 |
| 圆点装饰 | 底部 47px 高区域，5列圆点网格，#D9D9D9 |

### 5.3 底部导航栏 (25:26 "Frame 1")

| Tab | icon 尺寸 | 文字 | 选中态 | 未选中态 |
|-----|----------|------|---------|-----------|
| 🏠 首页 | 37×38 px | "首页" | `#E31E15` 12px Inter Semi Bold 600 | — |
| 🛒 商店 | 45×38 px | "商店" | — | `#AAAAAA` 12px Inter Medium 500 |
| 👤 我的 | 43×44 px | "我的" | — | `#AAAAAA` 12px Inter Medium 500 |

- 导航栏高 66px，背景 `#FFFFFF`，满屏宽 375px
- Tab 文字在 icon 下方 3px
- 首页 icon 位置: x=58,y=6
- 商店 icon 位置: x=172,y=6
- 我的 icon 位置: x=289,y=3

### 5.4 状态栏

| 属性 | 值 |
|------|-----|
| 高度 | 88rpx (44px)，动态获取设备状态栏高度 |
| 背景 | `#1E1E1E`（纯黑底） |
| 内容 | 无时间文字（纯黑底留白） |

### 5.5 页面标题

| 属性 | 值 |
|------|-----|
| 文字 | "小狮子" |
| 字体 | MiSans Latin Bold 20px |
| 颜色 | `#000000` |
| 对齐 | 页面居中 |

### 5.6 舞狮故事标题

| 属性 | 值 |
|------|-----|
| 文字 | "舞狮故事" |
| 字体 | MiSans Latin Semibold 16px |
| 颜色 | `#252525` |
| 位置 | x=20, y=438 |

### 5.7 模式选择弹窗 (V2.5 已移除)

> **已移除。** 首页 Hero 卡片点击直接进入曲目列表页，不再弹出模式选择弹窗。下方为历史参考规格，仅保留供后续迭代参考。

```
┌──────────────────────────────────┐
│  ═══                             │ ← 拖动条 40×4, #D9D9D9, 圆角2, 居中y=8
│          选择玩法                │ ← MiSans Bold 20px #000000, y=24
│   选择一种游戏模式开始吧！       │ ← MiSans Medium 12px #94A3B8, y=46
│                                  │
│  ┌────────────┐ ┌────────────┐  │
│  │            │ │   👨‍👦     │  │ ← 两卡片 152×130, 圆角16, #F36F59
│  │   🥁图标   │ │            │  │   (左: 02_鼓鼓.png 84×68)
│  │            │ │   亲子配合  │  │   (右: emoji 占位 36×36)
│  │  单人敲鼓  │ │            │  │   MiSans Bold 20px #FFFFFF
│  └────────────┘ └────────────┘  │   左x=20, 右x=203, y=70
│                                  │
│  ┌────────────────────────────┐  │
│  │           取消              │  │ ← 335×44, 圆角8, #F5F5F5
│  └────────────────────────────┘  │   MiSans Medium 16px #AAAAAA
└──────────────────────────────────┘   y=226
    375×320, 顶部圆角16, 底平
    背景 #FFFFFF
```

**遮罩层 (39:3)：**
- 375×812 px，`#000000`，不透明度 35%
- 点击关闭弹窗

**属性表：**

| 元素 | 规格 |
|------|------|
| 弹窗容器 | 375×320，圆角(16,16,0,0)，`#FFFFFF` |
| 拖动条 | 40×4，圆角 2px，`#D9D9D9`，居中 x=167 |
| 弹窗标题 | MiSans Bold 20px，`#000000`，x=147,y=24 |
| 副标题 | MiSans Medium 12px，`#94A3B8`，x=113,y=46 |
| 选项卡片 | 152×130，圆角 16px，`#F36F59` |
| 选项文字 | MiSans Bold 20px，`#FFFFFF`，x=36（居中） |
| 选项图标 | 左卡：90×90，x=49,y=75；右卡：95×95，x=28,y=6 |
| 取消按钮 | 335×44，圆角 8px，`#F5F5F5`，x=20,y=226 |
| 取消文字 | MiSans Medium 16px，`#AAAAAA`，x=169,y=236 |
| 遮罩层 | 375×812，`#000000`，opacity 0.35 |

**间距：**
- 拖动条 → 标题：16px
- 标题 → 副标题：22px
- 副标题 → 选项卡片：24px
- 选项卡片 → 取消按钮：26px
- 选项卡片间距：31px (203-172)

### 5.7.1 曲目选择页（V2.7 新增）

> 点击 Hero 卡片直接进入本页，不再弹出模式选择弹窗。

**页面头部：**

| 属性 | 值 |
|------|-----|
| 标题 "选择曲目" | 居中 (`flex:1; text-align:center`)，左右对称 back-btn + spacer（64rpx） |
| 底部 padding | 同首页"小狮子"标题（y≈40, 20px Bold, #000000） |

### 5.8 单人游戏页（鼓面 + 敲击交互）

```
┌──────────────────────────────────┐
│  ← 返回      ████████░░  60%    │ ← game-header 56px, 进度条 #E31E15
├──────────────────────────────────┤
│         🦁 IP 动作图 240×240rpx │ ← 动态动作图，根据连击数实时切换
│                                  │
│           ┌──────────┐           │
│   ╲       │  🥁 敲这里 │    ╱    │ ← 鼓棒 160px, 半透明体+实线边缘
│    ╲   ┌──┴──────────┴──┐ ╱     │   左棒倾角 -25°~-55°, 右棒 25°~55°
│     ╲  │                 │╱      │
│      ╲ │  ┌──────────┐  │╱      │ ← 鼓面 340×340, 底部 66px 间距
│       ╲│  │          │  │╱      │
│        │  │ 虚线提示区 │  │      │ ← hit-zone 虚线框标记命中位置
│        │  │          │  │      │
│  ╱     │  └──────────┘  │   ╲   │
│ ╱      └────────────────┘    ╲  │
│      外圈缩圈（2.5→0.4, 1.5s）   │ ← 缩圈从外向内收缩
├──────────────────────────────────┤
│    [66px 底部导航栏占位]         │
└──────────────────────────────────┘
```

**鼓面规格：**

| 属性 | 值 |
|------|-----|
| 鼓面尺寸 | 340×340 px, 圆形, #2a2a2a |
| 底部间距 | **66px**（对齐底部导航栏上沿） |
| 击打区 | 外圈缩圈机制（2.5→0.4, 1.5s），6个活跃命中区可点（含两端齐敲） |

**6 种敲击交互类型：**

| 类型 | 命中区标记 | 鼓棒方向 | 实际命中区尺寸 |
|------|-----------|---------|--------------|
| ① 中心左面单敲 | 中心圆左侧高亮区 (80×80 px) | 左棒 | 左侧 160rpx×160rpx |
| ② 中心右面单敲 | 中心圆右侧高亮区 (80×80 px) | 右棒 | 右侧 160rpx×160rpx |
| ③ 中心双面齐敲 | 中心大高亮区 (120×120 px) | 双棒同时 | 中心 240rpx×240rpx |
| ④ 边缘左/右侧单敲 | 边缘竖线标记 (40×80 px) | 对应侧棒 | rim-left/right 80rpx×160rpx |
| ⑤ 边缘两侧齐敲 | 两侧边缘标记同时亮 | 双棒同时 | 两侧 rim |

**鼓棒样式：**
- 160×14 px（rpx换算），边缘 6rpx 实线 #CCCCCC，中间透明 rgba(180,180,180,0.1)
- 出现时机：外圈缩至与内圈重合（scale ≤ 1.0）时出现
- 敲击后按判定变色：太棒啦 #E31E15 / 不错哦 #65B96A / 太快啦 #FFB020 / 漏掉了 #C9CDD4
- 中心敲击倾斜 25°, 边缘敲击倾斜 45-55°

**缩圈判定系统：**
- 外圈从 2.5 向内收缩至 0.4（1.5s），50fps（20ms/tick）
- 判定基于敲击时刻外圈与内圈（1.0）的重合度

**判定文字：**
- 太棒啦 #E31E15 / 不错哦 #65B96A / 太快啦 #FFB020 / 漏掉了 #C9CDD4
- 弹出动画 scale + 上浮消失, 0.8s

**节奏：**
- 拍间距 800ms（原型），接入音频后对齐 BPM
- 超时 miss: 外圈缩至 0.4（约 1260ms）
- 命中区高亮脉冲动画

### §5.8.0 游戏页上部 IP 动作图（V2.7 新增）

游戏进行页上方显示动态 IP 动作图，根据连击数实时切换：

| 连击数 | 动作图 | 说明 |
|--------|--------|------|
| 0-1 | 活力满满 | 默认起始 |
| 2-4 | 自信就位 | 连击上升 |
| 5+ | 威风凛凛 | 状态升级 |
| Miss(漏掉) | 眼睛发亮 | 断连回退 |

| 属性 | 值 |
|------|-----|
| 尺寸 | 360×360rpx |
| 居中 | 水平居中，位于进度条下方 |
| 切换方式 | 根据连击数实时切换（无过渡动画，直接替换） |

> **V2.7 变更：** 进度条使用品牌红 `#E31E15`（不再使用三色渐变）。底部拍点提示文字已移除。

### §5.8.1 倒计时页（2026-06-18 重设计）

| 属性 | 值 |
|------|-----|
| 页面结构 | 纯白全屏层（`position: fixed; left:0;right:0;top:0;bottom:0`） |
| 标题 "准备" | MiSans Latin Bold 20px #000000, 居中, `position: absolute; left:0; right:0; text-align: center` |
| 倒计时数字 | MiSans Latin Heavy, #E31E15 品牌红, 240rpx, `position: absolute; top:50%; left:0; right:0; text-align: center; transform: translateY(-50%)` |
| 动画 | pulse 缩放+透明度 (0.6s ease-in-out) |
| 返回按钮 | 无（倒计时自动完成进入游戏） |
| 序列 | 3→2→1→"开始！", 每步 600ms |

### 5.9 游戏结果页

```
┌──────────────────────────────────┐
│                                  │
│         ┌──────────────┐         │
│         │  IP 动作大图  │         │ ← 240×240rpx, aspectFit, 按星级映射
│         └──────────────┘         │
│                                  │
│            ⭐⭐⭐⭐⭐              │ ← 36px, 逐颗弹出 200ms/颗
│          舞狮大师！              │ ← MiSans 22px Bold #E31E15
│                                  │
│    ✨ 太棒啦 N次  👍 不错哦 N次  │ ← 14px，始终展开显示
│    得分/连击按星级着色            │
│                                  │
│    ┌──────────┐ ┌──────────┐     │
│    │ 🔄 重试   │ │ 🏠 返回  │     │ ← 130×48, 圆角8, 重试图标 /images/3d-icons/retry.png
│    └──────────┘ └──────────┘     │
│                                  │
└──────────────────────────────────┘
     垂直居中, flex column
```

| 元素 | 规格 |
|------|------|
| 布局 | 垂直居中 (`flex:1; justify-content:center`) |
| IP 动作图 | **360×360rpx**, aspectFit, 按星级映射 4 张动作图（§5.9.1） |
| 星级 | 2-5 颗, 36px, 从左到右逐颗弹出 |
| 称号 | 22px Bold #E31E15 (S:太厉害了！舞狮大师! / A:好棒呀！舞狮小能手! / B:不错哦！再练练就更好了！ / C:加油加油！你可以的！) |
| 详情 | 14px: ✨ 太棒啦 / 👍 不错哦 + 得分/连击按星级着色 |
| 按钮 | 130×48, 圆角 8px, [重试]白底 + 图标 /images/3d-icons/retry.png 同行 / [返回]黑底白字 |
| 判定语 | ✨ 太棒啦!(红) / 👍 不错哦!(绿) / ⚡ 太快啦!(金) / 😅 漏掉了(灰) |
| 提示语 | 👈 敲左边！/ 敲右边！ 👉 / 👈 一起敲中间！ 👉 / 👈 敲左边鼓边！/ 右边鼓边敲！ 👉 |
| 解锁触发 | 首次通关（≥B）弹出居中 modal 弹窗 |

### §5.9.1 结算页 IP 动作图

素材来源：`全部内容/IP形象/动作/*.png`（8 张，已压缩至 miniprogram/images/ip-actions/）

| 星级 | 图片 | 尺寸 |
|------|------|------|
| ⭐⭐⭐⭐⭐ | 威风凛凛.png | 360×360rpx |
| ⭐⭐⭐⭐ | 活力满满.png | 360×360rpx |
| ⭐⭐⭐ | 自信就位.png | 360×360rpx |
| ⭐⭐ | 眼睛发亮.png | 360×360rpx |

### 5.10 返回按钮（全局统一）

```
┌──┐
│← │  ← 32×32, border-radius:8px, 2px solid
└──┘
```

| 属性 | 值 |
|------|-----|
| 尺寸 | 64rpx × 64rpx |
| 圆角 | `border-radius: 16rpx` |
| 图标 | ← 箭头，灰色 `#AAAAAA`（无方形边框） |
| 深色页面（相机/编辑） | 白色 `#FFFFFF` |
| 浅色页面 | 灰色 `#AAAAAA` |

### 5.11 权限弹窗

| 属性 | 值 |
|------|-----|
| 遮罩层 | `pointer-events: none` |
| 弹窗卡片 | `pointer-events: auto` |
| 快门行为 | 点击快门 → 自动关闭权限弹窗 → 拍照 |
| 状态栏 | `z-index: 30`，全局组件，所有页面共享 |

### 5.11.1 快门栏（新增 V2.3）

| 元素 | 规格 |
|------|------|
| 快门栏高度 | **168rpx**（84px），背景 `#1a1a1a` |
| 快门按钮 | 160×160rpx 圆形，白色边框 6rpx，**圆心对齐栏顶边**（绝对居中） |
| 相册图标 | 88×88rpx，图片 `icon-album.png`，下方标注"相册"（22rpx, rgba(255,255,255,0.7)） |
| 翻转图标 | 88×88rpx，图片 `flip-camera.png`，下方标注"翻转" |
| 左右布局 | `justify-content: space-between`，padding 100rpx |
| 页面标题 "狮子拍照" | 40rpx Bold #FFFFFF，绝对居中 |

### 5.12 贴纸选择页（更新 V2.4）

**页面头部：**

| 属性 | 值 |
|------|-----|
| 标题 "选择贴纸" | 40rpx Bold #000000，居中（与"狮子拍照"字号/字重一致） |
| 布局 | 返回按钮 ← + 居中标题 + 右侧占位（64rpx 保持对称） |

**贴纸卡片（对齐首页次级卡片尺寸）：**

| 属性 | 值 |
|------|-----|
| 尺寸 | 320×242rpx（与首页"狮子拍照"卡片完全一致） |
| 列数 | 2 列，gap 30rpx，`justify-content: space-between` |
| 圆角 | 32rpx |
| 背景 | #F5F5F5（默认）/ #FFF5F3（选中态） |
| 选中态 | 品牌红边框 `4rpx solid #E31E15`，`box-sizing: border-box` + 默认 `4rpx solid transparent` 占位防止布局跳动 |
| 未解锁蒙版 | `rgba(0,0,0,0.45)` 全遮 + 🔒 锁图标 |
| 底部按钮 | "下一步：编辑位置"，品牌红 #E31E15 全宽，未选中时 #C9CDD4 禁用态 |
| 卡片比例 | 固定尺寸 320×242rpx |
| 已解锁 | 彩色 + 小狮名称 |
| 未解锁 | 灰色 + 🔒 锁图标 |

**底部按钮：**

| 属性 | 值 |
|------|-----|
| 按钮 | "下一步：编辑位置"（单按钮，`btn-quick` 已删除） |
| 宽度 | 全宽 |
| 背景色 | `#E31E15`（品牌红） |
| 对齐 | 居中对齐 |
| 默认态 | `btn-disabled` 灰色态，选中贴纸后激活 |

**锁弹窗（V2.7 新增）：**
- 未解锁贴纸卡片可点击，弹出居中锁弹窗
- 白色圆角卡片 + 🔒 锁图标 + 小狮名称 + 解锁条件 + "我知道了"品牌红按钮（`#E31E15`）
- 遮罩 `rgba(0,0,0,0.35)`，点击遮罩可关闭弹窗

### 5.13 贴纸编辑页（更新 V2.6）

**布局结构：**

```
┌─────────────── 375px ───────────────┐
│  ← 返回       编辑贴纸               │ ← 标题居中，无右上角按钮
├──────────────────────────────────────┤
│     ┌─────────────────────┐          │
│     │                     │          │
│     │  照片（撑满预览区）  │  全版式  │
│     │  [贴纸 250% 默认]    │  可拖拽  │
│     │  双指缩放 / 双指旋转 │  手势    │
│     │                     │          │
│     └─────────────────────┘          │
│     ┌─────────────────────┐          │
│     │       完成           │ ← 全宽   │
│     └─────────────────────┘          │
└──────────────────────────────────────┘
```

| 区域 | 规格 |
|------|------|
| 照片预览 | width:100%; height:100%，撑满 `.edit-preview`；`border-radius:16rpx` |
| 贴纸默认大小 | **250%**（2.5x），单指拖拽移动 |
| 双指缩放 | 两指间距变化 Pinch → 贴纸缩放 |
| 双指旋转 | 两指连线角度变化 → 贴纸旋转 |
| 完成按钮 | 红底白字 `#E31E15`，全宽 `height:88rpx; border-radius:16rpx`；容器 `padding:16rpx 40rpx` |

**V2.6 变更：**
- ❌ 大小/旋转滑块已移除 → ✅ 双指捏合缩放 + 双指旋转手势
- ❌ 🗑删除贴纸按钮已移除
- 照片预览 300px 固定 → 撑满编辑区（`width:100%; height:100%`）
- 完成按钮上移 16px，全宽居中

### 5.14 商店列表页

**页面结构（Figma 68:2 实测）：**

```
┌─────────────── 375px ───────────────┐
│  (黑底纯色, 无文字)                   │ ← 状态栏 88rpx(44px)
├──────────────────────────────────────┤
│           🛒 商店       (x=168,y=40) │ ← 标题20px Bold #000
├──────────────────────────────────────┤
│  ┌── IP形象 position:fixed ─────┐   │
│  │   342×510rpx right:22rpx     │   │ ← "元气十足" 置顶于卡片上方
│  │  ┌────────────────────────┐  │   │
│  │  │ Hello !               │  │   │ ← Hero卡 335×142, y=86, 圆角16
│  │  │ 小狮子       🦁       │  │   │   渐变红 #E31E15→#F4725C
│  │  │ ┌────────────────────┐ │  │   │   SVG圆点 shop-hero-dots.svg
│  │  │ │快来挑选你喜欢的狮子│ │  │   │   CTA 159×31 圆角8 白底黑字
│  │  │ └────────────────────┘ │  │   │
│  │  └────────────────────────┘  │   │
│  └──────────────────────────────┘   │
├──────────────────────────────────────┤
│  [全部] [小狮公仔] [周边]    y=244  │ ← MiSans 14px, 间距12px
├──────────────────────────────────────┤
│  ┌──────────┐                        │
│  │ [3D IP图]│  ← 商品卡片 160×266   │
│  │  191px   │     圆角16, 白底       │
│  │ 火火狮   │     名称14px Semibold  │
│  │ ¥38      │     价格16px Bold 红   │
│  │ 温和又稳  │     描述12px Regular  │
│  │ 重的小狮 │     #7d7d7d           │
│  └──────────┘                        │
├──────────────────────────────────────┤
│  🏠 首页   🛒 商店   👤 我的        │ ← 底部导航 66px
└──────────────────────────────────────┘
```

**Hero 卡片（商店版）：**

| 属性 | 值 |
|------|-----|
| 尺寸 | 335×142 px |
| 位置 | x=20, y=86 |
| 圆角 | 16px |
| 背景 | `linear-gradient(90deg, #E31E15 0%, #F4725C 100%)` |
| "Hello" | DIN Bold 38px #FFFFFF, x=17, y=13 |
| "!" | DIN Bold 38px #FFFFFF, x=121.71, y=11（比 Hello 高 2px） |
| "小狮子" | MiSans Heavy 30px #FFFFFF, x=17, y=48 |
| IP形象 | "元气十足" 342×510rpx (114×170px×1.5), position:absolute 置于卡片内上层, right:22rpx, top:50%// 垂直居中 |
| SVG圆点 | `shop-hero-dots.svg` (28点, 90×69px, 渐变填充 #ED4F3E→#F05C49, x=245,y=11) |
| CTA 容器 | 159×31 px, x=17, y=96, 白底 #FFFFFF 圆角8px |
| CTA 文字 | "快来挑选你喜欢的狮子吧", MiSans Semibold 12px #000000 |

**分类标签：**

| 属性 | Figma 实测值 |
|------|-------------|
| 字号 | 14px MiSans Latin |
| 选中态 | Bold 630 #E31E15 |
| 未选中态 | Medium 380 #AAAAAA |
| 布局 | 横向，gap:12px，x起点 20/60/128, y=244 |
| 下划线 | 无独立元素（依赖品牌色标记选中态） |

**商品卡片（Figma Frame 5 实测）：**

| 属性 | Figma 实测值 |
|------|-------------|
| 尺寸 | 160×266 px |
| 圆角 | 16px |
| 背景 | #FFFFFF |
| 图片占位区 | 160×191 px, 背景 #edeaea |
| 商品图片 | 131×178 px, 使用3D IP形象图: 火火狮→fire-lion.png, 水水狮→water-lion.png, 金金狮→gold-lion.png, 木木狮→wood-lion.png, 土土狮→earth-lion.png, x=14, y=7（居中偏上） |
| 商品名 | MiSans Semibold 520 14px #000000, x=8, y=198 |
| 价格 | MiSans Bold 630 16px #E31E15, x=8, y=221 |
| 描述 | MiSans Regular 330 12px #7d7d7d, x=8, y=242 |

---

### 5.15 个人中心页 (`pages/mine/mine`)

**页面结构：** `page > status-bar + scroll-view`，底部导航栏始终显示。

#### 5.15.1 用户卡片（Hero 风格，对齐商店 Hero）

| 属性 | 值 |
|------|-----|
| 尺寸 | 670×284rpx |
| 圆角 | 32rpx |
| 背景 | `linear-gradient(90deg, #E31E15 0%, #F4725C 100%)` |
| 位置 | `margin: 52rpx 40rpx 24rpx` |
| 圆点 SVG | `mine-hero-dots.svg`, right:0, top:22rpx, 180×138rpx, z-index:1 (来源：`全部内容/背景/背景1.svg`) |
| 头像框 | 144rpx 圆形, `position:absolute; left:34rpx; top:50%`, 白色半透明边框 `6rpx solid rgba(255,255,255,0.4)`, 半透明底色 `rgba(255,255,255,0.2)` |
| 默认头像 | `icon-mine-avatar.png`, 80rpx, 居中于头像框内 |
| 昵称 | "小狮子", 40rpx Bold #FFFFFF |
| ID | "ID: LION0001", 24rpx rgba(255,255,255,0.65) |
| 布局 | `position: relative; overflow: visible`（IP头像 absolute 左侧，文字 absolute 右侧 left:204rpx） |

#### 5.15.2 通用卡片

| 属性 | 值 |
|------|-----|
| 外边距 | `0 40rpx 24rpx` |
| 背景 | #FFFFFF |
| 圆角 | 24rpx |
| 内边距 | `32rpx 32rpx 24rpx` |
| 阴影 | `0 4rpx 20rpx rgba(0,0,0,0.04)` |
| 标题图标 | 40rpx, `icon-collect.png` / `icon-achievement.png` / `icon-color.png` |
| 标题文字 | 30rpx Bold #1A1A1A |

#### 5.15.3 小狮收集

| 属性 | 值 |
|------|-----|
| 小狮卡片 | `flex:1`, 200rpx 高, 20rpx 圆角, 背景 #FAFAFA, `position:relative` |
| 已解锁 | 3D IP 形象图, 72rpx (`mine-fire.png` 等), 名称 22rpx #333333 |
| 未解锁 | 3D IP 形象图, **opacity 0.55（保留原色）**, `lock-3d.png` 40rpx absolute 居中 |
| 称号 | "🏅 舞狮小传人", 26rpx Bold #E31E15, 背景 #FFF0EF, 居中文案 |
| 进度条 | 8rpx 高, 背景 #F0F0F0, 填充渐变 `#E31E15→#FF5A4A` |
| Badge | "X/5", 26rpx #E31E15, 背景 #FFF0EF, padding 6rpx 20rpx, 20rpx 圆角 |

**小狮 3D 形象来源（`全部内容/IP形象/3D形象/`）：**

| 文件 | 用途 |
|------|------|
| `mine-fire.png` | 火火狮 |
| `mine-water.png` | 水水狮 |
| `mine-gold.png` | 金金狮 |
| `mine-wood.png` | 木木狮 |
| `mine-earth.png` | 土土狮 |

#### 5.15.4 成就卡片

| 属性 | 值 |
|------|-----|
| 卡片 | `width:200rpx`, `flex-shrink:0`, `background: #FAFAFA`, 20rpx 圆角, `padding:28rpx 16rpx 22rpx` |
| 图标 | 64rpx (`achi-star1/star2/combo/highscore/plays.png` + `icon-camera/paint.png`) |
| 名称 | 24rpx Bold #1A1A1A |
| 描述 | 20rpx #949494 |
| 未解锁 | `background: #E0E0E0`（灰色方形底色）, 点击弹窗显示解锁条件 |
| 数量 | 10 张（8鼓点+1AR+1涂色）, 左右 `scroll-view` 滑动 |

#### 5.15.5 作品网格

| 属性 | 值 |
|------|-----|
| 缩略图 | `flex:1`, `aspect-ratio:1`, 20rpx 圆角, 背景 #FAFAFA, 🎨 emoji 48rpx #CCCCCC |
| 空状态 | "还没有作品，去创作吧~", 26rpx #AAAAAA, `padding:48rpx 0` |

#### 5.15.6 快捷菜单

| 属性 | 值 |
|------|-----|
| 菜单项 | `display:flex; justify-content:space-between`, `padding:28rpx 8rpx` |
| pressed 态 | `opacity: 0.6` |
| 图标 | 44rpx (`icon-drum-record.png` / `icon-ar-record.png` / `icon-order.png`) |
| 文字 | 28rpx Medium #1A1A1A |
| 箭头 | `›`, 36rpx #CCCCCC |
| 分隔线 | 2rpx #F5F5F5, `margin:0 8rpx` |
| 底部占位 | 156rpx（避免被底部导航遮挡） |

**3D 图标来源（`全部内容/3Dicon/` + `全部内容/图标png/`）：**

| 文件 | 用途 |
|------|------|
| `lock-3d.png` | 未解锁锁定图标 |
| `icon-combo.png` | 连击成就 |
| `icon-camera.png` | 拍照成就 |
| `icon-paint.png` | 绘画成就 |
| `icon-drum-record.png` | 敲鼓成绩菜单 |
| `icon-ar-record.png` | AR 照片菜单 |
| `icon-order.png` | 我的订单菜单 |
| `icon-collect.png` | 小狮收集标题 |
| `icon-achievement.png` | 成就标题 |
| `icon-color.png` | 作品标题 |
| `icon-mine-avatar.png` | 默认头像占位 |

## 6. 圆角与阴影
| 元素 | 圆角 | 阴影 |
|------|------|------|
| Hero 卡片 | 16px | 无显式阴影（依赖背景色差） |
| 次级功能卡片 | 16px | 无显式阴影 |
| CTA 按钮 | 8px | 无 |
| 模式选择卡片 | 16px | 无 |
| 取消按钮 | 8px | 无 |
| 弹窗面板 | 16px（仅顶部） | 无 |
| 推荐标签 | 8px (Pill) | 无 |
| 底部导航 | 无圆角 | 无 |

---

## 7. 图标规范

### 7.1 底部导航图标

| Tab | 文件 | 尺寸 | 格式 |
|-----|------|------|------|
| 首页 | `tab-home.png` | 128×128 → 37×38 显示 | PNG |
| 商店 | `tab-shop.png` | 128×128 → 45×38 显示 | PNG |
| 我的 | `tab-mine.png` | 128×128 → 43×44 显示 | PNG |

- 选中态：彩色 PNG
- 未选中态：黑白 PNG（`图标png-黑白/` 目录）或 CSS `filter: grayscale(1)` 实时切换

### 7.2 功能入口图标

| 功能 | 文件 | 显示尺寸 |
|------|------|---------|
| 敲鼓游戏 | `图标png/02_鼓鼓.png` | 40×40 px |
| AR 拍照 | `图标png/03_AR拍照.png` | 40×40 px |
| 涂色装饰 | `图标png/04_涂色.png` | 40×40 px |

---

## 8. 触控交互规范

| 用户 | 最小触摸目标 | 说明 |
|------|------------|------|
| 儿童（4-12 岁） | ≥ 72px | 主要按钮 |
| 次要按钮 | ≥ 56px | 辅助操作 |
| 底部导航 | 整栏可点击 | icon+文字区域 |

| 手势 | 反馈 |
|------|------|
| 点击（Tap） | 缩放 0.95 + 透明度 0.85，120ms ease-out |
| 长按（Long Press） | 600ms 触发，震动反馈 |
| 拖拽（Drag） | 12px dead zone 防误触 |

---

## 9. 动效参数

| 场景 | 时长 | 缓动 |
|------|------|------|
| 页面 Push | 320ms | ease-out |
| 页面 Pop | 280ms | ease-in |
| 弹窗上滑出现 | 300ms | ease-out |
| 弹窗下滑关闭 | 250ms | ease-in |
| 点击 pressed | 120ms | ease-out |
| 解锁动画 | 300ms | spring(0.34, 1.56, 0.64, 1) |
| 骨架屏脉冲 | 1.5s 循环 | — |

---

## 10. 页面级文字内容

### 10.1 首页文案（Figma 实测）

| 位置 | 文案 | 字号/字重 |
|------|------|-----------|
| 状态栏 | 纯黑底 #1E1E1E，无文字 | — |
| 页面标题 | 小狮子 | MiSans 20px Bold, x=158,y=40 |
| Hero 英文 | Hello | DIN 38px Bold, x=17,y=29 |
| Hero 标点 | ! | DIN 38px Bold, x=121.71,y=27 (比 Hello 高 2px) |
| Hero 标题 | 一起来敲鼓 | MiSans 30px Heavy |
| Hero 模式提示 | 做游戏吧 | MiSans 12px Medium |
| Hero CTA | 快来一起来敲鼓吧 | MiSans 12px Semibold |
| AR 卡片标题 | 狮子拍照 | MiSans 20px Bold, x=17,y=10 |
| AR 卡片副标题 | 快来一起拍照吧 | MiSans 12px Medium, x=17,y=35 |
| 涂色卡片标题 | 狮子绘画 | MiSans 20px Bold, x=17,y=10 |
| 涂色卡片副标题 | 画你的专属狮子吧 | MiSans 12px Medium, x=17,y=35 |
| 底部 nav-首页 | 首页 | Inter 12px Semi Bold 600 #E31E15 |
| 底部 nav-商店 | 商店 | Inter 12px Medium 500 #AAAAAA |
| 底部 nav-我的 | 我的 | Inter 12px Medium 500 #AAAAAA |
| 趣闻标题 | 舞狮故事 | MiSans 16px Semibold |

### 10.2 模式选择弹窗文案

| 位置 | 文案 | 字号/字重 |
|------|------|-----------|
| 弹窗标题 | 选择玩法 | MiSans 20px Bold #000000 |
| 副标题 | 选择一种游戏模式开始吧！ | MiSans 12px Medium #94A3B8 |
| 单人按钮 | 单人敲鼓 | MiSans 20px Bold #FFFFFF |
| 亲子按钮（V2） | 亲子配合 | MiSans 20px Bold #FFFFFF |
| 取消按钮 | 取消 | MiSans 16px Medium #AAAAAA |

---

## 11. WXSS 实现参考

### 11.1 全局 tokens.wxss

```css
/* tokens.wxss */
page {
  --color-white: #FFFFFF;
  --color-black: #000000;
  --color-brand: #E31E15;
  --color-brand-light: #F36F59;
  --color-gray-light: #D9D9D9;
  --color-gray-mid: #AAAAAA;
  --color-gray-slate: #94A3B8;
  --color-gray-dark: #333333;
  --color-text-dark: #252525;
  --color-cancel-bg: #F5F5F5;
  --color-cta-dark: #1E1E1E;

  --page-margin: 40rpx;
  --content-width: 670rpx;
  --radius-card: 32rpx;
  --radius-btn: 16rpx;
  --radius-pill: 999rpx;

  --font-hero-en: 76rpx;
  --font-hero-title: 60rpx;
  --font-page-title: 40rpx;
  --font-sub-title: 32rpx;
  --font-card-sub: 24rpx;
  --font-cta: 24rpx;
  --font-tab: 24rpx;

  --bottom-nav-height: 132rpx;
}
```

### 11.0 全局布局样式

```css
html, body {
  /* overflow: hidden 已移除 */
}
body {
  display: block;
}
.phone-container {
  width: 375px;
  height: 812px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}
.status-bar {
  position: fixed;
  top: 0; left: 50%;
  transform: translateX(-50%);
  width: 375px;
  height: 48rpx;
  z-index: 30;
  background: #1E1E1E;
}
.back-btn {
  width: 64rpx;
  height: 64rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36rpx;
  color: #AAAAAA;
  background: transparent;
}
.back-btn-dark { color: #FFFFFF; }
.back-btn-light { color: #AAAAAA; }
```

### 11.2 主页卡片样式

```css
.hero-card {
  width: 670rpx;
  height: 404rpx;
  border-radius: 32rpx;
  margin: 0 40rpx;
  overflow: hidden;
}

.secondary-card {
  width: 320rpx;
  height: 242rpx;
  border-radius: 32rpx;
  background: #F36F59;
  padding: 34rpx;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 750rpx;
  height: 132rpx;
  background: #FFFFFF;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.tab-active { color: #E31E15; font-weight: 600; }
.tab-inactive { color: #AAAAAA; font-weight: 500; }

/* Modal / Bottom Sheet */
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 750rpx; height: 100vh;
  background: #000000;
  opacity: 0.35;
  z-index: 100;
}
/* Permission modal overlay: pointer-events none allows click-through */
.modal-overlay.permission-overlay {
  pointer-events: none;
}
.modal-card {
  pointer-events: auto;
}

.modal-sheet {
  position: fixed;
  bottom: 0; left: 0;
  width: 750rpx; height: 640rpx;
  background: #FFFFFF;
  border-radius: 32rpx 32rpx 0 0;
  z-index: 101;
}

.modal-drag-handle {
  width: 80rpx; height: 8rpx;
  background: #D9D9D9;
  border-radius: 4rpx;
  margin: 16rpx auto 0;
}

.modal-title {
  font-size: 40rpx;
  font-weight: 600;
  color: #000000;
  text-align: center;
  margin-top: 48rpx;
}

.modal-subtitle {
  font-size: 24rpx;
  font-weight: 400;
  color: #94A3B8;
  text-align: center;
  margin-top: 12rpx;
}

.modal-option-card {
  width: 304rpx; height: 260rpx;
  background: #F36F59;
  border-radius: 32rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
}

.modal-option-card text {
  font-size: 40rpx;
  font-weight: 600;
  color: #FFFFFF;
}

.cancel-btn {
  width: 670rpx; height: 88rpx;
  background: #F5F5F5;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 52rpx 40rpx 0;
}

.cancel-btn text {
  font-size: 32rpx;
  font-weight: 400;
  color: #AAAAAA;
}

/* Hero CTA */
.hero-cta {
  display: flex;
  align-items: center;
  width: 292rpx; height: 62rpx;
  background: #FFFFFF;
  border-radius: 16rpx;
  padding: 0 24rpx;
}

.hero-cta-text {
  font-size: 24rpx;
  font-weight: 500;
  color: #000000;
}

.hero-cta-play {
  width: 28rpx; height: 28rpx;
  background: #E31E15;
  border-radius: 50%;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

## 12. 与品牌.md 的差异对照

| 项目 | 品牌.md (旧) | 设计规范 (新) | 原因 |
|------|-------------|-------------|------|
| 品牌红 | `#D92E25` | `#E31E15` | Figma 实测 |
| 页面底色 | `#F7F5EF` 暖白 | `#FFFFFF` 纯白 | Figma 实测 |
| 次级卡片色 | 未定义 | `#F36F59` 珊瑚粉 | Figma 实测 |
| 按钮圆角 | `999rpx` 胶囊 | `16rpx` (8px) | Figma 实测 |
| 字体 | system-ui | MiSans Latin + Inter + DIN | Figma 实测 |
| 边距 | `32rpx` (16px) | `40rpx` (20px) | Figma 实测 |
| Hero 结构 | 敲鼓卡片+推荐标签 | Hello!+一起来敲鼓+CTA | Figma 实测 |
| 页面标题 | "广东舞狮文创" | "小狮子" | Figma 实测 |
| AR 卡片名称 | "AR拍照" | "狮子拍照" | Figma 实测 |
| 涂色卡片名称 | "涂色装饰" | "狮子绘画" | Figma 实测 |
| 底部导航高 | "50pt + safe area" | 66px (132rpx) | Figma 实测 |
| 副标题色 | 未定义 | `#94A3B8` | Figma 实测 (43:168) |
| 取消按钮底 | 未定义 | `#F5F5F5` | Figma 实测 (39:11) |
| 模式选择卡片 | 未定义 | 152×130, #F36F59, 圆角16 | Figma 实测 (39:5/39:6) |
| CTA 播放按钮 | 未定义 | 红圆 #E31E15 + 黑三角, 14×14 | Figma 实测 (43:316) |

---

## 13. 后续设计检查清单

- [ ] 所有页面使用 375×812 画板
- [ ] 主色 `#E31E15`，次级卡片 `#F36F59`
- [ ] 字体：中文 MiSans Latin / 英文/数字 Inter+ DIN
- [ ] 卡片圆角 16px，按钮圆角 8px
- [ ] 内容区边距 20px
- [ ] 底部导航 66px 高，选中态 `#E31E15`，未选中 `#AAAAAA`
- [ ] 触控目标 ≥ 72px（儿童主按钮）
- [ ] 点击反馈：缩放 0.95 + 透明度 0.85
