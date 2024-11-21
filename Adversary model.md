
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
- [[Adaptive]]: メッセージを改変して応答を調べるなどをする




- Static / Adaptive


- Classic / Quantum

# Adversary model (Corruption)の分類
- [[Passive adversary]] ([[Honest-But-Curious adversary]]/[[Semi-Honest adversary]]):
	- passiveでstaticな攻撃者。
	- プロトコルから逸脱することはないが、viewから可能な限りの情報を収集することができる
- [[Covert adversary]]:
	- それがバレない場合にのみ不正を行う攻撃者
- [[State-actor adversary]]:
	- 究極のstatic adversary. [[unbounded adversary]]のように無限の計算能力を持つ
	- Honest-but-curiousな盗聴者のように振る舞い、メッセージを収集し、解析する
- Crash: Passiveに加え、
- Omission: 
- Byzantine: 

# 参考
- [The power of the adversary](https://decentralizedthoughts.github.io/2019-06-07-modeling-the-adversary/)
- [Static adversary](https://library.fiveable.me/key-terms/cryptography/static-adversary)