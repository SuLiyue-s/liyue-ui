# LiYue UI 快速开始指南

## 项目检查结果总结

### ✅ 1. Node.js 环境支持

**结论**: 项目可以在纯Node.js环境下运行和构建。

**验证步骤**:
```bash
# 1. 运行环境检查脚本
npm run test:env

# 2. 安装依赖
npm install

# 3. 构建库
npm run build

# 4. 启动开发服务器
npm run dev
```

**项目特点**:
- 支持 ES 和 UMD 两种构建格式
- 完整的 TypeScript 类型定义
- 可在 Node.js 环境中构建
- 可在浏览器环境中运行

### ✅ 2. 自定义标签文本支持

**结论**: 所有关键组件都支持自定义标签文本。

#### 支持的组件和参数:

**Pagination (分页器)**
```tsx
<Pagination
  total={100}
  current={1}
  prevText="上一页"      // 自定义上一页文本
  nextText="下一页"      // 自定义下一页文本
  jumpText="跳至"        // 自定义跳转文本
  pageText="页"          // 自定义页码文本
/>
```

**Select (选择器)**
```tsx
<Select
  placeholder="请选择"    // 自定义占位符
  emptyText="暂无数据"   // 自定义空数据文本
  maxTagText="已选择 {count} 项"  // 自定义最大标签文本
  options={options}
/>
```

**Table (表格)**
```tsx
<Table
  columns={columns}
  dataSource={data}
  emptyText="暂无数据"   // 自定义空数据文本
/>
```

### ✅ 3. i18n 国际化支持

**结论**: 项目已完全支持i18n，默认语言为简体中文。

#### 快速开始

```tsx
import { I18nProvider, useI18n, Button, Pagination } from 'liyue-ui';

function App() {
  return (
    <I18nProvider locale="zh-CN">
      <MyComponent />
    </I18nProvider>
  );
}

function MyComponent() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div>
      <h2>当前语言: {locale === 'zh-CN' ? '简体中文' : 'English'}</h2>
      
      <Button onClick={() => setLocale('en-US')}>
        切换到英文
      </Button>
      
      <Button onClick={() => setLocale('zh-CN')}>
        切换到中文
      </Button>

      {/* 使用翻译函数 */}
      <p>{t('pagination.total', { total: 100 })}</p>
    </div>
  );
}
```

#### 支持的语言

| 语言代码 | 语言名称 | 状态 |
|---------|---------|------|
| zh-CN | 简体中文 | ✅ 默认 |
| en-US | English | ✅ 支持 |

#### i18n 文本覆盖

组件的文本优先级:
1. **自定义文本参数** - 最高优先级
2. **i18n 系统文本** - 次优先级
3. **内置默认文本** - 最低优先级

**示例**:
```tsx
// 优先使用自定义文本 "Custom Total"
<Pagination total={100} showTotal={() => 'Custom Total'} />

// 如果没有自定义文本，使用 i18n 系统
<Pagination total={100} />

// 都没有时，使用内置默认
<Select options={[]} />
```

## 快速安装

```bash
# 克隆项目
git clone <project-url>
cd liyue-ui

# 安装依赖
npm install

# 运行开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 验证清单

运行以下命令验证所有功能:

```bash
# 1. 检查环境配置
npm run test:env

# 2. TypeScript 类型检查
npm run typecheck

# 3. 构建库
npm run build

# 4. 启动开发服务器
npm run dev
```

## 常见问题

### Q: 如何切换语言?
```tsx
const { setLocale } = useI18n();
setLocale('en-US'); // 切换到英文
setLocale('zh-CN'); // 切换到中文
```

### Q: 如何自定义组件文本?
```tsx
// 方式1: 使用自定义参数
<Pagination prevText="Previous" nextText="Next" />

// 方式2: 使用 i18n 系统
<I18nProvider locale="en-US">
  <Pagination />
</I18nProvider>
```

### Q: 如何添加新的语言?
```tsx
import { I18nProvider, LocaleMessages } from 'liyue-ui';

const customMessages: LocaleMessages = {
  // ... 自定义语言包
};

<I18nProvider messages={customMessages}>
  <App />
</I18nProvider>
```

### Q: 项目能在Node.js中运行吗?
是的，项目可以在Node.js环境中构建。使用 `npm run build` 命令构建库，然后就可以在Node.js项目中使用。

## 下一步

1. ✅ 查看 [README.md](README.md) 获取完整的组件文档
2. ✅ 查看 [CHECKLIST.md](CHECKLIST.md) 获取详细的检查报告
3. ✅ 运行 `npm run dev` 启动开发服务器查看示例
4. ✅ 运行 `npm run test:env` 验证环境配置

## 技术支持

如有问题，请查看:
- README.md - 完整的组件文档
- CHECKLIST.md - 项目检查报告
- src/components/ - 组件源代码
- src/i18n/ - i18n系统源代码
