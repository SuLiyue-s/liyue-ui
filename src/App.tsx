import React from 'react';
import {
  Button,
  Input,
  Select,
  CheckboxGroup,
  RadioGroup,
  Switch,
  Slider,
  Container,
  Grid,
  Flex,
  Stack,
  Divider,
  Table,
  Card,
  Avatar,
  Badge,
  Tag,
  Progress,
  Menu,
  Tabs,
  Breadcrumb,
  Pagination,
  Steps,
  Modal,
  Drawer,
  ToastProvider,
  useToast,
  Alert,
  Tooltip,
} from './components';
import { Form, FormItem } from './components/Form';
import { TextArea } from './components/Input';
import { I18nProvider, useI18n } from './i18n';
import './styles/variables.css';
import './styles/base.css';
import './styles/theme.css';

const tableColumns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '地址', dataIndex: 'address' },
  {
    title: '操作',
    render: () => <Button size="sm">编辑</Button>,
  },
];

const tableData = [
  { key: 1, name: '张三', age: 18, address: '北京市朝阳区' },
  { key: 2, name: '李四', age: 25, address: '上海市浦东新区' },
  { key: 3, name: '王五', age: 30, address: '广州市天河区' },
];

const menuItems = [
  { key: 'home', label: '首页', icon: '🏠' },
  { key: 'about', label: '关于', icon: 'ℹ️' },
  { key: 'products', label: '产品', icon: '📦', children: [
    { key: 'p1', label: '产品1' },
    { key: 'p2', label: '产品2' },
  ]},
  { key: 'contact', label: '联系', icon: '📧' },
];

const tabItems = [
  { key: 'tab1', label: '标签1', children: <div>内容1</div> },
  { key: 'tab2', label: '标签2', children: <div>内容2</div> },
  { key: 'tab3', label: '标签3', children: <div>内容3</div> },
];

const stepItems = [
  { title: '步骤1', description: '填写信息' },
  { title: '步骤2', description: '审核' },
  { title: '步骤3', description: '完成' },
];

function DemoApp() {
  const toast = useToast();
  const { locale, setLocale } = useI18n();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <Container maxWidth="xl" padding="md">
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Liyue UI 组件示例</h1>
      
      {/* 语言切换 */}
      <Card title="国际化 i18n" style={{ marginBottom: '1rem' }}>
        <Flex gap="md" align="center">
          <span>当前语言: {locale === 'zh-CN' ? '简体中文' : 'English'}</span>
          <Button
            size="sm"
            onClick={() => setLocale(locale === 'zh-CN' ? 'en-US' : 'zh-CN')}
          >
            切换语言
          </Button>
        </Flex>
      </Card>

      {/* 按钮示例 */}
      <Card title="按钮 Button" style={{ marginBottom: '1rem' }}>
        <Flex wrap gap="md">
          <Button>默认</Button>
          <Button type="primary">主要</Button>
          <Button type="success">成功</Button>
          <Button type="warning">警告</Button>
          <Button type="danger">危险</Button>
          <Button type="info">信息</Button>
          <Button plain>朴素</Button>
          <Button round>圆角</Button>
          <Button loading>加载中</Button>
          <Button disabled>禁用</Button>
          <Button type="primary" icon="✓">带图标</Button>
        </Flex>
        <Divider />
        <Flex wrap gap="md">
          <Button size="sm">小按钮</Button>
          <Button size="md">中按钮</Button>
          <Button size="lg">大按钮</Button>
        </Flex>
      </Card>

      {/* 输入框示例 */}
      <Card title="输入框 Input" style={{ marginBottom: '1rem' }}>
        <Grid cols={3} gap="md">
          <Input placeholder="基础输入框" />
          <Input prefix="+" suffix="@" placeholder="前缀后缀" />
          <Input prepend="https://" append=".com" placeholder="输入域名" />
          <Input clearable defaultValue="可清除" />
          <Input type="password" showPasswordToggle placeholder="密码" />
          <Input disabled defaultValue="禁用" />
        </Grid>
      </Card>

      {/* 选择器示例 */}
      <Card title="选择器 Select" style={{ marginBottom: '1rem' }}>
        <Grid cols={3} gap="md">
          <Select
            placeholder="请选择"
            options={[
              { label: '选项1', value: 1 },
              { label: '选项2', value: 2 },
              { label: '禁用', value: 3, disabled: true },
            ]}
          />
          <Select multiple placeholder="多选" options={[
            { label: '选项1', value: 1 },
            { label: '选项2', value: 2 },
            { label: '选项3', value: 3 },
          ]} />
          <Select searchable placeholder="可搜索" options={[
            { label: '苹果', value: 'apple' },
            { label: '香蕉', value: 'banana' },
            { label: '橙子', value: 'orange' },
          ]} />
        </Grid>
      </Card>

      {/* 复选框和单选框 */}
      <Card title="复选框和单选框 Checkbox & Radio" style={{ marginBottom: '1rem' }}>
        <Grid cols={2} gap="lg">
          <div>
            <h4>复选框</h4>
            <CheckboxGroup
              options={[
                { label: '选项1', value: 1 },
                { label: '选项2', value: 2 },
                { label: '禁用', value: 3, disabled: true },
              ]}
              defaultValue={[1, 2]}
            />
          </div>
          <div>
            <h4>单选框</h4>
            <RadioGroup
              options={[
                { label: '选项1', value: 1 },
                { label: '选项2', value: 2 },
                { label: '禁用', value: 3, disabled: true },
              ]}
              defaultValue={1}
            />
          </div>
        </Grid>
      </Card>

      {/* 开关和滑块 */}
      <Card title="开关和滑块 Switch & Slider" style={{ marginBottom: '1rem' }}>
        <Grid cols={2} gap="lg">
          <div>
            <h4>开关</h4>
            <Stack direction="vertical" gap="md">
              <Switch />
              <Switch checked />
              <Switch disabled />
              <Switch activeText="ON" inactiveText="OFF" />
            </Stack>
          </div>
          <div>
            <h4>滑块</h4>
            <Stack direction="vertical" gap="md">
              <Slider defaultValue={50} />
              <Slider range defaultRangeValue={[20, 80]} />
              <Slider showInput defaultValue={30} />
            </Stack>
          </div>
        </Grid>
      </Card>

      {/* 表格 */}
      <Card title="表格 Table" style={{ marginBottom: '1rem' }}>
        <Table 
          columns={tableColumns.map(col => ({
            ...col,
            dataIndex: col.dataIndex || 'key'
          }))} 
          dataSource={tableData} 
          bordered 
          striped 
        />
      </Card>

      {/* 卡片 */}
      <Card title="卡片 Card" style={{ marginBottom: '1rem' }}>
        <Grid cols={3} gap="md">
          <Card title="基础卡片">卡片内容</Card>
          <Card title="带头像" avatar={<Avatar>张</Avatar>}>
            卡片内容
          </Card>
          <Card
            title="带封面"
            cover={<div style={{ height: 100, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} />}
          >
            卡片内容
          </Card>
        </Grid>
      </Card>

      {/* 头像、徽标和标签 */}
      <Card title="头像、徽标和标签 Avatar & Badge & Tag" style={{ marginBottom: '1rem' }}>
        <Flex gap="lg" align="center">
          <Avatar>张</Avatar>
          <Avatar src="https://via.placeholder.com/100" />
          <Avatar size="lg" icon="👤" />
          <Badge count={5}>
            <div style={{ width: 40, height: 40, background: '#f0f0f0', borderRadius: 4 }} />
          </Badge>
          <Badge count={100} maxCount={99} />
          <Badge dot status="success" />
          <Tag>标签</Tag>
          <Tag type="success">成功</Tag>
          <Tag type="warning">警告</Tag>
          <Tag type="danger">危险</Tag>
          <Tag closable>可关闭</Tag>
        </Flex>
      </Card>

      {/* 进度条 */}
      <Card title="进度条 Progress" style={{ marginBottom: '1rem' }}>
        <Stack direction="vertical" gap="md">
          <Progress percent={30} />
          <Progress percent={60} status="success" />
          <Progress percent={50} type="circle" />
          <Progress percent={70} type="dashboard" />
          <Progress percent={40} animated />
        </Stack>
      </Card>

      {/* 菜单 */}
      <Card title="菜单 Menu" style={{ marginBottom: '1rem' }}>
        <Grid cols={2} gap="lg">
          <Menu items={menuItems} />
          <Menu items={menuItems} mode="horizontal" />
        </Grid>
      </Card>

      {/* 标签页 */}
      <Card title="标签页 Tabs" style={{ marginBottom: '1rem' }}>
        <Tabs items={tabItems} />
      </Card>

      {/* 面包屑 */}
      <Card title="面包屑 Breadcrumb" style={{ marginBottom: '1rem' }}>
        <Breadcrumb
          items={[
            { title: '首页', href: '/' },
            { title: '列表', href: '/list' },
            { title: '详情' },
          ]}
        />
      </Card>

      {/* 分页 */}
      <Card title="分页 Pagination" style={{ marginBottom: '1rem' }}>
        <Pagination total={100} showSizeChanger showQuickJumper showTotal />
      </Card>

      {/* 步骤条 */}
      <Card title="步骤条 Steps" style={{ marginBottom: '1rem' }}>
        <Steps items={stepItems} current={1} />
      </Card>

      {/* 警告提示 */}
      <Card title="警告提示 Alert" style={{ marginBottom: '1rem' }}>
        <Stack direction="vertical" gap="md">
          <Alert type="success" message="成功提示" description="这是一条成功提示的描述信息" />
          <Alert type="warning" message="警告提示" closable />
          <Alert type="error" message="错误提示" />
          <Alert type="info" message="信息提示" />
        </Stack>
      </Card>

      {/* 模态框和抽屉 */}
      <Card title="模态框和抽屉 Modal & Drawer" style={{ marginBottom: '1rem' }}>
        <Flex gap="md">
          <Button onClick={() => setModalOpen(true)}>打开模态框</Button>
          <Button onClick={() => setDrawerOpen(true)}>打开抽屉</Button>
        </Flex>
        <Modal
          open={modalOpen}
          title="模态框标题"
          onClose={() => setModalOpen(false)}
          footer={
            <>
              <Button onClick={() => setModalOpen(false)}>取消</Button>
              <Button type="primary" onClick={() => setModalOpen(false)}>确定</Button>
            </>
          }
        >
          <p>这是模态框的内容</p>
        </Modal>
        <Drawer
          open={drawerOpen}
          title="抽屉标题"
          placement="right"
          onClose={() => setDrawerOpen(false)}
        >
          <p>这是抽屉的内容</p>
        </Drawer>
      </Card>

      {/* 文字提示 */}
      <Card title="文字提示 Tooltip" style={{ marginBottom: '1rem' }}>
        <Flex gap="md">
          <Tooltip content="上方的提示">
            <Button>上方</Button>
          </Tooltip>
          <Tooltip content="下方的提示" placement="bottom">
            <Button>下方</Button>
          </Tooltip>
          <Tooltip content="左侧的提示" placement="left">
            <Button>左侧</Button>
          </Tooltip>
          <Tooltip content="右侧的提示" placement="right">
            <Button>右侧</Button>
          </Tooltip>
        </Flex>
      </Card>

      {/* 消息提示 */}
      <Card title="消息提示 Toast">
        <Flex wrap gap="md">
          <Button onClick={() => toast.success('成功提示')}>成功</Button>
          <Button onClick={() => toast.error('错误提示')}>错误</Button>
          <Button onClick={() => toast.warning('警告提示')}>警告</Button>
          <Button onClick={() => toast.info('信息提示')}>信息</Button>
          <Button onClick={() => toast.loading('加载中...')}>加载</Button>
        </Flex>
      </Card>

      {/* 表单 */}
      <Card title="表单 Form" style={{ marginBottom: '1rem' }}>
        <Form layout="vertical" style={{ maxWidth: 500 }}>
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
          <FormItem label="密码" name="password">
            <Input type="password" placeholder="请输入密码" />
          </FormItem>
          <FormItem label="简介" name="bio">
            <TextArea placeholder="请输入简介" />
          </FormItem>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form>
      </Card>
    </Container>
  );
}

function App() {
  return (
    <I18nProvider locale="zh-CN">
      <ToastProvider position="top-right" maxCount={3}>
        <DemoApp />
      </ToastProvider>
    </I18nProvider>
  );
}

export default App;
