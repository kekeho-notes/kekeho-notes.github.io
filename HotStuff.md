# 概要
- [[Byzantine fault tolerant consensus|Byzantine fault tolerant consensus algorithm]]
- [[Partially synchronous system|部分同期システム]]を仮定
- $N \ge 3f + 1$
- [[PBFT]]の2 phase ([[Quorum Certificate]]もらうフェーズと、[[View change]]フェーズ)ではなく、3フェーズアプローチ
## 特徴
- Linear View Change: O(n)の[[メッセージ複雑性]]で[[View change]]ができる (カスケード障害時$O(n^2)$)
- Optimistic Responsiveness: リーダーは、$n - f$個の応答を待つだけで良い

# メモ
 - フェーズ増えてる分、レイテンシはPBFTより高そう?