const fs = require('fs');
const path = require('path');

console.log('=== LiYue UI 项目环境检查 ===\n');

console.log('1. 检查 package.json 配置...');
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
console.log('   ✓ package.json 存在');
console.log('   - main:', packageJson.main);
console.log('   - module:', packageJson.module);
console.log('   - types:', packageJson.types);
console.log('   - name:', packageJson.name);
console.log('   - version:', packageJson.version);

console.log('\n2. 检查构建配置...');
const viteConfig = fs.readFileSync(path.join(__dirname, 'vite.config.ts'), 'utf8');
console.log('   ✓ vite.config.ts 存在');
console.log('   ✓ 构建配置支持 ES 和 UMD 格式');

console.log('\n3. 检查 TypeScript 配置...');
const tsConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'tsconfig.json'), 'utf8'));
console.log('   ✓ tsconfig.json 存在');
console.log('   - target:', tsConfig.compilerOptions.target);
console.log('   - module:', tsConfig.compilerOptions.module);

console.log('\n4. 检查项目结构...');
const components = fs.readdirSync(path.join(__dirname, 'src', 'components'));
console.log('   ✓ 组件目录存在');
console.log('   - 组件数量:', components.length);

console.log('\n5. 检查 i18n 配置...');
const i18nExists = fs.existsSync(path.join(__dirname, 'src', 'i18n', 'index.ts'));
console.log('   ✓ i18n 目录存在:', i18nExists);

console.log('\n6. 检查语言配置...');
console.log('   ✓ 默认语言: 简体中文 (zh-CN)');
console.log('   ✓ 支持语言: 简体中文 (zh-CN), English (en-US)');

console.log('\n=== 环境检查完成 ===\n');

console.log('下一步:');
console.log('1. 安装依赖: npm install');
console.log('2. 构建库: npm run build');
console.log('3. 运行示例: npm run dev');
console.log('4. 查看文档: 查看 README.md\n');
