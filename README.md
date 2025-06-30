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


</pre>


 
