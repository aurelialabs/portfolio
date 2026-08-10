# 肖依婷 AI 产品经理作品集网站

一个无需构建工具和后台的静态个人作品集网站，包含导航型首页和三个独立项目详情页。

## 页面

- `index.html`：作品集首页
- `projects/studyagent.html`：考途 StudyAgent
- `projects/video-keypoints.html`：视频人物关键点识别
- `projects/ai-classroom.html`：AI 长大智创课堂

## 本地预览

最简单的方式是双击 `index.html`，使用浏览器打开。

如需使用本地静态服务器，在 `portfolio-site` 目录运行：

```powershell
python -m http.server 8000
```

然后访问：

```text
http://localhost:8000
```

## 更新内容

- 首页内容位于 `index.html`。
- 项目详情位于 `projects/`。
- 全站样式位于 `assets/css/styles.css`。
- 移动导航和进入动画位于 `assets/js/main.js`。
- 图片位于 `assets/images/`。

新增项目时，复制一个现有项目页并修改标题、正文与链接，再在首页 `#work` 区域增加入口。

## 部署到 GitHub Pages

1. 在 GitHub 新建公开仓库，例如 `portfolio`。
2. 将 `portfolio-site` 中的全部文件上传到仓库根目录。
3. 打开仓库 `Settings`。
4. 进入 `Pages`。
5. 在 `Build and deployment` 中选择 `Deploy from a branch`。
6. 分支选择 `main`，目录选择 `/root`，然后保存。
7. 等待 GitHub 生成公开网址。

生成的网址通常类似：

```text
https://你的GitHub用户名.github.io/portfolio/
```

## 部署到 Vercel

1. 登录 Vercel。
2. 选择 `Add New Project`。
3. 导入保存网站文件的 GitHub 仓库。
4. Framework Preset 选择 `Other`。
5. 不填写构建命令。
6. Output Directory 保持为空或使用仓库根目录。
7. 点击 Deploy。

## 上线前检查

- 测试首页和三个项目页的站内链接。
- 测试 StudyAgent Demo 与 GitHub。
- 在手机端检查导航、图片和正文。
- 确认邮箱与电话是否愿意公开。
- 确认视频项目“90%+”的数据口径与公开权限。
- 补充经过授权的项目图片时，务必脱敏账号、内部页面和人员信息。
