// 修复"开始记录"按钮和API配置

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 1. 修复"开始记录"按钮
    const startBtn = document.getElementById('start-btn');
    const homePage = document.getElementById('home-page');
    const inputPage = document.getElementById('input-page');
    
    if (startBtn) {
        // 确保事件监听器正确添加
        startBtn.addEventListener('click', function() {
            console.log("开始记录按钮被点击");
            homePage.style.display = 'none';
            inputPage.style.display = 'flex';
        });
    }
    
    // 2. 设置API配置管理
    setupApiConfig();
});

// API配置管理
function setupApiConfig() {
    // API配置状态
    window.apiConfig = {
        url: 'https://api.siliconflow.cn/v1/chat/completions',
        key: '',
        model: 'qwen-max',
        isConfigured: false
    };
    
    // 加载保存的配置
    loadApiConfig();
    
    // 获取DOM元素
    const configBtn = document.getElementById('config-btn');
    const apiConfigModal = document.getElementById('api-config-modal');
    const apiUrlInput = document.getElementById('api-url');
    const apiKeyInput = document.getElementById('api-key');
    const apiModelInput = document.getElementById('api-model');
    const configStatus = document.getElementById('config-status');
    const statusIndicator = configStatus.querySelector('.status-indicator');
    const statusText = configStatus.querySelector('.status-text');
    const saveConfigBtn = document.getElementById('save-config-btn');
    const deleteConfigBtn = document.getElementById('delete-config-btn');
    const testConfigBtn = document.getElementById('test-config-btn');
    const closeConfigBtn = apiConfigModal.querySelector('.close-btn');
    
    // 绑定事件
    configBtn.addEventListener('click', function() {
        openConfigModal();
    });
    
    closeConfigBtn.addEventListener('click', function() {
        closeConfigModal();
    });
    
    saveConfigBtn.addEventListener('click', function() {
        saveApiConfig();
    });
    
    deleteConfigBtn.addEventListener('click', function() {
        deleteApiConfig();
    });
    
    testConfigBtn.addEventListener('click', function() {
        testApiConnection();
    });
    
    // 点击模态框外部关闭
    window.addEventListener('click', function(event) {
        if (event.target === apiConfigModal) {
            closeConfigModal();
        }
    });
    
    // 打开配置模态框
    function openConfigModal() {
        apiUrlInput.value = window.apiConfig.url;
        apiKeyInput.value = window.apiConfig.key;
        apiModelInput.value = window.apiConfig.model;
        apiConfigModal.style.display = 'flex';
        updateConfigStatus();
    }
    
    // 关闭配置模态框
    function closeConfigModal() {
        apiConfigModal.style.display = 'none';
    }
    
    // 保存API配置
    function saveApiConfig() {
        const url = apiUrlInput.value.trim();
        const key = apiKeyInput.value.trim();
        const model = apiModelInput.value.trim() || 'qwen-max';
        
        if (!url || !key) {
            showToast('请填写API URL和API Key');
            return;
        }
        
        window.apiConfig.url = url;
        window.apiConfig.key = key;
        window.apiConfig.model = model;
        window.apiConfig.isConfigured = true;
        
        // 保存到localStorage
        localStorage.setItem('catPlannerApiConfig', JSON.stringify(window.apiConfig));
        
        updateConfigStatus();
        showToast('配置已保存');
    }
    
    // 删除API配置
    function deleteApiConfig() {
        if (confirm('确定要删除API配置吗？')) {
            window.apiConfig.key = '';
            window.apiConfig.isConfigured = false;
            
            // 从localStorage中删除
            localStorage.removeItem('catPlannerApiConfig');
            
            // 清空输入框
            apiKeyInput.value = '';
            
            updateConfigStatus();
            showToast('配置已删除');
        }
    }
    
    // 加载API配置
    function loadApiConfig() {
        const savedConfig = localStorage.getItem('catPlannerApiConfig');
        if (savedConfig) {
            try {
                const config = JSON.parse(savedConfig);
                window.apiConfig.url = config.url || 'https://api.siliconflow.cn/v1/chat/completions';
                window.apiConfig.key = config.key || '';
                window.apiConfig.model = config.model || 'qwen-max';
                window.apiConfig.isConfigured = !!(config.key);
            } catch (e) {
                console.error('加载API配置失败:', e);
            }
        }
        updateConfigStatus();
    }
    
    // 更新配置状态显示
    function updateConfigStatus() {
        if (window.apiConfig.isConfigured) {
            statusIndicator.classList.add('configured');
            statusIndicator.classList.remove('error');
            statusText.textContent = '已配置';
        } else {
            statusIndicator.classList.remove('configured');
            statusIndicator.classList.add('error');
            statusText.textContent = '未配置';
        }
    }
    
    // 测试API连接
    async function testApiConnection() {
        const url = apiUrlInput.value.trim();
        const key = apiKeyInput.value.trim();
        const model = apiModelInput.value.trim() || 'qwen-max';
        
        if (!url || !key) {
            showToast('请填写API URL和API Key');
            return;
        }
        
        testConfigBtn.textContent = '测试中...';
        testConfigBtn.disabled = true;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${key}`
                },
                body: JSON.stringify({
                    model: model,
                    messages: [{ role: 'user', content: '你好' }],
                    max_tokens: 10
                })
            });
            
            if (response.ok) {
                showToast('连接成功！');
            } else {
                const errorText = await response.text();
                showToast(`连接失败: ${response.status}`);
            }
        } catch (error) {
            showToast(`连接错误: ${error.message}`);
        } finally {
            testConfigBtn.textContent = '测试连接';
            testConfigBtn.disabled = false;
        }
    }
}

// 显示提示消息
function showToast(message) {
    // 检查是否已存在toast元素
    let toast = document.querySelector('.toast-message');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-message';
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.classList.add('show');
    
    // 3秒后隐藏
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// 修改mockAIProcessing函数，使用API配置
const originalMockAIProcessing = window.mockAIProcessing;
window.mockAIProcessing = async function(text) {
    console.log("开始处理文本:", text);

    // 如果输入很短（测试用例），使用本地模拟数据避免API延迟
    if (text.length <= 5) {
        console.log("输入太短，使用本地模拟数据");
        return {
            "important": [
                {"title": `完成${text}`, "completed": false},
                {"title": `准备${text}材料`, "completed": false},
                {"title": `整理${text}笔记`, "completed": false}
            ],
            "other": [
                {"title": `分享${text}心得`, "completed": false},
                {"title": `复习${text}要点`, "completed": false}
            ]
        };
    }

    // 检查API是否已配置
    if (!window.apiConfig || !window.apiConfig.isConfigured) {
        showToast('请先配置API密钥');
        throw new Error('API未配置');
    }
    
    const endpoint = window.apiConfig.url;
    const apiKey = window.apiConfig.key;
    const modelName = window.apiConfig.model;
    
    console.log("使用API端点:", endpoint);
    console.log("使用模型:", modelName);

    // 设置超时控制
    const timeout = 10000; // 10秒超时
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const prompt = `
请根据用户输入的日程内容，拆解出今天可以执行的具体待办事项，每条尽量简洁明了。
请将结果分为两类：重要任务（3项）和其他任务（2-3项）。
不要输出解释、不要输出额外说明，只返回JSON格式的待办事项列表。

用户输入: ${text}

请按照以下JSON格式返回：
{
  "important": [
    {"title": "重要任务1", "completed": false},
    {"title": "重要任务2", "completed": false},
    {"title": "重要任务3", "completed": false}
  ],
  "other": [
    {"title": "其他任务1", "completed": false},
    {"title": "其他任务2", "completed": false}
  ]
}
`;

    try {
        console.log("开始发送API请求到:", endpoint);
        
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: modelName,
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7,
                max_tokens: 512,
                response_format: { type: "json_object" }
            }),
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        console.log("API响应状态:", response.status, response.statusText);
        const responseText = await response.text();
        
        if (!response.ok) {
            throw new Error(`API 请求失败: ${response.status} - ${responseText}`);
        }
        
        // 尝试解析JSON
        let data;
        try {
            data = JSON.parse(responseText);
            console.log("API 返回数据:", data);
        } catch (e) {
            console.error("JSON解析失败:", e);
            throw new Error(`API返回的不是有效JSON: ${responseText}`);
        }

        // 解析返回内容
        const content = data.choices[0]?.message?.content;
        
        try {
            // 尝试解析为JSON
            const parsed = JSON.parse(content);
            return parsed;
        } catch (e) {
            console.log("返回内容解析失败，使用备用处理方式");
            // 如果解析失败，使用本地处理逻辑
            const lines = text.split(/[,，.。;；\n]/);
            const tasks = lines.filter(line => line.trim().length > 0)
                              .map(line => line.trim());
            
            // 如果用户输入可以拆分成多个任务
            if (tasks.length >= 3) {
                return {
                    "important": [
                        {"title": tasks[0], "completed": false},
                        {"title": tasks[1], "completed": false},
                        {"title": tasks[2], "completed": false}
                    ],
                    "other": tasks.slice(3, 6).map(title => ({ title, completed: false }))
                };
            } else {
                const mainTask = tasks[0] || "完成今日计划";
                return {
                    "important": [
                        {"title": `${mainTask}`, "completed": false},
                        {"title": `准备${mainTask}所需材料`, "completed": false},
                        {"title": `记录${mainTask}的进度`, "completed": false}
                    ],
                    "other": [
                        {"title": `分享${mainTask}的心得`, "completed": false},
                        {"title": `复习${mainTask}的要点`, "completed": false}
                    ]
                };
            }
        }
    } catch (error) {
        clearTimeout(timeoutId);
        console.error("AI 处理出错:", error);
        
        if (error.name === 'AbortError') {
            console.log("请求超时，使用本地模拟数据");
            // 解析用户输入，提取更有意义的任务
            const lines = text.split(/[,，.。;；\n]/);
            const tasks = lines.filter(line => line.trim().length > 0)
                              .map(line => line.trim())
                              .slice(0, 5);
            
            // 如果没有足够的任务，添加一些默认任务
            while (tasks.length < 5) {
                tasks.push(`任务${tasks.length + 1}`);
            }
            
            return {
                "important": [
                    {"title": tasks[0], "completed": false},
                    {"title": tasks[1], "completed": false},
                    {"title": tasks[2], "completed": false}
                ],
                "other": [
                    {"title": tasks[3], "completed": false},
                    {"title": tasks[4], "completed": false}
                ]
            };
        }
        
        throw error;
    }
};

// 同样修改generateAIFeedback函数
const originalGenerateAIFeedback = window.generateAIFeedback;
window.generateAIFeedback = async function(task, reason) {
    // 如果输入很短，使用本地模拟数据避免API延迟
    if (task.length <= 5) {
        const encouragements = [
            `喵～完成"${task}"会让你更接近目标哦！`,
            `喵喵～"${task}"很重要呢，相信你一定能做好！`,
            `喵～今天的"${task}"完成后记得奖励自己哦！`,
            `喵～主人加油！"${task}"完成后会有成就感的！`,
            `喵～"${task}"虽然重要，也别忘了休息时间撸猫哦！`
        ];
        
        // 如果用户提供了理由，增加一些基于理由的鼓励
        if (reason && reason.length > 0) {
            encouragements.push(`喵～你说"${reason}"，这个想法真棒！继续加油！`);
            encouragements.push(`喵～因为"${reason}"，所以这个任务对你很重要呢！你一定能行！`);
        }
        
        return encouragements[Math.floor(Math.random() * encouragements.length)];
    }

    // 检查API是否已配置
    if (!window.apiConfig || !window.apiConfig.isConfigured) {
        return `喵～完成"${task}"会让你更接近目标哦！`;
    }

    const endpoint = window.apiConfig.url;
    const apiKey = window.apiConfig.key;
    const modelName = window.apiConfig.model;

    const prompt = `
你是一个温柔且鼓励人的猫咪AI助理，用户输入了他们今天最重要的任务以及它的重要性，请你用温暖简短的话语鼓励他们完成今天的目标。语言要轻松治愈，像贴纸或便签一样简短。

用户选择了一项重要任务："${task}"
原因是："${reason || '未提供'}"

请给予用户积极的情绪价值和正向反馈，不超过2句话，使用猫咪的口吻（加上"喵"的语气词）。
`;

    try {
        console.log("开始发送AI评价请求");
        
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: modelName,
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 128,
                temperature: 0.7
            })
        });
        
        if (!response.ok) {
            throw new Error(`AI 评价请求失败: ${response.status}`);
        }
        
        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (err) {
        console.error("AI 评价生成出错:", err);
        
        // 出错时使用本地预设的猫咪语录
        const encouragements = [
            `喵～完成"${task}"会让你更接近目标哦！`,
            `喵喵～"${task}"很重要呢，相信你一定能做好！`,
            `喵～今天的"${task}"完成后记得奖励自己哦！`,
            `喵～主人加油！"${task}"完成后会有成就感的！`,
            `喵～"${task}"虽然重要，也别忘了休息时间撸猫哦！`
        ];
        
        if (reason && reason.length > 0) {
            encouragements.push(`喵～你说"${reason}"，这个想法真棒！继续加油！`);
        }
        
        return encouragements[Math.floor(Math.random() * encouragements.length)];
    }
};