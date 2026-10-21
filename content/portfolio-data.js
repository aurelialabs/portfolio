// 作品集可编辑内容：仅整理现有详情页中已经验证的文字与截图。
window.PORTFOLIO_DATA = {
  profile: {
    name: "肖依婷",
    targetRole: "应聘 AI 产品经理实习｜大模型应用 / 通用大模型",
    summary: "在上海淘课负责 SmartCS 智能客服项目；独立完成知迹与 Yanko 两个 AI 产品，关注模型理解与产品规则之间的边界。",
    internshipSummary: "负责企业培训客服，解决平台问答、找课和找讲师等问题。",
    projectSummary: "学习者按单元学习；研究者查看对话和学习记录。",
    school: "南京师范大学",
    education: "教育技术学硕士在读",
    background: "长沙学院 · 计算机人工智能方向工学学士",
    city: "上海",
    email: "13548674215@163.com",
    phone: "13548674215",
    resumeUrl: "assets/resume/肖依婷-AI产品经理-2026-10.pdf",
    github: "https://github.com/aurelialabs",
    portrait: "assets/images/portrait-2026.jpg",
    about: {
      education: [
        { stage: "本科", school: "长沙学院", years: "2021.09—2025.06", major: "计算机人工智能方向 · 工学学士", detailLabel: "主修课程", detail: "数据挖掘与机器学习、自然语言处理、Python、移动互联网开发、模式识别等。", image: "assets/images/education/changsha-university.jpg", imageAlt: "长沙学院校园主路" },
        { stage: "研究生", school: "南京师范大学", years: "2025.09—至今", major: "教育技术学 · 理学硕士在读", detailLabel: "研究方向", detail: "AI教育、知识建构与智能学习、人机协同学习。", image: "assets/images/education/nanjing-normal-university.jpg", imageAlt: "南京师范大学仙林校区敬文图书馆与花园" }
      ],
      timeline: [
        { stage: "高中", school: "桃源一中", years: "", story: "理科，学习物理、化学、地理。" },
        { stage: "本科", school: "长沙学院", years: "2021.09—2025.06", story: "积极参加各项比赛，曾获得数学建模的省级以及国际奖项、雷锋杯志愿大赛省级银奖，也积极参与志愿活动，志愿时长 100h+。" },
        { stage: "研究生", school: "南京师范大学", years: "2025.09—至今", story: "研究方向：AI教育、知识建构与智能学习、人机协同学习。" }
      ]
    }
  },
  internships: [{
    id: "smartcs",
    navLabel: "上海淘课 · 智能客服",
    eyebrow: "AI 产品经理实习",
    title: "上海淘课 · SmartCS 智能客服",
    subtitle: "负责企业培训智能客服项目的搭建与优化，连接知识问答、课程及讲师推荐与人工服务。",
    status: "已完成",
    hidden: false,
    meta: [{ label: "时间", value: "2026.07—2026.10" }, { label: "公司", value: "上海淘课" }, { label: "岗位", value: "AI 产品经理" }, { label: "方向", value: "大模型应用 · 智能客服" }],
    sections: [
      { id: "overview", navLabel: "项目概览", title: "SmartCS 智能客服", blocks: [{ type: "paragraph", text: "2026 年 7 月至 10 月，我在上海淘课担任 AI 产品经理，负责 SmartCS 智能客服项目。项目面向企业培训业务，支持知识库问答、课程与讲师推荐、多轮对话和人工接管。" }] },
      { id: "business", navLabel: "业务背景", title: "业务背景", blocks: [{ type: "paragraph", text: "用户会同时咨询平台政策、课程内容、讲师信息和企业内训方案。问题类型不同，需要的依据、工具与后续服务动作也不同。" }] },
      { id: "goals", navLabel: "产品目标", title: "产品目标", blocks: [{ type: "paragraph", text: "让客服先识别用户的完整目标，再选择知识问答、结构化搜索或人工服务；回答应基于可核实的知识和真实工具结果。" }] },
      { id: "work", navLabel: "个人负责", title: "项目搭建与优化", blocks: [{ type: "paragraph", text: "我负责 SmartCS 整个项目，围绕企业培训客服的真实问题推进方案设计、功能搭建、测试与迭代。" }, { type: "bullets", items: ["梳理知识问答、找课程、找讲师、闲聊与转人工等客服场景。", "围绕意图识别、多轮任务状态和条件继承，优化连续对话体验。", "结合知识库检索与结构化搜索，让客服区分解释性问题和推荐请求。", "整理无答案、无搜索结果、条件冲突等边界场景，明确澄清或人工接管方式。"] }] },
      { id: "results", navLabel: "阶段产出", title: "阶段产出与边界", blocks: [{ type: "paragraph", text: "项目形成可运行的对话前台、知识库管理、推荐搜索和人工接管能力。31 个客服场景、42 轮请求的本地验收通过数由 25/31 提升至 31/31；这是预设场景的测试结果，不能解释为线上用户满意度或业务转化率。" }] },
      { id: "collaboration", navLabel: "产品判断", title: "产品判断", blocks: [{ type: "paragraph", text: "客服体验的关键在于让模型理解需求，同时让场景权限、用户明确条件和工具结果保持可控。推荐解释只能引用实际生效的筛选条件与返回内容。" }] },
      { id: "review", navLabel: "后续优化", title: "后续优化", blocks: [{ type: "paragraph", text: "继续关注知识覆盖、推荐相关性、多轮条件保持和转人工时机，并通过真实问题与失败案例推动迭代。" }] }
    ]
  }],
  projects: [
    {
      id: "zhiji", navLabel: "知迹 · AI 学习平台", eyebrow: "个人项目", title: "知迹（Zhiji）", subtitle: "让学习者按目标推进学习，也让研究者能回到原始对话复核过程。", status: "已上线 · 迭代中", hidden: false,
      links: [{ label: "体验学习者端 ↗", href: "https://8.218.22.55/learner/login" }, { label: "查看研究者端 ↗", href: "https://8.218.22.55/admin/login" }],
      meta: [{ label: "角色", value: "个人项目" }, { label: "方向", value: "大模型应用 · AI 教育" }],
      sections: [
        { id: "overview", navLabel: "项目概览", title: "知迹 · AI 学习与教育研究平台", blocks: [{ type: "paragraph", text: "知迹包含学习者端和研究者端：学习者可以直接问答或选择系统学习，研究者可以查看、复核和分析学习过程证据。" }] },
        { id: "problem", navLabel: "问题背景", title: "问题背景", blocks: [{ type: "paragraph", text: "单次问答难以持续追踪学习目标、误区与进展；研究者也需要从真实对话中找到可定位、可复核的学习过程证据。" }] },
        { id: "goals", navLabel: "产品目标", title: "产品目标", blocks: [{ type: "paragraph", text: "同时支持灵活问答与系统学习，让学习过程中的诊断、反馈和支架有明确状态，并让研究分析能够追溯到原始对话。" }] },
        { id: "solution", navLabel: "学习者体验", title: "学习者体验", blocks: [{ type: "paragraph", text: "用户可以直接提问，也可以主动进入系统学习。系统学习按目标确认、初始诊断、学习计划、微教学、检测、反馈与阶段评价推进；遇到关键误区时提供有限补救。" }, { type: "steps", items: [{ label: "01", title: "确认目标", text: "明确本轮学习任务" }, { label: "02", title: "诊断与计划", text: "记录基础和学习路径" }, { label: "03", title: "微教学与检测", text: "围绕知识单元推进" }, { label: "04", title: "反馈与复盘", text: "保留需要加强的内容" }] }] },
        { id: "ai-choice", navLabel: "AI 与知识库", title: "AI 与知识库设计", blocks: [{ type: "paragraph", text: "平台结合大模型与课程知识库生成回答，并展示资料引用。课程资料检索支持静态索引与动态知识库的回退，避免检索依赖不可用时中断学习。" }] },
        { id: "build", navLabel: "研究者端", title: "研究者端", blocks: [{ type: "paragraph", text: "研究者端支持按课程、学生、日期、学习状态及认知和情绪编码筛选，查看原始对话、关键事件与个体及群体视图。人工评价独立保存，不覆盖 AI 自动编码。" }] },
        { id: "test", navLabel: "验证方式", title: "验证方式", blocks: [{ type: "paragraph", text: "项目通过学习流程、资料引用、权限隔离和研究数据筛选等场景进行自动化与人工验收；图表只表达记录到的过程数据，不将其解释为因果效果。" }] },
        { id: "result", navLabel: "当前成果", title: "当前成果与限制", blocks: [{ type: "paragraph", text: "学习者端的微学习闭环与研究者端 V1.0 已实现，并提供线上体验。教学自然度、摘要质量和大规模使用效果仍需要进一步验证。" }] },
        { id: "review", navLabel: "下一步", title: "下一步", blocks: [{ type: "bullets", items: ["继续用真实学习场景检验教学反馈和支架是否有效。", "完善研究者对过程证据的复核与解释。", "扩大资料类型与检索质量验证。"] }] }
      ]
    },
    {
      id: "yanko", navLabel: "Yanko · AI 陪伴与行动助手", eyebrow: "独立项目", title: "Yanko（言行）", subtitle: "聊天可以提出计划和记忆建议；是否保存，由用户决定。", status: "线上演示", hidden: false,
      links: [{ label: "体验演示 ↗", href: "https://yanko-three.vercel.app/chat" }, { label: "查看代码 ↗", href: "https://github.com/aurelialabs/yanko" }],
      meta: [{ label: "时间", value: "2026.09—2026.10" }, { label: "角色", value: "独立开发" }, { label: "方向", value: "AI 陪伴 · 行动助手" }],
      sections: [
        { id: "problem", title: "问题背景", blocks: [{ type: "paragraph", text: "通用 AI 可以聊天，但持续关系中容易出现人设漂移、记忆编造和计划误创建。用户也需要决定哪些记忆能保存、哪些行动真的要执行。" }] },
        { id: "decision", title: "关键决策", blocks: [{ type: "paragraph", text: "把闲聊陪伴与计划落地分流：模型理解表达，产品策略判断是否进入计划流程；只有用户确认后才正式写入。记忆区分自动写入、确认写入和禁止写入，并区分用户共享与角色专属范围。" }] },
        { id: "result", title: "当前结果", blocks: [{ type: "paragraph", text: "已完成 PRD、响应式 Web/PWA 原型、角色与记忆管理、对话式计划确认、反馈与 Badcase 记录，以及可访问的免登录演示。线上演示使用浏览器本地数据，不代表真实用户使用效果。" }] }
      ]
    },
    {
      id: "studyagent", navLabel: "考途 StudyAgent", eyebrow: "Vibe Coding 项目", title: "考途 StudyAgent", subtitle: "将教材章节转化为结构化复习报告，连接理解、记忆、自测与行动计划。", status: "原型验证", hidden: false,
      meta: [{ label: "时间", value: "2026.07" }, { label: "角色", value: "独立完成" }, { label: "类型", value: "AI 教育产品" }],
      sections: [
        { id: "overview", navLabel: "项目概览", title: "考途 StudyAgent", blocks: [{ type: "paragraph", text: "将教材章节转化为结构化复习报告，连接理解、记忆、自测与行动计划。" }] },
        { id: "problem", navLabel: "问题背景", title: "问题背景", blocks: [{ type: "paragraph", text: "教材型考试用户并不缺资料，真正的困难是资料太多、重点不清、笔记整理耗时，背诵、自测和复习计划又分散在不同工具中。" }, { type: "cards", items: [{ title: "首版验证", text: "把一段教材稳定转化为可执行的复习材料。", tone: "green" }] }] },
        { id: "goals", navLabel: "产品判断", title: "产品判断", blocks: [{ type: "paragraph", text: "复习报告是一条连续链路：后续任务依赖前一步结果，自测题需要覆盖已提炼的重点，答案解析必须对应已有题目，计划还要受到用户基础与时间约束。" }] },
        { id: "solution", navLabel: "方案设计", title: "方案设计", blocks: [{ type: "paragraph", text: "用户输入考试类型、科目、教材信息、章节正文、当前基础、每日时间和复习周期。六个节点依次加工内容，最终汇总为结构化学习报告。" }, { type: "steps", items: [{ label: "01", title: "章节解析", text: "建立内容框架" }, { label: "02", title: "重点提炼", text: "区分理解与记忆" }, { label: "03", title: "背诵笔记", text: "转化为可复习表达" }, { label: "04", title: "自测题", text: "只生成题目" }, { label: "05", title: "答案解析", text: "逐题严格对应" }, { label: "06", title: "复习计划", text: "结合时间与基础" }] }, { type: "gallery", images: [{ src: "assets/images/projects/studyagent/workflow.png", alt: "考途 StudyAgent 六节点工作流配置界面", caption: "六节点工作流配置" }, { src: "assets/images/projects/studyagent/input.png", alt: "考途 StudyAgent 教材内容与学习条件输入界面", caption: "教材与学习条件输入" }, { src: "assets/images/projects/studyagent/output.png", alt: "考途 StudyAgent 结构化复习报告输出界面", caption: "结构化复习报告输出" }] }] },
        { id: "ai-choice", navLabel: "AI 选择", title: "为什么选择 Workflow", blocks: [{ type: "paragraph", text: "复习报告需要稳定的节点职责、变量连接和输出格式，因此使用 Dify Workflow 拆分任务。" }, { type: "bullets", items: ["每个节点只完成一个明确任务。", "输出格式固定，便于下游节点读取。", "要求基于用户材料，减少凭常识补写。", "复习计划必须结合用户基础、每日时间和周期。"] }] },
        { id: "build", navLabel: "Vibe Coding", title: "Vibe Coding", blocks: [{ type: "paragraph", text: "我使用 Codex 等 AI 工具辅助梳理文档、检查 Prompt、整理仓库和定位问题，但产品范围、节点职责、变量依赖、结果验收与迭代优先级由我判断。" }, { type: "steps", items: [{ label: "01", title: "定义问题", text: "从用户连续任务出发" }, { label: "02", title: "限定 MVP", text: "优先验证材料到报告链路" }, { label: "03", title: "拆解任务", text: "PRD、Workflow、Prompt、测试与 Demo" }, { label: "04", title: "执行检查", text: "逐项检查实际结果" }] }] },
        { id: "test", navLabel: "测试迭代", title: "测试与迭代", blocks: [{ type: "paragraph", text: "我使用约 270KB 的真实教育学 PDF 完成一次端到端测试。Workflow 能读取材料并生成知识框架、重点和复习相关内容。" }, { type: "bullets", items: ["变量未正确插入时，模型会反问用户补充材料。", "答案节点没有引用题目时，题目与答案可能错位。", "整本教材输入过长时，输出容易泛化。", "扫描版 PDF 本质是图片，需要先 OCR。", "多节点调用会消耗模型额度，演示前需要检查可用性。"] }] },
        { id: "result", navLabel: "成果与限制", title: "成果与限制", blocks: [{ type: "cards", items: [{ title: "6", text: "套独立节点 Prompt", tone: "blue" }, { title: "1", text: "次真实 PDF 端到端测试", tone: "green" }] }, { type: "paragraph", text: "当前已完成可运行的 Dify Workflow、Web App、DSL、PRD、Prompt 文档、测试报告、迭代记录和公开 GitHub 仓库。项目仍处于原型验证阶段。" }] },
        { id: "review", navLabel: "下一步", title: "下一步", blocks: [{ type: "bullets", items: ["补充不同教材和异常输入测试。", "建立更清晰的评价维度与测试记录表。", "增加长文本分段和文件类型判断。", "根据真实反馈判断知识库、错题复盘和进度能力的优先级。"] }] }
      ]
    }
  ]
};

/*
新增实习模板（整段复制到 internships 数组中；复制后才移除本注释）。
填写前：只保留已核实、允许公开的内容。没有可靠内容的章节要整段删除，不能留下空 blocks 或“待补充”。

{
  id: "new-internship",
  navLabel: "请替换为真实实习名称",
  eyebrow: "请替换为真实实习类型",
  title: "请替换为真实实习名称",
  subtitle: "请替换为已核实的实习简介。",
  status: "请替换为真实状态",
  hidden: true,
  meta: [
    { label: "时间", value: "请替换为真实时间" },
    { label: "机构", value: "请替换为可公开的真实机构名称" },
    { label: "方向", value: "请替换为真实方向" }
  ],
  sections: [
    {
      id: "overview",
      navLabel: "项目概览",
      title: "请替换为真实概览标题",
      blocks: [
        { type: "paragraph", text: "请替换为已核实的背景或目标。" },
        { type: "bullets", items: ["请替换为真实职责或事实", "请替换为真实职责或事实"] },
        {
          type: "gallery",
          images: [{
            src: "assets/images/internships/new-internship/example.png",
            alt: "请替换：真实截图中展示的内容或界面",
            caption: "请替换：这张真实截图说明的工作步骤"
          }]
        }
      ]
    }
  ]
}

新增项目模板（整段复制到 projects 数组中；复制后才移除本注释）。
填写前：只保留已核实、允许公开的内容。没有可靠内容的章节要整段删除，不能留下空 blocks 或“待补充”。

{
  id: "new-project",
  navLabel: "请替换为真实项目名称",
  eyebrow: "Vibe Coding 项目",
  title: "请替换为真实项目名称",
  subtitle: "请替换为已核实的项目简介。",
  status: "请替换为真实状态",
  hidden: true,
  meta: [
    { label: "时间", value: "请替换为真实时间" },
    { label: "角色", value: "请替换为真实角色" },
    { label: "类型", value: "请替换为真实类型" }
  ],
  sections: [
    {
      id: "overview",
      navLabel: "项目概览",
      title: "请替换为真实概览标题",
      blocks: [
        { type: "paragraph", text: "请替换为已核实的项目背景或目标。" },
        { type: "bullets", items: ["请替换为真实做法或事实", "请替换为真实做法或事实"] },
        {
          type: "gallery",
          images: [{
            src: "assets/images/projects/new-project/example.png",
            alt: "请替换：真实截图中展示的产品界面或流程",
            caption: "请替换：这张真实截图所说明的步骤"
          }]
        }
      ]
    }
  ]
}
*/
