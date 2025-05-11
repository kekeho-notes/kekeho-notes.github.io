---
aliases:
  - ビザンチン将軍問題
tags:
  - 論文
authors:
  - "[[Leslie Lamport]]"
keywords:
  - Byzantine Fault Tolerance
URL: https://doi.org/{{doi}}
---

# 書誌情報
- **タイトル**: The Byzantine Generals Problem
- **著者**: {{author}}
- **出版年**: {{year}}
- **Abstract**:
  {{abstract}
# 論文
- https://lamport.azurewebsites.net/pubs/byz.pdf
- 和訳: https://hazm.at/mox/distributed-system/algorithm/theorem/bft/the-byzantine-generals-problem/index.html

# 概要
- **ビザンチン将軍問題**: 司令官である将軍は $n-1$  人の副官に次のような命令を送らなければならない
	- すべての忠実な副官は同じ命令に従う（単一の値への合意）
	- 司令官である将軍が忠実であれば、すべての忠実な副官らは彼の送る命令に従う（[[Validity]]?）
- 不可能性: $m$人の裏切り者に対して$N < 3m+1$での解決法は存在しない

# Oral Messageを用いた解
- 合意値を得る関数$OM(m)$を提案する
	- $m$が裏切り者の数
	- $N \ge 3m+1$の場合に機能する
- Oral Message (ネットワークのモデル):
	- 送信されたすべてのメッセージは正しく配信される
	- メッセージの受信者は誰がメッセージを送信したかを知っている
	- メッセージの欠落を検出することができる
- Tools:
	- $majority(v_1, ..., v_n-1)$: 引数の値の過半数が$v$と等しければ、出力は$v$となる
- $OM(0)$
	1. 司令官は各副官に彼の値を送信する
	2. 各副官は司令官から受信した値を使用する。受け取らなかった場合はデフォルト値のRETREATとする
- $OM(m), m > 0$:
	1. 司令官は各副官に彼の値を送信する
	2. 各$i$について、副官$i$が司令官から受信する値を$v_i$とし、または値を受け取らない場合はデフォルト値の$RETREAT$とする。副官$i$はアルゴリズム$OM(m-1)$の司令官として値$v_i$を他の$n-2$の副官それぞれに送信する
	3. 各$i$と$j \neq i$について、$v_j$を副管$i$がステップ2で副官$j$から受信した値とし、または値を受け取らない場合はRETREATとする。副官$i$は値$majority(v_1, ..., v_{n-1})$を使用する
（OMは再帰的に動作する）