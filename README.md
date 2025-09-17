// エクセルデータ一括転記システム
// モーダル表示とデータ入力機能

// モーダルHTMLを動的に作成
function createModal() {
    // 既存のモーダルがあれば削除
    const existingModal = document.getElementById('dataTransferModal');
    if (existingModal) {
        existingModal.remove();
    }

    const modalHTML = `
        <div id="dataTransferModal" style="
            display: none;
            position: fixed;
            z-index: 9999;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
        ">
            <div style="
                background-color: white;
                margin: 10% auto;
                padding: 20px;
                border: 1px solid #888;
                border-radius: 8px;
                width: 60%;
                max-width: 600px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            ">
                <h3 style="margin-top: 0; color: #333;">エクセルデータ一括転記</h3>
                <p style="color: #666; margin-bottom: 15px;">
                    ExcelVBAで生成したJSON形式のデータを貼り付けてください<br>
                    例: {'Class001':'ﾃｨｰｼｬﾂ', 'Class002':'ｼｬﾂ', 'Class003':'ｽﾞﾎﾞﾝ'}
                </p>
                <textarea id="jsonDataInput" placeholder="JSONデータを貼り付けてください..." style="
                    width: 100%;
                    height: 200px;
                    padding: 10px;
                    border: 2px solid #ddd;
                    border-radius: 4px;
                    font-family: monospace;
                    font-size: 14px;
                    resize: vertical;
                    box-sizing: border-box;
                "></textarea>
                <div style="margin-top: 15px; text-align: right;">
                    <button id="cancelBtn" style="
                        padding: 10px 20px;
                        margin-right: 10px;
                        border: 1px solid #ccc;
                        background-color: #f8f8f8;
                        border-radius: 4px;
                        cursor: pointer;
                    ">キャンセル</button>
                    <button id="executeBtn" style="
                        padding: 10px 20px;
                        border: none;
                        background-color: #007bff;
                        color: white;
                        border-radius: 4px;
                        cursor: pointer;
                    ">データを転記</button>
                </div>
                <div id="statusMessage" style="
                    margin-top: 10px;
                    padding: 5px;
                    border-radius: 4px;
                    display: none;
                "></div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// モーダルを表示
function showDataTransferModal() {
    createModal();
    const modal = document.getElementById('dataTransferModal');
    const jsonInput = document.getElementById('jsonDataInput');
    const cancelBtn = document.getElementById('cancelBtn');
    const executeBtn = document.getElementById('executeBtn');

    // モーダル表示
    modal.style.display = 'block';
    
    // テキストエリアにフォーカス
    setTimeout(() => jsonInput.focus(), 100);

    // イベントリスナー設定
    cancelBtn.onclick = closeModal;
    executeBtn.onclick = executeDataTransfer;

    // モーダル外クリックで閉じる
    modal.onclick = function(e) {
        if (e.target === modal) {
            closeModal();
        }
    };

    // ESCキーで閉じる
    document.addEventListener('keydown', handleEscKey);
}

// モーダルを閉じる
function closeModal() {
    const modal = document.getElementById('dataTransferModal');
    if (modal) {
        modal.style.display = 'none';
        document.removeEventListener('keydown', handleEscKey);
    }
}

// ESCキー処理
function handleEscKey(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
}

// ステータスメッセージ表示
function showStatus(message, isError = false) {
    const statusDiv = document.getElementById('statusMessage');
    statusDiv.style.display = 'block';
    statusDiv.textContent = message;
    statusDiv.style.backgroundColor = isError ? '#f8d7da' : '#d4edda';
    statusDiv.style.color = isError ? '#721c24' : '#155724';
    statusDiv.style.border = isError ? '1px solid #f5c6cb' : '1px solid #c3e6cb';
}

// JSONデータの検証
function validateJsonData(jsonStr) {
    try {
        // 改行やスペースを除去
        const cleanedStr = jsonStr.trim();
        
        if (!cleanedStr) {
            throw new Error('データが入力されていません');
        }

        // JSONとして解析
        const data = JSON.parse(cleanedStr);
        
        if (typeof data !== 'object' || Array.isArray(data)) {
            throw new Error('オブジェクト形式のJSONを入力してください');
        }

        if (Object.keys(data).length === 0) {
            throw new Error('空のオブジェクトです。データを確認してください');
        }

        return { success: true, data: data };
    } catch (error) {
        return { 
            success: false, 
            error: error.message || 'JSON形式が正しくありません' 
        };
    }
}

// 視覚的フィードバック用のCSS追加
function addVisualFeedbackStyles() {
    const styleId = 'dataTransferStyles';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .data-transfer-highlight {
                border: 2px solid #ff4444 !important;
                box-shadow: 0 0 10px rgba(255, 68, 68, 0.5) !important;
                transition: all 0.3s ease !important;
                background-color: rgba(255, 68, 68, 0.1) !important;
            }
            .data-transfer-success {
                border: 2px solid #28a745 !important;
                box-shadow: 0 0 10px rgba(40, 167, 69, 0.5) !important;
                transition: all 0.3s ease !important;
                background-color: rgba(40, 167, 69, 0.1) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// 要素のハイライト処理
function highlightElement(element, isSuccess = true) {
    if (!element) return;
    
    // ハイライトクラス追加
    element.classList.add('data-transfer-highlight');
    
    // 要素が見える位置までスクロール
    element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'center'
    });
    
    // フォーカス設定（可能な場合）
    if (element.focus && (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea')) {
        element.focus();
    }
    
    // 成功時のエフェクト
    setTimeout(() => {
        element.classList.remove('data-transfer-highlight');
        if (isSuccess) {
            element.classList.add('data-transfer-success');
            setTimeout(() => {
                element.classList.remove('data-transfer-success');
            }, 800);
        }
    }, 600);
}

// プロセス表示用のプログレスバー更新
function updateProgress(current, total, currentField = '') {
    const statusDiv = document.getElementById('statusMessage');
    const percentage = Math.round((current / total) * 100);
    
    statusDiv.innerHTML = `
        <div style="margin-bottom: 10px;">
            処理中: ${current}/${total} (${percentage}%)
            ${currentField ? `<br>現在: ${currentField}` : ''}
        </div>
        <div style="width: 100%; background-color: #e0e0e0; border-radius: 4px; overflow: hidden;">
            <div style="width: ${percentage}%; height: 20px; background-color: #007bff; transition: width 0.3s ease;"></div>
        </div>
    `;
    statusDiv.style.display = 'block';
    statusDiv.style.backgroundColor = '#e7f3ff';
    statusDiv.style.color = '#0c5aa6';
    statusDiv.style.border = '1px solid #b3d9ff';
}

// データ転記実行（視覚的フィードバック付き）
async function executeDataTransfer() {
    const jsonInput = document.getElementById('jsonDataInput');
    const inputData = jsonInput.value;
    const executeBtn = document.getElementById('executeBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    // データ検証
    const validation = validateJsonData(inputData);
    if (!validation.success) {
        showStatus(validation.error, true);
        return;
    }

    // スタイル追加
    addVisualFeedbackStyles();

    // ボタン無効化
    executeBtn.disabled = true;
    cancelBtn.disabled = true;
    executeBtn.style.opacity = '0.6';
    cancelBtn.style.opacity = '0.6';

    const data = validation.data;
    const entries = Object.entries(data);
    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    try {
        // 各フィールドにデータを順次設定
        for (let i = 0; i < entries.length; i++) {
            const [fieldId, value] = entries[i];
            
            // プログレス更新
            updateProgress(i, entries.length, fieldId);
            
            try {
                let element = null;
                let control = null;
                
                // $p.getControl関数でコントロールを取得
                if (typeof $p !== 'undefined' && typeof $p.getControl === 'function' && typeof $p.set === 'function') {
                    control = $p.getControl(fieldId);
                    // コントロールからDOM要素を取得（可能な場合）
                    if (control) {
                        // controlがDOM要素を持っている場合の処理
                        if (control.element) {
                            element = control.element;
                        } else if (control.jquery) {
                            element = control[0]; // jQueryオブジェクトの場合
                        } else {
                            // DOM要素を直接検索
                            element = document.getElementById(fieldId) || document.querySelector(`[data-id="${fieldId}"]`);
                        }
                    }
                } else {
                    // $pが利用できない場合は通常のDOM操作
                    element = document.getElementById(fieldId);
                }

                if (element) {
                    // 視覚的ハイライト
                    highlightElement(element, true);
                    
                    // 少し待ってから値を設定（視覚効果のため）
                    await new Promise(resolve => setTimeout(resolve, 300));
                    
                    // データ設定
                    if (control && typeof $p.set === 'function') {
                        $p.set(control, value);
                    } else if (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea') {
                        element.value = value;
                        element.dispatchEvent(new Event('change', { bubbles: true }));
                        element.dispatchEvent(new Event('input', { bubbles: true }));
                    } else {
                        element.textContent = value;
                    }
                    
                    successCount++;
                } else {
                    errorCount++;
                    errors.push(`フィールド "${fieldId}" が見つかりません`);
                }
                
                // 次の処理まで少し待機
                await new Promise(resolve => setTimeout(resolve, 200));
                
            } catch (error) {
                errorCount++;
                errors.push(`${fieldId}: ${error.message}`);
                
                // エラー時も要素があれば視覚的フィードバック
                const element = document.getElementById(fieldId);
                if (element) {
                    highlightElement(element, false);
                }
            }
        }

        // 最終結果表示
        updateProgress(entries.length, entries.length);
        await new Promise(resolve => setTimeout(resolve, 500));

        let message = `転記完了: 成功 ${successCount}件`;
        if (errorCount > 0) {
            message += `, エラー ${errorCount}件`;
            if (errors.length > 0) {
                message += `\nエラー詳細:\n${errors.slice(0, 5).join('\n')}`;
                if (errors.length > 5) {
                    message += `\n...他${errors.length - 5}件`;
                }
            }
        }

        showStatus(message, errorCount > 0);

        // 成功時は3秒後に自動でモーダルを閉じる
        if (errorCount === 0) {
            setTimeout(() => {
                closeModal();
            }, 3000);
        }

    } finally {
        // ボタン再有効化
        executeBtn.disabled = false;
        cancelBtn.disabled = false;
        executeBtn.style.opacity = '1';
        cancelBtn.style.opacity = '1';
    }
}

// メインボタンクリックでモーダル表示（この関数をボタンのonclickに設定）
function openDataTransferModal() {
    showDataTransferModal();
}

// 使用例：ボタンに以下のようにイベントを設定
// <button onclick="openDataTransferModal()">エクセルデータ転記</button>

// または、既存のボタンにイベントリスナーを追加
// document.getElementById('yourButtonId').addEventListener('click', openDataTransferModal);

console.log('エクセルデータ一括転記システムが読み込まれました。');
console.log('使用方法: openDataTransferModal()関数を呼び出してモーダルを表示してください。');
