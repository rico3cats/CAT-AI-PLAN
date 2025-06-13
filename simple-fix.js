// 简单修复脚本 - 直接在页面加载后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log("简单修复脚本已加载");
    
    // 1. 修复"开始记录"按钮
    const startBtn = document.getElementById('start-btn');
    const homePage = document.getElementById('home-page');
    const inputPage = document.getElementById('input-page');
    
    if (startBtn) {
        console.log("找到开始记录按钮，添加事件监听器");
        startBtn.onclick = function() {
            console.log("开始记录按钮被点击");
            homePage.style.display = 'none';
            inputPage.style.display = 'flex';
        };
    }
    
    // 2. 修复API配置按钮
    const configBtn = document.getElementById('config-btn');
    const apiConfigModal = document.getElementById('api-config-modal');
    
    if (configBtn && apiConfigModal) {
        console.log("找到API配置按钮，添加事件监听器");
        configBtn.onclick = function() {
            console.log("API配置按钮被点击");
            apiConfigModal.style.display = 'flex';
        };
        
        // 关闭按钮
        const closeBtn = apiConfigModal.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.onclick = function() {
                apiConfigModal.style.display = 'none';
            };
        }
        
        // 点击模态框外部关闭
        window.onclick = function(event) {
            if (event.target === apiConfigModal) {
                apiConfigModal.style.display = 'none';
            }
        };
        
        // 保存配置按钮
        const saveConfigBtn = document.getElementById('save-config-btn');
        if (saveConfigBtn) {
            saveConfigBtn.onclick = function() {
                const apiUrl = document.getElementById('api-url').value.trim();
                const apiKey = document.getElementById('api-key').value.trim();
                const apiModel = document.getElementById('api-model').value.trim() || 'qwen-max';
                
                if (!apiUrl || !apiKey) {
                    alert('请填写API URL和API Key');
                    return;
                }
                
                // 保存到localStorage
                const apiConfig = {
                    url: apiUrl,
                    key: apiKey,
                    model: apiModel,
                    isConfigured: true
                };
                localStorage.setItem('catPlannerApiConfig', JSON.stringify(apiConfig));
                
                // 更新状态显示
                const statusIndicator = document.querySelector('.status-indicator');
                const statusText = document.querySelector('.status-text');
                if (statusIndicator && statusText) {
                    statusIndicator.classList.add('configured');
                    statusIndicator.classList.remove('error');
                    statusText.textContent = '已配置';
                }
                
                alert('配置已保存');
            };
        }
        
        // 删除配置按钮
        const deleteConfigBtn = document.getElementById('delete-config-btn');
        if (deleteConfigBtn) {
            deleteConfigBtn.onclick = function() {
                if (confirm('确定要删除API配置吗？')) {
                    localStorage.removeItem('catPlannerApiConfig');
                    
                    // 清空输入框
                    document.getElementById('api-key').value = '';
                    
                    // 更新状态显示
                    const statusIndicator = document.querySelector('.status-indicator');
                    const statusText = document.querySelector('.status-text');
                    if (statusIndicator && statusText) {
                        statusIndicator.classList.remove('configured');
                        statusIndicator.classList.add('error');
                        statusText.textContent = '未配置';
                    }
                    
                    alert('配置已删除');
                }
            };
        }
        
        // 测试连接按钮
        const testConfigBtn = document.getElementById('test-config-btn');
        if (testConfigBtn) {
            testConfigBtn.onclick = function() {
                const apiUrl = document.getElementById('api-url').value.trim();
                const apiKey = document.getElementById('api-key').value.trim();
                
                if (!apiUrl || !apiKey) {
                    alert('请填写API URL和API Key');
                    return;
                }
                
                testConfigBtn.textContent = '测试中...';
                testConfigBtn.disabled = true;
                
                // 简单测试连接
                const apiModel = document.getElementById('api-model').value || 'Qwen/Qwen1.5-32B-Chat';
                console.log("测试连接使用模型:", apiModel);
                
                fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: apiModel,
                        messages: [{ role: 'user', content: '你好' }],
                        temperature: 0.7,
                        max_tokens: 10
                    })
                })
                .then(async response => {
                    console.log("API响应状态:", response.status);
                    const responseText = await response.text();
                    console.log("API响应内容:", responseText);
                    
                    if (response.ok) {
                        alert('连接成功！');
                    } else {
                        alert(`连接失败: ${response.status} - ${responseText.substring(0, 100)}`);
                    }
                    // 不返回任何内容，防止继续处理
                })
                .then(response => {
                    if (response.ok) {
                        alert('连接成功！');
                    } else {
                        alert(`连接失败: ${response.status}`);
                    }
                })
                .catch(error => {
                    alert(`连接错误: ${error.message}`);
                })
                .finally(() => {
                    testConfigBtn.textContent = '测试连接';
                    testConfigBtn.disabled = false;
                });
            };
        }
        
        // 加载保存的配置
        const savedConfig = localStorage.getItem('catPlannerApiConfig');
        if (savedConfig) {
            try {
                const config = JSON.parse(savedConfig);
                document.getElementById('api-url').value = config.url || 'https://api.siliconflow.cn/v1/chat/completions';
                document.getElementById('api-key').value = config.key || '';
                document.getElementById('api-model').value = config.model || 'qwen-max';
                
                // 更新状态显示
                if (config.key) {
                    const statusIndicator = document.querySelector('.status-indicator');
                    const statusText = document.querySelector('.status-text');
                    if (statusIndicator && statusText) {
                        statusIndicator.classList.add('configured');
                        statusIndicator.classList.remove('error');
                        statusText.textContent = '已配置';
                    }
                }
            } catch (e) {
                console.error('加载API配置失败:', e);
            }
        } else {
            // 设置默认URL
            document.getElementById('api-url').value = 'https://api.siliconflow.cn/v1/chat/completions';
            document.getElementById('api-model').value = 'qwen-max';
        }
    }
});