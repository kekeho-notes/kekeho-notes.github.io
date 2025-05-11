---
tags:
  - 論文
authors:
  - "[[Leslie Lamport]]"
  - K. Mani Chandy
keywords:
  - Distributed Snapshots
  - Global State
URL: https://doi.org/10.1145/214451.214456
aliases:
  - Chandy-Lamport's Algorithm
---
- Chandy-Lamport's Algorithmの提案論文
# 書誌情報
- **タイトル**: Distributed Snapshots：Determining Global States of Distributed Systems
- **著者**: [[Leslie Lamport]]. [[K. Mani Chandy]]
- **出版年**: 1985
- **Abstract**: This paper presents an algorithm by which a process in a distributed system determines a global state of the system during a computation. Many problems in distributed systems can be cast in terms of the problem of detecting global states. For instance, the global state detection algorithm helps to solve an important class of problems: stable property detection. A stable property is one that persists: once a stable property becomes true it remains true thereafter. Examples of stable properties are “computation has terminated,” “ the system is deadlocked” and “all tokens in a token ring have disappeared.” The stable property detection problem is that of devising algorithms to detect a given stable property. Global state detection can also be used for checkpointing.

# 概要
- [[Global snapshot]]の取り方の話
	- **実際の大域状態を把握するのではなくて、[[Stable Property]]の検出に問題を絞って考える**
## 問題
- Problem: プロセスが自身のState・通信を記録し、それらからグローバルなシステムのStateを導き出すアルゴリズムを考える
	- 写真のパノラマ撮影に似ている。空を飛ぶ鳥（プロセスの比喩）の群れが広範に広がっている空をパノラマ撮影することを考える。一瞬ですべてを撮ることはできないし、鳥たちに止まっていてもらうことはできない。しかし、「意味のある」繋がりのあるパノラマを撮ることはできる
		- 「意味のある」: ここでは[[Stable Property]]の検出
		- 写真の撮影方法を考える : 具体的なアルゴリズムを提案する
- $y$: 分散システム$D$のGlobal State $S$上で定義される[[述語関数]]
	- $D$のGlobal State $S$ から到達可能な$D$のすべての取りうる状態$S'$に対して、$y(S)$が$y(S')$を含有する場合、$y$のことを[[Stable Property]]と呼ぶ
# システムモデル
- 有限のプロセスの集合と有限のチャネルの集合から構成される
	- 有向グラフで表現される
- [[Partially synchronous system]]を仮定
- Channel: 無限のバッファがあり、エラーはなく、メッセージは送信された順序で配信される（FIFO）
- プロセス$p$は状態の集合
	- 初期状態およびイベント$e$の集合
- プロセス$p$におけるイベント$e$は、atomic actionであり、プロセス$p$の状態およびそのチャネル$c$の状態を変化させうる
	- イベント$e$は以下を含むタプル$<p, s, s', M, c>$で表現される
		1. イベントを発生させたプロセス$p$
		2. プロセス$p$のイベントが発生する直前の状態$s$
		3. イベント発生直後のプロセス$p$の状態$s'$
		4. イベント$e$により変化したかもしれないチャネル$c$
		5. $c$が送信/受信したメッセージ$M$
	- $e = <p, s, s', M, c>$とすると、$e$は以下の場合に限って（iff）起こり得る
		1. Global State $S$における$p$の状態が$s$であり
		2. $c$が$p$向けのチャネルである場合は、$S$における$c$の状態はメッセージ$M$が先頭のメッセージシーケンスである
- $next(S, e)$は、イベント$e$がグローバル状態$S$で発生した直後のグローバル状態を指す
	- 以下の場合を除き、$S = next(S, e)$
		1. $next(S, e) = s'$
		2. $e$（原文ママ。おそらく$c$?）が$p$に向けられたチャネルである場合、$next(S, e)$における$c$の状態は、メッセージ$M$が先頭から削除された$S$における$c$の状態である
		3. $c$が$p$から外向きのチャネルであれば、$next(S, e)$における$c$の状態は、$S$における末尾に$M$が追加されたcの状態とおなじになる
- $seq = (e_i: i \leq i \leq n)$を、システムにおけるプロセス内のイベントシーケンスとする
	- イベント$e_i$がGlobal State $S_i, 0 \leq i \leq n$において起こり得る時に限り（iff）、$seq$を*omputation of the system*といい、$S_{i+1} = next(S_i, e_i) \ \textrm{for} \ 0 \leq i \leq n$という

（論文には2つほど例が載っている）

# アルゴリズム


# 解説
- https://www.geeksforgeeks.org/chandy-lamports-global-state-recording-algorithm/