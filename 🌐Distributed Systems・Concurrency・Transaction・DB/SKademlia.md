- 感想
	- PoWでID錬成コストを上げてるの，よくできてるな(kekeho)

ID
- [[Kademlia]]の問題
	- 攻撃者がIDを無数に作れるとSybilアタックができる
	- 攻撃者がIDを自由に選択できるとEclipseアタックができる
	- IDはノードを認証するものであるべきで，他のノードがIDを詐称できないようにする必要がある
- S/KademliaのNode IDの作り方
	- 公開鍵をハッシュ関数にかけたものをIDとする．
	- PoWを導入
	- ![[assets/64382064016edd001cdf15e2.png]]

	- Static Puzzles: Node IDが自由に選択できることを阻害する. 図左．
	- Dynamic Puzzles: 膨大な量のNode IDを生成することが複雑であることを保証する．図右．
	- $c_i$は暗号学パズルの複雑さを表す．
		- パズルを作る計算量: $O(2^{c_1}+2^{c_2})$
