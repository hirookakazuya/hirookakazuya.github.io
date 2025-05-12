<!DOCTYPE html>
<html lang="en">

<head>
  <style>
    /* フィールドRow本体 */
    .fields {
      display: inline-flex;
      /* Flexboxレイアウトを適用(子要素の配置や位置を指定できる。既定値で横並び指定) */
      /*親の幅を子要素の合計にする*/
      outline: 1px solid #000;
      /* 黒色の1ピクセル実線アウトラインを設定 */
      outline-offset: -1px;
      /* アウトラインを1ピクセル内側にずらす(outlineは既定値で外側) */
      background: #f7f7f7;
      /* 背景色を薄いグレーに設定 */
      font-family: Arial, sans-serif;
      /* フォントをArial、なければsans-serifに設定 */
    }

    .field-cell {
      display: flex;
      /* Flexboxレイアウトを適用 */
      align-items: center;
      /* アイテムを縦方向中央揃えにする */
      justify-content: center;
      /* アイテムを水平方向中央揃えにする */
      font-weight: bold;
      /* 文字を太字にする */
      border-right: 1px solid #000;
      /* 下側に1ピクセルの黒い実線ボーダーを設定 */
      box-sizing: border-box;
      /* widthとheightで指定した値にパディングとボーダー含める(デフォルトではコンテンツのみ、左右枠線を下のテーブルと一致させる) */
      min-height: 32px;
      /* 最小の高さを32ピクセルに設定 */

    }

    .field-cell:last-child {
      border-right: none;
      /* 最後のセルの右枠線はfield全体のoutlineがあるので削除 */
    }

    /* 最後の.field-cellの右側ボーダーを消す。項目と項目の間の縦線 */

.table {

      display: inline-flex;
      /* 親要素をインライン要素として表示しつつ、flexboxの機能を利用できるようにする */
      flex-direction: column;
      /* 子要素（通常は行やrow）を縦方向（上下）に並べる */
      outline: 1px solid #000;
      /* テーブル全体に黒色の1px実線の枠線を描画する */
      outline-offset: -1px;
      /* 枠線を内側に1pxずらすことで、外側にはみ出さないようにする */
      overflow: hidden;
      /* 子要素がはみ出した場合に隠れるようにする（スクロールバーなどは表示しない） */
      background: #fff;
      /* 背景色を白に設定する */
      font-family: Arial, sans-serif;
      /* テーブル内のテキストのフォントをArial、なければサンセリフ体にする */
}


    .row {
      display: flex;
      /* flexboxを設定 */
    }

.cell {
  outline: 1px solid #000;         
　/* セル全体に1pxの黒い実線の枠線を表示 */
  outline-offset: 0px;             
  /* 枠線の位置をセルの端にぴったり合わせる（ずらさない） */
  background: #fff;                
  /* セルの背景色を白に設定 */
  display: flex;                   
  /* セル内のレイアウトをflexboxで制御できるようにする */
  flex-direction: column;          
  /* セル内の子要素を縦方向（上下）に並べる */
  justify-content: stretch;        
  /* 子要素を上下方向に隙間なく引き伸ばして配置する（重要） */
  padding: 0;                      
  /* セル内側の余白をなくす */
  margin: 0;                       
  /* セル外側の余白をなくす */
  height: 200px;                   
  /* セルの高さを200pxに固定する */
}


/* カラム幅調整 */
.group_A {width: 50px;}
.group_B {width: 50px;}
.group_C {width: 120px;}
.group_D {width: 120px;}
.group_E {width: 120px;}

/* All inner cells: share equal height within parent cell */
.cell-inner {
  flex: 1; /* ensures equal height distribution */
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  border-bottom: 1px solid #000;
  padding: 0;
  margin: 0;
}

/* Optional: remove border from last inner-cell in a group */
.cell-inner:last-child {
  border-bottom: none;
}

    /* 左右分割・間に枠線 */
    .cell-inner-left {
      flex: 1 1 0;
      text-align: right;
      padding-right: 4px;
      border-right: 1px solid #000;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 100%;
      box-sizing: border-box;
    }

    .cell-inner-right {
      flex: 2 1 0;
      text-align: left;
      padding-left: 0px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 100%;
      box-sizing: border-box;
    }

    input[type="text"] {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      font-size: 12px;
      border: 1px solid #000;
      border-radius: 2px;
      padding: 0 4px;
      border: 0px;

    }
  </style>

</head>

<body>
  <header>
    <h1 style="font-size: 20px;">application_sample</h1>
  </header>
  <main>
    <div class="filter"></div>
    
      <div class="fields">
        <div class="field-cell group_A">A</div>
        <div class="field-cell group_B">B</div>
        <div class="field-cell group_C">C</div>
        <div class="field-cell group_D">D</div>
        <div class="field-cell group_E">E</div>
      </div>

      <div id="table" class="table"></div>
    
  </main>

  <footer>
    <p>&copy; 2025 My Website</p>
  </footer>

  <script>

    const structure = {
      A: [{ id: "a1", dataKey: "A" }],
      B: [{ id: "b1", dataKey: "B" }],
      C: [
        { id: "c1-1", label: "C1-1", dataKey: "C_1" },
        { id: "c1-2", label: "C1-2", dataKey: "C_2" },
        { id: "c1-3", label: "C1-3", dataKey: "C_3" },
        { id: "c1-4", label: "C1-4", dataKey: "C_4" },
        { id: "c1-5", label: "C1-5", dataKey: "C_5" }
      ],
      D: [
        { id: "d1-1", label: "D1-1", dataKey: "D_1" },
        { id: "d1-2", label: "D1-2", dataKey: "D_2" },
        { id: "d1-3", label: "D1-3", dataKey: "D_3" },
        { id: "d1-4", label: "D1-4", dataKey: "D_4" },
        { id: "d1-5", label: "D1-5", dataKey: "D_5" }
      ],
      E: [
        { id: "e1-1", label: "E1-1", dataKey: "E_1" },
        { id: "e1-2", label: "E1-2", dataKey: "E_2" },
        { id: "e1-3", label: "E1-3", dataKey: "E_3" },
        { id: "e1-4", label: "E1-4", dataKey: "E_4" },
        { id: "e1-5", label: "E1-5", dataKey: "E_5" }
      ]
    };

    function createCellInner(id, label, value) {
      const wrapper = document.createElement("div");
      wrapper.className = "cell-inner";
      wrapper.innerHTML = `
    ${label ? 
    `<div class="cell-inner-left">
      <label for="${id}">${label}</label>
     </div>` : ""
    }
     <div class="cell-inner-right">
      <input id="${id}" type="text" value="${value || ""}">
     </div>
  `;
      return wrapper;
    }

    function createRow(data) {
      const row = document.createElement("div");
      row.className = "row";

      for (const group in structure) {
        const groupDiv = document.createElement("div");
        groupDiv.className = `cell group_${group}`;

        structure[group].forEach(field => {
          const { id, label, dataKey } = field;
          const value = data[dataKey] || "";
          const cellInner = createCellInner(id, label, value);
          groupDiv.appendChild(cellInner);
        });

        row.appendChild(groupDiv);
      }

      return row;
    }


    const sampleData = [
      {
        A: "a", B: "b",
        C_1: "c", C_2: "d", C_3: "e", C_4: "f", C_5: "g",
        D_1: "h", D_2: "i", D_3: "j", D_4: "k", D_5: "l",
        E_1: "m", E_2: "n", E_3: "o", E_4: "p", E_5: "q"
      },
      {
        A: "a", B: "b",
        C_1: "c", C_2: "d", C_3: "e", C_4: "f", C_5: "g",
        D_1: "h", D_2: "i", D_3: "j", D_4: "k", D_5: "l",
        E_1: "m", E_2: "n", E_3: "o", E_4: "p", E_5: "q"
      },
      // add more rows as needed
    ];

    const table = document.getElementById("table");
    sampleData.forEach(data => {
      table.appendChild(createRow(data));
    });

  </script>
</body>

</html>
