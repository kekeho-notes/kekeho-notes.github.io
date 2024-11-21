- 一般的な分散システムはほぼこれ
- ほとんどの時間は[[Synchronous System]]として振る舞うが、例外として[[Asynchronous System]]として振る舞う
	- 通常、タイムアウトを使ってプロセスがクラッシュしたと結論づける (この結論は誤りである可能性があるが、そういう誤ったクラッシュ検知に耐えられる[[Fault tolerance]]が求められる)

# 論文
- Consensus in the Presence of Partial Synchrony ([[JACM]]'88) : https://dl.acm.org/doi/epdf/10.1145/42282.42283