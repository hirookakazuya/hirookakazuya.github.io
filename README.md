<pre>

1.画面のレンダリング
 
 目的：一覧画面でデータのレコード数に合わせたリストを作成すること。
 　　　表示するフィールドやその配置を切り替えできるようにすること。
 
 内容：データ（json）とレイアウト（json）をレンダリング関数（JavaScript）に引数として渡し、品番別の一覧画面を作成する。
 
 方法：データは以下のような形式。

 　　　レイアウトは以下のような形式。

 　　　renderNode(layout,data)のようにデータとレイアウトを関数の引数として渡し、DOM API(document.createElement(),
      object.appendChild())によってDOM要素を動的に作成する。
 　　　レイアウトは一品番毎のテーブルを構成する単位構造のレイアウトであり、この単位構造をデータ数分繰り返すことでテーブルを
 　　　作成する。
 　　　データは画面の読み込みのタイミングでデータベースから取得する。
 　　　レイアウトは開発フォルダ内にパラメータとして格納する。
 　　　レイアウトデータはエクセルシートで内容を入力し、VBAでjsonファイルを出力する。
 
 補足：罫線と背景色もJavaScriptの関数で作成（adjustBorderLine,adjustBackgroundColor）

 コード：
 ※以下、画面作成の主要な部分のみ表示。
 
        const renderTable = (mountPintId, tablelayout, data, startIndex, endIndex, className, selectOption) => {
            const table = document.getelementById(mountPointId);
            if (!table) {
                console.warn(`element with ID '${mountPointId}' not found.`);
                return;
            }
            const fragment = document.createDocumentFragment();
            let i = 0;
            const slicedData = data.slice(startIndex, endIndex);
            slicedData.forEach((record, index) => {
                const rowWrapper = doocument.createelement('div');
                rowWrapper.syle.display = 'grid';
                rowWrapper.classList.add(className);
                rowWrapper.style.gridRow = String(i);
                let nodeToRender;
                if (index === 0) {
                    nodeToRender = tablelayout;
                } else {
                    nodeToRender = tablelayout.filter(node => Number(node.row) !== 1);
                }
                nodeToRender.forEach(node => {
                    const rendered = renderNode(node, record, selectOption);
                    if (rendered instanceof Node) {
                        rowWrapper.appendChild(rendered);
                    } else {
                        console.warn(`renderNode returned nn-node for`, node);
                    }
                });
                fragment.appendChild(rowWrapper);
                i++;
            });
            table.innerHTML = '';
            table.appendChild(fragment);
            adjustBorderLine(table);
            adjustBackgroundColor(table);
        };

        const renderNode = (node, record, selectOption) => {
            if (!node.tag) throw new Error("node.tag is required");
            const el = document.createelement(node.tag);
            const attributes = ['id', 'class', 'for', 'name', 'value', 'type'];
            attributes.forEach(attribute => {
                if (node[attribute]) el.setAtribute(attribute, node[attribute]);
            });
            if (node.row) el.style.gridRow = node.row;
            if (node.column) el.style.gridColumn = node.column;
            if (node.text) el.textContent = node.text;
            if (node.tag.toLowerCase() === 'input') {
                if (node.field && record && record[node.field]) {
                    el.value = record[node.field];
                }
            }
            if (node.tag.toLowerCase() === 'select') {
                if (selectOption && node.id && selectOption[node.class]) {
                    const options = selectOption[node.class];
                    Object.entries(options).forEach(([key, value]) => {
                        const option = document.createelement('option');
                        option.value = value;
                        option.textContent = value;
                        el.appendChild(option);
                    });
                }
            }
            if (node.tag.toLowerCase() === 'button') {
                if (record && record.ManagementNo) {
                    el.onclock() = () => showModal(record.ManagementNo);
                }
            }
            if (Array.isArray(node.children)) {
                el.style.display = 'grid';
                const fragment = document.createDocumentFragment();
                node.children.forEach(child => {
                    fragment.appendChild(renderNode(child, record, selectOption));
                });
                el.appendChild(fragment);
            }
            return el;
        };

2.ビューによる表示の切り替え

 目的：ユーザの種類や作業のプロセスに合わせて表示を切り替えできること。任意の表示パターンを拡張できること。
 
 内容：ビューの切り替えにより、テーブルのフィールドと配置を切り替えること。フィルタ、集計項目も同様にビューと連動させること。
 　　　レイアウトをjson形式で作成し、パラメータとして開発フォルダに格納する。
 
 方法：ビューをリストから選択し、ボタンをクリックすると、イベント発火する。
 　　　選択したビューに対応する以下の項目をマスタから取得する。
 　　　①フィルタレイアウト、②集計レイアウト、③テーブルレイアウト、④ページあたりのアイテム数
 　　　マスタはjson配列で開発フォルダ内に格納されている。
 　　　上記で取得したレイアウトデータを画面レンダリング関数に渡し、ページを作成する。
 
 補足：イベント発火では、直接画面レンダリングの関数を呼び出すのではなく、状態管理関数にパラメータをセットする。
 　　　自動的に状態管理関数に登録されたレンダリングが呼び出される仕組み。

 コード：
※以下、イベント発火の部分だけを記載、その後の動作は下記、状態管理の項目に記載する。
 
        document.getelementById('view').addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const selects = document.getelementById('view').querySelectorAll('select');
                const currentViewData = { ...controlStore.getState().viewData };
                selects.forEach(select => {
                    currentViewData[select.id] = select.value;
                });
                const currentPaginationData = { ...controlStore.getState().pagination };
                currentPaginationData.currentPage = 1;
                contrlStore.setState({ viewData: currentViewData, pagination: currentPaginationData })
            }
        });

3.状態管理

 目的：ビューやフィルタなどの状態を一元管理して、画面の変更と連動させる。
　　　　ユーザが画面を開いたときに、前回ログイン時の状態をデータベースから呼び出す。
 
 内容：状態管理用の関数(controlStore)を作り、状態管理する。
 
 方法：controlStoreは以下のメソッドを持たせる。
　　　　getState():現在の状態を取得する。
      setState():状態を更新する。
      subscribe():状態が更新されたときに実行する関数を登録する。
      
      subscribe()には、現在のビューやフィルタの状態を使って、画面を再レンダリングする関数を登録する。
      
      画面更新の流れは以下。
      1.ビューをリストから選択し、ボタンをクリックする。
      　ボタンにはonclickイベントが設定されている。
      2.イベント内で、setState()を実行し、ビューの状態を更新する。
      3.setState()により、自動的に登録された画面更新の関数が実行される。
      
 補足：データベース未作成。
　　　　画面読み込みの際には、データベースから取得した値を状態管理関数に設定する。

 コード:
const createStore = (initialState) => {
  let state = { ...initialState };
  const listeners = new Set();

  const getState = () => ({ ...state });

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

  return { getState, setState, subscribe };
};



4.当年と前年のデータの結合

 目的：画面上で当年と前年の品番を並べて表示すること。
 
 内容：データベースでは当年と前年は別のデータだが、フロント側で
　　　　PositionNoをキーにして、同年と前年を結合し、一つのレコードにする。

 方法：1.json形式の各レコードを変形し、キーをPositionNo、値をレコードにする。
　　　　
      2.同年と前年のデータを合算して、重複のないPositionNoのリストを作成する。
      
      3.2.で作成したリストの各要素について、当年と前年のレコードを結合する。
      　※その際、前年レコードのキーには全て_prevを追加する。
 
 補足：別の方法も検討する。データベースに専用のテーブルを作成し、レコードの結合だけを管理。

 コード：

const mergeData = (currentData, prevData, key ) => {
  const merged = [];
  const currMap = {};
  currentData.forEach( r => { currMap[r[key]] = r;});
  const prevMap = {};
  prevData.forEach( r => { prevMap[r[key]] = r;});

  const allKeys = new Set([
    ...currentData.map(r => r[key]),
    ...prevData.map( r => r[key])
  ]);


  allKeys.forEach(k =>{
    const curr = currMap[k]||{};
    const prev = prevMap[k]||{};
  
    const prevWithSuffix = Object.entries(prev).reduce((acc,[field,val]) => {
      acc['${field}_prev'] = val;
      return acc;
    },{});
  
    merged.push({
      [key]:k,
      ...curr,
      ...prevWithSuffix
    });
  
　　});

  return merged;

};

5.ページネーション

 目的：エクセルのアウター仕入計画をブラウザで再現すると、ノード数が多く、画面描画に30秒ほどかかる。
　　　　描画時間の調整のため、ページネーションで10アイテムごとに分ける。
 
 内容：
 
 方法：
 
 補足： 

6.フィルタ

 目的：
 
 内容：
 
 方法：
 
 補足：
 
7.入力制御

 目的：
 
 内容：
 
 方法：
 
 補足：
 
8.開発フォルダ

 目的：
 
 内容：
 
 方法：
 
 補足：
 
</pre>


 
