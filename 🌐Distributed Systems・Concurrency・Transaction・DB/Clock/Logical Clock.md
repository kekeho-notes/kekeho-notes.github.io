---
aliases:
  - 論理クロック
---


# 論理時計の条件
1. $e_i$[[happend-before]] $e_j$($e_i \Rightarrow e_j$)ならば、$T(e_i) < T(e_j)$となる ([[Timestamp Completeness]])
	- $e$はイベント
2. $T(e_i) < T(e_j)$ならば、$e_i \Rightarrow e_j$ ([[Timestamp Soundness]])


# 線形時間
[#Lamport_Clock](Lamport_Clock) 
- [[Scalar logical clocks]]とも
- 各プロセス$p_i$は、線形時間を示す変数$L$を持つ。
- 各プロセスが送信するメッセージ$m$は、線形時間を運ぶ変数$m.L$を持つ。
- 各プロセスは、以下のイベントを発生させる。
	- 送信イベント
		1. $L = L + 1$
		2. $m.L = L$とする
		3. $m$を送信する。
		- $T(s_i \lbrack m \rbrack)$は$L$となる
	- 受信イベント
		1. $m$を受信する
		2. $L = \mathrm{max}(L, m.L)$
		3. $L = L + 1$。
		- $T(r_i \lbrack m \rbrack)$は$L$となる。
	- 計算イベント
		1. 計算$e$を行う
		2. $L = L + 1$
		- $T(e)$は$L$となる。
- 線形時間の性質
	1. $e_i \Rightarrow e_j$ならば、$T(e_i) < T(e_j)$である
	2. しかし、1.の逆は成り立たないことがある
	3. $T(e_i) < T(e_j)$であるとき、$e_i \Rightarrow e_k$かつ$e_k \Rightarrow e_j$となるイベント$e_k$が存在するかはわからない
	よって、線形時間は論理時計の条件1を充足するが、2は充足しない。

# ベクタ時間
[#Vector_Clock](Vector_Clock)
- ベクタ時間の性質
	1. $e_i \Rightarrow e_j$のとき、かつそのときに限り、$T(e_i) < T(e_j)$である
		- 論理時計の条件を満たしている
			- だから、[[因果関係]]([[causality]])を表現できる
			- 並行関係が保存されている(kekeho)
	2. $T(e_i) < T(e_j)$であるときに、$e_i \Rightarrow e_k$かつ$e_k \Rightarrow e_j$となるイベント$e_k$が存在するかどうかはわからない
- 空間計算量が$O(n)$ bitsになるので、大規模システムに適さないとされる

- システムにおけるプロセス数を$N$としたときに、各プロセス$p_i \in P$は、$|T| = N$となるベクター$T$をタイムスタンプとして保持する。
- プロセス$p_i$は計算およびメッセージの送受信イベント$e$が発生するたびに、$t_i \in T$をインクリメントする。
- また、Lamportの論理クロックと同様にメッセージのペイロードにタイムスタンプを添付する。
- タイムスタンプ$T'$をペイロードに持つメッセージを受信した際には、ベクターのマージ操作$\forall i: t_i := max(t_i, {t'}_i)$を実行し、これをインクリメント前のタイムスタンプ値として採用する。
- なお、ベクター間の順序関係は以下で定義される。
	$T < T' \iff (\forall i: t_i \leq {t'}_i) \land (\exists j: t_j < {t'}_j)$


# いろいろな論理時計
- [[Lamport Clock]]
- [[Vector Clock]]
- [[Synchronized clocks]]
	- [[Google Spanner]]的なやつ
- [[Hybrid Logical Clock]]([[HLC]])
	- 因果関係を捉えつつ、[[NTP]]に近い物理時間を反映するクロック
		- どんなんだ?(kekeho)
		- [[Logical Physical Clocks]]
- [[Bloom Clock]]
	- [https://arxiv.org/abs/1905.13064](https://arxiv.org/abs/1905.13064)
	- [The Bloom Clock to Characterize Causality in Distributed Systems | SpringerLink](https://link.springer.com/chapter/10.1007/978-3-030-57811-4_25)
	- 偽陽性があるが、ベクタークロックと比べて空間効率がよい
		- 偽陰性があると致命的だと思うけど、偽陽性なら多くのアプリケーションで許容できるんでは(kekeho)

# 参考
- [https://hazm.at/mox/distributed-system/algorithm/consistency/version-vector/index.html](https://hazm.at/mox/distributed-system/algorithm/consistency/version-vector/index.html)
- [https://dl.acm.org/doi/abs/10.1145/3335772.3335934](https://dl.acm.org/doi/abs/10.1145/3335772.3335934)
- [https://www.hpcs.cs.tsukuba.ac.jp/~msato/lecture-note/dsys-2012/lecture-dist-clock.pdf](https://www.hpcs.cs.tsukuba.ac.jp/~msato/lecture-note/dsys-2012/lecture-dist-clock.pdf)
- ![](https://www.youtube.com/watch?v=BRvj8PykSc4&feature=youtu.be)
- [Use of time in distributed databases](https://muratbuffalo.blogspot.com/2024/12/use-of-time-in-distributed-databases.html)

[#p2p](p2p) [#分散システム](分散システム.md)
