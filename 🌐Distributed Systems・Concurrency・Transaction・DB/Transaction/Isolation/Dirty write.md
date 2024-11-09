[#Isolation](Isolation.md) [#トランザクション](トランザクション)
- [[Anomaly]]の一つ
- 2つのトランザクションが並行してDB内の同じオブジェクトを更新しようとしているとき、先行する書き込みがまだコミットされていないトランザクションの一部であり、あとから行われる書き込みがコミットされていない値を上書きしてしまうケース
- ![[assets/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F68018%2F55e8325e-81ce-911c-c731-52b24b0c18aa.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&w=1400&fit=max&s=ad0fee74813019295da9c21ea894d488]]
	- 画像は[トランザクションの分離性（isolation）の概要 #Transaction - Qiita](https://qiita.com/immrshc/items/efc8cb31226da297c9b4#ダーティライト)より
- 防ぐためには、2番目のトランザクションの書き込みが、最初の書き込みのトランザクションがコミット or abortされるまで遅延される必要がある
	- 変更するオブジェクトの排他ロックを取ればOK。[[行レベルロック]]などが使われる。
- [[Read committed]]では起きないようになっている
