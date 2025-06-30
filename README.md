<pre>

// 例：作成ボタンのクリックイベントに紐付ける
document.getElementById('create-button').addEventListener('click', function() {
  // 1. チェック済み未作成行のデータを取得
  // ここでは例として、全行データがallRowsという配列に格納されているとします
  var recordsToCreate = allRows
    .filter(function(row) {
      return row.checked && !row.hasCurrentYearRecord;
    })
    .map(function(row) {
      return {
        // 必要なフィールドのみ
        id: generateUniqueId(), // フロントで生成する場合
        year: currentYear,
        season: row.season,
        buyer: row.buyer,
        key: row.itemCode + '_' + currentYear,
        quantity: row.lastYearQuantity,
        supplier: row.lastYearSupplier
        // ...他のコピー項目
      };
    });

  if (recordsToCreate.length === 0) {
    alert('作成対象がありません。');
    return;
  }

  // 2. fetchでPOST
  fetch('/api/records', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ records: recordsToCreate })
  })
  .then(function(response) {
    if (!response.ok) throw new Error('作成に失敗しました');
    return response.json();
  })
  .then(function(createdRecords) {
    // 3. 作成されたレコードでallRowsを更新
    // ここでは、hasCurrentYearRecordフラグをtrueにする例
    createdRecords.forEach(function(created) {
      var row = allRows.find(function(r) {
        return r.key === created.key;
      });
      if (row) {
        row.hasCurrentYearRecord = true;
        // 必要なら他の項目も上書き
      }
    });
    alert('作成完了しました！');
    // 必要に応じて画面再描画
    renderTable();
  })
  .catch(function(error) {
    alert(error.message);
  });
});


// サーバーからデータ取得
const originalRows = fetchDataFromServer(); // 初期状態を保存
const currentRows = JSON.parse(JSON.stringify(originalRows)); // ディープコピーして編集用に


let lastValue = null;

document.getElementById('list-table').addEventListener('focusin', function(e) {
  if (e.target.tagName === 'INPUT') {
    lastValue = e.target.value;
  }
});

document.getElementById('list-table').addEventListener('focusout', function(e) {
  if (e.target.tagName === 'INPUT') {
    if (e.target.value !== lastValue) {
      // 値が変わっていればcurrentRowsを更新
      const id = Number(e.target.dataset.id);
      const field = e.target.dataset.field;
      const row = currentRows.find(r => r.id === id);
      if (row && field in row) {
        row[field] = e.target.value;
      }
    }
  }
});


// 送信時に差分検出
const diff = currentRows.filter(row => {
  const original = originalRows.find(o => o.id === row.id);
  return JSON.stringify(row) !== JSON.stringify(original);
});

//基本的にはこの方針でいく。で、状態管理にはcontrolStoreを使う。データベース専用のStoreを一つ作る。シンプルで分かりやすいし、必ずそこを通し、currentDataStore.setState()すように統一する。変化した項目は、フロントでマークする。

</pre>


 
