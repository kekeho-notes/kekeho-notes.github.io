# 概要
- [[Byzantine fault tolerant consensus|Byzantine fault tolerant consensus algorithm]]
- [[Partially synchronous system|部分同期システム]]を仮定
- $N \ge 3f + 1$
- [[PBFT]]の2 phase ([[Quorum Certificate]]もらうフェーズと、[[View change]]フェーズ)ではなく、3フェーズアプローチ
## 特徴
- **Linear View Change**: O(n)の[[メッセージ複雑性]]で[[View change]]ができる (カスケード障害時$O(n^2)$)
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
	- Quorum Certificate (QC)を集める。これ閾値署名で実現している
## データ構造
- Message m:
	- m.viewNumber: View number
	- m.type: NEW-VIEW, PREPARE, PRE-COMMIT, COMMIT, DECIDE
	- m.node: 提案された葉ノード
	- m.justify: 必要に応じてQCが格納される
	- m.partialSig: メッセージの部分署名
- Quorum Certificates
## PREPARE phase
- (n - f)のレプリカから、New viewメッセージを受け取ることで自身がリーダーとしてスタートする
- レプリカが受信した最も高いPrepare QC(ない場合は$\bot$)を運搬
## PRE-COMMIT phase

- リーダーが現在の提案curProposalに対する(n - f)個のPREPARE票を受信すると、それらをprepareQCに結合する
- リーダーは、PREPAREメッセージでprepareQCをブロードキャストする
- レプリカは、提案の署名付きダイジェストを持つPRE-COMMIT票でリーダーに応答する
## COMMIT phase
- リーダーは$n-f$個のPRE-COMMIT票を受信すると、それをprecommitQCに結合し、COMMITメッセージでブロードキャスト
- レプリカは、COMMIT票で応答
- (n - f)のCOMMIT表を受け取ったらcommitQCに結合し、DECIDEしておしまい
- レプリカはView numberをインクリメントし、次のビューを開始する

# メモ
 - フェーズ増えてる分、レイテンシはPBFTより高そう?
 - 常に可用性を提供するわけではなさそう: https://academic.oup.com/comjnl/article-abstract/67/8/2586/7634133?redirectedFrom=fulltext&login=false

# 参考文献
- Full paper : https://arxiv.org/pdf/1803.05069
- [[PODC]]'19 論文: https://dl.acm.org/doi/10.1145/3293611.3331591
- [HotStuff: Implementation and Advice](https://www.scs.stanford.edu/24sp-cs244b/projects/HotStuff_Implementation_and_Advice.pdf)
	- StanfordチームがHotStuffを実装するときに注意するべき点・元論文ではわからない詳細などをまとめてくれている。大感謝。
- https://cgi.di.uoa.gr/~mema/courses/m120/hotstuff.pdf
-  ![](https://www.youtube.com/watch?v=GAGW-c4hADA)
