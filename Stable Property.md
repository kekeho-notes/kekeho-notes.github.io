- [[分散システム]]において、システムが一定時間を経て安定し、その状態が存続する性質
- 例: デッドロックした、計算が終了した、トークンリング内のすべてのトークンが消失した、など
# 定義
[[Distributed Snapshots：Determining Global States of Distributed Systems]]における定義
- $y$: 分散システム$D$のGlobal State $S$上で定義される[[述語関数]]
- $D$のGlobal State $S$ から到達可能な$D$のすべての取りうる状態$S'$に対して、$y(S)$が$y(S')$を含有する場合、$y$のことを[[Stable Property]]と呼ぶ
