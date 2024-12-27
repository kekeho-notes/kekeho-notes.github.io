
- 分散アルゴリズムの設計をする際にシステムモデルを仮定する場合、[[Communication model]]や[[Threshold adversary]]を決めるだけでなく、必要に応じてAdversary model (敵対者モデル)を決める必要がある

# Capabilitiesの分類
## Computational Power
どれくらいの計算能力があるか
-  [[Unbuonded adversary]]: 無限の計算能力を持ち、complexityや実行時間に関係なくどんなアルゴリズムでも実行できる理想的な攻撃者
	- これに耐えられるメカニズムは、永遠に安全といえる
- [[Bounded adversary]] ([[Polynomial-time adversaries]]): 現実の攻撃者。多項式時間のアルゴリズムしか実行できない。一般的な暗号はこのタイプを想定している。
	- コンピュータの性能向上とともに更新される必要のあるセキュリティパラメータが存在している
- [[Fine-grained bounded adcersary]]: 計算能力の具体的な尺度があり、それに制限される
	- [[PoW]]、[[Verifiable Delay Function]], [[Timelock Delay]]などはこれ

## Adaptiviry
どのような挙動を取るか
- [[Static adversary]]: adaptiveに対応を変えることはしない
	- 攻撃者は、プロトコルを実行する前にどのfを攻撃するか決めないといけない
- [[Delayed Adaptive adversary]]: パラメータ$k$があり、敵対者がパーティーの破壊を要求すると$\Delta{k}$後にcorruptする
- [[Weak adaptive adversary]]: 敵対者がパーティーの破壊をしようとすると、パーティーは送信メッセージをすべて送信し終えた後に破壊される
- [[Adaptive adversary]]:
	- 敵がパーティーを破壊しようとすると、直ちに破壊される
	- メッセージを改変して応答を調べるなどをする
	- まだ到着していない破壊前のパーティーから送信されたメッセージは届く
- [[Strong adaptive adversary]]:
	- 破損前に送信されたメッセージは、敵対者によって消去される可能性がある
	- あくまで、送信してから受信されるまでの間に、corruptionさせたうえで事後的にメッセージも消せるということっぽい。すでに他のプロセスに受信されているメッセージについてはイジれないということっぽい。
	- 初出は[[Communication Complexity of Byzantine Agreement, Revisited]]か?
	- 例
		- 敵対者はルーターをコントロールしている
		- ノード$i$から発出されたメッセージ$m$を観察したうえで、$i$を攻撃し破壊し、更に$m$を破棄する

# Corruptionの分類
- [[Passive adversary]] ([[Honest-But-Curious adversary]]/[[Semi-Honest adversary]]):
	- passiveでstaticな攻撃者。
	- プロトコルから逸脱することはないが、viewから可能な限りの情報を収集することができる
- [[Covert adversary]]:
	- それがバレない場合にのみ不正を行う攻撃者
- [[State-actor adversary]]:
	- 究極のstatic adversary. [[unbounded adversary]]のように無限の計算能力を持つ
	- Honest-but-curiousな盗聴者のように振る舞い、メッセージを収集し、解析する
- Crash
- Omission 
- Byzantine

# 参考
- [The power of the adversary](https://decentralizedthoughts.github.io/2019-06-07-modeling-the-adversary/)
- [Static adversary](https://library.fiveable.me/key-terms/cryptography/static-adversary)