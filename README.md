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

## 安装

```bash
npm install liyue-ui
# 或
yarn add liyue-ui
# 或
pnpm add liyue-ui
```

## 快速开始

### 引入样式

在入口文件（通常是 `main.tsx` 或 `App.tsx`）中引入样式：

```tsx
import 'liyue-ui/dist/styles/variables.css';
import 'liyue-ui/dist/styles/base.css';
import 'liyue-ui/dist/styles/theme.css';
```

或者在 CSS 中导入：

```css
@import 'liyue-ui/dist/styles/variables.css';
@import 'liyue-ui/dist/styles/base.css';
@import 'liyue-ui/dist/styles/theme.css';
```

### 使用组件

```tsx
import { Button, Input, Select } from 'liyue-ui';

function App() {
  return (
    <div>
      <Button type="primary">主要按钮</Button>
      <Input placeholder="请输入" />
      <Select
        options={[
          { label: '选项1', value: 1 },
          { label: '选项2', value: 2 },
        ]}
      />
    </div>
  );
}
```

### 国际化 i18n

组件库内置了完整的国际化支持，支持简体中文和英文切换：

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

**支持的语言：**
- `zh-CN` - 简体中文（默认）
- `en-US` - English

**I18nProvider API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| locale | 当前语言 | `zh-CN \| en-US` | `zh-CN` |
| defaultLocale | 默认语言 | `zh-CN \| en-US` | `zh-CN` |
| messages | 自定义语言包 | `LocaleMessages` | 内置语言包 |

**useI18n 返回值：**

| 参数 | 说明 | 类型 |
|------|------|------|
| locale | 当前语言 | `zh-CN \| en-US` |
| messages | 当前语言包 | `LocaleMessages` |
| setLocale | 切换语言 | `(locale: Locale) => void` |
| t | 翻译函数 | `(key: string, params?) => string` |

## 基础组件

### Button 按钮

```tsx
import { Button } from 'liyue-ui';

// 基本用法
<Button>默认按钮</Button>
<Button type="primary">主要按钮</Button>
<Button type="success">成功按钮</Button>
<Button type="warning">警告按钮</Button>
<Button type="danger">危险按钮</Button>
<Button type="info">信息按钮</Button>

// 不同尺寸
<Button size="sm">小按钮</Button>
<Button size="md">中等按钮</Button>
<Button size="lg">大按钮</Button>

// 状态
<Button plain>朴素按钮</Button>
<Button round>圆角按钮</Button>
<Button circle icon={<Icon />}>圆形按钮</Button>
<Button loading>加载中</Button>
<Button disabled>禁用</Button>

// 带图标
<Button icon={<IconPlus />}>添加</Button>
<Button type="primary" icon={<IconSearch />}>搜索</Button>
```

**API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 按钮类型 | `primary \| secondary \| success \| warning \| danger \| info \| link \| text` | `primary` |
| size | 按钮大小 | `sm \| md \| lg` | `md` |
| plain | 是否朴素按钮 | `boolean` | `false` |
| round | 是否圆角按钮 | `boolean` | `false` |
| circle | 是否圆形按钮 | `boolean` | `false` |
| loading | 是否加载状态 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| icon | 按钮图标 | `ReactNode` | - |
| loadingIcon | 加载图标 | `ReactNode` | - |
| width | 按钮宽度 | `string \| number` | - |

### Input 输入框

```tsx
import { Input } from 'liyue-ui';

// 基本用法
<Input placeholder="请输入" />

// 不同尺寸
<Input size="sm" placeholder="小型" />
<Input size="md" placeholder="中等" />
<Input size="lg" placeholder="大型" />

// 前缀和后缀
<Input prefix={<IconUser />} placeholder="用户名" />
<Input suffix={<IconSearch />} placeholder="搜索" />

// 前置和后置标签
<Input prepend="https://" placeholder="网站" />
<Input append=".com" placeholder="域名" />

// 可清除
<Input clearable defaultValue="可清除的内容" />

// 密码框
<Input type="password" showPasswordToggle placeholder="密码" />

// 禁用
<Input disabled defaultValue="禁用" />
```

**API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| size | 输入框大小 | `sm \| md \| lg` | `md` |
| type | 输入框类型 | `string` | `text` |
| prefix | 前缀图标 | `ReactNode` | - |
| suffix | 后缀图标 | `ReactNode` | - |
| prepend | 前置标签 | `ReactNode` | - |
| append | 后置标签 | `ReactNode` | - |
| clearable | 是否可清除 | `boolean` | `false` |
| showPasswordToggle | 是否显示密码切换 | `boolean` | `false` |
| bordered | 是否有边框 | `boolean` | `true` |
| width | 输入框宽度 | `string \| number` | - |

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

// 可清除
<Select clearable placeholder="可清除" options={options} />
```

**API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| options | 选项列表 | `SelectOption[]` | `[]` |
| value | 当前值（受控） | `string \| number \| (string \| number)[]` | - |
| defaultValue | 默认值 | `string \| number \| (string \| number)[]` | - |
| placeholder | 占位符 | `string` | `请选择` |
| multiple | 是否多选 | `boolean` | `false` |
| searchable | 是否可搜索 | `boolean` | `false` |
| clearable | 是否可清除 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 选择器大小 | `sm \| md \| lg` | `md` |
| maxTagCount | 最大显示标签数 | `number` | - |
| width | 宽度 | `string \| number` | - |

### Checkbox 复选框

```tsx
import { Checkbox, CheckboxGroup } from 'liyue-ui';

// 基本用法
<Checkbox>选项</Checkbox>
<Checkbox checked>选中</Checkbox>
<Checkbox disabled>禁用</Checkbox>

// 组
<CheckboxGroup
  options={[
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
    { label: '禁用', value: 3, disabled: true },
  ]}
  defaultValue={[1, 2]}
/>

// 不确定状态
<Checkbox indeterminate>不确定状态</Checkbox>
```

**CheckboxGroup API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| options | 选项列表 | `Array<{label, value, disabled?}>` | `[]` |
| value | 当前值（受控） | `(string \| number)[]` | - |
| defaultValue | 默认值 | `(string \| number)[]` | `[]` |
| direction | 排列方向 | `horizontal \| vertical` | `horizontal` |
| disabled | 是否全部禁用 | `boolean` | `false` |

### Radio 单选框

```tsx
import { Radio, RadioGroup } from 'liyue-ui';

// 基本用法
<Radio>选项</Radio>
<Radio checked>选中</Radio>

// 组
<RadioGroup
  options={[
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
    { label: '禁用', value: 3, disabled: true },
  ]}
  defaultValue={1}
/>
```

**RadioGroup API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| options | 选项列表 | `Array<{label, value, disabled?}>` | `[]` |
| value | 当前值（受控） | `string \| number` | - |
| defaultValue | 默认值 | `string \| number` | - |
| direction | 排列方向 | `horizontal \| vertical` | `horizontal` |
| disabled | 是否全部禁用 | `boolean` | `false` |

### Switch 开关

```tsx
import { Switch } from 'liyue-ui';

<Switch />
<Switch checked />
<Switch disabled />
<Switch size="sm" />
<Switch size="lg" />
<Switch
  checkedText="ON"
  uncheckedText="OFF"
  showText
/>
```

**API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| checked | 是否选中（受控） | `boolean` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 大小 | `sm \| md \| lg` | `md` |
| activeText | 选中时文本 | `ReactNode` | - |
| inactiveText | 未选中时文本 | `ReactNode` | - |
| showIcon | 是否显示图标 | `boolean` | `false` |

### Slider 滑块

```tsx
import { Slider } from 'liyue-ui';

<Slider />
<Slider defaultValue={50} />
<Slider min={0} max={100} step={10} />
<Slider range defaultValue={[20, 80]} />
<Slider showInput />
<Slider showTooltip />
<Slider size="sm" />
```

**API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 当前值（受控） | `number` | - |
| defaultValue | 默认值 | `number` | `0` |
| min | 最小值 | `number` | `0` |
| max | 最大值 | `number` | `100` |
| step | 步长 | `number` | `1` |
| range | 是否范围选择 | `boolean` | `false` |
| showInput | 是否显示输入框 | `boolean` | `false` |
| showTooltip | 是否显示提示 | `boolean` | `true` |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 大小 | `sm \| md \| lg` | `md` |

## 布局组件

### Container 容器

```tsx
import { Container } from 'liyue-ui';

<Container maxWidth="lg" centered>
  内容
</Container>

<Container maxWidth={800} padding={20}>
  自定义
</Container>
```

**API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| maxWidth | 最大宽度 | `sm \| md \| lg \| xl \| 2xl \| full \| string \| number` | `lg` |
| centered | 是否居中 | `boolean` | `false` |
| padding | 内边距 | `string \| number` | - |

### Grid 网格

```tsx
import { Grid, GridItem } from 'liyue-ui';

<Grid cols={12} gap={20}>
  <GridItem span={8}>8列</GridItem>
  <GridItem span={4}>4列</GridItem>
</Grid>

<Grid cols={4}>
  <GridItem>1</GridItem>
  <GridItem span={2}>2</GridItem>
  <GridItem>1</GridItem>
</Grid>

<Grid cols={{ sm: 2, md: 4, lg: 6 }}>
  <GridItem sm={1} md={2} lg={3}>响应式</GridItem>
</Grid>
```

**Grid API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| cols | 列数 | `number \| { sm, md, lg, xl }` | `12` |
| gap | 间距 | `string \| number` | - |
| rowGap | 行间距 | `string \| number` | - |
| colGap | 列间距 | `string \| number` | - |

**GridItem API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| span | 列数占比 | `number` | `1` |
| offset | 偏移列数 | `number` | `0` |
| start | 起始列 | `number` | - |
| sm/md/lg/xl | 响应式列数 | `number` | - |

### Flex 弹性盒

```tsx
import { Flex } from 'liyue-ui';

<Flex gap={10}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Flex>

<Flex justify="center" align="center" style={{ height: 200 }}>
  居中
</Flex>

<Flex direction="column" gap={20}>
  垂直
</Flex>

<Flex wrap>
  自动换行
</Flex>
```

**API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| direction | 排列方向 | `row \| column \| row-reverse \| column-reverse` | `row` |
| wrap | 是否换行 | `boolean \| wrap \| nowrap \| wrap-reverse` | `false` |
| justify | 主轴对齐 | `start \| end \| center \| between \| around \| evenly` | `start` |
| align | 交叉轴对齐 | `start \| end \| center \| stretch \| baseline` | `stretch` |
| gap | 间距 | `string \| number` | - |

### Divider 分割线

```tsx
import { Divider } from 'liyue-ui';

<Divider />

<Divider>带文字</Divider>

<Divider direction="vertical" />

<Divider lineStyle="dashed" />
```

**API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| direction | 方向 | `horizontal \| vertical` | `horizontal` |
| thickness | 粗细 | `string \| number` | `1` |
| color | 颜色 | `string` | - |
| lineStyle | 样式 | `solid \| dashed \| dotted` | `solid` |
| children | 文字内容 | `ReactNode` | - |

## 数据展示组件

### Table 表格

```tsx
import { Table } from 'liyue-ui';

const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '地址', dataIndex: 'address' },
  {
    title: '操作',
    render: (_, record) => <Button size="sm">编辑</Button>,
  },
];

const data = [
  { key: 1, name: '张三', age: 18, address: '北京' },
  { key: 2, name: '李四', age: 20, address: '上海' },
];

<Table columns={columns} dataSource={data} bordered striped />
```

**API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| columns | 列配置 | `TableColumn[]` | `[]` |
| dataSource | 数据源 | `T[]` | `[]` |
| bordered | 是否带边框 | `boolean` | `false` |
| striped | 是否带斑马纹 | `boolean` | `false` |
| hoverable | 是否有hover效果 | `boolean` | `true` |
| size | 表格大小 | `sm \| md \| lg` | `md` |
| showHeader | 是否显示表头 | `boolean` | `true` |
| loading | 是否加载中 | `boolean` | `false` |
| rowSelection | 行选择配置 | `{ selectedRowKeys, onChange, getCheckboxProps }` | - |

### Card 卡片

```tsx
import { Card } from 'liyue-ui';

<Card title="卡片标题">
  卡片内容
</Card>

<Card
  title="带副标题"
  subTitle="副标题"
  avatar={<Avatar>张</Avatar>}
>
  卡片内容
</Card>

<Card
  cover={<img src="/cover.jpg" alt="封面" />}
>
  卡片内容
</Card>

<Card
  actions={[
    <IconEdit />,
    <IconShare />,
    <IconDelete />,
  ]}
>
  卡片内容
</Card>
```

**API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 标题 | `ReactNode` | - |
| subTitle | 副标题 | `ReactNode` | - |
| cover | 封面图片 | `ReactNode` | - |
| avatar | 头像 | `ReactNode` | - |
| actions | 操作按钮 | `ReactNode[]` | - |
| bordered | 是否有边框 | `boolean` | `true` |
| shadow | 阴影 | `boolean \| hover \| always` | `false` |
| clickable | 是否可点击 | `boolean` | `false` |
| size | 大小 | `sm \| md \| lg` | `md` |

### Avatar 头像

```tsx
import { Avatar } from 'liyue-ui';

<Avatar>张</Avatar>
<Avatar src="/avatar.jpg" />
<Avatar size={60} shape="square">大</Avatar>
<Avatar size="xl" icon={<IconUser />} />
```

**API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| src | 图片地址 | `string` | - |
| size | 大小 | `sm \| md \| lg \| xl \| string \| number` | `md` |
| shape | 形状 | `circle \| square \| rounded` | `circle` |
| text | 显示文字 | `string` | - |
| icon | 图标 | `ReactNode` | - |
| bgColor | 背景颜色 | `string` | - |

### Badge 徽标

```tsx
import { Badge } from 'liyue-ui';

<Badge count={5}>
  <Icon />
</Badge>

<Badge count={100} maxCount={99} />
<Badge dot />
<Badge status="success" />
<Badge color="#f00">红色</Badge>
```

**API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| count | 数量 | `number \| ReactNode` | - |
| maxCount | 最大数字 | `number` | `99` |
| dot | 是否显示原点 | `boolean` | `false` |
| status | 状态类型 | `success \| warning \| danger \| info \| default` | - |
| color | 自定义颜色 | `string` | - |
| show | 是否显示 | `boolean` | `true` |
| offset | 偏移量 | `[number, number]` | - |

### Tag 标签

```tsx
import { Tag } from 'liyue-ui';

<Tag>默认</Tag>
<Tag type="success">成功</Tag>
<Tag type="warning">警告</Tag>
<Tag type="danger">危险</Tag>
<Tag closable>可关闭</Tag>
<Tag checkable defaultChecked>可选中</Tag>
```

**API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 类型 | `primary \| success \| warning \| danger \| info \| default` | `default` |
| size | 大小 | `sm \| md \| lg` | `md` |
| closable | 是否可关闭 | `boolean` | `false` |
| checkable | 是否可选中 | `boolean` | `false` |
| checked | 是否选中（受控） | `boolean` | - |
| bordered | 是否有边框 | `boolean` | `true` |
| round | 是否圆角 | `boolean` | `false` |
| color | 自定义颜色 | `string` | - |

### Progress 进度条

```tsx
import { Progress } from 'liyue-ui';

<Progress percent={50} />
<Progress percent={80} status="success" />
<Progress percent={30} type="circle" />
<Progress type="dashboard" percent={75} />
<Progress animated />
```

**API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| percent | 进度值 | `number` | `0` |
| type | 类型 | `line \| circle \| dashboard` | `line` |
| strokeWidth | 线条宽度 | `number` | - |
| strokeColor | 线条颜色 | `string` | - |
| trailColor | 轨道颜色 | `string` | - |
| showText | 是否显示文字 | `boolean` | `true` |
| format | 格式化函数 | `(percent) => ReactNode` | - |
| status | 状态 | `success \| exception \| normal` | - |
| animated | 是否动画 | `boolean` | `false` |
| size | 大小 | `sm \| md \| lg` | `md` |

### Skeleton 骨架屏

```tsx
import { Skeleton, SkeletonParagraph, SkeletonAvatar } from 'liyue-ui';

<Skeleton />
<Skeleton width={200} height={20} />
<SkeletonAvatar size="lg" />
<SkeletonParagraph rows={4} />
```

**API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| animated | 是否动画 | `boolean` | `true` |
| width | 宽度 | `string \| number` | `100%` |
| height | 高度 | `string \| number` | - |
| circle | 是否圆形 | `boolean` | `false` |

## 导航组件

### Menu 菜单

```tsx
import { Menu } from 'liyue-ui';

const items = [
  { key: 'home', label: '首页', icon: <IconHome /> },
  { key: 'about', label: '关于', icon: <IconInfo /> },
  {
    key: 'sub',
    label: '子菜单',
    children: [
      { key: 'sub1', label: '子菜单1' },
      { key: 'sub2', label: '子菜单2' },
    ],
  },
];

<Menu items={items} defaultSelectedKey="home" />
<Menu items={items} mode="horizontal" />
<Menu items={items} mode="inline" defaultOpenKeys={['sub']} />
```

**API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| items | 菜单数据 | `MenuItem[]` | `[]` |
| selectedKey | 选中项（受控） | `string` | - |
| defaultSelectedKey | 默认选中项 | `string` | - |
| openKeys | 展开的子菜单（受控） | `string[]` | - |
| defaultOpenKeys | 默认展开的子菜单 | `string[]` | `[]` |
| mode | 模式 | `horizontal \| vertical \| inline` | `vertical` |
| theme | 主题 | `light \| dark` | `light` |
| inlineIndent | 缩进宽度 | `number` | `1.5` |

### Tabs 标签页

```tsx
import { Tabs } from 'liyue-ui';

const items = [
  { key: 'tab1', label: '标签1', children: '内容1' },
  { key: 'tab2', label: '标签2', children: '内容2' },
  { key: 'tab3', label: '禁用', children: '内容3', disabled: true },
];

<Tabs items={items} />
<Tabs items={items} type="card" />
<Tabs items={items} tabPosition="left" />
```

**API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| items | 标签数据 | `TabItem[]` | `[]` |
| activeKey | 当前标签（受控） | `string` | - |
| defaultActiveKey | 默认标签 | `string` | - |
| tabPosition | 位置 | `top \| bottom \| left \| right` | `top` |
| type | 类型 | `line \| card \| segment` | `line` |
| size | 大小 | `sm \| md \| lg` | `md` |

### Breadcrumb 面包屑

```tsx
import { Breadcrumb } from 'liyue-ui';

const items = [
  { title: '首页', href: '/' },
  { title: '列表', href: '/list' },
  { title: '详情' },
];

<Breadcrumb items={items} />
<Breadcrumb items={items} separator=">" />
<Breadcrumb items={items} showIcon />
<Breadcrumb items={items} maxCount={3} />
```

**API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| items | 面包屑数据 | `BreadcrumbItem[]` | `[]` |
| separator | 分隔符 | `ReactNode` | `/` |
| showIcon | 是否显示图标 | `boolean` | `false` |
| maxCount | 最大显示数量 | `number` | - |

### Pagination 分页

```tsx
import { Pagination } from 'liyue-ui';

<Pagination total={100} />
<Pagination total={1000} showSizeChanger showQuickJumper />
<Pagination total={100} simple />
<Pagination total={100} showTotal={(total) => `共 ${total} 条`} />
```

**API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| total | 总数 | `number` | `0` |
| current | 当前页码（受控） | `number` | - |
| defaultCurrent | 默认页码 | `number` | `1` |
| pageSize | 每页条数 | `number` | `10` |
| showTotal | 是否显示总数 | `boolean \| ((total, range) => ReactNode)` | `false` |
| showSizeChanger | 是否显示每页条数 | `boolean` | `false` |
| showQuickJumper | 是否快速跳转 | `boolean` | `false` |
| pageSizeOptions | 每页条数选项 | `number[]` | `[10, 20, 50, 100]` |
| simple | 简化模式 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 大小 | `sm \| md \| lg` | `md` |

### Steps 步骤条

```tsx
import { Steps } from 'liyue-ui';

const items = [
  { title: '步骤1', description: '描述' },
  { title: '步骤2', description: '描述' },
  { title: '步骤3', description: '描述' },
];

<Steps items={items} current={1} />
<Steps items={items} direction="vertical" />
<Steps items={items} size="sm" />
```

**API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| items | 步骤数据 | `StepItem[]` | `[]` |
| current | 当前步骤（受控） | `number` | - |
| defaultCurrent | 默认步骤 | `number` | `0` |
| direction | 方向 | `horizontal \| vertical` | `horizontal` |
| status | 状态 | `wait \| process \| finish \| error` | - |
| showIcon | 是否显示图标 | `boolean` | `true` |
| simple | 简化显示 | `boolean` | `false` |
| size | 大小 | `sm \| md` | `md` |

## 反馈组件

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
        footer={
          <>
            <Button onClick={() => setOpen(false)}>取消</Button>
            <Button type="primary" onClick={() => setOpen(false)}>确定</Button>
          </>
        }
      >
        内容
      </Modal>
    </>
  );
}
```

**API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| open | 是否显示（受控） | `boolean` | `false` |
| title | 标题 | `ReactNode` | - |
| children | 内容 | `ReactNode` | - |
| footer | 底部内容 | `ReactNode` | - |
| width | 宽度 | `string \| number` | `md` |
| closable | 是否显示关闭按钮 | `boolean` | `true` |
| mask | 是否显示遮罩 | `boolean` | `true` |
| maskClosable | 点击遮罩是否关闭 | `boolean` | `true` |
| centered | 是否居中 | `boolean` | `false` |
| animated | 是否动画 | `boolean` | `true` |
| size | 预设尺寸 | `sm \| md \| lg \| xl \| full` | `md` |

### Drawer 抽屉

```tsx
import { Drawer, Button } from 'liyue-ui';
import { useState } from 'react';

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>打开</Button>
      <Drawer
        open={open}
        title="标题"
        placement="right"
        onClose={() => setOpen(false)}
      >
        内容
      </Drawer>
    </>
  );
}
```

**API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| open | 是否显示（受控） | `boolean` | `false` |
| title | 标题 | `ReactNode` | - |
| children | 内容 | `ReactNode` | - |
| footer | 底部内容 | `ReactNode` | - |
| width | 宽度 | `string \| number` | - |
| height | 高度 | `string \| number` | - |
| placement | 位置 | `top \| right \| bottom \| left` | `right` |
| closable | 是否显示关闭按钮 | `boolean` | `true` |
| mask | 是否显示遮罩 | `boolean` | `true` |
| maskClosable | 点击遮罩是否关闭 | `boolean` | `true` |
| animated | 是否动画 | `boolean` | `true` |
| size | 预设尺寸 | `sm \| md \| lg \| xl` | `md` |

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
    <Button onClick={() => toast.loading('加载中...')}>加载</Button>
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

**ToastProvider API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| maxCount | 最大显示数量 | `number` | `5` |
| position | 位置 | `top \| top-left \| top-right \| bottom \| bottom-left \| bottom-right` | `top` |

**Toast API:**

| 参数 | 说明 | 类型 |
|------|------|------|
| content | 内容 | `ReactNode` |
| options.duration | 显示时长（毫秒） | `number` |
| options.type | 类型 | `success \| error \| warning \| info \| loading` |
| options.closable | 是否可关闭 | `boolean` |
| options.icon | 自定义图标 | `ReactNode` |

### Alert 警告提示

```tsx
import { Alert } from 'liyue-ui';

<Alert message="信息提示" />
<Alert type="success" message="成功" description="详细信息" />
<Alert type="warning" message="警告" closable />
<Alert type="error" message="错误" showIcon={false} />
```

**API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| message | 标题 | `ReactNode` | - |
| description | 描述 | `ReactNode` | - |
| type | 类型 | `success \| info \| warning \| error` | `info` |
| closable | 是否可关闭 | `boolean` | `false` |
| showIcon | 是否显示图标 | `boolean` | `true` |
| largeTitle | 是否使用大标题 | `boolean` | `false` |
| icon | 自定义图标 | `ReactNode` | - |

### Tooltip 文字提示

```tsx
import { Tooltip } from 'liyue-ui';

<Tooltip content="提示文字">
  <Button>鼠标悬停</Button>
</Tooltip>

<Tooltip content="左侧提示" placement="left">
  <Button>左侧</Button>
</Tooltip>

<Tooltip content="点击提示" trigger="click">
  <Button>点击</Button>
</Tooltip>
```

**API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| content | 提示内容 | `ReactNode` | - |
| trigger | 触发方式 | `hover \| click \| focus` | `hover` |
| placement | 位置 | `top \| left \| right \| bottom \| top-left \| top-right \| bottom-left \| bottom-right` | `top` |
| mouseEnterDelay | 延迟显示（毫秒） | `number` | `100` |
| mouseLeaveDelay | 延迟隐藏（毫秒） | `number` | `100` |
| maxWidth | 最大宽度 | `string \| number` | - |

## 表单组件

### Form 表单

```tsx
import { Form, FormItem, Input, Select, Button } from 'liyue-ui';

<Form layout="vertical">
  <FormItem label="用户名" name="username" required>
    <Input placeholder="请输入用户名" />
  </FormItem>
  <FormItem
    label="邮箱"
    name="email"
    rules={[
      { required: true, message: '请输入邮箱' },
      { type: 'email', message: '邮箱格式不正确' },
    ]}
  >
    <Input placeholder="请输入邮箱" />
  </FormItem>
  <FormItem label="简介" name="bio" initialValue="默认内容">
    <Input.TextArea placeholder="请输入简介" />
  </FormItem>
  <Button htmlType="submit">提交</Button>
</Form>
```

**Form API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| layout | 表单布局 | `horizontal \| vertical \| inline` | `vertical` |
| labelAlign | 标签对齐 | `left \| right \| center` | `right` |
| labelWidth | 标签宽度 | `string \| number` | - |
| value | 表单值（受控） | `Record<string, any>` | - |
| defaultValue | 默认值 | `Record<string, any>` | `{}` |
| disabled | 是否禁用 | `boolean` | `false` |
| onChange | 变化回调 | `(values) => void` | - |
| onSubmit | 提交回调 | `(values) => void` | - |

**FormItem API:**

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | 字段名 | `string` | - |
| label | 标签 | `string` | - |
| initialValue | 初始值 | `any` | - |
| rules | 验证规则 | `ValidationRule[]` | - |
| required | 是否必填 | `boolean` | `false` |
| error | 自定义错误 | `string` | - |

**ValidationRule:**

| 规则 | 说明 | 类型 |
|------|------|------|
| required | 是否必填 | `boolean` |
| message | 错误信息 | `string` |
| type | 类型 | `string \| number \| email \| url \| pattern` |
| pattern | 正则表达式 | `RegExp` |
| min | 最小值 | `number` |
| max | 最大值 | `number` |
| minLength | 最小长度 | `number` |
| maxLength | 最大长度 | `number` |
| validator | 自定义验证函数 | `(value) => boolean \| string` |

## 样式定制

### CSS Variables

组件库使用 CSS Variables 来控制样式，可以通过覆盖这些变量来定制主题：

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

### 主题

#### 暗色主题

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
  /* 更多变量... */
}
```

#### 紧凑主题

启用紧凑主题减小组件尺寸：

```tsx
document.documentElement.setAttribute('data-theme', 'compact');
```

### 组件样式覆盖

可以使用 CSS 类名或 style 属性覆盖组件样式：

```tsx
// 使用 style
<Button
  style={{
    backgroundColor: '#f0f0f0',
    borderRadius: '20px',
    padding: '10px 20px',
  }}
>
  自定义样式
</Button>

// 使用 CSS 类名
<div className="ly-button ly-button--primary custom-button">
  自定义样式
</div>

// CSS
.custom-button {
  background-color: #f0f0f0;
  border-radius: 20px;
}
```

## 自定义文本支持

组件支持自定义文本，可以覆盖默认的标签文本。支持的组件包括：

### Pagination 分页器

```tsx
<Pagination
  total={100}
  prevText="Previous Page"
  nextText="Next Page"
  jumpText="Go to"
  pageText="page"
/>
```

### Select 选择器

```tsx
<Select
  placeholder="Choose an option"
  emptyText="No options available"
  maxTagText="{count} items selected"
  options={options}
/>
```

### Table 表格

```tsx
<Table
  columns={columns}
  dataSource={data}
  emptyText="No data available"
/>
```

所有组件的默认文本都支持 i18n 切换，如果提供了自定义文本，则优先显示自定义文本。

## 浏览器支持

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 许可证

MIT
