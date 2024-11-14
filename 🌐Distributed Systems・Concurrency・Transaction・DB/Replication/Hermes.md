# 概要
- [[Leaderless Replication]]のアルゴリズム
	- [[Replication]]
- 保証する[[Consistency]]:  [[Linearizability]]を保証
- Hermes paperで挙げられているハイパフォーマンスな[[Replication]]プロトコルの特徴
  ![[Pasted image 20241114205127.png]]
- [[Local read]]と同時書き込み(inter-key concurrent)を可能にすることで、高スループット・低レイテンシを実現
	- [[Invalidations]]と[[Lamport Clock]]を組み合わせてLocal readとコンフリクトの起きない同時書き込みを実現している

# 既存のアプローチの中でのHermesの位置づけ
![[Pasted image 20241114202412.png]]
- [[Chain Replication]]では、ヘッドにWriteし、末尾でReadする
- Chain Replicationの進化系である[[CRAQ]]では、[[Local read]]を達成しているが、依然としてWriteは遅い

# システムモデル
- [[Partially synchronous model]]
- [[LSCs]]を備えている
- [[Failure]] model
	- [[Crash-stop failure]]
	- [[Network failure]]
		- [[Network partition]]
		- [[Message reordering]]
		- [[Message duplication]]
		- [[Message loss]] ([[Omission failure]]のこと?)
- 
# 参考
- 論文: https://dl.acm.org/doi/10.1145/3373376.3378496
	- [[ASPLOS]]'20
- 公式サイト: https://hermes-protocol.com/
- [[ASPLOS]]のプレゼン動画: ![](https://www.youtube.com/watch?v=5HwOdAjqEdE)
- Poster:
<iframe src="https://www.slideshare.net/slideshow/embed_code/key/793n6tuvZHDyTY?startSlide=1" width="597" height="486" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px;max-width: 100%;" allowfullscreen></iframe><div style="margin-bottom:5px"><strong><a href="https://www.slideshare.net/slideshow/hermes-reliable-replication-protocol-230267877/230267877" title="Hermes Reliable Replication Protocol - Poster " target="_blank">Hermes Reliable Replication Protocol - Poster </a></strong> from <strong><a href="https://www.slideshare.net/AntoniosKatsarakis" target="_blank">Antonios Katsarakis</a></strong></div>
