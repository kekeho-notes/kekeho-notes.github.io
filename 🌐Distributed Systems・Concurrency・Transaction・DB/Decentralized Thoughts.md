- [https://decentralizedthoughts.github.io/start-here/](https://decentralizedthoughts.github.io/start-here/)
- [[分散システム]]・[[Blockchain]]・[[DAG]]等、いろいろ解説されてるすげーサイト
- 全部読むぞ

Basics, Foundations, and Classics
What is Consensus?
[https://decentralizedthoughts.github.io/2019-06-27-defining-consensus/](https://decentralizedthoughts.github.io/2019-06-27-defining-consensus/)
- consensus: 異なる当事者間の合意形成
- Agreement Problem
	- $n$つの参加者$i$がそれぞれ入力として値$v_i \in V$を持っている
	- Agreement: 2つの誠実(Honest)な参加者が、異なる値を決定することがない
	- Validity: すべての誠実な参加者が同じ値$v$を持っていたら、$v$が最終的な値として決定される
		- Weak Validity: すべての参加者が誠実であり、かつ全ての参加者が同じ値$v$を入力に持っていたら、$v$が最終的な値として決定される
	- Termination: すべての誠実な参加者は、最終的に$V$の値を決定し、終了する必要がある
	- 全員が誠実であれば合意は簡単に得られるけど、通信モデル、敵対者の存在を考慮に入れると、むずかC
- [[Uniform vs non-uniform agreement]]

