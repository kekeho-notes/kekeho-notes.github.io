[#p2p](p2p) [#gossip](gossip) [#Overlay_Network](Overlay_Network)
- [https://www.cs.unibo.it/bison/publications/aggregation-tocs.pdf](https://www.cs.unibo.it/bison/publications/aggregation-tocs.pdf)

- ノードの全体数がわからないようなダイナミックな[[Overlay Network]]でも、1つの変数の値について収束させることができる
- プロセス$P_i, P_j$が$v_i, v_j$を持っていて、収束させようとしている
- 2ノード間での値の収束: $v_i, v_j \leftarrow (v_i + v_j) / 2$
- これを繰り返していけば、ネットワーク全体で値を収束させられる

応用
- ネットワークにどのくらいのノードが参加しているかを推定できる
	- クエリを送るノードが1を送る、ほかは0を送る
	- 最終的に収束した値の逆数が全体のノード数
	- 感動して涙が出た(kekeho)
