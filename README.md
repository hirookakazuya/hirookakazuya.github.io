
[b](IMG_2923.jpeg)
[c](IMG_2924.jpeg)
[d](IMG_2926.jpeg)
[e](IMG_2992.jpeg)
[f](IMG_2941.jpeg)
[g](IMG_2945.jpeg)
[h](IMG_2833.jpeg)
[i](IMG_2834.jpeg)
[j](IMG_2849.jpeg)
[k](IMG_2850.jpeg)
[l](IMG_2854.jpeg)

Sub MakeMiniatureTestList()
    Dim ws As Worksheet
    Set ws = ActiveSheet
    
    Dim lastRow As Long
    lastRow = 1001 ' 1000店舗＋ヘッダー
    
    Dim targetTotalQty As Long
    targetTotalQty = 300 ' 目指すテスト総枚数
    
    Dim i As Long, j As Long
    
    ' 1. 初期化
    ws.Columns("D:H").Clear
    ws.Cells(1, 4).Value = "仮配分(2000枚ベース)"
    ws.Cells(1, 5).Value = "全店ランク別数"
    ws.Cells(1, 6).Value = "テストランク比率目標"
    ws.Cells(1, 7).Value = "テストフラグ"
    ws.Cells(1, 8).Value = "テスト販売数量(300枚)"
    
    ' 2. 2,000枚ベースの仮配分（List_total）を全店に作る（最低1枚、スコア比例）
    ' ※C列に「売上予測スコア」が入っている前提
    Dim totalScore As Double
    totalScore = 0
    For i = 2 To lastRow
        totalScore = totalScore + ws.Cells(i, 3).Value
    Next i
    
    Dim totalBaseQty As Long
    totalBaseQty = 2000
    
    For i = 2 To lastRow
        If totalScore > 0 Then
            Dim rawQty As Double
            rawQty = totalBaseQty * (ws.Cells(i, 3).Value / totalScore)
            ' 最低1枚を保証した仮配分
            ws.Cells(i, 4).Value = WorksheetFunction.Max(1, WorksheetFunction.Round(rawQty, 0))
        Else
            ws.Cells(i, 4).Value = 1
        End If
    Next i
    
    ' 3. 各ランクの全体店舗数 Q(X) と、目指すべきテスト店舗のランク比率を計算
    Dim ranks As Variant
    ranks = Array("A", "B", "C", "D", "E", "F")
    
    Dim qTotal(5) As Long
    Dim sumTotalStores As Long
    sumTotalStores = lastRow - 1
    
    For j = 0 To 5
        qTotal(j) = Application.WorksheetFunction.CountIf(ws.Range("B2:B" & lastRow), ranks(j))
    Next j
    
    ' 4. 「本番のミニチュア」として、2000枚ベースの数量（またはスコア）が高い順に店舗を並べ替え、
    // 合計が300枚（またはそれに最も近くなる）まで店舗を上から順に選んでいく。
    // ただし、ご提示の条件「Q(X)/Sum(Q) = q(X)/Sum(q)」に近づくように、各ランクの採用枠をコントロールする。
    
    ' ここをスマートにするため、各店舗に「2000枚ベースの数量 ÷ 所属ランクの全体数」などの効率スコアを持たせ、
    ' 比率（Q(X)の割合）に厳密に従って各ランクから上位を抽出します。
    
    ' 各ランクから何店舗ずつ選ぶかを決定する
    ' 合計300枚にするため、平均して1店舗あたり数枚持つことになるため、
    ' テスト店舗数はだいたい 100店舗〜150店舗 くらいになるのが自然です。
    ' ここでは「全店に対する抽出率」を逆算します。
    
    ' 仮にテスト店舗の総数を「全体の約12%（約120店舗）」と置くと、合計300枚になりやすいですが、
    ' 「合計300枚」をピタッと満たすために、各ランクから「仮配分数量の大きい順」に、
    ' 全体の300枚の枠を奪い合う形で上から採用していきます。
    
    ' 【よりスマートなアプローチ】
    ' 全店舗の中で「2000枚ベースの数量」が大きい店舗から順に、ランク比率（Q(X)の割合）のバランスを崩さないようにピックアップする。
    
    ' 一旦、全行に「仮フラグ = 0」を設定
    For i = 2 To lastRow
        ws.Cells(i, 7).Value = 0
    Next i
    
    ' ランクごとの現在の選択数を追跡する配列
    Dim qSelected(5) As Long
    For j = 0 To 5: qSelected(j) = 0: Next j
    
    ' 合計300枚に近づけるためのループ（2000枚ベースの数量が大きい順に検討）
    ' バブルソート的に全店舗を「仮配分数量の降順」で処理するため、あらかじめソートするか、インデックス配列を使います。
    ' VBAで簡易的に実現するため、店舗データをメモリに読み込んで処理します。
    
    Dim dataArr() As Variant
    ReDim dataArr(1 To lastRow - 1, 1, 5) ' 1:Row, 2:Rank, 3:Score, 4:BaseQty, 5:Selected
    
    For i = 2 To lastRow
        dataArr(i - 1, 1, 1) = i
        dataArr(i - 1, 1, 2) = ws.Cells(i, 2).Value ' ランク
        dataArr(i - 1, 1, 3) = ws.Cells(i, 3).Value ' スコア
        dataArr(i - 1, 1, 4) = ws.Cells(i, 4).Value ' 2000枚ベース数量
        dataArr(i - 1, 1, 5) = 0                    ' 選択フラグ
    Next i
    
    ' 2000枚ベース数量の降順に簡易ソート（バブルソート）
    Dim k As Long, l As Long
    Dim tempVal As Variant
    For k = 1 To UBound(dataArr, 1) - 1
        For l = k + 1 To UBound(dataArr, 1)
            If dataArr(l, 1, 4) > dataArr(k, 1, 4) Then
                For m = 1 To 5
                    tempVal = dataArr(k, 1, m)
                    dataArr(k, 1, m) = dataArr(l, 1, m)
                    dataArr(l, 1, m) = tempVal
                Next m
            End If
        Next l
    Next k
    
    ' 上から順に、合計300枚に達するまで「ランク比率」を意識しながら選んでいく
    ' 条件：Q(X)/TotalQ = q(X)/Totalq をキープできるように、
    // あるランクがすでに比率以上に選ばれすぎていたら、次のランクを優先する
    
    Dim currentSumTestQty As Long
    currentSumTestQty = 0
    Dim totalSelectedStores As Long
    totalSelectedStores = 0
    
    Dim targetRatio(5) As Double
    For j = 0 To 5
        targetRatio(j) = qTotal(j) / sumTotalStores
    Next j
    
    Dim stepIdx As Long
    For stepIdx = 1 To UBound(dataArr, 1)
        Dim rnkStr As String
        rnkStr = dataArr(stepIdx, 1, 2)
        Dim rnkIdx As Long
        rnkIdx = -1
        For j = 0 To 5: If ranks(j) = rnkStr Then rnkIdx = j: Exit For: Next j
        
        Dim bQty As Long
        bQty = dataArr(stepIdx, 1, 4)
        
        ' もしこの店を選んだ場合のテスト総枚数
        If currentSumTestQty + bQty <= targetTotalQty + 10 Then ' わずかなオーバーは後で調整
            ' ランク比率の偏りチェック：このランクの現在の選択割合が、本来の比率を大幅に超えていなければ採用
            Dim currentRatio As Double
            If totalSelectedStores > 0 Then
                currentRatio = (qSelected(rnkIdx) + 1) / (totalSelectedStores + 1)
            Else
                currentRatio = 0
            End If
            
            ' 許容範囲内、またはまだ店舗数が少ないうちは選ぶ
            If totalSelectedStores = 0 Or currentRatio <= targetRatio(rnkIdx) * 1.3 Or qSelected(rnkIdx) < 2 Then
                dataArr(stepIdx, 1, 5) = 1 ' 採用
                currentSumTestQty = currentSumTestQty + bQty
                qSelected(rnkIdx) = qSelected(rnkIdx) + 1
                machineTotalStores = totalSelectedStores + 1
            End If
        End If
        
        ' 300枚に近づいたら（あるいは超えそうなら）微調整へ
        If currentSumTestQty >= targetTotalQty Then Exit For
    Next stepIdx
    
    ' 5. ワークシートに結果を書き戻す
    For k = 1 To UBound(dataArr, 1)
        Dim targetRow As Long
        targetRow = dataArr(k, 1, 1)
        If dataArr(k, 1, 5) = 1 Then
            ws.Cells(targetRow, 7).Value = 1 ' テストフラグ
            ws.Cells(targetRow, 8).Value = dataArr(k, 1, 4) ' 2000枚ベースの数量をそのままテスト数量にする！
        Else
            ws.Cells(targetRow, 7).Value = 0
            ws.Cells(targetRow, 8).Value = 0
        End If
    Next k
    
    ' 6. 実際の合計枚数をジャスト300枚に合わせる微調整
    Dim actualSum As Long
    actualSum = 0
    For i = 2 To lastRow
        If ws.Cells(i, 7).Value = 1 Then actualSum = actualSum + ws.Cells(i, 8).Value
    Next i
    
    Do While actualSum <> targetTotalQty
        If actualSum < targetTotalQty Then
            ' 足りない分は、テスト店舗の中でベース数量が大きい店舗に +1
            Dim maxR As Long: maxR = GetTopTestRow(ws, lastRow, True)
            If maxR > 0 Then
                ws.Cells(maxR, 8).Value = ws.Cells(maxR, 8).Value + 1
                actualSum = actualSum + 1
            Else
                Exit Do
            End If
        Else
            ' 多い分は、テスト店舗の中で数量が2枚以上の店舗から -1
            Dim minR As Long: minR = GetTopTestRow(ws, lastRow, False)
            If minR > 0 Then
                ws.Cells(minR, 8).Value = ws.Cells(minR, 8).Value - 1
                actualSum = actualSum - 1
            Else
                Exit Do
            End If
        End If
    Loop
    
    MsgBox "「2,000枚のミニチュア版」としての300枚テスト販売リストが完成しました！", vbInformation
End Sub

Function GetTopTestRow(ws As Worksheet, lastRow As Long, highest As Boolean) As Long
    Dim i As Long
    Dim targetRow As Long
    Dim targetVal As Long
    If highest Then targetVal = -1 Else targetVal = 999999
    targetRow = 0
    
    For i = 2 To lastRow
        If ws.Cells(i, 7).Value = 1 Then
            If highest Then
                If ws.Cells(i, 8).Value > targetVal Then
                    targetVal = ws.Cells(i, 8).Value
                    targetRow = i
                End If
            Else
                If ws.Cells(i, 8).Value > 1 And ws.Cells(i, 8).Value < targetVal Then
                    targetVal = ws.Cells(i, 8).Value
                    targetRow = i
                End If
            End If
        End If
    Next i
    GetTopTestRow = targetRow
End Function
