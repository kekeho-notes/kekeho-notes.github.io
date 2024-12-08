---
aliases:
  - 時相論理
  - 線形時相論理
  - Linear Temporal Logic
---
# 概要
通常の論理を拡張して、みらいに関するある種の主張(assertion)を含むようにしたもの。このページでは主に[[Concurrent|並行]]プログラムにおけるTemporal logic (Linear Temporal Logic)についてまとめる。

$\square$ : now and forever (常に)
$\Diamond$: now or sometime in the future (最終的に、Eventually)

## 並行プログラム
- $s_0, s_1, ...\in \Sigma$: sequence of program states
	- 以下の条件を満たしてstate transitionを起こす
		- Valid starting state: $s_0$ is possible program state
		- Transition: $i > 0$について、$s_i$ は$s_{i-1}$から$\textit{ready}(s_{i-1})$に含まれる1つのアトミック処理によって引き起こされる
		- Fairness: $\textit{ready}(s_i)$に含まれるアトミック処理$a$は、$s_j (j > i)$の実行にいつか含まれる
- 現在のステートのみから次の遷移可能なステート群が決まる

## 即時アサーション(Immediate Assertions)
- Temporal logicは、$\land$, $\lor$, $\neg$などの一般的な論理記号と、$\square$, $\Diamond$からなる即時アサーションから構築される
- 記法
	- $s \vDash P$: ステート$s$において、即時アサーション$P$が真である
		- 例: $s \vDash x = 1$はステート$s$において$x = 1$が満たされていることを示す
- $s \vDash at \ A$: プログラムの制御がステートメント$A$の開始地点にある状態を示す ($A$は実行可能なプログラムのステートメント)
- $s \vDash in \ A$: プログラムの制御が$A$の開始地点あるいは内部の何処かにある状態を示す
- $s \vDash after \ A$: プログラムの制御が$A$の直後にある状態を示す
	- whileループのafterは、ループの条件式テスト地点にいることを示す
	- Aが[[cobegin]]の中のステートメントの場合、cobegin全体が終了しているか、cobeginは実行中だがAは終わっている、という状態

## Temporal Assertions

# 参考
- https://www.cs.tsukuba.ac.jp/~mizutani/under_grad/programtheory/2014/2014-09.pdf
- https://lamport.azurewebsites.net/pubs/liveness.pdf