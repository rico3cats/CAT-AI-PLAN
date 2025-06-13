// DOM Elements - 页面
const homePage = document.getElementById('home-page');
const inputPage = document.getElementById('input-page');
const taskSelectionPage = document.getElementById('task-selection-page');
const importantTaskPage = document.getElementById('important-task-page');
const cardResultPage = document.getElementById('card-result-page');
const collectionPage = document.getElementById('collection-page');
const cardDetailModal = document.getElementById('card-detail-modal');

// DOM Elements - 首页
const startBtn = document.getElementById('start-btn');
const collectionBtn = document.getElementById('collection-btn');

// DOM Elements - 输入页
const taskInput = document.getElementById('task-input');
const voiceBtn = document.getElementById('voice-btn');
const recordingStatus = document.getElementById('recording-status');
const processBtn = document.getElementById('process-btn');
const backToHomeBtn = document.getElementById('back-to-home-btn');

// DOM Elements - 任务选择页
const taskCardsContainer = document.getElementById('task-cards');
const aiSelectBtn = document.getElementById('ai-select-btn');
const confirmSelectionBtn = document.getElementById('confirm-selection-btn');
const backToInputBtn = document.getElementById('back-to-input-btn');

// DOM Elements - 重要任务页
const selectedTasksContainer = document.getElementById('selected-tasks');
const reasonInput = document.getElementById('reason-input');
const completeBtn = document.getElementById('complete-btn');
const backToSelectionBtn = document.getElementById('back-to-selection-btn');

// DOM Elements - 卡片结果页
const currentDateElement = document.getElementById('current-date');
const cardTaskList = document.getElementById('card-task-list');
const catQuote = document.getElementById('cat-quote');
const viewCollectionBtn = document.getElementById('view-collection-btn');
const exportBtn = document.getElementById('export-btn');
const restartBtn = document.getElementById('restart-btn');

// DOM Elements - 卡片集页面
const cardCollection = document.getElementById('card-collection');
const clearAllBtn = document.getElementById('clear-all-btn');
const newCardBtn = document.getElementById('new-card-btn');

// DOM Elements - 卡片详情弹窗
const detailDate = document.getElementById('detail-date');
const detailTaskList = document.getElementById('detail-task-list');
const detailQuote = document.getElementById('detail-quote');
const detailExportBtn = document.getElementById('detail-export-btn');
const detailDeleteBtn = document.getElementById('detail-delete-btn');
const confettiContainer = document.getElementById('confetti-container');

// 猫咪语录
const catPhrases = [
    '喵～今天也要加油喔！',
    '喵喵～完成任务就有小鱼干！',
    '喵～主人今天也很努力呢！',
    '喵～别忘了休息时间撸猫哦！',
    '喵～相信你能完成所有任务！',
    '喵～今天也是元气满满的一天！',
    '喵～做得好就奖励自己吧！',
    '喵～记得喝水休息哦！',
    '喵～你是最棒的铲屎官！',
    '喵～一步一步来，不要着急！'
];

// 猫咪插画图片数组（修正为真正的数组）
const catImages = [
    'cat/cat-image1.jpg',
    'cat/cat-image2.jpg',
    'cat/cat-image3.jpg',
    'cat/cat-image4.jpg',
    'cat/cat-image5.jpg',
    'cat/cat-image6.jpg',
    'cat/cat-image7.jpg',
    'cat/cat-image8.jpg',
    'cat/cat-image9.jpg',
    'cat/cat-image10.jpg',
    'cat/cat-image11.jpg',
    'cat/cat-image12.jpg'
];

// 应用状态
let appState = {
    tasks: [],               // 存放 AI 返回的所有任务
    selectedTasks: [],       // 用户从"任务选择页"里点选的那几项
    mostImportantTask: null, // 用户在"重要任务页"里标记的最重要那项
    reason: '',              // 用户输入的重要性理由
    isRecording: false,      // 语音识别状态
    currentCardIndex: -1,    // 当前查看的卡片索引（用于详情弹窗里更新状态）
    currentCatImage: '',     // 本次卡片随机选中的猫咪图片
    aiSelectedIndices: null, // 记录AI已选择的任务索引
    existingText: '',        // 存储语音输入前的已有文本
    currentTranscript: ''    // 当前语音识别临时结果
};

// 初始化应用
function initApp() {
    // 重新获取所有DOM元素，确保页面加载后再获取
    const homePage = document.getElementById('home-page');
    const inputPage = document.getElementById('input-page');
    const taskSelectionPage = document.getElementById('task-selection-page');
    const importantTaskPage = document.getElementById('important-task-page');
    const cardResultPage = document.getElementById('card-result-page');
    const collectionPage = document.getElementById('collection-page');
    const cardDetailModal = document.getElementById('card-detail-modal');
    const startBtn = document.getElementById('start-btn');
    const collectionBtn = document.getElementById('collection-btn');
    const taskInput = document.getElementById('task-input');
    const voiceBtn = document.getElementById('voice-btn');
    const recordingStatus = document.getElementById('recording-status');
    const processBtn = document.getElementById('process-btn');
    const backToHomeBtn = document.getElementById('back-to-home-btn');
    const taskCardsContainer = document.getElementById('task-cards');
    const aiSelectBtn = document.getElementById('ai-select-btn');
    const confirmSelectionBtn = document.getElementById('confirm-selection-btn');
    const backToInputBtn = document.getElementById('back-to-input-btn');
    const selectedTasksContainer = document.getElementById('selected-tasks');
    const reasonInput = document.getElementById('reason-input');
    const completeBtn = document.getElementById('complete-btn');
    const backToSelectionBtn = document.getElementById('back-to-selection-btn');
    const currentDateElement = document.getElementById('current-date');
    const cardTaskList = document.getElementById('card-task-list');
    const catQuote = document.getElementById('cat-quote');
    const viewCollectionBtn = document.getElementById('view-collection-btn');
    const exportBtn = document.getElementById('export-btn');
    const restartBtn = document.getElementById('restart-btn');
    const cardCollection = document.getElementById('card-collection');
    const clearAllBtn = document.getElementById('clear-all-btn');
    const newCardBtn = document.getElementById('new-card-btn');
    const detailDate = document.getElementById('detail-date');
    const detailTaskList = document.getElementById('detail-task-list');
    const detailQuote = document.getElementById('detail-quote');
    const detailExportBtn = document.getElementById('detail-export-btn');
    const detailDeleteBtn = document.getElementById('detail-delete-btn');
    const confettiContainer = document.getElementById('confetti-container');

    // 初始化API配置（如果api-config.js已加载）
    if (typeof window.initApiConfig === 'function') {
        window.initApiConfig();
    }
    // 1. 首页按钮：开始 / 查看集合
    startBtn.addEventListener('click', () => {
        homePage.style.display = 'none';
        inputPage.style.display = 'flex';
    });
    collectionBtn.addEventListener('click', () => {
        homePage.style.display = 'none';
        loadCardCollection();
        document.body.classList.add('collection-view');
        collectionPage.style.display = 'flex';
    });

    // 2. 输入页：返回首页、启用语音识别、点击"处理"
    backToHomeBtn.addEventListener('click', () => {
        inputPage.style.display = 'none';
        homePage.style.display = 'flex';
    });
    setupSpeechRecognition();

    processBtn.addEventListener('click', async () => {
        const text = taskInput.value.trim();
        if (!text) {
            alert('请输入或说出你的计划内容');
            return;
        }
        
        if (text.length <= 2) {
            alert('输入内容太短啦，请具体描述一下你的今日计划～');
            return;
        }

        // 重置AI选择
        appState.aiSelectedIndices = null;

        // 显示加载状态
        processBtn.disabled = true;
        processBtn.textContent = '处理中...';

        try {
            const result = await mockAIProcessing(text);
            // 把 AI 返回的 JSON——{ important: [...], other: [...] } 转成 appState.tasks（一个数组）
            appState.tasks = [
                ...result.important.map(item => ({ text: item.title, completed: false, isImportant: true })),
                ...result.other.map(item => ({ text: item.title, completed: false, isImportant: false }))
            ];

            // 渲染"任务选择页"
            renderTaskCards();
            inputPage.style.display = 'none';
            taskSelectionPage.style.display = 'flex';
        } catch (err) {
            console.error(err);
            alert('AI 处理失败，请稍后再试');
        } finally {
            processBtn.disabled = false;
            processBtn.textContent = '开始处理';
        }
    });

    // 3. 任务选择页：AI 随机选 / 用户手动选 / 确定
    aiSelectBtn.addEventListener('click', () => {
        // 如果还没有AI选择过，才进行随机选择
        if (!appState.aiSelectedIndices) {
            const total = appState.tasks.length;
            const toPick = Math.min(total, 3);
            appState.aiSelectedIndices = new Set();
            
            // 随机选择任务索引
            while (appState.aiSelectedIndices.size < toPick) {
                appState.aiSelectedIndices.add(Math.floor(Math.random() * total));
            }
        }

        // 应用选择
        document.querySelectorAll('.task-card').forEach((card, idx) => {
            if (appState.aiSelectedIndices.has(idx)) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        });
    });
    confirmSelectionBtn.addEventListener('click', () => {
        // 收集被勾选的任务
        appState.selectedTasks = [];
        document.querySelectorAll('.task-card.selected').forEach(card => {
            const idx = parseInt(card.dataset.index);
            appState.selectedTasks.push(appState.tasks[idx]);
        });
        if (appState.selectedTasks.length === 0) {
            alert('请至少选择一个任务');
            return;
        }
        if (appState.selectedTasks.length > 3) {
            alert('最多只能选择3个任务');
            return;
        }

        renderSelectedTasks();
        taskSelectionPage.style.display = 'none';
        importantTaskPage.style.display = 'flex';
    });
    backToInputBtn.addEventListener('click', () => {
        taskSelectionPage.style.display = 'none';
        inputPage.style.display = 'flex';
    });

    // 4. 重要任务页：用户点哪项就设为 mostImportant
    completeBtn.addEventListener('click', async () => {
        appState.reason = reasonInput.value.trim();
        if (!appState.mostImportantTask && appState.selectedTasks.length > 0) {
            appState.mostImportantTask = appState.selectedTasks[0];
        }
        appState.currentCatImage = getRandomCatImage();

        completeBtn.disabled = true;
        completeBtn.textContent = '生成中...';

        try {
            await renderResultCard();
            importantTaskPage.style.display = 'none';
            cardResultPage.style.display = 'flex';
        } catch (e) {
            console.error(e);
            alert('生成卡片失败，请稍后再试');
        } finally {
            completeBtn.disabled = false;
            completeBtn.textContent = '完成';
        }
    });
    backToSelectionBtn.addEventListener('click', () => {
        importantTaskPage.style.display = 'none';
        taskSelectionPage.style.display = 'flex';
    });

    // 5. 结果页：查看集合 / 导出 / 重新来一张
    viewCollectionBtn.addEventListener('click', () => {
        loadCardCollection();
        cardResultPage.style.display = 'none';
        document.body.classList.add('collection-view');
        collectionPage.style.display = 'flex';
    });
    exportBtn.addEventListener('click', () => {
        exportCardAsImage(cardResultPage.querySelector('.cat-card'));
    });
    restartBtn.addEventListener('click', () => {
        resetAppState();
        cardResultPage.style.display = 'none';
        document.body.classList.remove('collection-view');
        inputPage.style.display = 'flex';
    });

    // 6. 卡片集页：清空所有 / 新建
    clearAllBtn.addEventListener('click', () => {
        if (confirm('确定要清除所有卡片吗？')) {
            localStorage.removeItem('catPlannerCards');
            loadCardCollection();
        }
    });
    newCardBtn.addEventListener('click', () => {
        resetAppState();
        collectionPage.style.display = 'none';
        document.body.classList.remove('collection-view');
        homePage.style.display = 'flex';
    });

    // 7. 详情弹窗：关闭 / 导出 / 删除
    const detailCloseBtn = cardDetailModal.querySelector('.close-btn');
    detailCloseBtn.addEventListener('click', () => {
        cardDetailModal.style.display = 'none';
    });
    detailExportBtn.addEventListener('click', () => {
        exportCardAsImage(cardDetailModal.querySelector('.detail-card'));
    });
    detailDeleteBtn.addEventListener('click', () => {
        if (confirm('确定要删除这张卡片吗？')) {
            deleteCard(appState.currentCardIndex);
            cardDetailModal.style.display = 'none';
        }
    });
    window.addEventListener('click', event => {
        if (event.target === cardDetailModal) {
            cardDetailModal.style.display = 'none';
        }
    });
}

// ————————————————
// 语音识别相关（没问题，只要 getElementById 写对了，就能跑）
function setupSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'zh-CN';

        recognition.onstart = () => {
            appState.isRecording = true;
            recordingStatus.textContent = '正在录音...请说出你的计划';
            voiceBtn.classList.add('recording');
        };
        recognition.onend = () => {
            appState.isRecording = false;
            recordingStatus.textContent = '录音已结束';
            voiceBtn.classList.remove('recording');
        };
        recognition.onresult = event => {
            const transcript = Array.from(event.results)
                                  .map(res => res[0].transcript)
                                  .join('');
            // 保存当前的临时语音结果
            appState.currentTranscript = transcript;
            // 展示临时结果
            taskInput.value = appState.existingText + transcript;
        };
        recognition.onerror = event => {
            appState.isRecording = false;
            recordingStatus.textContent = `录音错误: ${event.error}`;
            voiceBtn.classList.remove('recording');
        };
        
        // 在录音结束时将临时结果添加到现有文本中
        recognition.onend = () => {
            appState.isRecording = false;
            recordingStatus.textContent = '录音已结束';
            voiceBtn.classList.remove('recording');
            
            // 将新录制的内容添加到现有内容后，并在必要时添加一个空格
            if (appState.existingText && appState.currentTranscript) {
                const needsSpace = !appState.existingText.endsWith(' ') && 
                                   !appState.currentTranscript.startsWith(' ');
                const separator = needsSpace ? ' ' : '';
                taskInput.value = appState.existingText + separator + appState.currentTranscript;
            }
            
            // 重置状态
            appState.existingText = taskInput.value;
            appState.currentTranscript = '';
        };

        voiceBtn.addEventListener('click', () => {
            if (appState.isRecording) {
                recognition.stop();
            } else {
                // 保存现有文本，稍后会与新识别的文本合并
                appState.existingText = taskInput.value || '';
                recognition.start();
            }
        });
    } else {
        voiceBtn.disabled = true;
        recordingStatus.textContent = '你的浏览器不支持语音识别功能';
    }
}

// ————————————————
// 真正调用 Qwen API 的函数，使用最新的 API 格式
async function mockAIProcessing(text) {
    // 每次调用都强制刷新API配置，确保拿到最新配置
    if (window.loadApiConfig) window.loadApiConfig();
    const apiConfig = window.getApiConfig ? window.getApiConfig() : {
        url: 'https://api.siliconflow.cn/v1/chat/completions',
        key: '',
        model: 'qwen-max',
        isConfigured: false
    };
    
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

    const endpoint = apiConfig.url;
    const apiKey = apiConfig.key;
    const modelName = apiConfig.model;
    
    console.log("使用API端点:", endpoint);
    // 不要在日志中显示完整的API密钥
    console.log("API密钥前缀:", apiKey.substring(0, 10) + "...");
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
        console.log("请求体:", JSON.stringify({
            model: modelName,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 512,
            response_format: { type: "json_object" }
        }, null, 2));
        
        // 确保使用正确的模型名称
        console.log("使用模型:", modelName);
        
        // 添加CORS代理，解决跨域问题
        const useProxy = false; // 默认不使用代理，避免额外问题
        const apiEndpoint = useProxy ? `https://cors-anywhere.herokuapp.com/${endpoint}` : endpoint;
        console.log("实际请求地址:", apiEndpoint);
        
        const response = await fetch(apiEndpoint, {
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
        console.log("API原始响应:", responseText);
        
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
}

// ————————————————
// 渲染"任务选择页"里每条 task-card
function renderTaskCards() {
    taskCardsContainer.innerHTML = '';
    appState.tasks.forEach((task, idx) => {
        const card = document.createElement('div');
        card.className = 'task-card';
        card.dataset.index = idx;
        card.textContent = task.text;
        card.addEventListener('click', () => {
            card.classList.toggle('selected');
            const cnt = document.querySelectorAll('.task-card.selected').length;
            if (cnt > 3) {
                card.classList.remove('selected');
                alert('最多只能选择3个任务');
            }
        });
        taskCardsContainer.appendChild(card);
    });
}

// 渲染"重要任务页"里用户已选的几项
function renderSelectedTasks() {
    selectedTasksContainer.innerHTML = '';
    appState.selectedTasks.forEach((task, idx) => {
        const el = document.createElement('div');
        el.className = 'selected-task';
        el.textContent = task.text;
        el.dataset.index = idx;
        el.addEventListener('click', () => {
            document.querySelectorAll('.selected-task').forEach(div => {
                div.classList.remove('most-important');
            });
            el.classList.add('most-important');
            appState.mostImportantTask = task;
        });
        selectedTasksContainer.appendChild(el);
    });
    // 默认第一项就是"最重要"
    if (appState.selectedTasks.length > 0) {
        const first = selectedTasksContainer.querySelector('.selected-task');
        first.classList.add('most-important');
        appState.mostImportantTask = appState.selectedTasks[0];
    }
}

// ————————————————
// 渲染结果页：把选好的几条写到卡片上，并生成猫咪语录
async function renderResultCard() {
    // 日期
    const today = new Date();
    currentDateElement.textContent = today.toISOString().split('T')[0];

    // 猫咪图片
    const catImg = cardResultPage.querySelector('.cat-image');
    catImg.src = appState.currentCatImage;

    // 清空并插入任务
    cardTaskList.innerHTML = '';
    appState.selectedTasks.forEach(task => {
        addTaskToCard(task, task === appState.mostImportantTask);
    });

    // AI 评价（猫咪鼓励）
    try {
        if (appState.mostImportantTask) {
            const feedback = await generateAIFeedback(
                appState.mostImportantTask.text,
                appState.reason
            );
            catQuote.textContent = feedback;
        } else {
            catQuote.textContent = getRandomCatPhrase();
        }
    } catch (err) {
        console.error('AI 评价 失败:', err);
        catQuote.textContent = getRandomCatPhrase();
    }

    // 保存到本地
    saveCardToStorage();
}

// 把一条任务插到"结果页卡片"上，并做完成勾选逻辑
function addTaskToCard(task, isImportant = false) {
    const div = document.createElement('div');
    div.className = 'task-item';
    if (isImportant) div.classList.add('important');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        div.classList.toggle('completed', task.completed);
        if (task.completed) createConfetti(checkbox);
    });

    const text = document.createElement('div');
    text.className = 'task-text';
    text.textContent = task.text;

    div.appendChild(checkbox);
    div.appendChild(text);
    cardTaskList.appendChild(div);
}

// ————————————————
// AI 生成猫咪鼓励
async function generateAIFeedback(task, reason) {
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

    // 获取API配置
    const apiConfig = window.getApiConfig ? window.getApiConfig() : {
        url: 'https://api.siliconflow.cn/v1/chat/completions',
        key: '',
        model: 'qwen-max',
        isConfigured: false
    };
    
    // 检查API是否已配置
    if (!apiConfig.isConfigured) {
        console.log("API未配置，使用本地猫咪语录");
        return getRandomCatPhrase();
    }
    
    const endpoint = apiConfig.url;
    const apiKey = apiConfig.key;
    const modelName = apiConfig.model;

    const prompt = `
你是一个温柔且鼓励人的猫咪AI助理，用户输入了他们今天最重要的任务以及它的重要性，请你用温暖简短的话语鼓励他们完成今天的目标。语言要轻松治愈，像贴纸或便签一样简短。

用户选择了一项重要任务："${task}"
原因是："${reason || '未提供'}"

请给予用户积极的情绪价值和正向反馈，不超过2句话，使用猫咪的口吻（加上"喵"的语气词）。
`;

    try {
        console.log("开始发送AI评价请求");
        console.log("使用模型:", modelName);
        
        // 添加CORS代理选项，默认不启用
        const useProxy = false;
        const apiEndpoint = useProxy ? `https://cors-anywhere.herokuapp.com/${endpoint}` : endpoint;
        console.log("实际请求地址:", apiEndpoint);
        
        const response = await fetch(apiEndpoint, {
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
        
        console.log("AI评价响应状态:", response.status, response.statusText);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error("AI评价请求失败详情:", errorText);
            throw new Error(`AI 评价请求失败: ${response.status} - ${errorText}`);
        }
        
        const responseText = await response.text();
        console.log("AI评价原始响应:", responseText);
        
        let data;
        try {
            data = JSON.parse(responseText);
            return data.choices[0].message.content.trim();
        } catch (e) {
            console.error("JSON解析失败:", e);
            throw new Error("解析AI响应失败");
        }
    } catch (e) {
        console.error("JSON解析失败:", e);
        throw new Error("解析AI响应失败");
    }
}

// ————————————————
// 保存卡片到 localStorage
function saveCardToStorage() {
    const cards = JSON.parse(localStorage.getItem('catPlannerCards') || '[]');
    cards.push({
        date: new Date().toISOString(),
        tasks: appState.selectedTasks,
        mostImportantTask: appState.mostImportantTask,
        reason: appState.reason,
        color: getRandomColor(),
        catImage: appState.currentCatImage
    });
    localStorage.setItem('catPlannerCards', JSON.stringify(cards));
}

// 加载卡片集
function loadCardCollection() {
    cardCollection.innerHTML = '';
    const cards = JSON.parse(localStorage.getItem('catPlannerCards') || '[]');
    if (cards.length === 0) {
        cardCollection.innerHTML = '<p class="no-cards">还没有保存的卡片</p>';
        return;
    }
    cards.forEach((card, idx) => {
        const div = document.createElement('div');
        div.className = 'collection-card';

        const date = new Date(card.date).toISOString().split('T')[0];
        const catImgSrc = card.catImage || catImages[0];
        div.innerHTML = `
            <img src="${catImgSrc}" alt="猫咪" class="collection-thumbnail">
            <div class="collection-info">
                <div class="collection-date">${date}</div>
                <div class="collection-tasks">${card.mostImportantTask?.text || ''}</div>
            </div>
        `;
        div.addEventListener('click', () => {
            showCardDetail(idx);
        });
        cardCollection.appendChild(div);
    });
}

// 显示卡片详情
function showCardDetail(index) {
    const cards = JSON.parse(localStorage.getItem('catPlannerCards') || '[]');
    if (index < 0 || index >= cards.length) return;
    const card = cards[index];
    appState.currentCardIndex = index;

    detailDate.textContent = new Date(card.date).toISOString().split('T')[0];
    const imgEl = cardDetailModal.querySelector('.cat-image');
    
    // 确保使用与卡片集相同的图片
    let catImageSrc = card.catImage;
    // 如果存储的路径不包含cat/前缀但应该包含，则添加前缀
    if (catImageSrc && !catImageSrc.startsWith('cat/') && catImageSrc.includes('cat-image')) {
        catImageSrc = 'cat/' + catImageSrc;
        // 更新卡片中的图片路径
        card.catImage = catImageSrc;
    }
    
    imgEl.src = catImageSrc || getRandomCatImage();

    detailTaskList.innerHTML = '';
    card.tasks.forEach(task => {
        addTaskToDetailCard(task, task.text === card.mostImportantTask?.text);
    });

    detailQuote.textContent = getRandomCatPhrase();
    document.querySelector('.modal-content').style.backgroundColor = card.color || '#fff';
    cardDetailModal.style.display = 'flex';
    
    // 更新localStorage中的卡片数据
    localStorage.setItem('catPlannerCards', JSON.stringify(cards));
}

// 在详情里插入任务，并且绑定复选逻辑，同步到 localStorage
function addTaskToDetailCard(task, isImportant = false) {
    const div = document.createElement('div');
    div.className = 'task-item';
    if (isImportant) div.classList.add('important');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        div.classList.toggle('completed', task.completed);
        updateCardInStorage();
        if (task.completed) createConfetti(checkbox);
    });

    const text = document.createElement('div');
    text.className = 'task-text';
    text.textContent = task.text;

    div.appendChild(checkbox);
    div.appendChild(text);
    detailTaskList.appendChild(div);
}

// 更新 localStorage 里当前要删除/修改的卡片
function updateCardInStorage() {
    const cards = JSON.parse(localStorage.getItem('catPlannerCards') || '[]');
    if (appState.currentCardIndex < 0 || appState.currentCardIndex >= cards.length) return;

    const newTasks = [];
    detailTaskList.querySelectorAll('.task-item').forEach(div => {
        const txt = div.querySelector('.task-text').textContent;
        const done = div.querySelector('.task-checkbox').checked;
        const isImp = div.classList.contains('important');
        const obj = { text: txt, completed: done };
        newTasks.push(obj);
        if (isImp) {
            cards[appState.currentCardIndex].mostImportantTask = obj;
        }
    });
    cards[appState.currentCardIndex].tasks = newTasks;
    localStorage.setItem('catPlannerCards', JSON.stringify(cards));
}

// 删除卡片
function deleteCard(idx) {
    const cards = JSON.parse(localStorage.getItem('catPlannerCards') || '[]');
    if (idx < 0 || idx >= cards.length) return;
    cards.splice(idx, 1);
    localStorage.setItem('catPlannerCards', JSON.stringify(cards));
    loadCardCollection();
}

// 烟花效果
function createConfetti(element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width/2;
    const y = rect.top + rect.height/2;
    for (let i = 0; i < 30; i++) {
        const conf = document.createElement('div');
        conf.className = 'confetti';
        conf.style.backgroundColor = getRandomColor();
        conf.style.left = `${x}px`;
        conf.style.top = `${y}px`;
        confettiContainer.appendChild(conf);

        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 60 + 20;
        const destX = x + Math.cos(angle) * dist;
        const destY = y + Math.sin(angle) * dist;

        conf.animate([
            { transform: 'scale(0) rotate(0deg)', opacity: 1 },
            { transform: `translate(${destX - x}px, ${destY - y}px) scale(1) rotate(${Math.random()*360}deg)`, opacity: 1 },
            { transform: `translate(${destX - x}px, ${destY - y}px) scale(0) rotate(${Math.random()*360}deg)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
        });
        setTimeout(() => confettiContainer.removeChild(conf), 1000);
    }
}

// 随机猫语
function getRandomCatPhrase() {
    return catPhrases[Math.floor(Math.random()*catPhrases.length)];
}
// 随机图片
function getRandomCatImage() {
    return catImages[Math.floor(Math.random()*catImages.length)];
}
// 随机卡片背景
function getRandomColor() {
    const colors = ['#ffecf0','#fff0e6','#fff9e6','#f0fff0','#e6f9ff','#f0e6ff'];
    return colors[Math.floor(Math.random()*colors.length)];
}

// 导出卡片为图片
async function exportCardAsImage(cardElement) {
    // 防止重复点击导致多次导出
    if (window._isExporting) return;
    window._isExporting = true;
    
    // 首先给用户一个提示
    showToast('正在生成图片，请稍等...');
    
    try {
        // 创建一个新的卡片容器，完全脱离DOM树
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.left = '0';
        container.style.top = '0';
        container.style.width = '400px'; // 固定宽度
        container.style.padding = '20px';
        container.style.background = 'white';
        container.style.borderRadius = '16px';
        // 移除阴影
        container.style.boxShadow = 'none';
        container.style.zIndex = '-1000'; // 隐藏但仍然渲染
        
        // 复制卡片内容
        const cardDate = cardElement.querySelector('.card-date').textContent;
        const cardQuote = cardElement.querySelector('.cat-quote').textContent;
        const taskItems = Array.from(cardElement.querySelectorAll('.task-item'));
        
        // 构建一个全新的卡片HTML，移除所有阴影效果
        container.innerHTML = `
            <div style="background: #fff; font-family: Arial, sans-serif; padding: 20px; border-radius: 12px; box-shadow: none; width: 100%; box-sizing: border-box;">
                <div style="background: #ffecf0; width: 100px; height: 100px; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 40px;">
                    🐱
                </div>
                <div style="text-align: center; margin-bottom: 15px; font-weight: bold; color: #333;">
                    ${cardDate}
                </div>
                <div style="border-top: 1px solid #eee; border-bottom: 1px solid #eee; padding: 15px 0; margin-bottom: 15px;">
                    <div style="margin-bottom: 20px;">
                        ${taskItems.map(item => {
                            const text = item.querySelector('.task-text').textContent;
                            const completed = item.querySelector('.task-checkbox').checked;
                            const isImportant = item.classList.contains('important');
                            
                            const checkboxStyle = completed ? 
                                'background: #ffb6c1; border-color: #ffb6c1;' : 
                                'background: white; border-color: #ddd;';
                            
                            const textStyle = isImportant ? 
                                'color: #ff6b8a; font-weight: bold;' :
                                'color: #555;';
                            
                            const checkmark = completed ? '✓' : '';
                            
                            return `
                                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                    <div style="width: 20px; height: 20px; ${checkboxStyle} border: 2px solid; border-radius: 4px; margin-right: 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                                        ${checkmark}
                                    </div>
                                    <div style="${textStyle}">${text}</div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                <div style="text-align: center; font-style: italic; color: #888;">
                    "${cardQuote}"
                </div>
                <div style="text-align: center; margin-top: 15px; font-size: 12px; color: #aaa;">
                    猫咪计划 | Cat AI Plan
                </div>
            </div>
        `;
        
        // 添加到页面上以便截图
        document.body.appendChild(container);
        
        // 等待一点时间确保DOM渲染完成
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // 使用dom-to-image库转换为图片
        const dataUrl = await domtoimage.toJpeg(container, { 
            quality: 0.95,
            width: 400,
            height: container.offsetHeight,
            style: {
                margin: '0',
                padding: '0',
                boxShadow: 'none' // 确保移除阴影
            }
        });
        
        // 创建下载链接
        const link = document.createElement('a');
        link.download = '猫咪计划_' + new Date().toISOString().split('T')[0] + '.jpg';
        link.href = dataUrl;
        link.click();
        
        // 清理
        document.body.removeChild(container);
        showToast('图片导出成功！');
        
    } catch (error) {
        console.error('图片生成失败', error);
        showToast('图片生成失败，请重试');
        
        // 退回到文本导出作为备用方案
        exportCardAsTextBackup(cardElement);
    } finally {
        // 无论成功失败都重置导出状态，但延迟一下以防止快速点击
        setTimeout(() => {
            window._isExporting = false;
        }, 500);
    }
}

// 备用的文本导出功能
function exportCardAsTextBackup(cardElement) {
    // 获取卡片内容
    const date = cardElement.querySelector('.card-date').textContent;
    const tasks = Array.from(cardElement.querySelectorAll('.task-item')).map(item => {
        const text = item.querySelector('.task-text').textContent;
        const completed = item.querySelector('.task-checkbox').checked;
        const isImportant = item.classList.contains('important');
        
        // 使用emoji表示任务状态和重要性
        const statusEmoji = completed ? '✅' : '⬜';
        const importantEmoji = isImportant ? '🌟' : '';
        
        return `${statusEmoji} ${importantEmoji}${text}`;
    });
    
    const quote = cardElement.querySelector('.cat-quote').textContent;
    
    // 创建美观的文本内容
    const content = `
🐱 猫咪计划 🐱
📅 ${date}
${'─'.repeat(30)}
${tasks.join('\n')}
${'─'.repeat(30)}
💬 ${quote}
${'─'.repeat(30)}
🎉 今天也要加油喵！
`;
    
    // 创建一个临时textarea来复制内容
    const textarea = document.createElement('textarea');
    textarea.value = content;
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        // 复制到剪贴板
        document.execCommand('copy');
        alert('图片导出失败，已复制文本内容到剪贴板！\n\n' + content);
    } catch (err) {
        console.error('复制失败:', err);
        alert('图片导出失败，请手动复制文本内容:\n\n' + content);
    } finally {
        document.body.removeChild(textarea);
    }
}

// 重置整个 appState 及输入框
function resetAppState() {
    appState = {
        tasks: [],
        selectedTasks: [],
        mostImportantTask: null,
        reason: '',
        isRecording: false,
        currentCardIndex: -1,
        currentCatImage: '',
        aiSelectedIndices: null,
        existingText: '',
        currentTranscript: ''
    };
    taskInput.value = '';
    reasonInput.value = '';
}
// 加载卡片集 - 按日期分组
function loadCardCollection() {
    cardCollection.innerHTML = '';
    const cards = JSON.parse(localStorage.getItem('catPlannerCards') || '[]');
    
    if (cards.length === 0) {
        cardCollection.innerHTML = '<p class="no-cards">还没有保存的卡片</p>';
        return;
    }
    
    // 对卡片按日期分组
    const groupedCards = {};
    cards.forEach((card, idx) => {
        const dateStr = new Date(card.date).toISOString().split('T')[0];
        if (!groupedCards[dateStr]) {
            groupedCards[dateStr] = [];
        }
        // 保存原始索引，以便点击时能找到正确的卡片
        card.originalIndex = idx;
        groupedCards[dateStr].push(card);
    });
    
    // 按日期降序排列（最新的在前面）
    const sortedDates = Object.keys(groupedCards).sort((a, b) => {
        return new Date(b) - new Date(a);
    });
    
    // 为每个日期创建一个分组
    sortedDates.forEach(date => {
        // 创建日期标题
        const dateHeader = document.createElement('div');
        dateHeader.className = 'date-group-header';
        
        // 格式化日期：将 2023-06-15 转换为 6月15日
        const displayDate = new Date(date);
        const month = displayDate.getMonth() + 1;
        const day = displayDate.getDate();
        const formattedDate = `${month}月${day}日`;
        dateHeader.innerHTML = `<h3>${formattedDate}</h3>`;
        cardCollection.appendChild(dateHeader);
        
        // 创建该日期下的卡片容器
        const dateGroup = document.createElement('div');
        dateGroup.className = 'album-container';
        
        // 为该日期下的每张卡片创建元素
        groupedCards[date].forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'album-card';
            
            // 修复图片路径问题：确保使用正确的路径格式
            let catImageSrc = card.catImage;
            // 如果存储的路径不包含cat/前缀但应该包含，则添加前缀
            if (catImageSrc && !catImageSrc.startsWith('cat/') && catImageSrc.includes('cat-image')) {
                catImageSrc = 'cat/' + catImageSrc;
            }
            // 如果没有图片，使用默认图片
            if (!catImageSrc) {
                catImageSrc = catImages[0];
            }
            
            // 将修正后的图片路径保存回卡片对象
            if (catImageSrc !== card.catImage) {
                card.catImage = catImageSrc;
                // 稍后会更新localStorage
            }
            
            // 设置卡片内容
            cardElement.innerHTML = `
                <div class="album-image-container">
                    <img src="${catImageSrc}" alt="猫咪" class="album-image">
                </div>
                <div class="album-info">
                    <div class="album-task">
                        ${card.mostImportantTask ? card.mostImportantTask.text : ''}
                    </div>
                </div>
            `;
            
            // 添加点击事件
            cardElement.addEventListener('click', () => {
                showCardDetail(card.originalIndex);
            });
            
            // 将卡片添加到日期组
            dateGroup.appendChild(cardElement);
        });
        
        // 将日期组添加到卡片集
        cardCollection.appendChild(dateGroup);
    });
    
    // 更新localStorage中的卡片数据，修复所有图片路径
    localStorage.setItem('catPlannerCards', JSON.stringify(cards));
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

// 将showToast函数暴露给全局
window.showToast = showToast;

// DOMContentLoaded 时初始化
document.addEventListener('DOMContentLoaded', initApp);
