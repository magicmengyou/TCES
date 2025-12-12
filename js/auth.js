// 用户认证和权限管理
document.addEventListener('DOMContentLoaded', function() {
    // 检查用户是否已经登录
    checkLoginStatus();
    
    // 绑定登录表单提交事件
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // 绑定登出按钮事件
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});

// 检查登录状态
function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const currentPage = window.location.pathname.split('/').pop();
    
    // 如果用户已登录但访问的是登录页面，则重定向到主页
    if (currentUser && currentPage === 'login.html') {
        window.location.href = 'index.html';
        return;
    }
    
    // 如果用户未登录但访问的是受保护页面，则重定向到登录页面
    if (!currentUser && currentPage !== 'login.html' && currentPage !== '404.html') {
        window.location.href = 'login.html';
        return;
    }
    
    // 如果用户已登录，设置页面权限
    if (currentUser && currentPage !== 'login.html') {
        setupPagePermissions(currentUser);
    }
}

// 处理登录
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // 验证用户凭据（在实际应用中，这应该是一个安全的后端验证过程）
    const user = authenticateUserAutoRole(username, password);
    
    if (user) {
        // 保存用户信息到localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // 重定向到主页
        window.location.href = 'index.html';
    } else {
        alert('用户名或密码不正确！');
    }
}

// 用户认证（模拟）
function authenticateUser(username, password, role) {
    // 默认用户账户（在实际应用中，这应该来自安全的数据库）
    const users = {
        'admin': { username: 'admin', password: 'admin123', role: 'admin', name: '管理员' },
        'teacher': { username: 'teacher', password: 'teacher123', role: 'teacher', name: '张老师' },
        'student': { username: 'student', password: 'student123', role: 'student', name: '李学生', studentId: 'S001' }
    };
    
    const user = users[username];
    if (user && user.password === password && user.role === role) {
        return {
            username: user.username,
            role: user.role,
            name: user.name,
            studentId: user.studentId || null
        };
    }
    
    return null;
}

// 自动角色检测的用户认证（模拟）
function authenticateUserAutoRole(username, password) {
    // 默认用户账户（在实际应用中，这应该来自安全的数据库）
    const users = {
        'admin': { username: 'admin', password: 'admin123', role: 'admin', name: '管理员' },
        'teacher': { username: 'teacher', password: 'teacher123', role: 'teacher', name: '张老师' },
        'student': { username: 'student', password: 'student123', role: 'student', name: '李学生', studentId: 'S001' }
    };
    
    const user = users[username];
    if (user && user.password === password) {
        return {
            username: user.username,
            role: user.role,
            name: user.name,
            studentId: user.studentId || null
        };
    }
    
    return null;
}

// 设置页面权限
function setupPagePermissions(user) {
    // 显示欢迎信息
    const userInfoElement = document.getElementById('userInfo');
    if (userInfoElement) {
        userInfoElement.innerHTML = `
            <span>欢迎, ${user.name} (${getUserRoleName(user.role)})</span>
            <button id="logoutBtn" class="btn">登出</button>
        `;
        
        // 重新绑定登出按钮事件
        document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    }
    
    // 根据角色显示不同的页面元素
    switch(user.role) {
        case 'admin':
            showAdminElements();
            break;
        case 'teacher':
            showTeacherElements();
            break;
        case 'student':
            showStudentElements(user);
            break;
    }
}

// 获取角色名称
function getUserRoleName(role) {
    const roles = {
        'admin': '管理员',
        'teacher': '教师',
        'student': '学生'
    };
    return roles[role] || role;
}

// 显示管理员元素
function showAdminElements() {
    // 显示存储配置和数据库配置
    const storageConfig = document.getElementById('storageConfig');
    const databaseConfig = document.getElementById('databaseConfig');
    
    if (storageConfig) storageConfig.style.display = 'block';
    if (databaseConfig) databaseConfig.style.display = 'block';
    
    // 显示完整的管理面板
    const managementPanel = document.getElementById('managementPanel');
    if (managementPanel) managementPanel.style.display = 'block';
}

// 显示教师元素
function showTeacherElements() {
    // 隐藏存储配置和数据库配置
    const storageConfig = document.getElementById('storageConfig');
    const databaseConfig = document.getElementById('databaseConfig');
    
    if (storageConfig) storageConfig.style.display = 'none';
    if (databaseConfig) databaseConfig.style.display = 'none';
    
    // 显示受限的管理面板
    const managementPanel = document.getElementById('managementPanel');
    if (managementPanel) managementPanel.style.display = 'block';
    
    // 隐藏某些管理员专用功能
    const adminOnlyElements = document.querySelectorAll('.admin-only');
    adminOnlyElements.forEach(element => {
        element.style.display = 'none';
    });
}

// 显示学生元素
function showStudentElements(user) {
    // 隐藏存储配置、数据库配置和管理面板
    const storageConfig = document.getElementById('storageConfig');
    const databaseConfig = document.getElementById('databaseConfig');
    const managementPanel = document.getElementById('managementPanel');
    
    if (storageConfig) storageConfig.style.display = 'none';
    if (databaseConfig) databaseConfig.style.display = 'none';
    if (managementPanel) managementPanel.style.display = 'none';
    
    // 显示学生特定的信息
    showStudentInfo(user);
}

// 显示学生信息
function showStudentInfo(user) {
    const studentSection = document.getElementById('studentSection');
    if (studentSection) {
        studentSection.innerHTML = `
            <h2>我的信息</h2>
            <div class="student-info">
                <p><strong>姓名:</strong> ${user.name}</p>
                <p><strong>学号:</strong> ${user.studentId}</p>
                <p><strong>角色:</strong> 学生</p>
            </div>
            <h2>我的课程</h2>
            <div id="studentCourses" class="courses-grid">
                <!-- 课程将通过JavaScript动态加载 -->
            </div>
        `;
        studentSection.style.display = 'block';
        
        // 加载学生的课程
        loadStudentCourses(user.studentId);
    }
}

// 加载学生课程（模拟）
function loadStudentCourses(studentId) {
    // 模拟学生课程数据
    const courses = [
        { id: 1, title: '前端开发基础', description: '学习HTML、CSS和JavaScript基础知识' },
        { id: 2, title: '数据库原理', description: '关系型数据库设计与SQL语言' },
        { id: 3, title: '软件工程', description: '软件开发生命周期和项目管理' }
    ];
    
    const coursesContainer = document.getElementById('studentCourses');
    if (coursesContainer) {
        coursesContainer.innerHTML = courses.map(course => `
            <div class="course-card">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <button onclick="viewCourse(${course.id})" class="btn">查看课程资料</button>
            </div>
        `).join('');
    }
}

// 查看课程（模拟）
function viewCourse(courseId) {
    alert(`正在查看课程ID: ${courseId} 的资料`);
    // 在实际应用中，这里会跳转到课程详情页面或显示课程资料
}

// 处理登出
function handleLogout() {
    // 清除用户信息
    localStorage.removeItem('currentUser');
    
    // 重定向到登录页面
    window.location.href = 'login.html';
}
