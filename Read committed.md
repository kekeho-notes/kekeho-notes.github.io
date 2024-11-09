[#Isolation](Isolation)
- [[弱い分離レベル]]の一つ
- 以下を保証
	- [[Dirty read]]が生じないことを保証
		- データベースからの読み取りを行った際に見えるデータは、コミットされたもののみであること
		- 並行するトランザクションであっても、Commitされたら読めちゃうので、[[Nonrepeatable read]]([[Read skew]])は発生する
	- [[Dirty write]]が生じないことを保証
		- データベースへの書き込みを行う場合、上書きするのはコミットされたデータのみであること
- [[PostgreSQL]], [[SQL Server 2012]], [[MemSQL]], [[Oracle 11g]]などのデフォルトの分離レベル
- Read committedでも、[[Nonrepeatable read]]([[Read skew]]), [[Lost Update]]は発生してしまう
