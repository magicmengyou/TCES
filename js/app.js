// app.js - TCES 客户端逻辑

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

// 设置事件监听器
function setupEventListeners() {
    document.getElementById('connect-btn').addEventListener('click', connectDatabase);
    document.getElementById('execute-btn').addEventListener('click', executeQuery);
}

// 连接数据库
function connectDatabase() {
    // 获取数据库连接信息
    const dbHost = document.getElementById('db-host').value.trim();
    const dbUser = document.getElementById('db-user').value.trim();
    const dbPassword = document.getElementById('db-password').value;
    const dbName = document.getElementById('db-name').value.trim();
    
    if (!dbHost || !dbUser || !dbName) {
        showMessage('请填写完整的数据库连接信息', 'error');
        return;
    }
    
    // 在GitHub Pages上，我们无法直接连接到MySQL数据库
    // 这里只是模拟连接成功的状态
    showMessage('注意：GitHub Pages是静态托管服务，无法直接连接数据库。\n\n在实际部署时，您需要：\n1. 使用后端API服务\n2. 或者使用支持服务器端代码的托管平台', 'warning');
    
    // 启用查询按钮
    document.getElementById('execute-btn').disabled = false;
    
    // 显示连接成功信息
    showResult('<div class="message message-warning">演示模式：GitHub Pages无法直接连接数据库。请使用支持后端的托管服务。</div>');
}

// 执行查询
function executeQuery() {
    const sqlQuery = document.getElementById('sql-query').value.trim();
    
    if (!sqlQuery) {
        showMessage('请输入SQL查询语句', 'error');
        return;
    }
    
    // 显示说明信息
    const resultContent = `
        <div class="message message-warning">
            <h3>GitHub Pages限制说明</h3>
            <p>GitHub Pages是静态网站托管服务，不支持：</p>
            <ul>
                <li>服务器端代码执行（如Node.js）</li>
                <li>直接数据库连接</li>
                <li>后端API处理</li>
            </ul>
            <p>要实现完整的数据库查询功能，您需要：</p>
            <ol>
                <li>使用支持后端的托管服务（如Heroku、Vercel、Netlify Functions等）</li>
                <li>或者部署到您自己的服务器上</li>
            </ol>
            <p>当前显示的是预设的示例查询：<br><code>${escapeHtml(sqlQuery)}</code></p>
        </div>
    `;
    showResult(resultContent);
}

// 显示消息
function showMessage(message, type = 'info') {
    // 移除之前的消息
    const existingMessage = document.querySelector('.message-temp');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 创建新消息元素
    const messageElement = document.createElement('div');
    messageElement.className = `message message-${type} message-temp`;
    messageElement.textContent = message;
    
    // 添加到容器顶部
    const container = document.querySelector('.container');
    container.insertBefore(messageElement, container.firstChild);
    
    // 3秒后自动移除消息
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.remove();
        }
    }, 3000);
}

// 显示结果
function showResult(content) {
    const resultContainer = document.getElementById('result-container');
    const resultContent = document.getElementById('result-content');
    resultContent.innerHTML = content;
    resultContainer.classList.remove('hidden');
}

// 转义HTML特殊字符
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}