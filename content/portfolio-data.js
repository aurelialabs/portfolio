// 作品集可编辑内容：仅整理现有详情页中已经验证的文字与截图。
window.PORTFOLIO_DATA = {
  profile: {
    name: "肖依婷",
    targetRole: "AI 产品经理实习｜大模型应用 · 通用大模型",
    school: "南京师范大学",
    education: "教育技术学硕士在读",
    background: "计算机人工智能",
    city: "上海",
    email: "13548674215@163.com",
    phone: "13548674215",
    portrait: "assets/images/portrait.jpg"
  },
  internships: [{
    id: "smartcs",
    navLabel: "上海淘课 · 智能客服",
    eyebrow: "AI 产品经理实习",
    title: "上海淘课 · SmartCS 智能客服",
    subtitle: "负责企业培训智能客服项目的搭建与优化，连接知识问答、课程及讲师推荐与人工服务。",
    status: "持续优化",
    hidden: false,
    meta: [{ label: "时间", value: "2026.07—2026.10" }, { label: "公司", value: "上海淘课" }, { label: "岗位", value: "AI 产品经理" }, { label: "方向", value: "大模型应用 · 智能客服" }],
    sections: [
      { id: "overview", navLabel: "项目概览", title: "SmartCS 智能客服", blocks: [{ type: "paragraph", text: "2026 年 7 月至 10 月，我在上海淘课担任 AI 产品经理，负责 SmartCS 智能客服项目。项目面向企业培训业务，支持知识库问答、课程与讲师推荐、多轮对话和人工接管。" }] },
      { id: "business", navLabel: "业务背景", title: "业务背景", blocks: [{ type: "paragraph", text: "用户会同时咨询平台政策、课程内容、讲师信息和企业内训方案。问题类型不同，需要的依据、工具与后续服务动作也不同。" }] },
      { id: "goals", navLabel: "产品目标", title: "产品目标", blocks: [{ type: "paragraph", text: "让客服先识别用户的完整目标，再选择知识问答、结构化搜索或人工服务；回答应基于可核实的知识和真实工具结果。" }] },
      { id: "work", navLabel: "个人负责", title: "项目搭建与优化", blocks: [{ type: "paragraph", text: "我负责 SmartCS 整个项目，围绕企业培训客服的真实问题推进方案设计、功能搭建、测试与迭代。" }, { type: "bullets", items: ["梳理知识问答、找课程、找讲师、闲聊与转人工等客服场景。", "围绕意图识别、多轮任务状态和条件继承，优化连续对话体验。", "结合知识库检索与结构化搜索，让客服区分解释性问题和推荐请求。", "整理无答案、无搜索结果、条件冲突等边界场景，明确澄清或人工接管方式。"] }] },
      { id: "results", navLabel: "阶段产出", title: "阶段产出与边界", blocks: [{ type: "paragraph", text: "项目已形成可运行的智能客服系统，包含对话前台、知识库管理、推荐搜索和人工接管能力。当前作品集仅展示产品方案与功能范围，暂不使用未经核实的业务效果指标。" }] },
      { id: "collaboration", navLabel: "产品判断", title: "产品判断", blocks: [{ type: "paragraph", text: "客服体验的关键在于让模型理解需求，同时让场景权限、用户明确条件和工具结果保持可控。推荐解释只能引用实际生效的筛选条件与返回内容。" }] },
      { id: "review", navLabel: "后续优化", title: "后续优化", blocks: [{ type: "paragraph", text: "继续关注知识覆盖、推荐相关性、多轮条件保持和转人工时机，并通过真实问题与失败案例推动迭代。" }] }
    ]
  }, {
    id: "video-keypoints",
    navLabel: "视频人物关键点识别",
    eyebrow: "AI 视频处理实习",
    title: "视频人物关键点识别",
    subtitle: "从视频后期业务流程出发，验证人体关键点识别的应用位置与失败边界。",
    status: "能力验证",
    hidden: false,
    meta: [{ label: "时间", value: "2024.04-2024.06" }, { label: "机构", value: "马栏山视频先进技术研究院" }, { label: "方向", value: "计算机视觉" }],
    sections: [
      { id: "overview", navLabel: "项目概览", title: "视频人物关键点识别", blocks: [{ type: "paragraph", text: "从视频后期业务流程出发，验证人体关键点识别的应用位置与失败边界。" }] },
      { id: "business", navLabel: "业务背景", title: "业务背景", blocks: [{ type: "paragraph", text: "视频后期制作需要从大量素材中定位人物动作、筛选有效片段并完成剪辑。人工逐帧查看和标注耗时较长，素材质量、人物遮挡和多人场景也会增加处理难度。" }, { type: "paragraph", text: "项目尝试使用人体关键点识别辅助人物定位、动作识别和素材筛选，判断模型在哪些环节真正可用，以及哪些场景仍需人工处理。" }, { type: "cards", items: [{ title: "项目重点", text: "识别结果能否稳定支持视频生产流程。", tone: "green" }] }] },
      { id: "goals", navLabel: "项目目标", title: "项目目标", blocks: [{ type: "paragraph", text: "流程拆解帮助我回答三个产品问题：模型需要什么输入，输出如何被后续环节使用，什么情况下必须回到人工处理。" }] },
      { id: "work", navLabel: "个人贡献", title: "个人贡献与业务流程", blocks: [{ type: "paragraph", text: "项目的模型方案和整体技术结果属于团队协作成果。我的工作集中在业务流程、样本质量、测试记录与应用边界。" }, { type: "bullets", items: ["梳理视频导入、拆帧、人物识别、关键点标注与结果回传流程。", "参与视频拆帧、数据清洗、标注检查和异常样本整理。", "基于 YOLO-v7 参与人体关键点识别能力验证。", "记录遮挡、多人重叠、画面模糊和关键点漂移等 bad case。", "从产品使用角度整理模型适用条件和人工兜底场景。"] }, { type: "steps", items: [{ label: "01", title: "视频导入", text: "明确素材类型与质量" }, { label: "02", title: "视频拆帧", text: "生成连续可检查样本" }, { label: "03", title: "人物识别", text: "定位画面中的人物" }, { label: "04", title: "关键点标注", text: "输出人体姿态信息" }, { label: "05", title: "结果回传", text: "连接后续生产环节" }, { label: "06", title: "人工复核", text: "处理低置信度场景" }] }] },
      { id: "results", navLabel: "成果", title: "成果与复盘", blocks: [{ type: "cards", items: [{ title: "90%+", text: "简历记录的测试样本关键点识别准确率，仅代表特定测试范围。", tone: "blue" }, { title: "优秀实习生", text: "项目期间获得的实习荣誉。", tone: "green" }] }, { type: "paragraph", text: "项目沉淀了数据处理流程、模型测试记录和典型 bad case，为后续模型迭代与工具化判断提供依据。" }] },
      { id: "collaboration", navLabel: "技术协作", title: "技术协作", blocks: [{ type: "paragraph", text: "与技术同学沟通时，我关注指标背后的使用条件，而不只询问模型准确率。" }, { type: "bullets", items: ["测试样本来自哪些场景，是否覆盖真实生产条件。", "哪些失败会直接影响剪辑或素材筛选。", "模型是单帧准确，还是连续视频中保持稳定。", "问题来自数据质量、模型能力还是流程连接。", "产品落地时需要怎样的异常提示和人工复核。"] }] },
      { id: "review", navLabel: "复盘", title: "复盘", blocks: [{ type: "paragraph", text: "如果重新推进，我会从项目开始就建立分场景测试集，将遮挡程度、人物数量、画面清晰度、景别和动作幅度作为测试维度，同时记录总体指标与关键场景指标。" }] }
    ]
  }],
  projects: [
    {
      id: "zhiji", navLabel: "知迹 · AI 学习平台", eyebrow: "个人项目", title: "知迹（Zhiji）", subtitle: "把大模型辅助学习与可复核的过程证据连接起来，服务学习者与教育研究者。", status: "已上线 · 迭代中", hidden: false,
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
    },
    {
      id: "ai-classroom", navLabel: "AI 长大智创课堂", eyebrow: "产品与研究实践", title: "AI 长大智创课堂", subtitle: "通过学生与家长调研、课程设计和数据分析，探索 K12 AI 编程教育产品优化。", status: "项目负责人", hidden: false,
      meta: [{ label: "时间", value: "2022.10-2023.06" }, { label: "角色", value: "项目负责人" }, { label: "方向", value: "K12 AI 教育" }],
      sections: [
        { id: "overview", navLabel: "项目概览", title: "AI 长大智创课堂", blocks: [{ type: "paragraph", text: "通过学生与家长调研、课程设计和数据分析，探索 K12 AI 编程教育产品优化。" }] },
        { id: "problem", navLabel: "项目背景", title: "项目背景", blocks: [{ type: "paragraph", text: "K12 编程教育快速发展，但不少课程存在内容同质化、学习路径固定和反馈不足的问题。学生的年龄、基础与学习动机不同，家长对课程价值和学习成果的关注也不一致。" }] },
        { id: "goals", navLabel: "用户研究", title: "用户研究", blocks: [{ type: "paragraph", text: "我组织并参与学生与家长调研，通过问卷和访谈收集需求与课程痛点，并使用 SPSS、AHP 层次分析法辅助整理信息与判断优先级。" }] },
        { id: "solution", navLabel: "关键判断", title: "关键判断", blocks: [{ type: "paragraph", text: "学生和家长是两个不同的产品角色。课程设计需要同时理解两类角色，但不能简单把家长诉求转化为学生的学习负担。" }] },
        { id: "ai-choice", navLabel: "课程优化", title: "课程产品优化", blocks: [{ type: "paragraph", text: "基于调研结果，我参与课程体系优化，并设计与迭代 20+ 少儿编程课程内容，将用户需求转化为课程结构和学习任务。" }] },
        { id: "build", navLabel: "项目推进", title: "项目推进", blocks: [{ type: "bullets", items: ["调研阶段：研究问题、问卷、访谈记录与需求结论。", "方案阶段：课程结构、内容方向与优先级。", "制作阶段：课程内容、体验记录与修改意见。", "申报阶段：研究报告、项目材料与成果证明。", "展示阶段：路演逻辑、PPT 与答辩准备。"] }] },
        { id: "test", navLabel: "项目成果", title: "项目成果", blocks: [{ type: "cards", items: [{ title: "20+", text: "少儿编程课程内容设计与迭代", tone: "blue" }, { title: "银奖", text: "湖南省“雷锋杯”志愿服务大赛团队成果", tone: "green" }] }] },
        { id: "result", navLabel: "交付结果", title: "项目结果", blocks: [{ type: "bullets", items: ["输出用户研究、课程优化方案、研究报告和项目申报材料。", "作为主要负责人参与国家级项目申报。", "团队入选团中央“七彩假期”志愿团队。", "团队相关实践成果获得多家媒体报道。"] }] },
        { id: "review", navLabel: "复盘", title: "复盘", blocks: [{ type: "paragraph", text: "这段经历让我建立了多角色产品意识，也理解教育产品需要同时关注学习效果与用户体验。" }] }
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
