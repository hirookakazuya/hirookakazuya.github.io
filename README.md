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

// データ本体
const items = [
  { id: 1, name: "A", price: 100 },
  { id: 2, name: "B", price: 200 },
];

// dirty情報
const dirtyMap = {
  1: { name: false, price: true },
  2: { name: false, price: false }
};

const initialItems = [
  { id: 1, name: "A", price: 100 },
  { id: 2, name: "B", price: 200 },
];

const createInitialDirtyMap = (items) => {
  const map = {};
  items.forEach(item => {
    map[item.id] = {};
    Object.keys(item).forEach(key => {
      if (key !== "id") map[item.id][key] = false;
    });
  });
  return map;
};

const store = createStore({
  items: initialItems,
  dirtyMap: createInitialDirtyMap(initialItems),
});

const createStore = (initialState) => {
  let state = { ...initialState };
  const listeners = new Set();

  const getState = () => ({ ...state });

  // フィールド単位で値を更新し、dirtyも自動判定
  const setField = (id, key, value) => {
    const items = state.items.map(item =>
      item.id === id ? { ...item, [key]: value } : item
    );
    const originalValue = initialState.items.find(item => item.id === id)[key];
    const dirtyMap = { ...state.dirtyMap };
    dirtyMap[id] = { ...dirtyMap[id], [key]: value !== originalValue };

    state = { ...state, items, dirtyMap };
    listeners.forEach(listener => listener(getState()));
  };

  const setState = (partial) => {
    state = { ...state, ...partial };
    listeners.forEach(listener => {
      listener(getState());
    });
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return { getState, setState, setField, subscribe };
};


input.addEventListener("input", (e) => {
  store.setField(item.id, key, e.target.value);
});


store.subscribe((state, change) => {
  if (change) {
    // 変更されたセルだけを再描画
    updateTableCell(change.id, change.key, state);
  }
});


function updateTableCell(id, key, state) {
  // セルのDOM要素を取得
  const cell = document.querySelector(
    `tr[data-id="${id}"] td[data-key="${key}"]`
  );
  if (!cell) return;

  // 値の更新
  const item = state.items.find(i => i.id === id);
  cell.querySelector('input').value = item[key];

  // dirtyなら背景色変更
  if (state.dirtyMap[id][key]) {
    cell.style.backgroundColor = "#ffeeba";
  } else {
    cell.style.backgroundColor = "";
  }

  // 行のレ点も更新
  const row = cell.closest("tr");
  const rowDirty = Object.values(state.dirtyMap[id]).some(v => v);
  row.querySelector('input[type="checkbox"]').checked = rowDirty;
}



</pre>


 
