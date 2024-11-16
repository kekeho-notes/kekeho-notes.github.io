- [[Byzantine Fault Tolerant]]なトランザクショナル[[KVS]
- Correctnessとして、[[Byzantine Isolation]]を保証
- [[Progress]]として、[[Byzantine Independence]]を保証
	- [[Leader-followerモデルのコンセンサスアルゴリズム]]では、リーダーが不正を働いたら簡単に覆るので、Basilではリーダーベースモデルを採用していない
	- Client-drivenなアーキテクチャ

# 参考
- 論文 [[SOSP]]'21: https://dl.acm.org/doi/epdf/10.1145/3477132.3483552

- 解説動画
	 ![解説動画](https://www.youtube.com/watch?v=_iIuPrlE1nw)