
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

.table {

      display: inline-flex;
      /* 親要素をインライン要素として表示しつつ、flexboxの機能を利用できるようにする */
      flex-direction: column;
      /* 子要素（row）を縦方向（上下）に並べる */
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
　/* セル全体に1pxの黒い実線の枠線を表示
　どうやって左右の線を重ならないようにしている？ */
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


/* フィールドとセルのカラム幅調整 */
.group_A {width: 50px;}
.group_B {width: 50px;}
.group_C {width: 120px;}
.group_D {width: 120px;}
.group_E {width: 120px;}

.cell-inner {
  flex: 1;
  /* この要素が親のflexコンテナ内で均等に
  スペースを分け合うようにする */
  display: flex;
  /* この要素自体をflexコンテナにする */
  flex-direction: row;
  /* 子要素を水平方向（横並び）に配置する
  ラベルと入力欄 */
  align-items: stretch;
  /* 子要素の高さを親要素の高さに合わせて引き伸ばす */
  justify-content: center;
  /* 子要素を水平方向の中央に配置する */
  border-bottom: 1px solid #000;
  /* 下側に1pxの黒い実線の境界線を引く */
  padding: 0;
  /* 内側の余白をなくす */
  margin: 0;
  /* 外側の余白をなくす */
}

.cell-inner:last-child {
  border-bottom: none;
  /* 最後のセルの右枠線はfield全体のoutlineが
  あるので削除 */
}

    .cell-inner-left {
  flex: 1 1 0;
  /* 親のflexコンテナ内で、1の比率で成長・縮小し、
  初期サイズは0とする */
  text-align: right;
  /* テキストやインライン要素を右寄せにする */
  padding-right: 4px;
  /* 右側に4pxの内側余白を追加する */
  border-right: 1px solid #000;
  /* 右側に1pxの黒い実線の境界線を引く */
  display: flex;
  /* この要素自体をflexコンテナにする */
  align-items: center;
  /* 子要素を垂直方向の中央に揃える */
  justify-content: flex-end;
  /* 子要素を水平方向の右端に揃える */
  height: 100%;
  /* 親要素の高さに合わせる */
  box-sizing: border-box;
  /* paddingやborderを含めて要素のサイズを計算する */
}


.cell-inner-right {
  flex: 2 1 0;
  /* 親のflexコンテナ内で、2の比率で成長・1の比率で縮小し、
  初期サイズは0とする */
  text-align: left;
  /* テキストやインライン要素を左寄せにする */
  padding-left: 0px;
  /* 左側の内側余白を0にする */
  display: flex;
  /* この要素自体をflexコンテナにする */
  align-items: center;
  /* 子要素を垂直方向の中央に揃える */
  justify-content: flex-start;
  /* 子要素を水平方向の左端に揃える */
  height: 100%;
  /* 親要素の高さに合わせる */
  box-sizing: border-box;
  /* paddingやborderを含めて要素のサイズを計算する */
}


    input[type="text"] {
  width: 100%;
  /* 親要素の幅いっぱいに広げる */
  height: 100%;
  /* 親要素の高さいっぱいに広げる */
  box-sizing: border-box;
  /* paddingやborderを含めて要素のサイズを計算する */
  font-size: 12px;
  /* 文字サイズを12pxに設定する */
  border: 1px solid #000;
  /* 1pxの黒い実線の枠線を付ける */
  border-radius: 2px;
  /* 角を2pxだけ丸くする */
  padding: 0 4px;
  /* 上下の内側余白を0、左右を4pxにする */
  border: 0px;
  /* 枠線を消す（上のborder指定が上書きされる）*/
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
<pre>
    const data = [
      {
        "thisyear": "2025"
      },
      {
        "thisyear": "2025"
      }
    ];


    function renderNode(node, record) {

        const el = document.createElement(node.tag);

        if (node.row) { el.style.gridRow = node.row; }
        if (node.column) { el.style.gridColumn = node.column; }
        if (node.id) { el.setAttribute('id', node.id); }
        if (node.class) { el.className = node.class; }
        if (node.for) { el.setAttribute('for', node.for); }
        if (node.value) { el.setAttribute('value', node.value); }
        if (node.text) { el.textContent = node.text; }

        //if (node.field && record[node.field]) { node.value = record[node.field]; }

        if (Array.isArray(node.children)) {
          el.style.display = 'grid';
          node.children.forEach(child => {
            el.appendChild(renderNode(child));
          });
        }

        return el;
    }

    function renderTable(structure, data) {
      console.log('テーブルレンダー');
      const table = document.getElementById('table');
      let i = 1;
      data.forEach(record => {
        const rowWrapper = document.createElement('div');
        rowWrapper.className = 'rowWrapper';
        rowWrapper.style.display ='grid';
        rowWrapper.style.gridRow = i;
        structure.forEach(node => {
          rowWrapper.appendChild(renderNode(node, record));
        });
        table.appendChild(rowWrapper);
        i = i + 1;
      });
    }

    document.addEventListener('DOMContentLoaded', () => { renderTable(structure, data); });</pre><pre>
node_1	node_2	node_3	node_4	node_5	node_6	node_7	node_8	node_9	node_10	row	column	id	class	value	for	text
div										1	1					
	label															年度
div										1	2					
	label															進捗
div										1	3					
	label															品種/品名情報
div										1	4					
	label															書類/サンプル情報
div										1	5					
	label															取引先情報
div										1	6					
	label															商品情報
div										1	7					
	label															絵型または商品画像
div										1	8					
	label															備考/前年実績
div										1	9					
	label															納期情報
div										1	10					
	label															売価情報
div										1	11					
	label															原価情報
div										1	12					
	label															FOB情報
div										1	13					
	label															計画数
div										1	14					
	label															ネットEC情報
div										1	15					
	label															色サイズ別計画数
div										1	16					
	label															属性
div										2	1					
	input															
div										2	2					
	input															
div										2	3		root_thislast-category			
	div									1	1					
		label														部門品種
	div									1	2					
		input														
	div									2	1					
		label														品種名
	div									2	2					
		input														
	div									3	1					
		label														メーカ品番
	div									3	2					
		input														
	div									4	1					
		label														商品名
	div									4	2					
		input														
	div									5	1					
		label														インストアCD
	div									5	2					
		input														
	div									6	1					
		label														品種グループ名
	div									6	2					
		input														
	div									7	1					
		label														品種シーズン
	div									7	2					
		input														
div										2	4		root_thislast-sample			
	div									1	1					
		label														注サン発行日
	div									1	2					
		input														
	div									2	1					
		label														注文書発行日
	div									2	2					
		input														
	div									3	1					
		label														台帳発行日
	div									3	2					
		input														
	div									4	1					
		label														注サン到着日
	div									4	2					
		input														
	div									5	1					
		label														注サン出荷日
	div									5	2					
		input														
	div									6	1					
		label														確サン保管開始日
	div									6	2					
		input														
	div									7	1					
		label														確サン出荷日
	div									7	2					
		input														
div										2	5		root_thislast-bender			
	div									1	1					
		label														取引先CD
	div									1	2					
		input														
	div									2	1					
		label														取引先名
	div									2	2					
		input														
	div									3	1					
		label														企画会社名
	div									3	2					
		input														
	div									4	1					
		label														企画会社有無
	div									4	2					
		input														
	div									5	1					
		label														取引分類
	div									5	2					
		input														
	div									6	1					
		label														代行輸入公司名
	div									6	2					
		input														
	div									7	1					
		label														原産国
	div									7	2					
		input														
div										2	6		root_thislast-item			
	div									1	1					
		label														企画区分
	div									1	2					
		input														
	div									2	1					
		label														年数（○年目）
	div									2	2					
		input														
	div									3	1					
		label														販売単位入数
	div									3	2					
		input														
	div									4	1					
		label														Mdser.名
	div									4	2					
		input														
	div									5	1					
		label														ブランド
	div									5	2					
		input														
	div									6	1					
		label														QR
	div									6	2					
		input														
	div									7	1					
		label														素材
	div									7	2					
		input														
div										2	7					
	div															
		form											root_this-picture_form			
			input							1	1					
			button							2	1					upload
div										2	8					
	div									1	1		root_thisyear_promoion			
		div								1	1					
			label													チラシ日付
		div								2	1					
			input													
		div								3	1					
			label													その他販促計画
		div								4	1					
			input													
	div									1	2		root_thisyear_reference			
		div								1	1					
			label													備考
		div								2	1					
			input													
div										2	9		root_thislastyear-delivery			
	div									1	1					
	div									1	2					
		label														分納1
	div									1	3					
		label														分納2
	div									1	4					
		label														分納3
	div									2	1					
		label														店頭
	div									2	2					
		input														
	div									2	3					
		input														
	div									2	4					
		input														
	div									3	1					
		label														センター
	div									3	2					
		input														
	div									3	3					
		input														
	div									3	4					
		input														
	div									4	1					
		label														SHIP
	div									4	2					
		input														
	div									4	3					
		input														
	div									4	4					
		input														
	div									5	1					
		label														検品所
	div									5	2					
		input														
	div									5	3					
		input														
	div									5	4					
		input														
	div									6	1					
		label														初回投入週
	div									6	2					
		input														
	div									6	3					
		input														
	div									6	4					
		input														
div										2	10		root_thislastyear_price			
	div									1	1					
		label														売単価
	div									1	2					
		input														
	div									2	1					
		label														総額
	div									2	2					
		input														
	div									3	1					
		label														
	div									3	2					
		input														
	div									4	1					
		label														仕入売価（千円）
	div									4	2					
		input														
	div									5	1					
		label														1枚換算
	div									5	2					
		input														
	div									6	1					
		label														1枚換算（税込）
	div									6	2					
		input														
	div									7	1					
		label														ネット販売（千円）
	div									7	2					
		input														
div										2	11		root_thislastyear_cost			
	div									1	1					
		label														原単価
	div									1	2					
		input														
	div									2	1					
		label														値入率
	div									2	2					
		input														
	div									3	1					
		label														
	div									3	2					
		input														
	div									4	1					
		label														仕入原価（千円）
	div									4	2					
		input														
	div									5	1					
		label														1枚換算
	div									5	2					
		input														
	div									6	1					
		label														
	div									6	2					
		input														
	div									7	1					
		label														ネット販売（千円）
	div									7	2					
		input														
div										2	12		root_thislastyear_fob			
	div									1	1					
		label														FOB単価
	div									1	2					
		input														
	div									2	1					
		label														決済通貨
	div									2	2					
		input														
	div									3	1					
		label														経費係数
	div									3	2					
		input														
	div									4	1					
		label														FOB金額
	div									4	2					
		input														
	div									5	1					
		label														1枚換算
	div									5	2					
		input														
	div									6	1					
		label														
	div									6	2					
		input														
	div									7	1					
		label														ネット販売
	div									7	2					
		input														
div										2	13		root_thislastyear_grobalqty			
	div									1	1					
		label														計画数
	div									1	2					
		input														
	div									2	1					
		label														SKU数
	div									2	2					
		input														
	div									3	1					
		label														
	div									3	2					
		input														
	div									4	1					
		label														
	div									4	2					
		input														
	div									5	1					
		label														1枚換算
	div									5	2					
		input														
	div									6	1					
		label														ネット比率
	div									6	2					
		input														
	div									7	1					
		label														ネット販売
	div									7	2					
		input														
div										2	14		root_thislastyear_ec			
	div									1	1					
		label														国名
	div									1	2					
		label														可／不可
	div									1	3					
		label														その他理由
	div									2	1					
		label														中国
	div									2	2					
		input														
	div									2	3					
		input														
	div									3	1					
		label														台湾
	div									3	2					
		input														
	div									3	3					
		input														
	div									4	1					
		label														
	div									4	2					
		input														
	div									4	3					
		input														
	div									5	1					
		label														
	div									5	2					
		input														
	div									5	3					
		input														
	div									6	1					
		label														
	div									6	2					
		input														
	div									6	3					
		input														
	div									7	1					
		label														
	div									7	2					
		input														
	div									7	3					
		input														
div										2	15		root_thislastyear_skuqty			
	div									1	1					
		label														納期1
	div									1	2					
		label														納期2
	div									1	3					
		label														納期3
	div									1	4					
		label														合計
	div									1	5					
		label														アソート情報
	div									2	1					
	div									2	2					
	div									2	3					
	div									2	4					
	div									2	5					
div										2	16					
div										3	1					
	input															
div										3	2					
	input															
div										3	3		root_thislast-category			
	div									1	1					
		label														部門品種
	div									1	2					
		input														
	div									2	1					
		label														品種名
	div									2	2					
		input														
	div									3	1					
		label														メーカ品番
	div									3	2					
		input														
	div									4	1					
		label														商品名
	div									4	2					
		input														
	div									5	1					
		label														インストアCD
	div									5	2					
		input														
	div									6	1					
		label														品種グループ名
	div									6	2					
		input														
	div									7	1					
		label														品種シーズン
	div									7	2					
		input														
div										3	4		root_thislast-sample			
	div									1	1					
		label														注サン発行日
	div									1	2					
		input														
	div									2	1					
		label														注文書発行日
	div									2	2					
		input														
	div									3	1					
		label														台帳発行日
	div									3	2					
		input														
	div									4	1					
		label														注サン到着日
	div									4	2					
		input														
	div									5	1					
		label														注サン出荷日
	div									5	2					
		input														
	div									6	1					
		label														確サン保管開始日
	div									6	2					
		input														
	div									7	1					
		label														確サン出荷日
	div									7	2					
		input														
div										3	5		root_thislast-bender			
	div									1	1					
		label														取引先CD
	div									1	2					
		input														
	div									2	1					
		label														取引先名
	div									2	2					
		input														
	div									3	1					
		label														企画会社名
	div									3	2					
		input														
	div									4	1					
		label														企画会社有無
	div									4	2					
		input														
	div									5	1					
		label														取引分類
	div									5	2					
		input														
	div									6	1					
		label														代行輸入公司名
	div									6	2					
		input														
	div									7	1					
		label														原産国
	div									7	2					
		input														
div										3	6		root_thislast-item			
	div									1	1					
		label														企画区分
	div									1	2					
		input														
	div									2	1					
		label														年数（○年目）
	div									2	2					
		input														
	div									3	1					
		label														販売単位入数
	div									3	2					
		input														
	div									4	1					
		label														Mdser.名
	div									4	2					
		input														
	div									5	1					
		label														ブランド
	div									5	2					
		input														
	div									6	1					
		label														QR
	div									6	2					
		input														
	div									7	1					
		label														素材
	div									7	2					
		input														
div										3	7					
	div															
		form														
			input							1	1					
div										3	8					
	div									1	1					
		div								1	1					
			label													仕入高（千円）
		div								1	2					
			input													
		div								2	1					
			label													売上高（千円）
		div								2	2					
			input													
		div								3	1					
			label													売変高（千円）
		div								3	2					
			input													
		div								4	1					
			label													荒利高（千円）
		div								4	2					
			input													
		div								5	1					
			label													在庫高（千円）
		div								5	2					
			input													
		div								6	1					
			label													投入時売価販売数
		div								6	2					
			input													
		div								7	1					
			label													荒利対仕入売価
		div								7	2					
			input													
	div									1	2					
		div								1	1					
			label													仕入数
		div								1	2					
			input													
		div								2	1					
			label													売数
		div								2	2					
			input													
		div								3	1					
			label													売変率
		div								3	2					
			input													
		div								4	1					
			label													荒利率
		div								4	2					
			input													
		div								5	1					
			label													在庫数
		div								5	2					
			input													
		div								6	1					
			label													投入時売価販売率
		div								6	2					
			input													
		div								7	1					
			label													販売率
		div								7	2					
			input													
div										3	9		root_thislastyear-delivery			
	div									1	1					
	div									1	2					
		label														分納1
	div									1	3					
		label														分納2
	div									1	4					
		label														分納3
	div									2	1					
		label														店頭
	div									2	2					
		input														
	div									2	3					
		input														
	div									2	4					
		input														
	div									3	1					
		label														センター
	div									3	2					
		input														
	div									3	3					
		input														
	div									3	4					
		input														
	div									4	1					
		label														SHIP
	div									4	2					
		input														
	div									4	3					
		input														
	div									4	4					
		input														
	div									5	1					
		label														検品所
	div									5	2					
		input														
	div									5	3					
		input														
	div									5	4					
		input														
	div									6	1					
		label														初回投入週
	div									6	2					
		input														
	div									6	3					
		input														
	div									6	4					
		input														
div										3	10		root_thislastyear_price			
	div									1	1					
		label														売単価
	div									1	2					
		input														
	div									2	1					
		label														総額
	div									2	2					
		input														
	div									3	1					
		label														
	div									3	2					
		input														
	div									4	1					
		label														仕入売価（千円）
	div									4	2					
		input														
	div									5	1					
		label														1枚換算
	div									5	2					
		input														
	div									6	1					
		label														1枚換算（税込）
	div									6	2					
		input														
	div									7	1					
		label														ネット販売（千円）
	div									7	2					
		input														
div										3	11		root_thislastyear_cost			
	div									1	1					
		label														原単価（計画）
	div									1	2					
		input														
	div									2	1					
		label														原単価（実績）
	div									2	2					
		input														
	div									3	1					
		label														値入率
	div									3	2					
		input														
	div									4	1					
		label														仕入原価（千円）
	div									4	2					
		input														
	div									5	1					
		label														1枚換算
	div									5	2					
		input														
	div									6	1					
		label														実績原価（千円）
	div									6	2					
		input														
	div									7	1					
		label														ネット販売（千円）
	div									7	2					
		input														
div										3	12		root_thislastyear_fob			
	div									1	1					
		label														FOB単価
	div									1	2					
		input														
	div									2	1					
		label														決済通貨
	div									2	2					
		input														
	div									3	1					
		label														経費係数
	div									3	2					
		input														
	div									4	1					
		label														FOB金額
	div									4	2					
		input														
	div									5	1					
		label														1枚換算
	div									5	2					
		input														
	div									6	1					
		label														
	div									6	2					
		input														
	div									7	1					
		label														ネット販売
	div									7	2					
		input														
div										3	13		root_thislastyear_grobalqty			
	div									1	1					
		label														計画数
	div									1	2					
		input														
	div									2	1					
		label														SKU数
	div									2	2					
		input														
	div									3	1					
		label														
	div									3	2					
		input														
	div									4	1					
		label														
	div									4	2					
		input														
	div									5	1					
		label														1枚換算
	div									5	2					
		input														
	div									6	1					
		label														ネット比率
	div									6	2					
		input														
	div									7	1					
		label														ネット販売
	div									7	2					
		input														
div										3	14		root_thislastyear_ec			
	div									1	1					
		label														国名
	div									1	2					
		label														可／不可
	div									1	3					
		label														その他理由
	div									2	1					
		label														中国
	div									2	2					
		input														
	div									2	3					
		input														
	div									3	1					
		label														台湾
	div									3	2					
		input														
	div									3	3					
		input														
	div									4	1					
		label														
	div									4	2					
		input														
	div									4	3					
		input														
	div									5	1					
		label														
	div									5	2					
		input														
	div									5	3					
		input														
	div									6	1					
		label														
	div									6	2					
		input														
	div									6	3					
		input														
	div									7	1					
		label														
	div									7	2					
		input														
	div									7	3					
		input														
div										3	15		root_thislastyear_skuqty			
	div									1	1					
		label														納期1
	div									1	2					
		label														納期2
	div									1	3					
		label														納期3
	div									1	4					
		label														合計
	div									1	5					
		label														アソート情報
	div									2	1					
	div									2	2					
	div									2	3					
	div									2	4					
	div									2	5					
div										3	16					</pre><script>

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
