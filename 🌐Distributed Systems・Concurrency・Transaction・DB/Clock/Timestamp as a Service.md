[#Timestamp](Timestamp) [#論理時計](Logical%20Clock.md) [#TaaS](TaaS) [#Logical_Clock](Logical_Clock)
- [[VLDB]] 2024
- [https://dl.acm.org/doi/10.14778/3641204.3641210](https://dl.acm.org/doi/10.14778/3641204.3641210)
- [https://www.vldb.org/pvldb/vol17/p994-li.pdf](https://www.vldb.org/pvldb/vol17/p994-li.pdf)
- 評価実装
	- [https://zenodo.org/records/10467612](https://zenodo.org/records/10467612)
	- [https://github.com/liyishuai/taas-experiment/tree/v1.0](https://github.com/liyishuai/taas-experiment/tree/v1.0)

- [[Crash-fault torelant]]な[[Timestamp Server]]
	- [[Centralized timestamping]]
	- リーダーレスという特徴がある

背景
- [[分散DB]]の分野では、[[Logical Clock]]が使われる。
	- [[Timestamp Oracle]]が使われているが、[[単一障害点]]になりがち
	- [[Lamport Clock]]、[[Vector Clock]]は使いづらいので、分散DBではあまり使われていない。
	- 既存のCFTな[[Timestamp Oracle]]は、PrimaryをRaftで選挙して…みたいなものだったが、選挙中ダウンタイムが長くなってしまって性能が悪化していた
- [[Linearizability|Linearizable]]で、[[Crash-fault torelant]]な論理時計のアルゴリズムを提案

満たしている性質
$Q_\sigma$: セッション$\sigma$のクエリ開始
$A_\sigma$: セッション$\sigma$の結果応答
$T_\sigma$: セッション$\sigma$のタイムスタンプ
- [[Timestamp Correctness]]: $\forall \sigma, \forall \tau, (A_\sigma \prec Q_\tau \Rightarrow T_\sigma < T_\tau)$
	- [[Timestamp Completeness]]に近いかな(kekeho)
- [[Availability]]: 最小で$\lceil (n+1) / 2 \rceil$が生きていればOK
アルゴリズム解説
- [https://emptysqua.re/blog/review-timestamp-as-a-service/](https://emptysqua.re/blog/review-timestamp-as-a-service/)
	- 超わかりやすい(kekeho)
	- 論文は、この記事でも触れられている通り謎の記号を使っていて読みづらいンゴ…(kekeho)

メモ
- 全部のサーバーがUpしていれば、コンカレントにリクエスト出せるので、最も遠いサーバーへの1-RTTで時刻取得が完了する
