
<head>
  <style>

/* フィールドRow本体 */
.fields {
  width: 300px;
  display: flex;
  outline: 1px solid #000;
  outline-offset: -1px;
  background: #f7f7f7;
  font-family: Arial, sans-serif;
  margin-bottom: 0;
  border-bottom: none;
}
.field-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  box-sizing: border-box;
  min-height: 32px;
  padding: 0;
}
.field-cell:last-child {
  border-right: none;
}
.field-cell.one   { width: 30px; }
.field-cell.two   { width: 30px; }
.field-cell.three { width: 120px; }
.field-cell.four  { width: 120px; }
.field-cell.five  { width: 120px; }


.table {
  width: 300px;
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

.one { width: 30px; }
.two { width: 30px; }
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
.five .cell-inner, {
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
  <div class="field-cell four">E</div>
</div>

<div class="table">
  <div class="row">
    <div class="cell one">
      <div class="cell-inner">
        <div class="cell-inner-left">
          <label for="a1">A1</label>
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
          <input id="c1-1" type="text">
        </div>
      </div>
      <!-- 以下、cell-innerを5つ繰り返し -->
      <div class="cell-inner">
        <div class="cell-inner-left">
          <label for="c1-2">C1-2</label>
        </div>
        <div class="cell-inner-right">
          <input id="c1-2" type="text">
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
  </div>
  <!-- 2行目も同様に -->
</div>
</body>

