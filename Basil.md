- [[Byzantine Fault Tolerant]]なトランザクショナル[[KVS]
- Correctnessとして、[[Byzantine Isolation]]を保証
	- 具体的な保証レベルとして[[Byzantine Serializability]]を保証
- [[Progress]]として、[[Byzantine Independence]]を保証
	- [[Leader-followerモデルのコンセンサスアルゴリズム]]では、リーダーが不正を働いたら簡単に覆るので、Basilではリーダーベースモデルを採用していない
	- Client-drivenなアーキテクチャ

# Concurrency Control
- [[Byzantine Serializability]]を保証する[[Concurrency Control]]
- [[Muti-version timestamp ordering]](MVTSO)
## 実行の流れ
`Withdraw(Bob, x)`を考える
1. `Begin(T, TS)`: タイムスタンプをつける
	-  システムの仮定として、時刻がゆるく同期されている、というのがある
2. `balance = Read(bob)`: レプリカからOptimisticに値を読み取る
	- read(key, TS), reply(key, version, value)
	- f+1個のレプリカから値を読み取り、最もバージョン番号が高いものを選択する
3. Write(Bob, bal - x)
4. Commit(T)

# Commit Protocol
- [[2PC]]ベース
- 異なる順序で競合するトランザクションのコミットを受け取りうるし、レプリカはウソを付くかもしれない
- Replicas perform CC-Check + Quorum validation = Byzantine Serializability

# Fallback protocol
- [[Byzantine Independence]]を保証するFallback protocol

# 参考
- 論文 [[SOSP]]'21: https://dl.acm.org/doi/epdf/10.1145/3477132.3483552

- 解説動画
	 ![解説動画](https://www.youtube.com/watch?v=_iIuPrlE1nw)

# メモ
- Byzantineなクライアントが、意図的にAbortして、他のトランザクションもそれに引きづられてどんどんAbortせざるを得ない…みたいなカスケード障害は、どのように防がれている?