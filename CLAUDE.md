# CLAUDE.md — Skill Auto-Trigger Protocol

## 项目上下文恢复：每次对话必须执行

### Step 0：读取项目上下文

**立即读取以下文件恢复完整上下文（缺一不可）：**

| 文件 | 用途 |
|------|------|
| `docs/task_plan.md` | 当前阶段任务计划 |
| `docs/progress.md` | 进度日志 |
| `docs/findings.md` | 发现与决策记录 |
| `落地版PRD.md` | 项目唯一参考 PRD |
| `.session/` 下最新归档 | 上次讨论了什么 |
| `(local-path-removed)

**恢复后必须回答以下问题：**
1. 我目前在哪个阶段？（task_plan.md）
2. 上次讨论了什么？（最新 `.session/` 归档）
3. 下一步要做什么？（task_plan.md + progress.md）

## 核心指令：每次对话必须扫描 Skills

**在每次用户输入后，你必须执行以下步骤：**

### Step 1: 语义扫描

分析用户输入，识别其**意图类别**：

| 意图类别 | 关键词/信号 | 对应 Skill 类型 |
|---------|-----------|----------------|
| 需求分析 | 用户需求、痛点、JTBD、访谈、发现 | Component / Interactive |
| 产品策略 | 定位、竞争、市场、愿景、路线图 | Workflow / Interactive |
| 产品规划 | PRD、史诗、用户故事、优先级 | Component / Workflow |
| 数据分析 | 指标、SaaS、留存、增长、单元经济 | Component / Interactive |
| 用户研究 | 旅程地图、画像、原型、访谈 | Component / Interactive |
| 职业发展 | PM转型、总监、VP、CPO、面试 | Interactive |
| AI 产品 | AI就绪度、上下文工程、AI产品 | Interactive |
| 产品执行 | 故事板、EOL、新闻稿、定位声明 | Component |

### Step 2: 匹配 Skill

将识别的意图与以下 Skill 库匹配。**如果匹配度 > 70%，主动触发对应 Skill。**

---

## 📦 Skills 索引（128个）

### 需求发现与用户研究

| 名称 | 触发条件 |
|------|---------|
| `jobs-to-be-done` | 用户需求、JTBD、痛点分析 |
| `problem-statement` | 问题定义、用户痛点 |
| `problem-framing-canvas` | 问题框架画布 |
| `proto-persona` | 用户画像、原型用户 |
| `user-personas` | 精细化用户画像 |
| `user-segmentation` | 用户分层细分 |
| `customer-journey-map` | 客户旅程、体验诊断、触点分析 |
| `customer-journey-mapping-workshop` | 旅程地图工作坊 |
| `discovery-interview-prep` | 发现式访谈准备 |
| `discovery-process` | 完整产品发现周期 |
| `interview-script` | 访谈脚本撰写 |
| `summarize-interview` | 访谈记录总结 |
| `ideal-customer-profile` | 理想客户画像(ICP) |
| `market-segments` | 市场细分 |
| `market-sizing` | 市场规模估算 |
| `tam-sam-som-calculator` | TAM/SAM/SOM计算 |
| `opportunity-solution-tree` | 机会解决方案树 |
| `lean-ux-canvas` | 精益UX、假设验证 |
| `sentiment-analysis` | 用户情感分析 |
| `company-research` | 公司调研、竞品分析、面试准备 |
| `competitor-analysis` | 竞品分析 |
| `competitive-battlecard` | 竞品Battlecard |

### 产品策略

| 名称 | 触发条件 |
|------|---------|
| `product-strategy` | 产品策略画布 |
| `product-strategy-session` | 产品策略会议 |
| `product-vision` | 产品愿景 |
| `positioning-statement` | 定位声明、差异化策略 |
| `positioning-workshop` | 定位工作坊 |
| `positioning-ideas` | 定位创意 |
| `value-proposition` | 价值主张设计 |
| `value-prop-statements` | 价值主张声明 |
| `business-model` | 商业模式画布 |
| `lean-canvas` | 精益画布 |
| `startup-canvas` | 创业画布 |
| `ansoff-matrix` | 安索夫矩阵 |
| `swot-analysis` | SWOT分析 |
| `pestel-analysis` | PESTEL宏观环境分析 |
| `pestle-analysis` | PESTLE分析 |
| `porters-five-forces` | 波特五力分析 |
| `monetization-strategy` | 变现策略 |
| `pricing-strategy` | 定价策略 |
| `finance-based-pricing-advisor` | 财务驱动定价 |
| `organic-growth-advisor` | 有机增长策略 |

### 产品执行与交付

| 名称 | 触发条件 |
|------|---------|
| `create-prd` | PRD文档创建 |
| `prd-development` | PRD文档开发(结构化) |
| `prd-taskmaster` | 智能PRD生成器+任务执行 |
| `press-release` | 亚马逊式新闻稿 |
| `user-story` | 用户故事(含Gherkin) |
| `user-stories` | 用户故事批量 |
| `user-story-mapping` | 故事地图 |
| `user-story-mapping-workshop` | 故事地图工作坊 |
| `user-story-splitting` | 故事拆分 |
| `job-stories` | Job Stories |
| `wwas` | Why-What-Acceptance格式 |
| `epic-hypothesis` | 史诗假设 |
| `epic-breakdown-advisor` | 史诗拆分 |
| `outcome-roadmap` | 结果导向路线图 |
| `roadmap-planning` | 路线图规划 |
| `brainstorm-okrs` | OKR头脑风暴 |
| `sprint-plan` | Sprint规划 |
| `prioritization-advisor` | 优先级框架选择 |
| `prioritization-frameworks` | 优先级框架参考 |
| `prioritize-features` | 功能优先级排列 |
| `prioritize-assumptions` | 假设优先级排列 |
| `analyze-feature-requests` | 功能请求分析 |
| `pre-mortem` | 事前验尸风险分析 |
| `strategy-red-team` | 策略红队测试 |
| `stakeholder-map` | 干系人地图 |
| `retro` | Sprint回顾 |
| `release-notes` | 发布说明 |
| `eol-message` | 产品下线公告 |
| `test-scenarios` | 测试场景 |
| `summarize-meeting` | 会议纪要总结 |
| `storyboard` | 故事板 |

### 产品发现与创意

| 名称 | 触发条件 |
|------|---------|
| `brainstorm-ideas-existing` | 现有产品功能创意 |
| `brainstorm-ideas-new` | 新产品功能创意 |
| `brainstorm-experiments-existing` | 现有产品实验设计 |
| `brainstorm-experiments-new` | 新产品实验设计 |
| `identify-assumptions-existing` | 现有产品假设识别 |
| `identify-assumptions-new` | 新产品假设识别 |
| `pol-probe` | 生存证明探针 |
| `pol-probe-advisor` | 验证方法选择 |
| `epic-hypothesis` | 史诗假设 |
| `dummy-dataset` | 模拟数据集生成 |

### 增长与营销

| 名称 | 触发条件 |
|------|---------|
| `gtm-strategy` | 上市策略 |
| `gtm-motions` | GTM运动类型 |
| `beachhead-segment` | 滩头阵地市场 |
| `growth-loops` | 增长飞轮 |
| `acquisition-channel-advisor` | 获客渠道评估 |
| `marketing-ideas` | 营销创意 |
| `north-star-metric` | 北极星指标 |
| `product-name` | 产品命名 |
| `value-prop-statements` | 价值主张声明(销售用) |

### 数据与指标

| 名称 | 触发条件 |
|------|---------|
| `ab-test-analysis` | A/B测试分析 |
| `cohort-analysis` | 同期群分析 |
| `metrics-dashboard` | 指标仪表盘 |
| `sql-queries` | SQL查询生成 |
| `north-star-metric` | 北极星指标 |
| `saas-revenue-growth-metrics` | SaaS收入增长指标 |
| `saas-economics-efficiency-metrics` | SaaS单元经济指标 |
| `finance-metrics-quickref` | 财务指标速查 |
| `business-health-diagnostic` | 业务健康诊断 |
| `feature-investment-advisor` | 功能投资评估 |

### AI 产品

| 名称 | 触发条件 |
|------|---------|
| `ai-shaped-readiness-advisor` | AI就绪度评估 |
| `context-engineering-advisor` | 上下文工程优化 |
| `recommendation-canvas` | AI产品评估画布 |
| `intended-vs-implemented` | 期望vs实现审计 |
| `shipping-artifacts` | AI构建产物文档化 |

### 职业发展

| 名称 | 触发条件 |
|------|---------|
| `altitude-horizon-framework` | PM到总监转型 |
| `director-readiness-advisor` | 总监就绪度 |
| `vp-cpo-readiness-advisor` | VP/CPO就绪度 |
| `executive-onboarding-playbook` | 高管30-60-90天入职 |
| `product-sense-interview-answer` | PM面试准备 |
| `review-resume` | 简历审查 |

### 工具箱

| 名称 | 触发条件 |
|------|---------|
| `grammar-check` | 语法检查 |
| `draft-nda` | NDA起草 |
| `privacy-policy` | 隐私政策起草 |
| `skill-authoring-workflow` | Skill创作流程 |
| `pm-skill-creator` | PM Skill设计 |
| `workshop-facilitation` | 工作坊引导 |

### 通用技能

| 名称 | 触发条件 |
|------|---------|
| `karpathy-guidelines` | 编码行为准则 |
| `pdf` | PDF处理(读取/合并/拆分/OCR) |
| `webapp-testing` | 本地Web应用测试 |
| `web-artifacts-builder` | HTML交互产物构建 |
| `pm-agile-workflow` | 敏捷PM工作流(PRD+原型+流程图) |
| `planning-with-files` | 多步骤文件规划(英文) |
| `planning-with-files-zh` | 多步骤文件规划(简体中文) |
| `planning-with-files-zht` | 多步骤文件规划(繁体中文) |
| `planning-with-files-de` | 多步骤文件规划(德语) |
| `planning-with-files-es` | 多步骤文件规划(西班牙语) |
| `planning-with-files-ar` | 多步骤文件规划(阿拉伯语) |

---

## Step 3: 触发与执行

### 自动触发规则

当用户输入匹配以下模式时，**直接调用对应 Skill**：

```
用户说: "帮我分析一下用户需求" → 调用 jobs-to-be-done
用户说: "画一个客户旅程" → 调用 customer-journey-map
用户说: "写一个PRD" → 调用 prd-development
用户说: "规划路线图" → 调用 roadmap-planning
用户说: "做竞品分析" → 调用 company-research
用户说: "评估SaaS指标" → 调用 business-health-diagnostic
用户说: "准备面试" → 调用 company-research + product-sense-interview-answer
用户说: "写用户故事" → 调用 user-story
```

### 调用方式

使用 `Skill` 工具调用：

```
skill: "skill-name"
args: "用户的具体上下文"
```

### 模糊匹配策略

当用户意图不明确时：
1. **列出 2-3 个最相关的 Skill 选项**
2. **简要说明每个 Skill 的用途**
3. **让用户选择**

示例：
> 你的需求可能涉及以下 Skills：
> 1. `jobs-to-be-done` — 分析用户真实需求和痛点
> 2. `customer-journey-map` — 绘制客户体验旅程
> 3. `problem-statement` — 定义核心问题
>
> 你想用哪个？

### 多 Skill 组合

某些场景需要多个 Skill 协作：

| 场景 | Skill 组合 |
|------|-----------|
| 完整产品发现 | `problem-statement` → `jobs-to-be-done` → `discovery-process` |
| 新产品规划 | `tam-sam-som-calculator` → `positioning-statement` → `roadmap-planning` |
| 产品迭代 | `customer-journey-map` → `epic-hypothesis` → `prd-development` |
| 职业转型 | `altitude-horizon-framework` → `director-readiness-advisor` |

---

## Step 4: 输出规范

### Skill 被触发时

1. **告知用户**：「检测到你的需求与 `[skill-name]` 匹配，正在调用...」
2. **执行 Skill**：按照 SKILL.md 中的流程引导用户
3. **完成后建议**：推荐相关的下一步 Skill

### Skill 未被触发时

正常回答用户问题，但**在回答末尾提示**：

> 💡 如果你需要更结构化的分析，可以试试：
> - `/[最相关skill-1]` — [用途]
> - `/[最相关skill-2]` — [用途]

---

## 附录：Skill 文件位置

所有 Skill 定义位于：`.claude/skills/[skill-name]/SKILL.md`

Plugin 来源（`skills/` 目录）：
- `skills/pm-skills/` — 68个PM技能（9个插件包）
- `skills/Product-Manager-Skills/` — 47个PM技能
- `skills/planning-with-files（多步骤规划）/` — 多步骤文件规划（6语言）
- `skills/andrej-karpathy-skills/` — Karpathy编码准则
- `skills/pm-agile-workflow（产品的敏捷开发流）/` — 敏捷PM工作流
- `skills/prd-taskmaster/` — 智能PRD生成器
- `skills/pdf/` — PDF处理
- `skills/web-artifacts-builder/` — HTML产物构建
- `skills/webapp-testing/` — Web应用测试
