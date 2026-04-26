# LiYue UI - 高度可定制的 React UI 组件库

一套功能丰富、样式高度可定制的 React UI 组件库，基于 CSS Variables 和 TypeScript 构建，支持暗色主题、紧凑模式等特性。

## 特性

- 🎨 **强大的样式定制能力** - 基于 CSS Variables，可以轻松定制主题颜色、尺寸、间距等
- 🌙 **暗色主题支持** - 内置暗色主题，一键切换
- 🌍 **国际化支持** - 支持中英文切换，默认简体中文
- ✏️ **自定义文本支持** - 所有组件支持自定义标签文本
- 📦 **丰富的组件** - 包含 30+ 常用组件，覆盖各种使用场景
- 🎯 **TypeScript 支持** - 完整的 TypeScript 类型定义
- 📱 **响应式设计** - 组件支持多种尺寸和响应式布局
- ♿ **无障碍支持** - 遵循 WAI-ARIA 标准

## 环境要求

- **Node.js**: >= 16.0.0
- **npm**: >= 8.0.0 (推荐使用最新版本)
- **React**: >= 16.8.0
- **TypeScript**: >= 5.0.0

## 快速开始

### 方式一：使用 npm 安装（推荐用于生产环境）

```bash
# 使用 npm 安装
npm install liyue-ui

# 或使用 yarn 安装
yarn add liyue-ui

# 或使用 pnpm 安装
pnpm add liyue-ui
```

### 方式二：克隆并本地运行开发版本

```bash
# 1. 克隆仓库
git clone https://github.com/your-username/liyue-ui.git

# 2. 进入项目目录
cd liyue-ui

# 3. 安装依赖
npm install

# 4. 启动开发服务器
npm run dev

# 5. 在浏览器中访问
# 开发服务器会在 http://localhost:5173 启动
```

---

## 📖 开发环境使用指南

### 开发环境概述

开发环境用于**组件库的开发和调试**，让你可以在本地预览和测试所有组件。开发环境使用 Vite 开发服务器，支持热模块替换（HMR），代码修改后会自动刷新。

### 启动开发服务器

```bash
# 启动开发服务器
npm run dev
```

启动后，你会在终端看到类似以下输出：

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
  ➜  press h + enter to show help
```

### 开发服务器特点

- **热模块替换（HMR）**：修改代码后无需完全刷新页面即可看到变化
- **快速启动**：Vite 使用原生 ESM，无需打包即可启动
- **实时预览**：所有组件示例实时可见
- **调试友好**：支持 Source Maps，便于调试

### 访问组件示例

开发服务器启动后，打开浏览器访问 `http://localhost:5173/`，你会看到一个展示所有组件的示例页面。

示例页面包含以下内容：

- **国际化切换**：可以在中英文之间切换
- **所有组件示例**：展示每个组件的多种用法
- **交互测试**：可以测试组件的各种交互效果

### 修改和调试组件

1. **查看组件源码**：所有组件源码位于 `src/components/` 目录下
2. **修改组件**：编辑对应的组件文件，保存后会自动更新
3. **查看效果**：在浏览器中立即看到修改效果
4. **添加新组件**：在 `src/components/` 下创建新组件目录

### 组件开发工作流程

#### 1. 创建新组件

```
src/components/
  └── MyComponent/
      ├── MyComponent.tsx      # 组件实现
      ├── MyComponent.css      # 组件样式
      └── index.ts              # 导出文件
```

#### 2. 实现组件

```tsx
// src/components/MyComponent/MyComponent.tsx
import React from 'react';
import './MyComponent.css';

export interface MyComponentProps {
  text?: string;
  onClick?: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ 
  text = '默认文本',
  onClick 
}) => {
  return (
    <div className="ly-my-component" onClick={onClick}>
      {text}
    </div>
  );
};
```

#### 3. 导出组件

```typescript
// src/components/MyComponent/index.ts
export { MyComponent } from './MyComponent';
export type { MyComponentProps } from './MyComponent';
```

#### 4. 在组件库入口导出

```typescript
// src/components/index.ts
// ... 其他组件导出
export { MyComponent } from './MyComponent';
```

#### 5. 在示例页面测试

```tsx
// src/App.tsx
import { MyComponent } from './components';

// 在示例中添加
<MyComponent text="测试文本" onClick={() => console.log('clicked')} />
```

### 开发工具和脚本

#### 类型检查

```bash
# 执行 TypeScript 类型检查
npm run typecheck
```

这将运行 TypeScript 编译器检查所有 `.ts` 和 `.tsx` 文件的类型错误。

#### 环境配置测试

```bash
# 测试 Node.js 环境配置
npm run test:env
```

验证项目是否正确配置，包括 Node.js 版本、npm 可用性等。

### 开发最佳实践

1. **保持组件独立**：每个组件应该独立工作，不依赖其他组件的内部实现
2. **使用 CSS Variables**：在 `src/styles/variables.css` 中定义变量，保持样式一致性
3. **编写类型定义**：为所有 props 提供完整的 TypeScript 类型
4. **支持主题定制**：使用 CSS Variables，让用户能够通过覆盖变量来自定义样式
5. **遵循现有模式**：参考现有组件的代码结构和命名规范

---

## 📦 生产环境使用指南

### 构建生产版本

当你完成组件开发后，需要构建生产版本供其他项目使用：

```bash
# 构建库版本
npm run build
```

构建过程会生成优化的、可用于生产的文件。

### 构建输出说明

构建完成后，会在 `dist/` 目录下生成以下文件：

```
dist/
├── liyue-ui.es.js          # ES Module 版本（96 KB）
├── liyue-ui.umd.js         # UMD 版本（63 KB）
├── style.css               # 所有组件样式（54 KB）
├── index.d.ts              # TypeScript 类型定义
└── components/             # 组件类型定义目录
    ├── Button/
    ├── Input/
    └── ... (其他组件类型)
```

### 多种使用方式

#### 方式 1：作为 npm 依赖使用（推荐）

##### 在 React 项目中安装使用

```bash
# 在你的 React 项目中安装
npm install liyue-ui
```

##### 引入样式文件

在项目的入口文件（通常是 `main.tsx` 或 `App.tsx`）中引入样式：

```tsx
// main.tsx 或 App.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'liyue-ui/dist/style.css';  // 引入所有样式
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

或者按需引入样式：

```tsx
// 只引入你需要的组件样式
import 'liyue-ui/dist/style.css';  // 完整样式文件
```

##### 使用组件

```tsx
// App.tsx
import { Button, Input, Select, Card } from 'liyue-ui';

function App() {
  return (
    <Card title="表单示例">
      <Input placeholder="请输入用户名" />
      <Select 
        placeholder="请选择角色"
        options={[
          { label: '管理员', value: 'admin' },
          { label: '用户', value: 'user' },
        ]}
      />
      <Button type="primary">提交</Button>
    </Card>
  );
}

export default App;
```

#### 方式 2：CDN 引入（用于快速原型或不使用构建工具的场景）

##### 使用 CDN 链接

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>使用 LiYue UI</title>
  
  <!-- 引入 React -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  
  <!-- 引入 LiYue UI 样式 -->
  <link rel="stylesheet" href="https://unpkg.com/liyue-ui/dist/style.css">
  
  <!-- 引入 LiYue UI -->
  <script crossorigin src="https://unpkg.com/liyue-ui/dist/liyue-ui.umd.js"></script>
</head>
<body>
  <div id="root"></div>
  
  <script>
    const { Button, Input } = window.LiyueUI;
    
    const App = () => {
      return React.createElement('div', null, 
        React.createElement(Input, { placeholder: '请输入' }),
        React.createElement(Button, { type: 'primary' }, '提交')
      );
    };
    
    ReactDOM.createRoot(document.getElementById('root')).render(
      React.createElement(App)
    );
  </script>
</body>
</html>
```

##### 使用 unpkg CDN

```html
<!-- 最新版本 -->
<script src="https://unpkg.com/liyue-ui/dist/liyue-ui.umd.js"></script>

<!-- 指定版本 -->
<script src="https://unpkg.com/liyue-ui@1.0.0/dist/liyue-ui.umd.js"></script>
```

##### 使用 jsDelivr CDN

```html
<!-- 最新版本 -->
<script src="https://cdn.jsdelivr.net/npm/liyue-ui/dist/liyue-ui.umd.js"></script>

<!-- 指定版本 -->
<script src="https://cdn.jsdelivr.net/npm/liyue-ui@1.0.0/dist/liyue-ui.umd.js"></script>
```

#### 方式 3：本地文件引入

将 `dist/` 目录下的文件复制到你的项目中：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>本地使用 LiYue UI</title>
  
  <!-- 引入样式 -->
  <link rel="stylesheet" href="./libs/liyue-ui/style.css">
  
  <!-- 引入组件库 -->
  <script src="./libs/liyue-ui/liyue-ui.umd.js"></script>
</head>
<body>
  <div id="root"></div>
  
  <script>
    const { Button, Input } = window.LiyueUI;
    // 使用组件...
  </script>
</body>
</html>
```

### 模块格式说明

#### ES Module（ESM）

适合现代打包工具（如 Vite、Webpack 5）：

```typescript
// ESM 导入
import { Button } from 'liyue-ui';

// 支持 tree shaking，只导入使用的组件
import { Button, Input } from 'liyue-ui';
```

**优点**：
- 支持 tree shaking，减少打包体积
- 更好的代码分割
- 符合现代 JavaScript 标准

**适用场景**：
- 使用 Vite、Webpack 5 等现代打包工具的项目
- React 项目（使用 Create React App、Vite、Next.js 等）

#### UMD

适合传统打包工具或直接浏览器使用：

```html
<!-- 浏览器全局变量方式 -->
<script src="liyue-ui.umd.js"></script>
<script>
  const Button = window.LiyueUI.Button;
</script>
```

**优点**：
- 兼容旧版浏览器
- 无需构建工具即可使用
- 支持 AMD 模块加载器

**适用场景**：
- 不使用构建工具的简单页面
- 需要兼容旧版浏览器的项目
- 需要通过 CDN 引入的项目

### Tree Shaking 支持

组件库支持 tree shaking，可以显著减少打包体积：

```typescript
// ✅ 正确：只导入使用的组件
import { Button, Input } from 'liyue-ui';

// ❌ 错误：导入整个库（不支持 tree shaking）
import LIYUE from 'liyue-ui';
```

**如何验证 tree shaking 生效**：

1. 使用 Webpack：在生产构建时打开 bundle 分析器，检查是否只打包了使用的组件
2. 使用 Vite：在 `vite.config.ts` 中配置 `build.rollupOptions.output.manualChunks` 分析

### TypeScript 支持

组件库提供完整的 TypeScript 类型定义，无需额外安装类型包：

```typescript
import { Button, ButtonProps } from 'liyue-ui';

// 完整类型提示
const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

**在 `tsconfig.json` 中配置路径别名**（可选）：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

---

## 🎨 主题定制

### 自定义主题颜色

通过覆盖 CSS Variables 来定制主题：

```css
:root {
  /* 主色 */
  --ly-primary: #6366f1;
  --ly-primary-hover: #4f46e5;
  --ly-primary-active: #4338ca;
  --ly-primary-light: #e0e7ff;

  /* 成功色 */
  --ly-success: #10b981;
  --ly-success-hover: #059669;
  --ly-success-light: #d1fae5;

  /* 警告色 */
  --ly-warning: #f59e0b;
  --ly-warning-hover: #d97706;
  --ly-warning-light: #fef3c7;

  /* 危险色 */
  --ly-danger: #ef4444;
  --ly-danger-hover: #dc2626;
  --ly-danger-light: #fee2e2;

  /* 信息色 */
  --ly-info: #3b82f6;
  --ly-info-hover: #2563eb;
  --ly-info-light: #dbeafe;

  /* 文本颜色 */
  --ly-text-primary: #1f2937;
  --ly-text-secondary: #6b7280;
  --ly-text-tertiary: #9ca3af;
  --ly-text-disabled: #d1d5db;
  --ly-text-inverse: #ffffff;

  /* 背景颜色 */
  --ly-bg-primary: #ffffff;
  --ly-bg-secondary: #f9fafb;
  --ly-bg-hover: #f3f4f6;

  /* 圆角 */
  --ly-radius: 0.375rem;
  --ly-radius-lg: 0.75rem;

  /* 阴影 */
  --ly-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  --ly-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  /* 间距 */
  --ly-spacing: 0.75rem;
  --ly-spacing-md: 1rem;

  /* 字体大小 */
  --ly-font-size: 1rem;
  --ly-font-size-sm: 0.875rem;

  /* 动画时长 */
  --ly-transition: 200ms;
}
```

### 暗色主题

启用暗色主题：

```tsx
// 在 HTML 标签上添加属性
document.documentElement.setAttribute('data-theme', 'dark');
```

或在 CSS 中：

```css
[data-theme='dark'] {
  --ly-text-primary: #f9fafb;
  --ly-bg-primary: #1f2937;
  --ly-bg-secondary: #111827;
}
```

### 紧凑主题

启用紧凑主题减小组件尺寸：

```tsx
document.documentElement.setAttribute('data-theme', 'compact');
```

---

## 🌍 国际化（i18n）

组件库内置了完整的国际化支持，支持简体中文和英文切换。

### 基本用法

```tsx
import { I18nProvider, useI18n } from 'liyue-ui';

function App() {
  return (
    <I18nProvider locale="zh-CN">
      <YourApp />
    </I18nProvider>
  );
}

// 在组件中使用
function MyComponent() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div>
      <p>当前语言: {locale === 'zh-CN' ? '简体中文' : 'English'}</p>
      <button onClick={() => setLocale('en-US')}>切换到英文</button>
      <button onClick={() => setLocale('zh-CN')}>切换到中文</button>
    </div>
  );
}
```

### 支持的语言

- `zh-CN` - 简体中文（默认）
- `en-US` - English

---

## 📚 常用组件示例

### Button 按钮

```tsx
import { Button } from 'liyue-ui';

// 基本用法
<Button>默认按钮</Button>
<Button type="primary">主要按钮</Button>
<Button type="success">成功按钮</Button>
<Button type="warning">警告按钮</Button>
<Button type="danger">危险按钮</Button>

// 不同尺寸
<Button size="sm">小按钮</Button>
<Button size="md">中等按钮</Button>
<Button size="lg">大按钮</Button>

// 状态
<Button plain>朴素按钮</Button>
<Button round>圆角按钮</Button>
<Button loading>加载中</Button>
<Button disabled>禁用</Button>
```

### Input 输入框

```tsx
import { Input } from 'liyue-ui';

// 基本用法
<Input placeholder="请输入" />

// 前缀和后缀
<Input prefix={<IconUser />} placeholder="用户名" />
<Input suffix={<IconSearch />} placeholder="搜索" />

// 可清除
<Input clearable defaultValue="可清除的内容" />

// 密码框
<Input type="password" showPasswordToggle placeholder="密码" />
```

### Select 选择器

```tsx
import { Select } from 'liyue-ui';

// 基本用法
<Select
  options={[
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
    { label: '禁用选项', value: 3, disabled: true },
  ]}
  placeholder="请选择"
/>

// 多选
<Select multiple placeholder="多选" options={options} />

// 可搜索
<Select searchable placeholder="搜索选择" options={options} />
```

### Modal 对话框

```tsx
import { Modal, Button } from 'liyue-ui';
import { useState } from 'react';

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>打开</Button>
      <Modal
        open={open}
        title="标题"
        onClose={() => setOpen(false)}
      >
        内容
      </Modal>
    </>
  );
}
```

### Toast 消息提示

```tsx
import { ToastProvider, useToast } from 'liyue-ui';

function App() {
  const toast = useToast();

  return (
    <Button onClick={() => toast.success('成功')}>成功</Button>
    <Button onClick={() => toast.error('失败')}>失败</Button>
    <Button onClick={() => toast.warning('警告')}>警告</Button>
    <Button onClick={() => toast.info('信息')}>信息</Button>
  );
}

// 使用 Provider
function Root() {
  return (
    <ToastProvider position="top-right" maxCount={3}>
      <App />
    </ToastProvider>
  );
}
```

---

## 🔧 项目脚本

本项目提供了以下 npm 脚本：

| 脚本 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（热重载） |
| `npm run build` | 构建库版本（用于发布到 npm） |
| `npm run preview` | 预览生产构建 |
| `npm run typecheck` | 执行 TypeScript 类型检查 |
| `npm run test:env` | 测试环境配置 |

### 构建说明

**开发环境构建 (`npm run dev`)：**
- 使用 Vite 的开发服务器
- 支持热模块替换（HMR）
- 代码修改后自动刷新
- 适合开发和调试组件

**生产环境构建 (`npm run build`)：**
- 优化代码，移除开发注释和调试代码
- 压缩 JavaScript 和 CSS
- 生成 TypeScript 类型定义文件
- 输出目录：`dist/`

**预览构建 (`npm run preview`)：**
- 在本地服务器上预览生产构建
- 用于测试构建后的组件库是否正常工作

---

## 📁 目录结构

```
liyue-ui/
├── src/                          # 源代码目录
│   ├── components/               # 组件目录
│   │   ├── Alert/               # 警告提示组件
│   │   ├── Avatar/              # 头像组件
│   │   ├── Badge/               # 徽章组件
│   │   ├── Breadcrumb/          # 面包屑导航
│   │   ├── Button/              # 按钮组件
│   │   ├── Card/                # 卡片组件
│   │   ├── Checkbox/            # 复选框组件
│   │   ├── Drawer/              # 抽屉组件
│   │   ├── Form/                # 表单组件
│   │   ├── Input/               # 输入框组件
│   │   ├── Layout/              # 布局组件
│   │   ├── Menu/                # 菜单组件
│   │   ├── Modal/               # 模态框组件
│   │   ├── Pagination/          # 分页组件
│   │   ├── Progress/            # 进度条组件
│   │   ├── Radio/               # 单选框组件
│   │   ├── Select/              # 选择器组件
│   │   ├── Skeleton/            # 骨架屏组件
│   │   ├── Slider/              # 滑块组件
│   │   ├── Steps/               # 步骤条组件
│   │   ├── Switch/              # 开关组件
│   │   ├── Table/               # 表格组件
│   │   ├── Tabs/                # 标签页组件
│   │   ├── Tag/                 # 标签组件
│   │   ├── Toast/               # 消息提示组件
│   │   └── Tooltip/             # 文字提示组件
│   ├── i18n/                     # 国际化配置
│   ├── styles/                   # 全局样式
│   │   ├── variables.css       # CSS 变量定义
│   │   ├── base.css             # 基础样式重置
│   │   └── theme.css            # 主题配置
│   ├── App.tsx                   # 示例应用入口
│   ├── main.tsx                 # React 渲染入口
│   └── index.ts                 # 组件库导出入口
├── dist/                         # 构建输出目录（构建后生成）
├── index.html                    # 开发服务器 HTML 入口
├── package.json                  # 项目配置
├── tsconfig.json                 # TypeScript 配置
├── vite.config.ts               # Vite 配置
└── README.md                     # 项目文档
```

---

## 🌐 浏览器支持

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 许可证

MIT

---

## ❓ 常见问题

### 如何自定义主题颜色？

可以通过覆盖 CSS 变量来定制主题：

```css
:root {
  --ly-primary: #1890ff;
  --ly-primary-hover: #40a9ff;
  --ly-primary-active: #096dd9;
}
```

### 如何使用暗色主题？

```tsx
// 在 App 根组件上设置 data-theme 属性
function App() {
  return (
    <div data-theme="dark">
      <YourContent />
    </div>
  );
}
```

### 如何贡献代码？

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request
