# 概要
- [[Byzantine fault tolerant consensus|Byzantine fault tolerant consensus algorithm]]
- [[Partially synchronous system|部分同期システム]]を仮定
- $N \ge 3f + 1$
- [[PBFT]]の2 phase ([[Quorum Certificate]]もらうフェーズと、[[View change]]フェーズ)ではなく、3フェーズアプローチ
## 特徴
- Linear View Change: O(n)の[[メッセージ複雑性]]で[[View change]]ができる (カスケード障害時$O(n^2)$)
- Optimistic Responsiveness: リーダーは、$n - f$個の応答を待つだけで良い

# システムモデル

- $N \ge 3f + 1$
- ネットワークは[[Reliable Broadcast]]ができる
- [[Partially synchronous system|部分同期システム]]を仮定
	- 既知の通信時間の上限$\Delta$と、未知の[[Global Stabilization Time|GST]]が存在する。
- 暗号ハッシュ関数、[[閾値署名]]を使う
	- $k = 2f+1$とする

# プロトコル
- Viewごと1リーダーがいる
- 各レプリカにはローカルデータ構造として、保留コマンドのTreeがある
	- Tree: 各ノードにコマンド・メタデータ・親リンクが含まれる
	- 枝が単調に(分岐せずという意味?)伸びていく
- Treeがコミットされる
	- ViewのリーダーがTreeを提案する
	- PREPARE・PRE-COMMIT・COMMITの3フェーズで、$n - f = 2f + 1 = k$レプリカから票を集める
	- Quorum Certificate (QC)を集める。これが閾値署名
## Prepare phase
- (n - f)のレプリカから、New viewメッセージを受け取ることで自身がリーダーとしてスタートする
- 

# メモ
 - フェーズ増えてる分、レイテンシはPBFTより高そう?

# 参考文献
- https://cgi.di.uoa.gr/~mema/courses/m120/hotstuff.pdf
-  ![](https://www.youtube.com/watch?v=GAGW-c4hADA)
- 