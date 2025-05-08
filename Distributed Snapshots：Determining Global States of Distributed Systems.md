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
---
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
