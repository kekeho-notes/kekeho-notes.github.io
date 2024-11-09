[#分散システム](分散システム.md)

- 伝統的なレプリケーション技術([[Pessimistic Replication]])では、単一コピーの一貫性を維持しようとしている
	- プライマリのレプリカがあり、更新後に同期的にセカンダリレプリカに変更を書き込む
	- プライマリがクラッシュしたら、セカンダリの中から次のプライマリを選ぶ
	- あまりスケールしない
- Optimistic Replicationは、広域環境やモバイル環境で効率的にデータを共有するための技術群
	- 「問題が起こるとしても極稀である」という楽観的な仮定を置き、非同期でデータを読み書きする
		- 問題が起こる=衝突が起きたら、起きた後に修正をする
	- スケールする
	- [[DNS]]とかもこの例といえる

参考
- [https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-2003-60.pdf](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-2003-60.pdf)
	- [[Eventual Consistency]]の定義もある
