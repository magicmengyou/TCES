// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 检查用户登录状态
    checkLoginStatus();
    
    // 初始化页面数据
    initializeData();
    
    // 绑定表单提交事件
    const form = document.getElementById('archiveForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // 绑定存储选项变化事件
    bindStorageEvents();
    
    // 绑定数据库选项变化事件
    bindDatabaseEvents();
});

// 初始化页面数据
function initializeData() {
    // 模拟一些初始数据
    const courses = [
        { 
            id: 1, 
            name: 'Web开发基础', 
            description: '学习HTML, CSS, JavaScript基础知识',
            links: [
                { name: '课件PDF', url: 'https://example.com/web-basic-slides.pdf' },
                { name: '示例代码', url: 'https://github.com/example/web-basic-code' }
            ]
        },
        { 
            id: 2, 
            name: 'Python编程', 
            description: '掌握Python语言及其应用',
            links: [
                { name: '课件PPT', url: 'https://example.com/python-slides.pptx' },
                { name: '练习题', url: 'https://example.com/python-exercises.pdf' }
            ]
        },
        { 
            id: 3, 
            name: '数据分析', 
            description: '使用Python进行数据分析和可视化',
            links: [
                { name: '数据集', url: 'https://example.com/data-analysis-dataset.zip' },
                { name: 'Jupyter笔记本', url: 'https://example.com/data-analysis-notebook.ipynb' }
            ]
        }
    ];
    
    // 显示数据
    displayCourses(courses);
    
    // 从localStorage加载配置
    loadConfigurations();
}

// 显示课程数据
function displayCourses(courses) {
    const container = document.getElementById('coursesGrid');
    if (!container) return;
    
    container.innerHTML = '';
    
    courses.forEach(course => {
        let linksHtml = '';
        if (course.links && course.links.length > 0) {
            linksHtml = '<div class="course-links">';
            course.links.forEach(link => {
                linksHtml += `<a href="${link.url}" target="_blank" class="link-btn">${link.name}</a>`;
            });
            linksHtml += '</div>';
        }
        
        const card = document.createElement('div');
        card.className = 'archive-card';
        card.innerHTML = `
            <h3>${course.name}</h3>
            <p>${course.description}</p>
            ${linksHtml}
            <a href="#" class="btn" onclick="viewCourse(${course.id})">查看详情</a>
        `;
        container.appendChild(card);
    });
}

// 查看课程详情
function viewCourse(id) {
    alert(`查看课程详情，ID: ${id}\n（在实际应用中，这里会显示详细信息）`);
}

// 显示上传表单
function showUploadForm(type) {
    const form = document.getElementById('uploadForm');
    if (form) {
        form.classList.remove('hidden');
        
        // 设置默认档案类型
        const typeSelect = document.getElementById('archiveType');
        if (typeSelect) {
            typeSelect.value = type;
        }
    }
}

// 处理表单提交
function handleFormSubmit(event) {
    event.preventDefault();
    
    // 获取表单数据
    const formData = new FormData(event.target);
    const type = formData.get('type');
    const name = formData.get('name');
    const description = formData.get('description');
    const links = formData.get('links');
    
    // 解析链接
    let parsedLinks = [];
    if (links) {
        const linkArray = links.split(',').map(link => link.trim());
        parsedLinks = linkArray.map((link, index) => {
            return {
                name: `资源${index + 1}`,
                url: link
            };
        });
    }
    
    // 这里应该发送数据到数据库，在此我们只做简单的前端模拟
    console.log('提交档案:', { type, name, description, links: parsedLinks });
    
    // 显示成功消息
    alert(`成功添加${getTypeName(type)}: ${name}`);
    
    // 重置表单
    event.target.reset();
    
    // 隐藏表单
    const form = document.getElementById('uploadForm');
    if (form) {
        form.classList.add('hidden');
    }
}

// 获取类型名称
function getTypeName(type) {
    switch(type) {
        case 'course': return '课程';
        case 'trainer': return '讲师';
        case 'student': return '学员';
        default: return '档案';
    }
}

// 执行搜索
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value;
    if (searchTerm.trim() === '') {
        alert('请输入搜索关键词');
        return;
    }
    
    // 在实际应用中，这里会向服务器发送搜索请求
    alert(`搜索: ${searchTerm}\n（在实际应用中，这里会显示搜索结果）`);
}

// 绑定存储选项事件
function bindStorageEvents() {
    const storageCheckboxes = document.querySelectorAll('input[name="storage"]');
    storageCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const configDiv = document.getElementById(`${this.value}-config`);
            if (configDiv) {
                configDiv.style.display = this.checked ? 'block' : 'none';
            }
        });
    });
}

// 绑定数据库选项事件
function bindDatabaseEvents() {
    const databaseRadios = document.querySelectorAll('input[name="database"]');
    databaseRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // 隐藏所有数据库配置
            document.querySelectorAll('.database-config').forEach(config => {
                config.style.display = 'none';
            });
            
            // 显示选中数据库的配置
            const configDiv = document.getElementById(`${this.value}-config`);
            if (configDiv) {
                configDiv.style.display = 'block';
            }
        });
    });
}

// 保存存储配置
function saveStorageConfig() {
    const storageOptions = {};
    const checkboxes = document.querySelectorAll('input[name="storage"]:checked');
    
    checkboxes.forEach(checkbox => {
        const value = checkbox.value;
        storageOptions[value] = true;
        
        // 保存具体的配置信息
        if (value === 'nas') {
            storageOptions.nas = {
                address: document.getElementById('nas-address').value,
                username: document.getElementById('nas-username').value,
                password: document.getElementById('nas-password').value
            };
        } else if (value === 'baidu') {
            storageOptions.baidu = {
                token: document.getElementById('baidu-token').value
            };
        } else if (value === 'xunlei') {
            storageOptions.xunlei = {
                key: document.getElementById('xunlei-key').value
            };
        } else if (value === 'quark') {
            storageOptions.quark = {
                cookie: document.getElementById('quark-cookie').value
            };
        }
    });
    
    // 保存到localStorage
    localStorage.setItem('storageConfig', JSON.stringify(storageOptions));
    
    alert('存储配置已保存！');
}

// 保存数据库配置
function saveDatabaseConfig() {
    const selectedDatabase = document.querySelector('input[name="database"]:checked');
    if (!selectedDatabase) {
        alert('请选择一个数据库');
        return;
    }
    
    const dbConfig = {
        type: selectedDatabase.value
    };
    
    // 保存具体的配置信息
    if (selectedDatabase.value === 'firebase') {
        dbConfig.firebase = {
            apiKey: document.getElementById('firebase-apikey').value,
            authDomain: document.getElementById('firebase-authdomain').value,
            projectId: document.getElementById('firebase-projectid').value
        };
    } else if (selectedDatabase.value === 'supabase') {
        dbConfig.supabase = {
            url: document.getElementById('supabase-url').value,
            key: document.getElementById('supabase-key').value
        };
    }
    // IndexedDB不需要额外配置
    
    // 保存到localStorage
    localStorage.setItem('databaseConfig', JSON.stringify(dbConfig));
    
    alert('数据库配置已保存！');
}

// 加载配置
function loadConfigurations() {
    // 加载存储配置
    const storageConfig = localStorage.getItem('storageConfig');
    if (storageConfig) {
        const config = JSON.parse(storageConfig);
        for (const key in config) {
            if (key !== 'nas' && key !== 'baidu' && key !== 'xunlei' && key !== 'quark') {
                const checkbox = document.getElementById(`${key}-storage`);
                if (checkbox) {
                    checkbox.checked = true;
                    
                    // 显示配置区域
                    const configDiv = document.getElementById(`${key}-config`);
                    if (configDiv) {
                        configDiv.style.display = 'block';
                    }
                }
            }
        }
        
        // 填充具体配置值
        if (config.nas) {
            document.getElementById('nas-address').value = config.nas.address || '';
            document.getElementById('nas-username').value = config.nas.username || '';
            document.getElementById('nas-password').value = config.nas.password || '';
        }
        if (config.baidu) {
            document.getElementById('baidu-token').value = config.baidu.token || '';
        }
        if (config.xunlei) {
            document.getElementById('xunlei-key').value = config.xunlei.key || '';
        }
        if (config.quark) {
            document.getElementById('quark-cookie').value = config.quark.cookie || '';
        }
    }
    
    // 加载数据库配置
    const databaseConfig = localStorage.getItem('databaseConfig');
    if (databaseConfig) {
        const config = JSON.parse(databaseConfig);
        const radio = document.getElementById(`${config.type}-db`);
        if (radio) {
            radio.checked = true;
            
            // 显示配置区域
            const configDiv = document.getElementById(`${config.type}-config`);
            if (configDiv) {
                configDiv.style.display = 'block';
            }
            
            // 填充具体配置值
            if (config.firebase) {
                document.getElementById('firebase-apikey').value = config.firebase.apiKey || '';
                document.getElementById('firebase-authdomain').value = config.firebase.authDomain || '';
                document.getElementById('firebase-projectid').value = config.firebase.projectId || '';
            }
            if (config.supabase) {
                document.getElementById('supabase-url').value = config.supabase.url || '';
                document.getElementById('supabase-key').value = config.supabase.key || '';
            }
        }
    }
}

// 平滑滚动到指定部分
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// 检查登录状态
function checkLoginStatus() {
    // 检查是否存在用户信息
    const currentUser = localStorage.getItem('currentUser');
    
    // 如果没有登录信息且当前不是登录页面，则重定向到登录页面
    if (!currentUser && window.location.pathname.indexOf('login.html') === -1) {
        window.location.href = 'login.html';
        return;
    }
    
    // 如果已登录，设置用户界面
    if (currentUser) {
        const user = JSON.parse(currentUser);
        setupUserInterface(user);
    }
}

// 设置用户界面
function setupUserInterface(user) {
    const userInfoElement = document.getElementById('userInfo');
    if (userInfoElement) {
        userInfoElement.innerHTML = `
            <span>欢迎, ${user.name} (${getUserRoleName(user.role)})</span>
            <button id="logoutBtn" class="btn">登出</button>
        `;
        
        // 绑定登出按钮事件
        document.getElementById('logoutBtn').addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
        
        // 根据用户角色显示不同内容
        applyRolePermissions(user.role);
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

// 应用角色权限
function applyRolePermissions(role) {
    switch(role) {
        case 'admin':
            // 管理员可以看到所有内容
            showAllContent();
            break;
        case 'teacher':
            // 教师看不到存储配置和数据库配置
            hideAdminOnlyContent();
            break;
        case 'student':
            // 学生只能看到自己的信息和课程
            showStudentOnlyContent();
            break;
    }
}

// 显示所有内容（管理员）
function showAllContent() {
    // 管理员可以看到所有内容，默认情况下都可见
}

// 隐藏仅管理员可见内容（教师）
function hideAdminOnlyContent() {
    const storageConfig = document.getElementById('storageConfig');
    const databaseConfig = document.getElementById('databaseConfig');
    
    if (storageConfig) storageConfig.style.display = 'none';
    if (databaseConfig) databaseConfig.style.display = 'none';
}

// 显示仅学生可见内容（学生）
function showStudentOnlyContent() {
    // 隐藏非学生内容
    const storageConfig = document.getElementById('storageConfig');
    const databaseConfig = document.getElementById('databaseConfig');
    const managementPanel = document.getElementById('admin');
    
    if (storageConfig) storageConfig.style.display = 'none';
    if (databaseConfig) databaseConfig.style.display = 'none';
    if (managementPanel) managementPanel.style.display = 'none';
    
    // 显示学生内容
    const studentSection = document.getElementById('studentSection');
    if (studentSection) {
        studentSection.style.display = 'block';
        loadStudentData();
    }
}

// 加载学生数据
function loadStudentData() {
    // 这里应该从数据库加载学生数据
    // 目前使用模拟数据
    const studentSection = document.getElementById('studentSection');
    if (studentSection) {
        studentSection.innerHTML = `
            <h2>我的信息</h2>
            <div class="student-info">
                <p><strong>姓名:</strong> 张三</p>
                <p><strong>学号:</strong> S001</p>
                <p><strong>专业:</strong> 计算机科学与技术</p>
            </div>
            <h2>我的课程</h2>
            <div class="courses-grid">
                <div class="course-card">
                    <h3>Web开发基础</h3>
                    <p>学习HTML, CSS, JavaScript基础知识</p>
                    <button class="btn" onclick="viewCourse(1)">查看资料</button>
                </div>
                <div class="course-card">
                    <h3>Python编程</h3>
                    <p>掌握Python语言及其应用</p>
                    <button class="btn" onclick="viewCourse(2)">查看资料</button>
                </div>
            </div>
        `;
    }
}
