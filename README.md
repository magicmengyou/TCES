# TCES - 草料二维码数据库查询工具 (GitHub Pages 版本)

这是一个纯前端的Web应用程序，可以在GitHub Pages上运行，允许用户通过客户端JavaScript连接到MySQL数据库并执行SELECT查询。

## ⚠️ 重要说明

由于GitHub Pages是一个静态托管服务，不支持Node.js后端，因此本应用已修改为纯前端版本：
- 数据库连接信息需要用户手动输入
- 实际的数据库查询需要通过CORS代理或公共API端点实现
- 默认情况下，应用处于演示模式，显示示例数据

## 功能特性

- 纯前端实现，适用于GitHub Pages
- 可配置的数据库连接参数
- 执行SELECT SQL查询（需要CORS代理或公共API）
- 以表格形式显示查询结果
- 安全限制（仅允许SELECT查询）
- 响应式设计，支持移动设备

## GitHub Pages 部署

### 直接使用（演示模式）

1. 将此仓库推送到您的GitHub账户
2. 在仓库设置中启用GitHub Pages（选择main分支作为源）
3. 访问 `https://yourusername.github.io/repository-name`

### 启用实际数据库连接

要启用实际的数据库连接，您需要：

1. 设置一个CORS代理服务器或公共API端点来处理数据库查询
2. 修改应用中的API_URL常量指向您的后端服务
3. 确保后端服务正确处理跨域请求

## 完整功能部署（使用后端）

如果您希望使用完整的数据库连接功能，可以将应用部署到支持Node.js的平台：

### Heroku 部署

1. Fork 此仓库
2. 创建Heroku账户
3. 连接您的GitHub仓库到Heroku
4. 在Heroku应用设置中配置环境变量：
   ```
   DB_HOST=your_database_host
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=your_database_name
   DB_PORT=3306
   ```

### Vercel 部署

1. Fork 此仓库
2. 导入到Vercel
3. 在环境变量设置中添加数据库配置：
   ```
   DB_HOST=your_database_host
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=your_database_name
   DB_PORT=3306
   ```

### 自有服务器部署

#### 环境要求

- Node.js (版本 12 或更高)
- npm (通常随 Node.js 一起安装)
- MySQL数据库访问权限

#### 安装依赖

```bash
npm install
```

#### 配置数据库连接

编辑 `.env` 文件，填写您的数据库连接信息：

```
# 数据库配置
DB_HOST=your_database_host
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
DB_PORT=3306

# 服务器配置
PORT=3000
```

#### 启动应用

```bash
npm start
```

或者在开发模式下启动（带有自动重启功能）：

```bash
npm run dev
```

#### 访问应用

打开浏览器并访问 `http://localhost:3000`

## 使用方法

### GitHub Pages版本

1. 打开应用页面
2. 输入数据库连接信息（主机、用户名、密码、数据库名、端口）
3. 点击"连接数据库"按钮测试连接
4. 在文本框中输入SELECT查询语句
5. 点击"执行查询"按钮
6. 查询结果将以表格形式显示在下方

### 完整功能版本

1. 应用启动后会自动测试数据库连接
2. 在文本框中输入SELECT查询语句
3. 点击"执行查询"按钮
4. 查询结果将以表格形式显示在下方

## 环境变量

对于完整功能版本，需要以下环境变量：

```
# 数据库配置
DB_HOST=your_database_host
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
DB_PORT=3306

# 服务器配置
PORT=3000
```

## 开发说明

### 项目结构

```
.
├── index.html         # 主页面
├── css/
│   └── style.css      # 样式文件
├── js/
│   └── app.js         # 客户端JavaScript逻辑
├── server.js          # Node.js后端服务器（完整功能版本）
├── .env               # 环境变量配置文件
├── package.json       # 项目依赖和脚本
└── README.md          # 项目说明文档
```

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 安全说明

- 应用仅允许执行SELECT查询语句
- 在GitHub Pages版本中，数据库凭据存储在浏览器本地，不会发送到任何服务器
- 在完整功能版本中，敏感信息（如密码）应通过环境变量配置
- 建议在生产环境中使用只读数据库用户

## 技术栈

- HTML5
- CSS3 (带响应式设计)
- JavaScript (ES6+)
- Node.js + Express (完整功能版本)
- MySQL2 (数据库驱动)

## 许可证

MIT License