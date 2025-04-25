---
aliases:
  - Practical Byzantine Fault Tolerance
---
# 概要
- [[Byzantine fault tolerant consensus|Byzantine fault tolerant consensus algorithm]]
- [[Nakamoto Consensus]]等と異なり、ノード数Nが頻繁に変動する環境では使えないことに注意
- 仮定のもとで、以下の[[Safety]]を保証
	- 非故障レプリカが、リクエストの全順序に合意する
# 仮定
- メッセージの送信者は識別可能(署名等により達成される)
- $N \ge 3f+1$のノードがあるときに、$f$台以上のサーバーが[[ビザンチン故障]]しない限り、安全([[Safety]])
- [[Partially synchronous system]]の仮定のもとで、[[Liveness]]を保証
	- メッセージ遅延が有限
## プロトコル
- 書き込み時に$n - f = 2f + 1$の[[Quorum Certificate]]をもらう
	- このうち、$f$個が書き込んでないのに嘘をついていて、さらに読み取り時に別の$f$個が故障していても、1個は正しい値を持っている
### 前提
- レプリカ集合$R$は、$\{ 0, ..., |R|-1 \}$のIdentifierを持つ
	- $|R| = 3f + 1$
- 1つのview($v$)ごと、1つのプライマリレプリカ$p = v \mod |R|$がいる
	- primaryが死ぬと、view change
### The Client
- クライアント$c$は操作$o$の実行リクエスト$m = \langle \mathrm{REQUEST}, o, t, c \rangle_{\sigma_c}$をプライマリに送る
	- $t$: exactly-onceを保証するために使う。単調増加する値。クライアントのローカルクロック等でOK。
	- $\sigma_c$: cの署名
	- プライマリから十分な時間以内に返信がなさそうだったら、レプリカたちにブロードキャスト
- レプリカは、$\langle \mathrm{REPLY}, v, t, c, i, r \rangle$を返す。クライアントは$f+1$の異なるレプリカからの & 署名が有効 & tとrがそれぞれおなじになるリプライを集める。
	- $v$: view number
	- $t$: タイムスタンプ
	- $i$: レプリカ番号
	- $r$: 操作の適用結果
### Normal-Case Operation
- プライマリはリクエストをmessage logにバッファリングする
	- バッファリングしたリクエストは、あとでまとめてグループとしてマルチキャストされる
- 3フェーズプロトコル: Pre-prepare, Prepare, Commit
	- Pre-prepareとPrepareは、プライマリ（リクエストの順序を提案する）が故障したときでも、同一のビューで送信されたリクエストを完全に順序付けるために使用される
	- PrepareとCommitは、コミットされたリクエストがビュー間で完全に順序付けられていることを確認するために使用される
- プライマリはリクエストにシーケンス番号$n$を割り当てて、$m$を載せたpre-prepareをすべてのバックアップにマルチキャストし、自身のログにメッセージmを追加する
	- Pre-prepare: $\langle \langle \mathrm{PRE-PREPARE}, v, n, d \rangle_{\sigma_p} , m \rangle$
		- $v$: メセージが送信されたview
		- $n$: sequence number. プライマリがアサインする。
		- $d$: mのダイジェスト
		- ビュー変更時に、このリクエストにはビューvのタイミングでシーケンス番号nが割り当てられたということを証明するために使用される
- バックアップは、以下の条件を満たすPre-prepareメッセージを受理する
	- リクエストとPre-prepareの署名がそれぞれ正しく、dがmに対するダイジェストである
	- 現在、ビューvである
	- 同一のビューvとシーケンス番号nを持ち、異なるダイジェスト値を含むPre-prepareメッセージを受理していない
	- Pre-prepareメッセージのシーケンス番号が最低水準hと最高水準Hの間にある
- バックアップ$i$は、Pre-prepareを受け入れると他のすべてのレプリカにPrepareメッセージをマルチキャストすることでPrepareフェーズに入り、両方のメッセージをログに追加する
	- $\langle \mathrm{PREPARE}, v, n, d, i \rangle_{\sigma_i}$
- プライマリを含むレプリカはPrepareを受け入れ、署名が正しく、ビュー番号がそのレプリカの現在のビュー番号と一致し、シーケンス番号がhとHの間であればそれらをログに追加する

- $prepared(m, v, n, i)$がtrueになったら、レプリカ$i$はCommitをマルチキャスト
	- $prepared(m, v, n, i)$: 以下がレプリカ$i$のログに含まれている限りtrue
		- リクエスト$m$
		- $m$に対応するPre-prepare
		- 2f個の異なるバックアップからの、pre-prepareに対応するprepare
			- 同じビュー・シーケンス番号・ダイジェストをもつかチェック
	- $\langle \mathrm{COMMIT}, v, n, D(m), i \rangle_{\sigma_i}$
	- 各レプリカは、署名を検証し、メッセージ内のビュー番号が現在のビューと一致し、シーケンス番号がhからHの間であればCommitメッセージを受け入れてログに追加する
- $committed\_local(m, v, n, i)$がtrueになったら、レプリカ$i$は操作$o$を実行し、クライアントにリプライを返す
	- $committed(m, v, n)$ is true iff prepared(m, v, n, i) is true for all $i$ in some set of f+1 non-faulty replicas
	- $committed\_local(m, v, n, i)$ is true iff $prepared(m, v, n, i)$ is true, and $i$ has accepted 2f+1 **commits** from different replicas that match the pre-prepare for m
	- 最後の応答のりタイムスタンプが小さいやつはもう全てステートに反映されていることを保証する
		- 最後の応答より小さなタイムスタンプを持つリクエストは破棄
### Garbage collection
## 性能
-  [[メッセージ複雑性]]: $O(n^2)$
	- [[View change]]: $O(n^3)$
		- カスケード障害が起きていると$O(n^4)$まで悪化する
- レイテンシ: 2-RTT
# 論文
- [[OSDI]] 99 : [https://www.usenix.org/legacy/publications/library/proceedings/osdi99/full_papers/castro/castro_html/castro.html](https://www.usenix.org/legacy/publications/library/proceedings/osdi99/full_papers/castro/castro_html/castro.html)
- 翻訳: [https://hazm.at/mox/distributed-system/algorithm/transaction/pbft/practical-byzantine-fault-tolerance.html](https://hazm.at/mox/distributed-system/algorithm/transaction/pbft/practical-byzantine-fault-tolerance.html)
- [A Correctness Proof for a Practical Byzantine-fault-tolerant Replication Algorithm](https://pmg.csail.mit.edu/~castro/tm590.pdf)
# 実装
- [[Hyperledger Fablic]]のPBFT実装: https://github.com/hyperledger-archives/fabric/tree/master/consensus/pbft
- [[Rust]]による実装: https://github.com/Szymongib/pbft-rust
	- 記事
		- [[Implementing Practical Byzantine Fault Tolerance - Part 1](https://sgibala.com/02-01-implementing-pbft/)](https://sgibala.com/02-01-implementing-pbft/)
		- [Implementing Practical Byzantine Fault Tolerance - Part 2](https://sgibala.com/02-02-implementing-pbft/)
		- [Implementing Practical Byzantine Fault Tolerance - Part 3](https://sgibala.com/02-03-implementing-pbft/)
