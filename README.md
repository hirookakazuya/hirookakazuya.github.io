
<head>
  <style>

/* フィールドRow本体 */
.fields {
  width: 420px;                       /* 要素の幅を420ピクセルに設定 */
  display: flex;                      /* Flexboxレイアウトを適用 */
  outline: 1px solid #000;            /* 黒色の1ピクセル実線アウトラインを設定 */
  outline-offset: -1px;               /* アウトラインを1ピクセル内側にずらす */
  background: #f7f7f7;                /* 背景色を薄いグレーに設定 */
  font-family: Arial, sans-serif;     /* フォントをArial、なければsans-serifに設定 */
  margin-bottom: 0;                   /* 下のマージンを0に設定 */

}

.field-cell {
  display: flex;                        /* Flexboxレイアウトを適用 */
  align-items: center;                  /* アイテムを縦方向中央揃えにする */
  justify-content: center;              /* アイテムを水平方向中央揃えにする */
  font-weight: bold;                    /* 文字を太字にする */
  border-right: 1px solid #000;         /* 右側に1ピクセルの黒い実線ボーダーを設定 */
  border-bottom: 1px solid #000;        /* 下側に1ピクセルの黒い実線ボーダーを設定 */
  /*box-sizing: border-box;*/               /* パディングとボーダーを幅と高さに含める　これがないと線の上下に隙間や背景に隙間 */
  min-height: 32px;                     /* 最小の高さを32ピクセルに設定 */
  padding: 0;                           /* パディング（内側余白）を0に設定 */
}

.field-cell:last-child {
  border-right: none;                    
}
                                         /* 最後の.field-cellの右側ボーダーを消す。項目と項目の間の縦線 */

.table {
  width: 420px;
  display: flex;
  flex-direction: column;
  outline: 1px solid #000;
  outline-offset: -1px;
  overflow: hidden;
  background: #fff;
  font-family: Arial, sans-serif;
}

.row {
  display: flex;
}

.cell {
  outline: 1px solid #000;
  outline-offset: 0px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
}

.one { width: 50px; }
.two { width: 50px; }
.three { width: 120px; }
.four { width: 120px; }
.five { width: 120px; }

/* one, twoは高さ200px（40px×5） */
.one .cell-inner,
.two .cell-inner {
  height: 200px;
  min-height: 200px;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  padding: 0;
  margin: 0;
}

/* three, fourは各セル40pxの高さ */
.three .cell-inner,
.four .cell-inner,
.five .cell-inner {
  height: 40px;
  min-height: 40px;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  border-bottom: 1px solid #000;
  padding: 0;
  margin: 0;
}
.three .cell-inner:last-child,
.four .cell-inner:last-child,
.five .cell-inner:last-child {
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
  border:0px;

}
  </style>

</head>

<body>
<div class="fields">
  <div class="field-cell one">A</div>
  <div class="field-cell two">B</div>
  <div class="field-cell three">C</div>
  <div class="field-cell four">D</div>
  <div class="field-cell five">E</div>
</div>

<div id="table" class="table">
  
</div>

<script>
    function createRow(data){
      const row = document.createElement("div");
      row.className = "row";
      row.innerHTML = `
    <div class="cell one">
      <div class="cell-inner">
        <div class="cell-inner-left">
          <label for="a1">A1r</label>
        </div>
      </div>
    </div>
    <div class="cell two">
      <div class="cell-inner">
        <div class="cell-inner-right">
          <input id="b1" type="text">
        </div>
      </div>
    </div>
    <div class="cell three">
      <div class="cell-inner">
        <div class="cell-inner-left">
          <label for="c1-1">C1-1</label>
        </div>
        <div class="cell-inner-right">
          <input id="c1-1" type="text" value=${data.season}>
        </div>
      </div>
      <!-- 以下、cell-innerを5つ繰り返し -->
      <div class="cell-inner">
        <div class="cell-inner-left">
          <label for="c1-2">C1-2</label>
        </div>
        <div class="cell-inner-right">
          <input id="c1-2" type="text" value=${data.season}>
        </div>
      </div>
      <div class="cell-inner">
        <div class="cell-inner-left">
          <label for="c1-3">C1-3</label>
        </div>
        <div class="cell-inner-right">
          <input id="c1-3" type="text">
        </div>
      </div>
      <div class="cell-inner">
        <div class="cell-inner-left">
          <label for="c1-4">C1-4</label>
        </div>
        <div class="cell-inner-right">
          <input id="c1-4" type="text">
        </div>
      </div>
      <div class="cell-inner">
        <div class="cell-inner-left">
          <label for="c1-5">C1-5</label>
        </div>
        <div class="cell-inner-right">
          <input id="c1-5" type="text">
        </div>
      </div>
    </div>
    <div class="cell four">
      <!-- fourも同様に5つ -->
      <div class="cell-inner">
        <div class="cell-inner-left">
          <label for="d1-1">D1-1</label>
        </div>
        <div class="cell-inner-right">
          <input id="d1-1" type="text">
        </div>
      </div>
      <div class="cell-inner">
        <div class="cell-inner-left">
          <label for="d1-2">D1-2</label>
        </div>
        <div class="cell-inner-right">
          <input id="d1-2" type="text">
        </div>
      </div>
      <div class="cell-inner">
        <div class="cell-inner-left">
          <label for="d1-3">D1-3</label>
        </div>
        <div class="cell-inner-right">
          <input id="d1-3" type="text">
        </div>
      </div>
      <div class="cell-inner">
        <div class="cell-inner-left">
          <label for="d1-4">D1-4</label>
        </div>
        <div class="cell-inner-right">
          <input id="d1-4" type="text">
        </div>
      </div>
      <div class="cell-inner">
        <div class="cell-inner-left">
          <label for="d1-5">D1-5</label>
        </div>
        <div class="cell-inner-right">
          <input id="d1-5" type="text">
        </div>
      </div>
    </div>
    <div class="cell five">
      <!-- fiveも同様に5つ -->
      <div class="cell-inner">
        <div class="cell-inner-left">
          <label for="e1-1">E1-1</label>
        </div>
        <div class="cell-inner-right">
          <input id="e1-1" type="text">
        </div>
      </div>
      <div class="cell-inner">
        <div class="cell-inner-left">
          <label for="e1-2">E1-2</label>
        </div>
        <div class="cell-inner-right">
          <input id="e1-2" type="text">
        </div>
      </div>
      <div class="cell-inner">
        <div class="cell-inner-left">
          <label for="e1-3">E1-3</label>
        </div>
        <div class="cell-inner-right">
          <input id="e1-3" type="text">
        </div>
      </div>
      <div class="cell-inner">
        <div class="cell-inner-left">
          <label for="e1-4">E1-4</label>
        </div>
        <div class="cell-inner-right">
          <input id="e1-4" type="text">
        </div>
      </div>
      <div class="cell-inner">
        <div class="cell-inner-left">
          <label for="e1-5">E1-5</label>
        </div>
        <div class="cell-inner-right">
          <input id="e1-5" type="text">
        </div>
      </div>
    </div>
    `;
      return row;
    }
const sampleData = [
  { season: "Spring",buyer:"ken" },
  { season: "Summer",buyer:"mike" },
  { season: "Autumn",buyer:"jimmy" },
  { season: "Winter",buyer:"sum" }
];
　　const table = document.getElementById("table");
sampleData.forEach((data)=>{

   const row = createRow(data);
   table.appendChild(row);
});
</script>
</body>

