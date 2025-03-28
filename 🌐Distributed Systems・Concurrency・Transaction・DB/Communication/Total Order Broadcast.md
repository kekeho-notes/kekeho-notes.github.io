[#Broadcast](Broadcast.md) [#Multicast](Multicast.md)
[[Total Order Multicast]] / [[Atomic Broadcast]] / [[Atomic Multicast]]とも
- ニュアンス的に、Atomic Broadcastは実時間の話、Total Order Broadcastは[[Logical Clock]]の話っぽい? (kekeho)

- [[Lamport Clock]]を使用すると、メッセージの順序付けをした配送が可能だが、[[Fault tolerance]]はない
- アルゴリズムによってメッセージの[[Omission fault]], [[Timing failure]], [[Byzantine failure]]に耐える
	- どれも[[flooding]]([[Gossip Protocol]]等)ベースのBroadcastが基盤となっている

# Atomic Broadcast
Input
- $n$個のプロセッサが同時にブロードキャストするメッセージのストリーム
Output
- 以下の特性を満たす、順番に配送されるメッセージ
特性
- [[Atomicity]]: いずれかの正しいプロセッサがそのクロックの指す時刻$U$にUpdateを配信した場合、そのUpdateはそれぞれの正しいプロセッサーたちにもそれらのクロックが指す時刻$U$で配信される
	- みんなにとって、時刻$U$で見える
	- ここでの時刻は実時間(kekeho)
- [[Order]]: 正しいプロセッサーによって配信されたすべてのUpdateは、すべての正しいプロセッサに同じ順序で配信される
- [[Termination]]: 正しいプロセッサが、そのクロックが指す時刻$T$でブロードキャストを開始したUpdateは、すべての正しいプロセッサに、それらのクロックが指す時刻$T + \Delta$で配信される
	- 一定の時間内に配信が終わる、ということなのでしょう(kekeho)

# Total Order Broadcast
- Atomic Broadcastは物理時間に基づく話をしているけど、[[Logical Clock]]に置き換えたバージョンが一般的。これはTotal Order Broadcastと呼ばれる問題である。

Input
- n個のプロセッサが同時にブロードキャストするメッセージのストリーム
Output
- 以下の特性を満たす、順番に配送されるメッセージ
特性
- [[Validity]]: 正しいプロセスがメッセージmをTotally Ordered Broadcastすれば、最終的に(Eventually)そのプロセスはmをTotally Ordered Deriveryする
	- ここでの「正しさ」は、動作が仕様と一致しているかどうか。そうでなければ[[故障]]している
- [[Uniform Agreement]]: あるプロセスがメッセージmをTotally Ordered Deriveryする場合、すべての正しいプロセスは最終的に(Eventually)mをTotally Ordered Deliverする
- [[Uniform Integrity]]: For any message m, every process TO-delivers m at most once, and only if m was previously TO-broadcast by sender(m).
	- 送信者がいる場合にのみ、1回だけ送られるよー(kekeho)
	- データの整合性の話っぽい(kekeho)
- (Gap-free)[[Uniform Total Order]]: もしプロセスpとqがメッセージm, m'をTO-Deliverした場合、q TO-delivers m before m'していたら、p TO-delivers m before m'となる
	- こちらは順序の話(kekeho)

- [[Uniform Total Order]]を除くと、「[[Reliable Broadcast]]」と呼ばれる
	- こちらは順序について何も保証していない
- [[Validity]]と[[Uniform Agreement]]は[[Liveness]]に関わる

その他
- [[Distributed Consensus]]([[分散合意]])と等価であることが知られている
	- [[Consensus algorithm]]の代わりに使える
			- [証明した論文](https://doi.org/10.1145/226643.226647)
	- コンセンサスと同様、[[FLP Impossibility]]はTotal order broadcastにも適用される

参考
- [Atomic Broadcast: From Simple Message Diffusion to Byzantine Agreement - ScienceDirect](https://www.sciencedirect.com/science/article/pii/S0890540185710607)
	- Cristian F, Aghili H, Strong R, Dolev Dの論文
- [Atomic Broadcast | Encyclopedia of Algorithms](https://link.springer.com/referenceworkentry/10.1007/978-0-387-30162-4_37)
	- 上記論文をベースにした解説
- [Total order broadcast and multicast algorithms: Taxonomy and survey](https://doi.org/10.1145/1041680.1041682)
	- サーベイ論文
- [https://csis.pace.edu/~marchese/CS865/Papers/hadzilacos_ps.pdf](https://csis.pace.edu/~marchese/CS865/Papers/hadzilacos_ps.pdf)
	- Total order broadcastだけでなく、[[FIFO Broadcast]]を含めた様々な[[Broadcast]]のサーベイ
