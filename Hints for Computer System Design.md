- Author: [[Butler W. Lampson]]
- [[STEADY]], [[AID]]などを提案している
- [[Butler W. Lampson]]は[[Xerox PARC]]の人。
	- [[Xerox Alto]], [[Xerox Dorado]], [[Xerox Star]], [[Xerox Bravo]]などの経験を通じて書いている
- *なぜ*良いシステムを作ることに繋がるのかを、Functionality, Speed, Fault toleranceに沿って整理
- システム設計の*どこで*役立つのかを、完全性の担保・インターフェースの選択・実装の考案に沿って整理
![[Pasted image 20250420211242.png]]

|    Where \ Why     | 機能性  <br>動作するか？ (Functionality  <br>Does it work?) | 速度  <br>十分に速いか？ (Speed  <br>Is it fast enough?) | フォールトトレランス  <br>動作し続けるか？ (Fault-tolerance  <br>Does it keep working?) |
| :----------------: | :------------------------------------------------: | :---------------------------------------------: | :-------------------------------------------------------------------: |
|  **Completeness**  |  通常時と最悪のケースを分離する (Separate normal and worst case)  |               負荷を軽減する (Shed load)               |                                                                       |
|                    |                                                    |              エンドツーエンド (End-to-end)              |                         エンドツーエンド (End-to-end)                         |
|   **Interface**    |                                                    |               安全第一 (Safety first)               |                                                                       |
|                    |          一つのことをうまく行う (Do one thing well)           |              高速化する (Make it fast)               |                         エンドツーエンド (End-to-end)                         |
|                    |             一般化しない (Don't generalize)              |           リソースを分割する (Split resources)           |                         ログを更新する (Log updates)                         |
|                    |                正しく行う (Get it right)                |             静的解析 (Static analysis)              |                 アクションをアトミックにする (Make actions atomic)                  |
|                    |             力を隠さない (Don't hide power)              |           動的翻訳 (Dynamic translation)            |                                                                       |
|                    |      プロシージャ引数を使用する (Use procedure arguments)       |                                                 |                                                                       |
|                    |        クライアントに任せる (Leave it to the client)         |                                                 |                                                                       |
|                    | 基本的なインターフェースを安定に保つ (Keep basic interfaces stable)  |                                                 |                                                                       |
|                    |         立つ場所を確保する (Keep a place to stand)          |                                                 |                                                                       |
| **Implementation** |      一つは捨てるつもりで計画する (Plan to throw one away)       |           答えをキャッシュする (Cache answers)            |                 アクションをアトミックにする (Make actions atomic)                  |
|                    |                秘密を守る (Keep secrets)                |               ヒントを使う (Use hints)                |                          ヒントを使う (Use hints)                           |
|                    |        良いアイデアを再利用する (Use a good idea again)        |           総当たり攻撃を使う (Use brute force)           |                                                                       |
|                    |            分割統治する (Divide and conquer)             |      バックグラウンドで計算する (Compute in background)      |                                                                       |
|                    |                                                    |            バッチ処理 (Batch processing)             |                                                                       |
# 2. Functionality
- システムから適切な機能を得るには?
- インターフェースの選択が肝
- 満たすべき条件: 単純であること・完全であること・十分に小さく高速な実装を可能にすること
	- 背反しており、とても困難
## 2.1 Keep it simple
- 関連: [[KISS原則]]
- 一度に一つのことを行い、それをうまく行う
	- 多くのことをやろうとすると、その実装は大きく・遅く・複雑となる
	- 予測可能なコストをもたせるべき
- 一般化しない。一般化は一般的に間違っている
- 正しく行う（Get it right）: 抽象化は正しく行うことの代わりにならない。変な抽象化をした結果非常に難しい問題を起こすことがある
	- 住所などをフリーフォームにすると、あとから複雑なパースをする羽目になる
## 2.2 Corollaries (推論? 系の導出?)
- 一般化・強力化よりも、高速化する（Make it fast）
	- 遅いCISCよりもRISCのほうがいい
- 力を隠さない（Don't hide power）
	- 低レベルの抽象化で高速にものごとをこなせる場合、高レベルで抽象化したときにそれを隠してはならない
	- 抽象化とは望ましくないプロパティを隠すことであって、望ましいプロパティを隠してはいけない
- プロシージャに任せる（User procedure arguments）
	- インターフェースに柔軟性を提供するために、プロシージャ引数を使用する
- クライアントに任せる（Leave it to the client）
	- インターフェースは一つの問題のみを解決して、残りをクライアントに任せることでシンプルさ・柔軟性・高いパフォーマンスを発揮できる
##  2.3 Continuity（継続性）
- 設計を改善したいという欲求と、安定性・継続性の必要性との間には、常に緊張がある
- 基本的なインターフェースを安定に保つ（Keep basic interfaces stable）
	- （特に型チェックができない場合）インターフェースを変更しないことが望ましい
- 立つ場所を確保する (Keep a place to stand)
	- インターフェースを変更する必要がある場合には、立ち続けられる場所を確保すること
		- 新しいインターフェースの上に古いインターフェースを構築し、古いコードが動くようにする（[[Rosetta]]とかそういうノリ?）
## 2.4 Making implementations work
- 一つは捨てるつもりで計画する (Plan to throw one away)
	- プロトタイプのつもりで
- 秘密を守る (Keep secrets)
	- クライアントプログラムが行うことを許されないことを許してはならない
- 分割統治する (Divide and conquer)
- 良いアイデアを再利用する (Use a good idea again instead of generalizing)
	- （実装はことなれど、同じようなインターフェースを提供するといいということ? よくわからない）
## 2.5 Handling all the cases
- 通常時と最悪のケースを分離する (Separate normal and worst case)
	- たいてい、この2つの要件は全く異なる
		- 正常な場合は、高速でなければならない
		- 最悪の場合は、何らかの進捗がなければならない

# 3. Speed
- 資源を共有するのではなく、分ける
	- 通常、専用のリソースを割り当てたほうが速い。挙動も予測しやすい
	- 必要な総リソースは大きくなるかもしれないが、通常余分なリソースのコストは小さいか、オーバーヘッドがフラグメンテーションよりも大きいか、その両方
	- ドメインスペシフィックなコプロセッサを置くのもよい
- 静的解析をする（Use static analysis if you can）
	- 静的解析: プログラムのソースコード等を解析してパフォーマンスなどを計算する
	- プログラムの特性を発見し、パフォーマンスを向上させる
	- 難しければ動的解析をする（プログラムを動かして挙動を観測する）
- 動的翻訳 (Dynamic translation)
	- これなに?
- 複雑な計算の答えをキャッシュしておく（Cache answers to expensive computation）
- ヒントを使う（Use hints to speed up normal execution.）
	- キャッシュエントリと異なり、間違っているかもしれないし、当たったらいいなくらいのノリ?
- 疑いがあれば、ブルートフォースしろ（When in doubt, use brute force）
- オーダーとして速くても、定数項が大きければ、結局遅いということもありうる
- 可能なときにバックグラウンドで計算しろ（Compute in the background when possible.）
- 可能ならバッジで実行しろ（Use batch processing if possible）
- 
# 論文
- https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/acrobat-17.pdf
- https://arxiv.org/abs/2011.02455 (2020年改訂版、107ページ!)