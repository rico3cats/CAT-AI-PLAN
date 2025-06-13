// 修复API测试连接问题
document.addEventListener('DOMContentLoaded', function() {
    console.log("API测试修复脚本已加载");
    
    // 获取测试按钮
    const testConfigBtn = document.getElementById('test-config-btn');
    
    if (testConfigBtn) {
        console.log("找到测试按钮，替换点击事件");
        
        // 替换原有的点击事件
        testConfigBtn.onclick = function() {
            console.log("测试按钮被点击");
            const apiUrl = document.getElementById('api-url').value.trim();
            const apiKey = document.getElementById('api-key').value.trim();
            const apiModel = document.getElementById('api-model').value.trim() || 'Qwen/Qwen3-30B-A3B';
            
            if (!apiUrl || !apiKey) {
                alert('请填写API URL和API Key');
                return;
            }
            
            testConfigBtn.textContent = '测试中...';
            testConfigBtn.disabled = true;
            
            console.log("开始测试连接，使用模型:", apiModel);
            
            // 使用Promise和setTimeout确保只显示一个提示
            new Promise((resolve, reject) => {
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
                    
                    if (response.ok) {
                        resolve("连接成功！");
                    } else {
                        const responseText = await response.text();
                        console.log("API错误响应:", responseText);
                        reject(`连接失败: ${response.status} - ${responseText.substring(0, 100)}`);
                    }
                })
                .catch(error => {
                    console.error("API连接错误:", error);
                    reject(`连接错误: ${error.message}`);
                });
            })
            .then(message => {
                // 成功情况
                alert(message);
                
                // 更新状态指示器
                const statusIndicator = document.querySelector('.status-indicator');
                const statusText = document.querySelector('.status-text');
                if (statusIndicator && statusText) {
                    statusIndicator.classList.add('configured');
                    statusIndicator.classList.remove('error');
                    statusText.textContent = '已配置';
                }
            })
            .catch(errorMessage => {
                // 失败情况
                alert(errorMessage);
            })
            .finally(() => {
                testConfigBtn.textContent = '测试连接';
                testConfigBtn.disabled = false;
            });
        };
    }
});