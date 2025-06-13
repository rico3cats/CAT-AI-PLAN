// API配置管理模块

// API配置状态
const apiConfig = {
    url: 'https://api.siliconflow.cn/v1/chat/completions',
    key: '',
    isConfigured: false
};

// DOM元素
let configBtn;
let apiConfigModal;
let apiUrlInput;
let apiKeyInput;
let configStatus;
let statusIndicator;
let statusText;
let saveConfigBtn;
let deleteConfigBtn;
let testConfigBtn;
let closeConfigBtn;

// 初始化API配置界面
function initApiConfig() {
    // 获取DOM元素
    configBtn = document.getElementById('config-btn');
    apiConfigModal = document.getElementById('api-config-modal');
    apiUrlInput = document.getElementById('api-url');
    apiKeyInput = document.getElementById('api-key');
    configStatus = document.getElementById('config-status');
    statusIndicator = configStatus.querySelector('.status-indicator');
    statusText = configStatus.querySelector('.status-text');
    saveConfigBtn = document.getElementById('save-config-btn');
    deleteConfigBtn = document.getElementById('delete-config-btn');
    testConfigBtn = document.getElementById('test-config-btn');
    closeConfigBtn = apiConfigModal.querySelector('.close-btn');
    
    // 加载保存的配置
    loadApiConfig();
    
    // 绑定事件
    configBtn.addEventListener('click', openConfigModal);
    closeConfigBtn.addEventListener('click', closeConfigModal);
    saveConfigBtn.addEventListener('click', saveApiConfig);
    deleteConfigBtn.addEventListener('click', deleteApiConfig);
    testConfigBtn.addEventListener('click', testApiConnection);
    
    // 点击模态框外部关闭
    window.addEventListener('click', (event) => {
        if (event.target === apiConfigModal) {
            closeConfigModal();
        }
    });
}

// 打开配置模态框
function openConfigModal() {
    apiUrlInput.value = apiConfig.url;
    apiKeyInput.value = apiConfig.key;
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
    if (!url || !key) {
        showToast('请填写API URL和API Key');
        return;
    }
    apiConfig.url = url;
    apiConfig.key = key;
    apiConfig.isConfigured = true;
    localStorage.setItem('catPlannerApiConfig', JSON.stringify({url, key, isConfigured:true}));
    updateConfigStatus();
    showToast('配置已保存');
}

// 删除API配置
function deleteApiConfig() {
    if (confirm('确定要删除API配置吗？')) {
        apiConfig.key = '';
        apiConfig.isConfigured = false;
        
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
            apiConfig.url = config.url || 'https://api.siliconflow.cn/v1/chat/completions';
            apiConfig.key = config.key || '';
            apiConfig.isConfigured = !!(config.key);
        } catch (e) {
            console.error('加载API配置失败:', e);
        }
    }
    updateConfigStatus();
}

// 更新配置状态显示
function updateConfigStatus() {
    if (apiConfig.isConfigured) {
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
                model: 'Qwen/Qwen3-14B',
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

// 获取API配置
function getApiConfig() {
    return {
        url: apiConfig.url,
        key: apiConfig.key,
        model: 'Qwen/Qwen3-14B', // 固定模型名
        isConfigured: apiConfig.isConfigured
    };
}

// 导出函数
window.initApiConfig = initApiConfig;
window.getApiConfig = getApiConfig;
window.showToast = showToast;