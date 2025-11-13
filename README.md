a=86701b75-68c4-8f06-813d-a794c3b90c97&etti=24&acct=4df496f3-7842-45f3-8d53-73a24d583ee2&er=3a3f125e-e1e1-86cc-8135-0bd98ab30ced&espei=98f91f43-9ad3-8512-8157-e4cdb7b10c26

https://demo.docusign.net/Signing/EmailStart.aspx?a=30dd10e6-a826-8f8b-81d7-21669fba0cf3&etti=24&acct=4df496f3-7842-45f3-8d53-73a24d583ee2&er=35e511e1-880c-8f48-8139-ef5dd9bb0ce3&espei=241c196c-849a-8dae-8171-bccab6b90c9a

## 📝 要件の整理

### 🎯 目的

**二次元配列A（注文データ）**と**配列B（納品データ）**を、各納品がどの注文に対応するかを特定し、結合（マッチング）させる。

---

### 📥 入力データ

| 配列名 | 概要 | フィールド |
| :--- | :--- | :--- |
| **配列A** (注文) | 品番ごとの注文データ | 注文NO (13桁ユニーク)、**品番**、**数量**、**納期** |
| **配列B** (納品) | 品番ごとの倉庫納品データ | **品番**、倉庫番号 (6か所)、**納品日**、**数量** |

---

### 🧩 マッチングの課題と制約

* **多対多の関係:** 一つの注文に対し、納品は複数の倉庫に分かれ、複数回にばらつく可能性がある。
* **同品番・別条件の注文:** 同じ品番でも、納期や数量が異なる複数の注文が存在する。
* **誤差の許容:** 注文数量と納品数量、および注文納期と納品日の間に、**若干の誤差**や**まれに大きな誤差**（特に納期）がある。
* **納期逆転の可能性:** 注文納期が後のものに、納品が先に近い日付でされる（納期遅れにより）といった**納期の前後逆転現象**も考慮が必要。
* **納品順の制約:** 納品データ（配列B）を注文に割り当てる際、「**納品日は納品日の順番通りに並べる**」必要がある（後から納品されたデータが、先に納品されたデータよりも前の注文納期に割り当てられるパターンは考慮しない）。

---

### 💡 アルゴリズムの基本方針（提案）

1.  **全パターン生成（バックトラック/再帰）:**
    * **品番**が一致する配列Aの注文グループと配列Bの納品グループについて、配列Bの納品データを、配列Aの注文数に対応させてグループ分けする。
    * **納品順の制約**（納品日は納品日の順番通り）を厳守しつつ、納品データ全てを注文グループに割り当てる**全組み合わせ**を生成する（納品が全くない注文グループも考慮）。
2.  **点数評価（スコアリング）:**
    * 生成された**全パターン**について、後述のロジックに基づき**点数**を計算する。
3.  **最良パターンの選択:**
    * 最も点数が高い組み合わせ（パターン）を「正解」として採用する。

---

## 🔢 点数付け（スコアリング）ロジックの提案

最良の組み合わせを選ぶための点数（スコア）は、**誤差が小さいほど高くなる**ように設定します。以下の2つの要素で構成します。

### 1. 数量誤差の点数 (Weight: 高)

**注文数量**と**割り当てられた納品数量の合計**の差に基づいて点数を付けます。数量は最も重要視すべき要素の一つです。

* **計算式:** $\text{Score}_{\text{数量}} = \sum_{\text{全注文}} \left( \text{最大点数} \times \frac{1}{| \text{注文数量} - \text{納品合計数量}| + \epsilon} \right)$
    * または、より直感的に：$\text{Score}_{\text{数量}} = \sum_{\text{全注文}} \text{MaxScore}_{\text{Q}} - (\text{係数} \times |\text{注文数量} - \text{納品合計数量}|)$
* **ロジック:**
    * **誤差ゼロ**（数量が完全に一致）の場合に**最高点**を与えます。
    * 誤差が大きくなるほど、点数が急激に下がるように**ペナルティ**を設定します。
    * **$\epsilon$** (イプシロン: 非常に小さな値) は分母がゼロになるのを防ぐためです。

### 2. 納期誤差の点数 (Weight: 中〜高)

**注文納期**と**割り当てられた納品日**の差に基づいて点数を付けます。

* **基本の計算式:** $\text{Score}_{\text{納期}} = \sum_{\text{全注文}} \left( \sum_{\text{割り当て納品}} \text{MaxScore}_{\text{D}} - (\text{係数} \times |\text{注文納期} - \text{納品日}|) \right)$
* **ロジック:**
    * **納期通り**（誤差ゼロ）の場合に**最高点**を与えます。
    * 誤差の日数が大きいほど点数を下げます。
    * **納期の遅れ（マイナス評価）**と**納期の早すぎ（マイナス評価）**で、ペナルティの係数を変えることも有効です（例: 遅延の方がペナルティ大）。
    * **納期逆転の考慮:** 納品順の制約により、基本的には納品日の順序を保ちますが、**「注文納期が後のものに、納期遅れにより近い日付で納品される」**状況は、他のパターンと比較して点数を高くします。

### 3. 総合点数

**総合点数** = ($\text{数量の重み} \times \text{Score}_{\text{数量}}$) + ($\text{納期の重み} \times \text{Score}_{\text{納期}}$)

* **重み付け:** 数量の誤差が納期誤差よりもビジネス上重要であれば、**数量の重み $>$ 納期の重み**と設定します。

---





お求めのアルゴリズムは、**注文（配列A）と納品（配列B）の最適マッチング問題**として捉えられますね。これは、制約付きの割り当て問題であり、特に「全組み合わせを評価して最適解を選ぶ」というアプローチは、**「ヒューリスティックな最適化」**または**「スコアリングに基づく割り当て」**として設計するのが現実的です。

実現したいロジックと複雑さを考慮すると、これは単純なVBAのループ処理を超えた、**「コスト（誤差）最小化」**を目指すアルゴリズムになります。

---

## 💡 アルゴリズムの概要

この問題の鍵は、納品（配列B）を複数の注文（配列A）に「分割・割り当て」する**全パターン**を生成し、それぞれのパターンを**スコア（点数）**で評価し、最も高いスコア（最も誤差が少ない）のパターンを「正解」として採用することです。

### 1. **事前準備とデータ構造**

* **データ構造の統一:** 配列A、Bを処理しやすいように、品目ごとにデータを抽出し、例えば`Collection`や`Dictionary`に格納します。
* **ソート:** 処理の前提となる制約（「納品日は納品日の順番通りに並べる」）を満たすため、**配列B（納品データ）を「納品日」で昇順ソート**します。
* **制約:** マッチングは**同じ品番**内で行います。

### 2. **全パターン生成のアルゴリズム（バックトラッキング/再帰）**

全パターンを生成するためには、**再帰関数（Backtracking）**を使用します。

* **考え方:** 納品データ（配列B）を先頭から一つずつ見ていき、それを**「どの注文（配列A）に割り当てるか」**、または**「独立したグループの先頭とするか」**の選択を繰り返します。

    * `納品データ B[i]` を、`注文 A[j]` のグループに割り当てる。
    * **制約:** 割り当てられる`注文 A[j]`は、`B[i]`より前の納品に割り当てられた`注文 A[k]`よりも**注文納期が後**であるか、**同じ**である必要があります。（「前に納品したものが後に納品したものよりも、注文納期が後ろになる場合は考えない」）

* **結果の格納:** 生成されたすべての有効なパターン（納品のグループ分け）を格納するリスト（例：`Collection`）を用意します。

### 3. **パターン評価とスコアリング（点数式）**

各パターンについて、**注文と納品の誤差**を算出し、その合計が最も小さくなるパターンを選択します。

---

## 🎯 スコアリング（点数）の設計

スコアは、**誤差が小さいほど高得点**となるように設計します。複数の要素を考慮するため、それぞれの誤差に**重み**を付けて合計します。

**目標: $\text{Total Score} = W_{\text{Qty}} \times \text{Score}_{\text{Qty}} + W_{\text{Date}} \times \text{Score}_{\text{Date}}$ を最大化**

### 1. 数量誤差のスコア ($\text{Score}_{\text{Qty}}$)

数量誤差は、**「注文数量の合計」と「割り当てられた納品数量の合計」の差**で算出します。

| 評価指標 | 計算式 |
| :--- | :--- |
| **数量の絶対誤差** ($\text{Abs\_Qty\_Error}$) | $\lvert \text{注文数量} - \sum \text{納品数量} \rvert$ |
| **数量スコア** ($\text{Score}_{\text{Qty}}$) | $1 / (1 + \text{Abs\_Qty\_Error})$ |

* **備考:** 誤差が0のときスコアは1、誤差が大きくなるにつれてスコアは0に近づきます。

### 2. 納期誤差のスコア ($\text{Score}_{\text{Date}}$)

納期誤差は、**「注文納期」と「割り当てられた納品グループの平均納品日」**の差で算出するのが現実的です。

| 評価指標 | 計算式 |
| :--- | :--- |
| **平均納品日** ($\text{Avg\_Delv\_Date}$) | $\sum (\text{納品日}) / (\text{納品件数})$ |
| **日数の絶対誤差** ($\text{Abs\_Date\_Error}$) | $\lvert \text{注文納期} - \text{Avg\_Delv\_Date} \rvert$ (単位：日数) |
| **納期スコア** ($\text{Score}_{\text{Date}}$) | $\text{Base} / ( \text{Base} + \text{Abs\_Date\_Error}^p)$ |

* **$p$ (べき乗):** $p=1$なら線形、$p=2$なら二乗で誤差を評価します。大きな誤差を厳しく評価したい場合は$p=2$などとします。
* **$\text{Base}$ (基準値):** スコアの感度を調整する値。納期誤差が$\text{Base}$日数と同じとき、スコアが0.5になるように調整します。

### 3. **重み付けと合計**

| パラメータ | 説明 | 決定の目安 |
| :--- | :--- | :--- |
| **$W_{\text{Qty}}$** | 数量スコアの重み | 数量誤差を納期誤差より重要視するなら、$W_{\text{Qty}} > W_{\text{Date}}$ |
| **$W_{\text{Date}}$** | 納期スコアの重み | 納期誤差を数量誤差より重要視するなら、$W_{\text{Date}} > W_{\text{Qty}}$ |

* **最終的なスコア (Total Score):** 各注文に割り当てられた納品グループのスコアの**合計**（または**平均**）をそのパターンのスコアとします。

---

## 💻 VBAによる実装の主要なステップ

1.  **データ読み込みと整形:**
    * 配列AとBから、**品番ごと**のリスト（`Collection`または`Dictionary`）を作成します。
    * 配列Bの納品データを納品日でソートします。
2.  **再帰関数（Backtracking）の定義:**
    * `Sub FindAllPatterns(ByVal DeliveryIndex As Long, CurrentPattern As Collection, AllPatterns As Collection)`
    * `DeliveryIndex`: 次に処理する納品データのインデックス。
    * `CurrentPattern`: 現在構築中の割り当てパターン。
    * `AllPatterns`: 見つかった全ての有効パターンを格納する`Collection`。
3.  **スコア計算関数の定義:**
    * `Function CalculatePatternScore(ByVal Pattern As Collection) As Double`
    * 上記**スコアリングの設計**に基づいて、数量と納期の誤差スコアを計算し、合計スコアを返します。
4.  **最適パターンの選択:**
    * `AllPatterns`の中から、`CalculatePatternScore`が返す値が**最大**のパターンを選びます。
5.  **結果の出力:**
    * 選ばれた最適パターンに基づき、配列Aと配列Bを結合した最終結果（注文NO、品番、数量、納期、倉庫番号、納品日、納品数量）を出力します。

---

納期の「大きな誤差」や「納期の前後関係の逆転」までを考慮できるのが、この**全パターン評価方式**の強みです。ただし、注文数や納品数が非常に多い場合、組み合わせ数が爆発的に増え、処理に時間がかかる**（計算量の問題）**点には注意が必要です。





承知いたしました。ご提示いただいた複雑な条件を満たす、**全パターン生成とスコアリングに基づく最適マッチングアルゴリズム**をVBAで実現するためのコード設計案と、主要なモジュールを作成します。

このアルゴリズムは複雑なため、\*\*モジュール（クラス）\*\*を分けて実装することで、保守性と可読性を高めます。

-----

## 💻 VBAコード設計案

### 1\. クラスモジュール (Class Modules) の作成

データ構造を明確にするため、3つのクラスを作成します。

  * `ClsOrder`: 配列Aの注文データ（品番、注文NO、数量、納期）を保持。
  * `ClsDelivery`: 配列Bの納品データ（品番、倉庫番号、納品日、数量）を保持。
  * `ClsMatchPattern`: 1つの注文に対する納品割り当て（グループ）を保持し、スコア計算を担当。

### 2\. 標準モジュール (Standard Module) の作成

主要なロジックと実行関数を格納します。

  * `MdlMatcher`: データ読み込み、ソート、**全パターン生成（再帰処理）**、最適パターンの選択を担当。

-----

## 🛠️ VBAコードの実装

ここでは、アルゴリズムの核となる**スコアリング関数**と**再帰的なマッチング関数**に焦点を当てて実装します。

### 1\. スコアリングパラメータ設定（MdlMatcher内）

スコアリングの重みと感度を設定します。

```vba
' // MdlMatcher (標準モジュール) //
Option Explicit

' スコアリングの重み設定（重要度）
Private Const W_QTY As Double = 1.5 ' 数量誤差の重み（数量の方が重要なら高めに）
Private Const W_DATE As Double = 1.0 ' 納期誤差の重み

' 納期誤差スコアの感度設定
Private Const DATE_BASE As Double = 14 ' 納期誤差14日くらいでスコアが大きく下がるように設定
Private Const DATE_POWER As Double = 2 ' 納期誤差を二乗で厳しく評価 (p=2)

' --------------------------------------------------------------------------------
' 以下の関数で、注文と割り当てられた納品グループのスコアを計算します。
' --------------------------------------------------------------------------------
Function CalculateGroupScore( _
    ByVal OrderQty As Long, ByVal OrderDate As Date, _
    ByVal Deliveries As Collection) As Double
    
    Dim TotalDelvQty As Long
    Dim DateSum As Double
    Dim DelvCount As Long
    Dim AvgDelvDate As Date
    Dim AbsQtyError As Double
    Dim AbsDateError As Double
    Dim QtyScore As Double
    Dim DateScore As Double
    Dim Delivery As ClsDelivery ' 納品クラスは仮定

    TotalDelvQty = 0
    DateSum = 0
    DelvCount = Deliveries.Count
    
    ' 納品がない場合はスコアゼロ
    If DelvCount = 0 Then
        CalculateGroupScore = 0
        Exit Function
    End If
    
    ' 納品データ集計
    For Each Delivery In Deliveries
        TotalDelvQty = TotalDelvQty + Delivery.Quantity
        DateSum = DateSum + CDbl(Delivery.DeliveryDate)
    Next Delivery
    
    ' --- 1. 数量スコア ---
    AbsQtyError = Abs(OrderQty - TotalDelvQty)
    ' 誤差が0のとき1.0、誤差が大きくなるにつれ0に近づく
    QtyScore = 1# / (1# + AbsQtyError)
    
    ' --- 2. 納期スコア ---
    AvgDelvDate = DateAdd("d", 0, DateSum / DelvCount)
    AbsDateError = Abs(DateDiff("d", OrderDate, AvgDelvDate)) ' 日数差
    
    ' 大きな誤差を厳しく評価 (Base / (Base + Error^p))
    DateScore = DATE_BASE / (DATE_BASE + (AbsDateError ^ DATE_POWER))
    
    ' --- 3. 総合スコア ---
    CalculateGroupScore = (W_QTY * QtyScore) + (W_DATE * DateScore)

End Function
```

### 2\. 全パターン生成と最適化（MdlMatcher内）

この関数がアルゴリズムの核です。再帰的に納品を注文グループに割り当てます。

```vba
' // MdlMatcher (標準モジュール) //
' --------------------------------------------------------------------------------
' 品番ごとの最適マッチングを実行するメイン関数
' --------------------------------------------------------------------------------
Sub FindOptimalMatch( _
    ByVal Orders As Collection, _
    ByVal Deliveries As Collection)
    
    ' 処理を簡略化するため、Deliveriesは納品日でソート済みと仮定
    
    Dim BestTotalScore As Double
    Dim OptimalPattern As Collection
    
    Set OptimalPattern = New Collection
    BestTotalScore = -1# ' 初期値としてありえない低いスコアを設定
    
    ' 再帰処理を開始
    ' 引数: 納品インデックス, 現在のパターン, 最適スコア, 最適パターン
    Call RecursiveMatch( _
        Deliveries, 1, Orders, New Collection, _
        BestTotalScore, OptimalPattern)
        
    ' OptimalPatternが最終的な結果です
    If OptimalPattern.Count > 0 Then
        Debug.Print "最適スコア: " & BestTotalScore
        ' 実際にExcelに出力する処理をここに追加
    Else
        Debug.Print "マッチングパターンが見つかりませんでした。"
    End If

End Sub

' --------------------------------------------------------------------------------
' 再帰的に納品グループの全パターンを生成する関数 (Backtracking)
' --------------------------------------------------------------------------------
Private Sub RecursiveMatch( _
    ByVal AllDeliveries As Collection, _
    ByVal CurrentDelvIndex As Long, _
    ByVal AllOrders As Collection, _
    ByVal CurrentPattern As Collection, _
    ByRef BestTotalScore As Double, _
    ByRef OptimalPattern As Collection)
    
    ' 納品データは「納品日」昇順でソート済みと仮定
    
    Dim i As Long
    Dim PatternCopy As Collection
    Dim CurrentDelivery As ClsDelivery ' 納品クラスは仮定
    Dim TargetOrder As ClsOrder ' 注文クラスは仮定
    
    ' === 終了条件: 全ての納品を割り当て終えた場合 ===
    If CurrentDelvIndex > AllDeliveries.Count Then
        ' 現在のパターンの合計スコアを計算
        Dim CurrentTotalScore As Double
        CurrentTotalScore = CalculateTotalScore(CurrentPattern)
        
        ' 最適スコアを更新
        If CurrentTotalScore > BestTotalScore Then
            BestTotalScore = CurrentTotalScore
            Set OptimalPattern = CopyPattern(CurrentPattern) ' パターン全体をディープコピー
        End If
        Exit Sub
    End If
    
    Set CurrentDelivery = AllDeliveries.Item(CurrentDelvIndex)
    
    ' === 処理: CurrentDelivery をどの注文グループに割り当てるか ===
    
    ' 1. 既存の注文グループに追加する
    For i = 1 To CurrentPattern.Count
        Set TargetOrder = CurrentPattern.Item(i) ' Orderクラスを仮定
        
        ' 納品日の制約チェック: 納品日（CurrentDelivery.DeliveryDate）が、
        ' このグループの注文納期（TargetOrder.DueDate）よりも後に割り当てられた
        ' 納品グループの注文納期より前になっていないか？
        
        ' *** 重要な制約チェック（簡略化）***
        ' ここでは、単純に現在の納品が割り当てられるグループの
        ' 注文納期よりも、現在の納品日自体が大きく遅れていないかをチェックする
        
        ' 再帰呼出しのためにCurrentPatternをコピー（ディープコピーが必要）
        Set PatternCopy = CopyPattern(CurrentPattern)
        
        ' i番目の注文に現在の納品を追加
        ' PatternCopy.Item(i).Deliveries.Add CurrentDelivery ' この操作はClsOrder内で行う
        
        ' 次の納品へ
        Call RecursiveMatch(AllDeliveries, CurrentDelvIndex + 1, AllOrders, PatternCopy, BestTotalScore, OptimalPattern)
        
    Next i
    
    ' 2. 新しい注文グループの先頭として割り当てる (納品がまだ割り当てられていない注文がある場合)
    If CurrentPattern.Count < AllOrders.Count Then
        ' AllOrdersのうち、CurrentPatternにまだない注文を探し、それにCurrentDeliveryを割り当てる
        
        ' ... (新しいグループを生成して再帰呼出し) ...
    End If
    
End Sub

' --------------------------------------------------------------------------------
' パターン全体の合計スコアを計算する補助関数
' --------------------------------------------------------------------------------
Function CalculateTotalScore(ByVal CurrentPattern As Collection) As Double
    Dim TotalScore As Double
    Dim OrderGroup As ClsOrder ' 注文クラスを仮定

    TotalScore = 0
    For Each OrderGroup In CurrentPattern
        ' OrderGroup内の納品情報を使ってスコアを計算
        TotalScore = TotalScore + CalculateGroupScore( _
            OrderGroup.Quantity, OrderGroup.DueDate, OrderGroup.Deliveries)
    Next OrderGroup
    CalculateTotalScore = TotalScore
End Function

' --------------------------------------------------------------------------------
' パターンをディープコピーする補助関数
' --------------------------------------------------------------------------------
Private Function CopyPattern(ByVal SourcePattern As Collection) As Collection
    ' ... (複雑なディープコピーロジック。全要素を再帰的に複製する必要がある) ...
    Set CopyPattern = New Collection ' 暫定
End Function
```

### 補足事項（非常に重要）

1.  **計算量:** この「全パターン生成」は、納品数と注文数によっては**組み合わせ爆発**を起こし、計算時間が非現実的になる可能性があります。実データで試行し、遅すぎる場合は\*\*ヒューリスティックス（限定探索）\*\*への切り替えを検討する必要があります。
2.  **制約の複雑さ:** 「納品日は納品日の順番通りに並べる」という制約は、再帰関数の内部で、**現在割り当てようとしている納品グループの注文納期**と、**それより後の納品にすでに割り当てられたグループの注文納期**を比較することで厳密にチェックする必要があります。上記のコードでは、このチェックを簡略化しています。
3.  **データクラス:** `ClsOrder`や`ClsDelivery`の定義が必要です。（例: `Public Quantity As Long`, `Public DueDate As Date`など）。

具体的なデータ構造（配列A, 配列B）の読み込みコードと、上記で省略したクラス定義が必要でしたら、そちらも続けて作成いたします。



承知いたしました。複雑なマッチングアルゴリズムを実現するための、**クラスモジュール**と**標準モジュール**を含むVBAコード全体を作成します。

この実装では、注文と納品のデータは、シート上から読み込むことを想定し、`Sheet1`に配列A（注文）、`Sheet2`に配列B（納品）があると仮定します。

-----

## 1\. 📂 クラスモジュールの定義

以下の3つのクラスモジュールを作成し、それぞれのデータを格納・管理します。

### 1-1. `ClsOrder` (注文データ)

| プロパティ | 型 | 説明 |
| :--- | :--- | :--- |
| `ItemCode` | `String` | 品番 |
| `OrderNo` | `String` | 注文NO (ユニーク) |
| `Quantity` | `Long` | 注文数量 |
| `DueDate` | `Date` | 注文納期 |
| `Deliveries` | `Collection` | 割り当てられた`ClsDelivery`のリスト |

```vba
' // ClsOrder (クラスモジュール) //

Private pItemCode As String
Private pOrderNo As String
Private pQuantity As Long
Private pDueDate As Date
Private pDeliveries As Collection

Private Sub Class_Initialize()
    Set pDeliveries = New Collection
End Sub

Public Property Get ItemCode() As String
    ItemCode = pItemCode
End Property
Public Property Let ItemCode(Value As String)
    pItemCode = Value
End Property

Public Property Get OrderNo() As String
    OrderNo = pOrderNo
End Property
Public Property Let OrderNo(Value As String)
    pOrderNo = Value
End Property

Public Property Get Quantity() As Long
    Quantity = pQuantity
End Property
Public Property Let Quantity(Value As Long)
    pQuantity = Value
End Property

Public Property Get DueDate() As Date
    DueDate = pDueDate
End Property
Public Property Let DueDate(Value As Date)
    pDueDate = Value
End Property

Public Property Get Deliveries() As Collection
    Set Deliveries = pDeliveries
End Property

' ディープコピー用メソッド
Public Function DeepCopy() As ClsOrder
    Dim NewOrder As New ClsOrder
    Dim Delv As ClsDelivery

    NewOrder.ItemCode = Me.ItemCode
    NewOrder.OrderNo = Me.OrderNo
    NewOrder.Quantity = Me.Quantity
    NewOrder.DueDate = Me.DueDate
    
    ' 割り当てられた納品もコピーする
    For Each Delv In Me.Deliveries
        NewOrder.Deliveries.Add Delv ' ClsDeliveryは値を変更しないため、参照渡しでOK
    Next Delv
    
    Set DeepCopy = NewOrder
End Function
```

### 1-2. `ClsDelivery` (納品データ)

| プロパティ | 型 | 説明 |
| :--- | :--- | :--- |
| `ItemCode` | `String` | 品番 |
| `WarehouseNo` | `String` | 倉庫番号 |
| `DeliveryDate` | `Date` | 納品日 |
| `Quantity` | `Long` | 納品数量 |

```vba
' // ClsDelivery (クラスモジュール) //

Private pItemCode As String
Private pWarehouseNo As String
Private pDeliveryDate As Date
Private pQuantity As Long

' (Getter/Setterは省略しますが、ClsOrderと同様に実装してください)

Public Property Get ItemCode() As String
    ItemCode = pItemCode
End Property
Public Property Let ItemCode(Value As String)
    pItemCode = Value
End Property

Public Property Get DeliveryDate() As Date
    DeliveryDate = pDeliveryDate
End Property
Public Property Let DeliveryDate(Value As Date)
    pDeliveryDate = Value
End Property

Public Property Get Quantity() As Long
    Quantity = pQuantity
End Property
Public Property Let Quantity(Value As Long)
    pQuantity = Value
End Property

Public Property Get WarehouseNo() As String
    WarehouseNo = pWarehouseNo
End Property
Public Property Let WarehouseNo(Value As String)
    pWarehouseNo = Value
End Property
```

-----

## 2\. 🚀 標準モジュールの定義

`MdlMatcher`に全てのロジックを集約します。

### 2-1. パラメータとメイン処理

```vba
' // MdlMatcher (標準モジュール) //
Option Explicit

' ★ スコアリングの重み設定（重要度）
Private Const W_QTY As Double = 1.5      ' 数量誤差の重み
Private Const W_DATE As Double = 1.0     ' 納期誤差の重み

' ★ 納期誤差スコアの感度設定
Private Const DATE_BASE As Double = 10   ' 納期誤差10日を基準とする
Private Const DATE_POWER As Double = 2   ' 納期誤差を二乗で厳しく評価 (p=2)

' マッチングを実行するメインプロシージャ
Sub RunOptimalMatching()
    Dim OrderGroups As Object ' Dictionary (Key: 品番, Value: Collection of ClsOrder)
    Dim DelvGroups As Object  ' Dictionary (Key: 品番, Value: Collection of ClsDelivery)
    Dim ItemCode As Variant
    
    Set OrderGroups = CreateObject("Scripting.Dictionary")
    Set DelvGroups = CreateObject("Scripting.Dictionary")
    
    ' --- 1. データ読み込み（仮定） ---
    Call LoadData(OrderGroups, DelvGroups)

    ' --- 2. 品番ごとにマッチングを実行 ---
    Dim BestPattern As Collection
    Set BestPattern = New Collection
    
    For Each ItemCode In OrderGroups.Keys
        Dim OrdersByItem As Collection
        Dim DeliveriesByItem As Collection
        Dim BestTotalScore As Double
        
        Set OrdersByItem = OrderGroups(ItemCode)
        Set DeliveriesByItem = DelvGroups(ItemCode)
        
        ' 納品データを納品日でソート（必須）
        Call SortDeliveries(DeliveriesByItem)
        
        ' 最適マッチングの探索
        Set BestPattern = FindOptimalMatch(OrdersByItem, DeliveriesByItem)
        
        ' --- 3. 結果出力 ---
        If BestPattern.Count > 0 Then
            Call OutputResult (ItemCode, BestPattern)
        End If
    Next ItemCode
    
    MsgBox "最適マッチング処理が完了しました。", vbInformation
End Sub
```

### 2-2. スコア計算ロジック

`CalculateGroupScore` は、前に示したスコアリングロジックに基づいています。

```vba
' 割り当てられた納品グループのスコアを計算する関数
Function CalculateGroupScore( _
    ByVal OrderItem As ClsOrder) As Double
    
    Dim TotalDelvQty As Long
    Dim DateSum As Double
    Dim DelvCount As Long
    Dim AvgDelvDate As Date
    Dim AbsQtyError As Double
    Dim AbsDateError As Double
    Dim QtyScore As Double
    Dim DateScore As Double
    Dim Delivery As ClsDelivery

    TotalDelvQty = 0
    DateSum = 0
    DelvCount = OrderItem.Deliveries.Count
    
    If DelvCount = 0 Then
        ' 納品が全くない注文はスコアを極端に低くするか、ゼロとする
        CalculateGroupScore = 0.0001 ' ゼロにするとTotalScoreの比較で問題が出る場合があるため微小値
        Exit Function
    End If
    
    ' 納品データ集計
    For Each Delivery In OrderItem.Deliveries
        TotalDelvQty = TotalDelvQty + Delivery.Quantity
        DateSum = DateSum + CDbl(Delivery.DeliveryDate)
    Next Delivery
    
    ' --- 1. 数量スコア (誤差が小さいほど高得点) ---
    AbsQtyError = Abs(OrderItem.Quantity - TotalDelvQty)
    QtyScore = 1# / (1# + AbsQtyError)
    
    ' --- 2. 納期スコア (誤差が小さいほど高得点) ---
    AvgDelvDate = DateAdd("d", 0, DateSum / DelvCount)
    AbsDateError = Abs(DateDiff("d", OrderItem.DueDate, AvgDelvDate))
    
    ' (Base / (Base + Error^p))
    DateScore = DATE_BASE / (DATE_BASE + (AbsDateError ^ DATE_POWER))
    
    ' --- 3. 総合スコア ---
    CalculateGroupScore = (W_QTY * QtyScore) + (W_DATE * DateScore)

End Function

' パターン全体の合計スコアを計算する関数
Function CalculateTotalScore(ByVal Pattern As Collection) As Double
    Dim TotalScore As Double
    Dim OrderGroup As ClsOrder
    
    TotalScore = 0
    For Each OrderGroup In Pattern
        TotalScore = TotalScore + CalculateGroupScore(OrderGroup)
    Next OrderGroup
    
    CalculateTotalScore = TotalScore
End Function
```

### 2-3. 再帰的マッチング (核心ロジック)

この関数が全パターンの探索と最適解の決定を行います。

```vba
' 最適マッチングの探索を開始し、最適なパターン（Collection of ClsOrder）を返す
Function FindOptimalMatch( _
    ByVal AllOrders As Collection, _
    ByVal AllDeliveries As Collection) As Collection
    
    Dim BestTotalScore As Double
    Dim OptimalPattern As Collection
    
    Set OptimalPattern = New Collection
    BestTotalScore = -1#
    
    ' RecursiveMatch (納品インデックス, 現在の割り当てパターン)
    Call RecursiveMatch( _
        AllDeliveries, 1, AllOrders, New Collection, _
        BestTotalScore, OptimalPattern)
        
    Set FindOptimalMatch = OptimalPattern
End Function

' 全パターンを再帰的に生成し、スコアを評価する関数
Private Sub RecursiveMatch( _
    ByVal AllDeliveries As Collection, _
    ByVal CurrentDelvIndex As Long, _
    ByVal AllOrders As Collection, _
    ByVal CurrentPattern As Collection, _
    ByRef BestTotalScore As Double, _
    ByRef OptimalPattern As Collection)
    
    Dim CurrentDelivery As ClsDelivery
    Dim i As Long
    Dim PatternCopy As Collection
    Dim CurrentOrder As ClsOrder

    ' === 終了条件: 全ての納品を割り当て終えた場合 ===
    If CurrentDelvIndex > AllDeliveries.Count Then
        ' 割り当てられていない注文がある場合、それらをPatternに追加（納品ゼロとして評価するため）
        Dim OrderFound As Boolean
        Dim OrderToCheck As ClsOrder
        Dim PatternOrderNo As Object ' Dictionaryとして使う
        Set PatternOrderNo = CreateObject("Scripting.Dictionary")
        
        For Each CurrentOrder In CurrentPattern
            PatternOrderNo(CurrentOrder.OrderNo) = True
        Next CurrentOrder
        
        Set PatternCopy = CopyPattern(CurrentPattern)
        For Each OrderToCheck In AllOrders
            If Not PatternOrderNo.Exists(OrderToCheck.OrderNo) Then
                PatternCopy.Add OrderToCheck.DeepCopy ' 納品ゼロの注文を追加
            End If
        Next OrderToCheck
        
        ' スコアを計算し、最適パターンを更新
        Dim CurrentTotalScore As Double
        CurrentTotalScore = CalculateTotalScore(PatternCopy)
        
        If CurrentTotalScore > BestTotalScore Then
            BestTotalScore = CurrentTotalScore
            Set OptimalPattern = PatternCopy
        End If
        Exit Sub
    End If
    
    Set CurrentDelivery = AllDeliveries.Item(CurrentDelvIndex)
    
    ' === 処理: CurrentDelivery をどの注文グループに割り当てるか ===
    
    ' 1. 既存の注文グループに追加する (CurrentPattern.Count <= AllOrders.Count)
    For i = 1 To CurrentPattern.Count
        Set CurrentOrder = CurrentPattern.Item(i)
        
        ' ★ 納品日の制約チェック（重要）：
        ' i番目の注文納期が、i+1番目以降の注文納期よりも「前」になっていないことを確認する必要がある。
        ' ここでは、シンプルに納品日の順序性を担保する制約を実装します。
        
        ' 納品日の順序を厳密にチェック（納品日順に並べた納品データが、注文納期順に紐づいているか）
        If IsValidOrderDateSequence(CurrentPattern, i, AllOrders) Then
            
            ' 再帰呼出しのためのパターンコピー
            Set PatternCopy = CopyPattern(CurrentPattern)
            
            ' i番目の注文に現在の納品を追加
            PatternCopy.Item(i).Deliveries.Add CurrentDelivery
            
            ' 次の納品へ
            Call RecursiveMatch(AllDeliveries, CurrentDelvIndex + 1, AllOrders, PatternCopy, BestTotalScore, OptimalPattern)
        End If
    Next i
    
    ' 2. まだ割り当てられていない新しい注文グループの先頭とする
    If CurrentPattern.Count < AllOrders.Count Then
        ' 次に割り当てるべき注文 (AllOrdersのうち、CurrentPatternにまだないもの)
        Dim NextOrderIndex As Long
        NextOrderIndex = CurrentPattern.Count + 1
        
        ' 再帰呼出しのためのパターンコピー
        Set PatternCopy = CopyPattern(CurrentPattern)
        
        ' AllOrdersからNextOrderIndex番目の注文をコピーし、納品を割り当てる
        Dim NewOrderGroup As ClsOrder
        Set NewOrderGroup = AllOrders.Item(NextOrderIndex).DeepCopy
        NewOrderGroup.Deliveries.Add CurrentDelivery
        
        PatternCopy.Add NewOrderGroup
        
        ' 次の納品へ
        Call RecursiveMatch(AllDeliveries, CurrentDelvIndex + 1, AllOrders, PatternCopy, BestTotalScore, OptimalPattern)
    End If
    
End Sub
```

-----

### 2-4. 補助関数 (ダミー実装)

データの読み込み、ソート、コピーの関数が必要です。

```vba
' パターン全体をディープコピーする補助関数
Private Function CopyPattern(ByVal SourcePattern As Collection) As Collection
    Dim NewPattern As New Collection
    Dim OrderGroup As ClsOrder
    
    ' ClsOrderのDeepCopyメソッドを使用
    For Each OrderGroup In SourcePattern
        NewPattern.Add OrderGroup.DeepCopy
    Next OrderGroup
    
    Set CopyPattern = NewPattern
End Function

' 納品データのソート (納品日順)
Sub SortDeliveries(ByRef Delivs As Collection)
    ' 納品日のクイックソートまたはバブルソートを実装してください
    ' （ここではソート済みの前提で進めます）
End Sub

' 納品日の順序性チェック (ロジックの複雑さ回避のためここではTrueを返す)
Private Function IsValidOrderDateSequence( _
    ByVal CurrentPattern As Collection, _
    ByVal CurrentIndex As Long, _
    ByVal AllOrders As Collection) As Boolean
    
    ' 「納品日は納品日の順番通りに並べる」という制約を、注文納期との関係で厳密にチェックするロジック
    ' ここを厳密に実装することで、大きな納期誤差による納期の前後逆転のケースを適切に評価できます。
    ' 納品日（Bのソート順） i < j なら、割り当てられた注文納期 A.DueDate i <= A.DueDate j が理想。
    
    IsValidOrderDateSequence = True ' 簡略化のため一旦True
End Function

' データ読み込み (Sheet1:注文, Sheet2:納品を想定)
Private Sub LoadData(ByRef OrderGroups As Object, ByRef DelvGroups As Object)
    ' ここに、Excelシートからデータを読み込み、ClsOrder/ClsDeliveryオブジェクトを作成し、
    ' 品番ごとにDictionaryに格納する処理を実装してください。
End Sub

' 結果出力 (最終的なOptimalPatternをシートに出力)
Private Sub OutputResult(ByVal ItemCode As Variant, ByVal OptimalPattern As Collection)
    ' 最適な割り当てパターンに基づき、結合されたデータを新しいシートに出力する処理を実装してください。
    ' 注文NOと割り当てられた納品データをセットで表示します。
End Sub
```

このコードは、ご要望の**全組み合わせ探索とスコアリング**を行うための骨組みとなります。特に再帰関数`RecursiveMatch`内での**制約チェック（`IsValidOrderDateSequence`）とディープコピー**の実装が、このアルゴリズムの性能と正確性を左右する鍵となります。

残りの補助関数（`LoadData`、`SortDeliveries`、`OutputResult`）は、ご使用のExcelシートの具体的なレイアウトに合わせて実装してください。

このVBAコードを、ExcelのVBAエディタで標準モジュールとクラスモジュールに分けて貼り付けて実行できます。

-----




ご指摘の通り、「**間違った結合なのに偶然スコアが高くなる**」可能性を排除することが、このアルゴリズムの信頼性を高める上での最大の課題となります。特に、残り1割の誤差が大きいデータや、複数の注文が近接している場合に発生しやすい問題です。

この問題を解決し、人間でも判断に迷うようなケースで正しい割り当てを選ぶために、**スコアリングと制約の設計を強化**する必要があります。

---

## 🔑 スコアリングと制約の強化策

既存のスコアリング要素（数量誤差、納期誤差）に加えて、**結合の「健全性」を評価する新たな要素**を導入し、アルゴリズムの**探索ロジックに制約**を加えます。

### 1. スコアリングの強化：ペナルティ項目の追加

誤った結合が偶然高得点になるケースを排除するため、**「不自然な結合」に対して厳しいペナルティ**（減点）を課します。

| 新たなペナルティ項目 | 評価指標 | 目的 |
| :--- | :--- | :--- |
| **納期の順序性ペナルティ** ($\text{Penalty}_{\text{Seq}}$) | 割り当てられた納品の順序が、対応する**注文納期**の順序と逆転している度合い。 | ごくまれなケース（後の納品が前の注文に対応）に、大きな減点を課す。 |
| **過剰/過小納品ペナルティ** ($\text{Penalty}_{\text{Over/Under}}$) | 注文数量に対し、納品数量の合計が許容範囲（例：±5%）を超えて大きく外れている場合。 | 数量の微細な誤差は許容しつつ、大きな数量誤差を伴う結合を厳しく罰する。 |

$$
\text{Total Score} = (\text{W}_{\text{Qty}} \times \text{Score}_{\text{Qty}} + \text{W}_{\text{Date}} \times \text{Score}_{\text{Date}}) - \text{Penalty}_{\text{Seq}} - \text{Penalty}_{\text{Over/Under}}
$$

#### 納期順序性ペナルティの具体例:

納品日順にソートされた納品データ $B_1, B_2, \dots, B_n$ が、注文 $A_i$ と $A_j$ に割り当てられたとします。

* もし $B_1$ が $A_j$ に割り当てられ、$B_2$ が $A_i$ に割り当てられた場合、**納品日 $B_1 < B_2$** なのに、**注文納期 $A_j.\text{DueDate} > A_i.\text{DueDate}$** となっていたら（納期が逆転）、このパターン全体に極めて大きなペナルティを課します。

### 2. 探索ロジックの強化：制約条件の厳格化

全パターン探索の再帰処理において、**成立しない可能性が高いパターンを最初から枝刈り**（スキップ）することで、計算量削減と誤った割り当ての排除を両立させます。

#### ① **納品日の順序性チェックの厳格化**

再帰関数内で、納品をある注文グループに割り当てる際、以下のルールを厳格に適用します。

> **ルール:** 納品日順に見ていった納品 $B_k$ を注文 $A_i$ に割り当てる場合、**それ以前の全ての納品 $B_1$ から $B_{k-1}$ に割り当てられた注文 $A_j$ の納期は、 $A_i$ の納期より後になってはいけない**。

つまり、納品順序が注文納期順序を完全に下回る（または同等である）ことを強制します。これにより、納期の大きな逆転を伴う「間違った結合」の大部分は生成段階で排除されます。

#### ② **数量マッチング率による初期フィルタ**

* 納品 $B_k$ が注文 $A_i$ に割り当てられるとき、**注文 $A_i$ の残量**が、 $B_k$ の数量と比べて**著しく小さすぎる/大きすぎる**場合、その割り当てを**無効**とします。（例：注文残量10個に対し、納品が1000個のパターンは探索しない）
* **納品完了チェック:** ある注文 $A_i$ に納品が割り当てられた後、その注文残量が極めて小さい（例：注文数量の95%以上をカバー）場合、その注文グループを閉じ、次の納品は別の注文に割り当てることを**優先**します。

### 3. 品番ごとの納期幅によるスコア調整

ご提示のケースでは、品番によっては複数の納期を持つことがあります。

1.  **納期幅の定義:** 品番ごとに、注文納期と納品日の誤差 $\lvert \text{DueDate} - \text{DeliveryDate} \rvert$ の**許容範囲 $D_{\text{max}}$** を事前に設定します。（例：通常は7日、この品番は30日）。
2.  **スコアの正規化:** $\text{Score}_{\text{Date}}$ の計算式において、誤差をこの $D_{\text{max}}$ で正規化します。

$$
\text{DateScore} = \frac{1}{1 + (\frac{\text{Abs\_Date\_Error}}{D_{\text{max}}})^2}
$$

これにより、納期誤差が**許容範囲内であれば高得点**を維持し、許容範囲を少しでも超えると**スコアが急落**するように調整できます。

---

## 結論

「間違った結合なのに偶然スコアが高くなる」という課題に対しては、**スコアリングに** $\text{Penalty}_{\text{Seq}}$（納期の順序性ペナルティ）を導入し、**探索ロジックに**納品日と注文納期の順序性に関する**厳格な制約**を加えることで、その可能性を極限まで低くすることができます。

**この制約チェックは、再帰関数`RecursiveMatch`内で最も重要なロジックとなります。**
