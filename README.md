
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
  const table = document.getElementById('table');
  let i = 1;

  data.forEach((record, index) => {
    const rowWrapper = document.createElement('div');
    rowWrapper.className = 'rowWrapper';
    rowWrapper.style.display = 'grid';
    rowWrapper.style.gridRow = i;

    let nodesToRender;
    if (index === 0) {
      nodesToRender = structure;
    } else {
      nodesToRender = structure.filter(node => node.row !== 1);
    }

    nodesToRender.forEach(node => {
      const rendered = renderNode(node, record);
      rowWrapper.appendChild(rendered);
    });

    table.appendChild(rowWrapper);
    i = i + 1;
  });
}

    document.addEventListener('DOMContentLoaded', () => { renderTable(structure, data); });</pre><pre>
node_1	node_2	node_3	node_4	node_5	node_6	node_7	node_8	node_9	node_10	row	column	id	class	value	for	text	field	name	type
div										1	1								
	label														Year	年度			
div										1	2								
	label														Progress	進捗			
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
	input											Year					Year		
div										2	2								
	input											Progress					Progress		
div										2	3		root_thislast-category						
	div									1	1								
		label													DepartmentCategoryCd	部門品種			
	div									1	2								
		input										DepartmentCategoryCd					DepartmentCategoryCd		
	div									2	1								
		label													CategoryName	品種名			
	div									2	2								
		input										CategoryName					CategoryName		
	div									3	1								
		label													ItemCode	メーカ品番			
	div									3	2								
		input										ItemCode					ItemCode		
	div									4	1								
		label													ItemName	商品名			
	div									4	2								
		input										ItemName					ItemName		
	div									5	1								
		label													InstoreCode	インストアCD			
	div									5	2								
		input										InstoreCode					InstoreCode		
	div									6	1								
		label													CategoryGroupName	品種グループ名			
	div									6	2								
		input										CategoryGroupName					CategoryGroupName		
	div									7	1								
		label													CategorySeason	品種シーズン			
	div									7	2								
		input										CategorySeason					CategorySeason		
div										2	4		root_thislast-sample						
	div									1	1								
		label													OrderSampleIssueDate	注サン発行日			
	div									1	2								
		input										OrderSampleIssueDate					OrderSampleIssueDate		
	div									2	1								
		label													PurchaseOrderIssueDate	注文書発行日			
	div									2	2								
		input										PurchaseOrderIssueDate					PurchaseOrderIssueDate		
	div									3	1								
		label													MasterIssueDate	台帳発行日			
	div									3	2								
		input										MasterIssueDate					MasterIssueDate		
	div									4	1								
		label													OrderSampleArrivalDate	注サン到着日			
	div									4	2								
		input										OrderSampleArrivalDate					OrderSampleArrivalDate		
	div									5	1								
		label													OrderSampleShipmentDate	注サン出荷日			
	div									5	2								
		input										OrderSampleShipmentDate					OrderSampleShipmentDate		
	div									6	1								
		label													ShippingSampleStorageStartDate	確サン保管開始日			
	div									6	2								
		input										ShippingSampleStorageStartDate					ShippingSampleStorageStartDate		
	div									7	1								
		label													ShippingSampleShipmentDate	確サン出荷日			
	div									7	2								
		input										ShippingSampleShipmentDate					ShippingSampleShipmentDate		
div										2	5		root_thislast-bender						
	div									1	1								
		label													BenderCode	取引先CD			
	div									1	2								
		input										BenderCode					BenderCode		
	div									2	1								
		label													BenderName	取引先名			
	div									2	2								
		input										BenderName					BenderName		
	div									3	1								
		label													PlanningCompanyName	企画会社名			
	div									3	2								
		input										PlanningCompanyName					PlanningCompanyName		
	div									4	1								
		label													ExistenceOfPlanningCompany	企画会社有無			
	div									4	2								
		input										ExistenceOfPlanningCompany					ExistenceOfPlanningCompany		
	div									5	1								
		label													PurchaseCategory	取引分類			
	div									5	2								
		input										PurchaseCategory					PurchaseCategory		
	div									6	1								
		label													AgencyImportCompany	代行輸入公司名			
	div									6	2								
		input										AgencyImportCompany					AgencyImportCompany		
	div									7	1								
		label													CountryOfOrigin	原産国			
	div									7	2								
		input										CountryOfOrigin					CountryOfOrigin		
div										2	6		root_thislast-item						
	div									1	1								
		label													PlanningCategory	企画区分			
	div									1	2								
		input										PlanningCategory					PlanningCategory		
	div									2	1								
		label													YearCount	年数（○年目）			
	div									2	2								
		input										YearCount					YearCount		
	div									3	1								
		label													SalesUnitQuantity	販売単位入数			
	div									3	2								
		input										SalesUnitQuantity					SalesUnitQuantity		
	div									4	1								
		label													Mdser	Mdser.名			
	div									4	2								
		input										Mdser					Mdser		
	div									5	1								
		label													Brand	ブランド			
	div									5	2								
		input										Brand					Brand		
	div									6	1								
		label													QRCode	QR			
	div									6	2								
		input										QRCode					QRCode		
	div									7	1								
		label													Material	素材			
	div									7	2								
		input										Material					Material		
div										2	7								
	div																		
		form											root_this-picture_form						
			input							1	1								
			label							2	1					upload			
div										2	8		root_thisyear_pro_ref						
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
		input										StoreArrivalDate1					StoreArrivalDate1		
	div									2	3								
		input										StoreArrivalDate2					StoreArrivalDate2		
	div									2	4								
		input										StoreArrivalDate3					StoreArrivalDate3		
	div									3	1								
		label														センター			
	div									3	2								
		input										CenterArrivalDate1					CenterArrivalDate1		
	div									3	3								
		input										CenterArrivalDate2					CenterArrivalDate2		
	div									3	4								
		input										CenterArrivalDate3					CenterArrivalDate3		
	div									4	1								
		label														SHIP			
	div									4	2								
		input										ShipDate1					ShipDate1		
	div									4	3								
		input										ShipDate2					ShipDate2		
	div									4	4								
		input										ShipDate3					ShipDate3		
	div									5	1								
		label														検品所			
	div									5	2								
		input										InspectionArrivalDate1					InspectionArrivalDate1		
	div									5	3								
		input										InspectionArrivalDate2					InspectionArrivalDate2		
	div									5	4								
		input										InspectionArrivalDate3					InspectionArrivalDate3		
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
		label													UnitSellingPrice	売単価			
	div									1	2								
		input										UnitSellingPrice					UnitSellingPrice		
	div									2	1								
		label													TotalSellingPrice	総額			
	div									2	2								
		input										TotalSellingPrice					TotalSellingPrice		
	div									3	1								
		label																	
	div									3	2								
		input																	
	div									4	1								
		label													TotalPurchasedPriceThousand	仕入売価（千円）			
	div									4	2								
		input										TotalPurchasedPriceThousand					TotalPurchasedPriceThousand		
	div									5	1								
		label													PieceSellingPrice	1枚換算			
	div									5	2								
		input										PieceSellingPrice					PieceSellingPrice		
	div									6	1								
		label													PieceSellingPriceTaxIncluded	1枚換算（税込）			
	div									6	2								
		input										PieceSellingPriceTaxIncluded					PieceSellingPriceTaxIncluded		
	div									7	1								
		label													InternetUnitSellingPriceThousand	ネット販売（千円）			
	div									7	2								
		input										InternetUnitSellingPriceThousand					InternetUnitSellingPriceThousand		
div										2	11		root_thislastyear_cost						
	div									1	1								
		label													UnitCost	原単価			
	div									1	2								
		input										UnitCost					UnitCost		
	div									2	1								
		label													MarginRate	値入率			
	div									2	2								
		input										MarginRate					MarginRate		
	div									3	1								
		label																	
	div									3	2								
		input																	
	div									4	1								
		label													TotalPurchasedCostThousand	仕入原価（千円）			
	div									4	2								
		input										TotalPurchasedCostThousand					TotalPurchasedCostThousand		
	div									5	1								
		label													PieceCost	1枚換算			
	div									5	2								
		input										PieceCost					PieceCost		
	div									6	1								
		label																	
	div									6	2								
		input																	
	div									7	1								
		label													InternetUnitCostThousand	ネット販売（千円）			
	div									7	2								
		input										InternetUnitCostThousand					InternetUnitCostThousand		
div										2	12		root_thislastyear_fob						
	div									1	1								
		label													FOBUnitCost	FOB単価			
	div									1	2								
		input										FOBUnitCost					FOBUnitCost		
	div									2	1								
		label													Currency	決済通貨			
	div									2	2								
		input										Currency					Currency		
	div									3	1								
		label													FOBCostMultiplier	経費係数			
	div									3	2								
		input										FOBCostMultiplier					FOBCostMultiplier		
	div									4	1								
		label													TotalFOBCost	FOB金額			
	div									4	2								
		input										TotalFOBCost					TotalFOBCost		
	div									5	1								
		label													PieceFOBCost	1枚換算			
	div									5	2								
		input										PieceFOBCost					PieceFOBCost		
	div									6	1								
		label																	
	div									6	2								
		input																	
	div									7	1								
		label													InternetUnitFOBCost	ネット販売			
	div									7	2								
		input										InternetUnitFOBCost					InternetUnitFOBCost		
div										2	13		root_thislastyear_grobalqty						
	div									1	1								
		label													PlannedQuantity	計画数			
	div									1	2								
		input										PlannedQuantity					PlannedQuantity		
	div									2	1								
		label													PlannedSKUCount	SKU数			
	div									2	2								
		input										PlannedSKUCount					PlannedSKUCount		
	div									3	1								
		label																	
	div									3	2								
		input																	
	div									4	1								
		label																	
	div									4	2								
		input																	
	div									5	1								
		label													PlannedPieceQuantity	1枚換算			
	div									5	2								
		input										PlannedPieceQuantity					PlannedPieceQuantity		
	div									6	1								
		label													InternetPlannedQuantityPerPlannedQuantity	ネット比率			
	div									6	2								
		input										InternetPlannedQuantityPerPlannedQuantity					InternetPlannedQuantityPerPlannedQuantity		
	div									7	1								
		label													InternetPlannedQuantity	ネット販売			
	div									7	2								
		input										InternetPlannedQuantity					InternetPlannedQuantity		
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
		input										InternetSalesAllowed1					InternetSalesAllowed1		
	div									2	3								
		input										InternetSalesAllowed1Reasons					InternetSalesAllowed1Reasons		
	div									3	1								
		label														台湾			
	div									3	2								
		input										InternetSalesAllowed2					InternetSalesAllowed2		
	div									3	3								
		input										InternetSalesAllowed2Reasons					InternetSalesAllowed2Reasons		
	div									4	1								
		label																	
	div									4	2								
		input										InternetSalesAllowed3					InternetSalesAllowed3		
	div									4	3								
		input										InternetSalesAllowed3Reasons					InternetSalesAllowed3Reasons		
	div									5	1								
		label																	
	div									5	2								
		input										InternetSalesAllowed4					InternetSalesAllowed4		
	div									5	3								
		input										InternetSalesAllowed4Reasons					InternetSalesAllowed4Reasons		
	div									6	1								
		label																	
	div									6	2								
		input										InternetSalesAllowed5					InternetSalesAllowed5		
	div									6	3								
		input										InternetSalesAllowed5Reasons					InternetSalesAllowed5Reasons		
	div									7	1								
		label																	
	div									7	2								
		input										InternetSalesAllowed6					InternetSalesAllowed6		
	div									7	3								
		input										InternetSalesAllowed6Reasons					InternetSalesAllowed6Reasons		
div										2	15		root_thislastyear_skuqty						
	div									1	1								
		label														納期1			
	div									2	1		root_thislastyear_skuqty_separate						
		div								1	1								
		div								1	2								
		div								1	3								
			label												Size1	サイズ1			
		div								1	4								
			label												Size2	サイズ2			
		div								1	5								
			label												Size3	サイズ3			
		div								1	6								
			label												Size4	サイズ4			
		div								1	7								
			label												Size5	サイズ5			
		div								1	8								
			label												Size6	サイズ6			
		div								1	9								
			label													合計			
		div								2	1								
		div								2	2								
		div								2	3								
			input																
		div								2	4								
			input																
		div								2	5								
			input																
		div								2	6								
			input																
		div								2	7								
			input																
		div								2	8								
			input																
		div								2	9								
			input																
		div								3	1								
			label												Color1	色1			
		div								3	2								
			input																
		div								3	3								
			input									PlannedQuantity1Color1Size1					PlannedQuantity1Color1Size1		
		div								3	4								
			input									PlannedQuantity1Color1Size2					PlannedQuantity1Color1Size2		
		div								3	5								
			input									PlannedQuantity1Color1Size3					PlannedQuantity1Color1Size3		
		div								3	6								
			input									PlannedQuantity1Color1Size4					PlannedQuantity1Color1Size4		
		div								3	7								
			input									PlannedQuantity1Color1Size5					PlannedQuantity1Color1Size5		
		div								3	8								
			input									PlannedQuantity1Color1Size6					PlannedQuantity1Color1Size6		
		div								3	9								
			input																
		div								4	1								
			label												Color2	色2			
		div								4	2								
			input																
		div								4	3								
			input									PlannedQuantity1Color2Size1					PlannedQuantity1Color2Size1		
		div								4	4								
			input									PlannedQuantity1Color2Size2					PlannedQuantity1Color2Size2		
		div								4	5								
			input									PlannedQuantity1Color2Size3					PlannedQuantity1Color2Size3		
		div								4	6								
			input									PlannedQuantity1Color2Size4					PlannedQuantity1Color2Size4		
		div								4	7								
			input									PlannedQuantity1Color2Size5					PlannedQuantity1Color2Size5		
		div								4	8								
			input									PlannedQuantity1Color2Size6					PlannedQuantity1Color2Size6		
		div								4	9								
			input																
		div								5	1								
			label												Color3	色3			
		div								5	2								
			input																
		div								5	3								
			input									PlannedQuantity1Color3Size1					PlannedQuantity1Color3Size1		
		div								5	4								
			input									PlannedQuantity1Color3Size2					PlannedQuantity1Color3Size2		
		div								5	5								
			input									PlannedQuantity1Color3Size3					PlannedQuantity1Color3Size3		
		div								5	6								
			input									PlannedQuantity1Color3Size4					PlannedQuantity1Color3Size4		
		div								5	7								
			input									PlannedQuantity1Color3Size5					PlannedQuantity1Color3Size5		
		div								5	8								
			input									PlannedQuantity1Color3Size6					PlannedQuantity1Color3Size6		
		div								5	9								
			input																
		div								6	1								
			label												Color4	色4			
		div								6	2								
			input																
		div								6	3								
			input									PlannedQuantity1Color4Size1					PlannedQuantity1Color4Size1		
		div								6	4								
			input									PlannedQuantity1Color4Size2					PlannedQuantity1Color4Size2		
		div								6	5								
			input									PlannedQuantity1Color4Size3					PlannedQuantity1Color4Size3		
		div								6	6								
			input									PlannedQuantity1Color4Size4					PlannedQuantity1Color4Size4		
		div								6	7								
			input									PlannedQuantity1Color4Size5					PlannedQuantity1Color4Size5		
		div								6	8								
			input									PlannedQuantity1Color4Size6					PlannedQuantity1Color4Size6		
		div								6	9								
			input																
		div								7	1								
			label													合計			
		div								7	2								
			input																
		div								7	3								
			input																
		div								7	4								
			input																
		div								7	5								
			input																
		div								7	6								
			input																
		div								7	7								
			input																
		div								7	8								
			input																
		div								7	9								
			input																
	div									1	2								
		label														納期2			
	div									2	2		root_thislastyear_skuqty_separate						
		div								1	1								
		div								1	2								
		div								1	3								
			label												Size1	サイズ1			
		div								1	4								
			label												Size2	サイズ2			
		div								1	5								
			label												Size3	サイズ3			
		div								1	6								
			label												Size4	サイズ4			
		div								1	7								
			label												Size5	サイズ5			
		div								1	8								
			label												Size6	サイズ6			
		div								1	9								
			label													合計			
		div								2	1								
		div								2	2								
		div								2	3								
			input																
		div								2	4								
			input																
		div								2	5								
			input																
		div								2	6								
			input																
		div								2	7								
			input																
		div								2	8								
			input																
		div								2	9								
			input																
		div								3	1								
			label												Color1	色1			
		div								3	2								
			input																
		div								3	3								
			input									PlannedQuantity2Color1Size1					PlannedQuantity2Color1Size1		
		div								3	4								
			input									PlannedQuantity2Color1Size2					PlannedQuantity2Color1Size2		
		div								3	5								
			input									PlannedQuantity2Color1Size3					PlannedQuantity2Color1Size3		
		div								3	6								
			input									PlannedQuantity2Color1Size4					PlannedQuantity2Color1Size4		
		div								3	7								
			input									PlannedQuantity2Color1Size5					PlannedQuantity2Color1Size5		
		div								3	8								
			input									PlannedQuantity2Color1Size6					PlannedQuantity2Color1Size6		
		div								3	9								
			input																
		div								4	1								
			label												Color2	色2			
		div								4	2								
			input																
		div								4	3								
			input									PlannedQuantity2Color2Size1					PlannedQuantity2Color2Size1		
		div								4	4								
			input									PlannedQuantity2Color2Size2					PlannedQuantity2Color2Size2		
		div								4	5								
			input									PlannedQuantity2Color2Size3					PlannedQuantity2Color2Size3		
		div								4	6								
			input									PlannedQuantity2Color2Size4					PlannedQuantity2Color2Size4		
		div								4	7								
			input									PlannedQuantity2Color2Size5					PlannedQuantity2Color2Size5		
		div								4	8								
			input									PlannedQuantity2Color2Size6					PlannedQuantity2Color2Size6		
		div								4	9								
			input																
		div								5	1								
			label												Color3	色3			
		div								5	2								
			input																
		div								5	3								
			input									PlannedQuantity2Color3Size1					PlannedQuantity2Color3Size1		
		div								5	4								
			input									PlannedQuantity2Color3Size2					PlannedQuantity2Color3Size2		
		div								5	5								
			input									PlannedQuantity2Color3Size3					PlannedQuantity2Color3Size3		
		div								5	6								
			input									PlannedQuantity2Color3Size4					PlannedQuantity2Color3Size4		
		div								5	7								
			input									PlannedQuantity2Color3Size5					PlannedQuantity2Color3Size5		
		div								5	8								
			input									PlannedQuantity2Color3Size6					PlannedQuantity2Color3Size6		
		div								5	9								
			input																
		div								6	1								
			label												Color4	色4			
		div								6	2								
			input																
		div								6	3								
			input									PlannedQuantity2Color4Size1					PlannedQuantity2Color4Size1		
		div								6	4								
			input									PlannedQuantity2Color4Size2					PlannedQuantity2Color4Size2		
		div								6	5								
			input									PlannedQuantity2Color4Size3					PlannedQuantity2Color4Size3		
		div								6	6								
			input									PlannedQuantity2Color4Size4					PlannedQuantity2Color4Size4		
		div								6	7								
			input									PlannedQuantity2Color4Size5					PlannedQuantity2Color4Size5		
		div								6	8								
			input									PlannedQuantity2Color4Size6					PlannedQuantity2Color4Size6		
		div								6	9								
			input																
		div								7	1								
			label													合計			
		div								7	2								
			input																
		div								7	3								
			input																
		div								7	4								
			input																
		div								7	5								
			input																
		div								7	6								
			input																
		div								7	7								
			input																
		div								7	8								
			input																
		div								7	9								
			input																
	div									1	3								
		label														納期3			
	div									2	3		root_thislastyear_skuqty_separate						
		div								1	1								
		div								1	2								
		div								1	3								
			label												Size1	サイズ1			
		div								1	4								
			label												Size2	サイズ2			
		div								1	5								
			label												Size3	サイズ3			
		div								1	6								
			label												Size4	サイズ4			
		div								1	7								
			label												Size5	サイズ5			
		div								1	8								
			label												Size6	サイズ6			
		div								1	9								
			label													合計			
		div								2	1								
		div								2	2								
		div								2	3								
			input																
		div								2	4								
			input																
		div								2	5								
			input																
		div								2	6								
			input																
		div								2	7								
			input																
		div								2	8								
			input																
		div								2	9								
			input																
		div								3	1								
			label												Color1	色1			
		div								3	2								
			input																
		div								3	3								
			input									PlannedQuantity3Color1Size1					PlannedQuantity3Color1Size1		
		div								3	4								
			input									PlannedQuantity3Color1Size2					PlannedQuantity3Color1Size2		
		div								3	5								
			input									PlannedQuantity3Color1Size3					PlannedQuantity3Color1Size3		
		div								3	6								
			input									PlannedQuantity3Color1Size4					PlannedQuantity3Color1Size4		
		div								3	7								
			input									PlannedQuantity3Color1Size5					PlannedQuantity3Color1Size5		
		div								3	8								
			input									PlannedQuantity3Color1Size6					PlannedQuantity3Color1Size6		
		div								3	9								
			input																
		div								4	1								
			label												Color2	色2			
		div								4	2								
			input																
		div								4	3								
			input									PlannedQuantity3Color2Size1					PlannedQuantity3Color2Size1		
		div								4	4								
			input									PlannedQuantity3Color2Size2					PlannedQuantity3Color2Size2		
		div								4	5								
			input									PlannedQuantity3Color2Size3					PlannedQuantity3Color2Size3		
		div								4	6								
			input									PlannedQuantity3Color2Size4					PlannedQuantity3Color2Size4		
		div								4	7								
			input									PlannedQuantity3Color2Size5					PlannedQuantity3Color2Size5		
		div								4	8								
			input									PlannedQuantity3Color2Size6					PlannedQuantity3Color2Size6		
		div								4	9								
			input																
		div								5	1								
			label												Color3	色3			
		div								5	2								
			input																
		div								5	3								
			input									PlannedQuantity3Color3Size1					PlannedQuantity3Color3Size1		
		div								5	4								
			input									PlannedQuantity3Color3Size2					PlannedQuantity3Color3Size2		
		div								5	5								
			input									PlannedQuantity3Color3Size3					PlannedQuantity3Color3Size3		
		div								5	6								
			input									PlannedQuantity3Color3Size4					PlannedQuantity3Color3Size4		
		div								5	7								
			input									PlannedQuantity3Color3Size5					PlannedQuantity3Color3Size5		
		div								5	8								
			input									PlannedQuantity3Color3Size6					PlannedQuantity3Color3Size6		
		div								5	9								
			input																
		div								6	1								
			label												Color4	色4			
		div								6	2								
			input																
		div								6	3								
			input									PlannedQuantity3Color4Size1					PlannedQuantity3Color4Size1		
		div								6	4								
			input									PlannedQuantity3Color4Size2					PlannedQuantity3Color4Size2		
		div								6	5								
			input									PlannedQuantity3Color4Size3					PlannedQuantity3Color4Size3		
		div								6	6								
			input									PlannedQuantity3Color4Size4					PlannedQuantity3Color4Size4		
		div								6	7								
			input									PlannedQuantity3Color4Size5					PlannedQuantity3Color4Size5		
		div								6	8								
			input									PlannedQuantity3Color4Size6					PlannedQuantity3Color4Size6		
		div								6	9								
			input																
		div								7	1								
			label													合計			
		div								7	2								
			input																
		div								7	3								
			input																
		div								7	4								
			input																
		div								7	5								
			input																
		div								7	6								
			input																
		div								7	7								
			input																
		div								7	8								
			input																
		div								7	9								
			input																
	div									1	4								
		label														合計			
	div									2	4		root_thislastyear_skuqty_separate						
		div								1	1								
		div								1	2								
		div								1	3								
			label												Size1	サイズ1			
		div								1	4								
			label												Size2	サイズ2			
		div								1	5								
			label												Size3	サイズ3			
		div								1	6								
			label												Size4	サイズ4			
		div								1	7								
			label												Size5	サイズ5			
		div								1	8								
			label												Size6	サイズ6			
		div								1	9								
			label													合計			
		div								2	1								
		div								2	2								
		div								2	3								
			input																
		div								2	4								
			input																
		div								2	5								
			input																
		div								2	6								
			input																
		div								2	7								
			input																
		div								2	8								
			input																
		div								2	9								
			input																
		div								3	1								
			label												Color1	色1			
		div								3	2								
			input																
		div								3	3								
			input																
		div								3	4								
			input																
		div								3	5								
			input																
		div								3	6								
			input																
		div								3	7								
			input																
		div								3	8								
			input																
		div								3	9								
			input																
		div								4	1								
			label												Color2	色2			
		div								4	2								
			input																
		div								4	3								
			input																
		div								4	4								
			input																
		div								4	5								
			input																
		div								4	6								
			input																
		div								4	7								
			input																
		div								4	8								
			input																
		div								4	9								
			input																
		div								5	1								
			label												Color3	色3			
		div								5	2								
			input																
		div								5	3								
			input																
		div								5	4								
			input																
		div								5	5								
			input																
		div								5	6								
			input																
		div								5	7								
			input																
		div								5	8								
			input																
		div								5	9								
			input																
		div								6	1								
			label												Color4	色4			
		div								6	2								
			input																
		div								6	3								
			input																
		div								6	4								
			input																
		div								6	5								
			input																
		div								6	6								
			input																
		div								6	7								
			input																
		div								6	8								
			input																
		div								6	9								
			input																
		div								7	1								
			label													合計			
		div								7	2								
			input																
		div								7	3								
			input																
		div								7	4								
			input																
		div								7	5								
			input																
		div								7	6								
			input																
		div								7	7								
			input																
		div								7	8								
			input																
		div								7	9								
			input																
	div									1	5								
		label														アソート情報			
	div									2	5		root_thislastyear_skuqty_separate						
		div								1	1								
		div								1	2								
		div								1	3								
			label												Size1	サイズ1			
		div								1	4								
			label												Size2	サイズ2			
		div								1	5								
			label												Size3	サイズ3			
		div								1	6								
			label												Size4	サイズ4			
		div								1	7								
			label												Size5	サイズ5			
		div								1	8								
			label												Size6	サイズ6			
		div								1	9								
			label													合計			
		div								2	1								
		div								2	2								
		div								2	3								
			input																
		div								2	4								
			input																
		div								2	5								
			input																
		div								2	6								
			input																
		div								2	7								
			input																
		div								2	8								
			input																
		div								2	9								
			input																
		div								3	1								
			label												Color1	色1			
		div								3	2								
			input																
		div								3	3	AssortmentQuantityColor1Size1					AssortmentQuantityColor1Size1		
			input																
		div								3	4	AssortmentQuantityColor1Size2					AssortmentQuantityColor1Size2		
			input																
		div								3	5	AssortmentQuantityColor1Size3					AssortmentQuantityColor1Size3		
			input																
		div								3	6	AssortmentQuantityColor1Size4					AssortmentQuantityColor1Size4		
			input																
		div								3	7	AssortmentQuantityColor1Size5					AssortmentQuantityColor1Size5		
			input																
		div								3	8	AssortmentQuantityColor1Size6					AssortmentQuantityColor1Size6		
			input																
		div								3	9								
			input																
		div								4	1								
			label												Color2	色2			
		div								4	2								
			input																
		div								4	3								
			input									AssortmentQuantityColor2Size1					AssortmentQuantityColor2Size1		
		div								4	4								
			input									AssortmentQuantityColor2Size2					AssortmentQuantityColor2Size2		
		div								4	5								
			input									AssortmentQuantityColor2Size3					AssortmentQuantityColor2Size3		
		div								4	6								
			input									AssortmentQuantityColor2Size4					AssortmentQuantityColor2Size4		
		div								4	7								
			input									AssortmentQuantityColor2Size5					AssortmentQuantityColor2Size5		
		div								4	8								
			input									AssortmentQuantityColor2Size6					AssortmentQuantityColor2Size6		
		div								4	9								
			input																
		div								5	1								
			label												Color3	色3			
		div								5	2								
			input																
		div								5	3								
			input									AssortmentQuantityColor3Size1					AssortmentQuantityColor3Size1		
		div								5	4								
			input									AssortmentQuantityColor3Size2					AssortmentQuantityColor3Size2		
		div								5	5								
			input									AssortmentQuantityColor3Size3					AssortmentQuantityColor3Size3		
		div								5	6								
			input									AssortmentQuantityColor3Size4					AssortmentQuantityColor3Size4		
		div								5	7								
			input									AssortmentQuantityColor3Size5					AssortmentQuantityColor3Size5		
		div								5	8								
			input									AssortmentQuantityColor3Size6					AssortmentQuantityColor3Size6		
		div								5	9								
			input																
		div								6	1								
			label												Color4	色4			
		div								6	2								
			input																
		div								6	3								
			input									AssortmentQuantityColor4Size1					AssortmentQuantityColor4Size1		
		div								6	4								
			input									AssortmentQuantityColor4Size2					AssortmentQuantityColor4Size2		
		div								6	5								
			input									AssortmentQuantityColor4Size3					AssortmentQuantityColor4Size3		
		div								6	6								
			input									AssortmentQuantityColor4Size4					AssortmentQuantityColor4Size4		
		div								6	7								
			input									AssortmentQuantityColor4Size5					AssortmentQuantityColor4Size5		
		div								6	8								
			input									AssortmentQuantityColor4Size6					AssortmentQuantityColor4Size6		
		div								6	9								
			input																
		div								7	1								
			label													合計			
		div								7	2								
			input																
		div								7	3								
			input																
		div								7	4								
			input																
		div								7	5								
			input																
		div								7	6								
			input																
		div								7	7								
			input																
		div								7	8								
			input																
		div								7	9								
			input																
	div									2	1								
	div									2	2								
	div									2	3								
	div									2	4								
	div									2	5								
div										2	16		root_thislast-property						
	div									1	1								
		label													Attribute1	開発コード			
	div									1	2								
		input										Attribute1					Attribute1		
	div									2	1								
		label													Attribute2	棚割コード			
	div									2	2								
		input										Attribute2					Attribute2		
	div									3	1								
		label													Attribute3	投入パターン1			
	div									3	2								
		input										Attribute3					Attribute3		
	div									4	1								
		label													Attribute4	商品ブランド名			
	div									4	2								
		input										Attribute4					Attribute4		
	div									5	1								
		label													Attribute5	生産工場			
	div									5	2								
		input										Attribute5					Attribute5		
	div									6	1								
		label													Attribute6	沖縄フラグ			
	div									6	2								
		input										Attribute6					Attribute6		
	div									7	1								
		label													Attribute7	キャンセルフラグ			
	div									7	2								
		input										Attribute7					Attribute7		
div										3	1								
	input																		
div										3	2								
	input																		
div										3	3		root_thislast-category						
	div									1	1								
		label													DepartmentCategoryCd_prev	部門品種			
	div									1	2								
		input																	
	div									2	1								
		label													CategoryName_prev	品種名			
	div									2	2								
		input																	
	div									3	1								
		label													ItemCode_prev	メーカ品番			
	div									3	2								
		input																	
	div									4	1								
		label													ItemName_prev	商品名			
	div									4	2								
		input																	
	div									5	1								
		label													InstoreCode_prev	インストアCD			
	div									5	2								
		input																	
	div									6	1								
		label													CategoryGroupName_prev	品種グループ名			
	div									6	2								
		input																	
	div									7	1								
		label													CategorySeason_prev	品種シーズン			
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
		label													BenderCode_prev	取引先CD			
	div									1	2								
		input																	
	div									2	1								
		label													BenderName_prev	取引先名			
	div									2	2								
		input																	
	div									3	1								
		label													PlanningCompanyName_prev	企画会社名			
	div									3	2								
		input																	
	div									4	1								
		label													ExistenceOfPlanningCompany_prev	企画会社有無			
	div									4	2								
		input																	
	div									5	1								
		label													PurchaseCategory_prev	取引分類			
	div									5	2								
		input																	
	div									6	1								
		label													AgencyImportCompany_prev	代行輸入公司名			
	div									6	2								
		input																	
	div									7	1								
		label													CountryOfOrigin_prev	原産国			
	div									7	2								
		input																	
div										3	6		root_thislast-item						
	div									1	1								
		label													PlanningCategory_prev	企画区分			
	div									1	2								
		input																	
	div									2	1								
		label													YearCount_prev	年数（○年目）			
	div									2	2								
		input																	
	div									3	1								
		label													SalesUnitQuantity_prev	販売単位入数			
	div									3	2								
		input																	
	div									4	1								
		label													Mdser_prev	Mdser.名			
	div									4	2								
		input																	
	div									5	1								
		label													Brand_prev	ブランド			
	div									5	2								
		input																	
	div									6	1								
		label													QRCode_prev	QR			
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
div										3	8		root_lastyear_performance						
	div									1	1		root_lastyear_performance_sub						
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
	div									1	2		root_lastyear_performance_sub						
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
		label													UnitSellingPrice_prev	売単価			
	div									1	2								
		input																	
	div									2	1								
		label													TotalSellingPrice_prev	総額			
	div									2	2								
		input																	
	div									3	1								
		label																	
	div									3	2								
		input																	
	div									4	1								
		label													TotalPurchasedPriceThousand_prev	仕入売価（千円）			
	div									4	2								
		input																	
	div									5	1								
		label													PieceSellingPrice_prev	1枚換算			
	div									5	2								
		input																	
	div									6	1								
		label														1枚換算（税込）			
	div									6	2								
		input																	
	div									7	1								
		label													PieceSellingPriceTaxIncluded_prev	ネット販売（千円）			
	div									7	2								
		input																	
div										3	11		root_thislastyear_cost						
	div									1	1								
		label													UnitCost_prev	原単価（計画）			
	div									1	2								
		input																	
	div									2	1								
		label													UnitCostActual_prev	原単価（実績）			
	div									2	2								
		input																	
	div									3	1								
		label													MarginRate_prev	値入率			
	div									3	2								
		input																	
	div									4	1								
		label													TotalPurchasedCostThousand_prev	仕入原価（千円）			
	div									4	2								
		input																	
	div									5	1								
		label													PieceCost_prev	1枚換算			
	div									5	2								
		input																	
	div									6	1								
		label														実績原価（千円）			
	div									6	2								
		input																	
	div									7	1								
		label													InternetTotalCostThousand_prev	ネット販売（千円）			
	div									7	2								
		input																	
div										3	12		root_thislastyear_fob						
	div									1	1								
		label													FOBUnitCost_prev	FOB単価			
	div									1	2								
		input																	
	div									2	1								
		label													Currency_prev	決済通貨			
	div									2	2								
		input																	
	div									3	1								
		label													FOBCostMultiplier_prev	経費係数			
	div									3	2								
		input																	
	div									4	1								
		label													TotalFOBCost_prev	FOB金額			
	div									4	2								
		input																	
	div									5	1								
		label													PieceFOBCost_prev	1枚換算			
	div									5	2								
		input																	
	div									6	1								
		label																	
	div									6	2								
		input																	
	div									7	1								
		label													InternetUnitFOBCost_prev	ネット販売			
	div									7	2								
		input																	
div										3	13		root_thislastyear_grobalqty						
	div									1	1								
		label													PlannedQuantity_prev	計画数			
	div									1	2								
		input																	
	div									2	1								
		label													PlannedSKUCount_prev	SKU数			
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
		label													PlannedPieceQuantity_prev	1枚換算			
	div									5	2								
		input																	
	div									6	1								
		label														ネット比率			
	div									6	2								
		input																	
	div									7	1								
		label													InternetPlannedQuantity_prev	ネット販売			
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
	div												root_thislastyear_skuqty_separate						
		div								1	1								
		div								1	2								
		div								1	3								
			label												Size1_prev	サイズ1			
		div								1	4								
			label												Size2_prev	サイズ2			
		div								1	5								
			label												Size3_prev	サイズ3			
		div								1	6								
			label												Size4_prev	サイズ4			
		div								1	7								
			label												Size5_prev	サイズ5			
		div								1	8								
			label												Size6_prev	サイズ6			
		div								1	9								
			label													合計			
		div								2	1								
		div								2	2								
		div								2	3								
			input																
		div								2	4								
			input																
		div								2	5								
			input																
		div								2	6								
			input																
		div								2	7								
			input																
		div								2	8								
			input																
		div								2	9								
			input																
		div								3	1								
			label												Color1_prev	色1			
		div								3	2								
			input																
		div								3	3								
			input																
		div								3	4								
			input																
		div								3	5								
			input																
		div								3	6								
			input																
		div								3	7								
			input																
		div								3	8								
			input																
		div								3	9								
			input																
		div								4	1								
			label												Color2_prev	色2			
		div								4	2								
			input																
		div								4	3								
			input																
		div								4	4								
			input																
		div								4	5								
			input																
		div								4	6								
			input																
		div								4	7								
			input																
		div								4	8								
			input																
		div								4	9								
			input																
		div								5	1								
			label												Color3_prev	色3			
		div								5	2								
			input																
		div								5	3								
			input																
		div								5	4								
			input																
		div								5	5								
			input																
		div								5	6								
			input																
		div								5	7								
			input																
		div								5	8								
			input																
		div								5	9								
			input																
		div								6	1								
			label												Color4_prev	色4			
		div								6	2								
			input																
		div								6	3								
			input																
		div								6	4								
			input																
		div								6	5								
			input																
		div								6	6								
			input																
		div								6	7								
			input																
		div								6	8								
			input																
		div								6	9								
			input																
		div								7	1								
			label													合計			
		div								7	2								
			input																
		div								7	3								
			input																
		div								7	4								
			input																
		div								7	5								
			input																
		div								7	6								
			input																
		div								7	7								
			input																
		div								7	8								
			input																
		div								7	9								
			input																
	div									1	2								
		label														納期2			
	div												root_thislastyear_skuqty_separate						
		div								1	1								
		div								1	2								
		div								1	3								
			label												Size1_prev	サイズ1			
		div								1	4								
			label												Size2_prev	サイズ2			
		div								1	5								
			label												Size3_prev	サイズ3			
		div								1	6								
			label												Size4_prev	サイズ4			
		div								1	7								
			label												Size5_prev	サイズ5			
		div								1	8								
			label												Size6_prev	サイズ6			
		div								1	9								
			label													合計			
		div								2	1								
		div								2	2								
		div								2	3								
			input																
		div								2	4								
			input																
		div								2	5								
			input																
		div								2	6								
			input																
		div								2	7								
			input																
		div								2	8								
			input																
		div								2	9								
			input																
		div								3	1								
			label												Color1_prev	色1			
		div								3	2								
			input																
		div								3	3								
			input																
		div								3	4								
			input																
		div								3	5								
			input																
		div								3	6								
			input																
		div								3	7								
			input																
		div								3	8								
			input																
		div								3	9								
			input																
		div								4	1								
			label												Color2_prev	色2			
		div								4	2								
			input																
		div								4	3								
			input																
		div								4	4								
			input																
		div								4	5								
			input																
		div								4	6								
			input																
		div								4	7								
			input																
		div								4	8								
			input																
		div								4	9								
			input																
		div								5	1								
			label												Color3_prev	色3			
		div								5	2								
			input																
		div								5	3								
			input																
		div								5	4								
			input																
		div								5	5								
			input																
		div								5	6								
			input																
		div								5	7								
			input																
		div								5	8								
			input																
		div								5	9								
			input																
		div								6	1								
			label												Color4_prev	色4			
		div								6	2								
			input																
		div								6	3								
			input																
		div								6	4								
			input																
		div								6	5								
			input																
		div								6	6								
			input																
		div								6	7								
			input																
		div								6	8								
			input																
		div								6	9								
			input																
		div								7	1								
			label													合計			
		div								7	2								
			input																
		div								7	3								
			input																
		div								7	4								
			input																
		div								7	5								
			input																
		div								7	6								
			input																
		div								7	7								
			input																
		div								7	8								
			input																
		div								7	9								
			input																
	div									1	3								
		label														納期3			
	div												root_thislastyear_skuqty_separate						
		div								1	1								
		div								1	2								
		div								1	3								
			label												Size1_prev	サイズ1			
		div								1	4								
			label												Size2_prev	サイズ2			
		div								1	5								
			label												Size3_prev	サイズ3			
		div								1	6								
			label												Size4_prev	サイズ4			
		div								1	7								
			label												Size5_prev	サイズ5			
		div								1	8								
			label												Size6_prev	サイズ6			
		div								1	9								
			label													合計			
		div								2	1								
		div								2	2								
		div								2	3								
			input																
		div								2	4								
			input																
		div								2	5								
			input																
		div								2	6								
			input																
		div								2	7								
			input																
		div								2	8								
			input																
		div								2	9								
			input																
		div								3	1								
			label												Color1_prev	色1			
		div								3	2								
			input																
		div								3	3								
			input																
		div								3	4								
			input																
		div								3	5								
			input																
		div								3	6								
			input																
		div								3	7								
			input																
		div								3	8								
			input																
		div								3	9								
			input																
		div								4	1								
			label												Color2_prev	色2			
		div								4	2								
			input																
		div								4	3								
			input																
		div								4	4								
			input																
		div								4	5								
			input																
		div								4	6								
			input																
		div								4	7								
			input																
		div								4	8								
			input																
		div								4	9								
			input																
		div								5	1								
			label												Color3_prev	色3			
		div								5	2								
			input																
		div								5	3								
			input																
		div								5	4								
			input																
		div								5	5								
			input																
		div								5	6								
			input																
		div								5	7								
			input																
		div								5	8								
			input																
		div								5	9								
			input																
		div								6	1								
			label												Color4_prev	色4			
		div								6	2								
			input																
		div								6	3								
			input																
		div								6	4								
			input																
		div								6	5								
			input																
		div								6	6								
			input																
		div								6	7								
			input																
		div								6	8								
			input																
		div								6	9								
			input																
		div								7	1								
			label													合計			
		div								7	2								
			input																
		div								7	3								
			input																
		div								7	4								
			input																
		div								7	5								
			input																
		div								7	6								
			input																
		div								7	7								
			input																
		div								7	8								
			input																
		div								7	9								
			input																
	div									1	4								
		label														合計			
	div												root_thislastyear_skuqty_separate						
		div								1	1								
		div								1	2								
		div								1	3								
			label												Size1_prev	サイズ1			
		div								1	4								
			label												Size2_prev	サイズ2			
		div								1	5								
			label												Size3_prev	サイズ3			
		div								1	6								
			label												Size4_prev	サイズ4			
		div								1	7								
			label												Size5_prev	サイズ5			
		div								1	8								
			label												Size6_prev	サイズ6			
		div								1	9								
			label													合計			
		div								2	1								
		div								2	2								
		div								2	3								
			input																
		div								2	4								
			input																
		div								2	5								
			input																
		div								2	6								
			input																
		div								2	7								
			input																
		div								2	8								
			input																
		div								2	9								
			input																
		div								3	1								
			label												Color1_prev	色1			
		div								3	2								
			input																
		div								3	3								
			input																
		div								3	4								
			input																
		div								3	5								
			input																
		div								3	6								
			input																
		div								3	7								
			input																
		div								3	8								
			input																
		div								3	9								
			input																
		div								4	1								
			label												Color2_prev	色2			
		div								4	2								
			input																
		div								4	3								
			input																
		div								4	4								
			input																
		div								4	5								
			input																
		div								4	6								
			input																
		div								4	7								
			input																
		div								4	8								
			input																
		div								4	9								
			input																
		div								5	1								
			label												Color3_prev	色3			
		div								5	2								
			input																
		div								5	3								
			input																
		div								5	4								
			input																
		div								5	5								
			input																
		div								5	6								
			input																
		div								5	7								
			input																
		div								5	8								
			input																
		div								5	9								
			input																
		div								6	1								
			label												Color4_prev	色4			
		div								6	2								
			input																
		div								6	3								
			input																
		div								6	4								
			input																
		div								6	5								
			input																
		div								6	6								
			input																
		div								6	7								
			input																
		div								6	8								
			input																
		div								6	9								
			input																
		div								7	1								
			label													合計			
		div								7	2								
			input																
		div								7	3								
			input																
		div								7	4								
			input																
		div								7	5								
			input																
		div								7	6								
			input																
		div								7	7								
			input																
		div								7	8								
			input																
		div								7	9								
			input																
	div									1	5								
		label														アソート情報			
	div												root_thislastyear_skuqty_separate						
		div								1	1								
		div								1	2								
		div								1	3								
			label												Size1_prev	サイズ1			
		div								1	4								
			label												Size2_prev	サイズ2			
		div								1	5								
			label												Size3_prev	サイズ3			
		div								1	6								
			label												Size4_prev	サイズ4			
		div								1	7								
			label												Size5_prev	サイズ5			
		div								1	8								
			label												Size6_prev	サイズ6			
		div								1	9								
			label													合計			
		div								2	1								
		div								2	2								
		div								2	3								
			input																
		div								2	4								
			input																
		div								2	5								
			input																
		div								2	6								
			input																
		div								2	7								
			input																
		div								2	8								
			input																
		div								2	9								
			input																
		div								3	1								
			label												Color1_prev	色1			
		div								3	2								
			input																
		div								3	3								
			input																
		div								3	4								
			input																
		div								3	5								
			input																
		div								3	6								
			input																
		div								3	7								
			input																
		div								3	8								
			input																
		div								3	9								
			input																
		div								4	1								
			label												Color2_prev	色2			
		div								4	2								
			input																
		div								4	3								
			input																
		div								4	4								
			input																
		div								4	5								
			input																
		div								4	6								
			input																
		div								4	7								
			input																
		div								4	8								
			input																
		div								4	9								
			input																
		div								5	1								
			label												Color3_prev	色3			
		div								5	2								
			input																
		div								5	3								
			input																
		div								5	4								
			input																
		div								5	5								
			input																
		div								5	6								
			input																
		div								5	7								
			input																
		div								5	8								
			input																
		div								5	9								
			input																
		div								6	1								
			label												Color4_prev	色4			
		div								6	2								
			input																
		div								6	3								
			input																
		div								6	4								
			input																
		div								6	5								
			input																
		div								6	6								
			input																
		div								6	7								
			input																
		div								6	8								
			input																
		div								6	9								
			input																
		div								7	1								
			label													合計			
		div								7	2								
			input																
		div								7	3								
			input																
		div								7	4								
			input																
		div								7	5								
			input																
		div								7	6								
			input																
		div								7	7								
			input																
		div								7	8								
			input																
		div								7	9								
			input																
div										3	16		root_thislast-property						
	div									1	1								
		label													Attribute1_prev	開発コード			
	div									1	2								
		input																	
	div									2	1								
		label													Attribute2_prev	棚割コード			
	div									2	2								
		input																	
	div									3	1								
		label													Attribute3_prev	投入パターン1			
	div									3	2								
		input																	
	div									4	1								
		label													Attribute4_prev	商品ブランド名			
	div									4	2								
		input																	
	div									5	1								
		label													Attribute5_prev	生産工場			
	div									5	2								
		input																	
	div									6	1								
		label													Attribute6_prev	沖縄フラグ			
	div									6	2								
		input																	
	div									7	1								
		label													Attribute7_prev	キャンセルフラグ			</pre><pre>
項目名	id	tag	type
位置No	PositionNo	input	text
管理No	MamagementNo	input	text
年度	Year	select	text
シーズン	Season	select	text
バイヤー	Buyer	select	text
当年進捗	Progress	select	text
当年部門	DepartmentCd	select	text
当年部門品種	DepartmentCategoryCd	select	text
当年品種名	CategoryName	input	text
当年メーカ品番	ItemCode	input	text
当年仮品名	ItemName	input	text
当年インストア	InstoreCode	input	text
当年品種グループ名	CategoryGroupName	input	text
当年品種シーズン	CategorySeason	select	text
注サン発行日	OrderSampleIssueDate	input	date
注文書発行日	PurchaseOrderIssueDate	input	date
台帳発行日	MasterIssueDate	input	date
注サン到着日	OrderSampleArrivalDate	input	date
注サン出荷日	OrderSampleShipmentDate	input	date
確サン保管開始日	ShippingSampleStorageStartDate	input	date
確サン出荷日	ShippingSampleShipmentDate	input	date
当年取引先CD	BenderCode	input	text
当年取引先名	BenderName	input	text
当年企画会社名	PlanningCompanyName	input	text
当年企画会社有無	ExistenceOfPlanningCompany	select	text
当年取引分類	PurchaseCategory	select	text
当年代行輸入公司名	AgencyImportCompany	input	text
当年原産国	CountryOfOrigin	input	text
当年企画区分	PlanningCategory	input	text
当年年数（○年目）	YearCount	input	text
当年販売単位内入数	SalesUnitQuantity	input	text
当年Mdser名	Mdser	select	text
当年ブランド	Brand	input	text
当年QR	QRCode	input	text
素材	Material	input	text
当年販促計画1	PromotionPlan1	input	text
当年販促計画2	PromotionPlan2	input	text
当年販促計画3	PromotionPlan3	input	text
当年販促計画4	PromotionPlan4	input	text
当年販促計画5	PromotionPlan5	input	text
当年備考1	Remarks1	input	text
当年備考2	Remarks2	input	text
当年備考3	Remarks3	input	text
当年店頭1	StoreArrivalDate1	input	date
当年ｾﾝﾀｰ1	CenterArrivalDate1	input	date
当年SHIP1	ShipDate1	input	date
当年検品所1	InspectionArrivalDate1	input	date
予備2	Spare2	input	text
予備3	Spare3	input	text
予備4	Spare4	input	text
当年店頭2	StoreArrivalDate2	input	date
当年ｾﾝﾀｰ2	CenterArrivalDate2	input	date
当年SHIP2	ShipDate 2	input	date
当年検品所2	InspectionArrivalDate2	input	date
予備5	Spare5	input	text
予備6	Spare6	input	text
予備7	Spare7	input	text
当年店頭3	StoreArrivalDate3	input	date
当年ｾﾝﾀｰ3	CenterArrivalDate3	input	date
当年SHIP3	ShipDate3	input	date
当年検品所3	InspectionArrivalDate3	input	date
予備8	Spare8	input	text
予備9	Spare9	input	text
予備10	Spare10	input	text
当年売単価	UnitSellingPrice	input	text
当年総額	TotalSellingPrice	input	text
予備11	Spare11	input	text
当年仕入売価（千円）	TotalPurchasedPriceThousand	input	text
売価1枚換算	PieceSellingPrice	input	text
当年売価1枚換算（税込）	PieceSellingPriceTaxIncluded	input	text
当年ﾈｯﾄ販売売価（千円）	InternetUnitSellingPriceThousand	input	text
当年原単価	UnitCost	input	text
当年値入率	MarginRate	input	text
予備12	Spare12	input	text
当年仕入原価（千円）	TotalPurchasedCostThousand	input	text
当年原価1枚換算	PieceCost	input	text
予備13	Spare13	input	text
当年ﾈｯﾄ販売原価（千円）	InternetUnitCostThousand	input	text
当年FOB単価	FOBUnitCost	input	text
当年決済通貨	Currency	select	text
当年経費係数	FOBCostMultiplier	input	text
当年企画レート	PlanningFeeRate	input	text
当年FOB金額	TotalFOBCost	input	text
当年FOB1枚換算	PieceFOBCost	input	text
当年新規デザイン料	DesignFee	input	text
当年ﾈｯﾄ販売FOB	InternetUnitFOBCost	input	text
当年計画数	PlannedQuantity	input	text
当年SKU数	PlannedSKUCount	input	text
予備14	Spare14	input	text
予備15	Spare15	input	text
当年計画数1枚換算	PlannedPieceQuantity	input	text
ネット比率	InternetPlannedQuantityPerPlannedQuantity	input	text
当年ﾈｯﾄ販売計画数	InternetPlannedQuantity	input	text
当年ネットEC可否1	InternetSalesAllowed1	select	text
当年ネットEC可否1その他理由	InternetSalesAllowed1Reasons	input	text
当年ネットEC可否2	InternetSalesAllowed2	select	text
当年ネットEC可否2その他理由	InternetSalesAllowed2Reasons	input	text
当年ネットEC可否3	InternetSalesAllowed3	select	text
当年ネットEC可否3その他理由	InternetSalesAllowed3Reasons	input	text
当年ネットEC可否4	InternetSalesAllowed4	select	text
当年ネットEC可否4その他理由	InternetSalesAllowed4Reasons	input	text
当年ネットEC可否5	InternetSalesAllowed5	select	text
当年ネットEC可否５その他理由	InternetSalesAllowed5Reasons	input	text
当年ネットEC可否6	InternetSalesAllowed6	select	text
当年ネットEC可否6その他理由	InternetSalesAllowed6Reasons	input	text
当年色1	Color1	select	text
当年色2	Color2	select	text
当年色3	Color3	select	text
当年色4	Color4	select	text
当年色名1	ColorName1	select	text
当年色名2	ColorName2	select	text
当年色名3	ColorName3	select	text
当年色名4	ColorName4	select	text
当年色呼称1	ColorCall1	select	text
当年色呼称2	ColorCall2	select	text
当年色呼称3	ColorCall3	select	text
当年色呼称4	ColorCall4	select	text
当年サイズ1	Size1	select	text
当年サイズ2	Size2	select	text
当年サイズ3	Size3	select	text
当年サイズ4	Size4	select	text
当年サイズ5	Size5	select	text
当年サイズ6	Size6	select	text
当年サイズ名1	SizeName1	select	text
当年サイズ名2	SizeName2	select	text
当年サイズ名3	SizeName3	select	text
当年サイズ名4	SizeName4	select	text
当年サイズ名5	SizeName5	select	text
当年サイズ名6	SizeName6	select	text
当年計画数1色1サイズ1	PlannedQuantity1Color1Size1	input	text
当年計画数1色1サイズ2	PlannedQuantity1Color1Size2	input	text
当年計画数1色1サイズ3	PlannedQuantity1Color1Size3	input	text
当年計画数1色1サイズ4	PlannedQuantity1Color1Size4	input	text
当年計画数1色1サイズ5	PlannedQuantity1Color1Size5	input	text
当年計画数1色1サイズ6	PlannedQuantity1Color1Size6	input	text
当年計画数1色2サイズ1	PlannedQuantity1Color2Size1	input	text
当年計画数1色2サイズ2	PlannedQuantity1Color2Size2	input	text
当年計画数1色2サイズ3	PlannedQuantity1Color2Size3	input	text
当年計画数1色2サイズ4	PlannedQuantity1Color2Size4	input	text
当年計画数1色2サイズ5	PlannedQuantity1Color2Size5	input	text
当年計画数1色2サイズ6	PlannedQuantity1Color2Size6	input	text
当年計画数1色3サイズ1	PlannedQuantity1Color3Size1	input	text
当年計画数1色3サイズ2	PlannedQuantity1Color3Size2	input	text
当年計画数1色3サイズ3	PlannedQuantity1Color3Size3	input	text
当年計画数1色3サイズ4	PlannedQuantity1Color3Size4	input	text
当年計画数1色3サイズ5	PlannedQuantity1Color3Size5	input	text
当年計画数1色3サイズ6	PlannedQuantity1Color3Size6	input	text
当年計画数1色4サイズ1	PlannedQuantity1Color4Size1	input	text
当年計画数1色4サイズ2	PlannedQuantity1Color4Size2	input	text
当年計画数1色4サイズ3	PlannedQuantity1Color4Size3	input	text
当年計画数1色4サイズ4	PlannedQuantity1Color4Size4	input	text
当年計画数1色4サイズ5	PlannedQuantity1Color4Size5	input	text
当年計画数1色4サイズ6	PlannedQuantity1Color4Size6	input	text
当年セット数1	SetQuantity1	input	text
当年計画数2色1サイズ1	PlannedQuantity2Color1Size1	input	text
当年計画数2色1サイズ2	PlannedQuantity2Color1Size2	input	text
当年計画数2色1サイズ3	PlannedQuantity2Color1Size3	input	text
当年計画数2色1サイズ4	PlannedQuantity2Color1Size4	input	text
当年計画数2色1サイズ5	PlannedQuantity2Color1Size5	input	text
当年計画数2色1サイズ6	PlannedQuantity2Color1Size6	input	text
当年計画数2色2サイズ1	PlannedQuantity2Color2Size1	input	text
当年計画数2色2サイズ2	PlannedQuantity2Color2Size2	input	text
当年計画数2色2サイズ3	PlannedQuantity2Color2Size3	input	text
当年計画数2色2サイズ4	PlannedQuantity2Color2Size4	input	text
当年計画数2色2サイズ5	PlannedQuantity2Color2Size5	input	text
当年計画数2色2サイズ6	PlannedQuantity2Color2Size6	input	text
当年計画数2色3サイズ1	PlannedQuantity2Color3Size1	input	text
当年計画数2色3サイズ2	PlannedQuantity2Color3Size2	input	text
当年計画数2色3サイズ3	PlannedQuantity2Color3Size3	input	text
当年計画数2色3サイズ4	PlannedQuantity2Color3Size4	input	text
当年計画数2色3サイズ5	PlannedQuantity2Color3Size5	input	text
当年計画数2色3サイズ6	PlannedQuantity2Color3Size6	input	text
当年計画数2色4サイズ1	PlannedQuantity2Color4Size1	input	text
当年計画数2色4サイズ2	PlannedQuantity2Color4Size2	input	text
当年計画数2色4サイズ3	PlannedQuantity2Color4Size3	input	text
当年計画数2色4サイズ4	PlannedQuantity2Color4Size4	input	text
当年計画数2色4サイズ5	PlannedQuantity2Color4Size5	input	text
当年計画数2色4サイズ6	PlannedQuantity2Color4Size6	input	text
当年セット数2	SetQuantity2	input	text
当年計画数3色1サイズ1	PlannedQuantity3Color1Size1	input	text
当年計画数3色1サイズ2	PlannedQuantity3Color1Size2	input	text
当年計画数3色1サイズ3	PlannedQuantity3Color1Size3	input	text
当年計画数3色1サイズ4	PlannedQuantity3Color1Size4	input	text
当年計画数3色1サイズ5	PlannedQuantity3Color1Size5	input	text
当年計画数3色1サイズ6	PlannedQuantity3Color1Size6	input	text
当年計画数3色2サイズ1	PlannedQuantity3Color2Size1	input	text
当年計画数3色2サイズ2	PlannedQuantity3Color2Size2	input	text
当年計画数3色2サイズ3	PlannedQuantity3Color2Size3	input	text
当年計画数3色2サイズ4	PlannedQuantity3Color2Size4	input	text
当年計画数3色2サイズ5	PlannedQuantity3Color2Size5	input	text
当年計画数3色2サイズ6	PlannedQuantity3Color2Size6	input	text
当年計画数3色3サイズ1	PlannedQuantity3Color3Size1	input	text
当年計画数3色3サイズ2	PlannedQuantity3Color3Size2	input	text
当年計画数3色3サイズ3	PlannedQuantity3Color3Size3	input	text
当年計画数3色3サイズ4	PlannedQuantity3Color3Size4	input	text
当年計画数3色3サイズ5	PlannedQuantity3Color3Size5	input	text
当年計画数3色3サイズ6	PlannedQuantity3Color3Size6	input	text
当年計画数3色4サイズ1	PlannedQuantity3Color4Size1	input	text
当年計画数3色4サイズ2	PlannedQuantity3Color4Size2	input	text
当年計画数3色4サイズ3	PlannedQuantity3Color4Size3	input	text
当年計画数3色4サイズ4	PlannedQuantity3Color4Size4	input	text
当年計画数3色4サイズ5	PlannedQuantity3Color4Size5	input	text
当年計画数3色4サイズ6	PlannedQuantity3Color4Size6	input	text
当年セット数3	SetQuantity3	input	text
アソート数色1サイズ1	AssortmentQuantityColor1Size1	input	text
アソート数色1サイズ2	AssortmentQuantityColor1Size2	input	text
アソート数色1サイズ3	AssortmentQuantityColor1Size3	input	text
アソート数色1サイズ4	AssortmentQuantityColor1Size4	input	text
アソート数色1サイズ5	AssortmentQuantityColor1Size5	input	text
アソート数色1サイズ6	AssortmentQuantityColor1Size6	input	text
アソート数色2サイズ1	AssortmentQuantityColor2Size1	input	text
アソート数色2サイズ2	AssortmentQuantityColor2Size2	input	text
アソート数色2サイズ3	AssortmentQuantityColor2Size3	input	text
アソート数色2サイズ4	AssortmentQuantityColor2Size4	input	text
アソート数色2サイズ5	AssortmentQuantityColor2Size5	input	text
アソート数色2サイズ6	AssortmentQuantityColor2Size6	input	text
アソート数色3サイズ1	AssortmentQuantityColor3Size1	input	text
アソート数色3サイズ2	AssortmentQuantityColor3Size2	input	text
アソート数色3サイズ3	AssortmentQuantityColor3Size3	input	text
アソート数色3サイズ4	AssortmentQuantityColor3Size4	input	text
アソート数色3サイズ5	AssortmentQuantityColor3Size5	input	text
アソート数色3サイズ6	AssortmentQuantityColor3Size6	input	text
アソート数色4サイズ1	AssortmentQuantityColor4Size1	input	text
アソート数色4サイズ2	AssortmentQuantityColor4Size2	input	text
アソート数色4サイズ3	AssortmentQuantityColor4Size3	input	text
アソート数色4サイズ4	AssortmentQuantityColor4Size4	input	text
アソート数色4サイズ5	AssortmentQuantityColor4Size5	input	text
アソート数色4サイズ6	AssortmentQuantityColor4Size6	input	text
当年属性1	Attribute1	input	text
当年属性2	Attribute2	input	text
当年属性3	Attribute3	input	text
当年属性4	Attribute4	input	text
当年属性5	Attribute5	input	text
当年属性6	Attribute6	input	text
当年属性7	Attribute7	input	text
当年属性8	Attribute8	input	text
当年属性9	Attribute9	input	text
当年属性10	Attribute10	input	text
当年属性11	Attribute11	input	text
当年属性12	Attribute12	input	text
当年属性13	Attribute13	input	text
当年属性14	Attribute14	input	text

項目名	id	tag	type
位置No	PositionNo		
管理No	MamagementNo		
年度	Year		
シーズン	Season		
バイヤー	Buyer		
前年進捗	Progress		
前年部門	DepartmentCd		
前年部門品種	DepartmentCategoryCd		
前年品種名	CategoryName		
前年メーカ品番	ItemCode		
前年仮品名	ItemName		
前年インストアCD	InstoreCode		
前年品種グループ名	CategoryGroupName		
前年品番シーズン	CategorySeason		
前年取引先CD	BenderCode		
前年取引先名	BenderName		
前年企画会社名	PlanningCompanyName		
前年企画会社有無	ExistenceOfPlanningCompany		
前年取引分類	PurchaseCategory		
前年代行輸入公司名	AgencyImportCompany		
前年原産国	CountryOfOrigin		
前年企画区分	PlanningCategory		
前年年数（〇年目）	YearCount		
前年販売単位内入数	SalesUnitQuantity		
前年Mdser名	Mdser		
前年ブランド	Brand		
前年QR	QRCode		
備考26	Spare26		
前年仕入高（千円）			
前年売上高（千円）			
創年売澱局（千日）			
前年荒利高（千円）			
前年在庫高（千円）			
前年投入時売価販売数			
前年荒利高対仕入売価			
前年仕入数			
前年売数			
前年売変率			
前年荒利率			
前年在庫数			
前年投入時売価販売率			
前年販売率			
前年店頭1	StoreArrivalDate1		
前年センター1	CenterArrivalDate1		
前年SHIP1	ShipDate1		
前年検品所1	InspectionArrivalDate1		
備考27	Spare27		
前年初回投入週			
備考29	Spare29		
前年店頭2	StoreArrivalDate2		
前年センター2	CenterArrivalDate2		
前年SHIP2	ShipDate 2		
前年検品所2	InspectionArrivalDate2		
備考30	Spare30		
備考31	Spare31		
備考32	Spare32		
前年店頭3	StoreArrivalDate3		
前年センター3	CenterArrivalDate3		
前年SHIP3	ShipDate3		
前年検品所3	InspectionArrivalDate3		
備考33	Spare33		
備考34	Spare34		
備考35	Spare35		
前年売単価	UnitSellingPrice		
前年総額	TotalSellingPrice		
備考36	Spare36		
前年仕入売 （千円）	TotalPurchasedPriceThousand		
前年売価1枚換算	PieceSellingPrice		
前年ネット販売実績売価	PieceSellingPriceTaxIncluded		
前年ネット販売売価（千円）	InternetUnitSellingPriceThousand		
前年原単価	UnitCost		
前年原単価（実績）	UnitCostActual		
前年値入率	MarginRate		
前年仕入原価（千円）	TotalPurchasedCostThousand		
前年原価1枚換算	PieceCost		
備考37	Spare37		
前年ネット販売原価（千円）	InternetTotalCostThousand		
前年FOB単価	FOBUnitCost		
前年決済通貨	Currency		
前年経費係数	FOBCostMultiplier		
前年FOB金額	TotalFOBCost		
前年FOB1枚換算	PieceFOBCost		
備考38	Spare38		
前年ネット販売FOB	InternetUnitFOBCost		
前年計画数	PlannedQuantity		
前年SKU数	PlannedSKUCount		
備考39	Spare39		
偏考40	Spare40		
前年計画数1枚換算	PlannedPieceQuantity		
前年ネット販売実績数	InternetSalesQuantity		
前年ネット販売計画数	InternetPlannedQuantity		
前年ネットEC可否1	InternetSalesAllowed1		
前年ネットEC可否1その他理由	InternetSalesAllowed1Reasons		
前年ネットEC可否2	InternetSalesAllowed2		
前年ネットEC可否2その他理由	InternetSalesAllowed2Reasons		
前年ネットEC可否3	InternetSalesAllowed3		
前年ネットEC可否3その他理由	InternetSalesAllowed3Reasons		
前年ネットEC可否4	InternetSalesAllowed4		
前年ネットEC可否4その他理由	InternetSalesAllowed4Reasons		
前年ネットEC可否5	InternetSalesAllowed5		
前年ネットEC可否5その他理由	InternetSalesAllowed5Reasons		
前年ネットEC可否6	InternetSalesAllowed6		
前年ネットEC可否6その他理由	InternetSalesAllowed6Reasons		
前年色1	Color1		
前年色2	Color2		
前年色3	Color3		
前年色4	Color4		
前年色名1	ColorName1		
前年色名2	ColorName2		
前年色名3	ColorName3		
前年色名4	ColorName4		
前年色呼称1	ColorCall1		
前年色呼称2	ColorCall2		
前年色呼称3	ColorCall3		
前年色呼称4	ColorCall4		
前年サイズ1	Size1		
前年サイズ2	Size2		
前年サイズ3	Size3		
前年サイズ4	Size4		
前年サイズ5	Size5		
前年サイズ6	Size6		
前年サイズ名1	SizeName1		
前年サイズ名2	SizeName2		
前年サイズ名3	SizeName3		
前年サイズ名4	SizeName4		
前年サイズ名5	SizeName5		
前年サイズ名6	SizeName6		
前年計画数1色1サイズ1	PlannedQuantity1Color1Size1		
前年計画数1色1サイズ2	PlannedQuantity1Color1Size2		
前年計画数1色1サイズ3	PlannedQuantity1Color1Size3		
前年計画数1色1サイズ4	PlannedQuantity1Color1Size4		
前年計画数1色1サイズ5	PlannedQuantity1Color1Size5		
前年計画数1色1サイズ6	PlannedQuantity1Color1Size6		
前年計画数1色2サイズ1	PlannedQuantity1Color2Size1		
前年計画数1色2サイズ2	PlannedQuantity1Color2Size2		
前年計画数1色2サイズ3	PlannedQuantity1Color2Size3		
前年計画数1色2サイズ4	PlannedQuantity1Color2Size4		
前年計画数1色2サイズ5	PlannedQuantity1Color2Size5		
前年計画数1色2サイズ6	PlannedQuantity1Color2Size6		
前年計画数1色3サイズ1	PlannedQuantity1Color3Size1		
前年計画数1色3サイズ2	PlannedQuantity1Color3Size2		
前年計画数1色3サイズ3	PlannedQuantity1Color3Size3		
前年計画数1色3サイズ4	PlannedQuantity1Color3Size4		
前年計画数1色3サイズ5	PlannedQuantity1Color3Size5		
前年計画数1色3サイズ6	PlannedQuantity1Color3Size6		
前年計画数1色4サイズ1	PlannedQuantity1Color4Size1		
前年計画数1色4サイズ2	PlannedQuantity1Color4Size2		
前年計画数1色4サイズ3	PlannedQuantity1Color4Size3		
前年計画数1色4サイズ4	PlannedQuantity1Color4Size4		
前年計画数1色4サイズ5	PlannedQuantity1Color4Size5		
前年計画数1色4サイズ6	PlannedQuantity1Color4Size6		
前年計画数2色1サイズ1	PlannedQuantity2Color1Size1		
前年計画数2色1サイズ2	PlannedQuantity2Color1Size2		
前年計画数2色1サイズ3	PlannedQuantity2Color1Size3		
前年計画数2色1サイズ4	PlannedQuantity2Color1Size4		
前年計画数2色1サイズ5	PlannedQuantity2Color1Size5		
前年計画数2色1サイズ6	PlannedQuantity2Color1Size6		
前年計画数2色2サイズ1	PlannedQuantity2Color2Size1		
前年計画数2色2サイズ2	PlannedQuantity2Color2Size2		
前年計画数2色2サイズ3	PlannedQuantity2Color2Size3		
前年計画数2色2サイズ4	PlannedQuantity2Color2Size4		
前年計画数2色2サイズ5	PlannedQuantity2Color2Size5		
前年計画数2色2サイズ6	PlannedQuantity2Color2Size6		
前年計画数2色3サイズ1	PlannedQuantity2Color3Size1		
前年計画数2色3サイズ2	PlannedQuantity2Color3Size2		
前年計画数2色3サイズ3	PlannedQuantity2Color3Size3		
前年計画数2色3サイズ4	PlannedQuantity2Color3Size4		
前年計画数2色3サイズ5	PlannedQuantity2Color3Size5		
前年計画数2色3サイズ6	PlannedQuantity2Color3Size6		
前年計画数2色4サイズ1	PlannedQuantity2Color4Size1		
前年計画数2色4サイズ2	PlannedQuantity2Color4Size2		
前年計画数2色4サイズ3	PlannedQuantity2Color4Size3		
前年計画数2色4サイズ4	PlannedQuantity2Color4Size4		
前年計画数2色4サイズ5	PlannedQuantity2Color4Size5		
前年計画数2色4サイズ6	PlannedQuantity2Color4Size6		
前年計画数3色1サイズ1	PlannedQuantity3Color1Size1		
前年計画数3色1サイズ2	PlannedQuantity3Color1Size2		
前年計画数3色1サイズ3	PlannedQuantity3Color1Size3		
前年計画数3色1サイズ4	PlannedQuantity3Color1Size4		
前年計画数3色1サイズ5	PlannedQuantity3Color1Size5		
前年計画数3色1サイズ6	PlannedQuantity3Color1Size6		
前年計画数3色2サイズ1	PlannedQuantity3Color2Size1		
前年計画数3色2サイズ2	PlannedQuantity3Color2Size2		
前年計画数3色2サイズ3	PlannedQuantity3Color2Size3		
前年計画数3色2サイズ4	PlannedQuantity3Color2Size4		
前年計画数3色2サイズ5	PlannedQuantity3Color2Size5		
前年計画数3色2サイズ6	PlannedQuantity3Color2Size6		
前年計画数3色3サイズ1	PlannedQuantity3Color3Size1		
前年計画数3色3サイズ2	PlannedQuantity3Color3Size2		
前年計画数3色3サイズ3	PlannedQuantity3Color3Size3		
前年計画数3色3サイズ4	PlannedQuantity3Color3Size4		
前年計画数3色3サイズ5	PlannedQuantity3Color3Size5		
前年計画数3色3サイズ6	PlannedQuantity3Color3Size6		
前年計画数3色4サイズ1	PlannedQuantity3Color4Size1		
前年計画数3色4サイズ2	PlannedQuantity3Color4Size2		
前年計画数3色4サイズ3	PlannedQuantity3Color4Size3		
前年計画数3色4サイズ4	PlannedQuantity3Color4Size4		
前年計画数3色4サイズ5	PlannedQuantity3Color4Size5		
前年計画数3色4サイズ6	PlannedQuantity3Color4Size6		
アソート数色1サイズ1	AssortmentQuantityColor1Size1		
アソート数色1サイズ2	AssortmentQuantityColor1Size2		
アソート数色1サイズ3	AssortmentQuantityColor1Size3		
アソート数色1サイズ4	AssortmentQuantityColor1Size4		
アソート数色1サイズ5	AssortmentQuantityColor1Size5		
アソート数色1サイズ6	AssortmentQuantityColor1Size6		
アソート数色2サイズ1	AssortmentQuantityColor2Size1		
アソート数色2サイズ2	AssortmentQuantityColor2Size2		
アソート数色2サイズ3	AssortmentQuantityColor2Size3		
アソート数色2サイズ4	AssortmentQuantityColor2Size4		
アソート数色2サイズ5	AssortmentQuantityColor2Size5		
アソート数色2サイズ6	AssortmentQuantityColor2Size6		
アソート数色3サイズ1	AssortmentQuantityColor3Size1		
アソート数色3サイズ2	AssortmentQuantityColor3Size2		
アソート数色3サイズ3	AssortmentQuantityColor3Size3		
アソート数色3サイズ4	AssortmentQuantityColor3Size4		
アソート数色3サイズ5	AssortmentQuantityColor3Size5		
アソート数色3サイズ6	AssortmentQuantityColor3Size6		
アソート数色4サイズ1	AssortmentQuantityColor4Size1		
アソート数色4サイズ2	AssortmentQuantityColor4Size2		
アソート数色4サイズ3	AssortmentQuantityColor4Size3		
アソート数色4サイズ4	AssortmentQuantityColor4Size4		
アソート数色4サイズ5	AssortmentQuantityColor4Size5		
アソート数色4サイズ6	AssortmentQuantityColor4Size6		
前年セット数	SetQuantity		
前年属性1	Attribute1		
前年属性2	Attribute2		
前年属性3	Attribute3		
前年属性4	Attribute4		
前年属性5	Attribute5		
前年属性6	Attribute6		
前年属性7	Attribute7		
前年属性8	Attribute8		
前年属性9	Attribute9		
前年属性10	Attribute10		
前年属性11	Attribute11		
前年属性12	Attribute12		
前年属性13	Attribute13		
前年属性14	Attribute14		</pre>
<pre>
**ビュー選択の仕組みをどうやって構築するか？ビューによってスイッチする方法は？**

前読み込みプラス参照切り替えを行う。

```jsx
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>ビュー切替テスト</title>
  <style>
    /* お好きに grid 定義 */
  </style>
</head>
<body>
  <div id="toolbar">
    <label for="viewSelect">ビュー：</label>
    <select id="viewSelect">
      <option value="defaultView">標準</option>
      <option value="compactView">コンパクト</option>
      <option value="detailView">詳細</option>
    </select>
  </div>
  <div id="table"></div>

  <!-- 外部ファイルを先に読み込んでおく -->
  <script src="views/defaultView.js"></script>
  <script src="views/compactView.js"></script>
  <script src="views/detailView.js"></script>

  <!-- main.js で window.structures を参照 -->
  <script src="main.js"></script>
</body>
</html>
```

```jsx
// views/defaultView.js
//window.＊＊はグローバルスコープの変数
window.structures = window.structures || {};
window.structures.defaultView = [
  { tag:'div', row:1, column:1, /* … */ },
  /* … */
];
```

```jsx
// main.js
const viewSelect = document.getElementById('viewSelect');
const table = document.getElementById('table');

function fetchDataAndRender(viewKey) {
  const structure = window.structures[viewKey];
  if (!structure) {
    console.error('構造データが存在しません:', viewKey);
    return;
  }
  //初期化
  const data = window.data || [];
  table.innerHTML = '';
  renderTable(structure, data);
}

viewSelect.addEventListener('change', () => {
  fetchDataAndRender(viewSelect.value);
});

document.addEventListener('DOMContentLoaded', () => {
  fetchDataAndRender(viewSelect.value);
});
```

**開発段階で(本番でも)、JSONを直接読み込ませる方法はあるか？**

これは難しいようだ。そして、開発中はjsファイルで管理して、本番でjsonに置き換えるというのは、一般的な方法らしい。

**データで前年と当年どのようにして結合するか？**

データもJSON形式です。データの一レコードは、単年のデータですが、画面をレンダーする時には、当年と前年をキーで結合して、セット表示します。この結合は、renderTableに、dataを渡す前に行い、dataのrecordは当年と前年が結合されています。

```jsx
/**
 * 当年・前年データをキーで合流（outer join）しつつ、どちらか一方にしかないキーも含める
 * @param {Array<Object>} currentData - 当年データ
 * @param {Array<Object>} prevData    - 前年データ
 * @param {string} key                - 結合キー属性名
 * @returns {Array<Object>}           - マージ後レコード配列
 */
function mergeAllKeys(currentData, prevData, key) {
  // 1) まずキー→レコードのマップを作成
  const currMap = {};
  currentData.forEach(r => { currMap[r[key]] = r; });
  const prevMap = {};
  prevData.forEach(r => { prevMap[r[key]] = r; });

  // 2) currentData と prevData のキーを両方取って Set 化
  const allKeys = new Set([
    ...currentData.map(r => r[key]),
    ...prevData.map(r => r[key])
  ]);

  // 3) すべてのキーについてマージレコードを作成
  const merged = [];
  allKeys.forEach(k => {
    const curr = currMap[k] || {};
    const prev = prevMap[k] || {};

    // 前年フィールドに _prev 接尾辞を付けつつ
    //Object.entries(prev):prevオブジェクトの [キー, 値] のペアを配列で取得
    // => [['品番', 'A001'], ['数量', 8]]
    //.reduce((acc, [field, val]) => { ... }, {})
    //reduce は配列の要素を一つずつ処理して、1つのオブジェクト（acc）を作成
    //初期値は {}
    const prevWithSuffix = Object.entries(prev).reduce((acc, [field, val]) => {
      acc[`${field}_prev`] = val;
      return acc;
    }, {});

    // マージして追加
    merged.push({
      // キー項目は必ず入れる
      [key]: k,
      ...curr,
      ...prevWithSuffix
    });
  });

  return merged;
}

// — 使用例 —
const currentData = [
  { 品番: 'A001', 数量: 10 },
  { 品番: 'B123', 数量: 5 },
];
const prevData = [
  { 品番: 'A001', 数量: 8 },
  { 品番: 'C999', 数量: 12 },
];

console.log( mergeAllKeys(currentData, prevData, '品番') );
/* 出力例:
[
  { 品番:'A001', 数量:10, 数量_prev:8 },
  { 品番:'B123', 数量:5 },
  { 品番:'C999', 数量_prev:12 }
]
*/
```

画像の読み込みと登録。

集計。

**selectタグの選択肢をどうやって管理するか？**

optionListを定義し、structureにマージする。structureにoption keyが必要。

```jsx
export const optionLists = {
  clients: [
    { value: 'A', label: 'A商事' },
    { value: 'B', label: 'B商事' },
    // …
  ],
  // 他のリストも同じidで
};
```

```jsx
// init.js

function mergeOptions(nodes) {
  return nodes.map(node => {
    let merged = { ...node };
    if (node.tag === 'select') {
      // node.id をキーに使う
      const opts = optionLists[node.id] || [];
      merged.children = opts.map(o => ({
        tag:   'option',
        value: o.value,
        text:  o.label,
      }));
    }
    if (node.children) {
      merged.children = mergeOptions(merged.children);
    }
    return merged;
  });
}

export const structure = mergeOptions(rawStructure);
```

function adjustGridBorders(gridContainer) {
    // 対象となる「このグリッド」の直下のセルだけを取得
    const cells = Array.from(gridContainer.children);

    let maxRow = 1;
    let maxCol = 1;

    const cellPositions = cells.map(cell => {
        const row = parseInt(cell.style.gridRow || '1', 10);
        const col = parseInt(cell.style.gridColumn || '1', 10);

        if (row > maxRow) maxRow = row;
        if (col > maxCol) maxCol = col;

        return { cell, row, col };
    });

    // 線をいったん全体に引いて、右端・下端だけ消す
    cellPositions.forEach(({ cell, row, col }) => {
        cell.style.borderRight = '1px solid #ccc';
        cell.style.borderBottom = '1px solid #ccc';

        if (col === maxCol) cell.style.borderRight = 'none';
        if (row === maxRow) cell.style.borderBottom = 'none';
    });

    // 外枠
    gridContainer.style.outline = '1px solid #ccc';

    // ⬇️ 再帰的にネストされたグリッドにも適用
    Array.from(gridContainer.children).forEach(child => {
        if (child.style.display === 'grid') {
            adjustGridBorders(child);
        }
    });
}

</pre>
</body>

</html>
