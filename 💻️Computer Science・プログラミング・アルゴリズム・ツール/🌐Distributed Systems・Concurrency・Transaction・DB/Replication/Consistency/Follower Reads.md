- [[分散DB]]において、Readを(リーダーのみに限定せず)followerからも行うこと
- よりよいスループット、低レイテンシを実現する
- 一般に、読み取り操作の一貫性が課題
	- 同時に、Client AがFollower Aから、Client BがFollower Bから同じ値を読み取ったら、結果が違うかもしれない

参考
- [https://martinfowler.com/articles/patterns-of-distributed-systems/follower-reads.html](https://martinfowler.com/articles/patterns-of-distributed-systems/follower-reads.html)
