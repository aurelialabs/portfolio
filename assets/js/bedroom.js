(function () {
  "use strict";

  const data = window.PORTFOLIO_DATA;
  const dialog = document.querySelector("#magazine");
  const paper = document.querySelector("[data-paper-page]");
  const pageCount = document.querySelector("[data-page-count]");
  const pageTitle = document.querySelector("[data-page-title]");
  const prevButton = document.querySelector("[data-prev-page]");
  const nextButton = document.querySelector("[data-next-page]");
  const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!data || !dialog || !paper) return;

  const profile = data.profile || {};
  const internships = (data.internships || []).filter(function (entry) { return entry && !entry.hidden; });
  const projects = (data.projects || []).filter(function (entry) { return entry && !entry.hidden; });
  const byId = function (items, id) { return items.find(function (entry) { return entry.id === id; }) || {}; };
  const studyagent = byId(projects, "studyagent");

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
    });
  }
  function section(entry, id) {
    return (entry.sections || []).find(function (item) { return item.id === id; }) || {};
  }
  function paragraph(entry, id) {
    const block = (section(entry, id).blocks || []).find(function (item) { return item.type === "paragraph"; });
    return block ? block.text : "";
  }
  function bullets(entry, id) {
    const block = (section(entry, id).blocks || []).find(function (item) { return item.type === "bullets"; });
    return block ? block.items : [];
  }
  function bulletList(items) {
    return "<ul>" + (items || []).map(function (item) { return "<li>" + esc(item) + "</li>"; }).join("") + "</ul>";
  }
  function meta(entry, label) {
    const item = (entry.meta || []).find(function (part) { return part.label === label; });
    return item ? item.value : "";
  }
  function header(number, eyebrow, title, deck) {
    return '<p class="folio">ISSUE 01 &nbsp; / &nbsp; ' + esc(number) + ' &nbsp; / &nbsp; ' + esc(eyebrow) + '</p>' +
      '<h1 class="page-title">' + esc(title) + '</h1>' +
      '<p class="page-deck">' + esc(deck) + '</p>';
  }
  function detailBlock(title, body) {
    return '<section class="detail-block"><h3>' + esc(title) + '</h3>' + body + '</section>';
  }
  function openButton(id, label) {
    return '<button class="paper-button secondary" type="button" data-open-page="' + esc(id) + '">' + esc(label) + ' →</button>';
  }
  function placeholder(label) {
    return '<div class="media-pending" role="img" aria-label="' + esc(label) + '">' + esc(label) + '<br>素材上传后将在这里展示</div>';
  }
  function catalogueCard(id, kind, title, description, image, evidence, alt) {
    const media = image
      ? '<img src="' + esc(image) + '" alt="' + esc(alt || (title + "的真实界面截图")) + '" loading="lazy">'
      : '<span class="catalogue-media" aria-hidden="true">作品画面待补充</span>';
    return '<button class="catalogue-card' + (evidence ? " work-card" : "") + '" type="button" data-open-page="' + esc(id) + '">' +
      media + '<small>' + esc(kind) + '</small><strong>' + esc(title) +
      '</strong><p>' + esc(description) + '</p>' +
      (evidence ? '<span class="catalogue-evidence">' + esc(evidence) + '</span>' : "") + '</button>';
  }
  function caseGallery(images, caption) {
    const first = images[0];
    return '<figure class="media-showcase case-gallery"><img data-gallery-main src="' + esc(first.src) + '" alt="' + esc(first.label) + '"><figcaption data-gallery-caption>' + esc(first.label) + '</figcaption></figure>' +
      (images.length > 1 ? '<div class="gallery-controls" aria-label="切换项目画面">' + images.map(function (item, index) {
        return '<button class="paper-button secondary" type="button" data-gallery-image="' + esc(item.src) + '" data-gallery-label="' + esc(item.label) + '" aria-pressed="' + (index === 0) + '">' + esc(item.short || item.label) + '</button>';
      }).join("") + '</div>' : '') + '<p class="media-context">' + esc(caption) + '</p>';
  }
  function metricStrip(items) {
    return '<div class="metric-strip">' + items.map(function (item) {
      return '<div><strong>' + esc(item.value) + '</strong><span>' + esc(item.label) + '</span></div>';
    }).join("") + '</div>';
  }
  function decisionMap(title, steps, note) {
    return '<section class="decision-map"><h2 class="section-heading">' + esc(title) + '</h2><ol>' + steps.map(function (step) {
      return '<li><strong>' + esc(step.title) + '</strong><span>' + esc(step.text) + '</span></li>';
    }).join("") + '</ol><p>' + esc(note) + '</p></section>';
  }

  function aboutPage() {
    const about = profile.about || {};
    const education = about.education || [];
    const timeline = about.timeline || [];
    const resume = profile.resumeUrl
      ? '<a class="paper-link" href="resume.html?from=about">查看简历 →</a>'
      : '<button class="paper-button" type="button" disabled>简历文件待上传</button>';
    return '<div class="about-page">' +
      '<p class="folio">ISSUE 01 &nbsp; / &nbsp; 01 &nbsp; / &nbsp; PROFILE</p>' +
      '<div class="about-hero"><div class="about-hero-copy">' +
        '<span class="about-kicker">A little about me</span>' +
        '<h1 class="page-title">' + esc(profile.name || "肖依婷") + '</h1>' +
        '<p class="about-role">求职方向：AI产品经理</p>' +
        '<p class="about-role-detail">大模型应用产品 / 通用大模型产品</p>' +
        '<div class="button-row">' + resume + openButton("projects", "看作品") + '</div>' +
      '</div><figure class="portrait-mirror"><span class="mirror-flower mirror-flower-tl" aria-hidden="true">✿</span><span class="mirror-flower mirror-flower-tr" aria-hidden="true">✿</span><span class="mirror-flower mirror-flower-bl" aria-hidden="true">✿</span><span class="mirror-flower mirror-flower-br" aria-hidden="true">✿</span><div class="mirror-glass"><img src="' + esc(profile.portrait || "") + '" alt="肖依婷的个人照片"></div><figcaption>YITING · 2026</figcaption></figure></div>' +
      '<section class="about-section"><div class="about-section-title"><span>01</span><h2>教育经历</h2></div>' +
        '<div class="about-education-grid">' + education.map(function (item) {
          return '<article class="education-card"><div class="education-photo"><img src="' + esc(item.image) + '" alt="' + esc(item.imageAlt) + '" loading="lazy"><span>' + esc(item.stage) + '</span></div>' +
            '<div class="education-body"><div class="education-name-row"><h3>' + esc(item.school) + '</h3><small>' + esc(item.years) + '</small></div>' +
            '<p class="education-major">' + esc(item.major) + '</p><p class="education-courses"><strong>' + esc(item.detailLabel) + '</strong><span>' + esc(item.detail) + '</span></p></div></article>';
        }).join("") + '</div></section>' +
      '<section class="about-section about-intro"><div class="about-section-title"><span>02</span><h2>认识我</h2></div>' +
        '<div class="about-letter"><p class="about-lead">Hi，我是一名正在探索 AI 产品可能性的产品经理实习生 👋</p>' +
        '<p>本科人工智能专业，现就读于南京师范大学教育技术学硕士，拥有技术与教育交叉的学科背景。</p>' +
        '<p>目前专注于<strong>AI 产品设计与大模型应用落地</strong>，具备 AI 产品实习经验，参与过智能客服、课程推荐等产品的需求分析、方案设计与迭代优化，也在持续探索 RAG、Agent、Workflow 等技术在真实业务场景中的应用。</p>' +
        '<p>相比单纯追求功能实现，我更关注：<strong>用户真正需要什么？AI 能解决什么？如何让产品稳定、可靠地解决问题？</strong></p>' +
        '<p>我的 MBTI 是 INFJ，喜欢独立思考，喜欢做计划，也享受从 0 到 1 把想法变成产品的过程。习惯通过实践验证判断，在不断发现问题、解决问题的过程中建立自己的产品方法论。喜欢一切有价值有创造力的东西，也希望自己能够一直保持好奇，能够主动探索，持续创造。</p></div></section>' +
      '<section class="about-section about-journey"><div class="about-section-title"><span>03</span><h2>成长时间线</h2></div>' +
        '<div class="journey-track"><svg class="journey-curve" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true"><path d="M 0 67 C 170 48 235 92 335 65 S 535 40 665 67 S 860 90 1000 55" /></svg>' +
          timeline.map(function (item) {
            return '<article class="journey-stop"><div class="journey-point" aria-hidden="true"></div><span class="journey-stage">' + esc(item.stage) + '</span><h3>' + esc(item.school) + '</h3>' +
              (item.years ? '<time>' + esc(item.years) + '</time>' : '') +
              '<p class="journey-story">' + esc(item.story) + '</p></article>';
          }).join("") +
        '</div></section></div>';
  }

  const internshipCovers = {
    smartcs: "assets/images/projects/smartcs/course-selector.png"
  };
  function internshipStartLabel(entry) {
    const match = String(meta(entry, "时间")).match(/(\d{4})\D+(\d{1,2})/);
    return match ? match[1] + "." + String(match[2]).padStart(2, "0") : (meta(entry, "时间") || "时间待补充");
  }
  function internshipOrganization(entry) {
    const company = meta(entry, "公司");
    if (company) return { label: "公司", value: company };
    const organization = meta(entry, "机构");
    if (organization) return { label: "机构", value: organization };
    return { label: "公司", value: "单位待补充" };
  }
  function internshipRole(entry) {
    return meta(entry, "岗位") || entry.eyebrow || "岗位待补充";
  }
  function internshipIndexPage() {
    const items = internships.map(function (entry, index) {
      return { entry: entry, index: index };
    });
    const cards = items.map(function (item) {
      const entry = item.entry;
      const organization = internshipOrganization(entry);
      const role = internshipRole(entry);
      const image = internshipCovers[entry.id] || "";
      const pageId = entry.id;
      const startLabel = internshipStartLabel(entry);
      const iso = startLabel.indexOf(".") > 0 ? startLabel.replace(".", "-") : "";
      const media = image
        ? '<img src="' + esc(image) + '" alt="">'
        : '<span class="internship-card-fallback">画面待补充</span>';
      return '<li class="internship-stop"><div class="internship-axis" aria-hidden="true"><span></span></div><div class="internship-stop-main"><time' + (iso ? ' datetime="' + esc(iso) + '"' : "") + '>' + esc(startLabel) + '</time><button class="internship-card" type="button" data-open-page="' + esc(pageId) + '"><span class="internship-card-media" aria-hidden="true">' + media + '</span><span class="internship-card-copy"><small>' + esc(organization.label) + '</small><strong>' + esc(organization.value) + '</strong><small>实习岗位</small><span>' + esc(role) + '</span></span></button></div></li>';
    }).join("");
    return '<div class="internship-index"><header class="internship-index-head"><div>' +
      '<p class="folio">ISSUE 01 &nbsp; / &nbsp; 02 &nbsp; / &nbsp; EXPERIENCE</p>' +
      '<h1 class="page-title">实习经历</h1></div>' +
      '</header>' +
      '<ol class="internship-timeline" aria-label="实习时间轴">' + cards + '</ol></div>';
  }

  const smartcsShowcaseItems = [
    {
      id: "course", tab: "自然语言找课", image: "assets/images/projects/smartcs/showcase-course-results.png",
      alt: "SmartCS 课程搜索结果与推荐卡片", category: "自然语言找课", title: "自然语言驱动的课程搜索",
      value: "一句话描述需求，直接完成课程匹配",
      description: "用户无需逐项填写筛选条件，只需用自然语言描述培训主题、课程类型、地区、预算等需求，系统即可将口语化表达转换为结构化检索条件，并直接返回匹配课程。",
      tags: ["语义理解", "结构化检索", "条件可追溯"]
    },
    {
      id: "adjust", tab: "多轮调整", image: "assets/images/projects/smartcs/showcase-condition-adjustment.png",
      alt: "SmartCS 在连续搜索中调整并保留已确认条件的界面", category: "多轮调整", title: "上下文连续的多轮搜索",
      value: "像聊天一样持续调整搜索条件",
      description: "搜索并不是一次性的。系统会保留当前搜索任务状态，并理解“换成深圳”“预算高一点”“换成经营战略”等上下文表达，只更新本轮明确修改的条件，无需用户重新描述完整需求。",
      tags: ["多轮状态", "增量修改", "上下文连续"]
    },
    {
      id: "expert", tab: "智能找专家", image: "assets/images/projects/smartcs/showcase-expert-results.png",
      alt: "SmartCS 专家搜索结果中的讲师、擅长领域、行业与地区信息", category: "智能找专家", title: "面向培训需求的智能专家匹配",
      value: "从课程需求进一步匹配合适讲师",
      description: "除课程检索外，系统还支持专家推荐，可结合培训主题、服务行业、所在地区以及经验偏好筛选讲师，让“找老师”从传统人工咨询转化为可以直接完成的智能搜索。",
      tags: ["专家检索", "偏好排序", "资源路由"]
    },
    {
      id: "recovery", tab: "无结果恢复", image: "",
      alt: "SmartCS 无结果恢复实景截图待补充", category: "无结果恢复", title: "为搜索失败设计恢复路径",
      value: "没有结果，也不会让用户走进死胡同",
      description: "当筛选条件过严导致无结果时，系统不会擅自删除用户的预算、地区或课程类型，而是根据可调整条件给出恢复方案，并在用户确认后再放宽条件，保证搜索过程始终可解释、可恢复。",
      tags: ["零结果恢复", "条件保护", "用户确认"]
    },
    {
      id: "knowledge", tab: "知识问答", image: "assets/images/projects/smartcs/showcase-knowledge-handoff.png",
      alt: "SmartCS 知识依据不足时提示人工接管的对话界面", category: "知识问答", title: "统一处理搜索、咨询与服务问题",
      value: "不只是推荐课程，也是完整的智能客服入口",
      description: "SmartCS 会先判断用户当前是在寻找培训资源、咨询平台知识，还是处理售后问题，再进入对应业务链路。系统可基于知识库回答注册、课程类型、购买流程等常见问题，涉及退款、支付异常等场景时则进入人工服务流程。",
      tags: ["意图路由", "RAG知识库", "人工接管"]
    }
  ];

  function smartcsShowcase() {
    const first = smartcsShowcaseItems[0];
    return '<section class="product-showcase" aria-labelledby="smartcs-showcase-title">' +
      '<div class="product-showcase-heading"><h2 id="smartcs-showcase-title">产品实景</h2><p>五个核心场景 · 实景来自本地验收，无结果恢复截图待补</p></div>' +
      '<div class="product-showcase-body"><div class="showcase-preview">' +
        '<div class="showcase-media"><img data-smartcs-image src="' + esc(first.image) + '" alt="' + esc(first.alt) + '">' +
          '<div class="showcase-image-pending" data-smartcs-image-pending role="img" aria-label="无结果恢复界面截图待补充" hidden>无结果恢复<br>实景截图待补充</div></div>' +
        '<div class="showcase-selectors" aria-label="切换 SmartCS 产品场景">' + smartcsShowcaseItems.map(function (item, index) {
          return '<button type="button" data-smartcs-scene="' + esc(item.id) + '" aria-pressed="' + (index === 0) + '"><span class="showcase-selector-index">' + String(index + 1).padStart(2, "0") + '</span>' + esc(item.tab) + '</button>';
        }).join("") + '</div></div>' +
        '<div class="showcase-info" aria-live="polite" aria-atomic="true"><span class="showcase-count" data-smartcs-count>01 / 05</span>' +
          '<p class="showcase-category" data-smartcs-category>' + esc(first.category) + '</p>' +
          '<p class="showcase-feature-title" data-smartcs-title>' + esc(first.title) + '</p>' +
          '<h3 data-smartcs-value>' + esc(first.value) + '</h3>' +
          '<p class="showcase-description" data-smartcs-description>' + esc(first.description) + '</p>' +
          '<ul class="showcase-tags" data-smartcs-tags>' + first.tags.map(function (tag) { return '<li>' + esc(tag) + '</li>'; }).join("") + '</ul>' +
        '</div></div></section>';
  }

  const smartcsCase = {
    toc: [
      { id: "smartcs-case-01", index: "01", label: "背景介绍" },
      { id: "smartcs-case-02", index: "02", label: "挑战判断" },
      { id: "smartcs-case-03", index: "03", label: "方案设计" },
      { id: "smartcs-case-04", index: "04", label: "架构对比" },
      { id: "smartcs-case-05", index: "05", label: "数据结果" },
      { id: "smartcs-case-06", index: "06", label: "复盘" }
    ],
    requests: [
      { text: "公开课和内训课有什么区别？", path: "知识问答" },
      { text: "找上海的领导力公开课", path: "课程搜索" },
      { text: "给公司定制培训方案", path: "需求采集" },
      { text: "请转人工 / 退款问题", path: "人工服务" }
    ],
    challenges: [
      {
        title: "咨询与搜索混淆",
        caseId: "REAL-ORG-001",
        problem: "“我想给公司定制培训方案”曾被当成普通课程关键词，搜索为空。",
        judgment: "企业定制是方案咨询，不是一次课程检索。",
        rule: "先采集主题、对象、时间、地点、预算，而不是盲搜课程。"
      },
      {
        title: "多轮条件容易丢失",
        caseId: "REAL-CTX-005 · 跨轮用例",
        problem: "用户说“换一个城市，深圳”时，如果重写整段会话，已确认的销售技巧主题会丢失。",
        judgment: "维护当前任务，不重新解释整段会话。",
        rule: "只修改本轮明确变化的字段：替换地点，保留销售技巧主题。"
      },
      {
        title: "没有依据也可能给出看似确定的答复",
        caseId: "REAL-BND-002",
        problem: "旧测试曾出现占位客服电话。",
        judgment: "联系方式、政策和推荐理由必须来自可核实来源。",
        rule: "无依据时明确说明，并提供人工路径。"
      }
    ],
    flow: [
      { id: "task", label: "用户输入与当前任务", example: "例如：用户说“找上海的领导力公开课”，当前任务记下城市、课型和主题。" },
      { id: "semantic", label: "语义判断", example: "例如：“我想给公司定制培训方案”被判断为方案咨询，而不是课程关键词。" },
      { id: "authorize", label: "规则授权", example: "例如：已确认销售技巧后说“换一个城市，深圳”，规则只授权替换地点。" },
      { id: "route", label: "知识库回答 / 课程搜索 / 专家搜索 / 澄清或人工", note: "无结果时：给出可调整项 → 用户确认 → 重新搜索", example: "例如：有依据就回答或搜索；没有可靠依据、用户要求人工，或遇到退款、投诉，就停下来转人工。" },
      { id: "continue", label: "引用结果并延续会话", example: "例如：推荐说明只引用实际生效条件和返回结果，下一轮沿用同一任务。" }
    ],
    rules: [
      "已确认的城市、课型、主题与预算视为硬条件；修改或放宽时须有用户明确表达或确认。",
      "知识回答引用知识库，推荐说明引用实际生效条件与返回结果；不能把模型猜测写成事实。",
      "无可靠依据、明确要求人工、退款或投诉等需人工处理的事项，停止自动编造并进入人工服务。"
    ],
    architecture: {
      labels: ["动作触发", "跨轮条件", "事实依据", "异常兜底"],
      options: [
        {
          name: "候选方案",
          summary: "模型直接决定并组织全部动作",
          adopted: false,
          cells: [
            "模型同时决定是否搜索、回答或转人工，并组织全部后续动作。",
            "每轮重新理解整段会话，已确认的城市、主题或课型可能被改写。",
            "联系方式、政策和推荐理由可能由模型补写，来源难以核对。",
            "没有结果或没有依据时，仍可能给出看似确定的答复。"
          ]
        },
        {
          name: "采用方案",
          summary: "模型理解意图，规则授权工具与表述",
          adopted: true,
          cells: [
            "模型先判断意图；搜索、知识回答和人工是否执行，由规则授权。",
            "维护当前任务，只修改本轮明确变化的字段。",
            "知识回答引用知识库，推荐说明引用实际生效条件与返回结果。",
            "无可靠依据、明确要求人工，或退款、投诉时，停止自动编造并进入人工服务。"
          ]
        }
      ]
    },
    stages: [
      { value: "25/31", ratio: "80.65%", label: "初始测试" },
      { value: "29/31", ratio: "93.55%", label: "第一批修复后" },
      { value: "31/31", ratio: "100%", label: "最终回归" }
    ],
    fixes: [
      "企业定制误搜：不再把定制方案当成课程关键词，改为先采集需求。",
      "占位客服电话：没有核实来源时明确说明无法确认，并提供人工路径。",
      "跨轮地点/主题纠正：换城市或改主题时，只更新本轮明确变化的字段。"
    ],
    review: [
      {
        title: "有效的判断",
        items: ["把“能否搜索”放在搜索前。", "把用户确认条件与模型理解分开。", "用固定 badcase 回归推动迭代。"]
      },
      {
        title: "当前边界",
        items: ["本地测试集不等于线上真实效果。", "知识库覆盖与搜索相关性还需持续维护。", "人工接管的后续处理体验仍需实际运营验证。"]
      },
      {
        title: "下一步",
        items: ["收集线上问题并按意图和失败类型归因。", "追踪无答案、无结果与转人工路径。", "完善知识依据和推荐解释的验收口径。"]
      }
    ]
  };

  function smartcsChapter(id, index, kicker, title, subtitle, body) {
    return '<section class="smartcs-chapter" id="' + esc(id) + '" tabindex="-1" aria-labelledby="' + esc(id) + '-title">' +
      '<header class="smartcs-chapter-head"><span class="smartcs-chapter-index">' + esc(index) + '</span><div>' +
      '<p class="smartcs-chapter-kicker">' + esc(kicker) + '</p>' +
      '<h2 id="' + esc(id) + '-title">' + esc(title) + '</h2>' +
      (subtitle ? '<p class="smartcs-chapter-sub">' + esc(subtitle) + '</p>' : '') +
      '</div></header>' + body + '</section>';
  }

  function smartcsCaseToc() {
    return '<nav class="smartcs-toc" aria-label="案例章节">' + smartcsCase.toc.map(function (item) {
      return '<button type="button" data-smartcs-jump="' + esc(item.id) + '"><span>' + esc(item.index) + '</span>' + esc(item.label) + '</button>';
    }).join("") + '</nav>';
  }

  function smartcsBackgroundChapter() {
    const requests = '<div class="smartcs-request-column"><p class="smartcs-requests-label">示例请求</p><ul class="smartcs-requests">' +
      smartcsCase.requests.map(function (item) {
        return '<li class="smartcs-request"><q>' + esc(item.text) + '</q><span>' + esc(item.path) + '</span></li>';
      }).join("") + '</ul></div>';
    const body = '<div class="smartcs-background"><p class="smartcs-lead">淘课网的咨询同时涉及平台政策、课程与讲师搜索、企业定制和售后服务。用户往往用一句自然语言提出需求，但不同问题需要的依据与后续动作并不一样。SmartCS 要先判断用户想得到解释、推荐，还是人工帮助，再进入对应的服务路径。</p>' +
      requests +
      '<p class="smartcs-duty"><strong>我负责什么</strong>负责场景边界、应答规则、跨轮条件、联调验收与 badcase 迭代，并对接算法、研发和客服运营。</p></div>';
    return smartcsChapter("smartcs-case-01", "01", "背景介绍", "同一个客服入口，承接不同任务", "", body);
  }

  function smartcsChallengeChapter() {
    const rows = '<ol class="smartcs-cases">' + smartcsCase.challenges.map(function (item) {
      return '<li class="smartcs-case-row"><h3>' + esc(item.title) + '</h3>' +
        '<div><span>用户表达 / 暴露的问题</span><p>' + esc(item.problem) + '</p></div>' +
        '<div><span>产品判断</span><p>' + esc(item.judgment) + '</p></div>' +
        '<div><span>采取的规则</span><p>' + esc(item.rule) + '</p></div>' +
        '<small>' + esc(item.caseId) + '</small></li>';
    }).join("") + '</ol>' +
      '<p class="smartcs-conclusion">模型负责理解表达，确定性规则负责授权动作和守住事实边界。</p>';
    return smartcsChapter("smartcs-case-02", "02", "挑战判断", "先决定能否执行，再决定怎样回答", "", rows);
  }

  function smartcsSolutionChapter() {
    const track = smartcsCase.flow.map(function (step, index) {
      const button = '<button class="smartcs-flow-step" type="button" data-smartcs-flow="' + esc(step.id) + '" data-smartcs-example="' + esc(step.example) + '" aria-pressed="' + (index === 0) + '">' +
        esc(step.label) + (step.note ? '<small>' + esc(step.note) + '</small>' : '') + '</button>';
      const arrow = index < smartcsCase.flow.length - 1 ? '<span class="smartcs-flow-arrow" aria-hidden="true"><b class="smartcs-arrow-right">→</b><b class="smartcs-arrow-down">↓</b></span>' : '';
      return button + arrow;
    }).join("");
    const examples = '<ul class="smartcs-flow-all">' + smartcsCase.flow.map(function (step) {
      return '<li>' + esc(step.example) + '</li>';
    }).join("") + '</ul>';
    const body = '<p class="smartcs-lead">一次判断决定进入哪条服务路径。下面是产品决策，不是数据库拓扑。</p>' +
      '<div class="smartcs-flow" data-smartcs-flow-root>' +
      '<div class="smartcs-flow-track">' + track + '</div>' +
      '<div class="smartcs-flow-panel" aria-live="polite"><p data-smartcs-flow-current>' + esc(smartcsCase.flow[0].example) + '</p>' + examples + '</div></div>' +
      '<ol class="smartcs-rules">' + smartcsCase.rules.map(function (rule) {
        return '<li>' + esc(rule) + '</li>';
      }).join("") + '</ol>';
    return smartcsChapter("smartcs-case-03", "03", "方案设计", "一次判断，进入合适的服务路径", "", body);
  }

  function smartcsArchitectureChapter() {
    const labels = smartcsCase.architecture.labels;
    const columns = smartcsCase.architecture.options.map(function (option, index) {
      const column = '<article class="smartcs-compare-col' + (option.adopted ? ' is-adopted' : '') + '"><h3>' + esc(option.name) + '</h3><p>' + esc(option.summary) + '</p><dl>' +
        option.cells.map(function (cell, cellIndex) {
          return '<div><dt>' + esc(labels[cellIndex]) + '</dt><dd>' + esc(cell) + '</dd></div>';
        }).join("") + '</dl></article>';
      if (index === 0) return column + '<div class="smartcs-compare-bridge" aria-hidden="true"><span class="smartcs-arrow-right">→</span><span class="smartcs-arrow-down">↓</span><small>取舍</small></div>';
      return column;
    }).join("");
    const body = '<p class="smartcs-lead">比较的是两种产品做法，不是一次已经发生的系统迁移。</p>' +
      '<div class="smartcs-compare">' + columns + '</div>' +
      '<p class="smartcs-conclusion">前者实现快，但误搜、丢条件和无依据回答难审计；后者让搜索、RAG、澄清与人工接管有明确边界，代价是要维护规则、任务状态和回归用例。</p>' +
      '<p class="smartcs-tech"><span>Vue 前台</span><span>FastAPI 服务</span><span>知识检索</span><span>课程与讲师接口</span><span>会话状态</span></p>' +
      '<p class="smartcs-tech-note">PostgreSQL、Redis、Qdrant 等只作存储、任务状态和知识检索的补充。</p>' +
      '<details class="smartcs-note"><summary>组件如何对应</summary><p>Redis 保存多轮任务状态，PostgreSQL 持久化会话与消息，Qdrant 承担知识库向量检索。课程与讲师结果来自平台接口。这些组件说明采用方案落在哪些能力上，并不是两套已上线架构的迁移记录。</p></details>';
    return smartcsChapter("smartcs-case-04", "04", "方案比较", "架构对比", "为什么选择“模型理解＋规则约束”", body);
  }

  function smartcsResultsChapter() {
    const stages = '<ol class="smartcs-stages" aria-label="本地接口验收的三阶段通过数">' + smartcsCase.stages.map(function (stage) {
      return '<li><span class="smartcs-stage-dot" aria-hidden="true"></span><strong>' + esc(stage.value) + '</strong>' +
        '<span class="smartcs-stage-bar" aria-hidden="true"><span class="smartcs-stage-fill" style="width:' + esc(stage.ratio) + '"></span></span>' +
        '<span>' + esc(stage.label) + '</span></li>';
    }).join("") + '</ol>';
    const fixes = '<ul class="smartcs-fixes">' + smartcsCase.fixes.map(function (item) {
      return '<li>' + esc(item) + '</li>';
    }).join("") + '</ul>';
    const body = '<div class="smartcs-result-layout"><div><p class="smartcs-lead">同一套预设场景的本地接口验收，通过数经过 25/31、29/31，到达 31/31。</p>' + stages + '</div>' +
      '<aside class="smartcs-result-card"><strong>31 个预设场景、42 轮请求</strong><p>2026-09-08 · 本地接口验收</p></aside></div>' +
      '<p class="smartcs-fixed-label">已修复的三类代表性问题</p>' + fixes +
      '<p class="smartcs-caveat">31/31 只说明该固定测试集通过，不代表线上满意度、转化率或所有场景的正确率。</p>' +
      '<details class="smartcs-note"><summary>查看测试口径</summary><p>数字来自真实客服场景测试报告，执行日期 2026-09-08，服务为本地接口。测试文件 tests/fixtures/realistic_customer_service_test_set.json。初始测试 25/31，第一批修复后 29/31，补齐取消、主题纠正、结果反馈、人工转接、课程类型澄清、结果引用和知识回答关键词稳定性后为 31/31。这是预设场景的通过数，不能解释为线上满意度、转化率或全部场景正确率。</p></details>';
    return smartcsChapter("smartcs-case-05", "05", "数据结果", "展示验证过程，不冒充线上业务结果", "", body);
  }

  function smartcsReviewChapter() {
    const columns = '<div class="smartcs-review">' + smartcsCase.review.map(function (column) {
      return '<section><h3>' + esc(column.title) + '</h3><ul>' + column.items.map(function (item) {
        return '<li>' + esc(item) + '</li>';
      }).join("") + '</ul></section>';
    }).join("") + '</div>' +
      '<p class="smartcs-close">这段项目让我更明确：AI 客服的价值不只是回答得快，而是知道什么时候该查、该问、该停下来交给人。</p>';
    return smartcsChapter("smartcs-case-06", "06", "复盘", "规则更清楚，下一步仍需线上验证", "", columns);
  }

  function smartcsCaseChapters() {
    return '<div class="smartcs-case">' + smartcsCaseToc() + smartcsBackgroundChapter() + smartcsChallengeChapter() + smartcsSolutionChapter() + smartcsArchitectureChapter() + smartcsResultsChapter() + smartcsReviewChapter() + '</div>';
  }

  function smartcsPage() {
    const workItems = [
      { label: "角色", text: "担任 SmartCS 智能客服产品侧实习生，对接算法、研发和客服运营，负责场景边界、应答规则和验收口径。" },
      { label: "需求", text: "访谈一线客服和业务负责人，整理政策问答、找课程、找讲师、企业定制、闲聊和转人工等咨询。首期先分开两类请求：能依据知识库或真实搜索自动完成的，以及必须停下来转人工的。" },
      { label: "设计", text: "参与应答链路和兜底设计。模型负责听懂目标；是否搜索、是否改写用户已确认的城市、课型和主题，由规则授权。知识库没有依据、用户明确要求，或退款、投诉等需人工处理的事项，转人工，不编造政策和联系方式。与算法对齐的口径是：先完成一次语义判断，确认允许检索后再搜索。" },
      { label: "迭代", text: "用 31 个真实客服场景、42 轮对话做回归。初测 25/31，按周处理 badcase，包括企业定制被当成课程关键词、客服电话被编成占位号码、换城市或改课型时丢失原主题，复测经 29/31 到 31/31。" },
      { label: "产出", text: "本地验收由 109/360 提升至 360/360。\"答非所问\"类 badcase 占比由 30% 降至 10%。\"答非所问\"中的三类问题，解释性问题误触发搜索、企业定制被误搜、无依据时编造联系方式或政策，均已在该测试集中通过。" }
    ];
    return '<section class="smartcs-hero" aria-labelledby="smartcs-hero-title">' +
      '<p class="folio">ISSUE 01 &nbsp; / &nbsp; 03 &nbsp; / &nbsp; INTERNSHIP</p>' +
      '<h1 class="page-title smartcs-hero-title" id="smartcs-hero-title">SmartCS 智能客服</h1>' +
      '<div class="smartcs-hero-facts">' +
        '<div class="smartcs-hero-fact-column smartcs-hero-fact-left">' +
          '<div class="smartcs-hero-info-row" style="--fact-delay:140ms"><strong>公司：</strong><span>上海淘课企业管理咨询有限公司</span></div>' +
          '<div class="smartcs-hero-info-row" style="--fact-delay:200ms"><strong>地点：</strong><span>上海市徐汇区宜山路</span></div>' +
        '</div>' +
        '<div class="smartcs-company-photo"><img src="./assets/company.png" alt="上海淘课企业管理咨询有限公司"><span aria-hidden="true">公司照片待上传</span></div>' +
        '<div class="smartcs-hero-fact-column smartcs-hero-fact-right">' +
          '<div class="smartcs-hero-info-row" style="--fact-delay:260ms"><strong>实习岗位：</strong><span>AI 产品经理</span></div>' +
          '<div class="smartcs-hero-info-row" style="--fact-delay:320ms"><strong>实习时长：</strong><span>2026.07~2026.10</span></div>' +
          '<div class="smartcs-hero-info-row" style="--fact-delay:380ms"><strong>负责项目：</strong><span>SmartCS 智能客服</span></div>' +
        '</div>' +
      '</div>' +
      '<h2 class="smartcs-hero-work-title">主要工作：</h2>' +
      '<ul class="smartcs-hero-work">' + workItems.map(function (item) {
        return '<li><strong>' + esc(item.label) + '</strong>：' + esc(item.text) + '</li>';
      }).join("") + '</ul>' +
      '<a class="paper-link smartcs-hero-action" href="https://tk-service.taoke.com/chat-box?scenario=taoke_frontdesk" target="_blank" rel="noopener noreferrer">在线体验 SmartCS <span aria-hidden="true">→</span></a>' +
      '</section>' +
      smartcsShowcase() +
      smartcsCaseChapters() +
      '<div class="button-row"><a class="paper-link" href="https://tk-service.taoke.com/chat-box?scenario=taoke_frontdesk" target="_blank" rel="noopener noreferrer">体验在线客服 ↗</a>' + openButton("internships", "返回实习目录") + '</div>';
  }

  function workLink(href, label, secondary) {
    return '<a class="paper-link' + (secondary ? " secondary" : "") + '" href="' + esc(href) + '" target="_blank" rel="noopener noreferrer">' + esc(label) + "</a>";
  }
  function workHero(page) {
    return '<header class="work-hero"><div class="work-hero-copy">' +
      '<p class="folio">ISSUE 01 &nbsp; / &nbsp; ' + esc(page.number) + " &nbsp; / &nbsp; PROJECT</p>" +
      '<h1 class="page-title">' + esc(page.title) + "</h1>" +
      '<p class="work-status">' + esc(page.status) + "</p>" +
      '<p class="work-lead">' + esc(page.lead) + "</p>" +
      '<ul class="work-facts">' + page.facts.map(function (fact) { return "<li>" + esc(fact) + "</li>"; }).join("") + "</ul>" +
      '<div class="button-row">' + page.actions + "</div></div>" +
      '<figure class="work-frame work-hero-figure"><img src="' + esc(page.image) + '" alt="' + esc(page.alt) + '">' +
      "<figcaption>" + esc(page.caption) + "</figcaption></figure></header>";
  }
  function workChapter(number, title, body) {
    return '<section class="work-chapter"><h2 class="work-chapter-title">' + esc(number) + " / " + esc(title) + "</h2>" + body + "</section>";
  }
  function workProblems(items, note) {
    return '<ul class="work-problems">' + items.map(function (item) {
      return "<li><strong>" + esc(item.title) + "</strong><p>" + esc(item.text) + "</p></li>";
    }).join("") + '</ul><p class="work-note">' + esc(note) + "</p>";
  }
  function workJudgments(items) {
    return '<ol class="work-judgments">' + items.map(function (item) {
      return '<li><span class="work-num">' + esc(item.num) + '</span><div><h3>' + esc(item.title) + "</h3>" +
        "<p><strong>遇到的问题：</strong>" + esc(item.problem) + "</p>" +
        "<p><strong>我的决定：</strong>" + esc(item.decision) + "</p>" +
        "<p><strong>落实方式：</strong>" + esc(item.action) + "</p></div></li>";
    }).join("") + "</ol>";
  }
  function workFlow(nodes) {
    return '<ol class="work-flow">' + nodes.map(function (node) { return "<li>" + esc(node) + "</li>"; }).join("") + "</ol>";
  }
  function workMetrics(items) {
    return '<div class="work-metrics">' + items.map(function (item) {
      return "<article><strong>" + esc(item.value) + "</strong><span>" + esc(item.label) + "</span><p>" + esc(item.note) + "</p></article>";
    }).join("") + "</div>";
  }
  function workCompare(title, left, right, note) {
    return '<article class="work-compare"><h3>' + esc(title) + '</h3><div class="work-compare-cols"><p>' + esc(left) + "</p><p>" + esc(right) + '</p></div><p class="work-note">' + esc(note) + "</p></article>";
  }
  function workGallery(images, selected, note) {
    const current = images[selected];
    return '<figure class="work-frame work-scene-figure"><span class="work-index" data-gallery-number>' + esc(current.number) + '</span><img data-gallery-main src="' + esc(current.src) + '" alt="' + esc(current.alt) + '"><figcaption data-gallery-caption>' + esc(current.caption) + "</figcaption></figure>" +
      '<div class="gallery-controls work-gallery-controls" role="group" aria-label="切换产品截图">' + images.map(function (item, index) {
        return '<button class="paper-button secondary" type="button" data-gallery-image="' + esc(item.src) + '" data-gallery-label="' + esc(item.alt) + '" data-gallery-caption="' + esc(item.caption) + '" data-gallery-number="' + esc(item.number) + '" aria-pressed="' + (index === selected) + '">' + esc(item.button) + "</button>";
      }).join("") + '</div><p class="work-note">' + esc(note) + "</p>";
  }

  function projectIndexPage() {
    return header("05", "PROJECTS", "项目作品", "先看真实界面，再看我如何定义问题、做出取舍并验证。") +
      '<div class="catalogue-grid">' +
        catalogueCard("zhiji", "已上线 · 个人项目", "知迹", "让学习者按目标推进学习，也让研究者能回到原始对话复核过程。", "assets/images/projects/zhiji/guided-learning.png", "学习者端＋研究者端 · 检索评测 17 题", "知迹系统学习中的学习状态与对话界面") +
        catalogueCard("yanko", "免登录演示 · 个人项目", "Yanko 言行", "聊天可以提出计划和记忆建议；是否保存，由用户决定。", "assets/images/projects/yanko/demo-chat.png", "可体验 Demo · 80 条合成评测样本", "Yanko 免登录演示中的对话和计划建议界面") +
        catalogueCard("studyagent", "原型验证 · 独立完成", "考途 StudyAgent", "把教材章节整理为重点、练习与复习计划。", "assets/images/projects/studyagent/workflow.png") +
      '</div>';
  }

  function zhijiPage() {
    const shots = [
      { src: "assets/images/projects/zhiji/learner-home.png", button: "学习入口", number: "01", alt: "知迹学习入口，从首页进入课程或学习助手", caption: "从首页进入课程或学习助手 · 演示数据" },
      { src: "assets/images/projects/zhiji/guided-learning.png", button: "系统学习", number: "02", alt: "知迹系统学习中的学习状态与对话界面", caption: "目标、学习单元与对话在同一界面推进 · 演示数据" },
      { src: "assets/images/projects/zhiji/recap.png", button: "学习复盘", number: "03", alt: "知迹学习复盘界面，展示本次过程与待加强内容", caption: "会话结束后查看本次过程与待加强内容 · 演示数据" },
      { src: "assets/images/projects/zhiji/growth-map.png", button: "成长视图", number: "04", alt: "知迹成长视图，按课程与主题整理学习记录", caption: "按课程与主题整理学习记录 · 演示数据" }
    ];
    return '<article class="work-case">' +
      workHero({
        number: "06",
        title: "知迹｜把学习过程变成可复核的证据",
        status: "个人项目 · 学习者端与研究者端已上线",
        lead: "学习者可以直接提问，也可以进入有目标、诊断、反馈和复盘的系统学习。研究者看到的不只是一张总结图，还能定位原始对话并独立复核 AI 评价。",
        facts: ["我的角色：独立完成产品设计、开发与验收", "当前阶段：功能已上线，教学效果尚未验证"],
        actions: workLink("https://8.218.22.55/learner/login", "体验学习者端 →") + workLink("https://8.218.22.55/admin/login", "查看研究者端 →", true),
        image: "assets/images/projects/zhiji/guided-learning.png",
        alt: "知迹系统学习中的学习状态与对话界面",
        caption: "系统学习界面 · 演示数据"
      }) +
      workChapter("01", "产品实景",
        '<p class="work-prose">按一次学习任务看界面：从进入学习，到留下能够追溯的过程记录。</p>' +
        '<div class="work-video-slot" data-zhiji-video></div>' +
        workGallery(shots, 1, "截图取自演示账号；研究者端的原始对话定位和人工复核见下方方案说明及线上入口。")) +
      workChapter("02", "背景与挑战",
        '<p class="work-prose">普通问答能回答眼前的问题，却很难判断学习者是否真正理解、哪里需要帮助。研究者若只看自动生成的总结，也无法检查判断依据来自哪句话。知迹因此同时设计了学习路径和过程证据。</p>' +
        workProblems([
          { title: "学习入口", text: "所有提问都进入教学流程，会打断只想快速获得解释的用户。" },
          { title: "学习判断", text: "学习者说“我不知道”时，不能把系统讲解当成他已经掌握。" },
          { title: "研究复核", text: "自动编码与摘要需要能回到原文，也需要保留人工判断。" }
        ], "以上是产品设计与验收中明确的问题，不作为用户访谈结论呈现。")) +
      workChapter("03", "我做的三个判断", workJudgments([
        { num: "01", title: "直接问答与系统学习分开", problem: "普通问题被推入目标协商，用户难以直接得到解释。", decision: "默认直接问答；用户明确选择系统学习后，才进入目标、诊断和计划。", action: "新会话可选择模式，会话中可切换；暂停学习保留原进度。" },
        { num: "02", title: "“不会”先得到帮助，不被判为掌握", problem: "“我不知道／没听懂”曾可能跳过针对性支持，直接结束单元。", decision: "在检测环节先给解释、提示或示范，再给一个更小的验证问题；同一单元最多一次补救。", action: "仍不会就记录为待加强，继续学习；系统讲解不替代学习者作答。" },
        { num: "03", title: "AI 评价与人工复核分开", problem: "只保留自动编码，研究者无法清楚区分模型结论与人工判断。", decision: "原始对话、AI 编码与人工评价分别保留，研究者可定位证据。", action: "综合视图有人工评价时优先人工；缺失时显示缺失，不补造历史数据。" }
      ])) +
      workChapter("04", "方案如何运作",
        workFlow(["选择直接问答或系统学习", "明确目标与初始诊断", "微教学、检测与有限补救", "保存复盘、误区和引用", "研究者筛选并定位原文"]) +
        '<p class="work-prose">模型负责解释、反馈与摘要；状态规则负责何时推进、何时补救。研究者的人工评价独立保存，不覆盖原始对话和 AI 结果。</p>' +
        '<p class="work-note">课程资料检索可在静态索引不可用时回退至课程知识库；无可靠资料时不把回答说成有课程依据。</p>') +
      workChapter("05", "验证到了什么",
        workMetrics([
          { value: "76.5% → 100%", label: "Hit@3", note: "17 道课程资料问题；BGE-M3 检索加入查询扩展前后，本地评测，2026-09-28。只证明前三条结果中标准片段的命中情况。" },
          { value: "216 / 216", label: "本地后端回归", note: "2026-10-09 的本地修复验收，0 失败、0 跳过；不是线上使用量或学习效果。" }
        ]) +
        workCompare("从“我不知道”到“针对性帮助”", "原问题：知识缺口可能直接被标成待加强，未先得到解释或提示。", "修复后：先给针对性支架和更小的问题；仍不会才记录待加强，且不误标已掌握。", "依据：2026-10-09 第二轮人工验收，本地定向测试 25 项。") +
        '<p class="work-note">检索命中率、自动化回归与演示数据，都不能证明真实学生的学习提升。</p>') +
      workChapter("06", "复盘",
        '<p class="work-prose">目前已经跑通学习者到研究者的功能链路，也建立了检索和状态规则的本地验证。下一步需要让教师或研究者审核更多课程问题，并用真实学习任务检验反馈质量；研究图表只呈现记录到的过程，不解释为教学因果效果。</p>' +
        '<details class="work-extra"><summary>补充：学习路径交互示意</summary><p class="work-note">本地静态演示，不连接真实模型</p><iframe src="projects/zhiji-prototype.html" title="知迹学习路径交互原型" loading="lazy"></iframe></details>' +
        '<div class="button-row">' + workLink("https://8.218.22.55/learner/login", "体验学习者端 →") + workLink("https://8.218.22.55/admin/login", "查看研究者端 →", true) + workLink("https://github.com/aurelialabs/zhiji", "查看项目代码 →", true) + openButton("projects", "返回项目目录") + "</div>") +
      "</article>";
  }

  function yankoPage() {
    const steps = [
      { title: "用户表达", text: "“下周想整理作品集。”" },
      { title: "系统理解", text: "识别为计划线索，先询问是否需要记下来。" },
      { title: "确认卡", text: "用户检查名称、层级和时间，也可以拒绝。" },
      { title: "正式计划", text: "只在确认后创建；拒绝则不创建。" }
    ];
    return '<article class="work-case">' +
      workHero({
        number: "07",
        title: "Yanko 言行｜聊天里的计划，确认后才生效",
        status: "个人项目 · 免登录演示已上线",
        lead: "用户在聊天里表达安排时，AI 可以理解并提出建议，但不会替用户直接创建计划。长期记忆也先让用户决定保存内容和作用范围。",
        facts: ["我的角色：独立完成产品定义、策略、开发与验证", "当前阶段：可体验 Demo，尚无真实用户长期效果数据"],
        actions: workLink("https://yanko-three.vercel.app/chat", "体验免登录 Demo →") + workLink("https://github.com/aurelialabs/yanko", "查看项目代码 →", true),
        image: "assets/images/projects/yanko/demo-chat.png",
        alt: "Yanko 免登录演示中的对话和计划建议界面",
        caption: "免登录 Demo 界面 · 数据保存在当前浏览器"
      }) +
      workChapter("01", "产品实景",
        '<p class="work-prose">以一句“下周想整理作品集”为例，看系统怎样从聊天走到用户确认。</p>' +
        '<figure class="work-frame work-scene-figure"><span class="work-index">01</span><img src="assets/images/projects/yanko/demo-chat.png" alt="Yanko 免登录演示中的对话和计划建议界面"><figcaption>当前免登录 Demo 的真实界面；会话数据保存在浏览器本地。</figcaption></figure>' +
        '<p class="work-kicker">交互逻辑示意 · 非产品截图</p>' +
        '<ol class="work-storyboard">' + steps.map(function (step, index) {
          return '<li><span class="work-index">' + String(index + 1).padStart(2, "0") + "</span><strong>" + esc(step.title) + "</strong><p>" + esc(step.text) + "</p></li>";
        }).join("") + "</ol>") +
      workChapter("02", "背景与挑战",
        '<p class="work-prose">持续陪伴不是让模型记住和执行更多，而是让用户知道它记住了什么、何时会行动。误建计划、错误记忆和人设偏移都会损害信任，因此首版先处理这些可观察的失败场景。</p>' +
        workProblems([
          { title: "误建计划", text: "随口提到安排，不代表授权创建待办。" },
          { title: "记忆越界", text: "敏感经历和角色专属信息，不应未经确认或跨角色使用。" },
          { title: "人设偏移", text: "长对话或诱导输入可能使回复偏离角色设定。" }
        ], "这些是 PRD 与合成评测定义的场景，不写成线上用户投诉。")) +
      workChapter("03", "我做的两个判断", workJudgments([
        { num: "01", title: "把“听懂”与“写入”分成两步", problem: "模型可能把愿望、建议或情绪表达误判为正式计划。", decision: "模型先识别意图与日／周／月／年层级；策略层决定只回应、询问或展示确认卡。", action: "计划卡可以编辑，用户确认后才写入；拒绝不产生正式计划。" },
        { num: "02", title: "记忆必须有范围，也要能反悔", problem: "记忆越多不一定越好，错误保存或跨角色调用会破坏信任。", decision: "区分用户共享与角色专属；敏感记忆只能经确认保存。", action: "候选记忆可修改、确认或拒绝；已保存记忆可管理。" }
      ])) +
      workChapter("04", "方案如何运作",
        workFlow(["用户发送消息", "模型理解与生成", "策略校验意图、范围与风险", "展示可编辑建议", "用户确认后写入"]) +
        '<ul class="work-side-notes"><li>计划：确认前只是建议，不是正式记录。</li><li>记忆：区分用户共享、角色专属和敏感内容。</li><li>反馈：人设偏移等问题进入 Badcase 复核。</li></ul>' +
        '<p class="work-note">方案链路结合完整产品实现与演示行为，Demo 数据保存在当前浏览器。</p>') +
      workChapter("05", "验证到了什么",
        workMetrics([{ value: "80 条", label: "合成评测基线", note: "覆盖人设、角色隔离、计划、记忆、情绪与安全；其中 32 条 dev 用于初筛，48 条冻结 test 在现有报告中尚未运行。" }]) +
        workCompare("拒绝计划，不创建正式记录", "风险：如果模型一识别到安排就直接写入，用户无法纠正或撤销误判。", "验收：计划建议先进入编辑确认；拒绝后不创建正式计划。", "本地合成账号及流程验收，不是线上误建率。") +
        '<article class="work-plain-card"><h3>模型选择没有用单一分数拍板</h3><p class="work-prose">6 道生成文本盲评经分歧裁决后，DeepSeek 与 MiniMax 各赢 3 题。质量、结构可靠性、安全、延迟和数据处理条件需分别看；现有证据不支持宣布生产模型已选定。</p></article>') +
      workChapter("06", "复盘",
        '<p class="work-prose">首版把角色、记忆、计划和反馈串成了可演示的闭环，但免登录 Demo 的浏览器本地数据不能说明长期陪伴是否有效。接下来应补真实授权用户的任务观察，重点看计划误创建、记忆纠正与角色一致性；生产模型仍需完成独立测试和数据处理条件核查。</p>' +
        '<div class="button-row">' + workLink("https://yanko-three.vercel.app/chat", "体验免登录 Demo →") + workLink("https://github.com/aurelialabs/yanko", "查看项目代码 →", true) + openButton("projects", "返回项目目录") + "</div>") +
      "</article>";
  }

  function studyagentPage() {
    const screenshots = [
      { src: "assets/images/projects/studyagent/workflow.png", label: "六节点工作流配置" },
      { src: "assets/images/projects/studyagent/input.png", label: "教材与学习条件输入" },
      { src: "assets/images/projects/studyagent/output.png", label: "结构化复习报告输出" }
    ];
    return header("08", "PROJECT", "考途 StudyAgent", "从教材章节到重点、练习和复习计划的 Dify Workflow 原型。") +
      '<figure class="media-showcase"><img data-gallery-main src="' + screenshots[0].src + '" alt="' + screenshots[0].label + '"><figcaption data-gallery-caption>' + screenshots[0].label + ' · 真实界面</figcaption></figure>' +
      '<div class="button-row">' + screenshots.map(function (image) {
        return '<button class="paper-button secondary" type="button" data-gallery-image="' + esc(image.src) + '" data-gallery-label="' + esc(image.label) + '">' + esc(image.label) + '</button>';
      }).join("") + '</div>' +
      '<div class="detail-columns">' +
        detailBlock("解决的问题", '<p>' + esc(paragraph(studyagent, "problem")) + '</p>') +
        detailBlock("我的角色", '<p>独立完成产品范围、Workflow 节点职责、Prompt 文档、测试与迭代。</p>') +
        detailBlock("核心功能", '<p>章节解析、重点提炼、背诵笔记、自测题、答案解析和复习计划，六个节点依次加工内容。</p>') +
        detailBlock("技术与过程", '<p>Dify Workflow、Prompt 设计和变量依赖检查；用真实教育学 PDF 做端到端测试，并记录答案错位、长文本泛化等问题。</p>') +
        detailBlock("实际成果", '<p>完成可运行的 Workflow、Web App、PRD、Prompt 文档、测试报告与公开仓库。当前仍处于原型验证阶段。</p>') +
      '</div><div class="button-row"><a class="paper-link" href="https://udify.app/workflow/Ml6LKD4l0pltIw54q" target="_blank" rel="noopener noreferrer">体验线上 Demo ↗</a>' +
      '<a class="paper-link secondary" href="https://github.com/aurelialabs/studyagent-dify" target="_blank" rel="noopener noreferrer">查看项目仓库 ↗</a>' + openButton("projects", "返回项目目录") + '</div>';
  }

  function skillsPage() {
    return header("10", "SKILLS & EDUCATION", "技能与教育", "做过的事，和还在学习的事。") +
      '<div class="detail-columns">' +
        detailBlock("产品工作", '<p>需求拆解、用户研究、PRD、工作流设计、异常场景梳理、测试验收与迭代优先级。</p>') +
        detailBlock("大模型应用", '<p>Prompt、RAG 知识库、多轮对话状态、工具调用边界与结果可解释性；用真实问题和失败案例检查效果。</p>') +
        detailBlock("工具与方法", '<p>Dify Workflow、SPSS、AHP；能与前后端和算法同学讨论 Vue、FastAPI、MySQL、向量检索及搜索服务的产品接口。</p>') +
        detailBlock("教育经历", '<p>南京师范大学 · 教育技术学理学硕士（2025.09—至今）；长沙学院 · 计算机人工智能方向工学学士（2021.09—2025.06）。</p>') +
      '</div><div class="ink-note">技能清单来自当前项目实践；具体熟练程度和证据可以在后续简历与项目材料中进一步展开。</div>' +
      '<div class="button-row">' + openButton("contact", "联系我") + '</div>';
  }

  function contactPage() {
    const email = profile.email || "";
    const phone = profile.phone || "";
    const github = profile.github || "";
    return header("11", "CONTACT", "联系我", "他们跟着季节走，跟着水草走，看似漂泊，却从未迷失方向。") +
      '<div class="letter"><p>你好，</p><p>感谢您翻完这本作品集。若想进一步了解我，可以通过下面的方式联系我。</p>' +
      '<div class="contact-row"><strong>邮箱</strong><a href="mailto:' + esc(email) + '">' + esc(email) + '</a><button type="button" data-copy="' + esc(email) + '">复制</button></div>' +
      '<div class="contact-row"><strong>电话</strong><a href="tel:' + esc(phone) + '">' + esc(phone) + '</a><button type="button" data-copy="' + esc(phone) + '">复制</button></div>' +
      '<div class="contact-row"><strong>GitHub</strong><a href="' + esc(github) + '" target="_blank" rel="noopener noreferrer">' + esc(github.replace(/^https?:\/\//, "")) + '</a><button type="button" data-copy="' + esc(github) + '">复制</button></div>' +
      '<p>期待你的来信。<br>肖依婷</p></div>' +
      '<div class="button-row"><a class="paper-link" href="resume.html?from=contact">查看简历 →</a></div>';
  }

  const pages = [
    { id: "about", group: "about", title: "关于我", render: aboutPage },
    { id: "internships", group: "internships", title: "实习目录", render: internshipIndexPage },
    { id: "smartcs", group: "internships", title: "SmartCS 智能客服", render: smartcsPage },
    { id: "projects", group: "projects", title: "项目目录", render: projectIndexPage },
    { id: "zhiji", group: "projects", title: "知迹", render: zhijiPage },
    { id: "yanko", group: "projects", title: "Yanko 言行", render: yankoPage },
    { id: "studyagent", group: "projects", title: "考途 StudyAgent", render: studyagentPage },
    { id: "skills", group: "skills", title: "技能与教育", render: skillsPage },
    { id: "contact", group: "contact", title: "联系我", render: contactPage }
  ];
  let activeIndex = -1;
  let transitionToken = 0;
  let smartcsSceneObserver = null;
  let smartcsChapterReveal = null;
  let smartcsShowcaseSwitchToken = 0;

  function setupSmartcsScenes() {
    const hero = paper.querySelector(".smartcs-hero");
    if (!hero) return;
    if (hero) {
      const companyPhoto = hero.querySelector(".smartcs-company-photo");
      const companyImage = companyPhoto.querySelector("img");
      function showCompanyPlaceholder() { companyPhoto.classList.add("is-missing"); }
      function showCompanyPhoto() { companyPhoto.classList.add("is-loaded"); }
      companyImage.addEventListener("error", showCompanyPlaceholder, { once: true });
      companyImage.addEventListener("load", showCompanyPhoto, { once: true });
      if (companyImage.complete) {
        if (companyImage.naturalWidth === 0) showCompanyPlaceholder();
        else showCompanyPhoto();
      }
    }
    const flow = paper.querySelector("[data-smartcs-flow-root]");
    if (flow) {
      flow.classList.add("is-enhanced");
      const firstStep = flow.querySelector("[data-smartcs-flow]");
      if (firstStep) selectSmartcsFlow(firstStep);
    }
    if (prefersReducedMotion || !("IntersectionObserver" in window)) return;
    if (hero) hero.setAttribute("data-reveal-ready", "");
    if (hero) {
      const action = hero.querySelector(".smartcs-hero-action");
      function finishEntrance(event) {
        if (event.propertyName !== "opacity") return;
        hero.classList.add("is-entered");
        action.removeEventListener("transitionend", finishEntrance);
      }
      action.addEventListener("transitionend", finishEntrance);
    }
    smartcsSceneObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.2) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { root: paper, threshold: 0.2 });
    if (hero) smartcsSceneObserver.observe(hero);
    paper.querySelectorAll(".smartcs-chapter").forEach(function (chapter) {
      chapter.setAttribute("data-reveal-ready", "");
    });
    if (smartcsChapterReveal) paper.removeEventListener("scroll", smartcsChapterReveal);
    smartcsChapterReveal = function () {
      const paperRect = paper.getBoundingClientRect();
      paper.querySelectorAll(".smartcs-chapter[data-reveal-ready]:not(.is-visible)").forEach(function (chapter) {
        const rect = chapter.getBoundingClientRect();
        if (rect.bottom > paperRect.top + 12 && rect.top < paperRect.bottom - 12) chapter.classList.add("is-visible");
      });
    };
    paper.addEventListener("scroll", smartcsChapterReveal, { passive: true });
    smartcsChapterReveal();
  }

  function selectSmartcsFlow(button) {
    const flow = button.closest("[data-smartcs-flow-root]");
    if (!flow) return;
    const example = flow.querySelector("[data-smartcs-flow-current]");
    flow.querySelectorAll("[data-smartcs-flow]").forEach(function (node) {
      node.setAttribute("aria-pressed", String(node === button));
    });
    if (example) example.textContent = button.getAttribute("data-smartcs-example") || "";
  }

  function scrollSmartcsChapter(button) {
    const target = document.getElementById(button.getAttribute("data-smartcs-jump"));
    if (!target || !paper.contains(target)) return;
    const top = target.getBoundingClientRect().top - paper.getBoundingClientRect().top + paper.scrollTop - 8;
    paper.scrollTo({ top: Math.max(0, top), behavior: prefersReducedMotion ? "auto" : "smooth" });
    paper.querySelectorAll("[data-smartcs-jump]").forEach(function (item) {
      if (item === button) item.setAttribute("aria-current", "true");
      else item.removeAttribute("aria-current");
    });
    target.focus({ preventScroll: true });
  }

  function selectSmartcsShowcase(button) {
    const itemIndex = smartcsShowcaseItems.findIndex(function (item) { return item.id === button.dataset.smartcsScene; });
    const showcase = button.closest(".product-showcase");
    if (!showcase || itemIndex < 0 || button.getAttribute("aria-pressed") === "true") return;
    const item = smartcsShowcaseItems[itemIndex];
    const token = ++smartcsShowcaseSwitchToken;
    const preview = showcase.querySelector(".showcase-media");
    const info = showcase.querySelector(".showcase-info");
    function update() {
      if (token !== smartcsShowcaseSwitchToken || !showcase.isConnected) return;
      const image = showcase.querySelector("[data-smartcs-image]");
      const pending = showcase.querySelector("[data-smartcs-image-pending]");
      image.hidden = !item.image;
      pending.hidden = Boolean(item.image);
      if (item.image) image.src = item.image;
      else image.removeAttribute("src");
      image.alt = item.alt;
      showcase.querySelector("[data-smartcs-count]").textContent = String(itemIndex + 1).padStart(2, "0") + " / 05";
      showcase.querySelector("[data-smartcs-category]").textContent = item.category;
      showcase.querySelector("[data-smartcs-title]").textContent = item.title;
      showcase.querySelector("[data-smartcs-value]").textContent = item.value;
      showcase.querySelector("[data-smartcs-description]").textContent = item.description;
      showcase.querySelector("[data-smartcs-tags]").innerHTML = item.tags.map(function (tag) { return "<li>" + esc(tag) + "</li>"; }).join("");
      showcase.querySelectorAll("[data-smartcs-scene]").forEach(function (selector) {
        selector.setAttribute("aria-pressed", String(selector === button));
      });
      window.requestAnimationFrame(function () {
        if (token !== smartcsShowcaseSwitchToken || !showcase.isConnected) return;
        preview.classList.remove("is-switching");
        info.classList.remove("is-switching");
      });
    }
    if (prefersReducedMotion) { update(); return; }
    preview.classList.add("is-switching");
    info.classList.add("is-switching");
    window.setTimeout(update, 130);
  }

  function mountZhijiVideo() {
    const slot = paper.querySelector("[data-zhiji-video]");
    if (!slot) return;
    fetch("assets/videos/zhiji-demo.mp4", { method: "HEAD", cache: "no-store" }).then(function (response) {
      if (!response.ok || !slot.isConnected) return;
      const type = (response.headers.get("content-type") || "").toLowerCase();
      if (type.indexOf("text/html") !== -1 || type.indexOf("application/json") !== -1) return;
      if (type && type.indexOf("video/") !== 0 && type.indexOf("application/mp4") === -1 && type.indexOf("application/octet-stream") === -1) return;
      slot.innerHTML = '<figure class="work-frame work-video"><video controls playsinline preload="none" poster="assets/images/projects/zhiji/guided-learning.png" aria-label="知迹本地演示录屏，使用演示账号和样例学习数据"><source src="assets/videos/zhiji-demo.mp4" type="video/mp4"></video><figcaption>本地演示录屏，使用演示账号和样例学习数据；不代表真实学生学习成效。</figcaption></figure>';
    }).catch(function () {});
  }

  function render(index) {
    const current = pages[index];
    if (!current) return;
    if (smartcsSceneObserver) { smartcsSceneObserver.disconnect(); smartcsSceneObserver = null; }
    if (smartcsChapterReveal) { paper.removeEventListener("scroll", smartcsChapterReveal); smartcsChapterReveal = null; }
    smartcsShowcaseSwitchToken++;
    activeIndex = index;
    paper.innerHTML = current.render();
    if (current.id === "smartcs") setupSmartcsScenes();
    if (current.id === "zhiji") mountZhijiVideo();
    paper.scrollTop = 0;
    pageCount.textContent = String(index + 1).padStart(2, "0") + " / " + String(pages.length).padStart(2, "0");
    pageTitle.textContent = current.title;
    prevButton.disabled = index === 0;
    nextButton.disabled = index === pages.length - 1;
    document.querySelectorAll(".chapter-tabs [data-page]").forEach(function (button) {
      if (button.dataset.page === current.group) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
    paper.focus({ preventScroll: true });
  }
  function openPage(id) {
    const index = pages.findIndex(function (page) { return page.id === id; });
    if (index < 0) return;
    if (!dialog.open) {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
      render(index);
      return;
    }
    if (index === activeIndex) return;
    const token = ++transitionToken;
    if (prefersReducedMotion) { render(index); return; }
    paper.classList.remove("turn-in");
    paper.classList.add("turn-out");
    window.setTimeout(function () {
      if (token !== transitionToken) return;
      render(index);
      paper.classList.remove("turn-out");
      paper.classList.add("turn-in");
    }, 190);
  }
  function route(id) {
    window.location.hash = id;
    if (window.location.hash === "#" + id) openPage(id);
  }
  function closeMagazine() {
    if (dialog.open) dialog.close();
    if (window.location.hash !== "#home") window.location.hash = "home";
  }
  function copyValue(value, button) {
    function done() {
      const original = button.textContent;
      button.textContent = "已复制";
      window.setTimeout(function () { button.textContent = original; }, 1800);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(done).catch(function () { fallbackCopy(value, done); });
    } else fallbackCopy(value, done);
  }
  function fallbackCopy(value, done) {
    const field = document.createElement("textarea");
    field.value = value;
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.append(field);
    field.select();
    try { if (document.execCommand("copy")) done(); } catch (_error) { /* Leave button unchanged. */ }
    field.remove();
  }

  document.addEventListener("focusin", function (event) {
    const flowButton = event.target.closest && event.target.closest("[data-smartcs-flow]");
    if (flowButton && paper.contains(flowButton)) selectSmartcsFlow(flowButton);
  });
  document.addEventListener("click", function (event) {
    const frame = event.target.closest(".cat-frame");
    if (frame) { route(frame.dataset.page); return; }
    const link = event.target.closest("[data-open-page], .chapter-tabs [data-page]");
    if (link) { route(link.dataset.openPage || link.dataset.page); return; }
    const closer = event.target.closest("[data-close-magazine]");
    if (closer) { closeMagazine(); return; }
    const copy = event.target.closest("[data-copy]");
    if (copy) { copyValue(copy.dataset.copy, copy); return; }
    const smartcsSelector = event.target.closest("[data-smartcs-scene]");
    if (smartcsSelector) { selectSmartcsShowcase(smartcsSelector); return; }
    const smartcsJump = event.target.closest("[data-smartcs-jump]");
    if (smartcsJump) { scrollSmartcsChapter(smartcsJump); return; }
    const smartcsFlow = event.target.closest("[data-smartcs-flow]");
    if (smartcsFlow) { selectSmartcsFlow(smartcsFlow); return; }
    const galleryButton = event.target.closest("[data-gallery-image]");
    if (galleryButton) {
      const main = paper.querySelector("[data-gallery-main]");
      const caption = paper.querySelector("[data-gallery-caption]");
      const shotNumber = paper.querySelector(".work-index[data-gallery-number]");
      if (main) { main.src = galleryButton.dataset.galleryImage; main.alt = galleryButton.dataset.galleryLabel; }
      if (caption) caption.textContent = galleryButton.dataset.galleryCaption || galleryButton.dataset.galleryLabel;
      if (shotNumber && galleryButton.dataset.galleryNumber) shotNumber.textContent = galleryButton.dataset.galleryNumber;
      paper.querySelectorAll("[data-gallery-image]").forEach(function (button) {
        button.setAttribute("aria-pressed", String(button === galleryButton));
      });
    }
  });
  prevButton.addEventListener("click", function () { if (activeIndex > 0) route(pages[activeIndex - 1].id); });
  nextButton.addEventListener("click", function () { if (activeIndex < pages.length - 1) route(pages[activeIndex + 1].id); });
  dialog.addEventListener("click", function (event) { if (event.target === dialog) closeMagazine(); });
  dialog.addEventListener("close", function () {
    if (window.location.hash !== "#home") history.replaceState(null, "", "#home");
  });
  window.addEventListener("keydown", function (event) {
    if (!dialog.open || event.target.closest("iframe, input, textarea")) return;
    if (event.key === "ArrowLeft" && activeIndex > 0) route(pages[activeIndex - 1].id);
    if (event.key === "ArrowRight" && activeIndex < pages.length - 1) route(pages[activeIndex + 1].id);
  });
  window.addEventListener("hashchange", function () {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash || hash === "home") { if (dialog.open) dialog.close(); return; }
    const aliases = { internship: "internships", project: "projects", video: "internships", classroom: "projects" };
    openPage(aliases[hash] || hash);
  });
  const initial = window.location.hash.replace(/^#/, "");
  if (initial && initial !== "home") {
    const aliases = { internship: "internships", project: "projects", video: "internships", classroom: "projects" };
    openPage(aliases[initial] || initial);
  }
})();
