const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 设置静态文件目录
app.use(express.static(path.join(__dirname)));

// 设置根路径路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 创建数据库连接池
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 测试数据库连接
app.get('/api/test-connection', (req, res) => {
  pool.query('SELECT 1 + 1 AS solution', (error, results) => {
    if (error) {
      console.error('Database connection error:', error);
      return res.status(500).json({ 
        success: false, 
        message: '数据库连接失败',
        error: error.message 
      });
    }
    
    res.json({ 
      success: true, 
      message: '数据库连接成功',
      result: results[0].solution 
    });
  });
});

// 执行SQL查询的API端点
app.post('/api/query', (req, res) => {
  const { sql } = req.body;
  
  if (!sql) {
    return res.status(400).json({ 
      success: false, 
      message: 'SQL查询语句不能为空' 
    });
  }
  
  // 出于安全考虑，限制只能执行SELECT查询
  if (!sql.trim().toUpperCase().startsWith('SELECT')) {
    return res.status(400).json({ 
      success: false, 
      message: '出于安全考虑，只允许执行SELECT查询' 
    });
  }
  
  pool.query(sql, (error, results) => {
    if (error) {
      console.error('Query error:', error);
      return res.status(500).json({ 
        success: false, 
        message: '查询执行失败',
        error: error.message 
      });
    }
    
    res.json({ 
      success: true, 
      message: '查询执行成功',
      data: results 
    });
  });
});

// 获取所有表名
app.get('/api/tables', (req, res) => {
  const query = "SHOW TABLES";
  
  pool.query(query, (error, results) => {
    if (error) {
      console.error('Get tables error:', error);
      return res.status(500).json({ 
        success: false, 
        message: '获取表列表失败',
        error: error.message 
      });
    }
    
    // 提取表名
    const tables = results.map(row => {
      return row[Object.keys(row)[0]];
    });
    
    res.json({ 
      success: true, 
      message: '获取表列表成功',
      data: tables 
    });
  });
});

// 获取表结构
app.get('/api/table-structure/:tableName', (req, res) => {
  const { tableName } = req.params;
  
  if (!tableName) {
    return res.status(400).json({ 
      success: false, 
      message: '表名不能为空' 
    });
  }
  
  const query = `DESCRIBE ${tableName}`;
  
  pool.query(query, (error, results) => {
    if (error) {
      console.error('Get table structure error:', error);
      return res.status(500).json({ 
        success: false, 
        message: '获取表结构失败',
        error: error.message 
      });
    }
    
    res.json({ 
      success: true, 
      message: '获取表结构成功',
      data: results 
    });
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在端口 ${port}`);
});

module.exports = app;