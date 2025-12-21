# TCES - 草料二维码数据库查询工具

这是一个基于Node.js的Web应用程序，允许用户连接到MySQL数据库并执行SELECT查询。

## 功能特性

- 连接MySQL数据库
- 执行SELECT SQL查询
- 以表格形式显示查询结果
- 安全限制（仅允许SELECT查询）

## 安装和设置

### 1. 环境要求

- Node.js (版本 12 或更高)
- npm (通常随 Node.js 一起安装)
- MySQL数据库访问权限

### 2. 安装依赖

```bash
npm install
```

### 3. 配置数据库连接

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

### 4. 启动应用

```bash
npm start
```

或者在开发模式下启动（带有自动重启功能）：

```bash
npm run dev
```

### 5. 访问应用

打开浏览器并访问 `http://localhost:3000`

## 使用方法

1. 应用启动后会自动测试数据库连接
2. 在文本框中输入SELECT查询语句
3. 点击"执行查询"按钮
4. 查询结果将以表格形式显示在下方

## API端点

- `GET /api/test-connection` - 测试数据库连接
- `POST /api/query` - 执行SQL查询
- `GET /api/tables` - 获取所有表名
- `GET /api/table-structure/:tableName` - 获取表结构

## 安全说明

- 应用仅允许执行SELECT查询语句
- 数据库连接使用连接池管理
- 敏感信息（如密码）应通过环境变量配置

## 注意事项

- 请确保您的数据库允许来自应用服务器的连接
- 不要在生产环境中暴露此应用，因为它没有用户认证机制
- 建议在防火墙级别限制对此应用的访问